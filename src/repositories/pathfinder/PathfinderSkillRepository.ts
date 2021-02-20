import {PathfinderSkillModel} from "../../model/pathfinder/PathfinderSkillModel";
import {PathfinderSkill} from "../../db/schemas/pathfinder/PathfinderSkill";
import {Service} from "@tsed/di";
import {PathfinderSkillConverter} from "../../converter/pathfinder/PathfinderSkillConverter";

@Service()
export class PathfinderSkillRepository {
    private pathfinderSkillConverter: PathfinderSkillConverter;

    constructor(
        pathfinderSkillConverter: PathfinderSkillConverter
    ) {
        this.pathfinderSkillConverter = pathfinderSkillConverter;
    }

    create = async(pathfinderSkillModel: PathfinderSkillModel): Promise<PathfinderSkillModel> => {
        return null;
    }

    findAll = async(): Promise<PathfinderSkillModel[]> => {
        const skills = await PathfinderSkill.findAll();
        return skills.map(skill => {
            return this.pathfinderSkillConverter.convertEntity(skill);
        });
    }
}