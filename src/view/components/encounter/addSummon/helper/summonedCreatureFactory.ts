import {creature} from "../../../componentTypes";


export const createSummonedCreature = (): creature => {
    return {
        id: "",
        name:"",
        label: null,
        type: "summon",
        hitpoints: "",
        armorclass: "",
        alignment: "neutral",
        creatureClass: "summoned entity",
        attackProperties: [],
        image:"",
        challenge: 1,
        movement: 9,
        ini: "",
        baseAtk: 0,
        xp: 0,
        size: "medium",
        stats: {"str": 10,"dex": 10,"int": 10,"wis": 10,"con": 10,"cha": 10},
        kmb: 10,
        kmv: 10,
        saveThrows: {"ref": 10,"will": 10,"fort": 10},
        languages: [],
        skills: [],
        talents: [],
        actions: [],
    }
};