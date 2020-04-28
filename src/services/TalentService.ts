import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {PathfinderTalent} from "../db/schemas/pathfinder/PathfinderTalent";

@Service()
export class TalentService {

    async create(data: any[], include?: Includeable[]): Promise<PathfinderTalent[]> {
        const talentData = data.map(elem=>{return {name: elem.value}});
        return PathfinderTalent.bulkCreate(talentData,{include:include})
    }

    async bulkCreateFromCSV(data: Array<Array<string>>): Promise<PathfinderTalent[]> {

        const resultJSONArray = [];
        data.forEach(dataArray => {
            const talent = {};
            talent['name'] = dataArray[0].trim();
            talent['type'] = dataArray[1].trim();
            talent['description'] = dataArray[2].trim();
            talent['benefits'] = dataArray[6].trim();
            talent['conditions'] = this.formatTalentConditions(dataArray[3], dataArray[4], dataArray[5]);
            talent['note'] = null;
            resultJSONArray.push(talent);
        });
        return PathfinderTalent.bulkCreate(resultJSONArray,
            {updateOnDuplicate:
                    [
                        'conditions',
                        'benefits',
                        'type',
                        'description',
                        'note'
                    ]
            });
    }

    async delete(data: object) {

    }

    async update(data: object, include?: Includeable[]) {

    }

    async findBy(key,value,include?: Includeable[]): Promise<PathfinderTalent[]> {
        const condition = {};
        condition[key]=value;
        const talents: PathfinderTalent[] = [];
        for (const singleVal of value) {
            condition[key]=singleVal;
            const result = await PathfinderTalent.findOrCreate({where:condition, defaults:{name:singleVal}});
            talents.push(result[0])
        }
        return talents;
    }

    async findAll(include?: Includeable[]) {
        return PathfinderTalent.findAll({include:include})
    }

    formatTalentConditions(statPrerequisites?: string, talentPrerequisites?: string, skillPreRequisites?: string): string|null {
        let conditions = '';
        if (statPrerequisites) {
            conditions+=statPrerequisites;
        }
        if (talentPrerequisites) {
            if (conditions != '') {
                conditions+=', '
            }
            conditions+=talentPrerequisites
        }

        if (talentPrerequisites) {
            if (conditions != '') {
                conditions+=', '
            }
            conditions+=skillPreRequisites
        }
        if (conditions != '') return conditions;
        return null;
    }

}