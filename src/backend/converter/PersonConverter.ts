import {ConverterInterface} from "./ConverterInterface";
import type {PersonModel} from "../model/PersonModel";
import {createPersonModel} from "../model/PersonModel";
import {Person} from "../db/schemas/Person";
import type {AdventureModel} from "../model/AdventureModel";
import {createAdventureModel} from "../model/AdventureModel";
import type {SceneModel} from "../model/SceneModel";
import {createSceneModel} from "../model/SceneModel";

export class PersonConverter implements ConverterInterface<Person, PersonModel>{

    convertEntity(entity: Person): PersonModel {
        let adventures = [];
        if (entity.adventures !== undefined) {
            adventures = entity.adventures.map(adventure => {
                createAdventureModel(
                    adventure.uuid,
                    adventure.name,
                    adventure.core
                )
            })
        }
        let scenes = [];
        if (entity.scenes !== undefined) {
            scenes = entity.scenes.map(scene => {
                createSceneModel(
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
        return createPersonModel(
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
