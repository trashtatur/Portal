import {PathfinderDamageTypesEnum} from "../enumeration/pathfinder/PathfinderDamageTypesEnum";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class PathfinderDamageType {
    @JsonProperty({name: 'damageType'})
    private _damageType: PathfinderDamageTypesEnum[];
    @JsonProperty({name: 'isHybrid'})
    private _isHybrid: boolean;
    @JsonProperty({name: 'isMagic'})
    private _isMagic: boolean;

    constructor(
        damageTypes: PathfinderDamageTypesEnum[],
        isMagic: boolean,
        isHybrid: boolean
    ) {
        this._damageType = damageTypes;
        this._isMagic = isMagic;
        this._isHybrid = isHybrid;
    }

    get damageType(): PathfinderDamageTypesEnum[] {
        return this._damageType;
    }

    set damageType(value: PathfinderDamageTypesEnum[]) {
        this._damageType = value;
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
        string += this._damageType.join(', ')
        return string;
    }
}