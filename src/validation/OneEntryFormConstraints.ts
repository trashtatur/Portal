import {OneEntryFormEntry} from "./types";
import validate from "validate.js";

export const oneEntryFormConstraints = {
    "data": function (value: Array<OneEntryFormEntry>): boolean {
        let isValid = true;
        value.forEach(elem => {
            if (!validate.isString(elem.value)) {
                isValid = false;
            }
        });
        return isValid;
    }
};