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
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

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

export const EntityValidationSchema = (
    type: "CREATE" | "UPDATE" | "SEARCH"
): Schema => {
    // prettier-ignore
    const common = {
        name: stringValidationSchema("name", "body", type !== "CREATE"),
        rating: floatValidationSchema("rating", "body", type !== "CREATE", 0, 5)
    };
    let additional = {};
    switch (type) {
        case "CREATE":
        case "UPDATE":
            // prettier-ignore
            additional = {
                uriImage: stringValidationSchema("name", "body", type !== "CREATE", { isURL: true }),
                description: stringValidationSchema("description", "body", type !== "CREATE", { escape: true }),
                timestampAddedRFC: timestampValidationSchema("timestampAddedRFC", "body", type !== "CREATE"),
                timestampLastModifiedRFC: timestampValidationSchema("timestampLastModifiedRFC", "body", type !== "CREATE")
            }
            break;
        case "SEARCH":
            // prettier-ignore
            additional = {
                timestampAddedBeginRFC: timestampValidationSchema("timestampAddedBeginRFC", "body", true),
                timestampAddedEndRFC: timestampValidationSchema("timestampAddedEndRFC", "body", true),
                timestampModifiedBeginRFC: timestampValidationSchema("timestampModifiedBeginRFC", "body", true),
                timestampModifiedEndRFC: timestampValidationSchema("timestampModifiedEndRFC", "body", true)
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
        code: stringValidationSchema("code", "body", type !== "CREATE", { escape: true }),
        sizeUSLetter: stringValidationSchema("sizeUSLetter", "body", type !== "CREATE", { escape: true }),
        sizeUSNumber: floatValidationSchema("sizeUSNumber", "body", type !== "CREATE", 0, 100),
        brand: stringValidationSchema("brand", "body", type !== "CREATE", { escape: true }),
        itemCondition: stringValidationSchema("itemCondition", "body", type !== "CREATE", { escape: true }),
        itemStatus: stringValidationSchema("itemStatus", "body", type !== "CREATE", { escape: true }),
        numberOfWears: intValidationSchema("numberOfWears", "body", type !== "CREATE", 0, Number.MAX_SAFE_INTEGER),
        wearsBeforeDirty: intValidationSchema("wearsBeforeDirty", "body", type !== "CREATE", 0, Number.MAX_SAFE_INTEGER),
        wearsLeftBeforeDirty: intValidationSchema("wearsLeftBeforeDirty", "body", type !== "CREATE", 0, Number.MAX_SAFE_INTEGER),
        primaryColor: stringValidationSchema("primaryColor", "body", type !== "CREATE", { escape: true }),
        secondaryColor: stringValidationSchema("secondaryColor", "body", type !== "CREATE", { escape: true }),
        accentColor: stringValidationSchema("accentColor", "body", type !== "CREATE", { escape: true }),
        pattern: stringValidationSchema("pattern", "body", type !== "CREATE", { escape: true }),
        type: stringValidationSchema("type", "body", type !== "CREATE", { escape: true })
    };
    let additional = {};
    switch (type) {
        case "CREATE":
        case "UPDATE":
            // prettier-ignore
            additional = {
                timestampPurchasedRFC: timestampValidationSchema("timestampPurchasedRFC", "body", type !== "CREATE"),
            }
            break;
        case "SEARCH":
            // prettier-ignore
            additional = {
                timestampPurchasedBeginRFC: timestampValidationSchema("timestampPurchasedRFC", "body", true),
                timestampPurchasedEndRFC: timestampValidationSchema("timestampPurchasedRFC", "body", true),
            };
            break;
    }
    return {
        ...EntityValidationSchema(type),
        ...common,
        ...additional
    };
};
