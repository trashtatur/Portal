import {CreatureViewModel} from "../model/CreatureViewModel";
import {attackPropertyData, creatureData} from "../frontendTypes";
import {StatsViewModel} from "../model/dataModel/StatsViewModel";
import {ActionDataToViewModelMapper} from "./ActionDataToViewModelMapper";
import {LanguageDataToViewModelMapper} from "./LanguageDataToViewModelMapper";
import {SkillDataToViewModelMapper} from "./SkillDataToViewModelMapper";
import {TalentDataToViewModelMapper} from "./TalentDataToViewModelMapper";
import {AttackPropertyViewModel} from "../model/dataModel/AttackPropertyViewModel";
import {SavingThrowsViewModel} from "../model/dataModel/SavingThrowsViewModel";

export class CreatureDataToViewModelMapper {
    private actionDataToViewModelMapper: ActionDataToViewModelMapper;
    private languageDataToViewModelMapper: LanguageDataToViewModelMapper;
    private skillDataToViewModelMapper: SkillDataToViewModelMapper;
    private talentDataToViewModelMapper: TalentDataToViewModelMapper;

    constructor() {
        this.actionDataToViewModelMapper = new ActionDataToViewModelMapper()
        this.languageDataToViewModelMapper = new LanguageDataToViewModelMapper();
        this.skillDataToViewModelMapper = new SkillDataToViewModelMapper();
        this.talentDataToViewModelMapper = new TalentDataToViewModelMapper();
    }

    mapSingle = (data: creatureData): CreatureViewModel => {
        return new CreatureViewModel(
            data._id,
            data._name,
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

    mapMultiple = (data: creatureData[]): CreatureViewModel[] => {
        const viewModels: CreatureViewModel[] = [];
        data.forEach(creature => {
            viewModels.push(this.mapSingle(creature));
        })
        return viewModels;
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