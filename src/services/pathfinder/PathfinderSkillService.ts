import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {PathfinderSkill} from "../../db/schemas/pathfinder/PathfinderSkill";
import {PathfinderSkillRepository} from "../../repositories/pathfinder/PathfinderSkillRepository";
import {PathfinderSkillModel} from "../../model/pathfinder/PathfinderSkillModel";

@Service()
export class PathfinderSkillService {
    private pathfinderSkillRepository: PathfinderSkillRepository;

    constructor(
        pathfinderSkillRepository: PathfinderSkillRepository
    ) {
        this.pathfinderSkillRepository = pathfinderSkillRepository;
    }

    async create(data: any[], include?: Includeable[]): Promise<PathfinderSkill[]> {
        const skillData = data.map(elem=>{return {name: elem.value}});
        return PathfinderSkill.bulkCreate(skillData,{include:include});
    }

    async delete(data: object) {

    }

    async update(data: object, include?: Includeable[]) {

    }

    async findBy(key,value,include?: Includeable[]): Promise<PathfinderSkill[]> {
        const condition = {};
        condition[key]=value;
        const skills: PathfinderSkill[] = [];
        for (const singleVal of value) {
           condition[key]=singleVal;
           const result = await PathfinderSkill.findOrCreate({where:condition, defaults:{name:singleVal}});
           skills.push(result[0])
        }
        return skills;
    }

    async findOneBy(key,value,include?: Includeable[]) {

    }

    async findAll(): Promise<PathfinderSkillModel[]> {
        return this.pathfinderSkillRepository.findAll();
    }
}