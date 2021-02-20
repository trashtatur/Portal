import {dataSupplier, dbReady, sequelize} from "./connector";

export default async function dbSync() {
    dbReady();

    try {
        return sequelize.sync({force: dataSupplier.forceDBReset}).then(() => {
            console.log('Sequelize table creation succesful');
        });
    } catch (err) {
        console.error('An error occurred while creating the table:'+ err);
        throw err;
    }
}