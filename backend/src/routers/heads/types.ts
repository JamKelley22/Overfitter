import { ClothingItem } from "../../types";

import { HeadType, Head as IHead } from "../../../docs/client/api";

export class Head extends ClothingItem implements IHead {
    type: HeadType;

    constructor(data: IHead) {
        super(data);
        this.type = data.type ?? HeadType.Unknown;
    }

    toString() {
        return super.toString(`type: ${this.type}`);
    }
}

export { IHead, HeadType };
