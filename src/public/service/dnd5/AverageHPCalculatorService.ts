import {DiceRollSpecification} from "../../model/DiceRollSpecification";

export class AverageHPCalculatorService {
    calculateAverageHP = (hitDice: DiceRollSpecification): number => {
        const diceRollAverage = Math.floor(((hitDice.diceType + 1) / 2) * hitDice.diceCount);
        return diceRollAverage + (hitDice.bonus ?? 0);
    }

    /**
     * source : https://rpg.stackexchange.com/questions/113447/how-do-i-decide-how-many-hit-dice-a-custom-creature-has
     * @param hpValue
     * @param hitDiceType
     * @param constitutionModifier
     */
    calculateMatchingHitDice = (hpValue: number, hitDiceType: number, constitutionModifier: number): DiceRollSpecification => {
        const diceRollAverage = (hitDiceType  / 2) + 0.5 + constitutionModifier;

        let hitDiceCount = Math.floor(hpValue / diceRollAverage);
        let hitDiceRollAverage = ((hitDiceType + 1) / 2) * hitDiceCount;
        if (hitDiceRollAverage > hpValue) {
            while (hitDiceRollAverage > hpValue) {
                hitDiceCount--;
                hitDiceRollAverage = ((hitDiceType + 1) / 2) * hitDiceCount;
            }
        }
        const bonus = hitDiceCount * constitutionModifier;
        if (bonus)
        return new DiceRollSpecification(hitDiceCount, hitDiceType, bonus)
    }
}