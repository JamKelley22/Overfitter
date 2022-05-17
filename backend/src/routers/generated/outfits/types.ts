import { ClothingItem } from "../../../types";

import {
    OutfitType,
    Outfit as IOutfit
} from "../../../../docs/openapi/client/api";

export class Outfit extends ClothingItem implements IOutfit {
    type?: OutfitType;
    topId?: number;
    bottomId?: number;
    headId?: number;
    feetId?: number;
    wristId?: number;
    rating?: number;

    constructor(data: IOutfit) {
        super(data);
        this.type = data.type || OutfitType.Unknown;
        this.topId = data.topId;
        this.bottomId = data.bottomId;
        this.headId = data.headId;
        this.feetId = data.feetId;
        this.wristId = data.wristId;
        this.rating = data.rating;
    }

    toString(): string {
        return super.toString(`type: ${this.type},
			topId: ${this.topId},
			bottomId: ${this.bottomId},
			headId: ${this.headId},
			feetId: ${this.feetId},
			wristId: ${this.wristId},
			rating: ${this.rating}
		`);
    }
}

export { IOutfit };
