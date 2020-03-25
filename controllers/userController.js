const User = require('../models/user');
const Task = require('../models/task');
const UserController = {
    getUserList: async (ctx) => {
        try {
            const users = await User.findAll({
                order: [['id', 'ASC']]
            });
            if (users) {
                ctx.status = 200;
                ctx.body = users;
            } else {
                ctx.status = 404;
                ctx.body = {
                    message: "there are no users"
                }
            }
        } catch (err) {
            console.log(err)
        }
    },
    getUser: async (ctx) => {
        try {
            const user = await User.findOne({
                where: {id: ctx.params.id}
            });
            if (user) {
                ctx.status = 200;
                ctx.body = user;
            } else {
                ctx.status = 404;
                ctx.body = {
                    message: "user with this id not found"
                }
            }
        } catch (err) {
            console.log(err)
        }
    },
    getUserByName: async (ctx) => {
        try {
            const user = await User.findOne({
                where: {last_name: ctx.params.name}
            });
            if (user) {
                ctx.status = 200;
                ctx.body = user;
            } else {
                ctx.status = 404;
                ctx.body = {
                    message: "user with this id was not found"
                }
            }
        } catch (err) {
            console.log(err)
        }
    },
    addUser: async (ctx, next) => {
        try {
            const newUser = await User.create({
                firstName: ctx.request.body.first_name,
                lastName: ctx.request.body.last_name
            });
            if (newUser) {
                ctx.status = 201;
                ctx.body = {
                    message: "new user is created with id: " + newUser.id
                }
            } else {
                ctx.status = 400;
                ctx.body = {
                    message: "user was not created"
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
    removeUser: async (ctx) => {
        try {
            const asignedTasks = await Task.destroy({where: {userId: ctx.params.id}});
            const deletedUser = await User.destroy({where: {id: ctx.params.id}});
            if (deletedUser && asignedTasks) {
                ctx.status = 200;
                ctx.body = {
                    message: "user was successfully deleted"
                }
            } else {
                ctx.status = 204;
                ctx.body = {
                    message: "user was not removed"
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
    updateUser: async (ctx) => {
        const userForUpdate = await User.findOne({where: {id: ctx.params.id}});
        if (userForUpdate) {
            User.update({
                firstName: ctx.request.body.first_name,
                lastName: ctx.request.body.last_name
            }, {
                where: {
                    id: ctx.params.id
                }
            });
            ctx.status = 200;
            ctx.body = {
                message: "user was successfully updated"
            }
        } else {
            ctx.status = 400;
            ctx.body = {
                message: 'The user you are trying to retrieve doesn\'t exist in the db'
            }
        }
    }
};

module.exports = UserController;

//TODO handle name or id on same route