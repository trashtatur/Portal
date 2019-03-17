module.exports.Senses = function (sequelize, DataTypes) {
    return sequelize.define('Senses', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        range: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    },{
        freezeTableName: true
    })
};