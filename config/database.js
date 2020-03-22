const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:pass@localhost:3308/mysql_task');


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


/*
const task = sequelize.define('tasks',{
    name: {
        type:Sequelize.STRING
    },
    task_id: {
        type: Sequelize.INTEGER
    }
})

task.findAll({
    attributes: ['name', 'task_id']
}).then((s) => console.log(s))*/

module.exports = sequelize;
