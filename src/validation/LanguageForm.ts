import {FormValidatorInterface} from "./FormValidatorInterface";
import {Type, validate} from 'validate-typescript'


export class LanguageForm {

    schema = {
        inputs: [{value: Type(String), id: Type(String)}]
    };

    validate(data): boolean | object {
        return validate(this.schema, data)
    }
}
