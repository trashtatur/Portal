export type sceneData = {
    id?: string;
    number: number;
    name: string;
    hook: string;
    token: string;
    resolve: string;
    treasure?: string;
    childScenes?: Array<string>;
    parentScenes?: Array<string>;
    additionalDescription?: string;
    images?: Array<string>;
    persons?: Array<string>;
};

export type adventureData = {
    id: string;
    name: string;
    core: string;
    scenes?: sceneData[];
};

export type personData = {

};

export type actionData = {};

export type creatureData = {
    name: string;
    hitpoints: number;
    alignment: string;
    armorclass: number;
    image: string;
    type: string;
    attackProperties: Array<attackProperty>;
    creatureClass: string;
    challenge: number;
    movement: number;
    ini: number;
    baseAtk: number;
    xp?: number;
    size: string;
    stats: stats;
    saveThrows: pathFinderSaveThrows | DND5eSaveThrows;
    languages?: Array<string>;
    skills?: Array<string>;
    talents?: Array<string>;
    actions?: Array<action>;

};

type attackProperty = {
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

type pathFinderSaveThrows = {
    ref: number;
    will: number;
    fort: number;
}

type DND5eSaveThrows = {}

export type action = {
    name: string;
    rangeType: string;
    attackBonus: number;
    damage: string;
    critmod: number;
    damageType: string;
    additionalInfo: string;
}