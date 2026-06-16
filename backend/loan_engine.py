from pydantic import BaseModel

class LoanRequest(BaseModel):
    loan_amount: float
    interest_rate: float
    tenure_years: int

def calculate_emi(loan_amount: float, annual_interest_rate: float, tenure_years: int):
    # Monthly interest rate
    r = (annual_interest_rate / 12) / 100
    # Total number of months
    n = tenure_years * 12
    
    if r == 0:
        emi = loan_amount / n
        total_payment = loan_amount
        total_interest = 0
    else:
        # EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
        emi = loan_amount * r * ((1 + r) ** n) / (((1 + r) ** n) - 1)
        total_payment = emi * n
        total_interest = total_payment - loan_amount
        
    return {
        "emi": round(emi, 2),
        "total_interest": round(total_interest, 2),
        "total_payment": round(total_payment, 2)
    }
