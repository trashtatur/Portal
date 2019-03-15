const Sequelize = require('sequelize');
const dSupplier = require('./dataSupplier').dataSupplier;


let dataSupplier = new dSupplier();

// Please mind that the database needs to actually exist first!
/**
 * This connects to the database
 * @type {Sequelize} : An ORM thing to interact with the database
 */
const sequelize = new Sequelize({
    database: dataSupplier.getDatabaseName(),
    username: dataSupplier.getDatabaseUser(),
    password: dataSupplier.getDatabasePassword(),
    host: dataSupplier.getDatabaseHost(),
    dialect: 'mysql',
    modelPaths:[__dirname + '/schemas']
});

var creature = require('./schemas/creature').Creature(sequelize,Sequelize);
var fertigkeiten = require('./schemas/fertigkeiten').Fertigkeiten(sequelize,Sequelize);

creature.hasMany(fertigkeiten);

const dbReady = sequelize.authenticate()
    .then(function(err) {
        console.log('Connection to database has been established successfully.');
    }, function (err) {
        console.error('Unable to connect to the database:'+ err);
    });

module.exports = {dbReady,sequelize};