import {FormValidatorInterface} from "./FormValidatorInterface";
import {oneEntryFormConstraints} from "./OneEntryFormConstraints";
import validate from "validate.js";

class TalentForm implements FormValidatorInterface {

    validate(data: object): boolean | object {
        return validate(data, oneEntryFormConstraints);
    }
}