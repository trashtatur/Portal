import {DND5DamageTypeEnum} from "../enumeration/dnd5/DND5DamageTypeEnum";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class DND5DamageType {
    @JsonProperty({name: 'isMagic'})
    private readonly _isMagic: boolean;
    @JsonProperty({name: 'damageTypes'})
    private readonly _damageTypes: DND5DamageTypeEnum[];

    constructor(
        isMagic: boolean,
        damageTypes: DND5DamageTypeEnum[]
    ) {
        this._isMagic = isMagic;
        this._damageTypes = damageTypes;
    }

    get isMagic(): boolean {
        return this._isMagic;
    }

    get damageTypes(): DND5DamageTypeEnum[] {
        return this._damageTypes;
    }
}