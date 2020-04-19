import {DataToModelMapperInterface} from "../ModelToEntityMapperInterface";
import {SceneModel} from "../../model/SceneModel";
import {sceneData} from "../../types/backendTypes";

export class SceneModelMapper implements DataToModelMapperInterface {
    map(data: sceneData): SceneModel {
        return null;
    }
}