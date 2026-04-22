from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os
import pandas as pd

app = FastAPI(title="Stock Movement Prediction API")

# Load model globally
model_path = 'model.joblib'
if os.path.exists(model_path):
    model = joblib.load(model_path)
else:
    model = None

class PredictionRequest(BaseModel):
    Open: float
    High: float
    Low: float
    Volume: int
    Price_Range: float
    Daily_Return: float

class PredictionResponse(BaseModel):
    prediction: int
    movement: str
    probability: float

@app.on_event("startup")
async def startup_event():
    global model
    if not model and os.path.exists(model_path):
        model = joblib.load(model_path)

@app.get("/")
def read_root():
    return {"status": "healthy", "model_loaded": model is not None}

@app.post("/predict", response_model=PredictionResponse)
def predict(data: PredictionRequest):
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    # Prepare input for prediction
    input_data = pd.DataFrame([{
        'Open': data.Open,
        'High': data.High,
        'Low': data.Low,
        'Volume': data.Volume,
        'Price_Range': data.Price_Range,
        'Daily_Return': data.Daily_Return
    }])
    
    prediction = model.predict(input_data)[0]
    probabilities = model.predict_proba(input_data)[0]
    probability = float(max(probabilities))
    movement = "UP" if prediction == 1 else "DOWN"
    
    return {
        "prediction": int(prediction), 
        "movement": movement,
        "probability": probability
    }
