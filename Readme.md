# Chat + Incidents (AI-Integrated Project)

A full-stack real-time chat and incident management application built with React, Express, Socket.IO, MongoDB, and Cloudinary. Features JWT authentication with secure cookies, real-time messaging, user status tracking, and AI-powered incident handling via Google Generative AI.

## Features

- **Real-time Chat** — Socket.IO-powered messaging with room-based chat architecture
- **User Authentication** — JWT tokens stored in secure HTTP-only cookies
- **User Status Tracking** — Online/offline status updates
- **Incident Management** — Create, manage, and track incidents with AI assistance
- **File Uploads** — Cloudinary integration for media handling
- **Admin Dashboard** — Administrative view for system oversight
- **Responsive UI** — Built with React + Tailwind CSS + Vite

## Tech Stack

**Frontend**
- React 19
- Vite (build tool)
- Tailwind CSS 4
- Axios (HTTP client)
- Socket.IO Client (real-time)
- React Router 7

**Backend**
- Express 5
- Node.js (ES modules)
- MongoDB + Mongoose
- Socket.IO (real-time)
- JWT (authentication)
- Cloudinary (file uploads)
- Google Generative AI (Gemini)

## Project Structure

```
.
├── client/                    # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── LogoutButton.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── AdminHomePage.jsx
│   │   │   ├── ChatRoom.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   ├── context/           # React context
│   │   │   ├── Layout.jsx
│   │   │   └── UserContext.jsx
│   │   ├── config/
│   │   │   └── API.js         # Axios instance with API baseURL
│   │   ├── assets/
│   │   ├── WSocket.js         # Socket.IO client config
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── index.html
│
└── server/                    # Backend (Express + Socket.IO)
    ├── config/
    │   ├── mongoDb.js         # MongoDB connection
    │   └── cloudinary.js      # Cloudinary upload config
    ├── controllers/           # Business logic
    │   ├── user.controller.js
    │   ├── messages.controller.js
    │   ├── chatRoom.controller.js
    │   └── incident.controller.js
    ├── models/                # Mongoose schemas
    │   ├── user.model.js
    │   ├── message.model.js
    │   ├── chatRoom.model.js
    │   └── incident.model.js
    ├── routes/                # API routes
    │   ├── user.route.js
    │   ├── messages.route.js
    │   ├── chatRoom.route.js
    │   └── incident.route.js
    ├── middlewares/           # Express middleware
    │   ├── userAuth.middleware.js
    │   └── multer.middleware.js
    ├── socket/                # Socket.IO event handlers
    │   ├── index.js           # Socket initialization
    │   ├── chat.socket.js     # Chat events
    │   └── userStatus.socket.js
    ├── utils/
    │   ├── AsyncHandler.js
    │   ├── ApiError.js
    │   ├── ApiResponse.js
    │   └── GeminiService.js
    ├── public/uploads/        # Local upload directory
    ├── index.js               # Entry point
    ├── package.json
    └── .env                   # Environment variables
```

## Prerequisites

- **Node.js** ≥18.x
- **npm** or **pnpm**
- **MongoDB Atlas** (or local MongoDB for development)
- **Cloudinary Account** (for image/file uploads)
- **Google Cloud API Key** (for Generative AI)

## Installation

### 1. Clone or download the project

```bash
cd "d:\dev\New folder\Ai-integrated Project"
```

### 2. Install dependencies

```bash
# Server
cd server
npm install

# Client (in a new terminal)
cd ../client
npm install
```

## Environment Variables

### Server (`.env` in `server/` directory)

Create a `server/.env` file:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key

# Frontend URL (for CORS and Socket.IO)
CLIENT_URL=http://localhost:5173

# Server
PORT=3000
NODE_ENV=development
```

### Client (`.env.local` in `client/` directory for Vite)

Create a `client/.env.local` file:

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_WS_URL=http://localhost:3000
```

**For production**, set these in your hosting platform's environment variables (Vercel, Netlify, Render, etc.).

## Local Development

### 1. Start MongoDB (if using local instance)

```bash
mongod
```

### 2. Start the Server

```bash
cd server
npm run dev
```

Server runs on `http://localhost:3000`

### 3. Start the Client (in another terminal)

```bash
cd client
npm run dev
```

Client runs on `http://localhost:5173`

### 4. Access the App

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

### Build the Client

```bash
cd client
npm run build
```

Output: `client/dist/` — ready to deploy to Vercel, Netlify, or serve statically.

### Start the Server for Production

```bash
cd server
npm run start
```

Ensure `"start": "node index.js"` exists in `server/package.json`.

## API Endpoints

### Users
- `POST /api/v1/users` — Create user (register)
- `POST /api/v1/users/login` — Login user
- `POST /api/v1/users/logout` — Logout user
- `GET /api/v1/users` — Get all users

### Chat Rooms
- `POST /api/v1/chatRoom` — Create chat room
- `GET /api/v1/chatRoom` — Get all chat rooms
- `GET /api/v1/chatRoom/:id` — Get chat room by ID

