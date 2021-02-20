import {DiceRollSpecification} from "../model/DiceRollSpecification";

export const convertDamageString = (damageString: string): DiceRollSpecification => {
    //https://regex101.com/r/kmn2VW/2 for testing of regex
    const splitDamageString =
        damageString.match(/(?<diceCount>\d+)(?:d)(?<diceType>\d+)(?<bonus>[+\-]\d+)?/);
    const diceCount = splitDamageString.groups.diceCount;
    const diceType = splitDamageString.groups.diceType;
    const bonus = splitDamageString.groups.bonus ?? null;
    if (bonus) {
        return new DiceRollSpecification(parseInt(diceCount), parseInt(diceType), parseInt(bonus))
    }
    return new DiceRollSpecification(parseInt(diceCount), parseInt(diceType), null)
};