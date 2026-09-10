export interface DiceRollSpecification {
    diceCount: number;
    bonus?: number;
    diceType: number;
}

export const createDiceRollSpecification = (diceCount: number, diceType: number, bonus?: number): DiceRollSpecification => ({diceCount: diceCount, bonus: bonus, diceType: diceType});
