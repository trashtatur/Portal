import {Service} from "@tsed/di";
import {Creature} from "../../../db/schemas/Creature";
import {Includeable} from "sequelize";
import {LanguageService} from "./LanguageService";
import {Language} from "../../../db/schemas/Language";
import {SkillService} from "./SkillService";
import {TalentService} from "./TalentService";
import {ActionService} from "./ActionService";
import {Skill} from "../../../db/schemas/Skill";
import {Talent} from "../../../db/schemas/Talent";
import {Action} from "../../../db/schemas/Action";
import * as fs from "fs";
import {join} from "path";

const mkdirp = require('mkdirp');


@Service()
export class CreatureService {

    constructor(
        private readonly languageService: LanguageService,
        private readonly skillService: SkillService,
        private readonly talentService: TalentService,
        private readonly actionService: ActionService,
    ) {

    }


    /**
     * Creates a creature instance. Associates other table entries based on include list
     * @param data
     * @param include
     */
    async create(data: object, include?: Includeable[]) {
        let creature = await Creature.build(
            {
                name: data['name'],
                hitpoints: data['hitpoints'],
                alignment: data['alignment'],
                armorclass: data['armorclass'],
                image: data['image'],
                type: data['type'],
                attackProperties: data['attackProperties'],
                creatureClass: data['creatureClass'],
                challenge: data['challenge'],
                movement: data['movement'],
                ini: data['ini'],
                baseAtk: data['baseAtk'],
                xp: data['xp'] != null ? data['xp'] : null,
                size: data['size'],
                stats: data['stats'],
                saveThrows: data['saveThrows']
            }
        );
        let creature_created = await creature.save();
        let creature_built = await this.checkAssociatedTables(include, data, creature_created);
        creature_built.save();
        return creature
    }

    /**
     * Deletes creature. Finds that creature by name first
     * @param data
     */
    async delete(data: object): Promise<boolean> {
        let creaturesDestroyed = await Creature.destroy({where: {name: data['name']}});
        return creaturesDestroyed > 1;
    }

    /**
     * Updates a single creature instance. Expects the original name in the data package to find it
     * @param changeCreature
     * @param creatureName
     * @param creatureChallenge
     * @param include?
     */
    async update(changeCreature: object, creatureName, creatureChallenge, include?: Includeable[]): Promise<Creature> {
        let creature = await Creature.findOne({where:
                {
                    name: creatureName,
                    challenge: creatureChallenge
                }
        });
        creature.name = changeCreature['name'];
        creature.hitpoints = changeCreature['hitpoints'];
        creature.alignment = changeCreature['alignment'];
        creature.armorclass = changeCreature['armorclass'];
        creature.creatureClass = changeCreature['creatureClass'];
        creature.challenge = changeCreature['challenge'];
        creature.movement = changeCreature['movement'];
        creature.ini = changeCreature['ini'];
        creature.baseAtk = changeCreature['baseAtk'];
        creature.xp = changeCreature['xp'];
        creature.size = changeCreature['size'];
        creature.stats = changeCreature['stats'];
        creature.saveThrows = changeCreature['saveThrows'];
        let creature_updated = await this.checkAssociatedTables(include, changeCreature, creature);
        return creature_updated.save();
    }

    /**
     * Finds instances by given key, if that key exists in the table.
     * Will include associated table data as provided in include list
     * @param key
     * @param value
     * @param include
     */
    async findBy(key, value, include?: Includeable[]): Promise<Creature[]> {
        let condition = {};
        condition[key] = value;
        return Creature.findAll(
            {where: condition, include: include});
    }

    /**
     * Same as findBy. This only gets one instance though.
     * @param key
     * @param value
     * @param include
     */
    async findOneBy(key, value, include?: Includeable[]): Promise<Creature> {
        let condition = {};
        condition[key] = value;
        return Creature.findOne(
            {where: condition, include: include});
    }

    /**
     * Returns all creatures. Includes associated tables as provided
     * @param include
     */
    async findAll(include?: Includeable[]): Promise<Creature[]> {
        return Creature.findAll({include: include});
    }

    async moveCreatureImage(currentLocation: string, newFileName: string) {
        let filename_wo_ext = newFileName.substring(0, newFileName.lastIndexOf("."));
        let intended_dir = join(process.cwd(),"src", "images", "creatureImages", `${filename_wo_ext}`);
        mkdirp(intended_dir, function (err) {
            if (err) {
                console.log("Folder could not be made", err)
            } else {
                fs.rename(currentLocation, join(intended_dir, newFileName), function (err) {
                    if (err) {
                        console.log("File could not be moved", err)
                    }
                })
            }
        });
    }

    private async checkAssociatedTables(include: Includeable[], data: object, creature: Creature): Promise<Creature> {
        if (include.includes(Language)) creature = await this.addLanguages(creature, data['languages']);
        if (include.includes(Skill)) creature = await this.addSkills(creature, data['skills']);
        if (include.includes(Talent)) creature = await this.addTalents(creature, data['talents']);
        if (include.includes(Action)) creature = await this.addActions(creature, data['actions']);
        return creature
    }

    private async addLanguages(creature: Creature, languagesList: string[]): Promise<Creature> {
        let languages = await this.languageService.findBy("name", languagesList);
        languages.forEach(language => {
            // @ts-ignore
            creature.addLanguage( language)
        });
        return creature
    }

    private async addTalents(creature: Creature, talentList: string[]): Promise<Creature> {
        let talents = await this.talentService.findBy("name", talentList);
        talents.forEach(talent => {
            // @ts-ignore
            creature.addTalent(talent)
        });
        return creature
    }

    private async addSkills(creature: Creature, skillList: any[]): Promise<Creature> {
        let skillList_formatted = skillList.map(elem => {return elem.name});
        let skills = await this.skillService.findBy("name", skillList_formatted);
        skills.forEach(skill => {
            let skillLevel = skillList.filter(elem=>{return elem.name==skill.name})[0].level;
            // @ts-ignore
            creature.addSkill(skill,{through:{skillLevel:skillLevel}})
        });
        return creature
    }

    private async addActions(creature: Creature, actionList: string[]): Promise<Creature> {
        let actions = await this.actionService.findBy("name", actionList);
        actions.forEach(action => {
            // @ts-ignore
            creature.addAction(action)
        });
        return creature
    }

}