import pickle
import os
import numpy as np
from pydantic import BaseModel

class BurdenPredictRequest(BaseModel):
    loan_amount: float
    interest_rate: float
    tenure_years: int
    monthly_income: float
    existing_emi: float
    credit_score: int


# Load the trained model when module loads
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'burden_model.pkl')
try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
except FileNotFoundError:
    model = None

def get_burden_score(loan_amount: float, interest_rate: float, tenure_years: int, monthly_income: float, existing_emi: float, credit_score: int):
    # Predicts the burden score ranging from 0 to 100
    if model is None:
        return 0.0

    features = np.array([[
        loan_amount,
        interest_rate,
        tenure_years,
        monthly_income,
        existing_emi,
        credit_score
    ]])
    
    prediction = model.predict(features)[0]
    return float(prediction)
