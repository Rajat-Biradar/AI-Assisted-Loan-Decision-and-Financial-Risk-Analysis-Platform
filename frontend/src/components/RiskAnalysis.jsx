import React from 'react';
import { Pie } from 'react-chartjs-2';

const RiskAnalysis = ({ riskAnalysis }) => {
  if (!riskAnalysis) {
    return (
      <div className="bg-white p-12 text-center rounded-xl border border-slate-100 shadow-sm">
        <p className="text-slate-500">Calculate a loan to view Risk Analysis.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm max-w-lg mx-auto">
      <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Loan Risk Analysis</h3>
      
      <div className={`p-4 mb-8 rounded-lg flex flex-col gap-3 font-medium border ${
        riskAnalysis.risk_level === 'LOW' ? 'bg-green-50 text-green-800 border-green-200' :
        riskAnalysis.risk_level === 'MEDIUM' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
        'bg-red-50 text-red-800 border-red-200'
      }`}>
        <div className="flex justify-between items-center text-lg">
          <span>Debt-to-Income Ratio</span>
          <span className="font-bold">{(riskAnalysis.dti_ratio * 100).toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center text-lg">
          <span>Risk Level</span>
          <span className="font-bold">{riskAnalysis.risk_level}</span>
        </div>
      </div>
      
      <div className="h-64 flex justify-center items-center relative">
        <Pie 
          data={{
            labels: ['Safe', 'Caution', 'Danger'],
            datasets: [{
              data: [30, 20, 50],
              backgroundColor: [
                'rgba(34, 197, 94, 0.8)',
                'rgba(234, 179, 8, 0.8)',
                'rgba(239, 68, 68, 0.8)',
              ],
              borderWidth: 0,
              circumference: 180,
              rotation: 270,
            }]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: { enabled: false },
              legend: { position: 'bottom' }
            },
            cutout: '75%',
          }}
        />
        <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 mt-4 text-center w-full">
          <span className={`text-3xl font-bold ${
            riskAnalysis.risk_level === 'LOW' ? 'text-green-600' :
            riskAnalysis.risk_level === 'MEDIUM' ? 'text-yellow-600' :
            'text-red-600'
          }`}>{riskAnalysis.risk_level}</span>
          <p className="text-gray-500 text-md mt-1">RISK</p>
        </div>
      </div>
    </div>
  );
};
export default RiskAnalysis;
