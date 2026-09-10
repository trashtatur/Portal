export interface PathfinderSavingThrowsViewModel {
    reflex: number;
    wisdom: number;
    fortitude: number;
}

export const createPathfinderSavingThrowsViewModel = (reflex: number, wisdom: number, fortitude: number): PathfinderSavingThrowsViewModel => ({reflex: reflex, wisdom: wisdom, fortitude: fortitude});
