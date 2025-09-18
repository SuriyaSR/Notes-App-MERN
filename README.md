
# Notes App (MERN Stack)

A full-stack Notes App built with the MERN stack — MongoDB, Express, React (Vite), Node.js — styled with Tailwind CSS + DaisyUI. Users can create, read, update and delete notes. Deployed on Render. Includes rate limiting with Upstash Redis.


## Features

- 📄 Create, edit, delete, view notes

- ✅ Notes persistence with MongoDB

- 🌐 RESTful API built with Express

- 📱 Responsive UI made using React + Vite

- 🎨 Styled with Tailwind CSS + DaisyUI

- 🚀 Environment based configuration (dev vs production)

- ⏱ Rate limiting middleware to protect API

- 🔒 Basic CORS setup


## Tech Stack

| Layer               | Technology                                                   |
| ------------------- | ------------------------------------------------------------ |
| Frontend            | React, Vite, Tailwind, DaisyUI                               |
| Backend             | Node.js, Express, Rate Limiter (Upstash Redis)                                             |
| Database            | MongoDB                                                      |
| Deployment          | Render                                                       |
| Environment & Tools | dotenv, ESLint / Prettier, Rate Limiter middleware |



## Prerequisite

- Node.js (>= 14)

- npm or yarn

- MongoDB connection (local or hosted)
## ⚡ Getting Started

### 1. Clone the repo

```bash
  git clone <this-repository-url>
  cd <main folder of the project>
```

### 2. Install dependencies & build

```bash
  npm run build
```

### 3. Create .env file in backend folder

``` 
MONGO_URI=your-mongo-db-uri
PORT=5001

UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token

NODE_ENV=development
```

### 4. Start the project

```bash
  npm run start
```


## 🔑 Scripts
At the root level:

| Command         | Description                                               |
| --------------- | --------------------------------------------------------- |
| `npm run build` | Installs deps in both frontend & backend, builds frontend |
| `npm run start` | Starts backend + serves built frontend                    |





    
## Deployment

- Backend + Frontend are deployed together on Render.

- Express serves the frontend build (/frontend/dist) in production.

- API routes are served under /api/....


## Future Improvements

- Add authentication (JWT / OAuth)

- Add tags, categories & search for notes

- Add user-specific notes with login system

- Improve UI/UX (dark mode, rich text editor)

## Authors

👨‍💻 Suriya J

