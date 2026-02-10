# 🚗 CarRental — MERN Car Rental Platform

A full-stack production-style car rental platform built using the MERN stack.
Users can browse cars, make bookings, manage payments, and reset passwords, while owners and admins have dedicated dashboards for management and verification workflows.

---

## ✨ Features

### 👤 User

* Register / Login (JWT Auth)
* Browse available cars
* Book vehicles with date validation
* Payment workflow
* Submit feedback
* Forgot / Reset Password via email

### 🚘 Owner

* Add / Edit cars
* Upload verification documents
* View bookings
* Manage listings

### 🛡 Admin

* Dashboard analytics
* Payment tracking
* Verification approvals
* Feedback moderation

---

## 🧱 Tech Stack

### Frontend

* React
* Vite
* TailwindCSS
* Axios
* React Router

### Backend

* Node.js
* Express
* MongoDB + Mongoose
* JWT Authentication
* bcrypt
* Nodemailer

---

## 📦 Project Structure

```
CarRental/
│
├── client/                 # React Frontend
│   ├── pages/
│   ├── components/
│   └── context/
│
├── server/                 # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── Routes/
│   ├── middleware/
│   ├── utils/
│   └── configs/
│
└── README.md
```

---

## ⚙️ Environment Variables

Create `.env` inside `/server`

```
PORT=3000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:5173
```

---

## 🚀 Installation

### 1️⃣ Clone Repo

```
git clone https://github.com/yourusername/CarRental.git
cd CarRental
```

---

### 2️⃣ Install Dependencies

#### Backend

```
cd server
npm install
```

#### Frontend

```
cd ../client
npm install
```

---

### 3️⃣ Run Application

#### Start Backend

```
cd server
npm run server
```

#### Start Frontend

```
cd client
npm run dev
```

---

## 🔐 Authentication Flow

* JWT stored in localStorage
* Protected routes via middleware
* Password hashing via bcrypt
* Reset tokens hashed before DB storage

---

## 📡 API Overview

### User

```
POST /api/user/register
POST /api/user/login
GET  /api/user/data
POST /api/user/forgot-password
POST /api/user/reset-password/:token
```

### Booking

```
POST /api/bookings
GET  /api/bookings/user
```

### Owner

```
POST /api/owner/add-car
GET  /api/owner/cars
```

### Admin

```
GET /api/admin/stats
GET /api/admin/payments
```

*(See routes folder for full list)*

---

## 🔑 Password Reset Flow

1. User requests reset link
2. Secure token generated
3. Hashed token stored in DB
4. Email sent via Nodemailer
5. User sets new password

Security:

* Token expiry
* Hash protection
* No plaintext token storage

---

## 🧪 Testing

Manual API testing via:

* Postman
* Thunder Client

---

## 🎯 Roadmap

* Stripe Integration
* Image optimization CDN
* Booking calendar UI
* Rate limiting
* Audit logging
* Email templates system
* Deployment (Docker + CI/CD)

---

## 👨‍💻 Author

Built by **Ankit**

---

## ⭐ Contribution

Pull requests welcome.
Open an issue first to discuss major changes.

---

## 📄 License

MIT License
