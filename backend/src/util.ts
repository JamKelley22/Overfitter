import escape from "escape-html";
import { DateTime } from "luxon";
import { WithId } from "../docs/openapi/client";

export const parseDateTime = (dt?: DateTime | string): DateTime | undefined => {
    if (dt === undefined) return undefined;

    if (DateTime.isDateTime(dt)) {
        return dt;
    }
    let convertedDT;
    convertedDT = DateTime.fromISO(dt);
    if (convertedDT.isValid) {
        return convertedDT;
    }
    convertedDT = DateTime.fromSQL(dt);
    if (convertedDT.isValid) {
        return convertedDT;
    }
    // Todo: Add More DateTime conversions
    return undefined;
};

export function cleanObject<T>(data: Record<string, unknown>): T {
    return objectMap(data, (value: string) => escape(value)) as T;
}

export function parseIdFromParams(
    params: { [key: string]: string } | string[]
): number | undefined {
    const { id } = (params as unknown) as WithId;
    return id;
}

// https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
const objectMap = (
    object: Record<string, unknown>,
    mapFn: (data: string) => void
) => {
    return Object.keys(object).reduce(function (
        result: Record<string, unknown>,
        key
    ) {
        result[key] = mapFn(object[key] as string);
        return result;
    },
    {});
};
