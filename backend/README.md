# Todo-List Api

![Screenshot of the package.json file for the project. It shows the name, repository, custom scripts and other information about the todo-list API project](/readme_img/api-json.png)

## Description

This project implements a RESTful API for managing to-do lists using Express.js and Prisma. It allows users to create, read, update, and delete tasks and sub-tasks, providing a structured approach to managing their daily activities.

## Why I Built This

I had just learned about API's in express and I thought that working on a simple project like this would give me the practice that I need. I have also learned a lot when working on this project.

### Key Features:

1. **Task Management**: Users can create new tasks with titles and optional descriptions. They can also retrieve, update (title, description, completion status), and delete existing tasks.
2. **Sub-task Management**: Nested within tasks, sub-tasks offer further granularity. Users can create new sub-tasks, view them within a specific task, update their titles and completion status, and delete them as needed.
3. **Database Integration**: Prisma acts as an Object-Relational Mapper (ORM), simplifying interaction with a relational database. This ensures data persistence and allows efficient retrieval and manipulation of tasks and sub-tasks.

## Technology Stack:

1. **Express.js**: A popular Node.js framework for building web applications and APIs, providing a flexible architecture for handling requests and responses.
2. **Prisma**: An ORM that acts as a bridge between your Node.js application and the database. It simplifies data access by automatically generating queries and migrations, reducing boilerplate code.
   Benefits:
3. **Organized Task Management**: Users can effectively manage their to-do lists with clear separation between tasks and sub-tasks.
4. **RESTful API**: The API adheres to RESTful principles, allowing seamless integration with various client-side applications.

**_Scalability_: The chosen technologies offer a scalable foundation for handling a growing number of tasks and users.**

## Getting Started:

1. Clone the project repository.
   - `git clone https://github.com/opaque-maniac/todo-api.git`
2. Install dependencies using npm install.
   - `cd todo-api`
   - `npm i`
3. Configure your database connection details in prisma/schema.prisma.
   - Change the environment variable for the `DATABASE_URL`
     - _Add an external url for a database server_
   - Execute the following command:
     - `npx prisma init`
4. Run database migrations using npx prisma migrate dev.
   - `npx prisma migrate dev`
5. Start the server. Use the command:
   - `npm run dev`

## API Endpoints:

### Authentication

1. **POST /auth/register**:
   - Method: **POST**
   - Endpoint to register a new user.
   - Data required is of format: `{ "email": "test@example.com", "name": "Example User", "password": "testexampleuser" }`
2. **POST /auth/login**:
   - Method: **POST**
   - Endpoint to login a user.
   - Data required is of format: `{ "email": "test@example.com", "password": "testexampleuser"}`

**NOTE**:
_Both of the login and register views return a token which is unique to that user and will be used by all other views to authenticate and identify current user._

![Screenshot of an API client after registering a test user to the database API. The JSON data send to the user is the email, name and password.](/readme_img/api-reg-call.png)

### List Management

1. **GET /api/lists**:
   - Method: **GET**
   - Endpoint to get a users list.
   - It uses the token returned from **/login** and **/register** endpoints to authenticate a user.
2. **POST /api/lists**:
   - Method: **POST**
   - Endpoint to create a new list.
   - Data required is of format: `{ "name": "Test list", "description": "This is a test list" }`
   - The `description` field is **optional**.
   - Each topic has a unique id, for reference, check the **schema.prisma** file.
3. **PUT /api/lists/:id**:
   - Method: **PUT**
   - Endpoint to edit a list.
   - Data required is of format: `{ "name": "New Test List", "description": "This a new test list" }`
   - The `description` field is **optional**.
   - The `:id` is the id of the list which is a unique string.
4. **DELETE /api/lists/:id**:
   - Method: **DELETE**
   - Endpoint to delete a list.
   - The `:id` is the id of the list which is a unique string.

### Task Management

1. **GET /api/lists/:listId/tasks**:
   - Method: **GET**
   - Endpoint to see tasks that belong to a list.
   - The `:listId` is the id of the list which is a unique string.
2. **POST /api/lists/:listId/tasks**:
   - Method: **POST**
   - Endpoint to create a task for a specific task
   - Data required is of format: `{ "name": "Test task", "description": "Task description", "dueDate": 12328978743 }`
   - The `description` field is **optional**.
   - The `dueDate` field should contain **Date** date.
   - The `:listId` is the id of the list which is a unique string.
3. **PUT /api/lists/:listId/tasks/:taskId**:
   - Method: **PUT**
   - Endpoint to edit a task.
   - Data required is of format: `{ "name": "Test task", "description": "Task description", "dueDate": 12328978743 }`
   - The `description` field is **optional**.
   - The `dueDate` field should contain **Date** date.
   - The `:listId` is the id of the list which is a unique string.
   - The `:taskId` is the id of the task.
4. **DELETE /api/lists/:listId/tasks/:taskId**:
   - Method: **DELETE**
   - Endpoint to delete a task.
   - The `:listId` is the id of the list which is a unique string.
   - The `:taskId` is the id of the task.

### Sub-Task Management

1. **GET /api/lists/:listId/tasks/:taskId/subtasks**:
   - Method: **GET**
   - Endpoint to retrieve a list of subtasks for a task.
   - The `:listId` is the id of the list which is a unique string.
   - The `:taskId` is the id of the task.
2. **POST /api/lists/:listId/tasks/:taskId/subtasks**:
   - Method: **POST**
   - Endpoint to create a subtask for a task.
   - Data required is of format: `{ "name": "Test subtask", "description": "First subtask", "dueDate": 12328978743 }`
   - The `description` field is **optional**.
   - The `dueDate` field should contain **Date** date.
   - The `:listId` is the id of the list which is a unique string.
   - The `:taskId` is the id of the task.
3. **PUT /api/lists/:listId/tasks/:taskId/subtasks**:
   - Method: **PUT**
   - Endpoint to edit a subtask.
   - Data required is of format: `{ "name": "Test subtask", "description": "First subtask", "dueDate": 12328978743 }`
   - The `description` field is **optional**.
   - The `dueDate` field should contain **Date** date.
   - The `:listId` is the id of the list which is a unique string.
   - The `:taskId` is the id of the task.
4. **DELETE /api/lists/:listId/tasks/:taskId/subtasks**:
   - Method: **DELETE**
   - Endpoint to delete a subtask.
   - The `:listId` is the id of the list which is a unique string.
   - The `:taskId` is the id of the task.

**Note**: - _This is a basic example. You can implement user authentication and authorization for a more robust solution._
