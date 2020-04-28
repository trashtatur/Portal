import {Service} from "@tsed/di";
import {Creature} from "../db/schemas/Creature";
import {Includeable} from "sequelize";
import {LanguageService} from "./LanguageService";
import {SkillService} from "./SkillService";
import {TalentService} from "./TalentService";
import {ActionService} from "./ActionService";
import * as fs from "fs";
import {join} from "path";
import {creatureData} from "../types/backendTypes";
import {CreatureRepository} from "../repositories/CreatureRepository";
import {CreatureModel} from "../model/CreatureModel";
import {PropertyModel} from "../model/PropertyModel";
const mkdirp = require('mkdirp');

@Service()
export class CreatureService {
    private languageService: LanguageService;
    private skillService: SkillService;
    private talentService: TalentService;
    private actionService: ActionService;
    private creatureRepository: CreatureRepository;

    constructor(
        languageService: LanguageService,
        skillService: SkillService,
        talentService: TalentService,
        actionService: ActionService,
        creatureRepository: CreatureRepository
    ) {
        this.languageService = languageService;
        this.skillService = skillService;
        this.talentService = talentService;
        this.actionService = actionService;
        this.creatureRepository = creatureRepository;
    }

    /**
     * Creates a creature instance. Associates other table entries based on include list
     * @param data
     * @param include
     */
    async create(data: creatureData, include?: Includeable[]) {
        const creature = await Creature.create(
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
        return creature
    }

    /**
     * Deletes creature. Finds that creature by name first
     * @param data
     */
    async delete(data: object): Promise<boolean> {
        const creaturesDestroyed = await Creature.destroy({where: {name: data['name']}});
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


    async findAll<T extends PropertyModel>(includedProperty: Includeable, propertyModelToInclude: { new(...args: any[]): T }): Promise<CreatureModel<T>[]> {
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