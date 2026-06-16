from pydantic import BaseModel
from loan_engine import calculate_emi

class AmortizationRequest(BaseModel):
    loan_amount: float
    interest_rate: float
    tenure_years: int

def generate_amortization_timeline(loan_amount: float, interest_rate: float, tenure_years: int):
    # Get standard EMI using existing logic
    emi_data = calculate_emi(loan_amount, interest_rate, tenure_years)
    emi = emi_data["emi"]
    
    monthly_rate = (interest_rate / 12) / 100
    months = tenure_years * 12
    remaining_balance = loan_amount
    
    timeline = []
    
    for month_number in range(1, months + 1):
        if remaining_balance <= 0:
            break
            
        interest = remaining_balance * monthly_rate
        principal = emi - interest
        remaining_balance = remaining_balance - principal
        
        if remaining_balance < 0:
            remaining_balance = 0
            
        timeline.append({
            "month": month_number,
            "balance": round(remaining_balance, 2)
        })
        
    return {
        "timeline": timeline
    }
