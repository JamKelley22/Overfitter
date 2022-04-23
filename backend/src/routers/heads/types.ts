import { ClothingItem } from "../../types";

import { HeadType, Head as IHead } from "../../../docs/openapi/client/api";

export class Head extends ClothingItem implements IHead {
    type?: HeadType;
    sizeInchesLow?: number;
    sizeInchesHigh?: number;

    constructor(data: IHead) {
        super(data);
        this.type = data.type || HeadType.Unknown;
        this.sizeInchesLow = data.sizeInchesLow;
        this.sizeInchesHigh = data.sizeInchesHigh;
    }

    toString(): string {
        return super.toString(`type: ${this.type},
			sizeInchesLow: ${this.sizeInchesLow},
			sizeInchesHigh: ${this.sizeInchesHigh}
		`);
    }
}

export { IHead };
