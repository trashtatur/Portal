import {SpellComponentEnum} from "../../model/SpellComponentEnum";
import {MagicSchoolEnum} from "../../model/enumeration/dnd5/MagicSchoolEnum";

export type dnd5CreaturePropertiesData = {}

export type dnd5SpellData = {
    _id: string;
    _name: string;
    _description: string;
    _range: string;
    _components: string[];
    _canBeCastAsRitual: boolean;
    _duration: string;
    _needsConcentration: boolean;
    _castingTime: string;
    _school: string;
    _level: number;
    _materials?: string;
    _higherLevelsDescription?: string;
}