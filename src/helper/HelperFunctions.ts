import {DiceRollSpecification} from "../model/dataModel/DiceRollSpecification";
import {CreatureStatsModel} from "../model/dataModel/CreatureStatsModel";
import {attackProperty, pathFinderSaveThrows, stats} from "../types/backendTypes";
import {NamedCreatureProperty} from "../model/dataModel/NamedCreatureProperty";
import {PathfinderSavingThrowsModel} from "../model/dataModel/pathfinder/PathfinderSavingThrowsModel";

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

export const mapStatsStringToStatsDataModel = (statsString: string): CreatureStatsModel => {
    try {
        const statsData: stats = JSON.parse(statsString);
        return new CreatureStatsModel(
            statsData.str,
            statsData.dex,
            statsData.con,
            statsData.int,
            statsData.wis,
            statsData.cha
        )
    } catch (e) {

    }
}

export const mapNamedPropertiesStringToNamedPropertiesModel =
    (attackPropertiesString: string): NamedCreatureProperty[] | null => {
        try {
            const attackPropertiesData: attackProperty[] = JSON.parse(attackPropertiesString)
            return attackPropertiesData.map(data => {
                return new NamedCreatureProperty(data.name, data.property)
            });
        } catch (e) {

        }
    }
