import {DND5SpellViewModel} from "@/public/model/dnd5/DND5SpellViewModel";

export class SpellSortingService {

    sortSpellsBySpellLevel = (spells: DND5SpellViewModel[]): DND5SpellViewModel[] => {
        return spells.sort((spellOne, spellTwo) => {
            if (spellOne.level > spellTwo.level) return 1;
            if (spellOne.level < spellTwo.level) return -1;
            return 0;
        })
    }
}