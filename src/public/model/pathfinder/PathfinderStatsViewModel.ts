import {getSizeModFromSizeEnum} from "../enumeration/pathfinder/PathfinderCreatureSizeModifierEnum";
import {PathfinderCreatureSizeEnum} from "../enumeration/pathfinder/PathfinderCreatureSizeEnum";

export interface PathfinderStatsViewModel {
    dexterity: number;
    strength: number;
    constitution: number;
    wisdom: number;
    intelligence: number;
    charisma: number;
}

export const createPathfinderStatsViewModel = (str: number, con: number, wis: number, int: number, cha: number, dex: number, creatureSize: PathfinderCreatureSizeEnum, baseAttack: number): PathfinderStatsViewModel => ({});
