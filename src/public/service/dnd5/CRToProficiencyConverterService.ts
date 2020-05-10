export class CRToProficiencyConverterService {
    getProficiencyByCRValue = (crValue: number): number => {
        if (crValue < 5) {
            return 2;
        }
        if (crValue < 9) {
            return 3;
        }
        if (crValue < 13) {
            return 4;
        }
        if (crValue < 17) {
            return 5;
        }
        if (crValue < 21) {
            return 6;
        }
        if (crValue < 25) {
            return 7;
        }
        if (crValue < 29) {
            return 8;
        }
        return 9;
    }
}