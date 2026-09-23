# PTA Authentication Backend

A Node.js/Express backend for Parent-Teacher Association authentication with role-based access control.

## Features

- User authentication with JWT tokens
- Role-based access control (Parent/Teacher)
- Password hashing with bcrypt
- MongoDB integration
- CORS support
- Separate endpoints for parent and teacher registration/login

## API Endpoints

### Authentication
- `POST /api/auth/parent/register` - Register a new parent
- `POST /api/auth/parent/login` - Login as parent
- `POST /api/auth/teacher/register` - Register a new teacher
- `POST /api/auth/teacher/login` - Login as teacher
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user

### Protected Routes
- `GET /api/auth/parent/dashboard` - Parent dashboard (requires parent role)
- `GET /api/auth/teacher/dashboard` - Teacher dashboard (requires teacher role)

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=mongodb+srv://your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=https://your-frontend-url.com
NODE_ENV=production
```

## Installation

```bash
npm install
```

## Running Locally

```bash
npm start
```

## Deployment

This application is configured for deployment on Render using the `render.yaml` file.

### Required Environment Variables for Render

- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure secret key for JWT signing

## User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "parent" | "teacher",
  createdAt: Date
}
```

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens expire after 7 days
- Role-based middleware protects sensitive routes
- CORS configuration for cross-origin requests
