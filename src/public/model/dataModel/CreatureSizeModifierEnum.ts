import {CreatureSizesEnum} from "../enumeration/CreatureSizesEnum";

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

export const getSizeModFromSizeEnum = (size: CreatureSizesEnum): CreatureSizeModifierEnum => {
    switch (size) {
        case CreatureSizesEnum.FINE:
            return CreatureSizeModifierEnum.FINE;
        case CreatureSizesEnum.DIMINUTIVE:
            return CreatureSizeModifierEnum.DIMINUTIVE;
        case CreatureSizesEnum.TINY:
            return CreatureSizeModifierEnum.TINY;
        case CreatureSizesEnum.SMALL:
            return CreatureSizeModifierEnum.SMALL;
        case CreatureSizesEnum.MEDIUM:
            return CreatureSizeModifierEnum.MEDIUM;
        case CreatureSizesEnum.LARGE:
            return CreatureSizeModifierEnum.LARGE;
        case CreatureSizesEnum.HUGE:
            return CreatureSizeModifierEnum.HUGE;
        case CreatureSizesEnum.GARGANTUAN:
            return CreatureSizeModifierEnum.GARGANTUAN;
        case CreatureSizesEnum.COLOSSAL:
            return CreatureSizeModifierEnum.COLOSSAL;
    }
};