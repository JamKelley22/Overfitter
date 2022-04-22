import { QueryResult } from "pg";
import { WithId } from "../docs/client";

import { pgClient } from "./config";
import { Response, StatusCode } from "./types";

export async function runQuery<T>(sqlQuery: string): Promise<QueryResult<T>> {
    return new Promise((resolve, reject) => {
        pgClient.query(sqlQuery, (err, result) => {
            if (err) {
                reject(err.message);
                return;
            }
            resolve(result);
        });
    });
}

export async function getAll<T>(
    tableName: string,
    dataType: new (data: any) => T
): Promise<Response<T[] | undefined>> {
    const sqlQuery = `SELECT * FROM ${tableName}`;

    const queryResults = await runQuery<T[]>(sqlQuery);

    const result = queryResults.rows.map((result: any) => new dataType(result));
    return new Response<T[]>(true, result);
}

export async function getById<T>(
    tableName: string,
    id: number | undefined,
    dataType: new (data: any) => T
): Promise<Response<T | undefined>> {
    if (!id) {
        return new Response(
            false,
            undefined,
            StatusCode.BAD_REQUEST,
            `Request must include Id`
        );
    }

    const sqlQuery = `SELECT * FROM ${tableName} WHERE id = ${id}`;

    const queryResults = await runQuery<T>(sqlQuery);

    if (queryResults.rowCount === 0) {
        return new Response(
            false,
            undefined,
            StatusCode.NOT_FOUND,
            `No item with id ${id} in ${tableName}`
        );
    }

    return new Response(true, new dataType(queryResults.rows[0]));
}

export async function create<T>(
    tableName: string,
    body: Omit<T, "id">,
    dataType: new (data: any) => T
): Promise<Response<T | undefined>> {
    const bodyNoId = Object.entries(body).filter((v) => v[0] !== "id");
    let sqlQuery = `INSERT INTO ${tableName}(${bodyNoId
        .map((pair) => `"${pair[0]}"`)
        .join(",")}) VALUES (${bodyNoId
        .map((pair) =>
            typeof pair[1] === "number" ? pair[1] : `\'${pair[1]}\'`
        )
        .join(",")}) RETURNING id`;

    let queryResults = await runQuery<T>(sqlQuery);

    if (queryResults.rowCount === 0) {
        return new Response(
            false,
            undefined,
            StatusCode.NOT_FOUND,
            `Create Failed`
        );
    }

    sqlQuery = `SELECT * FROM ${tableName} WHERE id = ${
        (queryResults.rows[0] as T & WithId).id
    }`;
    queryResults = await runQuery(sqlQuery);
    if (queryResults.rowCount === 0) {
        return new Response(
            false,
            undefined,
            StatusCode.NOT_FOUND,
            `Create Failed`
        );
    }

    return new Response(
        true,
        new dataType(queryResults.rows[0]),
        StatusCode.CREATED
    );
}

export async function deleteAll<T>(
    tableName: string,
    dataType: new (data: any) => T
): Promise<Response<T[] | undefined>> {
    let sqlQuery = `SELECT * FROM ${tableName}`;

    let queryResults = await runQuery(sqlQuery);

    const all = queryResults.rows.map((result: any) => new dataType(result));

    sqlQuery = `DELETE FROM ${tableName}`;
    queryResults = await runQuery(sqlQuery);

    // Todo: Check that delete was successful

    return new Response(true, all);
}

export async function deleteById<T>(
    tableName: string,
    id: number | undefined,
    dataType: new (data: any) => T
): Promise<Response<T | undefined>> {
    if (!id) {
        return new Response(
            false,
            undefined,
            StatusCode.BAD_REQUEST,
            `Request must include Id`
        );
    }

    let sqlQuery = `SELECT * FROM ${tableName} WHERE id = ${id}`;

    let queryResults = await runQuery(sqlQuery);

    if (queryResults.rowCount === 0) {
        return new Response(
            false,
            undefined,
            StatusCode.NOT_FOUND,
            `No item with id ${id} in ${tableName}`
        );
    }

    const match = new dataType(queryResults.rows[0]);

    sqlQuery = `DELETE FROM ${tableName} WHERE id = ${id}`;
    queryResults = await runQuery(sqlQuery);
    // Todo: Check that delete was successful

    return new Response(true, match);
}

export async function updateById<T>(
    tableName: string,
    id: number | undefined,
    body: Partial<T>,
    dataType: new (data: any) => T
): Promise<Response<T | undefined>> {
    if (!id) {
        return new Response(
            false,
            undefined,
            StatusCode.BAD_REQUEST,
            `Request must include Id`
        );
    }

    const bodyNoId = Object.entries(body).filter((v) => v[0] !== "id");
    let sqlQuery = `UPDATE ${tableName} SET ${bodyNoId
        .map((pair) => `"${pair[0]}" = '${pair[1]}'`)
        .join(", ")} WHERE id = ${id}`;

    let queryResults = await runQuery(sqlQuery);

    sqlQuery = `SELECT * FROM ${tableName} WHERE id = ${id}`;
    queryResults = await runQuery(sqlQuery);

    if (queryResults.rowCount === 0) {
        return new Response(
            false,
            undefined,
            StatusCode.NOT_FOUND,
            `Update Failed: No item with id ${id} in ${tableName}`
        );
    }

    return new Response(true, new dataType(queryResults.rows[0]));
}
