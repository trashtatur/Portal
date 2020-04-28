import {languageData} from "../frontendTypes";
import {LanguageViewModel} from "../model/pathfinder/LanguageViewModel";

export class LanguageDataToViewModelMapper {
    mapSingle = (data: languageData): LanguageViewModel => {
        return new LanguageViewModel(data._id, data._name)
    }

    mapMultiple = (data: languageData[]): LanguageViewModel[] => {
        if (!data) {
            return null;
        }
        const viewModels: LanguageViewModel[] = [];
        data.forEach(language => {
            viewModels.push(this.mapSingle(language))
        })
        return viewModels;
    }
}