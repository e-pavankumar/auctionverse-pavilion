
# AuctionVerse - Online Auction Platform

## Project Structure

This project is divided into two main directories:

- `frontend` - React application built with Vite
- `backend` - Express.js server with MongoDB database

## Getting Started

### Running the Backend

```sh
cd backend
npm install
npm run dev
```

The backend server will run on port 5000 by default.

### Running the Frontend

```sh
cd frontend
npm install
npm run dev
```

The frontend development server will run on port 5173 by default.

## Technologies Used

### Backend
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js for password hashing

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- Shadcn UI Components

## Features

- Browse auctions
- Real-time bidding
- User authentication
- Mobile responsive design

## Database Connection

This application uses MongoDB Atlas for database storage. You can also connect to it using MongoDB Compass with the connection string provided in the backend `.env` file.

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login a user
- GET `/api/auth/me` - Get current user

### Auctions
- GET `/api/auctions` - Get all auctions
- GET `/api/auctions/:id` - Get a specific auction
- POST `/api/auctions` - Create a new auction (auth required)
- POST `/api/auctions/:id/bid` - Place a bid on an auction (auth required)

## Deployment

For deployment, build both the frontend and backend:

```sh
# Build frontend
cd frontend
npm run build

# Start backend in production mode
cd ../backend
NODE_ENV=production npm start
```
