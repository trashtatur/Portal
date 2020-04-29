import {AbstractCreaturePropertyModel} from "../AbstractCreaturePropertyModel";

export class DND5CreaturePropertiesModel extends AbstractCreaturePropertyModel{
    private id: string;
    constructor(
        id: string
    ) {
        super();
        this.id = id;
    }
}