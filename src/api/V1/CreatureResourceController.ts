import {Controller, Get} from "@tsed/common";
import {sequelize} from "../../db/connector";
import {Creature} from "../../db/schemas/Creature";


@Controller('/creature')
export class CreatureResourceController {

    private creatureRepository = sequelize.getRepository(Creature)

    @Get()
    async allCreatures(): Promise<string> {
        let creatures = await this.creatureRepository.findAll();
        return JSON.stringify(creatures)
    }

    @Get('/name/:creatureName')
    async creatureByName(): Promise<string> {
        let creature = await this.creatureRepository.findOne({where: {name: 'test'}});
        return JSON.stringify(creature)
    }
}