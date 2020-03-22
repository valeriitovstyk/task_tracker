const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('task', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    status: {
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

module.exports = Task;