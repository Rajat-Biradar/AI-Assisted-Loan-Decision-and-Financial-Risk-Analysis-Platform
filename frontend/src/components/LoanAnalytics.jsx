import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

const LoanAnalytics = ({ loanAmount, calculationResults, timelineData, burdenScore }) => {
  if (!calculationResults) {
    return (
      <div className="bg-white p-12 text-center rounded-xl border border-slate-100 shadow-sm">
        <p className="text-slate-500">Calculate a loan to view Analytics.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {burdenScore && (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">ML Loan Burden Prediction</h3>
          <div className={`p-6 rounded-xl flex flex-col gap-4 font-medium border ${
            burdenScore.burden_score < 40 ? 'bg-green-50 text-green-800 border-green-200' :
            burdenScore.burden_score < 70 ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
            'bg-red-50 text-red-800 border-red-200'
          }`}>
            <div className="flex justify-between items-center px-4">
              <span className="text-lg">Burden Score (0-100)</span>
              <span className="font-bold text-3xl">{burdenScore.burden_score}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-black/10 px-4">
              <span className="text-lg">Risk Label</span>
              <span className="font-bold text-xl uppercase tracking-wide">
                {burdenScore.burden_score < 40 ? 'Low' : burdenScore.burden_score < 70 ? 'Moderate' : 'High'}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-700 mb-6 text-center">Principal vs Interest</h3>
          <div className="h-[300px]">
            <Bar 
              data={{
                labels: ['Loan Breakdown'],
                datasets: [
                  {
                    label: 'Principal Amount',
                    data: [loanAmount],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: 'rgb(59, 130, 246)',
                    borderWidth: 1,
                  },
                  {
                    label: 'Total Interest',
                    data: [calculationResults.total_interest],
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderColor: 'rgb(239, 68, 68)',
                    borderWidth: 1,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                scales: { x: { stacked: true }, y: { stacked: true } }
              }}
            />
          </div>
        </div>

        {timelineData && timelineData.length > 0 && (
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-700 mb-6 text-center">Loan Repayment Timeline</h3>
            <div className="h-[300px]">
              <Line 
                data={{
                  labels: timelineData.map(point => point.month),
                  datasets: [{
                    label: 'Remaining Balance (₹)',
                    data: timelineData.map(point => point.balance),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    fill: true,
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { mode: 'index', intersect: false }
                  },
                  scales: {
                    x: { title: { display: true, text: 'Month' }, grid: { display: false } },
                    y: { title: { display: true, text: 'Remaining Balance' }, beginAtZero: true }
                  },
                  interaction: { mode: 'nearest', axis: 'x', intersect: false }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default LoanAnalytics;
