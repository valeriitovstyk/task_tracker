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
        // options
        createdAt   : 'createdAt',
        updatedAt   : 'updatedAt',
        timestamps: false,
        underscored : true,
    }
);

module.exports = User;

/*
Обязательные поля для пользователя в базе данных:
{
    "user_id": 1,
    "first_name": "",
    "last_name": "",
...
}*/
