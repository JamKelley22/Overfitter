import {
    Schema,
    Location,
    ParamSchema,
    validationResult
} from "express-validator";
import {
    NextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse
} from "express";
import { Response, StatusCode } from "../types";

const ensureQueryContains = (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction,
    queryParams: string[]
): Response<null> | void => {
    const query = req.query;
    const missingQueryParams: string[] = [];
    queryParams.forEach((queryParam) => {
        const queryParamExists = typeof query[queryParam] === "string";
        if (!queryParamExists) {
            missingQueryParams.push(queryParam as string);
        }
    });

    if (missingQueryParams.length > 0) {
        const response = new Response(
            false,
            null,
            StatusCode.BAD_REQUEST,
            "Missing query params: " + missingQueryParams.join(",")
        );
        res.statusCode = response.statusCode;
        res.json(response);
        return;
    }
    next();
};

export const ensureQueryContainsConstructor = (
    queryParams: string[]
): ((
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
) => void | Response<null>) => {
    return (req: ExpressRequest, res: ExpressResponse, next: NextFunction) =>
        ensureQueryContains(req, res, next, queryParams);
};

export const ensureValidInput = (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
): ExpressResponse | void => {
    const errors = validationResult(req);
    // // if (!allowExtraFields) {
    // //     // Fields validation
    // //   }
    // const extraFields = checkIfExtraFields(ClothingItemValidationSchema("CREATE"), req);
    // if (extraFields) {
    //     return res.status(400).json({ error: true, message: "Bad request" });
    // }
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// function checkIfExtraFields(schema: Record<any, unknown>, req: ExpressRequest) {
//     const objArr = Object.keys(schema);
//     const allowedFields = objArr.reduce((a, _) => {
//             return [...fields, ...rule.builder.fields];
//         }, [])
//         .sort();

//     // Check for all common request inputs
//     const requestInput = { ...req.query, ...req.params, ...req.body };
//     const requestFields = Object.keys(requestInput).sort();

//     if (JSON.stringify(allowedFields) === JSON.stringify(requestFields)) {
//         return false;
//     }
//     // logger.error(`${req.ip} try to make a invalid request`)
//     return true;
// }

const createErrorMessage = (
    paramName: string,
    location?: Location | Location[]
) => {
    const locationString = location
        ? `in ${Array.isArray(location) ? location.join(", ") : location}`
        : "";
    return `Request needs to specify ${paramName} ${locationString}`;
};

const basicValidationSchema = (
    config: {
        paramName: string;
        location: Location | Location[];
        optional: boolean;
    },
    rest: Partial<ParamSchema>
): ParamSchema => {
    const { paramName, location, optional } = config;
    return {
        in: location,
        errorMessage: createErrorMessage(paramName, location),
        optional: optional ? { options: false } : true,
        ...rest
    };
};

const intValidationSchema = (
    paramName: string,
    location: Location | Location[],
    optional: boolean,
    minValue: number = Number.MIN_SAFE_INTEGER,
    maxValue: number = Number.MAX_SAFE_INTEGER
): ParamSchema => {
    const rest: Partial<ParamSchema> = {
        isInt: {
            options: {
                min: minValue,
                max: maxValue
            },
            errorMessage: `${paramName} needs to be between ${minValue} and ${maxValue}`
        },
        toInt: true
    };

    return basicValidationSchema({ paramName, location, optional }, rest);
};

const floatValidationSchema = (
    paramName: string,
    location: Location | Location[],
    optional: boolean,
    minValue: number = Number.MIN_SAFE_INTEGER,
    maxValue: number = Number.MAX_SAFE_INTEGER
): ParamSchema => {
    const rest: Partial<ParamSchema> = {
        isFloat: {
            options: {
                min: minValue,
                max: maxValue
            },
            errorMessage: `${paramName} needs to be between ${minValue} and ${maxValue}`
        },
        toFloat: true
    };
    return basicValidationSchema({ paramName, location, optional }, rest);
};

const stringValidationSchema = (
    paramName: string,
    location: Location | Location[],
    optional: boolean,
    additional: Partial<ParamSchema> = {}
): ParamSchema => {
    const rest: Partial<ParamSchema> = {
        trim: true,
        ...additional
    };
    return basicValidationSchema({ paramName, location, optional }, rest);
};

const timestampValidationSchema = (
    paramName: string,
    location: Location | Location[],
    optional: boolean
): ParamSchema => {
    const rest: Partial<ParamSchema> = {
        escape: true,
        isRFC3339: true
    };
    return basicValidationSchema({ paramName, location, optional }, rest);
};

const checkOptional = (type: "CREATE" | "UPDATE" | "SEARCH"): boolean =>
    type === "CREATE";

export const EntityValidationSchema = (
    type: "CREATE" | "UPDATE" | "SEARCH"
): Schema => {
    // prettier-ignore
    const common = {
        name: stringValidationSchema("name", "body", checkOptional(type)),
        rating: floatValidationSchema("rating", "body", checkOptional(type), 0, 5)
    };
    let additional = {};
    switch (type) {
        case "CREATE":
        case "UPDATE":
            // prettier-ignore
            additional = {
                uriImage: stringValidationSchema("name", "body", checkOptional(type), { isURL: true }),
                description: stringValidationSchema("description", "body", checkOptional(type), { escape: true }),
                timestampAddedRFC: timestampValidationSchema("timestampAddedRFC", "body", checkOptional(type)),
                timestampLastModifiedRFC: timestampValidationSchema("timestampLastModifiedRFC", "body", checkOptional(type))
            }
            break;
        case "SEARCH":
            // prettier-ignore
            additional = {
                timestampAddedBeginRFC: timestampValidationSchema("timestampAddedBeginRFC", "body", checkOptional(type)),
                timestampAddedEndRFC: timestampValidationSchema("timestampAddedEndRFC", "body", checkOptional(type)),
                timestampModifiedBeginRFC: timestampValidationSchema("timestampModifiedBeginRFC", "body", checkOptional(type)),
                timestampModifiedEndRFC: timestampValidationSchema("timestampModifiedEndRFC", "body", checkOptional(type))
            };
            break;
    }
    return {
        ...common,
        ...additional
    };
};

export const ClothingItemValidationSchema = (
    type: "CREATE" | "UPDATE" | "SEARCH"
): Schema => {
    // prettier-ignore
    const common = {
        code: stringValidationSchema("code", "body", checkOptional(type), { escape: true }),
        sizeUSLetter: stringValidationSchema("sizeUSLetter", "body", checkOptional(type), { escape: true }),
        sizeUSNumber: floatValidationSchema("sizeUSNumber", "body", checkOptional(type), 0, 100),
        brand: stringValidationSchema("brand", "body", checkOptional(type), { escape: true }),
        itemCondition: stringValidationSchema("itemCondition", "body", checkOptional(type), { escape: true }),
        itemStatus: stringValidationSchema("itemStatus", "body", checkOptional(type), { escape: true }),
        numberOfWears: intValidationSchema("numberOfWears", "body", checkOptional(type), 0, Number.MAX_SAFE_INTEGER),
        wearsBeforeDirty: intValidationSchema("wearsBeforeDirty", "body", checkOptional(type), 0, Number.MAX_SAFE_INTEGER),
        wearsLeftBeforeDirty: intValidationSchema("wearsLeftBeforeDirty", "body", checkOptional(type), 0, Number.MAX_SAFE_INTEGER),
        primaryColor: stringValidationSchema("primaryColor", "body", checkOptional(type), { escape: true }),
        secondaryColor: stringValidationSchema("secondaryColor", "body", checkOptional(type), { escape: true }),
        accentColor: stringValidationSchema("accentColor", "body", checkOptional(type), { escape: true }),
        pattern: stringValidationSchema("pattern", "body", checkOptional(type), { escape: true }),
        type: stringValidationSchema("type", "body", checkOptional(type), { escape: true })
    };
    let additional = {};
    switch (type) {
        case "CREATE":
        case "UPDATE":
            // prettier-ignore
            additional = {
                timestampPurchasedRFC: timestampValidationSchema("timestampPurchasedRFC", "body", checkOptional(type)),
            }
            break;
        case "SEARCH":
            // prettier-ignore
            additional = {
                timestampPurchasedBeginRFC: timestampValidationSchema("timestampPurchasedRFC", "body", checkOptional(type)),
                timestampPurchasedEndRFC: timestampValidationSchema("timestampPurchasedRFC", "body", checkOptional(type)),
            };
            break;
    }
    return {
        ...EntityValidationSchema(type),
        ...common,
        ...additional
    };
};
