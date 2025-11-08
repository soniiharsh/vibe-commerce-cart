# 🛒 Vibe Commerce — Mock E-Com Cart (Full-Stack Coding Assignment)

A full-stack shopping cart web application built as part of the **Vibe Commerce Internship Screening Assignment**.

---

## 🧠 Overview

This project demonstrates the full e-commerce flow — from product listing to cart management and mock checkout — using modern web technologies.

### ✨ Key Features
- 🛍️ Product grid with Add to Cart functionality  
- 🧾 Real-time cart updates with item quantity, total, and remove actions  
- 💳 Mock checkout flow (name/email → receipt with total & timestamp)  
- 💾 Persistent data using SQLite  
- ⚙️ RESTful backend APIs built with Express  
- 🧑‍💻 Responsive, clean React frontend  

---

## 🧱 Tech Stack

**Frontend:** React (create-react-app)  
**Backend:** Node.js, Express  
**Database:** SQLite (persistent)  
**API Protocol:** REST  
**Styling:** Custom CSS (responsive layout)

---
vibe-commerce-cart/
│
├── backend/
│ ├── server.js
│ ├── db.js
│ ├── seed.js
│ ├── data.sqlite
│ ├── package.json
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ ├── .env
│
└── README.md


---

## 🚀 Setup & Run Locally

### 🧩 Backend
```bash
cd backend
npm install
npm run seed     # populate products
npm run dev      # start Express server (default: http://localhost:5000)
```
### 💻 Frontend
```bash
cd frontend
npm install

# For PowerShell (Windows)
$env:REACT_APP_API_URL="http://localhost:5000/api"
npm start

# For macOS/Linux
REACT_APP_API_URL=http://localhost:5000/api npm start
```
🧠 API Endpoints
Method	Endpoint	Description
GET	/api/products	Returns all mock products
POST	/api/cart	Add { productId, qty } to cart
GET	/api/cart	Get cart items with total
DELETE	/api/cart/:id	Remove item from cart
POST	/api/checkout	Checkout → returns mock receipt

🖼️ Frontend Screenshots
<img width="1916" height="1031" alt="image" src="https://github.com/user-attachments/assets/cf7defe7-4ff5-4683-9a70-e67fd6e8eeb1" />


✅ Features Completed (Assignment Checklist)
Requirement	Status
GET /api/products	✅
POST /api/cart	✅
DELETE /api/cart/:id	✅
GET /api/cart	✅
POST /api/checkout	✅
Responsive Design	✅
Error Handling	✅
Database Persistence	✅
Bonus: Styled UI, Clean README	✅


👨‍💻 Author
Harsh Soni
📧 soniiharsh.04@gmail.com
🌐 GitHub: soniiharsh
