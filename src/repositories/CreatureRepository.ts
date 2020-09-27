import {CreatureModel} from "../model/CreatureModel";
import {Creature} from "../db/schemas/Creature";
import {Service} from "@tsed/di";
import {CreatureConverter} from "../converter/CreatureConverter";
import {PathfinderCreaturePropertiesRepository} from "./pathfinder/PathfinderCreaturePropertiesRepository";
import {Includeable} from "sequelize";
import {AbstractCreaturePropertyModel} from "../model/AbstractCreaturePropertyModel";
import {DND5CreatureProperties} from "../db/schemas/DND5/DND5CreatureProperties";
import {DND5CreaturePropertiesModel} from "../model/dnd5/DND5CreaturePropertiesModel";
import {DND5CreaturePropertiesRepository} from "./dnd5/DND5CreaturePropertiesRepository";
import {PathfinderCreaturePropertiesModel} from "../model/pathfinder/PathfinderCreaturePropertiesModel";

@Service()
export class CreatureRepository {
    private creatureConverter: CreatureConverter;
    private pathfinderCreaturePropertiesRepository: PathfinderCreaturePropertiesRepository;
    private dnd5CreaturePropertiesRepository: DND5CreaturePropertiesRepository;

    constructor(
        creatureConverter: CreatureConverter,
        pathfinderCreaturePropertiesRepository: PathfinderCreaturePropertiesRepository,
        dnd5CreaturePropertiesRepository: DND5CreaturePropertiesRepository
    ) {
        this.dnd5CreaturePropertiesRepository = dnd5CreaturePropertiesRepository;
        this.pathfinderCreaturePropertiesRepository = pathfinderCreaturePropertiesRepository;
        this.creatureConverter = creatureConverter;
    }

    create = async <T extends AbstractCreaturePropertyModel>(creatureModel: CreatureModel<T>, system: { new(...args: any[]): T }): Promise<CreatureModel<T>> => {
        const creature = await Creature.create(
            {
                name: creatureModel.name
            }
        )
        switch (system.name) {
            case DND5CreaturePropertiesModel.name:
                const dnd5Properties =
                    await this.dnd5CreaturePropertiesRepository.create(
                        creatureModel.creatureProperties as unknown as DND5CreaturePropertiesModel
                    )
                creature.$set('dnd5CreatureProperties', dnd5Properties)
                break;
            case PathfinderCreaturePropertiesModel.name:
                const pathfinderProperties =
                    await this.pathfinderCreaturePropertiesRepository.create(
                        creatureModel.creatureProperties as unknown as PathfinderCreaturePropertiesModel
                    );
                creature.$set('pathfinderCreatureProperties', pathfinderProperties);
        }
        return this.creatureConverter.map(creature, system);
    }

    findOneBy = async <T extends AbstractCreaturePropertyModel>(key, value): Promise<CreatureModel<T>> => {
        return null;
    }

    findAll = async <T extends AbstractCreaturePropertyModel>(includedProperty, propertyModelToInclude: { new(...args: any[]): T }): Promise<CreatureModel<T>[]> => {
        const creatures = await Creature.findAll(
            {
                include: [
                    {
                        model: includedProperty,
                        include: [{all: true, nested: true} as any]
                    }
                ],
            }
        );
        return creatures.map(creatureEntity => {
            return this.creatureConverter.map<T>(creatureEntity, propertyModelToInclude);
        })
    }
}