import {CreatureTypeEnum} from "../model/enumeration/CreatureTypesEnum";

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

/**
 * @deprecated
 */
export type roundCreature = {
    id: string;
    name: string;
    readonly entryHP: number;
    currentHP: number;
    readonly entryAC: number;
    currentAC: number;
    readonly entryIni: number;
    currentIni: number;
    readonly entryType: CreatureTypeEnum;
    currentType: CreatureTypeEnum;
}

export type oneEntryFormEntry = {
    value: string;
    id: string;
}

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