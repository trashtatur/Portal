import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class PathfinderSavingThrowsModel {
    @JsonProperty({name: 'reflex'})
    private readonly _reflex: number;
    @JsonProperty({name: 'wisdom'})
    private readonly _wisdom: number;
    @JsonProperty({name: 'fortitude'})
    private readonly _fortitude: number;

    constructor(
        reflex: number,
        wisdom: number,
        fortitude: number
    ) {
        this._reflex = reflex;
        this._wisdom = wisdom;
        this._fortitude = fortitude;
    }

    get reflex(): number {
        return this._reflex;
    }

    get wisdom(): number {
        return this._wisdom;
    }

    get fortitude(): number {
        return this._fortitude;
    }
}