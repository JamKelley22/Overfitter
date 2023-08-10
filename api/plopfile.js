const collapseType = (type) => {
    switch (type) {
        case "number":
        case "integer":
            return "number";
        case "string":
            return "string";
        case "boolean":
            return "boolean";
        case "object":
            return "Record<string, unknown>";
        case "array":
            throw `Can't deal with array type: ${type}`;
        default:
            throw `Unknown Type: ${type}`;
    }
};

const snakeToCamel = (str) =>
    str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace("-", "").replace("_", "")
        );
const snakeToPascal = (str) => {
    const camel = snakeToCamel(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
};

module.exports = function (plop) {
    const OverfitterAPI = require("./docs/openapi/OverfitterAPI.json");
    // create your generators here
    plop.setGenerator("route", {
        description: "New App Route",
        prompts: [
            {
                type: "input",
                name: "typeName",
                message: "Class name of Type"
            },
            {
                type: "input",
                name: "tableName",
                message: "Name of Table in DB"
            },
            {
                type: "input",
                name: "endpoint",
                message: "Endpoint Name (no slashes)"
            },
            {
                type: "input",
                name: "validationSchema",
                message:
                    "Validation Schema Object for endpoints (ClothingItemValidationSchema or EntityValidationSchema)"
            }
        ],
        actions: [
            {
                type: "add",
                path: "src/routers/generated/{{endpoint}}/index.ts",
                templateFile: "plop-templates/route/index.ts.hbs"
            },
            {
                type: "add",
                path: "src/routers/generated/{{endpoint}}/types.ts",
                templateFile: "plop-templates/route/types.ts.hbs"
            },
            {
                type: "modify",
                path: "src/routers/generated/{{endpoint}}/types.ts",
                async transform(fileContents, data) {
                    // Grab schemas
                    const schemas = OverfitterAPI.components.schemas;
                    // Index into this type's properties (first element to skip ref to ClothingItem)
                    // Todo: Make this iterative for all elements that have have "type": "object"
                    const objProperties =
                        schemas[data.typeName].allOf[1].properties;

                    // Grab all the keys and their corresponding types (either parsed into js primitive or an enum value in the case of $ref val)
                    const keysAndTypes = Object.keys(objProperties).map(
                        (property) => {
                            let isEnumVal = false;
                            let propType = objProperties[property].type;
                            if (!propType) {
                                isEnumVal = true;
                                const refString =
                                    objProperties[property]["$ref"];
                                if (!refString)
                                    throw `Can't deal with type: ${property} (no type and unable to parse ref)`;
                                const refStringSplit = refString.split("/");
                                propType =
                                    refStringSplit[refStringSplit.length - 1];
                            } else {
                                propType = collapseType(propType);
                            }

                            return {
                                property: property,
                                type: propType,
                                isEnumVal: isEnumVal,
                                modifierFn: isEnumVal
                                    ? (str) => snakeToPascal(str)
                                    : (str) => str
                            };
                        }
                    );

                    const imports = keysAndTypes
                        .filter((pair) => pair.isEnumVal)
                        .map((pair) => pair.modifierFn(pair.type))
                        .join(",\r\n\t");

                    // Compile class instance variables in correct string form
                    const instanceVars = keysAndTypes
                        .map(
                            (pair) =>
                                `${pair.property}?: ${pair.modifierFn(
                                    pair.type
                                )};`
                        )
                        .join("\r\n\t");

                    //this.type = data.type || BottomType.Unknown;
                    const constructorAssignment = keysAndTypes
                        .map(
                            (pair) =>
                                `this.${pair.property} = data.${pair.property}${
                                    pair.isEnumVal
                                        ? " || " +
                                          pair.modifierFn(pair.type) +
                                          ".Unknown"
                                        : ""
                                };`
                        )
                        .join("\r\n\t\t");

                    const toStringProps = keysAndTypes
                        .map(
                            (pair) =>
                                `${pair.property}: \${this.${pair.property}}`
                        )
                        .join(",\r\n\t\t\t");

                    // Imports
                    let newContents = fileContents.replace(
                        /(\w+Type,\s)(\s.+ as I\w+)/g,
                        `${imports},$2`
                    );

                    // Instance Variables
                    // Add instance variables after last type with a space in between
                    newContents = newContents.replace(
                        /(export class .+ extends ClothingItem implements I.+ {)/g,
                        `$1\r\n\t${instanceVars}`
                    );

                    // Constructor
                    newContents = newContents.replace(
                        /(super\(data\);)/g,
                        `$1\r\n\t\t${constructorAssignment}`
                    );

                    // ToString return
                    return newContents.replace(
                        /(return super.toString\(`)(`\);)/g,
                        `$1${toStringProps}\n\t\t$2`
                    );
                }
            }
        ]
    });
};
