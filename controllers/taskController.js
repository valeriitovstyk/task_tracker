const Task = require('../models/task');
const User = require('../models/user');
const allStatus = ["View", "In Progress", "Done"];
const isStatusCorrect = status => allStatus.includes(status);

const taskController = {
    getTaskList: async (ctx) => {
        try {
            const taskList = await Task.findAll({
                order: [['id', 'ASC']]
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
            const userTasks = await Task.findAll({
                order: [['id', 'ASC']],
                include: [{all: true, nested: true}],
                where: {
                    userId: ctx.params.id,
                },
            })
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
            ctx.status = 204;
        }
    },
    addTask: async (ctx) => {
        try {
            const newTask = await Task.create({
                title: ctx.request.body.title,
                description: ctx.request.body.description,
                status: ctx.request.body.status,
                userId: ctx.request.body.userId,
            });
            if (newTask) {
                ctx.status = 200;
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
            ctx.status = 204;
        }
    },
    editTask: async (ctx) => {
        try {
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
                })
                ctx.status = 200
                ctx.body = result

            } else {
                ctx.status = 404;
                ctx.body = {
                    message: "task you are trying to edit doesn't exist"
                }
            }
        } catch (err) {
            console.log(err);
            ctx.status = 204;
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
                ctx.body = updatedStatus;
            } else {
                ctx.status = 404;
                ctx.body = {
                    message: "task was not found or sent status is incorrect"
                }
            }
        } catch (err) {
            console.log(err);
            ctx.status = 204;
        }
    },
    removeTask: async (ctx) => {
        try {
            const taskExist = await Task.findOne({where: {id: ctx.params.id}});
            if (taskExist) {
                const removedTask = await Task.destroy({where: {id: ctx.params.id}})
                if (removedTask) {
                    ctx.status = 200;
                    ctx.body = {
                        status: "success",
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
        } catch {

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

//TODO put and patch
//TODO check if list user list task works correct with array length === 0
//TODO delete all tasks assigned to user if user is destroyed
//TODO handle creating task for non existing user
//TODO usercontroller update method doesnt return any success message