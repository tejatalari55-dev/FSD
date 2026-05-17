@echo off
echo Starting the project...
if not exist node_modules (
    echo node_modules not found. Running npm install...
    call npm install
)
call npm start
pause
