import {CreatureModel} from "../model/CreatureModel";
import {Creature} from "../db/schemas/Creature";
import {Service} from "@tsed/di";
import {CreatureEntityToModelMapper} from "../mapping/fromEntityToModel/CreatureEntityToModelMapper";
import {PathfinderCreaturePropertiesRepository} from "./pathfinder/PathfinderCreaturePropertiesRepository";
import {Includeable} from "sequelize";
import {AbstractCreaturePropertyModel} from "../model/AbstractCreaturePropertyModel";
import {DND5CreatureProperties} from "../db/schemas/DND5/DND5CreatureProperties";
import {DND5CreaturePropertiesModel} from "../model/dnd5/DND5CreaturePropertiesModel";
import {DND5CreaturePropertiesRepository} from "./dnd5/DND5CreaturePropertiesRepository";
import {PathfinderCreaturePropertiesModel} from "../model/pathfinder/PathfinderCreaturePropertiesModel";

@Service()
export class CreatureRepository {
    private creatureEntityToModelMapper: CreatureEntityToModelMapper;
    private pathfinderCreaturePropertiesRepository: PathfinderCreaturePropertiesRepository;
    private dnd5CreaturePropertiesRepository: DND5CreaturePropertiesRepository;

    constructor(
        creatureEntityToModelMapper: CreatureEntityToModelMapper,
        pathfinderCreaturePropertiesRepository: PathfinderCreaturePropertiesRepository,
        dnd5CreaturePropertiesRepository: DND5CreaturePropertiesRepository
    ) {
        this.dnd5CreaturePropertiesRepository = dnd5CreaturePropertiesRepository;
        this.pathfinderCreaturePropertiesRepository = pathfinderCreaturePropertiesRepository;
        this.creatureEntityToModelMapper = creatureEntityToModelMapper;
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
                creature.$add('dnd5CreatureProperties', dnd5Properties)
                break;
            case PathfinderCreaturePropertiesModel.name:
                const pathfinderProperties =
                    await this.pathfinderCreaturePropertiesRepository.create(
                        creatureModel.creatureProperties as unknown as PathfinderCreaturePropertiesModel
                    );
                creature.$add('pathfinderCreatureProperties', pathfinderProperties);
        }
        return this.creatureEntityToModelMapper.map(creature, system);
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
            return this.creatureEntityToModelMapper.map<T>(creatureEntity, propertyModelToInclude);
        })
    }
}