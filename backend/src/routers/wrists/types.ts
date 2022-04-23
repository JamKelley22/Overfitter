import { ClothingItem } from "../../types";

import { WristType, Wrist as IWrist } from "../../../docs/openapi/client/api";

export class Wrist extends ClothingItem implements IWrist {
    type?: WristType;
    sizeInches?: number;

    constructor(data: IWrist) {
        super(data);
        this.type = data.type || WristType.Unknown;
        this.sizeInches = data.sizeInches;
    }

    toString(): string {
        return super.toString(`type: ${this.type},
			sizeInches: ${this.sizeInches}
		`);
    }
}

export { IWrist };
