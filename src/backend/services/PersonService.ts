import {Service} from "@tsed/di";
import type {PersonModel} from "../model/PersonModel";
import {createPersonModel} from "../model/PersonModel";
import type {personData} from "../../types/backendTypes";

@Service()
export class PersonService {
    create = async(data: personData): Promise<PersonModel> => {
        return null;
    };

    findOneBy = async(key, value): Promise<PersonModel> => {
        return null;
    };

    findAll = async(): Promise<PersonModel[]> => {okay, w
        return null;
    };
}
