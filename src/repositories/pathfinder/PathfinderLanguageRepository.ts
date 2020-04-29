import {PathfinderLanguageModel} from "../../model/pathfinder/PathfinderLanguageModel";
import {PathfinderLanguage} from "../../db/schemas/pathfinder/PathfinderLanguage";
import {Service} from "@tsed/di";
import {PathfinderLanguageEntityToModelMapper} from "../../mapping/fromEntityToModel/pathfinder/PathfinderLanguageEntityToModelMapper";

@Service()
class PathfinderLanguageRepository {
    private pathfinderLanguageEntityToModelMapper: PathfinderLanguageEntityToModelMapper;

    constructor(
        pathfinderLanguageEntityToModelMapper: PathfinderLanguageEntityToModelMapper
    ) {
        this.pathfinderLanguageEntityToModelMapper = pathfinderLanguageEntityToModelMapper;
    }

    create = async(pathfinderLanguageModel: PathfinderLanguageModel): Promise <PathfinderLanguageModel> => {

    }

    findAll = async(): Promise<PathfinderLanguageModel[]> => {
        const languages = await PathfinderLanguage.findAll();
        return languages.map(language => {
            return this.pathfinderLanguageEntityToModelMapper.map(language)
        })
    }
}