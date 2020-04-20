import {Service} from "@tsed/di";
import {PersonModel} from "../model/PersonModel";
import {personData} from "../types/backendTypes";

@Service()
export class PersonService {
    create = async(data: personData): Promise<PersonModel> => {
        return null;
    };

    findOneBy = async(key, value): Promise<PersonModel> => {
        return null;
    };

    findAll = async(): Promise<PersonModel[]> => {
        return null;
    };
}