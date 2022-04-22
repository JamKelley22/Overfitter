import { ClothingItem } from "../../types";

import { FeetType, Feet as IFeet } from "../../../docs/client/api";

export class Feet extends ClothingItem implements IFeet {
    type: FeetType;

    constructor(data: IFeet) {
        super(data);
        this.type = data.type ?? FeetType.Unknown;
    }

    toString(): string {
        return super.toString(`type: ${this.type}`);
    }
}

export { IFeet, FeetType };
