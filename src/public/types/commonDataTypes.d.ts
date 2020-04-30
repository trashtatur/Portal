export type adventureData = {
    _id: string;
    _name: string;
    _core: string;
    _scenes?: Array<sceneData>;
}
export type creatureData = {
    _id: string;
    _name: string;
    _propertyType: string;
    _creatureProperties;
}
type creatureStatsData = {
    _charisma: number;
    _constitution: number;
    _dexterity: number;
    _intelligence: number;
    _strength: number;
    _wisdom: number;
}
export type attackPropertyData = {
    _name: string;
    _property: string;
}
export type sceneData = {
    _id: string;
    _act: number;
    _additionalDescription?: string;
    _adventureId: string;
    _childScenes?: Array<sceneData>;
    _hook: string;
    _images?: Array<string>;
    _name: string;
    _number: number;
    _parentScenes?: Array<sceneData>;
    _persons?: Array<personData>;
    _resolve: string;
    _token: string;
    _treasure?: string;
}
export type languageData = {
    _id: string;
    _name: string;
}
type damageData = {
    _diceCount: number;
    _diceType: number;
    _bonus?: number;
}
export type skillData = {
    _id: string;
    _name: string;
    _level: number;
}
export type personData = {}