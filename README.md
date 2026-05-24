![header](https://capsule-render.vercel.app/api?type=waving&color=ea580c&height=220&section=header&text=PawsHome%20Server%20🐾&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=REST%20API%20|%20Node.js%20+%20Express%20+%20MongoDB&descAlignY=58&descSize=20&animation=fadeIn)

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)
[![JWT](https://img.shields.io/badge/JWT-HTTPOnly%20Cookie-000000?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io)
[![Render](https://img.shields.io/badge/Deployed-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)

</div>

---

## 📌 Project Purpose

Backend REST API for **PawsHome** — a full-stack Pet Adoption Platform. Built with Node.js + Express + MongoDB Atlas. Handles user authentication via JWT (HTTPOnly cookies), full pet CRUD, and adoption request management with ownership controls.

---

## 🌐 Live API URL

> ### 🔗 [[https://pawshome-api.onrender.com](https://assignment-category-cat-10-pet-adop.vercel.app/)]([https://pawshome-api.onrender.com](https://assignment-category-cat-10-pet-adop.vercel.app/))

**Client Site:** [[https://pawshome.vercel.app](https://pawshome.vercel.app](https://assignment-category-cat-10-pet-adop.vercel.app/))

---

## ✨ Features

- 🔐 **JWT Authentication** — Token generation & verification via HTTPOnly cookies
- 🐕 **Pet CRUD** — Full create, read, update, delete for pet listings
- 📋 **Adoption System** — Request submission, approval/rejection with auto-lock
- 🔍 **MongoDB Operators** — `$regex` for name search, `$in` for species filter
- 🛡️ **Ownership Guards** — Only pet owners can edit/delete listings and manage requests
- 🌐 **CORS Configured** — Credentials-enabled cross-origin setup for Vercel client
- ♻️ **Auto Cascade** — Approving one request rejects all others and marks pet as adopted
- 🚫 **Adoption Control** — Pet owners cannot adopt their own listings

---

## 📦 NPM Packages Used

| Package | Purpose |
|---|---|
| `express` | Web framework |
| `mongodb` | MongoDB native driver |
| `jsonwebtoken` | JWT token generation & verification |
| `cookie-parser` | Parse HTTPOnly cookies |
| `cors` | Cross-origin resource sharing |
| `dotenv` | Environment variable management |
| `nodemon` | Auto-restart during development |

---

## 🗂️ API Endpoints

### 🔑 Auth Routes
| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/token` | Generate JWT token & set cookie |
| POST | `/api/auth/logout` | Clear token cookie |

### 🐕 Pet Routes
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/pets` | Public | Get all pets (search, filter, sort) |
| GET | `/api/pets/featured` | Public | Get 6 latest available pets |
| GET | `/api/pets/:id` | Public | Get single pet details |
| GET | `/api/pets/user/my-listings` | 🔒 | Get owner's listings with stats |
| POST | `/api/pets` | 🔒 | Add new pet listing |
| PUT | `/api/pets/:id` | 🔒 | Update pet (owner only) |
| DELETE | `/api/pets/:id` | 🔒 | Delete pet (owner only) |

### 📋 Adoption Routes
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/adoptions` | 🔒 | Submit adoption request |
| GET | `/api/adoptions/my-requests` | 🔒 | Get user's own requests |
| GET | `/api/adoptions/pet/:petId` | 🔒 | Get requests for owner's pet |
| PATCH | `/api/adoptions/:id/status` | 🔒 | Approve or reject request |
| DELETE | `/api/adoptions/:id` | 🔒 | Cancel a request |

---

## 🗂️ Project Structure

```
pet-adoption-server/
├── config/
│   └── db.js                   # MongoDB Atlas connection
├── controllers/
│   ├── petController.js        # Pet CRUD logic
│   └── adoptionController.js   # Adoption request logic
├── middleware/
│   └── auth.js                 # JWT verification middleware
├── routes/
│   ├── authRoutes.js           # Auth token routes
│   ├── petRoutes.js            # Pet CRUD routes
│   └── adoptionRoutes.js       # Adoption routes
├── .env.example                # Environment variable template
├── .gitignore                  # Ignores node_modules & .env
└── index.js                    # Entry point & middleware setup
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| Auth | JWT + HTTPOnly Cookies |
| Deployment | Render |

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/Safin313-stack/Assignment-Category-CAT_10-Pet-Adoption-Server.git

# Go into the folder
cd Assignment-Category-CAT_10-Pet-Adoption-Server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your values

# Start development server
npm run dev
```

---

## 🔐 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pet-adoption
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

<div align="center">

## 👨‍💻 Developer

**Saharia Hassan Safin**
CSE Student | Daffodil International University
Associate Member — DIU Competitive Programming Club

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/saharia-hassan-safin/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/Safin313-stack)

---

*Built with ❤️ | Inspired by TCW — AI & Coding Resources*

</div>

![footer](https://capsule-render.vercel.app/api?type=waving&color=ea580c&height=120&section=footer&animation=fadeIn)
