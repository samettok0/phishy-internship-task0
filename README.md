# Todo Application

A fullstack todo application built with Node.js backend, SQLite database, and JWT authentication.

## Features

- User authentication (register/login) with JWT tokens
- Create, read, update, and delete todos
- Mark todos as completed
- Filter todos by status (All, Open, Complete)
- In-memory SQLite database
- RESTful API endpoints
- Simple and responsive frontend interface

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite (in-memory)
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Frontend**: HTML, CSS, JavaScript

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
  - Body: `{ "username": "example@email.com", "password": "password" }`
  - Response: `{ "token": "jwt-token" }`

- `POST /auth/login` - Login a user
  - Body: `{ "username": "example@email.com", "password": "password" }`
  - Response: `{ "token": "jwt-token" }`

### Todo Operations (Protected Routes)

- `GET /todos` - Get all todos for the logged-in user
  - Header: `Authorization: jwt-token`
  - Response: Array of todo objects

- `POST /todos` - Create a new todo
  - Header: `Authorization: jwt-token`
  - Body: `{ "task": "Task description" }`
  - Response: The created todo object

- `PUT /todos/:id` - Update a todo (mark as completed)
  - Header: `Authorization: jwt-token`
  - Body: `{ "completed": 1 }`
  - Response: `{ "message": "Todo completed" }`

- `DELETE /todos/:id` - Delete a todo
  - Header: `Authorization: jwt-token`
  - Response: `{ "message": "Deleted Successfully" }`

## Getting Started

### Prerequisites

- Node.js (v14 or higher)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd mid
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file with the following content
   ```
   JWT_SECRET=your_secret_key_here
   PORT=3000
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
mid/
├── public/                # Frontend static files
│   ├── index.html         # Main HTML file
│   ├── styles.css         # Main CSS file
│   └── fanta.css          # Additional CSS
├── src/
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT authentication middleware
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication routes
│   │   └── todoRoutes.js      # Todo CRUD operations
│   ├── db.js              # Database configuration
│   └── server.js          # Express server setup
├── package.json          # Project dependencies
└── todo_app.rest         # REST API test file
```

## Notes

- The application uses an in-memory SQLite database, so data will be lost when the server restarts
- The frontend interacts with the backend through RESTful API calls
- JWT tokens expire after 24 hours

## License

This project is licensed under the ISC License.


