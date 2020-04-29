import {PathfinderSkillModel} from "../../model/pathfinder/PathfinderSkillModel";
import {PathfinderSkill} from "../../db/schemas/pathfinder/PathfinderSkill";
import {Service} from "@tsed/di";
import {PathfinderSkillEntityToModelMapper} from "../../mapping/fromEntityToModel/pathfinder/PathfinderSkillEntityToModelMapper";

@Service()
export class PathfinderSkillRepository {
    private pathfinderSkillEntityToModelMapper: PathfinderSkillEntityToModelMapper;

    constructor(
        pathfinderSkillEntityToModelMapper: PathfinderSkillEntityToModelMapper
    ) {
        this.pathfinderSkillEntityToModelMapper = pathfinderSkillEntityToModelMapper;
    }

    create = async(pathfinderSkillModel: PathfinderSkillModel): Promise<PathfinderSkillModel> => {
        return null;
    }

    findAll = async(): Promise<PathfinderSkillModel[]> => {
        const skills = await PathfinderSkill.findAll();
        return skills.map(skill => {
            return this.pathfinderSkillEntityToModelMapper.map(skill);
        });
    }
}