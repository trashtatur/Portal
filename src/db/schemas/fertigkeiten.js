module.exports.Fertigkeiten = function (sequelize, DataTypes) {
    return sequelize.define('Fertigkeiten', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true
        },
    },{
        freezeTableName: true
    })
};


