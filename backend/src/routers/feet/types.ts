import { ClothingItem } from "../../types";

import { FeetType, Feet as IFeet } from "../../../docs/openapi/client/api";

export class Feet extends ClothingItem implements IFeet {
    type?: FeetType;
    sizeInches?: number;

    constructor(data: IFeet) {
        super(data);
        this.type = data.type || FeetType.Unknown;
        this.sizeInches = data.sizeInches;
    }

    toString(): string {
        return super.toString(`type: ${this.type},
			sizeInches: ${this.sizeInches}
		`);
    }
}

export { IFeet };
