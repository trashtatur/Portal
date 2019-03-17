module.exports.Talents = function (sequelize, DataTypes) {
    return sequelize.define('Talents', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        freezeTableName: true
    })
};