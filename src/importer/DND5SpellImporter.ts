import { spellImport, multiSpellImport, monsterLocation, monsterImport } from "./dnd5ImportTypes";
import axios from "axios";
import { DND5Spell } from "../db/schemas/DND5/DND5Spell";

export class DND5SpellImporter {

    // All data related columns in DND5Spells. Used for update.
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

    public importSpellByUrl = async (url: string): Promise<void> => {
        try {
            const response = await axios.get(url)
            this.importSpellByData(response.data);
        } catch (error) {
            console.error('While importing a spell form url', url, 'an error occured.\n', error);
        }
    };

    public importSpellByData = (spell: spellImport): void => {
        this.importSpellsByData([spell]);
    };

    public importSpellsByUrl = async (url: string): Promise<void> => {
        try {
            const response: multiSpellImport = await axios.get(url);
            this.importSpellsByData(response.results);
        } catch (error) {
            console.error('While importing spells form url', url, 'an error occured.\n', error);
        }
    };

    public importSpellsByData = (spells: spellImport[]): void => {
        const dnd5Spells = spells.map(spell => {
            return this.mapToDND5Spell(spell)
        });
        DND5Spell.bulkCreate(dnd5Spells, { updateOnDuplicate: this.spellKeys });
    };

    private mapToDND5Spell = (spell: spellImport): object => {
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
    };
}
