import {BodyParams, Controller, Delete, Get, PathParams, Post, Put} from "@tsed/common";
import {DND5SpellService} from "../../../services/dnd5/DND5SpellService";

@Controller('/DND5/Spell')
export class DND5SpellResourceController {
    private dnD5SpellService: DND5SpellService;

    constructor(
        dnD5SpellService: DND5SpellService
    ) {
        this.dnD5SpellService = dnD5SpellService;
    }

    @Get()
    async getAllSpells(): Promise<string> {
        const spells = await this.dnD5SpellService.findAll();
        return JSON.stringify(spells);
    }

    @Get('id/:spellId')
    async getBySpellById(@PathParams('spellId') spellId: string): Promise<string>  {
        const spell = await this.dnD5SpellService.findOneBy('uuid', spellId);
        return JSON.stringify(spell);
    }

    @Post()
    async createSpell(@BodyParams('spellData') spellData): Promise<string> {
        const spell = await this.dnD5SpellService.create(spellData);
        return JSON.stringify(spell);
    }

    @Put()
    async updateSpell(@BodyParams('spellData') spellData): Promise<string> {
        const spell = await this.dnD5SpellService.update(spellData);
        return JSON.stringify(spell);
    }

    @Delete('/:spellId')
    async deleteSpell(@PathParams('spellId') spellId: string): Promise<string> {
        const success = await this.dnD5SpellService.delete(spellId);
        return `{success: ${success}}`
    }
}