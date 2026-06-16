import React from 'react';
import { Bar } from 'react-chartjs-2';
import { formatINR } from '../utils';

const BankComparison = ({ bankComparison }) => {
  if (!bankComparison) {
    return (
      <div className="bg-white p-12 text-center rounded-xl border border-slate-100 shadow-sm">
        <p className="text-slate-500">Calculate a loan to view Bank Comparison.</p>
      </div>
    );
  }

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'text-green-700 bg-green-100 ring-green-600/20';
      case 'moderate': return 'text-yellow-800 bg-yellow-100 ring-yellow-600/20';
      case 'high': return 'text-red-700 bg-red-100 ring-red-600/10';
      default: return 'text-gray-600 bg-gray-50 ring-gray-500/10';
    }
  };

  const getTypeBadgeColor = (type) => {
    switch(type) {
      case 'public': return 'bg-blue-100 text-blue-800';
      case 'private': return 'bg-purple-100 text-purple-800';
      case 'cooperative': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Tumakuru Bank Offers</h3>
          <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
            {bankComparison.banks.map((bank, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-xl border flex flex-col gap-3 transition-all ${
                  bank.name === bankComparison.best_bank 
                    ? 'border-blue-400 bg-blue-50 shadow-md ring-1 ring-blue-300 ring-offset-1' 
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className={`font-bold text-lg flex items-center gap-2 ${bank.name === bankComparison.best_bank ? 'text-blue-800' : 'text-slate-800'}`}>
                      {bank.name}
                      {bank.name === bankComparison.best_bank && <span className="text-xs font-semibold px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full">BEST</span>}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-md capitalize ${getTypeBadgeColor(bank.type)}`}>
                        {bank.type}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ring-1 ring-inset capitalize ${getRiskColor(bank.risk_profile)}`}>
                        {bank.risk_profile} Risk
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-slate-900 text-xl">{formatINR(bank.emi)}</span>
                    <span className="text-xs text-slate-500">per month</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm mt-1 pt-3 border-t border-slate-200/60">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-600 flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      {bank.location}
                    </span>
                    <span className="text-gray-600 flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Interest: {bank.interest_rate}%
                    </span>
                  </div>
                  <a href={bank.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm transition-colors">
                    Visit Website
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {bankComparison.recommendation_reason && (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Recommendation Explanation
            </h3>
            <p className="text-blue-800 leading-relaxed pl-7">
              {bankComparison.recommendation_reason}
            </p>
          </div>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col h-fit sticky top-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">EMI Comparison Chart</h3>
        <div className="flex-1 min-h-[400px]">
          <Bar 
            data={{
              labels: bankComparison.banks.map(b => b.name.split(' ')[0]),
              datasets: [{
                label: 'Monthly EMI (₹)',
                data: bankComparison.banks.map(b => b.emi),
                backgroundColor: bankComparison.banks.map(b => 
                  b.name === bankComparison.best_bank ? 'rgba(34, 197, 94, 0.8)' : 
                  b.risk_profile === 'high' ? 'rgba(239, 68, 68, 0.5)' :
                  b.risk_profile === 'low' ? 'rgba(59, 130, 246, 0.5)' :
                  'rgba(156, 163, 175, 0.6)'
                ),
                borderWidth: 1,
                borderRadius: 4,
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { min: Math.floor(Math.min(...bankComparison.banks.map(b => b.emi)) * 0.98) }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default BankComparison;
