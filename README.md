
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

## Environment Variables

You'll need to set up the following environment variables:

### Backend (.env file)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `GOOGLE_CLIENT_ID` - Google OAuth client ID

### Frontend (.env.local file)
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID (same as in backend)

## Features

- User authentication (email/password and Google Sign-In)
- Browse auctions
- Real-time bidding
- User dashboard
- Mobile responsive design

## Technologies Used

### Backend
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js for password hashing
- Google Auth Library for Google Sign-In

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- React Icons
- Sonner for toast notifications

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login a user
- POST `/api/auth/google` - Sign in with Google
- GET `/api/auth/me` - Get current user

### Auctions
- GET `/api/auctions` - Get all auctions
- GET `/api/auctions/:id` - Get a specific auction
- POST `/api/auctions` - Create a new auction (auth required)
- POST `/api/auctions/:id/bid` - Place a bid on an auction (auth required)
