import React from 'react';

const MENU_ITEMS = [
  { id: 'dashboard', label: '📊 Dashboard' },
  { id: 'emi', label: '🧮 EMI Calculator' },
  { id: 'risk', label: '⚠️ Risk Analysis' },
  { id: 'bank', label: '🏦 Bank Comparison' },
  { id: 'analytics', label: '📈 Loan Analytics' },
  { id: 'eligibility', label: '✅ Eligibility' },
  { id: 'repayment', label: '⏩ Early Repayment' }
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 leading-tight">Smart Loan Panel</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
              activeTab === item.id ? 'bg-blue-600 text-white font-medium shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

    </aside>
  );
};
export default Sidebar;
