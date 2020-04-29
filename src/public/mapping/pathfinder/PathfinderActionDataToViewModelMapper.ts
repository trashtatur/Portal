import {ActionViewModel} from "../../model/pathfinder/ActionViewModel";
import {DamageViewModel} from "../../model/dataModel/DamageViewModel";
import {DamageType} from "../../model/dataModel/DamageType";
import {pathfinderActionData} from "../../types/pathfinderDataTypes";

export class PathfinderActionDataToViewModelMapper {

    mapSingle = (data: pathfinderActionData): ActionViewModel => {
        return new ActionViewModel(
            data._id,
            data._name,
            data._rangeType,
            data._attackBonus,
            data._range,
            new DamageViewModel(data._damage._diceCount, data._damage._diceType, data._damage._bonus),
            data._critMod,
            new DamageType(data._damageTypes._damageTypes, data._damageTypes._isMagic, data._damageTypes._isHybrid),
            data._additionalInfo
        )
    }

    mapMultiple = (data: pathfinderActionData[]): ActionViewModel[] => {
        if (!data) {
            return null;
        }
        const viewModels: ActionViewModel[] = [];
        data.forEach(action => {
            viewModels.push(this.mapSingle(action));
        })
        return viewModels;
    }
}