const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://sql7329583:yA3qUMJBIZ@sql7.freemysqlhosting.net:3306/mysql_task');
// const sequelize = new Sequelize('mysql://root:pass@localhost:3308/mysql_task');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
