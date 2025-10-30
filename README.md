shopping-cart/
├── backend/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── cartRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── cartController.js
│   └── seed/
│   |   └── seedProducts.js
|   |
|   |── middleware/
│       └── authMiddleware.js

└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── App.js
        ├── App.css
        ├── bootstrap.min.css
        ├── hooks/
        │   └── useLocalStorage.js
        ├── context/
        │   ├── AuthContext.js
        │   └── CartContext.js
        ├── components/
        │   ├── Navbar.js
        │   ├── Login.js
        │   ├── Register.js
        │   ├── ProductList.js
        │   └── Cart.js
        └── utils/
            └── api.js


1)  Backend 

cd Cart/backend
npm install

 npm run seed  <!-- # seed initial 15 products -->
 npm start

# server runs on http://localhost:5000


2) Frontend

npx create-react-app@latest frontend

cd frontend
npm install axios bootstrap react-router-dom
npm start
# frontend runs on http://localhost:3000


# Shopping Cart with Auth (React + Node + MongoDB)

## Features
- User register/login with JWT
- Product listing (15 seeded products)
- Add/remove/update items in cart
- Cart persisted per-user in MongoDB
- Remember me option (localStorage)
- Context API for auth & cart
- Bootstrap + custom CSS for UI

## Setup
1. Start MongoDB.
2. Backend:
   - cd backend
   - npm install
   - create .env (see .env.example)
   - npm run seed
   - npm start
3. Frontend:
   - npx create-react-app@latest frontend (or use provided frontend folder)
   - replace src/ with provided files
   - npm install axios bootstrap react-router-dom
   - npm start

## Notes
- Backend: http://localhost:5000/api
- Frontend: http://localhost:3000

