import {createNamedCreatureProperty} from "../model/NamedCreatureProperty";
import type {namedProperty} from "../types/backendTypes";

export const convertNamedPropertiesString =
    (attackPropertiesString: string): NamedCreatureProperty[] | null => {
        try {
            const attackPropertiesData: namedProperty[] = JSON.parse(attackPropertiesString)
            return attackPropertiesData.map(data => {
                return createNamedCreatureProperty(data.name, data.property)
            });
        } catch (e) {

        }
    }
