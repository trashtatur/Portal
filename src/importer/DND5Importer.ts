import { spellImport, multiSpellImport } from "./dnd5ImportTypes";
import Axios from "axios";
import { DND5Spell } from "../db/schemas/DND5/DND5Spell";

export class DND5Importer {

    private spellKeys = [
        'name',
        'description',
        'higherLevelsDescription',
        'range',
        'components',
        'ritual',
        'duration',
        'concentration',
        'castingTime',
        'school',
        'materials',
        'level'
    ];

    public async importSpellByUrl(url: string) {
        const spell: spellImport = await Axios.get(url);
        this.importSpellByData(spell);
        // axios für den get
        // get all - map to db format - bulk create
        // sequelize doku
    }

    public importSpellByData(spell: spellImport) {
        this.importSpellsByData([spell]);
    }

    public async importSpellsByUrl(url: string) {
        const response: multiSpellImport = await Axios.get(url);
        this.importSpellsByData(response.results);
    }

    public importSpellsByData(spells: spellImport[]) {
        console.log('SPELLS IMPORTED', spells);
        const dnd5Spells = spells.map(spell => this.mapToDND5Spell(spell));
        DND5Spell.bulkCreate(dnd5Spells, {updateOnDuplicate: this.spellKeys});
    }

    private mapToDND5Spell(spell: spellImport) {
        return {
            name: spell.name,
            description: spell.desc,
            higherLevelsDescription: spell.higher_level,
            range: spell.range,
            components: spell.components,
            ritual: spell.ritual,
            duration: spell.duration,
            concentration: spell.concentration,
            castingTime: spell.casting_time,
            school: spell.school,
            materials: spell.material,
            level: spell.level
        }
    }



}