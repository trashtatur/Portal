import {PathfinderDamageTypesEnum} from "../enumeration/pathfinder/PathfinderDamageTypesEnum";

export interface PathfinderDamageType {
    damageTypes: PathfinderDamageTypesEnum[];
    isHybrid: boolean;
    isMagic: boolean;
}

export const createPathfinderDamageType = (damageTypes: PathfinderDamageTypesEnum[], isMagic: boolean, isHybrid: boolean): PathfinderDamageType => ({damageTypes: damageTypes, isHybrid: isHybrid, isMagic: isMagic});
