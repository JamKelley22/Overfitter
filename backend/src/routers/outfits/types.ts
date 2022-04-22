import { ClothingItem } from "../../types";

import { OutfitType, Outfit as IOutfit } from "../../../docs/client/api";

export class Outfit extends ClothingItem implements IOutfit {
    type: OutfitType;

    constructor(data: IOutfit) {
        super(data);
        this.type = data.type ?? OutfitType.Unknown;
    }

    toString() {
        return super.toString(`type: ${this.type}`);
    }
}

export { IOutfit, OutfitType };
