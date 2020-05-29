import {dataSupplier} from "./connector";

const connector = require('./connector');

async function dbSync(force) {
    if (!force) force = false;
    // noinspection BadExpressionStatementJS
    connector.dbReady;

    try {
        const status = connector.sequelize.sync({force:dataSupplier.forceDBReset}).then( ()=>  {
            console.log('Sequelize table creation succesful');
        });

        return status;
    } catch (err) {
        console.error('An error occurred while creating the table:'+ err);
        throw err;
    }
}

module.exports = {dbSync};