# CarRental Project (MERN) — Final Submission

## Features
- User authentication (JWT)
- Car listing & car details
- Booking system
- Payments collection created automatically on booking
- Transaction logs created automatically
- Feedback system
- Profile verification (submit ID)
- Admin panel: stats + verifications + payments + feedback

## Tech Stack
- Frontend: React + Vite + TailwindCSS + motion/react
- Backend: Node.js + Express
- Database: MongoDB

## How to Run (Local)

### 1) Backend
```bash
cd server
npm install
npm run server
```

Create `.env` inside `server/`:
```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET
```

### 2) Frontend
```bash
cd client
npm install
npm run dev
```

Create `.env` inside `client/`:
```env
VITE_BASE_URL=http://localhost:5000
VITE_CURRENCY=₹
```

## Main Routes
- User:
  - `/` Home
  - `/cars`
  - `/car-details/:id`
  - `/my-bookings`
  - `/verification`

- Owner Panel:
  - `/owner`
  - `/owner/add-car`
  - `/owner/manage-cars`
  - `/owner/manage-bookings`

- Admin Panel:
  - `/admin-login`
  - `/admin`
  - `/admin/verifications`
  - `/admin/payments`
  - `/admin/feedback`

## Notes
- Admin token stored in `localStorage` key: `adminToken`
- User token stored in `localStorage` key: `token`
