import {PathfinderDamageTypesEnum} from "../enumeration/pathfinder/PathfinderDamageTypesEnum";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class PathfinderDamageType {
    @JsonProperty({name: 'damageTypes'})
    private _damageTypes: PathfinderDamageTypesEnum[];
    @JsonProperty({name: 'isHybrid'})
    private _isHybrid: boolean;
    @JsonProperty({name: 'isMagic'})
    private _isMagic: boolean;

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

    set damageTypes(value: PathfinderDamageTypesEnum[]) {
        this._damageTypes = value;
    }

    get isMagic(): boolean {
        return this._isMagic;
    }

    set isMagic(value: boolean) {
        this._isMagic = value;
    }

    get isHybrid(): boolean {
        return this._isHybrid;
    }

    set isHybrid(value: boolean) {
        this._isHybrid = value;
    }

    getFullDamageTypeString = (): string => {
        let string = '';
        if (this._isHybrid) {
            string += '(hybrid) '
        }
        if (this._isMagic) {
            string += '(magic) '
        }
        string += this._damageTypes.join(', ')
        return string;
    }
}