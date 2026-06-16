import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ activeTab, setActiveTab, status, error, children }) => {
  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-8 border-l border-slate-200">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Smart Loan Analytics Dashboard</h2>
            <p className="text-slate-500 mt-1">Loan Decision & Risk Intelligence Platform</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <span className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : status === 'Backend connection successful' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            {error ? 'Error' : status === 'Backend connection successful' ? 'Connected' : 'Connecting...'}
          </div>
        </header>
        <div className="max-w-6xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};
export default Layout;
