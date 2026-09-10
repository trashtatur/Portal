export interface PathfinderLanguageViewModel {
    id: string;
    name: string;
}

export const createPathfinderLanguageViewModel = (id: string, name: string): PathfinderLanguageViewModel => ({id: id, name: name});
