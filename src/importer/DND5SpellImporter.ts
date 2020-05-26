import { spellImport, multiSpellImport, spellData, entityLocation } from "./dnd5ImportTypes";
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
            const response: spellImport = await (await axios.get(url)).data;
            this.importSpellByData(response);
        } catch (error) {
            console.error('While importing a spell form url', url, 'an error occured.\n', error);
        }
    };

    public importSpellByData = (spell: spellImport): void => {
        this.importSpellsByData([spell]);
    };

    public importSpellsByUrl = async (url: string): Promise<void> => {
        try {
            axios.get(url).then(response => {
                const spellLocations: multiSpellImport = response.data;
                const spells: spellImport[] = [];
                // collect errors that occur during the import
                const errorList: string[] =[];
                spellLocations.results.forEach(async location => {
                    try {
                        axios.get(`http://dnd5eapi.co${location.url}`).then(resp => {
                        spells.push(resp.data);
                        // check if last spell received
                        if ((spellLocations.results.length + errorList.length) == spells.length) {
                            if (errorList.length) {
                                console.warn('Errors during spell import: ',errorList);
                            }
                            this.importSpellsByData(spells);
                        }
                    });
                    } catch (error) {
                        errorList.push(`An error occured while getting ${location.url}.`);
                    }
                });
            });
        } catch (error) {
            console.error('While importing spells form url', url, 'an error occured.\n', error);
        }
    };

    public importSpellsByData = (spells: spellImport[]): void => {
        const dnd5Spells = spells.map(this.mapToDND5Spell);
        DND5Spell.bulkCreate(dnd5Spells, { updateOnDuplicate: this.spellKeys });
    };

    private mapToDND5Spell = (spell: spellImport): spellData => {

        const spellData: spellData = {
            name: spell.name,
            description: '',
            higherLevelsDescription: '',
            range: spell.range,
            components: '',
            ritual: spell.ritual,
            duration: spell.duration,
            concentration: spell.concentration,
            castingTime: spell.casting_time,
            school: '',
            materials: spell.material? spell.material: '',
            level: spell.level
        };

        if (spell.desc) {
            spellData.description = spell.desc.join();
        }
        if (spell.higher_level) {
            spellData.higherLevelsDescription = spell.higher_level?.join();
        }
        if (spell.components) {
            spellData.components = spell.components.join();
        }
        if (spell.school) {
            spellData.school = spell.school.name;
        }

        return spellData;
    };
}
