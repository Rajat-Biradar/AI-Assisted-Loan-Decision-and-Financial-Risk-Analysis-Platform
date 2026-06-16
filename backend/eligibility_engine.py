from pydantic import BaseModel

class EligibilityRequest(BaseModel):
    monthly_income: float
    existing_emi: float
    interest_rate: float
    tenure_years: int
    credit_score: int

def estimate_eligibility(
    monthly_income: float,
    existing_emi: float,
    interest_rate: float,
    tenure_years: int,
    credit_score: int
):
    max_emi = monthly_income * 0.4
    available_emi = max_emi - existing_emi
    
    if available_emi <= 0:
        return {
            "eligible_loan_amount": 0,
            "recommended_emi": 0,
            "eligibility_status": "RISKY"
        }
        
    r = (interest_rate / 12) / 100
    n = tenure_years * 12
    
    if r == 0:
        max_loan_amount = available_emi * n
    else:
        max_loan_amount = available_emi * (((1 + r) ** n) - 1) / (r * ((1 + r) ** n))
        
    if credit_score >= 750:
        status = "SAFE"
    elif credit_score >= 650:
        status = "MODERATE"
    else:
        status = "RISKY"
        
    return {
        "eligible_loan_amount": round(max_loan_amount, 2),
        "recommended_emi": round(available_emi, 2),
        "eligibility_status": status
    }
