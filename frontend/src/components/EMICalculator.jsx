import React from 'react';
import { formatINR } from '../utils';

const EMICalculator = ({ 
  loanAmount, setLoanAmount, 
  interestRate, setInterestRate, 
  tenureYears, setTenureYears, 
  monthlyIncome, setMonthlyIncome, 
  existingEmi, setExistingEmi, 
  creditScore, setCreditScore, 
  isCalculating, handleCalculate, 
  calculationResults 
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">EMI Calculator</h2>
      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Loan Amount (₹)</label>
          <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Interest Rate (%)</label>
          <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required min="0.1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Tenure (Years)</label>
          <input type="number" value={tenureYears} onChange={(e) => setTenureYears(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Monthly Income (₹)</label>
          <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Existing EMI (₹)</label>
          <input type="number" value={existingEmi} onChange={(e) => setExistingEmi(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Credit Score</label>
          <input type="number" value={creditScore} onChange={(e) => setCreditScore(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required min="300" max="900" />
        </div>
        <button type="submit" disabled={isCalculating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-70">
          {isCalculating ? 'Calculating...' : 'Calculate Loan'}
        </button>
      </form>

      {calculationResults && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Results</h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
              <span className="text-gray-600">Monthly EMI</span>
              <span className="font-black text-blue-700 text-2xl">{formatINR(calculationResults.emi)}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
              <span className="text-gray-600">Total Interest</span>
              <span className="font-semibold text-gray-800">{formatINR(calculationResults.total_interest)}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
              <span className="text-gray-600">Total Payment</span>
              <span className="font-semibold text-gray-800">{formatINR(calculationResults.total_payment)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EMICalculator;
