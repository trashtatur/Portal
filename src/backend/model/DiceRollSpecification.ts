export interface DiceRollSpecification {
    diceCount: number;
    diceType: number;
    bonus: number;
    getDamageString(): string;
}

export const createDiceRollSpecification = (diceCount: number, diceType: number, bonus?: number): DiceRollSpecification => ({
    diceCount,
    diceType,
    bonus,
    getDamageString: () => {
        if (!bonus) return `${diceCount}d${diceType}`;
        return `${diceCount}d${diceType}${bonus > 0 ? '+' : ''}${bonus}`;
    }
});
