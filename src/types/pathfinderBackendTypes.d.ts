import {namedProperty} from "./backendTypes";

type pathFinderSaveThrowsData = {
    _ref: number;
    _will: number;
    _fort: number;
}
export type pathfinderActionData = {
    name: string;
    rangeType: string;
    attackBonus: number;
    damage: string;
    critmod: number;
    damageType: string;
    additionalInfo: string;
}

type pathfinderCreatureStatsData = {

}

export type pathfinderLanguageData = {
    _id?: string;
    _name: string;
}

export type pathfinderSkillsData = {
    _id?: string;
    _name: string;
    _level: number;
}

export type pathfinderTalentData = {
    _id?: string;
    _name: string;
    _type: string;
    _description: string;
    _benefits: string;
    _conditions?: string;
    _note?: string;
}

export type pathfinderCreaturePropertiesData = {
    _id?: string;
    _type: string;
    _armorclass: number;
    _hitpoints: number;
    _alignment: string;
    _creatureClass: string;
    _challenge: number;
    _movement: number;
    _ini: number;
    _baseAtk: number;
    _size: string;
    _stats: pathfinderCreatureStatsData;
    _saveThrows: pathFinderSaveThrowsData;
    _xp?: number;
    _image?: string;
    _actions?: pathfinderActionData[];
    _languages: pathfinderLanguageData[];
    _skills?: pathfinderSkillsData[];
    _talents?: pathfinderTalentData[];
    _attackProperties?: namedProperty[];
}