export class NamedCreatureProperty {
    private readonly _name: string;
    private readonly _property: string;

    constructor(
        name: string,
        property: string
    ) {
        this._name = name;
        this._property = property;
    }

    get name(): string {
        return this._name;
    }

    get property(): string {
        return this._property;
    }
}