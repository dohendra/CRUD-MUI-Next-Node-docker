# User Management System

A full-stack user management system built with Next.js, Express.js, and MongoDB.

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Material-UI (MUI)
- React Hook Form
- Yup for validation
- Axios for API calls

### Backend
- Express.js
- TypeScript
- MongoDB with Mongoose
- Express Validator
- CORS
- Helmet for security

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- MongoDB Atlas account or local MongoDB instance

## Project Structure

```
.
├── frontend/             # Next.js frontend application
│   ├── src/
│   │   ├── app/         # Next.js app directory
│   │   │   ├── components/  # React components
│   │   │   └── types/       # TypeScript type definitions
│   │   └── public/          # Static files
│   │
│   ├── backend/             # Express.js backend application
│   │   └── src/
│   │       ├── controllers/ # Route controllers
│   │       ├── models/      # Mongoose models
│   │       ├── routes/      # API routes
│   │       └── types/       # TypeScript type definitions
│   │
│   └── package.json         # Root package.json for workspace management
│
└── docker-compose.yml       # Docker compose configuration
```

## Environment Variables

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Backend (.env)
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
yarn install:all
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the variables with your configuration

4. Run the development servers:
```bash
yarn dev
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:4000

## Available Scripts

### Root Directory
- `yarn dev` - Run both frontend and backend in development mode
- `yarn install:all` - Install dependencies for all workspaces
- `yarn build` - Build the frontend application
- `yarn start` - Start the backend server

### Frontend
- `yarn dev` - Run Next.js development server
- `yarn build` - Build the Next.js application
- `yarn start` - Start the production server
- `yarn lint` - Run ESLint

### Backend
- `yarn dev` - Run the development server with hot reload
- `yarn build` - Compile TypeScript to JavaScript
- `yarn start` - Start the production server

## Features

- User CRUD operations
- Form validation
- Responsive Material-UI design
- TypeScript support
- MongoDB integration
- API error handling
- Security best practices

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Docker Commands

Build and start containers:
```bash
docker-compose up --build
```

Stop containers:
```bash
docker-compose down
``` 