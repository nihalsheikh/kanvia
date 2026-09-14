# Kanvia

Kanvia is a full-stack, real-time collaborative Kanban project management application powered by AI. It features multi-board organization, drag-and-drop task workflows, real-time cursor and board updates with Socket.IO, and AI-assisted task breakdown and generation using Google's Gemini models.

---

## Live Links

- **Frontend:** [https://kanvia.vercel.app](https://kanvia.vercel.app)
- **Backend API:** [https://kanvia-backend-a7ie.onrender.com](https://kanvia-backend-a7ie.onrender.com)

---

## Features

- **Real-Time Collaboration:** Instant multi-user presence, active viewer sync, and live cursor tracking powered by Socket.IO rooms.
- **Kanban Board Workflows:** Dynamic columns, reorderable tasks, status transitions, and member assignments.
- **AI Task Generation:** Integrated with Gemini (`gemini-3.6-flash`) for automated backlog breakdown, task expansion, and board summarization.
- **Role-Based Access Control:** Secure project spaces with Owner, Admin, and Member permissions.
- **Activity Feed:** Live event audit log capturing board changes, member additions, and task movements.
- **Secure Authentication:** JWT-based stateless authentication with password hashing using bcrypt.

---

## Tech Stack

### Frontend

- **Framework:** React + Vite
- **Networking:** Axios (configured with interceptors)
- **Real-Time Client:** Socket.IO Client
- **Deployment:** Vercel

### Backend

- **Runtime:** Node.js (ES Modules)
- **Web Framework:** Express
- **Database:** PostgreSQL (using `pg` pool with transaction wrappers)
- **Real-Time Server:** Socket.IO mounted on Node HTTP Server
- **AI Integration:** Google Gemini API
- **Deployment:** Render

---

## Project Structure

```text
kanvia/
├── backend/
│   ├── config/          # Database and environment configurations
│   ├── controllers/     # Route handlers (auth, board, task, AI, user)
│   ├── db/              # SQL schema, migration, and seed scripts
│   ├── middleware/      # Auth, board access, and error handlers
│   ├── realtime/        # Global Socket.IO instance and room helpers
│   ├── routes/          # Express route definitions
│   ├── services/        # AI orchestration services
│   ├── socket/          # WebSocket connection and event handlers
│   ├── utils/           # JWT helpers and error utilities
│   └── index.js         # Backend server entry point
├── frontend/
│   ├── public/          # Static public assets
│   ├── src/
│   │   ├── assets/      # Media, SVGs, and images
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React Context providers (Auth, Board, Socket)
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Axios API clients and Socket singletons
│   │   ├── pages/       # Route-level view components
│   │   ├── routes/      # Application route configurations and guards
│   │   ├── App.jsx      # Root application component
│   │   ├── index.css    # Global stylesheet and Tailwind directives
│   │   └── main.jsx     # Frontend entry point
│   ├── index.html       # Single Page Application HTML shell
│   ├── vite.config.js   # Vite build configuration
│   └── vercel.json      # SPA routing rewrite rules
└── README.md
```

## Environment Variables

Backend (backend/.env)

```bash
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/kanvia
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
```

Frontend (frontend/.env)

```bash
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## Getting Started

1. Prerequisites
   Node.js (v20+ recommended)

PostgreSQL running locally or hosted (e.g., Supabase, Neon, Render)

A Google Gemini API Key

2. Database Initialization
   From the backend/ directory:

```bash
# Run the schema migration
npm run db:init

# Seed the database with demo users, boards, and tasks
npm run db:seed
```

3. Running Backend Locally

```bash
cd backend
npm install
npm run dev
```

Backend will start on http://localhost:5000.

4. Running Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

Frontend will be accessible at http://localhost:5173.

## License

This project is created and maintained as an open portfolio showcase to demonstrate modern full-stack web engineering, real-time systems, and AI integration capabilities. Free to explore and reference for educational purposes.

## Author

Made by Nihal Sheikh.
