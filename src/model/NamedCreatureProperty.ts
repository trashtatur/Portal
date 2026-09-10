export interface NamedCreatureProperty {
    name: string;
    property: string;
}

export const createNamedCreatureProperty = (name: string, property: string): NamedCreatureProperty => ({name: name, property: property});
