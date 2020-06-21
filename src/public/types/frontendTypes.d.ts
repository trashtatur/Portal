import {TypeEnum} from "../model/enumeration/TypesEnum";

export type effectData = {

}

export type effectDataCollection = {
    effects: effectData[];
}

export type loggingContext = {
    caller?: string;
    callee?: string;
}

export type selectableCreatures = {
    label: string;
    options: selectable[];
}

type selectable = {
    label;
    value;
    additionalInfoProperty?;
}

export type selectableAlignment = {
    value: string;
    label: JSX.Element;
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
    readonly entryType: TypeEnum;
    currentType: TypeEnum;
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