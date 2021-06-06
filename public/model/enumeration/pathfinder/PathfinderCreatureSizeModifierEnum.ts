import {PathfinderCreatureSizeEnum} from "./PathfinderCreatureSizeEnum";

export enum PathfinderCreatureSizeModifierEnum {
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

export const getSizeModFromSizeEnum = (size: PathfinderCreatureSizeEnum): PathfinderCreatureSizeModifierEnum => {
    switch (size) {
        case PathfinderCreatureSizeEnum.FINE:
            return PathfinderCreatureSizeModifierEnum.FINE;
        case PathfinderCreatureSizeEnum.DIMINUTIVE:
            return PathfinderCreatureSizeModifierEnum.DIMINUTIVE;
        case PathfinderCreatureSizeEnum.TINY:
            return PathfinderCreatureSizeModifierEnum.TINY;
        case PathfinderCreatureSizeEnum.SMALL:
            return PathfinderCreatureSizeModifierEnum.SMALL;
        case PathfinderCreatureSizeEnum.MEDIUM:
            return PathfinderCreatureSizeModifierEnum.MEDIUM;
        case PathfinderCreatureSizeEnum.LARGE:
            return PathfinderCreatureSizeModifierEnum.LARGE;
        case PathfinderCreatureSizeEnum.HUGE:
            return PathfinderCreatureSizeModifierEnum.HUGE;
        case PathfinderCreatureSizeEnum.GARGANTUAN:
            return PathfinderCreatureSizeModifierEnum.GARGANTUAN;
        case PathfinderCreatureSizeEnum.COLOSSAL:
            return PathfinderCreatureSizeModifierEnum.COLOSSAL;
    }
};