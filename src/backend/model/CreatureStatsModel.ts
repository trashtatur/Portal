export interface CreatureStatsModel {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export const createCreatureStatsModel = (strength: number, dexterity: number, constitution: number, intelligence: number, wisdom: number, charisma: number): CreatureStatsModel => ({strength: strength, dexterity: dexterity, constitution: constitution, intelligence: intelligence, wisdom: wisdom, charisma: charisma});
