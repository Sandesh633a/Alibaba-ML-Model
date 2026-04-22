# Alibaba ML Model

A full‑stack machine‑learning demo that predicts stock price movement using a Logistic Regression model.

## Overview
- **Backend** – FastAPI (`backend/`) exposing `/predict` which returns class and confidence probability.
- **Frontend** – Vite + React + TailwindCSS (`frontend/`) with a glass‑morphism dashboard, confidence meter, prediction history, model info panel, and helpful input tooltips.
- **Features** – Docker‑ready, CI/CD (GitHub Actions), and ready for deployment on Render/Render, Railway, etc.

## Quick Start (local)
```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd ../frontend
npm install
npm run dev
```

Visit `http://localhost:5173` – the UI will proxy API calls to `http://localhost:8000`.

## Deploy
Both backend and frontend have Dockerfiles. Use the provided `docker-compose.yml` or push the images to a registry and deploy on a PaaS.

## License
MIT © Sandesh
