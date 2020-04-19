import {FormValidatorInterface} from "./FormValidatorInterface";
import {Optional, Type, validate} from 'validate-typescript';

export class AdventureForm implements FormValidatorInterface{

    schema = {

        _id: Optional(Type(String)),
        _name: Type(String),
        _core: Type(String),
    };
    validate(data): boolean | object {
        return validate(this.schema, data)
    }
}