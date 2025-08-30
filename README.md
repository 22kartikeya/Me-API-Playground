# Me-API Playground

A full-stack application (MongoDB, Express, React, TypeScript, TailwindCSS) for managing developer profiles, skills, and projects.  
Supports profile CRUD, project/skills search, top-skills analytics, and edit/add overlays in the frontend.

---

## Architecture
Frontend (React + TypeScript + TailwindCSS)
|
|–> API Requests (REST, JSON)
v
Backend (Express + Node.js + TypeScript)
|
v
|–> MongoDB (Mongoose ODM)

- **Frontend**:  
  - React + Vite + TypeScript + TailwindCSS  
  - Fetches data from backend and renders smooth, light-mode UI  
  - Features: search, filter (skills/projects), overlay edit/add forms  

- **Backend**:  
  - Express.js + TypeScript + Mongoose  
  - REST API endpoints (`/profile`, `/projects`, `/skills/top`, `/search`)  
  - Includes basic error handling, unique email enforcement  

- **Database (MongoDB)**:  
  - Stores developer profiles, projects, skills, and links  

---

## ⚙️ Setup

### Local Development

1. **Clone the repo**
   ```bash
   git clone https://github.com/22kartikeya/Me-API-Playground.git
   ```
2. **Install dependencies**
    ```bash
    # Backend
    cd server
    npm install

    # Frontend
    cd ../client
    npm install
    ```
3. **Set environment variables**
    ```bash
    PORT=3000
    MONGO_URI=
    ```
4. **Run backend**
    ```bash
    cd server
    npm run dev
    ```
5. **Run frontend**
    ```bash
    cd client
    npm run dev
    ```
6. **Visit frontend** 
    http://localhost:5173

---

## Schema

**Profile**
    ```bash
    {
        name: string;
        email: string;  // unique
        education?: string;
        skills: string[];
        projects: {
            title: string;
            description: string;
            skills: string[];
        }[];
        work?: string;
        links?: string[];
        createdAt: Date;
    }
    ```

---

## Resume

Resume: https://drive.google.com/file/d/16KDEiGBQL82eoRTk3tcL08i68EpWCOE3/view?usp=sharing
