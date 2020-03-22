/*
### Пользователь

- Создание пользователя
- Редактирование пользователя
- Удаление пользователя
- Получение всех пользователей*/

const User = require('../models/user');
const UserController = {
    /*    getUserList: async (ctx) => {
            try {
                ctx.body = await User.findAll({
                    order: [['id', 'ASC']]
                });
                ctx.status = 200;
            } catch (err) {

            }
        }*/
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
                ctx.body = "there are no users"
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
                ctx.body = " user with this id not found"
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
                ctx.body = " user with this id not found"
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
                ctx.status = 200;
                ctx.body = {
                    status: "success",
                    message: "new user is created with id: " + newUser.id
                }
            } else {
                ctx.status = 400;
                ctx.body = {
                    message: "something went wrong"
                }
            }
        } catch (err) {
            console.log(err);
        }

    },
    removeUser: async (ctx) => {
        try {
            const deletedUser = await User.destroy({where: {id: ctx.params.id}});
            if (deletedUser) {
                ctx.status = 200;
                ctx.body = {
                    status: "success",
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
            })
        } else {
            ctx.status = 400;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
        }
    }
};

module.exports = UserController;

//TODO test updating non existing user
//TODO handle name or id on same route
//router.get("/users/:id",  async ctx => {
//    //ctx.request.id
//    if (!isNaN(ctx.request.id)) // it IS a number {
//        //do something with user ID
//        } else {
//    //do something with username
//}
//});

//TODO handle errors with catch
//TODO script for create DB on package json
//TODO ensure responce statuses if correct to restful best practices
//TODO the same format for answer status and error message
//TODO format code