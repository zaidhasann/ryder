# DriveEase - Car Rental and Booking Platform

DriveEase is a full-stack car rental and booking platform designed to streamline the process of browsing, renting, and managing vehicles.

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot (Java 17)
- **Database:** PostgreSQL
- **Security:** Spring Security & JWT (JSON Web Tokens)
- **Migrations:** Flyway
- **Build Tool:** Maven

### Frontend
- **Framework:** React with TypeScript (Vite)
- **Styling:** Tailwind CSS

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Java 17** (or newer)
- **Node.js** (v18 or newer)
- **PostgreSQL**
- **Maven** (optional, as the project includes a Maven wrapper `mvnw`)

---

## 🚀 Getting Started

### 1. Database Setup
Create a PostgreSQL database for the application:
```sql
CREATE DATABASE driveease;
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create your environment configuration:
   - Make a copy of `.env.example` and name it `.env`
   - Update the database credentials and JWT secret in the `.env` file if necessary.
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend server will start on `http://localhost:8080`. Flyway will automatically run database migrations on startup.*

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Create your environment configuration:
   - Create a `.env` file in the `frontend` directory.
   - Add the following line to connect to the local backend:
     ```env
     VITE_API_URL=http://localhost:8080
     ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend application will start (usually on `http://localhost:5173`).*

---

## 🔒 Security & Roles

The API is secured using JWT authentication. 
- **Public endpoints** include viewing cars, locations, and reviews.
- **Authenticated endpoints** include booking cars and managing user profiles.
- **Admin endpoints** (`/api/admin/**`) are restricted to users with the `ROLE_ADMIN` authority (e.g., for adding, updating, or deleting car listings).
