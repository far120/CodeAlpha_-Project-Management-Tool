# 🚀 ELFAR Full-Stack Starter

<div align="center">

![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite 6](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express 5](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript 7](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB 8](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_GenAI-4285F4?style=for-the-badge&logo=googlegemini&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**An Enterprise-Grade, Reusable Monorepo Full-Stack Starter Template**  
*Powered by React 19, Vite, Express 5, MongoDB, Tailwind CSS v4, TanStack Query v5, Zod, and Google Gemini AI.*

</div>

---

## 📖 Overview

**ELFAR Full-Stack Starter** is a feature-rich, scalable, and modern starter blueprint engineered for rapid production deployment. It combines modern frontend architecture with a modular Express backend, strict TypeScript interfaces, dark-mode visual design system, complete Role-Based Access Control (RBAC), real-time audit logging, automated seeders, and native Google Gemini AI integration.

Whether you are launching a SaaS MVP, an internal enterprise dashboard, or a scalable full-stack web application, this template provides production-ready infrastructure out of the box.

---

## 🌟 Key Features

### 💻 Frontend (Client)
- **⚡ React 19 & Vite 6**: Next-generation React state management, fast module replacement (HMR), and optimized bundle outputs.
- **🎨 Tailwind CSS v4 Design System**: Vibrant dark-mode UI with glassmorphism effects, dynamic status badges, ambient backdrops, and interactive animations.
- **🔒 Protected Routes & RBAC**: Centralized `ProtectedRoute` component enforcing authentication and granular privileges (`super-admin`, `admin`, `business-manager`, `user`).
- **👥 User Management Directory (`/dashboard/users`)**: Full CRUD table, inline role management, account block/unblock controls, user creation modal, dynamic pagination, and search filters.
- **📊 Real-Time Audit Activity Logs (`/dashboard/logs`)**: Live audit tracking dashboard rendering HTTP methods (`GET`, `POST`, `PUT`, `DELETE`), status badges, response latencies, IP addresses, auto-refetching, and log clearing.
- **🤖 AI-Powered Profile Summary (`/profile`)**: Dynamic user profile displaying metadata, avatar fallback, security actions, and automated Gemini AI user behavior analysis.
- **🔑 Change Password Service (`/change-password`)**: Validated form with show/hide password toggles and client-side Zod validation.
- **📈 Infrastructure Metrics Dashboard (`/dashboard`)**: Analytics dashboard with high-level system indicators, account verification statistics, and quick service links.

### 🛡️ Backend (Server)
- **🟢 Express 5 & Node.js**: Modular domain-driven architecture (`modules/`, `core/`, `app/`, `routes/`, `integrations/`).
- **🍃 MongoDB & Mongoose 9**: Schema modeling with custom compound indexes, schema validation, and relational population for Users and Audit Logs.
- **🔐 Enterprise Security & Auth**: JWT authentication with refresh token strategy, bcrypt password hashing, `helmet` security headers, `cors` domain whitelisting, and `express-rate-limit`.
- **🪵 Winston & Database Logging**: Centralized dual logging pipeline recording application logs to local files (`logs/app.log`, `logs/error.log`) and MongoDB `AuditLog` records via middleware.
- **🧠 Google Gemini AI Integration**: Seamless `@google/genai` integration for intelligent user analysis, automated summaries, and system diagnostics.
- **📐 Strict Request Validation**: Zod schema validation middleware sanitizing headers, query params, and request bodies.

### 🐳 DevOps & Deployment
- **Docker & Docker Compose**: Full containerization setup for Frontend (Nginx Alpine), Backend (Node 20 Alpine), and MongoDB 8 with persistent data volumes.
- **Monorepo DX**: Unified root scripts to spin up concurrent local dev environments or single-command Docker stacks.

---

## 📁 Project Architecture

```
ELFAR Full-Stack Starter/
├── client/                     # Frontend Application (React 19 + Vite 6)
│   ├── src/
│   │   ├── app/                # Application setup, router config & RBAC ProtectedRoute
│   │   ├── components/         # Shared UI components (Header, Navbar, Footer, Modals)
│   │   ├── features/           # Feature-based modular structure
│   │   │   ├── auth/           # Login & Register views, hooks & API calls
│   │   │   ├── user/           # User Management, Profile, ChangePassword & Dashboard
│   │   │   └── logs/           # Activity logs table, filters & audit services
│   │   ├── lib/                # Axios instance with auth interceptors & QueryClient
│   │   ├── pages/              # Landing page & public layout routes
│   │   └── styles/             # Tailwind CSS v4 design system tokens
│   ├── Dockerfile              # Multi-stage production build (Node Builder -> Nginx Alpine)
│   └── package.json
│
├── server/                     # Backend API Application (Express 5 + TypeScript)
│   ├── src/
│   │   ├── app/                # Express bootstrap & app initialization
│   │   ├── core/               # Infrastructure (Database connection, Winston, Security middleware)
│   │   ├── integrations/       # External services & AI providers (Google Gemini GenAI SDK)
│   │   ├── modules/            # Domain Modules (Users & Audit Logs)
│   │   │   ├── users/          # User routes, controllers, services, model & schemas
│   │   │   └── auditLog/       # Audit log routes, controllers, services & model
│   │   ├── seeders/            # Database seeders (faker user generation & AI summaries)
│   │   └── routes/             # Central API router (/api/v1)
│   ├── Dockerfile              # Node 20 Alpine container setup
│   └── package.json
│
├── shared/                     # Shared TypeScript types, constants & helpers
├── docker-compose.yml          # Multi-container orchestration (Frontend, Backend, Mongo)
├── .env.example                # Template environment variables
├── package.json                # Monorepo root concurrent scripts
└── README.md                   # Project documentation
```

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19, Vite 6, TypeScript | High-performance UI rendering and rapid developer HMR |
| **Styling & UI** | Tailwind CSS v4, Lucide Icons | Utility-first styling with vibrant glassmorphism theme |
| **State & Data Fetching**| TanStack React Query v5, Axios | Server-state caching, invalidation, and asynchronous handling |
| **Forms & Validation** | React Hook Form, Zod | Type-safe form validation and error handling |
| **Routing** | React Router v7 | Dynamic client-side routing with RBAC middleware |
| **Backend Runtime** | Node.js, Express 5, TypeScript | Scalable REST API architecture with asynchronous error boundaries |
| **Database & ORM** | MongoDB 8, Mongoose 9 | Document database with schema enforcement and custom indexes |
| **Security & Auth** | JWT, bcrypt, Helmet, Express-Rate-Limit | Robust token auth, request throttling, and security headers |
| **Logging & AI** | Winston, `@google/genai` (Gemini SDK) | Winston file/console logging & generative AI analysis |
| **Containerization** | Docker, Docker Compose, Nginx | Multi-stage container builds and service orchestration |

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js**: `v20.0.0` or higher
- **npm**: `v10.0.0` or higher
- **MongoDB**: Local instance running at `mongodb://localhost:27017` or MongoDB Atlas URI (or Docker)
- **Docker & Docker Desktop** *(Optional, for containerized run)*

---

### Option 1: Local Development (Monorepo setup)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/elfar-fullstack-starter.git
   cd elfar-fullstack-starter
   ```

2. **Install all dependencies** (Root, Client, and Server):
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   npm --prefix client install

   # Install server dependencies
   npm --prefix server install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` in the root directory (or create `.env` in `server/`):
   ```bash
   cp .env.example .env
   ```

4. **Run Development Servers Concurrently**:
   ```bash
   npm run dev
   ```
   - **Frontend App**: [`http://localhost:5173`](http://localhost:5173)
   - **Backend API**: [`http://localhost:5000/api/v1`](http://localhost:5000/api/v1)

---

### Option 2: Docker Compose Setup

Run the full stack (Frontend on Nginx, Express API, and MongoDB 8) inside Docker containers with a single command:

```bash
# Build and start all services in detached mode
npm run docker:up

# View container logs
docker compose logs -f

# Stop and remove containers
npm run docker:down
```

- **Frontend Container**: [`http://localhost:5173`](http://localhost:5173) (or [`http://localhost`](http://localhost))
- **Backend API Container**: [`http://localhost:5000/api/v1`](http://localhost:5000/api/v1)
- **MongoDB Container**: `localhost:27017`

---

## ⚙️ Environment Variables Reference

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Port number for Express API server |
| `NODE_ENV` | `development` | Environment mode (`development` / `production`) |
| `API_PREFIX` | `/api/v1` | Base route prefix for API endpoints |
| `MONGODB_URI` | `mongodb://localhost:27017/elfar_starter` | MongoDB connection connection string |
| `JWT_SECRET` | `your_jwt_secret_key_here` | Secret key for signing authentication JWTs |
| `JWT_EXPIRES_IN` | `7d` | Expiration time for access tokens |
| `JWT_REFRESH_SECRET` | `your_jwt_refresh_secret` | Secret key for refresh tokens |
| `JWT_REFRESH_EXPIRES_IN` | `30d` | Expiration time for refresh tokens |
| `GEMINI_API_KEY` | `your_gemini_api_key` | Google Gemini AI key for automated user analysis |
| `OPENAI_API_KEY` | `your_openai_api_key` | Optional OpenAI key |
| `CLAUDE_API_KEY` | `your_claude_api_key` | Optional Anthropic Claude key |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed origin URL for CORS middleware |
| `VITE_API_BASE_URL` | `http://localhost:5000/api/v1` | API base URL accessed by React client |

---

## 🧪 Database Seeding

To populate MongoDB with initial test accounts, roles, and automated AI summary profiles:

```bash
cd server
npm run seed
```

### Default Seeded Users Overview
The seeder creates 20 dummy users with randomized roles (`super-admin`, `admin`, `business-manager`, `user`).
- **Sample Email**: `user1@example.com` (up to `user20@example.com`)
- **Default Password**: `Password123`

---

## 📡 API Endpoints Summary

All routes are prefixed with `/api/v1`.

### 🔑 Authentication & User Management (`/users`)

| Method | Endpoint | Access Control | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/users/register` | Public | Register a new user account |
| `POST` | `/users/login` | Public | Authenticate user & receive JWT token |
| `GET` | `/users/me` | Authenticated | Retrieve current user profile details |
| `PUT` | `/users/update/me` | Authenticated | Update current user profile info |
| `POST` | `/users/change-password` | Authenticated | Change account password |
| `GET` | `/users/all-users` | `super-admin`, `admin` | Fetch paginated users with search & role filters |
| `POST` | `/users/create-user` | `super-admin` | Admin user provision endpoint |
| `PUT` | `/users/role/:id` | `super-admin` | Modify user role assignment |
| `PUT` | `/users/block/:id` | `super-admin` | Toggle block/unblock account status |
| `DELETE` | `/users/delete/:id` | `super-admin` | Delete user account |
| `GET` | `/users/ai-analysis` | Authenticated | Generate AI analysis summary for user |

### 📜 Audit Activity Logs (`/logs`)

| Method | Endpoint | Access Control | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/logs/activity` | `super-admin`, `admin` | Fetch paginated API activity logs with search & status filters |
| `DELETE` | `/logs/clear` | `super-admin` | Flush recorded audit activity log entries |

---

## 📜 Monorepo Scripts Reference

Execute scripts from the root directory:

```bash
npm run dev           # Concurrently start Client (Vite) and Server (Nodemon + TSX)
npm run dev:client    # Start React client development server only
npm run dev:server    # Start Express server development server only
npm run build:client  # Compile TypeScript & build React production distribution
npm run build:server  # Compile TypeScript for Express backend
npm run docker:up     # Launch Docker Compose containers in background
npm run docker:down   # Stop and clean up Docker Compose containers
npm run docker:build  # Rebuild Docker images for client and server
```

---

## 👨‍💻 Author & Credits

Designed and Developed with ❤️ by **Mostafa Elfar**.

- **GitHub**: [@mostafaelfar11](https://github.com/mostafaelfar11)
- **License**: ISC License

---

<div align="center">

*⭐ Star this repository if you find it helpful for your full-stack projects!*

</div>
