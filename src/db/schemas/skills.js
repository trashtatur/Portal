module.exports.Skills = function (sequelize, DataTypes) {
    return sequelize.define('Skills', {
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