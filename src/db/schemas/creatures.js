/**
 * name: null -> false
 * alignment: null -> true
 * clazz: null -> false
 * challenge: null -> false
 * movement: null -> false
 * ini: null -> false
 * gab: null -> false
 * xp: null -> true
 * size: null -> false
 * stats: null -> false
 *
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*}
 * @constructor
 */
module.exports.Creatures = function (sequelize, DataTypes) {
    return sequelize.define('Creatures',{

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
        baseAtk: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        xp:{
            type:DataTypes.INTEGER,
            allowNull: true
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stats: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return JSON.parse(this.getDataValue('stats'))
            },
            set(val) {
                JSON.stringify(val).then(function (elem) {
                    this.setDataValue('stats',elem);
                });
            },
        },
        saveThrows: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('saveThrows').split(',')
            },
            set(val) {
                this.setDataValue('saveThrows',val.join(','));
            },
        },
        image : {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        getterMethods: {

            /**
             * @return {int}
             */
            getKMB() {
                let size = this.size.toLowerCase().trim();
                if ( size === "klein" || size === "sehr klein" || size === "winzig" || size === "mini" ) {
                    return this.baseAtk+ this.getModForStat(this.get('stats').dex) + this.getModForSizeForKMB()
                }
                return this.baseAtk+ this.getModForStat(this.get('stats').str) + this.getModForSizeForKMB()
            },
            getKMV() {
                return this.baseAtk + this.getModForStat(this.get('stats').str) + this.getModForStat(this.get('stats').dex) + this.getModForSizeForKMB(this.size)
            },
            /**
             *
             * @param {int} attr
             * @returns {number}
             */
            getModForStat(attr) {
                return (Math.floor(attr/2))-5
            },
            /**
             *
             * @returns {int}
             */
            getModForSizeForKMB() {
                let size_adjusted = this.size.toLowerCase().trim();
                switch (size_adjusted) {
                    case "kolossal":
                        return 8;
                    case "gigantisch":
                        return 4;
                    case "riesig":
                        return 2;
                    case "groß":
                        return 1;
                    case "mittelgroß":
                        return 0;
                    case "klein":
                        return -1;
                    case "sehr klein":
                        return -2;
                    case "winzig":
                        return -4;
                    case "mini":
                        return -8;
                    default:
                        return 0;
                }

            }
        }
    });
};


