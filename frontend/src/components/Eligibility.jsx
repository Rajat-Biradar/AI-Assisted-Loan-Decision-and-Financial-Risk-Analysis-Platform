import React from 'react';
import { formatINR } from '../utils';

const Eligibility = ({ 
  eligIncome, setEligIncome, 
  eligExistingEmi, setEligExistingEmi, 
  eligRate, setEligRate, 
  eligTenure, setEligTenure, 
  eligCreditScore, setEligCreditScore, 
  isCheckingEligibility, handleCheckEligibility, 
  eligibilityResult 
}) => {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Eligibility Estimator</h2>
      <form onSubmit={handleCheckEligibility} className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Monthly Income (₹)</label>
            <input type="number" value={eligIncome} onChange={(e) => setEligIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required min="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Existing EMI (₹)</label>
            <input type="number" value={eligExistingEmi} onChange={(e) => setEligExistingEmi(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required min="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Interest Rate (%)</label>
            <input type="number" step="0.1" value={eligRate} onChange={(e) => setEligRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required min="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Loan Tenure (Years)</label>
            <input type="number" value={eligTenure} onChange={(e) => setEligTenure(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required min="1" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score</label>
          <input type="number" value={eligCreditScore} onChange={(e) => setEligCreditScore(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required min="300" max="900" />
        </div>
        <button type="submit" disabled={isCheckingEligibility}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors shadow-sm disabled:opacity-70 mt-2">
          {isCheckingEligibility ? 'Checking...' : 'Check Eligibility Status'}
        </button>
      </form>

      {eligibilityResult && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Your Results</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
              <span className="text-gray-600 font-medium">Max Eligible Loan</span>
              <span className="font-black text-blue-600 text-xl">{formatINR(eligibilityResult.eligible_loan_amount)}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
              <span className="text-gray-600 font-medium">Recommended Max EMI</span>
              <span className="font-bold text-gray-800 text-lg">{formatINR(eligibilityResult.recommended_emi)}</span>
            </div>
            <div className={`p-4 rounded-xl shadow-sm border flex justify-between items-center ${
              eligibilityResult.eligibility_status === 'SAFE' ? 'bg-green-50 border-green-200' :
              eligibilityResult.eligibility_status === 'MODERATE' ? 'bg-yellow-50 border-yellow-200' :
              'bg-red-50 border-red-200'
            }`}>
              <span className="text-gray-700 font-bold">Safe Status</span>
              <span className={`font-black text-lg ${
                eligibilityResult.eligibility_status === 'SAFE' ? 'text-green-700' :
                eligibilityResult.eligibility_status === 'MODERATE' ? 'text-yellow-700' :
                'text-red-700'
              }`}>{eligibilityResult.eligibility_status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Eligibility;
