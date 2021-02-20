import {CreatureStatsModel} from "../model/CreatureStatsModel";
import {stats} from "../types/backendTypes";

export const convertStatsString = (statsString: string): CreatureStatsModel => {
    try {
        const statsData: stats = JSON.parse(statsString);
        return new CreatureStatsModel(
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
