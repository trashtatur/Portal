import { spellImport, multiSpellImport, spellData, entityLocation } from "./dnd5ImportTypes";
import axios from "axios";
import { DND5Spell } from "../db/schemas/DND5/DND5Spell";

export class DND5SpellImporter {

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
            const response: spellImport = (await axios.get(url)).data;
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
            const multiSpellImport: multiSpellImport = (await axios.get(url)).data;
            let spells = await this.getSpellImportsByEntityLocations(multiSpellImport.results);
            spells = spells.filter(spellImport => spellImport? true: false);
            this.importSpellsByData(spells);
        } catch (error) {
            console.error('While importing spells form url', url, 'an error occured.\n', error);
        }
    };

    private async getSpellImportsByEntityLocations(locations: entityLocation[]): Promise<spellImport[]> {
        const spells: Promise<spellImport[]> = Promise.all(locations.map(async (location) => {
            try {
                return (await axios.get(`http://dnd5eapi.co${location.url}`)).data;
            } catch (error) {
                console.log('While importing a spell form url', `http://dnd5eapi.co${location.url}`, 'an error occured.\n', error);
            }
        }));
        return spells;
    }

    public importSpellsByData = (spells: spellImport[]): void => {
        const dnd5Spells: spellData[] = spells.map(this.mapToDND5Spell);
        DND5Spell.bulkCreate(dnd5Spells, { updateOnDuplicate: this.spellKeys });
    };

    private mapToDND5Spell = (spell: spellImport): spellData => {

        const spellData: spellData = {
            name: spell.name,
            description: '',
            higherLevelsDescription: null,
            range: spell.range,
            components: '',
            ritual: spell.ritual,
            duration: spell.duration,
            concentration: spell.concentration,
            castingTime: spell.casting_time,
            school: '',
            materials: spell.material ? spell.material : null,
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
