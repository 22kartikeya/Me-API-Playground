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

**Key Features:**
- Create, update, list profiles
- Search by name, email, skills, projects
- Filter by project skill
- Top skills analytics
- Responsive frontend with modals and cards
- Tailwind-based UI
- RESTful API endpoints

---

## Known Limitations
- No pagination/sorting documented: GET /api/profiles may grow unbounded; add limit/skip/sort query params or cursor-based pagination. This is typical to add post-MVP.

- Unique constraints: Unique on project.title and work.company can cause conflicts when inserting multiple profiles referring to the same entities; either relax uniqueness or deduplicate at ingest.

- Validation/auth: Input validation, authentication, and RBAC are not covered; add JOI/Zod validation and middleware before production exposure. This is standard hardening for Express APIs.

---

## Setup

### Local Development

1. **Clone the repo**
   ```bash
   git clone https://github.com/22kartikeya/Me-API-Playground.git
   cd Me-API-Playground
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

## Sample Requests (cURL)

> Style follows widely used API doc conventions: long flags, explicit `--url`, JSON bodies, and line breaks for readability. Replace `localhost:3000` with your deployed URL and ensure `/api` base matches your server.

### Create a Profile
```bash
curl --request POST \
     --header "Content-Type: application/json" \
     --url "http://localhost:3000/api/profile" \
     --data '{
       "name": "Some name",
       "email": "random@example.com",
       "education": "ABC College",
       "skills": ["ABC","DEF","XYZ"],
       "projects": [{
         "title": "ABC Project",
         "description": "ABC Description",
         "link": "ABC link",
         "skills": ["ABC","DEF","XYZ"]
       }],
       "work": [{
         "role": "ABC role",
         "company": "ABC Company pvt"
       }],
       "links": {
         "github": "https://github.com/example",
         "linkedin": "https://www.linkedin.com/in/example",
         "portfolio": "https://portfolio.example.com"
       }
     }'
```

### List All Profiles
```bash
curl --request GET \
     --url "http://localhost:3000/api/profile"
```

### Update Profile
```bash
curl --request PUT \
     --header "Content-Type: application/json" \
     --url "http://localhost:3000/api/profile/<OBJECT_ID>" \
     --data '{ "name": "Kartikeya G." }'
```

### Health Check
```bash
curl --request GET \
     --url "http://localhost:3000/health"
```

### Project from Queries
```bash
curl --request GET \
     --url "http://localhost:3000/api/projects?skill=Next"
```

### Top Skills
```bash
curl --request GET \
     --url "http://localhost:3000/api/skills/top"
```

### Custom Search
```bash
curl --request GET \
     --url "http://localhost:3000/api/search?q=Project"
```

---

## Postman Collection

You can use the Postman collection to quickly test all API endpoints.

### Steps to Import:

1. Download the collection file: [postman_collection.json](./server/Me-API.postman_collection.json)
2. Open Postman.
3. Click **Import** → **File** → Select the downloaded `postman_collection.json`.
4. All API endpoints will be imported and ready to use.

> Make sure your backend is running at `http://localhost:3000` or update the collection environment URL accordingly.

---

## Seed Data
When testing inserts, prefer JSON arrays of profiles that satisfy uniqueness on email, project titles, and company fields. Insert via a POST loop in Postman or a single POST per document to avoid unique constraint collisions. Tutorials commonly seed data this way before UI integration.

---

## Deployment

### Frontend Deployment (Netlify)

**Build Frontend:**

```bash
cd client
npm run build
```

- **Frontend:** [Me-API Playground](https://whimsical-maamoul-6ffab9.netlify.app/)

### Backend Deployment (render)

```bash
cd server
npm run dev
```

---

## Resume

**View My Resume:** [Click here](https://drive.google.com/file/d/16KDEiGBQL82eoRTk3tcL08i68EpWCOE3/view?usp=sharing)
