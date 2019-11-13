import {Creature} from "./schemas/Creature";
import {Language} from "./schemas/Language";
import {Talent} from "./schemas/Talent";

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
async function dbSync(force) {
    if (!force) force = false;
    // noinspection BadExpressionStatementJS
    connector.dbReady;

    try {
        const status = connector.sequelize.sync({force}).then( ()=>  {
            console.log('Sequelize table creation succesful');
            //THIS IS JUST SOME TEST DATA
            let attackProperties = {
                props: [
                    {
                        name: "brute",
                        property:"A melee weapon deals one extra die of damage in the attack" +
                            "when the bugbear hits with it",
                    },
                    {
                        name: "surprise attack",
                        property: "When the bugbear surprises a creature he deals 7 extra damage to it"

                    }
                ]
            };

            let vals = {
                name:'test',
                hitpoints: 15,
                armorclass: 15,
                attackProperties: attackProperties,
                alignment: 'neutral',
                creatureClass: 'bard',
                challenge: 4,
                movement: 4,
                ini: 11,
                baseAtk: 4,
                xp: 3311,
                size: 'kolossal',
                stats:{"str":10,"dex":33,"wis":11,"int":44,"ch":33,"con":22},
                saveThrows:{"REF":10,"WILL":33,"FORT":45},
                languages:[{
                    name: "Gemeinsprache"
                }],
                talents:[{
                    name:'Ausweichen'
                }]
            };
            Creature.create(vals,
                    {
                        include: [Language,Talent]
                    })

        });

        return status;
    } catch (err) {
        console.error('An error occurred while creating the table:'+ err);
        throw err;
    }
}

module.exports = {dbSync};