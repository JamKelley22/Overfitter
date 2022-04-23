import {
    ItemStatus,
    SizeUsLetter,
    ItemCondition,
    Entity as IEntity,
    WithId as IWithId,
    ClothingItem as IClothingItem
} from "../docs/openapi/client/api";
import { parseDateTime } from "./util";

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    SERVER_ERROR = 500
}

export class Response<T> {
    success: boolean;
    data?: T;
    error: unknown;
    errorMessage: string;
    statusCode: StatusCode;
    detail?: unknown;

    constructor(
        success: boolean,
        data?: T,
        statusCode = StatusCode.OK,
        errorMessage = "",
        error: unknown = undefined,
        detail: unknown = ""
    ) {
        this.success = success;
        this.data = data;
        this.statusCode = statusCode;
        this.error = error;
        this.errorMessage = errorMessage;
        this.detail = detail;
    }

    toObject = (): Omit<this, "statusCode"> => {
        const { statusCode, ...y } = this; // eslint-disable-line
        return y;
    };
}

const entityDefaults = {
    id: undefined,
    uriImage: undefined,
    name: undefined,
    description: undefined,
    timestampAddedRFC: undefined,
    timestampLastModifiedRFC: undefined,
    rating: undefined
};

export class Entity implements IEntity {
    id?: number;
    uriImage?: string;
    name?: string;
    description?: string;
    timestampAddedRFC?: string;
    timestampLastModifiedRFC?: string;
    rating?: number;

    constructor(data: IEntity & IWithId) {
        this.id = data.id ?? entityDefaults.id;
        this.uriImage = data.uriImage ?? entityDefaults.uriImage;
        this.name = data.name ?? entityDefaults.name;
        this.description = data.description ?? entityDefaults.description;
        this.timestampAddedRFC =
            data.timestampAddedRFC ?? entityDefaults.timestampAddedRFC;
        this.timestampLastModifiedRFC =
            data.timestampLastModifiedRFC ??
            entityDefaults.timestampLastModifiedRFC;
        this.rating = data.rating ?? entityDefaults.rating;
    }

    toString(extra?: string): string {
        return `{
            id: ${this.id},
            uriImage: ${this.uriImage},
            name: ${this.name},
            description: ${this.description},
            timestampAddedRFC: ${parseDateTime(
                this.timestampAddedRFC
            )?.toLocaleString()},
            timestampLastModifiedRFC: ${parseDateTime(
                this.timestampLastModifiedRFC
            )?.toLocaleString()},
            rating: ${this.rating},
            ${extra}
}`;
    }
}

const clothingItemDefaults = {
    code: undefined,
    sizeUSLetter: SizeUsLetter.Unknown,
    sizeUSNumber: -1,
    brand: undefined,
    timestampPurchasedRFC: undefined,
    itemCondition: ItemCondition.Unknown,
    itemStatus: ItemStatus.Unknown,
    numberOfWears: undefined,
    wearsBeforeDirty: undefined,
    wearsLeftBeforeDirty: undefined,
    primaryColor: undefined,
    secondaryColor: undefined,
    accentColor: undefined,
    pattern: undefined
};

export class ClothingItem extends Entity implements IClothingItem {
    code?: string;
    sizeUSLetter: SizeUsLetter;
    sizeUSNumber?: number;
    brand?: string;
    timestampPurchasedRFC?: string;
    itemCondition: ItemCondition;
    itemStatus: ItemStatus;
    numberOfWears?: number;
    wearsBeforeDirty?: number;
    wearsLeftBeforeDirty?: number;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    pattern?: string;

    constructor(data: IClothingItem) {
        super(data);
        this.code = data.code ?? clothingItemDefaults.code;
        this.sizeUSLetter =
            data.sizeUSLetter ?? clothingItemDefaults.sizeUSLetter;
        this.sizeUSNumber =
            data.sizeUSNumber ?? clothingItemDefaults.sizeUSNumber;
        this.brand = data.brand ?? clothingItemDefaults.brand;

        this.timestampPurchasedRFC =
            data.timestampPurchasedRFC ??
            clothingItemDefaults.timestampPurchasedRFC;

        this.itemCondition =
            data.itemCondition ?? clothingItemDefaults.itemCondition;
        this.itemStatus = data.itemStatus ?? clothingItemDefaults.itemStatus;
        this.numberOfWears =
            data.numberOfWears ?? clothingItemDefaults.numberOfWears;
        this.wearsBeforeDirty =
            data.wearsBeforeDirty ?? clothingItemDefaults.wearsBeforeDirty;
        this.wearsLeftBeforeDirty =
            data.wearsLeftBeforeDirty ??
            clothingItemDefaults.wearsLeftBeforeDirty;
        this.primaryColor =
            data.primaryColor ?? clothingItemDefaults.primaryColor;
        this.secondaryColor =
            data.secondaryColor ?? clothingItemDefaults.secondaryColor;
        this.accentColor = data.accentColor ?? clothingItemDefaults.accentColor;
        this.pattern = data.pattern ?? clothingItemDefaults.pattern;
    }

    toString(extra?: string): string {
        return super.toString(`code: ${this.code},
            sizeUSLetter: ${this.sizeUSLetter},
            sizeUSNumber: ${this.sizeUSNumber},
            brand: ${this.brand},
            datetimePurchased: ${this.timestampPurchasedRFC?.toLocaleString()},
            itemCondition: ${this.itemCondition},
            itemStatus: ${this.itemStatus},
            numberOfWears: ${this.numberOfWears},
            wearsBeforeDirty: ${this.wearsBeforeDirty},
            wearsLeftBeforeDirty: ${this.wearsLeftBeforeDirty},
            primaryColor: ${this.primaryColor},
            secondaryColor: ${this.secondaryColor},
            accentColor: ${this.accentColor},
            pattern: ${this.pattern},
            ${extra}`);
    }
}
