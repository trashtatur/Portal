import {Service} from "@tsed/di";
import {Creature} from "../db/schemas/Creature";
import {Includeable} from "sequelize";
import {PathfinderLanguageService} from "./pathfinder/PathfinderLanguageService";
import {PathfinderSkillService} from "./pathfinder/PathfinderSkillService";
import {PathfinderTalentService} from "./pathfinder/PathfinderTalentService";
import {PathfinderActionService} from "./pathfinder/PathfinderActionService";
import * as fs from "fs";
import {join} from "path";
import {creatureData} from "../types/backendTypes";
import {CreatureRepository} from "../repositories/CreatureRepository";
import {CreatureModel} from "../model/CreatureModel";
import {AbstractCreaturePropertyModel} from "../model/AbstractCreaturePropertyModel";
const mkdirp = require('mkdirp');

@Service()
export class CreatureService {
    private languageService: PathfinderLanguageService;
    private skillService: PathfinderSkillService;
    private talentService: PathfinderTalentService;
    private actionService: PathfinderActionService;
    private creatureRepository: CreatureRepository;

    constructor(
        languageService: PathfinderLanguageService,
        skillService: PathfinderSkillService,
        talentService: PathfinderTalentService,
        actionService: PathfinderActionService,
        creatureRepository: CreatureRepository
    ) {
        this.languageService = languageService;
        this.skillService = skillService;
        this.talentService = talentService;
        this.actionService = actionService;
        this.creatureRepository = creatureRepository;
    }

    async create<T extends AbstractCreaturePropertyModel>(data: creatureData, system: { new(...args: any[]): T }) {
        const creature = await Creature.create(
            {
                name: data._name
            }
        );

        return creature
    }

    /**
     * @param data
     */
    async delete(data: object): Promise<boolean> {
        const creaturesDestroyed = await Creature.destroy({where: {name: data['name']}});
        return creaturesDestroyed > 1;
    }

    /**
     * @param changeCreature
     * @param creatureName
     * @param creatureChallenge
     * @param include?
     */
    async update(changeCreature: object, creatureName, creatureChallenge, include?: Includeable[]): Promise<Creature> {
       /** const creature = await Creature.findOne({where:
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
        const creature_updated = await this.checkAssociatedTables(include, changeCreature, creature);
        return creature_updated.save();
        **/
       return null
    }

    /**
     * Finds instances by given key, if that key exists in the table.
     * Will include associated table data as provided in include list
     * @param key
     * @param value
     * @param include
     */
    async findBy(key, value, include?: Includeable[]): Promise<Creature[]> {
        const condition = {};
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
        const condition = {};
        condition[key] = value;
        return Creature.findOne(
            {where: condition, include: include});
    }


    async findAll<T extends AbstractCreaturePropertyModel>(includedProperty: Includeable, propertyModelToInclude: { new(...args: any[]): T }): Promise<CreatureModel<T>[]> {
        return this.creatureRepository.findAll<T>(includedProperty, propertyModelToInclude);
    }

    async moveCreatureImage(currentLocation: string, newFileName: string) {
        const filenameWithoutExtension = newFileName.substring(0, newFileName.lastIndexOf("."));
        const intendedDir = join(process.cwd(),"src", "images", "creatureImages", `${filenameWithoutExtension}`);
        mkdirp(intendedDir, function (err) {
            if (err) {
                console.log("Folder could not be made", err)
            } else {
                fs.rename(currentLocation, join(intendedDir, newFileName), function (err) {
                    if (err) {
                        console.log("File could not be moved", err)
                    }
                })
            }
        });
    }
}