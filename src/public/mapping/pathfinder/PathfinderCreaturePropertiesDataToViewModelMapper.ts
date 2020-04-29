import {PathfinderCreaturePropertiesViewModel} from "../../model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {AttackPropertyViewModel} from "../../model/dataModel/AttackPropertyViewModel";
import {SavingThrowsViewModel} from "../../model/dataModel/SavingThrowsViewModel";
import {StatsViewModel} from "../../model/dataModel/StatsViewModel";
import {PathfinderActionDataToViewModelMapper} from "./PathfinderActionDataToViewModelMapper";
import {PathfinderLanguageDataToViewModelMapper} from "./PathfinderLanguageDataToViewModelMapper";
import {PathfinderSkillDataToViewModelMapper} from "./PathfinderSkillDataToViewModelMapper";
import {PathfinderTalentDataToViewModelMapper} from "./PathfinderTalentDataToViewModelMapper";
import {pathfinderCreaturePropertiesData} from "../../types/pathfinderDataTypes";
import {attackPropertyData} from "../../types/commonDataTypes";

export class PathfinderCreaturePropertiesDataToViewModelMapper {
    private actionDataToViewModelMapper: PathfinderActionDataToViewModelMapper;
    private languageDataToViewModelMapper: PathfinderLanguageDataToViewModelMapper;
    private skillDataToViewModelMapper: PathfinderSkillDataToViewModelMapper;
    private talentDataToViewModelMapper: PathfinderTalentDataToViewModelMapper;

    constructor() {
        this.actionDataToViewModelMapper = new PathfinderActionDataToViewModelMapper()
        this.languageDataToViewModelMapper = new PathfinderLanguageDataToViewModelMapper();
        this.skillDataToViewModelMapper = new PathfinderSkillDataToViewModelMapper();
        this.talentDataToViewModelMapper = new PathfinderTalentDataToViewModelMapper();
    }

    map = (data: pathfinderCreaturePropertiesData): PathfinderCreaturePropertiesViewModel => {
        return new PathfinderCreaturePropertiesViewModel(
            data._id,
            data._type,
            data._armorclass,
            data._hitpoints,
            data._alignment,
            data._creatureClass,
            data._challenge,
            data._movement,
            data._ini,
            data._baseAtk,
            data._size,
            new StatsViewModel(
                data._stats._strength,
                data._stats._constitution,
                data._stats._wisdom,
                data._stats._intelligence,
                data._stats._charisma,
                data._stats._dexterity,
                data._size,
                data._baseAtk
            ),
            new SavingThrowsViewModel(data._saveThrows._reflex, data._saveThrows._wisdom, data._saveThrows._fortitude),
            data._xp,
            data._image,
            this.actionDataToViewModelMapper.mapMultiple(data._actions),
            this.languageDataToViewModelMapper.mapMultiple(data._languages),
            this.skillDataToViewModelMapper.mapMultiple(data._skills),
            this.talentDataToViewModelMapper.mapMultiple(data._talents),
            this.mapAttackProperties(data._attackProperties)
        )
    }

    private mapAttackProperties = (data: attackPropertyData[]): AttackPropertyViewModel[] => {
        if (!data) {
            return null;
        }
        const viewModels: AttackPropertyViewModel[] = [];
        data.forEach(attackProperty => {
            viewModels.push(new AttackPropertyViewModel(attackProperty._name, attackProperty._property))
        })
        return viewModels;
    }
}