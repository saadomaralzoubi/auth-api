'use strict';

const chlothes = (sequelize, DataTypes) => sequelize.define('chlothes', {
    chlothesType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerSize: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = chlothes;