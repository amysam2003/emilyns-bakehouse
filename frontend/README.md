# Emilyn's Bakehouse

## Project Overview
Emilyn's Bakehouse is a Full-Stack Web-Application (based on MERN) showcasing an online bakery shop.It allows customers to browse products, add to cart, make secure payments and view order history.  
On the other hand, admin can manage products, see orders and view analytics.

## GitHub Repository
https://github.com/amysam2003/emilyns-bakehouse

## Prerequisites
Before running the project locally, ensure you have the following installed or available:
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account or local MongoDB server
- Stripe Developer Account (for test payments)
- Google Cloud Developer Account (for Maps API)
- Git (for version control)

## Local Setup & Installation

### Backend Setup 

1. Navigate to the backend directory:
cd backend

2. Install dependencies:
npm install

3. Create an .env file inside backend/ folder with the following variables:
PORT=5000
JWT_SECRET=your_secret
MONGO_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_key
GOOGLE_MAPS_API_KEY=your_maps_key

4. Start the backend server:
npm run dev
Backend API will run at: http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
cd frontend

2. Install dependencies:
npm install

3. Create an .env file inside frontend/ folder with the following variables:
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_key
VITE_GOOGLE_MAPS_API_KEY=your_key

4. Start the frontend development server:
npm run dev
Frontend will run at: http://localhost:5173

## Production Deployment (LIVE URL)
Frontend (Vercel): https://emilyns-bakehouse.vercel.app/
Backend (Render): https://emilyns-bakehouse.onrender.com

## Features
### For Customers
- Browse bakery products with search, filter, and category sort
- Add, remove and update items in the cart
- Secure checkout using Stripe Payment API
- View order history and its details
- Edit profile and change password

### For Admin
- Add, edit and delete bakery products
- Upload product images
- View analytics which comprises of total orders, revenue, registered users
- Pie Chart visual for paid vs pending orders (Chart.js / react-chartjs-2)

## External APIs and Libraries
- Stripe Payment API - for secure transactions
- Google Maps API - to display bakery location
- Chart.js / react-chartjs-2 - for admin dashboard visual analytics

## Database Schema
- Database: MongoDB Atlas
- Collections: Customers, Products, Orders

### Relationships:
Customer => Orders (one-to-many)
Order => Products (many-to-many via orderItems embedded array)
Queries are handled by Mongoose populate() and aggregation pipelines

## Security
- JWT authentication for route protection
- Bcrypt-hashed passwords
- Admin-only routes enforced via middleware

## References
- React
- Node.js
- Express.js
- MongoDB
- Stripe
- Google Maps JS API
- react-chartjs-2

## Note on Product Images
Product images are sourced from Unsplash.com, edited by the author (background removed, sharpened, filtered) to maintain visual consistency.
