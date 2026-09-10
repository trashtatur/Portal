import {DND5DamageTypeEnum} from "../enumeration/dnd5/DND5DamageTypeEnum";

export interface DND5DamageType {
    isMagic: boolean;
    damageTypes: DND5DamageTypeEnum[];
}

export const createDND5DamageType = (isMagic: boolean, damageTypes: DND5DamageTypeEnum[]): DND5DamageType => ({isMagic: isMagic, damageTypes: damageTypes});
