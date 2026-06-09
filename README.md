# SportNest - Sports Facility Booking Platform (Frontend)

## Project Name
SportNest Frontend

## Purpose
A modern web application that allows users to discover, book, and manage sports facilities like football grounds, cricket nets, badminton courts, and swimming pools.

## Frontend Live URL
https://sportnest-frontend-phi.vercel.app
## backend Live URL
https://sportnest-server-7bbz.onrender.com
 ## backend repository URL
 https://github.com/sadiarahmansmrity0/sportnest-server

## Features
- User Authentication (Email/Password + Google OAuth)
- Browse and Search Facilities
- Booking System for Time Slots
- Filter by Sport Category
- Sort by Price
- Add New Facilities (for owners)
- Edit and Delete Facilities
- View Booking History
- Cancel Bookings
- Responsive Design (Desktop, Tablet, Mobile)
- Dark Theme UI

## NPM Packages Used

| Package | Purpose |
|---------|---------|
| next | React framework |
| react | UI library |
| react-dom | DOM rendering |
| tailwindcss | CSS styling |
| lucide-react | Icons |
| @react-oauth/google | Google login |

## Installation

```bash
git clone https://github.com/yourusername/sportnest-frontend.git
cd sportnest-frontend
npm install
npm run dev
## Environment Setup
Create src/lib/api.js:
export const API_URL = 'https://your-backend-url.onrender.com';
export const NEXT_PUBLIC_GOOGLE_CLIENT_ID = 'your_google_client_id';
Author
Sadia Rahman Smrity