import { ClothingItem } from "../../types";

import {
	AccessoryType,
	Accessory as IAccessory
} from "../../../docs/openapi/client/api";

export class Accessory extends ClothingItem implements IAccessory {
	type?: AccessoryType;

    constructor(data: IAccessory) {
        super(data);
		this.type = data.type || AccessoryType.Unknown;
    }

    toString(): string {
        return super.toString(`type: ${this.type}
		`);
    }
}

export { IAccessory };
