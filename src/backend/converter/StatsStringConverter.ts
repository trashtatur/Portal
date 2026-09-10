import {createCreatureStatsModel} from "../model/CreatureStatsModel";
import type {stats} from "../types/backendTypes";

export const convertStatsString = (statsString: string): CreatureStatsModel => {
    try {
        const statsData: stats = JSON.parse(statsString);
        return createCreatureStatsModel(
            statsData.str,
            statsData.dex,
            statsData.con,
            statsData.int,
            statsData.wis,
            statsData.cha
        )
    } catch (e) {
        console.log(e)
    }
};
