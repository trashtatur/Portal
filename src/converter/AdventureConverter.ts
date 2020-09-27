import {ConverterInterface} from "./ConverterInterface";
import {Adventure} from "../db/schemas/Adventure";
import {AdventureModel} from "../model/AdventureModel";
import {Service} from "@tsed/di";
import {SceneConverter} from "./SceneConverter";
import {PersonConverter} from "./PersonConverter";

@Service()
export class AdventureConverter implements ConverterInterface<Adventure, AdventureModel>{
    private sceneEntityToModelMapper: SceneConverter;
    private personEntityToModelMapper: PersonConverter;

    constructor(
        sceneEntityToModelMapper: SceneConverter,
        personEntityToModelMapper: PersonConverter
    ) {
        this.personEntityToModelMapper = personEntityToModelMapper;
        this.sceneEntityToModelMapper = sceneEntityToModelMapper;
    }

    convertEntity(entity: Adventure): AdventureModel {

        let sceneModels = [];
        if (entity.scenes !== undefined) {
            sceneModels = entity.scenes.map(sceneEntity => {
                return this.sceneEntityToModelMapper.convertEntity(sceneEntity);
            });
        }
        let personModels = [];
        if (entity.persons !== undefined) {
            personModels = entity.persons.map(person => {
                return this.personEntityToModelMapper.convertEntity(person);
            })
        }
        return new AdventureModel(
            entity.uuid,
            entity.name,
            entity.core,
            sceneModels,
            personModels
        )
    }

    convertMultipleEntities(entities?: Adventure[]): AdventureModel[] | null {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.convertEntity(entity);
        });
    }
}