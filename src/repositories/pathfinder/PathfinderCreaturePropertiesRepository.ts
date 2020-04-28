import {PathfinderCreatureProperties} from "../../db/schemas/pathfinder/PathfinderCreatureProperties";
import {PathfinderCreaturePropertiesModel} from "../../model/pathfinder/PathfinderCreaturePropertiesModel";
import {PathfinderLanguage} from "../../db/schemas/pathfinder/PathfinderLanguage";
import {PathfinderTalent} from "../../db/schemas/pathfinder/PathfinderTalent";
import {PathfinderSkill} from "../../db/schemas/pathfinder/PathfinderSkill";
import {PathfinderAction} from "../../db/schemas/pathfinder/PathfinderAction";
import {PathfinderSkillModel} from "../../model/pathfinder/PathfinderSkillModel";
import {Includeable} from "sequelize";

export class PathfinderCreaturePropertiesRepository {

    create = (pathfinderCreaturePropertiesModel: PathfinderCreaturePropertiesModel) => {
        const pathfinderCreatureProperties = PathfinderCreatureProperties.create(
            {
                hitpoints: pathfinderCreaturePropertiesModel.hitpoints,
                alignment: pathfinderCreaturePropertiesModel.alignment,
                armorclass: pathfinderCreaturePropertiesModel.armorclass,
                image: pathfinderCreaturePropertiesModel.image,
                type: pathfinderCreaturePropertiesModel.type,
                attackProperties: pathfinderCreaturePropertiesModel.attackProperties,
                creatureClass: pathfinderCreaturePropertiesModel.creatureClass,
                challenge: pathfinderCreaturePropertiesModel.challenge,
                movement: pathfinderCreaturePropertiesModel.movement,
                ini: pathfinderCreaturePropertiesModel.ini,
                baseAtk: pathfinderCreaturePropertiesModel.baseAtk,
                xp: pathfinderCreaturePropertiesModel.xp,
                size: pathfinderCreaturePropertiesModel.size,
                stats: pathfinderCreaturePropertiesModel.stats,
                saveThrows: pathfinderCreaturePropertiesModel.saveThrows
            }
        )
    }

    private checkAssociatedTables = async (
        include: Includeable[],
        data: object,
        creatureProperties: PathfinderCreatureProperties
    ): Promise<PathfinderCreatureProperties> => {
        if (include.includes(PathfinderLanguage)) creatureProperties =
            await this.addLanguages(creatureProperties, data['languages']);
        if (include.includes(PathfinderSkill)) creatureProperties =
            await this.addSkills(creatureProperties, data['skills']);
        if (include.includes(PathfinderTalent)) creatureProperties =
            await this.addTalents(creatureProperties, data['talents']);
        if (include.includes(PathfinderAction)) creatureProperties =
            await this.addActions(creatureProperties, data['actions']);
        return creatureProperties
    }

    private addLanguages = async (
        creatureProperties: PathfinderCreatureProperties,
        languagesList: string[]
    ): Promise<PathfinderCreatureProperties> => {
        const languages = await PathfinderLanguage.findAll({where: {name: languagesList}});
        languages.forEach(language => {
            creatureProperties.$add('language', language)
        });
        return creatureProperties
    }

    private addTalents = async (
        creatureProperties: PathfinderCreatureProperties,
        talentList: string[]
    ): Promise<PathfinderCreatureProperties> => {
        const talents = await PathfinderTalent.findAll({where: {name: talentList}});
        talents.forEach(talent => {
            creatureProperties.$add('talent', talent)
        });
        return creatureProperties
    }

    private addSkills = async (
        creatureProperties: PathfinderCreatureProperties,
        skillList: PathfinderSkillModel[]
    ): Promise<PathfinderCreatureProperties> => {
        const skillNames = skillList.map(elem => {
            return elem.name
        });
        const skills = await PathfinderSkill.findAll({where: {name: skillNames}});
        skills.forEach(skill => {
            const skillLevel = skillList.filter(elem => {
                return elem.name == skill.name
            })[0].level;
            creatureProperties.$add('skill', skill, {through: {skillLevel: skillLevel}})
        });
        return creatureProperties
    }

    private addActions = async (
        creatureProperties: PathfinderCreatureProperties,
        actionList: string[]
    ): Promise<PathfinderCreatureProperties> => {
        const actions = await PathfinderAction.findAll({where: {name: actionList}});
        actions.forEach(action => {
            creatureProperties.$add('action', action);
        });
        return creatureProperties
    }
}