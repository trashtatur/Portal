import {FormValidatorInterface} from "./FormValidatorInterface";
import validate from "validate.js";
import {oneEntryFormConstraints} from "./OneEntryFormConstraints";

class SkillForm implements FormValidatorInterface {

    validate(data: object): boolean | object {
        return validate(data, oneEntryFormConstraints);
    }
}