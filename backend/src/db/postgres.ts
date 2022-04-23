import { Pool, QueryResult } from "pg";

import { IDatabase } from "./types";
import { WithId } from "../../docs/openapi/client";
import { Response, StatusCode } from "../types";

export class PostgresDatabase implements IDatabase {
    pool: Pool;

    constructor(connectionString: string) {
        this.pool = new Pool({ connectionString: connectionString });
    }

    async runQuery<T>(sqlQuery: string): Promise<QueryResult<T>> {
        return new Promise((resolve, reject) => {
            this.pool.query(sqlQuery, (err, result) => {
                if (err) {
                    reject(err.message);
                    return;
                }
                resolve(result);
            });
        });
    }

    async getAll<T>(
        tableName: string,
        dataType: new (data: T) => T
    ): Promise<Response<T[] | undefined>> {
        const sqlQuery = `SELECT * FROM ${tableName}`;

        const queryResults = await this.runQuery<T>(sqlQuery);

        const result = queryResults.rows.map(
            (result: T) => new dataType(result)
        );
        return new Response<T[]>(true, result);
    }

    async getById<T>(
        tableName: string,
        id: number | undefined,
        dataType: new (data: T) => T
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

        const queryResults = await this.runQuery<T>(sqlQuery);

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

    async create<T>(
        tableName: string,
        body: Omit<T, "id">,
        dataType: new (data: T) => T
    ): Promise<Response<T | undefined>> {
        const bodyNoId = Object.entries(body).filter((v) => v[0] !== "id");
        let sqlQuery = `INSERT INTO ${tableName}(${bodyNoId
            .map((pair) => `"${pair[0]}"`)
            .join(",")}) VALUES (${bodyNoId
            .map((pair) =>
                typeof pair[1] === "number" ? pair[1] : `'${pair[1]}'`
            )
            .join(",")}) RETURNING id`;

        let queryResults = await this.runQuery<T>(sqlQuery);

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
        queryResults = await this.runQuery(sqlQuery);
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

    async deleteAll<T>(
        tableName: string,
        dataType: new (data: T) => T
    ): Promise<Response<T[] | undefined>> {
        let sqlQuery = `SELECT * FROM ${tableName}`;

        let queryResults = await this.runQuery<T>(sqlQuery);

        const all = queryResults.rows.map((result: T) => new dataType(result));

        sqlQuery = `DELETE FROM ${tableName}`;
        queryResults = await this.runQuery<T>(sqlQuery);

        // Todo: Check that delete was successful

        return new Response(true, all);
    }

    async deleteById<T>(
        tableName: string,
        id: number | undefined,
        dataType: new (data: T) => T
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

        let queryResults = await this.runQuery<T>(sqlQuery);

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
        queryResults = await this.runQuery(sqlQuery);
        // Todo: Check that delete was successful

        return new Response(true, match);
    }

    async updateById<T>(
        tableName: string,
        id: number | undefined,
        body: Partial<T>,
        dataType: new (data: T) => T
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

        let queryResults = await this.runQuery<T>(sqlQuery);

        sqlQuery = `SELECT * FROM ${tableName} WHERE id = ${id}`;
        queryResults = await this.runQuery<T>(sqlQuery);

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
}
