import {PathfinderCreatureProperties} from "../../db/schemas/pathfinder/PathfinderCreatureProperties";
import {PathfinderCreaturePropertiesModel} from "../../model/pathfinder/PathfinderCreaturePropertiesModel";
import {PathfinderLanguage} from "../../db/schemas/pathfinder/PathfinderLanguage";
import {PathfinderTalent} from "../../db/schemas/pathfinder/PathfinderTalent";
import {PathfinderSkill} from "../../db/schemas/pathfinder/PathfinderSkill";
import {PathfinderAction} from "../../db/schemas/pathfinder/PathfinderAction";
import {PathfinderSkillModel} from "../../model/pathfinder/PathfinderSkillModel";
import {NamedCreatureProperty} from "../../model/NamedCreatureProperty";
import {CreatureStatsModel} from "../../model/CreatureStatsModel";
import {PathfinderSavingThrowsModel} from "../../model/pathfinder/PathfinderSavingThrowsModel";
import {PathfinderTalentModel} from "../../model/pathfinder/PathfinderTalentModel";
import {PathfinderLanguageModel} from "../../model/pathfinder/PathfinderLanguageModel";
import {PathfinderActionModel} from "../../model/pathfinder/PathfinderActionModel";

export class PathfinderCreaturePropertiesRepository {

    create = async (pathfinderCreaturePropertiesModel: PathfinderCreaturePropertiesModel): Promise<PathfinderCreatureProperties> => {
        let pathfinderCreatureProperties = await PathfinderCreatureProperties.create(
            {
                hitpoints: pathfinderCreaturePropertiesModel.hitpoints,
                alignment: pathfinderCreaturePropertiesModel.alignment,
                armorclass: pathfinderCreaturePropertiesModel.armorclass,
                image: pathfinderCreaturePropertiesModel.image,
                type: pathfinderCreaturePropertiesModel.type,
                attackProperties: this.addAttackProperties(pathfinderCreaturePropertiesModel.attackProperties),
                creatureClass: pathfinderCreaturePropertiesModel.creatureClass,
                challenge: pathfinderCreaturePropertiesModel.challenge,
                movement: pathfinderCreaturePropertiesModel.movement,
                ini: pathfinderCreaturePropertiesModel.ini,
                baseAtk: pathfinderCreaturePropertiesModel.baseAtk,
                xp: pathfinderCreaturePropertiesModel.xp,
                size: pathfinderCreaturePropertiesModel.size,
                stats: this.addStats( pathfinderCreaturePropertiesModel.stats),
                saveThrows: this.addSaveThrows(pathfinderCreaturePropertiesModel.saveThrows)
            }
        )
        pathfinderCreatureProperties = await this.checkAssociatedTables(
            pathfinderCreatureProperties, pathfinderCreaturePropertiesModel
        );
        return pathfinderCreatureProperties;
    }

    private checkAssociatedTables = async (
        creatureProperties: PathfinderCreatureProperties,
        creaturePropertiesModel: PathfinderCreaturePropertiesModel
    ): Promise<PathfinderCreatureProperties> => {
        if ( creaturePropertiesModel.languages!== null || creaturePropertiesModel.languages !== [] ) {
            creatureProperties =
                await this.addLanguages(creatureProperties, creaturePropertiesModel.languages);
        }
        if (creaturePropertiesModel.skills !== null || creaturePropertiesModel.skills !== []) {
            creatureProperties =
                await this.addSkills(creatureProperties, creaturePropertiesModel.skills);
        }
        if (creaturePropertiesModel.talents !== null || creaturePropertiesModel.talents !== []) {
            creatureProperties =
                await this.addTalents(creatureProperties, creaturePropertiesModel.talents);
        }
        if (creaturePropertiesModel.actions !== null || creaturePropertiesModel.actions !== []) {
            creatureProperties =
                await this.addActions(creatureProperties, creaturePropertiesModel.actions);
        }
        return creatureProperties
    }

    private addLanguages = async (
        creatureProperties: PathfinderCreatureProperties,
        languageModels: PathfinderLanguageModel[]
    ): Promise<PathfinderCreatureProperties> => {
        const languageNames = languageModels.map(language => language.name)
        const languages: PathfinderLanguage[] = [];
        languageNames.forEach(name => {
            const result = PathfinderLanguage.findOrCreate({where: { name: name}})[0]
            languages.push(result);
        })
        languages.forEach(language => {
            creatureProperties.$add('language', language)
        });
        return creatureProperties
    }

    private addTalents = async (
        creatureProperties: PathfinderCreatureProperties,
        talentModels: PathfinderTalentModel[]
    ): Promise<PathfinderCreatureProperties> => {
        const talentIds = talentModels.map(talent => { return talent.id })
        const talents = await PathfinderTalent.findAll({where: {uuid: talentIds}});
        talents.forEach(talent => {
            creatureProperties.$add('talent', talent)
        });
        return creatureProperties
    }

    private addSkills = async (
        creatureProperties: PathfinderCreatureProperties,
        skillModels: PathfinderSkillModel[]
    ): Promise<PathfinderCreatureProperties> => {
        const skillNames = skillModels.map(elem => {
            return elem.id
        });
        const skills: PathfinderSkill[] = [];
        skillNames.forEach(name => {
            const result = PathfinderSkill.findOrCreate({where: {name: name}})[0]
            skills.push(result);
        })
        skills.forEach(skill => {
            const skillLevel = skillModels.find(elem => {
                return elem.name == skill.name
            }).level;
            creatureProperties.$add('skill', skill, {through: {skillLevel: skillLevel}})
        });
        return creatureProperties
    }

    private addActions = async (
        creatureProperties: PathfinderCreatureProperties,
        actionModels: PathfinderActionModel[]
    ): Promise<PathfinderCreatureProperties> => {
        const actionIds = actionModels.map(action => { return action.id })
        const actions = await PathfinderAction.findAll({where: {uuid: actionIds}});
        actions.forEach(action => {
            creatureProperties.$add('action', action);
        });
        return creatureProperties
    }

    private addAttackProperties = (namedProperties: NamedCreatureProperty[]): string => {
        const objectifiedProperties = namedProperties.map(property => {
            return {
                name: property.name,
                property: property.property
            }
        })
        return JSON.stringify(objectifiedProperties);
    }

    private addStats = (stats: CreatureStatsModel): string => {
        return JSON.stringify(
        {
            str: stats.strength,
            dex: stats.dexterity,
            int: stats.intelligence,
            wis: stats.intelligence,
            con: stats.constitution,
            cha: stats.charisma
        })
    }

    private addSaveThrows = (saveThrows: PathfinderSavingThrowsModel): string => {
        return JSON.stringify(
            {ref: saveThrows.reflex, will: saveThrows.wisdom, fort: saveThrows.fortitude}
        )
    }
}