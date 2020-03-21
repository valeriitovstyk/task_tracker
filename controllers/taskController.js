const taskController = {
    getTaskList: async (ctx) => {
        try {
            1 > 1
            ctx.body = await taskController.findAndCountAll;
/*            ctx.status = 200;*/
            ctx.body = "this is tasks list from controller"


        } catch (e) {
            console.log(e);
            ctx.status = 204
            ctx.body   = "this is tasks list error"
        }
    }
}

module.exports = taskController;
