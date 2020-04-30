import {CreatureSizeEnum} from "../enumeration/CreatureSizeEnum";

export enum CreatureSizeModifierEnum {
    FINE = -8,
    DIMINUTIVE = -4,
    TINY = -2,
    SMALL = -1,
    MEDIUM = 0,
    LARGE = 1,
    HUGE = 2,
    GARGANTUAN = 4,
    COLOSSAL = 8
}

export const getSizeModFromSizeEnum = (size: CreatureSizeEnum): CreatureSizeModifierEnum => {
    switch (size) {
        case CreatureSizeEnum.FINE:
            return CreatureSizeModifierEnum.FINE;
        case CreatureSizeEnum.DIMINUTIVE:
            return CreatureSizeModifierEnum.DIMINUTIVE;
        case CreatureSizeEnum.TINY:
            return CreatureSizeModifierEnum.TINY;
        case CreatureSizeEnum.SMALL:
            return CreatureSizeModifierEnum.SMALL;
        case CreatureSizeEnum.MEDIUM:
            return CreatureSizeModifierEnum.MEDIUM;
        case CreatureSizeEnum.LARGE:
            return CreatureSizeModifierEnum.LARGE;
        case CreatureSizeEnum.HUGE:
            return CreatureSizeModifierEnum.HUGE;
        case CreatureSizeEnum.GARGANTUAN:
            return CreatureSizeModifierEnum.GARGANTUAN;
        case CreatureSizeEnum.COLOSSAL:
            return CreatureSizeModifierEnum.COLOSSAL;
    }
};