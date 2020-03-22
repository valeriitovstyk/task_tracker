const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },

    }, {
        createdAt   : 'createdAt',
        updatedAt   : 'updatedAt',
        timestamps: false,
        underscored : true,
    }
);

module.exports = User;
