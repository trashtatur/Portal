const fertigkeiten = require('./fertigkeiten');
const actions = require('./actions');
const attacks = require('./attacks');

module.exports.Creature = function (sequelize, DataTypes) {
    return sequelize.define('Creature',{

        uuid: {
            type:DataTypes.UUID,
            primaryKey:  true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alignment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        clazz: {
            type: DataTypes.STRING,
            allowNull: false
        },
        challenge: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        movement: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ini:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gab:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        xp:{
            type:DataTypes.INTEGER,
            allowNull: true
        },
        stats: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('stats').split(',')
            },
            set(val) {
                this.setDataValue('stats',val.join(','));
            },
        },
        kmb:{
            type: DataTypes.STRING,
            allowNull: false
        },
        kmv:{
            type: DataTypes.STRING,
            allowNull: false
        },

    });
};


