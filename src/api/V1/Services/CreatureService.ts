import {Service} from "@tsed/di";
import {Creature} from "../../../db/schemas/Creature";
import {Includeable} from "sequelize";
import {LanguageService} from "./LanguageService";
import {Language} from "../../../db/schemas/Language";
import {SkillService} from "./SkillService";
import {SenseService} from "./SenseService";
import {TalentService} from "./TalentService";
import {ActionService} from "./ActionService";
import {Sense} from "../../../db/schemas/Sense";
import {Skill} from "../../../db/schemas/Skill";
import {Talent} from "../../../db/schemas/Talent";
import {Action} from "../../../db/schemas/Action";

@Service()
export class CreatureService {

    constructor(
        private readonly languageService: LanguageService,
        private readonly skillService: SkillService,
        private readonly senseService: SenseService,
        private readonly talentService: TalentService,
        private readonly actionService: ActionService,
    ) {

    }


    async create(data:object, include?:Includeable[]) {
        let creature = await Creature.build(
            {
                name:data['name'],
                hitpoints: data['hitpoints'],
                alignment: data['alignment'],
                creatureClass: data['creatureClass'],
                challenge: data['challenge'],
                movement: data['movement'],
                ini: data['ini'],
                baseAtk: data['baseAtk'],
                xp: data['xp'] != null? data['xp']: null,
                size: data['size'],
                stats:data['stats'],
                saveThrows:data['saveThrows']
            }
        );
        if (include.includes(Language)) creature = await this.addLanguages(creature, data['languages']);
        if (include.includes(Sense)) creature = await this.addSenses(creature, data['senses']);
        if (include.includes(Skill)) creature = await this.addSkills(creature, data['skills']);
        if (include.includes(Talent)) creature = await this.addTalents(creature, data['talents']);
        if (include.includes((Action))) creature = await this.addActions(creature, data['actions']);

        creature.save();
        return creature
    }

    async delete(data:object) {

    }

    async update(data:object, include?:Includeable[]) {

    }

    async findBy(key,value,include?:Includeable[]): Promise<Creature[]> {
        let condition = {};
        condition[key]=value;
        return Creature.findAll(
            {where: condition, include: include});
    }
    
    async findOneBy(key,value,include?:Includeable[]): Promise<Creature> {
        let condition = {};
        condition[key]=value;
        return Creature.findOne(
            {where: condition, include: include});
    }

    async findAll(include?:Includeable[]): Promise<Creature[]> {
        return Creature.findAll({include: include});
    }

    private async addLanguages(creature: Creature, languagesList: string[]): Promise<Creature> {
        let languages = await this.languageService.findBy("name",languagesList);
        languages.forEach(language => {
            // @ts-ignore
            creature.addLanguage(language)
        });
        return creature
    }

    private async addTalents(creature:Creature, talentList: string[]): Promise<Creature> {
        let talents = await this.talentService.findBy("name",talentList);
        talents.forEach(skill => {
            // @ts-ignore
            creature.addTalent(skill)
        });
        return creature
    }

    private async addSkills(creature:Creature, skillList: string[]): Promise<Creature> {
        let skills = await this.skillService.findBy("name",skillList)
        skills.forEach(skill => {
            // @ts-ignore
            creature.addSkill(skill)
        });
        return creature
    }

    private async addSenses(creature:Creature, senseList: string[]): Promise<Creature> {
        let senses = await this.senseService.findBy("name",senseList);
        senses.forEach(sense => {
            // @ts-ignore
            creature.addSense(sense)
        });
        return creature
    }

    private async addActions(creature:Creature, actionList: string[]): Promise<Creature> {
        let actions = await this.actionService.findBy("name",actionList);
        actions.forEach(action => {
            // @ts-ignore
            creature.addAction(action)
        });
        return creature
    }

}