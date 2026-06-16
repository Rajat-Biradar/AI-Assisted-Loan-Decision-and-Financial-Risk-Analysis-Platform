from pydantic import BaseModel
from loan_engine import calculate_emi

class EarlyRepaymentRequest(BaseModel):
    loan_amount: float
    interest_rate: float
    tenure_years: int
    extra_payment_per_month: float

def simulate_early_repayment(
    loan_amount: float, 
    interest_rate: float, 
    tenure_years: int, 
    extra_payment_per_month: float
):
    normal_emi_data = calculate_emi(loan_amount, interest_rate, tenure_years)
    normal_emi = normal_emi_data["emi"]
    original_interest = normal_emi_data["total_interest"]
    original_months = tenure_years * 12
    
    new_emi = normal_emi + extra_payment_per_month
    monthly_rate = (interest_rate / 12) / 100
    
    remaining_balance = loan_amount
    total_interest_paid = 0.0
    months_taken = 0
    
    while remaining_balance > 0.01:
        interest_for_month = remaining_balance * monthly_rate
        principal_for_month = new_emi - interest_for_month
        
        if remaining_balance < principal_for_month:
            principal_for_month = remaining_balance
            
        remaining_balance -= principal_for_month
        total_interest_paid += interest_for_month
        months_taken += 1
        
        if months_taken >= original_months * 2: # Safeguard
            break
            
    interest_saved = original_interest - total_interest_paid
    months_saved = original_months - months_taken
    
    return {
        "new_tenure_months": months_taken,
        "interest_saved": max(0, round(interest_saved, 2)),
        "months_saved": max(0, months_saved)
    }
