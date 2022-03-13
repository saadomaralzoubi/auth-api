'use strict';

const food = (sequelize, DataTypes) => sequelize.define('food', {
    foodName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dishSize: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = food;