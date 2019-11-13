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


    /**
     * Creates a creature instance. Associates other table entries based on include list
     * @param data
     * @param include
     */
    async create(data:object, include?:Includeable[]) {
        let creature = await Creature.build(
            {
                name:data['name'],
                hitpoints: data['hitpoints'],
                alignment: data['alignment'],
                armorclass: data['armorclass'],
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
        let creature_created = await creature.save();
        let creature_built = await this.checkAssociatedTables(include,data,creature_created);
        creature_built.save();
        return creature
    }

    /**
     * Deletes creature. Finds that creature by name first
     * @param data
     */
    async delete(data:object): Promise<boolean> {
        let creaturesDestroyed = await Creature.destroy({where:{name:data['name']}});
        return creaturesDestroyed > 1;
    }

    /**
     * Updates a single creature instance. Expects the original name in the data package to find it
     * @param data
     * @param include
     */
    async update(data:object, include?:Includeable[]): Promise<Creature> {
        let creature = await Creature.findOne({where:{name:data['original_name']}});
        creature.name = data['name'];
        creature.hitpoints = data['hitpoints'];
        creature.alignment = data['alignment'];
        creature.armorclass = data['armorclass'];
        creature.creatureClass =  data['creatureClass'];
        creature.challenge = data['challenge'];
        creature.movement = data['movement'];
        creature.ini = data['ini'];
        creature.baseAtk = data['baseAtk'];
        creature.xp =  data['xp'];
        creature.size =  data['size'];
        creature.stats = data['stats'];
        creature.saveThrows = data['saveThrows'];
        let creature_updated = await this.checkAssociatedTables(include,data,creature);
        return creature_updated.save();
    }

    /**
     * Finds instances by given key, if that key exists in the table.
     * Will include associated table data as provided in include list
     * @param key
     * @param value
     * @param include
     */
    async findBy(key,value,include?:Includeable[]): Promise<Creature[]> {
        let condition = {};
        condition[key]=value;
        return Creature.findAll(
            {where: condition, include: include});
    }

    /**
     * Same as findBy. This only gets one instance though.
     * @param key
     * @param value
     * @param include
     */
    async findOneBy(key,value,include?:Includeable[]): Promise<Creature> {
        let condition = {};
        condition[key]=value;
        return Creature.findOne(
            {where: condition, include: include});
    }

    /**
     * Returns all creatures. Includes associated tables as provided
     * @param include
     */
    async findAll(include?:Includeable[]): Promise<Creature[]> {
        return Creature.findAll({include: include});
    }

    private async checkAssociatedTables(include:Includeable[], data:object, creature:Creature): Promise<Creature>{
        if (include.includes(Language)) creature = await this.addLanguages(creature, data['languages']);
        if (include.includes(Sense)) creature = await this.addSenses(creature, data['senses']);
        if (include.includes(Skill)) creature = await this.addSkills(creature, data['skills']);
        if (include.includes(Talent)) creature = await this.addTalents(creature, data['talents']);
        if (include.includes((Action))) creature = await this.addActions(creature, data['actions']);
        return creature
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
        talents.forEach(talent => {
            // @ts-ignore
            creature.addTalent(talent)
        });
        return creature
    }

    private async addSkills(creature:Creature, skillList: string[]): Promise<Creature> {
        let skills = await this.skillService.findBy("name",skillList);
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