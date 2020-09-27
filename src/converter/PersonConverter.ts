import {ConverterInterface} from "./ConverterInterface";
import {PersonModel} from "../model/PersonModel";
import {Person} from "../db/schemas/Person";
import {AdventureModel} from "../model/AdventureModel";
import {SceneModel} from "../model/SceneModel";

export class PersonConverter implements ConverterInterface<Person, PersonModel>{

    convertEntity(entity: Person): PersonModel {
        let adventures = [];
        if (entity.adventures !== undefined) {
            adventures = entity.adventures.map(adventure => {
                new AdventureModel(
                    adventure.uuid,
                    adventure.name,
                    adventure.core
                )
            })
        }
        let scenes = [];
        if (entity.scenes !== undefined) {
            scenes = entity.scenes.map(scene => {
                new SceneModel(
                    scene.uuid,
                    scene.adventureId,
                    scene.number,
                    scene.name,
                    scene.hook,
                    scene.token,
                    scene.act,
                    scene.resolve,
                    [],
                    scene.additionalDescription,
                    null,
                    null,
                    null
                )
            })
        }
        return new PersonModel(
            entity.uuid,
            entity.name,
            entity.type,
            entity.needs,
            entity.desires,
            entity.weaknesses,
            entity.enemies,
            entity.image,
            this.mapCustomFields(entity.customFields),
            entity.additionalDescription,
            adventures,
            scenes
        );
    }

    mapCustomFields = (customFieldsData: string): Map<string, string> => {
        const customFields: Map<string,string> =  new Map();
        return customFields;
    };

    convertMultipleEntities(entities?: Person[]): PersonModel[] | null {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.convertEntity(entity);
        });
    }

}