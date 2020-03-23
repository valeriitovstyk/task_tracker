const models = {
    User: require('./user'),
    Task: require('./task'),
};

models.Task.belongsTo(models.User);
models.User.hasMany(models.Task);
// { onDelete: 'cascade' }
module.exports = models;