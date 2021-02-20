import {ConverterInterface} from "./ConverterInterface";
import {Scene} from "../db/schemas/Scene";
import {SceneModel} from "../model/SceneModel";
import {Service} from "@tsed/di";
import {PersonConverter} from "./PersonConverter";

@Service()
export class SceneConverter implements ConverterInterface<Scene, SceneModel>{
    private personEntityToModelMapper: PersonConverter;

    constructor(personEntityToModelMapper: PersonConverter) {
        this.personEntityToModelMapper = personEntityToModelMapper;
    }

    convertEntity(entity: Scene): SceneModel {
        return new SceneModel(
            entity.uuid,
            entity.adventureId,
            entity.number,
            entity.name,
            entity.hook,
            entity.token,
            entity.act,
            entity.resolve,
            [],
            entity.additionalDescription,
            entity.images.split(','),
            entity.treasure,
            this.personEntityToModelMapper.convertMultipleEntities(entity.persons)
        )
    }

    convertMultipleEntities(entities?: Scene[]): SceneModel[] | null {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.convertEntity(entity);
        });
    }
}