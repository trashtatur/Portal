import {PropertyModel} from "../PropertyModel";

export class DND5CreaturePropertiesModel extends PropertyModel{
    private id: string;
    constructor(
        id: string
    ) {
        super();
        this.id = id;
    }
}