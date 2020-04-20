import {BodyParams, Controller, Get, PathParams, Post, Put} from "@tsed/common";
import {personData} from "../../types/backendTypes";
import {PersonService} from "../../services/PersonService";

@Controller('/Person')
export class PersonResourceController {
    private readonly personService: PersonService;

    constructor(personService: PersonService) {
        this.personService = personService;
    }

    @Get('/id/:personId')
    async personById(@PathParams('personId') personId: string): Promise<string> {
        const personModel = await this.personService.findOneBy('uuid', personId);
        return JSON.stringify(personModel);
    }

    @Get()
    async allAdventures(): Promise<string> {
        const personModels = await this.personService.findAll();
        return JSON.stringify(personModels);
    }

    @Post()
    async createPerson(@BodyParams() personData: personData): Promise<string> {
        const personModel = await this.personService.create(personData);
        return '';
    }

    @Put()
    async updatePerson(@BodyParams() personData: personData): Promise<string> {
        return ''
    }
}