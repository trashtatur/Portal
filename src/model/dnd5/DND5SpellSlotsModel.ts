export interface DND5SpellSlotsModel {
    first: number;
    second: number;
    third: number;
    fourth: number;
    fifth: number;
    sixth: number;
    seventh: number;
    eighth: number;
    ninth: number;
    cantrips: string;
}

export const createDND5SpellSlotsModel = (first: number, second: number, third: number, fourth: number, fifth: number, sixth: number, seventh: number, eighth: number, ninth: number): DND5SpellSlotsModel => ({first: first, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth, seventh: seventh, eighth: eighth, ninth: ninth});
