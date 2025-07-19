# Todo Application

A full-stack Todo application with user authentication, built with modern web technologies.

## Features

- User authentication (register and login)
- Create, read, update, and delete todos
- Mark todos as completed
- Secure API endpoints with JWT authentication
- Containerized application with Docker

## Tech Stack

- **Frontend**: HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT, bcrypt
- **Containerization**: Docker, Docker Compose

## Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose
- PostgreSQL (if running without Docker)

## Installation and Setup

### Using Docker (Recommended)

1. Clone the repository
2. Navigate to the project directory
3. Start the application using Docker Compose:

```bash
docker-compose up -d
```

The application will be available at http://localhost:3000

### Manual Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables in a `.env` file:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todoapp
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the application:

```bash
npm start
```

## API Endpoints

### Authentication

- **POST /auth/register** - Register a new user
  - Request body: `{ "username": "user", "password": "pass" }`
  - Response: `{ "token": "jwt_token" }`

- **POST /auth/login** - Login an existing user
  - Request body: `{ "username": "user", "password": "pass" }`
  - Response: `{ "token": "jwt_token" }`

### Todos

All todo endpoints require authentication. Include the JWT token in the Authorization header.

- **GET /todos** - Get all todos for the authenticated user
  - Response: `[{ "id": 1, "task": "Todo item", "completed": false }]`

- **POST /todos** - Create a new todo
  - Request body: `{ "task": "New todo" }`
  - Response: `{ "id": 2, "task": "New todo", "completed": false }`

- **PUT /todos/:id** - Update a todo's completion status
  - Request body: `{ "completed": true }`
  - Response: `{ "message": "Todo completed" }`

- **DELETE /todos/:id** - Delete a todo
  - Response: `{ "message": "Deleted Successfully" }`

## Database Schema

### User Model
- id (Integer, Primary Key)
- username (String, Unique)
- password (String, Hashed)

### Todo Model
- id (Integer, Primary Key)
- task (String)
- completed (Boolean, default: false)
- userId (Integer, Foreign Key to User)

## Development

To run the application in development mode:

```bash
docker-compose up
```


