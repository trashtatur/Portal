export interface DND5SavingThrowsModel {
    strengthSave?: number;
    dexteritySave?: number;
    constitutionSave?: number;
    intelligenceSave?: number;
    wisdomSave?: number;
    charismaSave?: number;
}

export const createDND5SavingThrowsModel = (strengthSave?: number, dexteritySave?: number, constitutionSave?: number, intelligenceSave?: number, wisdomSave?: number, charismaSave?: number): DND5SavingThrowsModel => ({strengthSave: strengthSave, dexteritySave: dexteritySave, constitutionSave: constitutionSave, intelligenceSave: intelligenceSave, wisdomSave: wisdomSave, charismaSave: charismaSave});
