from pydantic import BaseModel

class RiskRequest(BaseModel):
    monthly_income: float
    existing_emi: float
    new_loan_emi: float
    credit_score: int

def calculate_risk(monthly_income: float, existing_emi: float, new_loan_emi: float, credit_score: int):
    if monthly_income <= 0:
        return {"dti_ratio": 0.0, "risk_level": "HIGH"}

    dti_ratio = (existing_emi + new_loan_emi) / monthly_income
    
    if dti_ratio < 0.30:
        risk_level = "LOW"
    elif dti_ratio < 0.50:
        risk_level = "MEDIUM"
    else:
        risk_level = "HIGH"
        
    return {
        "dti_ratio": round(dti_ratio, 2),
        "risk_level": risk_level
    }
