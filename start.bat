@echo off
TITLE Spring Contacts - Professional Portal
echo ==========================================
echo   SPRING CONTACTS - ENTERPRISE EDITION
echo ==========================================
echo.

echo [1/3] Starting Backend (Spring Boot)...
echo (A new window will open. Ensure PostgreSQL is running.)
start "Spring Backend" cmd /c "cd backend && mvn spring-boot:run"

echo.
echo [2/3] Verifying Frontend environment...
cd frontend
if not exist "node_modules\" (
    echo node_modules not found. Running secure install...
    npm install --silent
)

echo.
echo [3/3] Launching Contact Intelligence Portal...
npm run dev
pause
