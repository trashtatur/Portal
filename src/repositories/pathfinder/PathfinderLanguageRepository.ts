import {PathfinderLanguageModel} from "../../model/pathfinder/PathfinderLanguageModel";
import {PathfinderLanguage} from "../../db/schemas/pathfinder/PathfinderLanguage";
import {Service} from "@tsed/di";
import {PathfinderLanguageConverter} from "../../converter/pathfinder/PathfinderLanguageConverter";

@Service()
export class PathfinderLanguageRepository {
    private pathfinderLanguageConverter: PathfinderLanguageConverter;

    constructor(
        pathfinderLanguageConverter: PathfinderLanguageConverter
    ) {
        this.pathfinderLanguageConverter = pathfinderLanguageConverter;
    }

    create = async(pathfinderLanguageModel: PathfinderLanguageModel): Promise <PathfinderLanguageModel> => {
        return null;
    }

    findAll = async(): Promise<PathfinderLanguageModel[]> => {
        const languages = await PathfinderLanguage.findAll();
        return languages.map(language => {
            return this.pathfinderLanguageConverter.convertEntity(language)
        })
    }
}