import {Get} from "@tsed/schema";
import {Controller} from "@tsed/di";

@Controller("/systems")
export class SystemsController {

    @Get()
    allSystemsAction(): string[]
    {
        return ['dnd5', 'pathfinder', 'cthulhu', 'starTrek'];
    }
}
