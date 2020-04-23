import {action, attackProperty, saveThrowsType, statblock} from "./module-battle/creaturecard/CreatureCard";
import {CreatureSizesEnum} from "../model/dataModel/CreatureSizesEnum";
import {ReactElement} from "react";

export type creature = {
    id?: string;
    name: string;
    type: creatureType;
    hitpoints;
    armorclass;
    label?: number;
    alignment: string;
    image?: File | string;
    attackProperties: attackProperty[];
    creatureClass: string;
    challenge;
    movement;
    ini;
    currentIni?;
    currentAC?;
    currentHP?;
    baseAtk;
    xp?;
    kmb;
    kmv;
    sortByIni?: Function;
    handleCurrentACChange?: Function;
    handleCurrentHPChange?: Function;
    handleCurrentTypeChange?: Function;
    skills: any[];
    size: CreatureSizesEnum;
    stats: statblock;
    saveThrows: saveThrowsType;
    languages: string[];
    talents: talent[];
    actions: action[];
}

export type selectableCreatures = {

    label: string;
    options: selectable[];
}

type selectable = {
    label;
    value;
}

export type selectableAlignment = {
    value: string;
    label: JSX.Element;
}


export type creatureAction = {
    name: string;
    rangeType: string;
    attackBonus: number;
    range?: number;
    damage: string;
    critmod: string;
    damageType: string;
    additionalInfo: string;
}

export type attackProperty = {
    id?: string;
    name: string;
    property: string;
}

export type talent = {
    name: string;
    type: string;
    description;
    benefits: string;
    conditions: string;
    note?: string;
}

export type action = {
    name: string;
    rangeType: string;
    attackBonus: number;
    damage: string;
    critmod: string;
    damageType: string;
    additionalInfo: string;
}

export type saveThrowsType = {
    ref;
    will;
    fort;
}

export type statblock = {
    str;
    con;
    wis;
    int;
    cha;
    dex;
}

export type round = {
    active: boolean;
    number: number;
    startedAt?: Date;
    creatureEvents: roundCreature[];
}

export type roundCreature = {
    id: string;
    name: string;
    readonly entryHP: number;
    currentHP: number;
    readonly entryAC: number;
    currentAC: number;
    readonly entryIni: number;
    currentIni: number;
    readonly entryType: creatureType;
    currentType: creatureType;
}

export type languageDataEntry = {
    name: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
}

export type skillDataEntry = {
    name: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
}

export type talentDataEntry = {
    name: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
}

export type actionDataEntry = {
    name: string;
    rangeType: string;
    attackBonus: number;
    damage: string;
    critMod: string;
    damageType: string;
    additionalInfo: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
}

export type oneEntryFormEntry = {
    value: string;
    id: string;
}

export type creatureType = "ally" | "player" | "monster" | "summon" | ""

export type adventureData = {
    _id: string;
    _name: string;
    _core: string;
    _scenes?: Array<sceneData>;
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

export type personData = {}

export type sceneGraphData = {
    nodes: Array<nodeData>;
    links: Array<linkData>;
}

type nodeData = {
    id: number;
    color?: string;
    size?: string;
    symbolType?: string;
    fontColor?: string;
}

type linkData = {
    source: number;
    target: number;
}