import {FormValidatorInterface} from "../FormValidatorInterface";
import {Type, validate} from 'validate-typescript'


export class PathfinderLanguageForm implements FormValidatorInterface{

    schema = {
        inputs: [{value: Type(String), id: Type(String)}]
    };

    validate(data): object {
        return validate(this.schema, data)
    }
}
