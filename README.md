# Project Management Tool

A modern, full-stack project and task management web application built with **React**, **Node.js**, **Express**, **TypeScript**, and **MongoDB**. Designed for agile project planning, task tracking, team role management, and activity logging.

---

## ✨ Features

- **Authentication & Authorization**: Secure JWT authentication (Access & Refresh tokens) with Role-Based Access Control (`super-admin`, `admin`, `user`).
- **Project Management**: Create, update, organize, and monitor projects and their statuses.
- **Task Tracking & Comments**: Assign tasks, manage workflows, and collaborate with comments.
- **Admin Dashboard**: Manage users, view system-wide metrics, and inspect audit logs.
- **AI Integrations**: Integrated support for AI assistant providers (Gemini, OpenAI, Ollama).
- **Modern UI/UX**: Responsive design powered by Tailwind CSS with light and dark mode support.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, TanStack Query, React Hook Form, Zod |
| **Backend** | Node.js, Express 5, TypeScript, Mongoose, JWT, Helmet, Winston |
| **Database** | MongoDB |
| **Dev Tools** | Concurrently, Nodemon, Docker Compose |

---

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or via MongoDB Atlas)
- `npm` or `yarn`

### 2. Installation

Clone the repository and install dependencies for the root, client, and server:

```bash
# Clone repository
git clone https://github.com/far120/CodeAlpha_-Project-Management-Tool.git
cd "CodeAlpha_ Project Management Tool"

# Install root dependencies
npm install

# Install client & server dependencies
npm --prefix client install
npm --prefix server install
```

### 3. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Configure your `.env` variables (MongoDB URI, JWT secrets, ports, and optional AI API keys).

### 4. Running the Application

Run both frontend and backend concurrently with a single command:

```bash
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api/v1`

#### Optional Seed Data
To populate the database with initial mock data:
```bash
npm --prefix server run seed
```

---

## 📁 Project Structure

```text
├── client/          # Vite + React frontend application
├── server/          # Express + TypeScript backend API
├── shared/          # Shared types and validation schemas
├── docs/            # API documentation & Postman collections
├── package.json     # Root scripts for running full-stack app
└── .env.example     # Environment template
```

---

## 👤 Author

- **Mostafa Elfar**
- GitHub: [@far120](https://github.com/far120)
- LinkedIn: [Mostafa Elfar](https://www.linkedin.com/in/mostafa-mahmoud-elfar-6a67732b5)
