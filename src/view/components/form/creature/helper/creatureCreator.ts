import {creature} from "../../../componentTypes";


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
        size: "",
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