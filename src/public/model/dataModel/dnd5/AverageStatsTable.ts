class AverageStatsTableEntry {
    private readonly _challenge: number;
    private readonly _proficiencyBonus: number;
    private readonly _armorClass: number;
    private readonly _hitPointsRange: [number, number];
    private readonly _attackBonus: number;
    private readonly _damagePerRound: [number, number];
    private readonly _saveDC: number;

    constructor(
        challenge: number,
        proficiencyBonus: number,
        armorClass: number,
        hitPointsRange: [number, number],
        attackBonus: number,
        damagePerRound: [number, number],
        saveDC: number
    ) {
        this._challenge = challenge;
        this._proficiencyBonus = proficiencyBonus;
        this._armorClass = armorClass;
        this._hitPointsRange = hitPointsRange;
        this._attackBonus = attackBonus;
        this._damagePerRound = damagePerRound;
        this._saveDC = saveDC;
    }

    get challenge(): number {
        return this._challenge;
    }

    get proficiencyBonus(): number {
        return this._proficiencyBonus;
    }

    get armorClass(): number {
        return this._armorClass;
    }

    get hitPointsRange(): [number, number] {
        return this._hitPointsRange;
    }

    get attackBonus(): number {
        return this._attackBonus;
    }

    get damagePerRound(): [number, number] {
        return this._damagePerRound;
    }

    get saveDC(): number {
        return this._saveDC;
    }
}

export class AverageStatsTable {
    private readonly _tableEntries: AverageStatsTableEntry[]

    constructor(
        tableEntries: AverageStatsTableEntry[]
    ) {
        this._tableEntries = tableEntries;
    }

    static create = (): AverageStatsTable => {
        const tableEntries = [
            new AverageStatsTableEntry(0, 2, 13, [1, 6], 3, [0, 1], 13),
            new AverageStatsTableEntry(0.125, 2, 13, [7, 35], 3, [2, 3], 13),
            new AverageStatsTableEntry(0.25, 2, 13, [36, 49], 3, [4, 5], 13),
            new AverageStatsTableEntry(0.5, 2, 13, [50, 70], 3, [6, 8], 13),
            new AverageStatsTableEntry(1, 2, 13, [71, 85], 3, [9, 14], 13),
            new AverageStatsTableEntry(2, 2, 13, [86, 100], 3, [15, 20], 13),
            new AverageStatsTableEntry(3, 2, 13, [101, 115], 4, [21, 26], 13),
            new AverageStatsTableEntry(4, 2, 14, [116, 130], 5, [27, 32], 14),
            new AverageStatsTableEntry(5, 3, 15, [131, 145], 6, [33, 38], 15),
            new AverageStatsTableEntry(6, 3, 15, [146, 160], 6, [39, 44], 15),
            new AverageStatsTableEntry(7, 3, 15, [161, 175], 6, [45, 50], 15),
            new AverageStatsTableEntry(8, 3, 16, [176, 190], 7, [51, 56], 16),
            new AverageStatsTableEntry(9, 4, 16, [191, 205], 7, [57, 62], 16),
            new AverageStatsTableEntry(10, 4, 17, [206, 220], 7, [63, 68], 16),
            new AverageStatsTableEntry(11, 4, 17, [221, 235], 8, [69, 74], 17),
            new AverageStatsTableEntry(12, 4, 17, [236, 250], 8, [75, 80], 18),
            new AverageStatsTableEntry(13, 5, 18, [251, 265], 8, [81, 86], 18),
            new AverageStatsTableEntry(14, 5, 18, [266, 280], 8, [87, 92], 18),
            new AverageStatsTableEntry(15, 5, 18, [281, 295], 8, [93, 98], 18),
            new AverageStatsTableEntry(16, 5, 18, [296, 310], 9, [99, 104], 18),
            new AverageStatsTableEntry(17, 6, 19, [311, 325], 10, [105, 110], 19),
            new AverageStatsTableEntry(18, 6, 19, [326, 340], 10, [111, 116], 19),
            new AverageStatsTableEntry(19, 6, 19, [341, 355], 10, [117, 122], 19),
            new AverageStatsTableEntry(20, 6, 19, [356, 400], 10, [123, 140], 19),
            new AverageStatsTableEntry(21, 7, 19, [401, 445], 11, [141, 158], 20),
            new AverageStatsTableEntry(22, 7, 19, [446, 490], 11, [159, 176], 20),
            new AverageStatsTableEntry(23, 7, 19, [491, 535], 11, [177, 194], 20),
            new AverageStatsTableEntry(24, 7, 19, [536, 580], 11, [195, 212], 21),
            new AverageStatsTableEntry(25, 8, 19, [581, 625], 12, [213, 230], 21),
            new AverageStatsTableEntry(26, 8, 19, [626, 670], 12, [231, 248], 21),
            new AverageStatsTableEntry(27, 8, 19, [671, 715], 13, [249, 266], 22),
            new AverageStatsTableEntry(28, 8, 19, [716, 760], 13, [267, 284], 22),
            new AverageStatsTableEntry(29, 8, 19, [761, 805], 13, [285, 302], 22),
            new AverageStatsTableEntry(30, 8, 19, [805, 850], 14, [303, 320], 23),
        ];
        return new AverageStatsTable(tableEntries);
    }

    getMatchingEntriesByChallengeRating = (challengeRating: number): AverageStatsTableEntry => {
        if (!challengeRating) {
            return new AverageStatsTableEntry(
                0, 0, 0, [0, 0],0, [0, 0], 0
            )
        }
        return this._tableEntries.find(entry => {
            return entry.challenge === challengeRating;
        })
    }
}