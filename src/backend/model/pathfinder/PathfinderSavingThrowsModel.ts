export interface PathfinderSavingThrowsModel {
    reflex: number;
    wisdom: number;
    fortitude: number;
}

export const createPathfinderSavingThrowsModel = (reflex: number, wisdom: number, fortitude: number): PathfinderSavingThrowsModel => ({reflex: reflex, wisdom: wisdom, fortitude: fortitude});
