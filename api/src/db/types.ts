import { Response } from "../types";

export interface IDatabase {
    getAll<T>(
        tableName: string,
        dataType: new (data: T) => T,
        filter?: Record<string, string>
    ): Promise<Response<T[] | undefined>>;
    getById<T>(
        tableName: string,
        id: number | undefined,
        dataType: new (data: T) => T
    ): Promise<Response<T | undefined>>;
    create<T>(
        tableName: string,
        body: Omit<T, "id">,
        dataType: new (data: T) => T
    ): Promise<Response<T | undefined>>;
    deleteAll<T>(
        tableName: string,
        dataType: new (data: T) => T
    ): Promise<Response<T[] | undefined>>;
    deleteById<T>(
        tableName: string,
        id: number | undefined,
        dataType: new (data: T) => T
    ): Promise<Response<T | undefined>>;
    updateById<T>(
        tableName: string,
        id: number | undefined,
        body: Partial<T>,
        dataType: new (data: T) => T
    ): Promise<Response<T | undefined>>;
}
