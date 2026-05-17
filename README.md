# ⚡ Spring Contacts: Mission Control

Welcome, Developer. You're about to deploy a sleek, full-stack Contact Management System. Think of this as your digital rolodex, powered by a robust **Spring Boot** engine and a polished **React** interface.

---

## 🛠 Phase 1: The Blueprint (Tech Stack)

Before we launch, let's look at the components in your toolkit:

*   **Engine (Backend):** Java 17+ with Spring Boot, Spring Data JPA, and H2 Database.
*   **Interface (Frontend):** React 18 with Vite, Axios, and high-fidelity CSS.
*   **Infrastructure:** RESTful APIs, CORS management, and a smart Demo Mode for offline testing.

---

## 🚀 Phase 2: Ignition (Running the Project)

You have two ways to bring this project to life.

### Option A: The "One-Click" Launch (Windows Only)
We've automated the heavy lifting for you.
1.  Double-click `start.bat` in the root directory.
2.  Watch as the script:
    *   Spins up the **Backend** on port `8080`.
    *   Initializes the **Frontend** on port `5173`.
    *   Automatically opens your browser to the dashboard.

### Option B: Manual Control (Cross-Platform)

**1. Fire up the Backend:**
```bash
cd backend
mvn spring-boot:run
```
*Wait for the console to say: `Started ContactsApplication in X seconds`.*

**2. Launch the Interface:**
```bash
cd frontend
npm install  # First time only
npm run dev
```

---

## 🔍 Phase 3: Field Operations (Walkthrough)

### 1. The Secure Kernel (Backend)
Navigate to `backend/src/main/java/com/example/contacts`.
*   **`Contact.java`**: The blueprint of our data.
*   **`DataSeeder.java`**: Automatically populates your database with high-profile contacts (Stark, Wayne, and more) on first run.
*   **`ContactController.java`**: The gateway that exposes our `/api/contacts` endpoint.

### 2. The Command Center (Frontend)
Head over to `frontend/src`.
*   **`App.jsx`**: The brain of the operation. It attempts to connect to the backend but has a built-in **Self-Healing Demo Mode**. If the backend isn't ready, it fails over to cached mock data so the UI never breaks.
*   **`ContactCard.jsx`**: A sleek, interactive component that renders contact details with a premium feel.

### 3. Verification
Once running, you'll see a status indicator in the top right:
*   🟢 **Cloud Secure**: Live data flowing from your Spring Boot server.
*   🔴 **Offline Cache**: Smart failover active (Check if your backend is running!).

---

## 🎯 Mission Accomplished
You've just deployed a modern, resilient full-stack application. Explore the code, tweak the styles, and make it your own.

**Happy Coding!** 🚀
