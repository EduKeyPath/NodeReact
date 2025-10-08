# React E-Commerce App (Node + React v17.0.2 + Redux + Bootstrap + Stripe)

This is a fully functional **Node + React e-commerce application** built using **React v17.0.2**, **Bootstrap**, and **Stripe payment integration**.  
It includes login, cart functionality, product zoom and navigation, and checkout.

---

## Features

### Authentication
- **Login Page** – Simple login
- **Protected Routes** – Only accessible after login

### Product Features
- **Product Listing Page** – Displays products
- **Product Details Page**
  - Image zoom on hover
  - Next/Previous product navigation
  - "Add to Cart" functionality
  - "Similar Products" section at the bottom

### Cart Functionality
- View products added to cart
- Update quantity
- Remove items
- Cart total calculation

### Checkout & Payment
- **Stripe payment integration**
- Mock order summary
- **Success Page** shown after payment

### UI Design
- All pages styled using **Bootstrap**
- Additional custom CSS for specific components

---


## Getting Started

### 1. Clone the Repository
`bash`
git `clone path`
cd `project_folder_name`

## Install Dependencies
`npm install`

## Start the Apache Server
Require DB, which should have customer table (name, email, password, status, created_date)
- Product table (id, title, description, category, image, large_img,  listing_type, grade, qty, price, status, created_date)

## Start the Node Development Server
`npm run dev`
Visit: http://localhost:8080


## Start the React Development Server
`npm start`

Visit: http://localhost:3000


---

## Stripe Setup
- Stripe integrated via @stripe/react-stripe-js and @stripe/stripe-js
- You must replace the Stripe publishable key in the code with your own.


## Contributions
This project is for educational/demo purposes.
Thanks for checking it out!



