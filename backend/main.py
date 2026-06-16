from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from loan_engine import LoanRequest, calculate_emi
from risk_engine import RiskRequest, calculate_risk
from bank_engine import BankComparisonRequest, compare_banks
from ml.ml_engine import BurdenPredictRequest, get_burden_score
from amortization_engine import AmortizationRequest, generate_amortization_timeline
from early_repayment_engine import EarlyRepaymentRequest, simulate_early_repayment
from eligibility_engine import EligibilityRequest, estimate_eligibility



app = FastAPI(title="Smart Loan Decision Platform API")

# Configure CORS so the React frontend can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/calculate-loan")
async def calculate_loan_endpoint(request: LoanRequest):
    result = calculate_emi(
        loan_amount=request.loan_amount,
        annual_interest_rate=request.interest_rate,
        tenure_years=request.tenure_years
    )
    return result

@app.post("/api/risk-score")
async def risk_score_endpoint(request: RiskRequest):
    result = calculate_risk(
        monthly_income=request.monthly_income,
        existing_emi=request.existing_emi,
        new_loan_emi=request.new_loan_emi,
        credit_score=request.credit_score
    )
    return result

@app.post("/api/bank-comparison")
async def bank_comparison_endpoint(request: BankComparisonRequest):
    result = compare_banks(
        loan_amount=request.loan_amount,
        tenure_years=request.tenure_years,
        credit_score=request.credit_score,
        monthly_income=request.monthly_income,
        existing_emi=request.existing_emi
    )
    return result

@app.post("/api/predict-burden")
async def predict_burden_endpoint(request: BurdenPredictRequest):
    score = get_burden_score(
        loan_amount=request.loan_amount,
        interest_rate=request.interest_rate,
        tenure_years=request.tenure_years,
        monthly_income=request.monthly_income,
        existing_emi=request.existing_emi,
        credit_score=request.credit_score
    )
    return {"burden_score": score}

@app.post("/api/amortization")
async def amortization_endpoint(request: AmortizationRequest):
    result = generate_amortization_timeline(
        loan_amount=request.loan_amount,
        interest_rate=request.interest_rate,
        tenure_years=request.tenure_years
    )
    return result

@app.post("/api/early-repayment")
async def early_repayment_endpoint(request: EarlyRepaymentRequest):
    result = simulate_early_repayment(
        loan_amount=request.loan_amount,
        interest_rate=request.interest_rate,
        tenure_years=request.tenure_years,
        extra_payment_per_month=request.extra_payment_per_month
    )
    return result

@app.post("/api/loan-eligibility")
async def loan_eligibility_endpoint(request: EligibilityRequest):
    result = estimate_eligibility(
        monthly_income=request.monthly_income,
        existing_emi=request.existing_emi,
        interest_rate=request.interest_rate,
        tenure_years=request.tenure_years,
        credit_score=request.credit_score
    )
    return result
