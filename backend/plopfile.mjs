export default function (plop) {
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
            }
        ],
        actions: [
            {
                type: "add",
                path: "src/routers/{{endpoint}}/index.ts",
                templateFile: "plop-templates/route/index.ts.hbs"
            },
            {
                type: "add",
                path: "src/routers/{{endpoint}}/types.ts",
                templateFile: "plop-templates/route/types.ts.hbs"
            }
        ]
    });
}
