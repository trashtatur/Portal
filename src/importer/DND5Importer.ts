import { spellImport, multiSpellImport } from "./dnd5ImportTypes";
import Axios from "axios";
import { DND5Spell } from "../db/schemas/DND5/DND5Spell";
import { uuidv4 } from "../public/service/helperFunctions";

export class DND5Importer {

    private spellKeys = [
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
        const response = await Axios.get(url);
        this.importSpellByData(response.data);
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
        const dnd5Spells = spells.map(spell => {
            console.log('MAPPING SPELL IMPORT:', spell);
            
            return this.mapToDND5Spell(spell)});
        console.log('MAPPED SPELLS', dnd5Spells);
        
        DND5Spell.bulkCreate(dnd5Spells, {updateOnDuplicate: this.spellKeys});
    }

    private mapToDND5Spell(spell: spellImport) {
        return {
            name: spell.name,
            description: spell.desc?.join(),
            higherLevelsDescription: spell.higher_level?.join(),
            range: spell.range,
            components: spell.components?.join(),
            ritual: spell.ritual,
            duration: spell.duration,
            concentration: spell.concentration,
            castingTime: spell.casting_time,
            school: spell.school?.name,
            materials: spell.material,
            level: spell.level
        }
    }



}