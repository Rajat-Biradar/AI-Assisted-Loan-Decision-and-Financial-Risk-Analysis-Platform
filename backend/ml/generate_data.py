import pandas as pd
import numpy as np

def generate_data():
    np.random.seed(42)
    n_samples = 10000
    
    # Generate random features
    loan_amount = np.random.uniform(50000, 5000000, n_samples)
    interest_rate = np.random.uniform(5.0, 15.0, n_samples)
    tenure_years = np.random.randint(1, 30, n_samples)
    monthly_income = np.random.uniform(20000, 300000, n_samples)
    existing_emi = np.random.uniform(0, 50000, n_samples)
    credit_score = np.random.randint(300, 900, n_samples)
    
    # Calculate a proxy for EMI to evaluate burden
    r = (interest_rate / 12) / 100
    n = tenure_years * 12
    # Handle r=0 case elegantly though our range is 5-15%
    new_emi = loan_amount * r * ((1 + r)**n) / (((1 + r)**n) - 1)
    
    # Debt-to-Income ratio
    dti = (existing_emi + new_emi) / monthly_income
    
    # We want a burden score from 0 to 100.
    # Higher DTI -> Higher Burden
    # Lower Credit Score -> Higher Burden
    
    # Normalize DTI effect (cap at 0.8 DTI = 70 points max)
    burden_dti = np.clip((dti / 0.8) * 70, 0, 70)
    
    # Normalize Credit Score effect (300 -> 30, 900 -> 0)
    burden_credit = np.clip(((900 - credit_score) / 600) * 30, 0, 30)
    
    burden_score = np.clip(burden_dti + burden_credit, 0, 100)
    
    # Add random noise to simulate real-world data
    noise = np.random.normal(0, 3, n_samples)
    burden_score = np.clip(burden_score + noise, 0, 100)
    
    df = pd.DataFrame({
        'loan_amount': loan_amount,
        'interest_rate': interest_rate,
        'tenure_years': tenure_years,
        'monthly_income': monthly_income,
        'existing_emi': existing_emi,
        'credit_score': credit_score,
        'burden_score': burden_score
    })
    
    df.to_csv('loan_data.csv', index=False)
    print("Successfully generated loan_data.csv with 10,000 samples.")

if __name__ == '__main__':
    generate_data()
