import { ClothingItem } from "../../types";

import { BottomType, Bottom as IBottom } from "../../../docs/client/api";

export class Bottom extends ClothingItem implements IBottom {
    type: BottomType;

    constructor(data: IBottom) {
        super(data);
        this.type = data.type ?? BottomType.Unknown;
    }

    toString() {
        return super.toString(`type: ${this.type}`);
    }
}

export { IBottom, BottomType };
