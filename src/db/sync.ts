import {sequelize} from "./connector";
import {Creature} from "./schemas/Creature";

const connector = require('./connector');

/**
 * @name Sync
 * @description Synchronizes the logical models with the database to create tables
 * @module module-database
 */

/**
 * Synchronize the database with the models
 * @param force     see Sequlize.sync
 * @returns {Promise}
 */
function dbSync(force) {
    if (!force) force = false;
    // noinspection BadExpressionStatementJS
    connector.dbReady;

    try {
        const status = connector.sequelize.sync({force}).then( ()=>  {
            console.log('Sequelize table creation succesful');

            const creatureRepository = sequelize.getRepository(Creature);
            creatureRepository.create(
                {
                    name:'test',
                    hitpoints: 15,
                    alignment: 'neutral',
                    creatureClass: 'bard',
                    challenge: 4,
                    movement: 4,
                    ini: 11,
                    baseAtk: 4,
                    xp: 3311,
                    size: 'kolossal',
                    stats:{"str":10,"dex":33,"wis":11,"int":44,"ch":33,"con":22},
                    saveThrows:{"REF":10,"WILL":33,"FORT":45}
                });
        });

        return status;
    } catch (err) {
        console.error('An error occurred while creating the table:'+ err);
        throw err;
    }
}

module.exports = {dbSync};