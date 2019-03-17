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

const creatures = require('./schemas/creatures').Creatures(sequelize,Sequelize);
const actions = require('./schemas/actions').Actions(sequelize,Sequelize);
const skills = require('./schemas/skills').Skills(sequelize,Sequelize);
const senses = require('./schemas/senses').Senses(sequelize,Sequelize);
const languages = require('./schemas/languages').Languages(sequelize,Sequelize);
const talents = require('./schemas/talents').Talents(sequelize,Sequelize);
const creaturesSkills = require('./schemas/assocSchemas/creaturesSkills').CreaturesSkills(sequelize,Sequelize);
const creaturesSenses = require('./schemas/assocSchemas/creaturesSenses').CreaturesSenses(sequelize,Sequelize);

creatures.belongsToMany(actions, {through: 'CreaturesActions'});
actions.belongsToMany(creatures, {through: 'CreaturesActions'});

creatures.belongsToMany(skills,{through:'CreaturesSkills'});
skills.belongsToMany(creatures,{through: 'CreaturesSkills'});

creatures.belongsToMany(senses,{through:'CreaturesSenses'});
senses.belongsToMany(creatures,{through: 'CreaturesSenses'});

creatures.belongsToMany(languages, {through:'CreaturesLanguages'});
languages.belongsToMany(creatures,{through:'CreaturesLanguages'});

creatures.belongsToMany(talents, {through:'CreaturesTalents'});
talents.belongsToMany(creatures, {through: 'CreaturesTalents'});

const dbReady = sequelize.authenticate()
    .then(function(err) {
        console.log('Connection to database has been established successfully.');
    }, function (err) {
        console.error('Unable to connect to the database:'+ err);
    });

module.exports = {dbReady,sequelize};