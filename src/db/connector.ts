import {Sequelize} from 'sequelize-typescript';
import {DataSupplier} from "./dataSupplier";


export const dataSupplier = new DataSupplier();

// Please mind that the database needs to actually exist first!
/**
 * This connects to the database
 * @type {Sequelize} : An ORM thing to interact with the database
 */
export const sequelize = new Sequelize({
    database: dataSupplier.databaseName,
    username: dataSupplier.databaseUser,
    password: dataSupplier.databasePassword,
    host: dataSupplier.databaseHost,
    dialect: 'mysql',
    models: [__dirname+'/schemas/**/*.ts'],
});



export const dbReady = () =>  sequelize.authenticate()
    .then(function(err) {
        console.log('Connection to database has been established successfully.');
    }, function (err) {
        console.error('Unable to connect to the database:'+ err);
    });
