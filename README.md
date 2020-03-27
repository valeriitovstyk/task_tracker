# Task Tracker app

## Stack
- koa
- MySQL
- sequelize

## API
#### USERS
- GET /users - get all users list
- GET /users/[id] - get single user by id
- GET /users/name/[lastName] get user by last name
- POST /users - add new user, in body pass _first_name_, _last_name_ parameters
- DELETE /users/[id] - remove user and all assigned tasks
- PUT /users/[id] - update user info

#### TASKS
 - GET /tasks - get all tasks list
 - GET /tasks/[id] - get single task by id
 - GET /tasks/user/[id] - get tasks list for single user
 - POST /tasks - add new task, in body pass _title_, _description_, _status_, _userId_ parameters
 - DELETE /tasks/[id] - remove task with provided id
 - PUT /tasks/[id] - update task info
 - PATCH /tasks/[id] - update status for task with provided in body info, 
 status should be in ["View", "In Progress", "Done"]
 - PATCH /tasks/asignee/[id] - update assigned person for this task
 
 ##### Sort & Filter
 for 
 - GET /tasks
 - GET /tasks/user/[id]
 is implemented sorting and filtering by status. For this you should provide query parameters:
 status & order. 
 Status should be in ["View", "In Progress", "Done"], 
 Order could be "ASC" or "DESC"
 