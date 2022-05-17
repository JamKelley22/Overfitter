import { ClothingItem } from "../../../types";

import { TopType, Top as ITop } from "../../../../docs/openapi/client/api";

export class Top extends ClothingItem implements ITop {
    type?: TopType;
    sizeChestInchesLow?: number;
    sizeChestInchesHigh?: number;
    sizeNeckInchesLow?: number;
    sizeNeckInchesHigh?: number;
    sizeWaistInchesLow?: number;
    sizeWaistInchesHigh?: number;
    sizeSleeveInches?: number;

    constructor(data: ITop) {
        super(data);
        this.type = data.type || TopType.Unknown;
        this.sizeChestInchesLow = data.sizeChestInchesLow;
        this.sizeChestInchesHigh = data.sizeChestInchesHigh;
        this.sizeNeckInchesLow = data.sizeNeckInchesLow;
        this.sizeNeckInchesHigh = data.sizeNeckInchesHigh;
        this.sizeWaistInchesLow = data.sizeWaistInchesLow;
        this.sizeWaistInchesHigh = data.sizeWaistInchesHigh;
        this.sizeSleeveInches = data.sizeSleeveInches;
    }

    toString(): string {
        return super.toString(`type: ${this.type},
			sizeChestInchesLow: ${this.sizeChestInchesLow},
			sizeChestInchesHigh: ${this.sizeChestInchesHigh},
			sizeNeckInchesLow: ${this.sizeNeckInchesLow},
			sizeNeckInchesHigh: ${this.sizeNeckInchesHigh},
			sizeWaistInchesLow: ${this.sizeWaistInchesLow},
			sizeWaistInchesHigh: ${this.sizeWaistInchesHigh},
			sizeSleeveInches: ${this.sizeSleeveInches}
		`);
    }
}

export { ITop };
