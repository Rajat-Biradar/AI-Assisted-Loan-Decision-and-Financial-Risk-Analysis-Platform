start cmd /k "cd backend && venv\Scripts\activate && venv\Scripts\uvicorn.exe main:app --reload --port 8000"
start cmd /k "cd frontend && npm run dev"
