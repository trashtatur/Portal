export type sceneData = {
    _id?: string;
    _adventureId: string;
    _number: number;
    _name: string;
    _hook: string;
    _token: string;
    _act: number;
    _resolve: string;
    _treasure?: string;
    _childScenes?: Array<sceneData>;
    _parentScenes?: Array<sceneData>;
    _additionalDescription?: string;
    _images?: Array<string>;
    _persons?: Array<string>;
};

export type adventureData = {
    id: string;
    name: string;
    core: string;
    scenes?: sceneData[];
};

export type personData = {

};

export type creatureData = {
    _id?: string;
    _name: string;
    _properties: string;
};

type namedProperty = {
    name: string;
    property: string;
}

type stats = {
    str: number;
    dex: number;
    int: number;
    wis: number;
    con: number;
    cha: number;
}