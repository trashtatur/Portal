module.exports.CreaturesSenses = function (sequelize, DataTypes) {
    return sequelize.define('CreaturesSenses', {
        mod : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        freezeTableName: true
    })
};