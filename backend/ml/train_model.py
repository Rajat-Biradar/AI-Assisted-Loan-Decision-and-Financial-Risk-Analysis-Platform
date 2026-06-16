import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import pickle

def train_model():
    # Load dataset
    df = pd.read_csv('loan_data.csv')
    
    # Separate features and target
    X = df[['loan_amount', 'interest_rate', 'tenure_years', 'monthly_income', 'existing_emi', 'credit_score']]
    y = df['burden_score']
    
    # Train test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Initialize and train regression model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate score
    score = model.score(X_test, y_test)
    print(f"Model trained successfully! R^2 Score on test set: {score:.4f}")
    
    # Export trained model
    with open('burden_model.pkl', 'wb') as f:
        pickle.dump(model, f)
    print("Model saved to burden_model.pkl")

if __name__ == '__main__':
    train_model()
