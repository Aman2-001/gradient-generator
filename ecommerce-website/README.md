# EcomStore - Full Stack E-commerce Website

A modern, full-featured e-commerce website built with React.js frontend and Node.js backend, styled with Tailwind CSS.

## 🚀 Features

### Frontend (React.js + Tailwind CSS)
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **User Authentication**: Login, registration, and protected routes
- **Product Catalog**: Browse products with search, filtering, and sorting
- **Shopping Cart**: Add/remove items, quantity management
- **User Dashboard**: Profile management and order history
- **Responsive Design**: Mobile-first approach, works on all devices

### Backend (Node.js + Express)
- **RESTful API**: Complete API for all e-commerce operations
- **Authentication**: JWT-based authentication system
- **Database**: MongoDB with Mongoose ODM
- **Product Management**: CRUD operations for products
- **Order Processing**: Complete order management system
- **User Management**: User profiles and preferences
- **Security**: Password hashing, input validation, and CORS protection

## 🛠️ Tech Stack

### Frontend
- React.js 18
- React Router DOM
- Tailwind CSS
- Axios for API calls
- Lucide React (icons)
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests
- Multer for file uploads
- Stripe for payment processing (optional)

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ecommerce-website
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install backend dependencies:
```bash
npm install
```

Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development

# Optional: Stripe Configuration
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Optional: Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

Start MongoDB (if running locally):
```bash
mongod
```

Start the backend server:
```bash
npm run dev
```

The backend server will run on http://localhost:5000

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install frontend dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm start
```

The frontend will run on http://localhost:3000

## 📁 Project Structure

```
ecommerce-website/
├── backend/
│   ├── models/           # MongoDB models
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── middleware/       # Custom middleware
│   │   └── auth.js
│   ├── uploads/          # File upload directory
│   ├── server.js         # Main server file
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/   # Reusable components
    │   │   ├── Navbar.js
    │   │   └── Footer.js
    │   ├── pages/        # Page components
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Products.js
    │   │   ├── Cart.js
    │   │   └── ...
    │   ├── context/      # React Context providers
    │   │   ├── AuthContext.js
    │   │   ├── CartContext.js
    │   │   └── ProductContext.js
    │   ├── utils/        # Utility functions
    │   ├── hooks/        # Custom React hooks
    │   ├── App.js        # Main app component
    │   └── index.js      # Entry point
    ├── public/
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🔧 Available Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

### Frontend
- `npm start` - Start the development server
- `npm run build` - Build the app for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🌟 Key Features Implementation

### Authentication System
- JWT-based authentication
- Protected routes
- User registration and login
- Password hashing with bcryptjs

### Product Management
- CRUD operations for products
- Image upload support
- Product categories and filtering
- Search functionality
- Product reviews and ratings

### Shopping Cart
- Add/remove items
- Quantity management
- Persistent cart (stored in database for logged-in users)
- Real-time cart updates

### Order Management
- Complete order processing
- Order history
- Order status tracking
- Admin order management

## 🔐 Security Features

- Password hashing
- JWT token authentication
- Input validation
- CORS protection
- Environment variables for sensitive data

## 🎨 UI/UX Features

- Modern, clean design
- Fully responsive layout
- Mobile-first approach
- Beautiful animations and transitions
- Consistent color scheme and typography
- Accessible design patterns

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, DigitalOcean)
1. Set up your production database (MongoDB Atlas recommended)
2. Update environment variables for production
3. Deploy using your preferred platform

### Frontend Deployment (e.g., Netlify, Vercel)
1. Build the production version: `npm run build`
2. Update API endpoints for production
3. Deploy the build folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the flexible database solution
- All open-source contributors who made this project possible

---

**Happy Coding! 🎉**