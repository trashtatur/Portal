import {creature} from "../../../componentTypes";


export let createCreature = function(): creature {
    return {
        name:"",
        type: "",
        hitpoints: "",
        armorclass: "",
        alignment: "",
        creatureClass: "",
        attackProperties: [],
        image:null,
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