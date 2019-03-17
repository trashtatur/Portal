module.exports.Actions = function (sequelize, DataTypes) {
    return sequelize.define('Actions', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        description : {
            type: DataTypes.STRING,
            allowNull: false
        },
        damage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        critMod: {
            type: DataTypes.STRING,
            allowNull: false
        },
        range: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        damageType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        additionalInfo: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        freezeTableName: true
    })
};


