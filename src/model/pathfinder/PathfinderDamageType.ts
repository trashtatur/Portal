import {PathfinderDamageTypesEnum} from "../enumeration/pathfinder/PathfinderDamageTypesEnum";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class PathfinderDamageType {
    @JsonProperty({name: 'damageTypes'})
    private readonly _damageTypes: PathfinderDamageTypesEnum[];
    @JsonProperty({name: 'isMagic'})
    private readonly _isMagic: boolean;
    @JsonProperty({name: 'isHybrid'})
    private readonly _isHybrid: boolean;

    constructor(
        damageTypes: PathfinderDamageTypesEnum[],
        isMagic: boolean,
        isHybrid: boolean
    ) {
        this._damageTypes = damageTypes;
        this._isMagic = isMagic;
        this._isHybrid = isHybrid;
    }

    get damageTypes(): PathfinderDamageTypesEnum[] {
        return this._damageTypes;
    }

    get isMagic(): boolean {
        return this._isMagic;
    }

    getDamageTypesString(): string {
        let damageTypesString = '';
        if (this._isHybrid) {
            damageTypesString = '(hybrid) ';
        }
        if (this._isMagic) {
            damageTypesString += '(magic) ';
        }
        damageTypesString += this._damageTypes.join(', ');
        return damageTypesString;
    }
}