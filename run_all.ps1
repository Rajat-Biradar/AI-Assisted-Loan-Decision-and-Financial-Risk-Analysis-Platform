Start-Process powershell -ArgumentList "-NoExit", "-Command", "
cd backend;
.\venv\Scripts\uvicorn.exe main:app --reload --port 8000
"

Start-Process powershell -ArgumentList "-NoExit", "-Command", "
cd frontend;
npm run dev
"