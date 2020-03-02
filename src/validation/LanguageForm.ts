import {FormValidatorInterface} from "./FormValidatorInterface";
import validate from "validate.js";
import {oneEntryFormConstraints} from "./OneEntryFormConstraints";

class LanguageForm implements FormValidatorInterface {

    validate(data: object): boolean | object {
        return validate(data, oneEntryFormConstraints)
    }
}