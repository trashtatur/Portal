import {DiceRollSpecification} from "../model/dataModel/DiceRollSpecification";

export const getEnumKeyForValue = <T> (value: string, enumToSearch: T): T[keyof T] => {
    for (const key of Object.keys(enumToSearch)) {
        if (enumToSearch[key] === value.trim()) {
            return enumToSearch[key]
        }
    }
    return null;
}

export const mapDamageStringToDamageDataModel = (damageString: string): DiceRollSpecification => {
    //https://regex101.com/r/kmn2VW/2 for testing of regex
    const splitDamageString =
        damageString.match(/(?<diceCount>\d+)(?:d)(?<diceType>\d+)(?<bonus>[+\-]\d+)?/)
    const diceCount = splitDamageString.groups.diceCount;
    const diceType = splitDamageString.groups.diceType;
    const bonus = splitDamageString.groups.bonus ?? null;
    if (bonus) {
        return new DiceRollSpecification(parseInt(diceCount), parseInt(diceType), parseInt(bonus))
    }
    return new DiceRollSpecification(parseInt(diceCount), parseInt(diceType), null)
}