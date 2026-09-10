import {PathfinderDamageTypesEnum} from "../enumeration/pathfinder/PathfinderDamageTypesEnum";

export interface PathfinderDamageType {
    damageTypes: PathfinderDamageTypesEnum[];
    isMagic: boolean;
    isHybrid: boolean;
}

export const createPathfinderDamageType = (damageTypes: PathfinderDamageTypesEnum[], isMagic: boolean, isHybrid: boolean): PathfinderDamageType => ({damageTypes: damageTypes, isMagic: isMagic, isHybrid: isHybrid});
