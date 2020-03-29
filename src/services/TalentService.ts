import {Service} from "@tsed/di";
import {Includeable, Op} from "sequelize";
import {Talent} from "../db/schemas/Talent";

@Service()
export class TalentService {

    async create(data: any[], include?: Includeable[]): Promise<Talent[]> {
        const talentData = data.map(elem=>{return {name: elem.value}});
        return Talent.bulkCreate(talentData,{include:include})
    }

    async bulkCreateFromCSV(data: Array<Array<string>>): Promise<Talent[]> {

        const resultJSONArray = [];
        data.forEach(dataArray => {
            const talent = {};
            talent['name'] = dataArray[0].trim();
            talent['type'] = dataArray[1].trim();
            talent['description'] = dataArray[2].trim();
            talent['benefits'] = dataArray[5].trim();
            talent['conditions'] = this.formatTalentConditions(dataArray[3], dataArray[4]);
            talent['note'] = dataArray[6].trim() !== '' ? dataArray[6] : null;
            resultJSONArray.push(talent);
        });
        return Talent.bulkCreate(resultJSONArray,
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

    async findBy(key,value,include?: Includeable[]): Promise<Talent[]> {
        const condition = {};
        condition[key]=value;
        const talents: Talent[] = [];
        for (const singleVal of value) {
            condition[key]=singleVal;
            const result = await Talent.findOrCreate({where:condition, defaults:{name:singleVal}});
            talents.push(result[0])
        }
        return talents;
    }

    async findAll(include?: Includeable[]) {
        return Talent.findAll({include:include})
    }

    formatTalentConditions(statPrerequisites?: string, talentPrerequisites?: string): string|null {
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
        if (conditions != '') return conditions;
        return null;
    }

}