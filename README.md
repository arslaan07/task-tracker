# 🧭 Task Tracker - MERN Stack Application

A full-featured task management app built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js), with **Redux** for state management and **Tailwind CSS** for styling.

---

## ✨ Features

- 🔐 **User Authentication**: JWT-based login/signup system
- 📁 **Project Management**: Create and manage up to 4 projects
- ✅ **Task Management**: Unlimited tasks per project with full CRUD operations
- 📊 **Task Status Tracking**: Mark tasks as *complete* or *on-going* or *completed*
- 🔍 **Search & Pagination**: Quickly find tasks using search and paginated results
- 📱 **Responsive UI**: Clean, mobile-friendly design using Tailwind CSS
- ⚠️ **Form Validation**: Real-time input validation with feedback
- ⏳ **Loading States**: Smooth UX with spinner loaders during data fetch

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas)
- npm or yarn
- Git

---

## 🚀 Installation

### 1. Clone the Repository

git clone https://github.com/arslaan07/task-tracker.git
cd task-tracker


###  2. Set Up the Backend

cd backend
npm install
Create a .env file in the backend directory:

PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_TOKEN=your_jwt_secret_key
FRONTEND_DEVELOPMENT_URL=your_frontend_url

Start the backend server:

npm run dev

### 3. Set Up the Frontend
Open a new terminal window:

cd frontend
npm install
Create a .env file in the frontend directory:

VITE_API_URL=your_backend_url

Start the frontend development server:

npm run dev



### 🧰 Tech Stack
Frontend
React.js

Redux

Tailwind CSS

Axios

Backend
Node.js

Express.js

MongoDB

Mongoose

Authentication
JSON Web Tokens (JWT)