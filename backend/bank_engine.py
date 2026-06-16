from pydantic import BaseModel
from loan_engine import calculate_emi
from bank_dataset import banks_data


class BankComparisonRequest(BaseModel):
    loan_amount: float
    tenure_years: int
    credit_score: int = 700
    monthly_income: float = 50000
    existing_emi: float = 0


def compare_banks(
    loan_amount: float,
    tenure_years: int,
    credit_score: int = 700,
    monthly_income: float = 50000,
    existing_emi: float = 0
):
    results = []

    print(f"[DEBUG] Received payload: loan_amount={loan_amount}, tenure_years={tenure_years}, credit_score={credit_score}, monthly_income={monthly_income}, existing_emi={existing_emi}")

    # Step 1: calculate EMIs for all banks
    emis = []
    max_emi = 0

    for bank in banks_data:
        emi_result = calculate_emi(loan_amount, bank["interest_rate"], tenure_years)
        emi = emi_result["emi"]
        emis.append((bank, emi))
        if emi > max_emi:
            max_emi = emi

    best_bank = None
    highest_score = -float("inf")
    best_bank_obj = None
    best_bank_dti = 0

    # Step 2: evaluate each bank
    for bank, emi in emis:

        # Hard rule: reject private banks for very low credit
        if credit_score < 600 and bank["type"] == "private":
            print(f"[DEBUG] Rejected {bank['name']} - private bank for very low credit score {credit_score}")
            continue

        # Calculate DTI
        new_emi = emi
        total_emi = new_emi + existing_emi
        dti = total_emi / monthly_income if monthly_income > 0 else 1.0

        # Risk profile label
        if bank["type"] == "cooperative":
            risk_profile = "high"
        elif bank["type"] == "private":
            risk_profile = "low"
        else:
            risk_profile = "moderate"

        bank_result = {
            "name": bank["name"],
            "type": bank["type"],
            "risk_profile": risk_profile,
            "interest_rate": bank["interest_rate"],
            "emi": emi,
            "location": bank["location"],
            "website": bank["website"]
        }

        # Now we add to results (all banks are added, no longer filtered out here)
        results.append(bank_result)

        # Step 3: scoring
        score = 0

        # DTI filter penalties instead of strict rejection
        if dti > 0.5 and bank["type"] == "private":
            print(f"[DEBUG] Applied filter penalty to {bank['name']} - DTI {dti:.3f} > 0.5 for private bank")
            score -= 5

        if dti > 0.5 and bank["type"] == "public":
            print(f"[DEBUG] Applied filter penalty to {bank['name']} - DTI {dti:.3f} > 0.5 for public bank")
            score -= 3

        # DTI scoring
        if dti < 0.3:
            score += 3
        elif dti < 0.5:
            score += 1
        else:
            # different penalties based on bank type
            if bank["type"] == "private":
                score -= 6
            elif bank["type"] == "public":
                score -= 3
            else:
                score -= 1

        # Credit score scoring
        if credit_score >= 750:
            if bank["type"] == "private":
                score += 3
            elif bank["type"] == "public":
                score += 2
            else:
                score += 1

        elif 600 <= credit_score <= 749:
            if bank["type"] == "public":
                score += 3
            elif bank["type"] == "private":
                score += 2
            else:
                score += 2

        else:  # < 600
            if bank["type"] == "cooperative":
                score += 3
            elif bank["type"] == "public":
                score += 2

        # Income scoring
        if monthly_income > 100000:
            if bank["type"] == "private":
                score += 2
        elif 40000 <= monthly_income <= 100000:
            if bank["type"] == "public":
                score += 2
        else:
            if bank["type"] == "cooperative":
                score += 2

        # EMI influence (reduced weight)
        emi_score = (max_emi - emi)
        score += emi_score / 600

        print(f"[DEBUG] Evaluated {bank['name']}: DTI={dti:.3f}, Score={score:.2f}")

        # Track best bank
        if score > highest_score:
            highest_score = score
            best_bank = bank["name"]
            best_bank_obj = bank_result
            best_bank_dti = dti

    # Step 4: recommendation message
    if best_bank_obj:
        recommendation_reason = (
            f"{best_bank_obj['name']} is recommended based on your credit score, "
            f"income profile, affordability (DTI: {best_bank_dti * 100:.1f}%), "
            f"and competitive EMI."
        )
    else:
        recommendation_reason = "No eligible banks found for your financial profile."

    return {
        "banks": results,
        "best_bank": best_bank,
        "recommendation_reason": recommendation_reason
    }