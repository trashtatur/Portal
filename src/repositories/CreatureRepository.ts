import {CreatureModel} from "../model/CreatureModel";
import {Creature} from "../db/schemas/Creature";
import {Service} from "@tsed/di";
import {CreatureEntityToModelMapper} from "../mapping/fromEntityToModel/CreatureEntityToModelMapper";
import {PathfinderCreaturePropertiesRepository} from "./pathfinder/PathfinderCreaturePropertiesRepository";
import {Includeable} from "sequelize";
import {PropertyModel} from "../model/PropertyModel";

@Service()
export class CreatureRepository {
    private creatureEntityToModelMapper: CreatureEntityToModelMapper;
    private pathfinderCreaturePropertiesRepository: PathfinderCreaturePropertiesRepository;

    constructor(
        creatureEntityToModelMapper: CreatureEntityToModelMapper,
        pathfinderCreaturePropertiesRepository: PathfinderCreaturePropertiesRepository,
    ) {
        this.pathfinderCreaturePropertiesRepository = pathfinderCreaturePropertiesRepository;
        this.creatureEntityToModelMapper = creatureEntityToModelMapper;
    }

    create = async <T extends PropertyModel>(creatureModel: CreatureModel<T>): Promise<CreatureModel<T>> => {
        const creature = await Creature.create(
            {
                name: creatureModel.name
            }
        )
        return null;
    }

    findOneBy = async <T extends PropertyModel>(key, value): Promise<CreatureModel<T>> => {
        return null;
    }

    findAll = async <T extends PropertyModel>(includedProperty, propertyModelToInclude: { new(...args: any[]): T }): Promise<CreatureModel<T>[]> => {
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