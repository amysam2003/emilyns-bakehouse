# Emilyn's Bakehouse

## Project Overview
Emilyn's Bakehouse is a Full-Stack Web-Application (based on MERN) showcasing an online bakery shop.It allows customers to browse products, add to cart, make secure payments and view order history.  
On the other hand, admin can manage products, see orders and view analytics.

## GitHub Repository
[https://github.com/YourUsername/emilyns-bakehouse](https://github.com/YourUsername/emilyns-bakehouse)

## Prerequisites
Before running the project locally, ensure the following software and accounts are available:
Node.js v18+  
npm or yarn  
MongoDB Atlas account or local MongoDB server  
Stripe Developer Account (for test payments)  
Google Cloud Developer Account (for Maps API)  
Git (for version control)

## Local Setup & Installation
### Backend Setup
1. Navigate to the backend folder:
```bash
cd backend
Install dependencies:
npm install

Create a .env file in the backend/ directory with:
PORT=5000
JWT_SECRET=your_secret
MONGO_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_key
GOOGLE_MAPS_API_KEY=your_maps_key

Start the backend server:
npm run dev
The backend API will run at: http://localhost:5000

Frontend Setup
Navigate to the frontend folder:
cd frontend

Install dependencies:
npm install

Create a .env file in the frontend/ directory with:
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_key
VITE_GOOGLE_MAPS_API_KEY=your_key

Start the frontend development server:
npm run dev
The frontend will run at: http://localhost:5173

Production Deployment
Frontend (Netlify): YOUR_NETLIFY_URL
Backend (Render): YOUR_RENDER_URL

Features
For Customer
-Browse bakery products with search, filter, and category sort
-Add/remove/update cart items
-Secure checkout using Stripe Payment API
-View order history and details
-Edit profile and change password

For Admin
-Add, edit, delete bakery products
-Upload product images
-View analytics (total orders, revenue, registered users)
-Pie chart visual for paid vs pending orders (Chart.js / react-chartjs-2)

External APIs
-Stripe Payment API - for secure transactions
-Google Maps API - to display bakery location

Chart.js / react-chartjs-2 - for admin dashboard visual analytics

Database Schema
-Database: MongoDB Atlas
-Collections: Customers, Products, Orders

Relationships:
Customer => Orders (1-to-many)
Order => Products (many-to-many via orderItems embedded array)
Queries: Mongoose populate() and aggregation pipelines

Security
-JWT authentication for route protection
-Bcrypt-hashed passwords
-Admin-only routes enforced via middleware

# References
-React
-Node.js
-Express.js
-MongoDB
-Stripe
-Google Maps JS API
-react-chartjs-2

Note on Product Images
Product images are sourced from Unsplash.com, edited by the author (background removed, sharpened, filtered) to maintain visual consistency.