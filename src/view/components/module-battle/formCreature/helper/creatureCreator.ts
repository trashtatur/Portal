import {creature} from "../../../componentTypes";
import {CreatureSizesEnum} from "../../../../model/dataModel/CreatureSizesEnum";


export const createCreature = function(): creature {
    return {
        name:"",
        type: "",
        hitpoints: "",
        armorclass: "",
        alignment: "",
        creatureClass: "",
        attackProperties: [],
        image:"",
        challenge: "",
        movement: "",
        ini: "",
        baseAtk: "",
        xp: "",
        size: CreatureSizesEnum.EMPTY,
        stats: {"str":"","dex":"","int":"","wis":"","con":"","cha":""},
        kmb: "",
        kmv: "",
        saveThrows: {"ref":"","will":"","fort":""},
        languages: [],
        skills: [],
        talents: [],
        actions: [],
    }
};