import React from 'react';
import { formatINR } from '../utils';

const EarlyRepayment = ({ 
  extraEmi, setExtraEmi, 
  handleSimulateEarlyRepayment, 
  isSimulating, earlyRepaymentResult,
  calculationResults
}) => {
  if (!calculationResults) {
    return (
      <div className="bg-white p-12 text-center rounded-xl border border-gray-100 shadow-sm">
        <p className="text-gray-500">Calculate a loan to view Early Repayment simulation.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Early Repayment Simulator</h2>
      <form onSubmit={handleSimulateEarlyRepayment} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Extra Monthly Payment (₹)</label>
          <input type="number" value={extraEmi} onChange={(e) => setExtraEmi(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg" required min="0" />
          <p className="text-xs text-gray-500 mt-2">Enter the extra amount you plan to pay along with your EMI every month.</p>
        </div>
        <button type="submit" disabled={isSimulating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors shadow-sm disabled:opacity-70 mt-4">
          {isSimulating ? 'Simulating...' : 'Run Simulation'}
        </button>
      </form>

      {earlyRepaymentResult && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Simulation Results</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-100 flex flex-col justify-center items-center text-center">
              <span className="text-green-800 font-bold mb-1">Total Interest Saved</span>
              <span className="font-black text-green-600 text-3xl">{formatINR(earlyRepaymentResult.interest_saved)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                <span className="block text-gray-500 text-sm font-medium mb-1">Months Saved</span>
                <span className="font-bold text-gray-800 text-xl">{earlyRepaymentResult.months_saved}</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100 text-center">
                <span className="block text-blue-800 text-sm font-medium mb-1">New Tenure</span>
                <span className="font-bold text-blue-600 text-xl">{earlyRepaymentResult.new_tenure_months} mo</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EarlyRepayment;
