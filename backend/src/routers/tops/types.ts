import { ClothingItem } from "../../types";

import { TopType, Top as ITop } from "../../../docs/client/api";

export class Top extends ClothingItem implements ITop {
    type: TopType;

    constructor(data: ITop) {
        super(data);
        this.type = data.type ?? TopType.Unknown;
    }

    toString() {
        return super.toString(`type: ${this.type}`);
    }
}

export { ITop, TopType };
