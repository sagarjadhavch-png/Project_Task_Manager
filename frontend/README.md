# Project & Task Manager

A full-stack Project and Task Management app built with Node.js, Express, and React.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Storage:** In-memory (no database)

## Features

- Create and delete projects
- Add tasks under each project
- Update task status (Todo / In Progress / Done)
- Filter tasks by status
- Delete tasks
- Tasks auto-delete when a project is deleted

## Project Structure


Project_and_Task_Manager/
├── backend/
│   ├── controllers/
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── services/
│   │   ├── projectService.js
│   │   └── taskService.js
│   └── server.js
└── frontend/
└── src/
├── components/
│   ├── ProjectForm.jsx
│   ├── ProjectList.jsx
│   ├── TaskForm.jsx
│   ├── TaskItem.jsx
│   └── TaskList.jsx
├── api.js
└── App.jsx

## Setup & Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/project-task-manager.git
cd project-task-manager
```

### 2. Run the Backend
```bash
cd backend
npm install
node server.js
```
Backend runs on: http://localhost:3001

### 3. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

## API Endpoints

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /projects | Get all projects |
| POST | /projects | Create a project |
| DELETE | /projects/:id | Delete a project |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks?projectId=&status= | Get tasks with filters |
| POST | /tasks | Create a task |
| PATCH | /tasks/:id | Update task status |
| DELETE | /tasks/:id | Delete a task |

## Design Decisions

### 1. How did you structure your backend, and why?
The backend follows a 3-layer architecture:
 **Routes** (`/routes`)
- Only responsible for defining API endpoints
- Maps HTTP methods and paths to the correct controller function
- Keeps routing logic completely separate from business logic

**Controllers** (`/controllers`)
- Receives the HTTP request and sends the HTTP response
- Handles status codes (200, 201, 400, 404, 500)
- Does NOT contain any business logic — just calls the service and returns the result
- Catches errors thrown by services and converts them to proper error responses

**Services** (`/services`)
- Contains all the business logic and data operations
- Handles validation (missing title, invalid status)
- Handles edge cases (task linked to non-existent project, invalid status updates)
- Works with the in-memory data store (arrays)
- Has no knowledge of HTTP — making it easy to swap storage later

**Why this structure?**
- Each layer has one job — easy to debug and maintain
- If we switch from in-memory to a real database, we only change the service layer
- If we change an API response format, we only touch the controller
- Easy to write unit tests for each layer independently

### 2. How are you managing state and API calls in the frontend?

 **API Layer** (`api.js`)
- All fetch calls are centralized in one file
- Each function handles one API operation (getProjects, createTask, etc.)
- Makes it easy to change the base URL or add headers in one place
- Components never call fetch directly — they always go through api.js

**State Management** (`App.jsx`)
- `projects` — list of all projects fetched from backend
- `selectedProject` — the currently active project the user clicked
- `refresh` — a boolean that toggles to trigger a re-fetch after any create or delete action
- State lives in `App.jsx` and flows down to child components via props
- Child components communicate back up using callback functions (onCreated, onDeleted)

### 3. If this app needed to scale, what would you improve?

**Backend Improvements**

 - **Database** — Replace in-memory arrays with PostgreSQL using an ORM like
  Prisma. In-memory storage resets every time the server restarts and
  cannot be shared across multiple server instances.

- **Authentication** — Add JWT-based login so each user sees only their
  own projects and tasks. Currently anyone with the URL can access all data.

 **Frontend Improvements**

- **Pagination** — If a project has hundreds of tasks, loading all at once
  will be slow. Add page-based or infinite scroll pagination.

- **Global Error Handling** — Add a toast notification system to show
  success and error messages instead of browser alert popups.

- **Form Validation** — Add client-side validation with better error
  messages before even making an API call.