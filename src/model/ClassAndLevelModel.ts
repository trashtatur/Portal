export interface ClassAndLevelModel {
    className: string;
    level: number;
}

export const createClassAndLevelModel = (className: string, level: number): ClassAndLevelModel => ({className: className, level: level});
