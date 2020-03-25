const Task = require('../models/task');
const User = require('../models/user');
const allStatus = ["View", "In Progress", "Done"];
const isStatusCorrect = status => allStatus.includes(status);

const taskController = {
    getTaskList: async (ctx) => {
        try {
            const condition = ctx.request.query.status ? {status: ctx.request.query.status} : {};
            const order = ctx.request.query.order ? [['id', ctx.request.query.order]] : [['id', 'ASC']];
            const taskList = await Task.findAll({
                where: condition,
                order: order,
            });
            if (taskList) {
                ctx.status = 200;
                ctx.body = taskList;
            } else {
                ctx.status = 404;
                ctx.body = {
                    message: "something went wrong with your request"
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
    getTask: async (ctx) => {
        try {
            const singleTask = await Task.findOne({
                where: {id: ctx.params.id}
            });
            if (singleTask) {
                ctx.status = 200;
                ctx.body = singleTask;
            } else {
                ctx.status = 404;
                ctx.body = " task with this id was not found"
            }
        } catch (err) {
            console.log(err)
        }
    },

    userTaskList: async (ctx) => {
        try {
            const condition = {userId: ctx.params.id};
            const order = ctx.request.query.order ? [['id', ctx.request.query.order]] : [['id', 'ASC']];
            const include = [{all: true, nested: true}];
            const userTasks = await Task.findAll({
                where: condition,
                include: include,
                order: order,
            });
            if (userTasks.length > 0) {
                ctx.status = 200;
                ctx.body = userTasks;
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: "failed",
                    message: "there no task list for this user"
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
    addTask: async (ctx) => {
        const userExist = await User.findOne({where: {id: ctx.request.body.userId}});
        if (userExist){
            try {
                const newTask = await Task.create({
                    title: ctx.request.body.title,
                    description: ctx.request.body.description,
                    status: ctx.request.body.status,
                    userId: ctx.request.body.userId,
                });
                if (newTask) {
                    ctx.status = 201;
                    ctx.body = {
                        status: "success",
                        message: "new task is created with id: " + newTask.id
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
        } else {
            ctx.status = 404;
            ctx.body = {
                message: "user was not found"
            }
        }
    },
    editTask: async (ctx) => {
        try {
            if (!isStatusCorrect(ctx.request.body.status)) {
                ctx.status = 400;
                ctx.body = {
                    message: "this status for task is not allowed"
                }
            }
            const taskForUpdate = await Task.findOne({where: {id: ctx.params.id}});
            if (taskForUpdate) {
                const result = Task.update({
                    title: ctx.request.body.title,
                    description: ctx.request.body.description,
                    status: ctx.request.body.status,
                    userId: ctx.request.body.userId,
                }, {
                    where: {
                        id: ctx.params.id
                    },
                    returning: true,
                    plain: true
                });
                ctx.status = 200;
                ctx.body = {
                    message: "task was successfully updated"
                }
            } else {
                ctx.status = 404;
                ctx.body = {
                    message: "task you are trying to edit doesn't exist"
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
    changeTaskStatus: async (ctx) => {
        try {
            const findTask = await Task.findOne({where: {id: ctx.params.id}});
            if (isStatusCorrect(ctx.request.body.status) && findTask) {
                const updatedStatus = Task.update({
                    status: ctx.request.body.status
                }, {
                    where: {
                        id: ctx.params.id
                    },
                    returning: true,
                    plain: true
                });
                ctx.status = 200;
                ctx.body = {
                    message: "status was changed to " + ctx.request.body.status
                }
            } else {
                ctx.status = 404;
                ctx.body = {
                    message: "task was not found or sent status is incorrect"
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
    changeAsignedPerson: async (ctx) => {
        try {
            const findTask = await Task.findOne({where: {id: ctx.params.id}});
            if (findTask) {
                Task.update({
                    userId: ctx.request.body.asignee
                }, {
                    where: {
                        id: ctx.params.id
                    },
                    returning: true,
                    plain: true
                });
                ctx.status = 200;
                ctx.body = {
                    message: "asigned person was changed to " + ctx.request.body.asignee
                }
            } else {
                ctx.status = 404;
                ctx.body = {
                    message: "task was not found"
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
    removeTask: async (ctx) => {
        try {
            const taskExist = await Task.findOne({where: {id: ctx.params.id}});
            if (taskExist) {
                const removedTask = await Task.destroy({where: {id: ctx.params.id}});
                if (removedTask) {
                    ctx.status = 200;
                    ctx.body = {
                        message: "task was successfully deleted"
                    }
                } else {
                    ctx.status = 404;
                    ctx.body = {
                        message: "task was not removed"
                    }
                }
            } else {
                ctx.status = 404;
                ctx.body = {
                    message: "task with this id was not found"
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
};

module.exports = taskController;


/*

### Задача

+ Создание задачи
+ Редактирование задачи
+ Изменить статус задачи
- Удаление задачи
+ Получение списка задач

Можно не делать, но будет плюсом следующее:

    - Отфильтровав по status
- Отсортировав по id
- Изменить пользователя на которого назначена задача*/
