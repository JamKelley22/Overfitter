import { ClothingItem } from "../../types";

import { WristType, Wrist as IWrist } from "../../../docs/client/api";

export class Wrist extends ClothingItem implements IWrist {
    type: WristType;

    constructor(data: IWrist) {
        super(data);
        this.type = data.type ?? WristType.Unknown;
    }

    toString(): string {
        return super.toString(`type: ${this.type}`);
    }
}

export { IWrist, WristType };
