import {namedProperty} from "./backendTypes";

type pathFinderSaveThrowsData = {
    ref: number;
    will: number;
    fort: number;
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
    id?: string;
    name: string;
}

export type pathfinderSkillsData = {
    id?: string;
    name: string;
    level: number;
}

export type pathfinderTalentData = {
    id?: string;
    name: string;
    type: string;
    description: string;
    benefits: string;
    conditions?: string;
    note?: string;
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