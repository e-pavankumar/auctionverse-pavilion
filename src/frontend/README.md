
# Frontend Directory

This directory contains all frontend-related code for the AuctionVerse application.

## Structure

- `/components`: Reusable UI components
  - `/ui`: Shadcn UI components and custom UI elements
  - Specialized components like `AuctionCard`, `BidForm`, etc.
- `/pages`: Page components that correspond to routes in the application
  - `Home.jsx`: The landing page
  - `SignIn.jsx`: Authentication page
  - `AuctionDetail.jsx`: Details page for a specific auction
  - And more...
- `App.jsx`: Main application component with routing

## Technology Stack

The frontend is built with:

- React for UI components
- React Router for navigation
- Tailwind CSS for styling
- Shadcn UI for UI components
- Sonner for toast notifications

## Connecting to Backend

Currently, the frontend connects to a mock backend implementation. In a production environment, you would:

1. Update API calls to point to your production backend
2. Implement proper error handling
3. Add loading states
4. Implement caching strategies

## Design System

The application uses a consistent design system with:

- Glass-card UI elements
- Consistent color scheme (primary color for highlights)
- Responsive design for all screen sizes
- Animation for interactive elements
