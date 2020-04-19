import {AdventureModel} from "../model/AdventureModel";
import {Adventure} from "../db/schemas/Adventure";

export class AdventureRepository {

    async create(adventureModel: AdventureModel): Promise<Adventure> {
        const adventure: Adventure = await Adventure.create(
            {
                name: adventureModel.name,
                core: adventureModel.core
            }
        );
        return adventure;
    }

    async findOneBy(key, value): Promise<Adventure> {
        return null
    }

    async findAll(): Promise<Adventure[]> {
        return Adventure.findAll();
    }

    async delete(): Promise<void> {

    }

    async update(adventureModel: AdventureModel): Promise<AdventureModel> {
        return null
    }
}