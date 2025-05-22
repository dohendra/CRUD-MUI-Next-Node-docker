# User Management Microservice

This is a full-stack application built with Next.js for the frontend and Node.js/Express for the backend, using MongoDB as the database.

## Project Structure

```
.
├── frontend/           # Next.js frontend application
├── backend/           # Node.js/Express backend service
└── docker-compose.yml # Docker compose configuration
```

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- MongoDB (will be run in Docker)

## Getting Started

1. Clone the repository
2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## Features

- User CRUD operations
- Form validation (both frontend and backend)
- Responsive UI
- Dockerized deployment
- Scalable architecture

## API Endpoints

- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- POST /api/users - Create new user
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

## Development

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

### Backend (Node.js/Express)

```bash
cd backend
npm install
npm run dev
```

## Docker Commands

Build and start containers:
```bash
docker-compose up --build
```

Stop containers:
```bash
docker-compose down
```

## Environment Variables

Create `.env` files in both frontend and backend directories with the following variables:

Frontend (.env):
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Backend (.env):
```
PORT=4000
MONGODB_URI=mongodb://mongodb:27017/userdb
``` 