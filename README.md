# 🐾 PawsHome — Pet Adoption Platform (Server)

![Server Banner](https://capsule-render.vercel.app/api?type=waving&color=ea580c&height=180&section=header&text=PawsHome+API&fontSize=50&fontColor=ffffff&fontAlignY=38&desc=Secure+Express+%2B+MongoDB+Backend&descAlignY=58&descSize=18)

## 📌 Overview

RESTful backend API for the PawsHome Pet Adoption Platform. Built with Express.js + MongoDB with JWT authentication via HTTPOnly cookies.

## 🌐 Base URL

> **[https://pawshome-api.onrender.com](https://pawshome-api.onrender.com)**

## ✨ Features

- 🔐 **JWT Auth** — Token generation, HTTPOnly cookie storage, middleware protection
- 🐕 **Pet CRUD** — Full create, read, update, delete for pet listings
- 📋 **Adoption System** — Request submission, approval/rejection, auto-lock on approval
- 🔍 **MongoDB Query Operators** — `$regex` for search, `$in` for species filter
- 🛡️ **Ownership Guards** — Only pet owners can edit/delete listings and manage requests
- 🌐 **CORS Configured** — Credentials-enabled cross-origin setup
- ♻️ **Auto Cascade** — Approving one request rejects all others and marks pet as adopted

## 📦 NPM Packages Used

| Package | Purpose |
|---|---|
| `express` | Web framework |
| `mongodb` | Database driver |
| `jsonwebtoken` | JWT token generation & verification |
| `cookie-parser` | Parse HTTPOnly cookies |
| `cors` | Cross-origin resource sharing |
| `dotenv` | Environment variable management |

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/Safin313-stack/pawshome-server

# Install dependencies
cd pawshome-server
npm install

# Setup environment variables
cp .env.example .env
# Fill in MONGODB_URI, JWT_SECRET, CLIENT_URL

# Start development server
npm run dev
```

## 🗂️ API Endpoints

### Auth
| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/token` | Generate JWT token |
| POST | `/api/auth/logout` | Clear token cookie |

### Pets
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/pets` | Public | Get all pets (search, filter, sort) |
| GET | `/api/pets/featured` | Public | Get 6 featured pets |
| GET | `/api/pets/:id` | Public | Get single pet |
| GET | `/api/pets/user/my-listings` | 🔒 | Get owner's listings |
| POST | `/api/pets` | 🔒 | Add new pet |
| PUT | `/api/pets/:id` | 🔒 | Update pet |
| DELETE | `/api/pets/:id` | 🔒 | Delete pet |

### Adoptions
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/adoptions` | 🔒 | Submit adoption request |
| GET | `/api/adoptions/my-requests` | 🔒 | Get user's requests |
| GET | `/api/adoptions/pet/:petId` | 🔒 | Get requests for a pet |
| PATCH | `/api/adoptions/:id/status` | 🔒 | Approve or reject request |
| DELETE | `/api/adoptions/:id` | 🔒 | Cancel a request |

## 🗂️ Project Structure

```
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── petController.js    # Pet CRUD logic
│   └── adoptionController.js # Adoption logic
├── middleware/
│   └── auth.js             # JWT verification middleware
├── routes/
│   ├── authRoutes.js
│   ├── petRoutes.js
│   └── adoptionRoutes.js
└── index.js                # Entry point
```

---

> Built with ❤️ by [Safin](https://www.linkedin.com/in/saharia-hassan-safin/)
