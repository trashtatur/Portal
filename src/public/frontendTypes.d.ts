import {CreatureSizesEnum} from "./model/enumeration/CreatureSizesEnum";
import {RangeTypeEnum} from "./model/enumeration/RangeTypeEnum";
import {DamageTypesEnum} from "./model/enumeration/DamageTypesEnum";
import {CreatureTypeEnum} from "./model/enumeration/CreatureTypesEnum";
import {AlignmentEnum} from "./model/enumeration/AlignmentEnum";

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

export type adventureData = {
    _id: string;
    _name: string;
    _core: string;
    _scenes?: Array<sceneData>;
}

export type creatureData = {
    _id: string;
    _name: string;
    _type: CreatureTypeEnum;
    _armorclass: number;
    _hitpoints: number;
    _alignment: AlignmentEnum;
    _creatureClass: string;
    _challenge: number;
    _movement: number;
    _ini: number;
    _baseAtk: number;
    _size: CreatureSizesEnum;
    _stats: creatureStatsData;
    _saveThrows: savingThrowsData;
    _xp?: number;
    _image?: string;
    _actions?: actionData[];
    _languages?: languageData[];
    _skills?: skillData[];
    _talents?: talentData[];
    _attackProperties?: attackPropertyData[];
}

type savingThrowsData = {
    _reflex: number;
    _wisdom: number;
    _fortitude: number;
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

export type actionData = {
    _id: string;
    _name: string;
    _range: number;
    _rangeType: RangeTypeEnum.MELEE | RangeTypeEnum.RANGED;
    _critMod: number;
    _attackBonus: number;
    _damage: damageData;
    _damageTypes: damageTypesData;
    _additionalInfo?: string;
}

type damageTypesData = {
    _damageTypes: Array<DamageTypesEnum>;
    _isMagic: boolean;
    _isHybrid: boolean;
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

export type talentData = {
    _id: string;
    _name: string;
    _type: string;
    _description: string;
    _benefits: string;
    _conditions?: string;
    _note?: string;
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