### Messages
- `POST /api/v1/messages` — Send message
- `GET /api/v1/messages/:chatRoomId` — Get messages in a chat room

### Incidents
- `POST /api/v1/incidents` — Create incident
- `GET /api/v1/incidents` — Get all incidents
- `PUT /api/v1/incidents/:id` — Update incident

## Socket.IO Events

### Client → Server
- `joinRoom` — Join a chat room
  ```javascript
  socket.emit('joinRoom', chatRoomId);
  ```

### Server → Client
- `userStatusChanged` — User came online or went offline
  ```javascript
  socket.on('userStatusChanged', { userId, online: true/false });
  ```

## Authentication

The app uses **JWT (JSON Web Tokens)** stored in **HTTP-only cookies**.

- Tokens are generated on login/signup and stored in a secure cookie named `AccessToken`.
- Protected routes check for the token via middleware (`userAuth.middleware.js`).
- Axios is configured with `withCredentials: true` to send cookies with every request.
- Socket.IO connections include the token in headers/query for authentication.

## Deployment

### Option 1: Separate Deployment (Recommended)

**Frontend: Vercel or Netlify**
1. Connect your GitHub repository to Vercel/Netlify.
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/dist`
4. Set environment variables:
   - `VITE_API_URL` → your production server URL
   - `VITE_WS_URL` → your production server URL

**Backend: Render or Heroku**
1. Connect your GitHub repository to Render.
2. Set build command: `cd server && npm install`
3. Set start command: `cd server && npm run start`
4. Set environment variables:
   - `MONGODB_URI` → production MongoDB connection
   - `JWT_SECRET` → production JWT secret
   - `CLOUDINARY_*` → Cloudinary keys
   - `CLIENT_URL` → your production frontend URL
   - `NODE_ENV` → `production`
   - `PORT` → 3000 (or as per platform default)

### Option 2: Single Server (Both on Render/AWS/etc.)

1. Build client: `npm run build` in `client/`
2. Serve static files from server (`express.static('dist')` or similar)
3. Configure server to serve frontend on routes not matching `/api/v1` or `/socket.io`

## CORS & Cookies

- **CORS**: Server allows requests from `CLIENT_URL` (set in `.env`).
- **Cookies**: Set to `secure: true` and `sameSite: 'none'` in production (HTTPS required).
- **Credentials**: Both Axios and Socket.IO use `withCredentials: true` to include cookies.

Ensure your frontend and backend are on the same domain or properly configured for cross-origin cookie sharing.

## Scripts

### Client Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Server Scripts

```bash
npm run dev      # Start with Nodemon (auto-reload)
npm run start    # Start production server
```

## Troubleshooting

### WebSocket Connection Fails
- Ensure `VITE_WS_URL` and `VITE_API_URL` point to the correct server.
- Check that Socket.IO CORS settings match your frontend domain.
- Verify cookies are being sent (`withCredentials: true`).

### MongoDB Connection Error
- Verify `MONGODB_URI` is correct and the cluster is accessible.
- Check IP whitelist on MongoDB Atlas (allow all IPs for dev: `0.0.0.0/0`).

### Cloudinary Upload Fails
- Verify `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_SECRET_KEY`.

### CORS Errors
- Ensure `CLIENT_URL` on the server matches your frontend origin.
- Check browser console for detailed CORS errors.

### Authentication Issues
- Verify JWT_SECRET is the same on server.
- Check that cookies are being sent with requests (`withCredentials: true`).
- Ensure `httpOnly` and `secure` flags are appropriate for your environment.

## Contributing

1. Create a feature branch.
2. Make your changes.
3. Test locally.
4. Commit and push.
5. Open a pull request.

## License

ISC

---

## Quick Reference

| Item | Local | Production |
|------|-------|-----------|
| Client Port | 5173 | Vercel/Netlify |
| Server Port | 3000 | Render/Heroku |
| API Base URL | `http://localhost:3000/api/v1` | `https://your-api.example.com/api/v1` |
| WS Base URL | `http://localhost:3000` | `https://your-api.example.com` |
| DB | Local or Atlas | MongoDB Atlas |
| Storage | Local `/uploads` | Cloudinary |

---

## Deployment Checklist

Before deploying to production:

- [ ] Update `CLIENT_URL` in server `.env`
- [ ] Set `NODE_ENV=production` on server
- [ ] Enable HTTPS on both frontend and backend
- [ ] Update cookie settings to `secure: true` and `sameSite: 'none'`
- [ ] Set `VITE_API_URL` and `VITE_WS_URL` on frontend
- [ ] Verify MongoDB Atlas connection string
- [ ] Verify Cloudinary keys are correct
- [ ] Test WebSocket connection in production
- [ ] Test file uploads with Cloudinary
- [ ] Run security checks (headers, CORS, etc.)
- [ ] Set up monitoring and logging

---

For questions or issues, refer to the individual file comments in `server/` and `client/src/`.
