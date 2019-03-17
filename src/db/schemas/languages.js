module.exports.Languages = function (sequelize, DataTypes) {
    return sequelize.define('Languages', {
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