import {FormValidatorInterface} from "./FormValidatorInterface";
import {sceneData} from "../types/backendTypes";
import {Optional, Type, validate} from "validate-typescript";

export class SceneForm implements FormValidatorInterface{

    schema = {
        _id: Optional(Type(String)),
        _adventureId: Type(String),
        _number: Type(Number),
        _name: Type(String),
        _hook: Type(String),
        _token: Type(String),
        _resolve: Type(String),
        _treasure: Type(String),
        _additionalDescription: Optional(Type(String)),
        _images: Optional([Type(String)]),
        _persons: Optional([Type(String)])
    };

    validate(data: sceneData): boolean | object {
        return validate(this.schema, data)
    }

}