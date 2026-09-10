export interface NamedPropertyViewModel {
    name: string;
    property: string;
}

export const createNamedPropertyViewModel = (name: string, property: string): NamedPropertyViewModel => ({name: name, property: property});
