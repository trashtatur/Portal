import {DiceRollSpecification} from "../../model/dataModel/DiceRollSpecification";

export class AverageHPCalculatorService {
    calculateAverageHP(hitDice: DiceRollSpecification, charismaModifier: number) {
        const charismaBonusToHP = hitDice.diceCount * charismaModifier;
        const diceRollAverage = ((hitDice.diceType + 1) / 2) * hitDice.diceCount;

        return diceRollAverage + charismaBonusToHP;
    }
}