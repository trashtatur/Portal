const connector = require('./connector');

/**
 * @name Sync
 * @description Synchronizes the logical models with the database to create tables
 * @module module-database
 * @devnotes
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
        const status = connector.sequelize.sync({force});
        console.log('Sequelize table creation succesful');
        return status;
    } catch (err) {
        console.error('An error occurred while creating the table:'+ err);
        throw err;
    }
}

module.exports = {dbSync};