<img width="1470" height="956" alt="Screenshot 2026-04-27 at 12 17 15 PM" src="https://github.com/user-attachments/assets/7d4e4ed8-582f-4490-b4b9-cc18a586291c" />
<img width="1470" height="956" alt="Screenshot 2026-04-27 at 12 17 29 PM" src="https://github.com/user-attachments/assets/ab33a1ab-5c5f-4f9d-a9f2-fed205911eaf" />
<img width="1470" height="956" alt="Screenshot 2026-04-27 at 12 17 35 PM" src="https://github.com/user-attachments/assets/2fbd6577-04a5-4dbc-ae31-08a251d5cecd" />
<img width="1470" height="956" alt="Screenshot 2026-04-27 at 12 17 58 PM" src="https://github.com/user-attachments/assets/ac718808-0f81-4345-988a-137ea86534ef" />
<img width="1470" height="956" alt="Screenshot 2026-04-27 at 12 18 11 PM" src="https://github.com/user-attachments/assets/90e58a8a-8fb9-4142-b505-906c16371279" />
# Student Result Management System (SRMS)

A full-stack web application designed to manage student results efficiently.

## Tech Stack
- **Frontend:** React (Vite) with minimal custom CSS
- **Backend:** Node.js, Express
- **Database:** MySQL

## Features
- Student Management (CRUD)
- Subject Management (CRUD)
- Marks Entry
- Result Generation (total, percentage, grade)
- Search Result by roll number
- Rank System (Class-wise rankings)
- Subject-wise Analysis

## Folder Structure
```
srms-2/
├── backend/
│   ├── config/       # Database configuration
│   ├── controllers/  # Request handlers
│   ├── models/       # Database queries and schema definitions
│   ├── routes/       # API routes
│   ├── .env          # Environment variables
│   ├── database.sql  # SQL schema queries
│   ├── setupDb.js    # Automatic database initializer script
│   └── server.js     # Entry point for backend
└── frontend/
    ├── src/
    │   ├── api/      # Axios API configuration
    │   ├── pages/    # React pages (Dashboard, StudentManager, etc.)
    │   ├── App.jsx   # Main routing component
    │   └── index.css # Custom utility classes and minimal styling
    └── package.json
```

## Setup Instructions

### 1. Database Configuration
1. Ensure MySQL is installed and running.
2. Open the `backend/.env` file.
3. Update the `DB_PASSWORD` value with your MySQL root password (leave blank if your local root user has no password).
4. Run the automated database setup script to create the database and tables:
   ```bash
   cd backend
   node setupDb.js
   ```

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Start the Express server:
   ```bash
   node server.js
   ```
   *(Server runs on http://localhost:5001)*

### 3. Frontend Setup
1. Open a new terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(Frontend runs on http://localhost:5173)*

You can now access the Student Result Management System in your browser!
