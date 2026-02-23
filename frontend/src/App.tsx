import React, { useState } from 'react';
import type { BondInput, BondResult } from './types';
import { BondForm } from './components/BondForm';
import { ResultsCard } from './components/ResultsCard';
import { CashFlowTable } from './components/CashFlowTable';
import { calculateBond } from './services/api';

export const App: React.FC = () => {
  const [result, setResult] = useState<BondResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (input: BondInput) => {
    setLoading(true);
    setError(null);

    try {
      const data = await calculateBond(input);
      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred.';
      setError(message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-5xl px-4">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Bond Yield Calculator</h1>
          <p className="mt-1 text-sm text-slate-600">
            Compute current yield, yield to maturity, and view the projected cash flow schedule.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <BondForm onSubmit={handleSubmit} loading={loading} />
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </div>

          <div className="space-y-4 lg:col-span-2">
            <ResultsCard result={result} />
            {result && <CashFlowTable cashFlows={result.cashFlowSchedule} />}
          </div>
        </div>
      </div>
    </div>
  );
};

