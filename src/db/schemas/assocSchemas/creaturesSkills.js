module.exports.CreaturesSkills = function (sequelize, DataTypes) {
    return sequelize.define('CreaturesSkills', {
        mod : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        freezeTableName: true
    })
};