import { useState, useEffect } from 'react'
import { API_BASE } from './config'


import Layout from './components/Layout'
import EMICalculator from './components/EMICalculator'
import RiskAnalysis from './components/RiskAnalysis'
import BankComparison from './components/BankComparison'
import LoanAnalytics from './components/LoanAnalytics'
import Eligibility from './components/Eligibility'
import EarlyRepayment from './components/EarlyRepayment'



function App() {
  const [status, setStatus] = useState('Checking backend connection...')
  const [error, setError] = useState(null)
  
  // Tab State
  const [activeTab, setActiveTab] = useState('dashboard')

  // Shared Data State
  const [loanAmount, setLoanAmount] = useState(100000)
  const [interestRate, setInterestRate] = useState(5.5)
  const [tenureYears, setTenureYears] = useState(10)
  const [monthlyIncome, setMonthlyIncome] = useState(80000)
  const [existingEmi, setExistingEmi] = useState(5000)
  const [creditScore, setCreditScore] = useState(720)
  
  const [calculationResults, setCalculationResults] = useState(null)
  const [riskAnalysis, setRiskAnalysis] = useState(null)
  const [bankComparison, setBankComparison] = useState(null)
  const [burdenScore, setBurdenScore] = useState(null)
  const [timelineData, setTimelineData] = useState([])
  const [isCalculating, setIsCalculating] = useState(false)

  // Early Repayment State
  const [extraEmi, setExtraEmi] = useState(5000)
  const [earlyRepaymentResult, setEarlyRepaymentResult] = useState(null)
  const [isSimulating, setIsSimulating] = useState(false)
  
  // Eligibility State
  const [eligibilityResult, setEligibilityResult] = useState(null)
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then((res) => res.json())
      .then(() => {
        setStatus('Backend connection successful')
        setError(null)
      })
      .catch(() => {
        setStatus('Failed to connect to backend')
        setError('Failed to connect to backend')
      })
  }, [])

  const handleCalculate = async (e) => {
    e.preventDefault()
    setIsCalculating(true)
    try {
      const res = await fetch(`${API_BASE}/api/calculate-loan`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loan_amount: Number(loanAmount), interest_rate: Number(interestRate), tenure_years: Number(tenureYears) })
      })
      if (!res.ok) throw new Error('Failed to calculate loan')
      const data = await res.json()
      setCalculationResults(data)

      const riskRes = await fetch(`${API_BASE}/api/risk-score`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monthly_income: Number(monthlyIncome), existing_emi: Number(existingEmi), new_loan_emi: data.emi, credit_score: Number(creditScore) })
      })
      if (!riskRes.ok) throw new Error('Failed to calculate risk')
      const riskData = await riskRes.json()
      setRiskAnalysis(riskData)

      const bankRes = await fetch(`${API_BASE}/api/bank-comparison`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loan_amount: Number(loanAmount),
          tenure_years: Number(tenureYears),
          credit_score: Number(creditScore),
          monthly_income: Number(monthlyIncome),
          existing_emi: Number(existingEmi)
        })
      })
      if (!bankRes.ok) throw new Error('Failed to fetch bank comparison')
      const bankData = await bankRes.json()
      setBankComparison(bankData)

      const burdenRes = await fetch(`${API_BASE}/api/predict-burden`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loan_amount: Number(loanAmount), interest_rate: Number(interestRate), tenure_years: Number(tenureYears), monthly_income: Number(monthlyIncome), existing_emi: Number(existingEmi), credit_score: Number(creditScore) })
      })
      if (!burdenRes.ok) throw new Error('Failed to predict burden')
      const burdenData = await burdenRes.json()
      setBurdenScore(burdenData)
      
      const amortizationRes = await fetch(`${API_BASE}/api/amortization`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loan_amount: Number(loanAmount), interest_rate: Number(interestRate), tenure_years: Number(tenureYears) })
      })
      if (!amortizationRes.ok) throw new Error('Failed to calculate amortization timeline')
      const amortizationData = await amortizationRes.json()
      setTimelineData(amortizationData.timeline)
    } catch (err) {
      console.error(err)
      alert("Error calculating loan. Please ensure backend is running.")
    } finally {
      setIsCalculating(false)
    }
  }

  const handleSimulateEarlyRepayment = async (e) => {
    e.preventDefault()
    setIsSimulating(true)
    try {
      const res = await fetch(`${API_BASE}/api/early-repayment`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loan_amount: Number(loanAmount), interest_rate: Number(interestRate), tenure_years: Number(tenureYears), extra_payment_per_month: Number(extraEmi) })
      })
      if (!res.ok) throw new Error('Failed to simulate early repayment')
      const data = await res.json()
      setEarlyRepaymentResult(data)
    } catch (err) {
      console.error(err)
      alert("Error simulating early repayment. Please ensure backend is running.")
    } finally {
      setIsSimulating(false)
    }
  }

  const handleCheckEligibility = async (e) => {
    e.preventDefault()
    setIsCheckingEligibility(true)
    try {
      const res = await fetch(`${API_BASE}/api/loan-eligibility`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monthly_income: Number(monthlyIncome), existing_emi: Number(existingEmi), interest_rate: Number(interestRate), tenure_years: Number(tenureYears), credit_score: Number(creditScore) })
      })
      if (!res.ok) throw new Error('Failed to check loan eligibility')
      const data = await res.json()
      setEligibilityResult(data)
    } catch (err) {
      console.error(err)
      alert("Error estimating loan eligibility. Please ensure backend is running.")
    } finally {
      setIsCheckingEligibility(false)
    }
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} status={status} error={error}>
      {activeTab === 'dashboard' && (
        <div className="flex flex-col gap-6">
          <div className="mb-2">
            <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
            <p className="text-slate-500 mt-2">Choose a module to start your loan analysis</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              onClick={() => setActiveTab('emi')}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md cursor-pointer transition flex flex-col items-start gap-4"
            >
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <span className="text-2xl">🧮</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">EMI Calculator</h3>
                <p className="text-sm text-slate-500 mt-1">Estimate monthly EMI and total interest</p>
              </div>
              <button className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors w-full text-center">
                Open Calculator
              </button>
            </div>

            <div 
              onClick={() => setActiveTab('eligibility')}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md cursor-pointer transition flex flex-col items-start gap-4"
            >
              <div className="bg-teal-100 p-3 rounded-lg text-teal-600">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Loan Eligibility</h3>
                <p className="text-sm text-slate-500 mt-1">Estimate maximum loan eligibility based on income</p>
              </div>
              <button className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors w-full text-center">
                Open Eligibility
              </button>
            </div>

            <div 
              onClick={() => setActiveTab('risk')}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md cursor-pointer transition flex flex-col items-start gap-4"
            >
              <div className="bg-amber-100 p-3 rounded-lg text-amber-600">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Risk Analysis</h3>
                <p className="text-sm text-slate-500 mt-1">Analyze loan risk using DTI and credit score</p>
              </div>
              <button className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors w-full text-center">
                Open Analysis
              </button>
            </div>

            <div 
              onClick={() => setActiveTab('bank')}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md cursor-pointer transition flex flex-col items-start gap-4"
            >
              <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                <span className="text-2xl">🏦</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Bank Comparison</h3>
                <p className="text-sm text-slate-500 mt-1">Compare loan offers across Tumakuru banks</p>
              </div>
              <button className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors w-full text-center">
                Open Comparison
              </button>
            </div>

            <div 
              onClick={() => setActiveTab('repayment')}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md cursor-pointer transition flex flex-col items-start gap-4"
            >
              <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                <span className="text-2xl">⏩</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Early Repayment</h3>
                <p className="text-sm text-slate-500 mt-1">Simulate extra payments to reduce loan tenure</p>
              </div>
              <button className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors w-full text-center">
                Open Simulation
              </button>
            </div>

            <div 
              onClick={() => setActiveTab('analytics')}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md cursor-pointer transition flex flex-col items-start gap-4"
            >
              <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
                <span className="text-2xl">📈</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Loan Analytics</h3>
                <p className="text-sm text-slate-500 mt-1">Visualize loan trends and repayment timeline</p>
              </div>
              <button className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors w-full text-center">
                Open Analytics
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'emi' && (
        <EMICalculator 
          loanAmount={loanAmount} setLoanAmount={setLoanAmount}
          interestRate={interestRate} setInterestRate={setInterestRate}
          tenureYears={tenureYears} setTenureYears={setTenureYears}
          monthlyIncome={monthlyIncome} setMonthlyIncome={setMonthlyIncome}
          existingEmi={existingEmi} setExistingEmi={setExistingEmi}
          creditScore={creditScore} setCreditScore={setCreditScore}
          isCalculating={isCalculating} handleCalculate={handleCalculate}
          calculationResults={calculationResults}
        />
      )}
      {activeTab === 'risk' && <RiskAnalysis riskAnalysis={riskAnalysis} />}
      {activeTab === 'bank' && <BankComparison bankComparison={bankComparison} />}
      {activeTab === 'analytics' && (
        <LoanAnalytics 
          loanAmount={loanAmount} 
          calculationResults={calculationResults} 
          timelineData={timelineData} 
          burdenScore={burdenScore} 
        />
      )}
      {activeTab === 'eligibility' && (
        <Eligibility
          eligIncome={monthlyIncome} setEligIncome={setMonthlyIncome}
          eligExistingEmi={existingEmi} setEligExistingEmi={setExistingEmi}
          eligRate={interestRate} setEligRate={setInterestRate}
          eligTenure={tenureYears} setEligTenure={setTenureYears}
          eligCreditScore={creditScore} setEligCreditScore={setCreditScore}
          isCheckingEligibility={isCheckingEligibility} handleCheckEligibility={handleCheckEligibility}
          eligibilityResult={eligibilityResult}
        />
      )}
      {activeTab === 'repayment' && (
        <EarlyRepayment
          extraEmi={extraEmi} setExtraEmi={setExtraEmi}
          handleSimulateEarlyRepayment={handleSimulateEarlyRepayment}
          isSimulating={isSimulating} earlyRepaymentResult={earlyRepaymentResult}
          calculationResults={calculationResults}
        />
      )}
    </Layout>
  )
}

export default App
