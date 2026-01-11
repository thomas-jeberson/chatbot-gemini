# Chatbot Gemini – AI Powered Full-Stack Application

A **production-ready AI chatbot** built using **Spring Boot (Java 21)** with **JWT-based authentication**, **Gemini AI integration**, and **session-based chat history**.  
The backend is deployed on **Render**, and the frontend is hosted separately on **Netlify**.

This project focuses on **security, clean API design, and real production practices**.

---

## 🧱 Architecture Overview

- Backend: Spring Boot REST API
- Authentication: JWT (Stateless)
- AI Integration: Gemini API
- Database: Relational DB using JPA / Hibernate
- Frontend: Netlify
- Backend Hosting: Render

---

## 📂 Project Structure

```
cutsomized_chatbot/
├── src/main/java/com/ai/cutsomized_chatbot/
│   ├── controller/
│   │   ├── AIController.java
│   │   └── AuthController.java
│   ├── security/
│   │   ├── JwtAuthFilter.java
│   │   ├── JwtUtil.java
│   │   ├── SecurityConfig.java
│   │   ├── CustomUserDetailsService.java
│   │   └── UserPrincipal.java
│   ├── service/
│   │   └── QnAService.java
│   ├── entity/
│   │   ├── UserEntity.java
│   │   └── ChatHistoryEntity.java
│   └── CutsomizedChatbotApplication.java
│
├── src/main/resources/
│   └── application.properties
├── pom.xml
├── Dockerfile
└── README.md
```

---

## 🔧 Tech Stack

- **Java 21**
- **Spring Boot**
- **Spring Security**
- **JWT Authentication**
- **Spring Data JPA / Hibernate**
- **Gemini AI API**
- **Docker**
- **Render**
- **Netlify**

---

## 🔐 Authentication & Security

- Stateless **JWT authentication**
- Passwords stored using **PasswordEncoder (hashed)**
- Custom `JwtAuthFilter` validates every protected request
- Security configured using `SecurityFilterChain`

### Public Endpoints
- `/register`
- `/authenticate`

### Protected Endpoints
- `/api/qna/**`

Clients must send:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📡 API Documentation

### ▶️ Register User
**POST** `/register`

```json
{
  "username": "user",
  "password": "password"
}
```

---

### ▶️ Authenticate User
**POST** `/authenticate`

```json
{
  "username": "user",
  "password": "password"
}
```

Response:
```json
{
  "token": "jwt_token_here"
}
```

---

### ▶️ Ask AI Question
**POST** `/api/qna/ask`

Headers:
```
Authorization: Bearer <JWT_TOKEN>
```

Body:
```json
{
  "question": "What is Spring Boot?",
  "sessionId": "session-1"
}
```

---

### ▶️ Get Chat History
**GET** `/api/qna/history/{sessionId}`

Returns the full chat history for the authenticated user and session.

---

## 🧠 AI Processing Flow

1. User sends a question
2. Request is authenticated using JWT
3. `QnAService` sends the prompt to Gemini AI
4. AI response is returned
5. Conversation is stored with:
   - user
   - sessionId
   - timestamp

---

## 🗄️ Database Design

### UserEntity
- username
- password (hashed)

### ChatHistoryEntity
- question
- answer
- timestamp
- sessionId
- user (Many-to-One)

---

## 🌐 CORS Configuration

Allowed origins:
- https://thomaschatbot.netlify.app
- http://localhost:5173

Credentials are enabled.

---

## 🚀 Deploying on Render

### Build Command
```bash
./mvnw clean package -DskipTests
```

### Start Command
```bash
java -jar target/*.jar
```

### Required Environment Variables
```
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
PORT=8080
```

Spring Boot reads the port using:
```
server.port=${PORT:8080}
```

---

## 🎯 Key Highlights

- Secure JWT-based authentication
- Session-based AI chat history
- Stateless REST architecture
- Production-oriented security setup
- Clean separation of concerns
- No unnecessary exposure of internal APIs

---

## 👤 Author

**Thomas Jeberson**  
**Full Stack Developer**
