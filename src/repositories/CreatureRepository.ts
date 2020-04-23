import {CreatureModel} from "../model/CreatureModel";
import {Creature} from "../db/schemas/Creature";
import {Language} from "../db/schemas/Language";
import {Talent} from "../db/schemas/Talent";
import {Skill} from "../db/schemas/Skill";
import {Action} from "../db/schemas/Action";
import {Includeable} from "sequelize";
import {Service} from "@tsed/di";
import {CreatureEntityToModelMapper} from "../mapping/fromEntityToModel/CreatureEntityToModelMapper";

@Service()
export class CreatureRepository {

    constructor(
        creatureEntityToModelMapper: CreatureEntityToModelMapper
    ) {
        this.creatureEntityToModelMapper = creatureEntityToModelMapper;
    }

    create = async (creatureModel: CreatureModel, include?: Includeable[]): Promise<CreatureModel> => {
        const creature = await Creature.create(
            {
                name: creatureModel.name,
                hitpoints: creatureModel.hitpoints,
                alignment: creatureModel.alignment,
                armorclass: creatureModel.armorclass,
                image: creatureModel.image,
                type: creatureModel.type,
                attackProperties: creatureModel.attackProperties, //TODO map
                creatureClass: creatureModel.creatureClass,
                challenge: creatureModel.challenge,
                movement: creatureModel.movement,
                ini: creatureModel.ini,
                baseAtk: creatureModel.baseAtk,
                xp: creatureModel.xp,
                size: creatureModel.size,
                stats: creatureModel.stats, //TODO map
                saveThrows: creatureModel.saveThrows //TODO map
            }
        )
        return null;
    }

    findOneBy = async (key, value): Promise<CreatureModel> => {
        return null;
    }

    findAll = async (): Promise<CreatureModel[]> => {
        const creatures = await Creature.findAll({include: [Language, Talent, Skill, Action]});
        return creatures.map(creatureEntity => {
            return this.creatureEntityToModelMapper.map(creatureEntity);
        })
    }

    private addLanguages = async (creature: Creature, languagesList: string[]): Promise<Creature> => {
        const languages = await Language.findAll({where: {name: languagesList}});
        languages.forEach(language => {
            creature.$add('language', language)
        });
        return creature
    }

    private addTalents = async (creature: Creature, talentList: string[]): Promise<Creature> => {
        const talents = await Talent.findAll({where: {name: talentList}});
        talents.forEach(talent => {
            creature.$add('talent', talent)
        });
        return creature
    }

    private addSkills = async (creature: Creature, skillList: any[]): Promise<Creature> => {
        const skillNames = skillList.map(elem => {
            return elem.name
        });
        const skills = await Skill.findAll({where: {name: skillNames}});
        skills.forEach(skill => {
            const skillLevel = skillList.filter(elem => {
                return elem.name == skill.name
            })[0].level;
            creature.$add('skill', skill, {through: {skillLevel: skillLevel}})
        });
        return creature
    }

    private addActions = async (creature: Creature, actionList: string[]): Promise<Creature> => {
        const actions = await Action.findAll({where: {name: actionList}});
        actions.forEach(action => {
            creature.$add('action', action);
        });
        return creature
    }
    private creatureEntityToModelMapper: CreatureEntityToModelMapper;
}