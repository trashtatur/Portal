import {NamedCreatureProperty} from "../model/NamedCreatureProperty";
import {namedProperty} from "../types/backendTypes";

export const convertNamedPropertiesString =
    (attackPropertiesString: string): NamedCreatureProperty[] | null => {
        try {
            const attackPropertiesData: namedProperty[] = JSON.parse(attackPropertiesString)
            return attackPropertiesData.map(data => {
                return new NamedCreatureProperty(data.name, data.property)
            });
        } catch (e) {

        }
    };
