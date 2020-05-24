import { spellImport, multiSpellImport } from "./dnd5ImportTypes";
import axios from "axios";
import { DND5Spell } from "../db/schemas/DND5/DND5Spell";
import { try } from "bluebird";

export class DND5Importer {

    /**
     * Fields from the {@link DND5Spell} that should be updated in the database.
     * So far these are just al data related columns.
     */
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

    /**
     * Import a single DND5 spell into the database by url.
     * Optimized for {@link http://dnd5eapi.co/api/spells/acid-arrow}. 
     * Other urls might not have the needed fields.
     * async funciton using {@link axios} for the get.
     * 
     * @param url the url where the spell is located, 
     * @example http://dnd5eapi.co/api/spells/acid-arrow
     */
    public async importSpellByUrl(url: string) {
        try {
            const response = await axios.get(url);
            this.importSpellByData(response.data);
        } catch(error) {
            console.error('While importing a spell form url', url, 'an error occured.\n', error);
        }
    }

    /**
     * Import a single spell by {@link spellImport} into the database.
     * 
     * @param spell the spell that should be imported.
     */
    public importSpellByData(spell: spellImport) {
        this.importSpellsByData([spell]);
    }


    /**
     * Import all DND5 spells behind a given url into the database. 
     * Optimized for {@link http://dnd5eapi.co/api/spells}. 
     * @param url the url that returns a {@link multiSpellImport} that contains a collection of DND5 spells.
     */
    public async importSpellsByUrl(url: string) {
        try {
            const response: multiSpellImport = await axios.get(url);
            this.importSpellsByData(response.results);
        } catch (error) {
            console.error('While importing spells form url', url, 'an error occured.\n', error);
        }
    }

    /**
     * Import a collection of DND5 spells as {@link spellImport} into the database.
     * @param spells the collection of spells that should be imported.
     */
    public importSpellsByData(spells: spellImport[]) {
        const dnd5Spells = spells.map(spell => {
            return this.mapToDND5Spell(spell)
        });
        DND5Spell.bulkCreate(dnd5Spells, { updateOnDuplicate: this.spellKeys });
    }

    /**
     * Mapper form {@link spellImport} to {@link DND5Spell}.
     * @param spell the spell values.
     */
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