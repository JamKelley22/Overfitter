import { ClothingItem } from "../../types";

import {
    BottomType,
    BottomInseamType,
    Bottom as IBottom
} from "../../../docs/openapi/client/api";

export class Bottom extends ClothingItem implements IBottom {
    type?: BottomType;
    sizeHipInchesLow?: number;
    sizeHipInchesHigh?: number;
    bottomInseamType?: BottomInseamType;
    inseamInches?: number;

    constructor(data: IBottom) {
        super(data);
        this.type = data.type || BottomType.Unknown;
        this.sizeHipInchesLow = data.sizeHipInchesLow;
        this.sizeHipInchesHigh = data.sizeHipInchesHigh;
        this.bottomInseamType =
            data.bottomInseamType || BottomInseamType.Unknown;
        this.inseamInches = data.inseamInches;
    }

    toString(): string {
        return super.toString(`type: ${this.type},
			sizeHipInchesLow: ${this.sizeHipInchesLow},
			sizeHipInchesHigh: ${this.sizeHipInchesHigh},
			bottomInseamType: ${this.bottomInseamType},
			inseamInches: ${this.inseamInches}
		`);
    }
}

export { IBottom };
