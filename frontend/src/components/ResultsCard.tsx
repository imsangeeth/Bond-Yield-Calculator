import React from 'react';
import type { BondResult } from '../types';

interface ResultsCardProps {
  result: BondResult | null;
}

const formatPercent = (value: number): string => `${(value * 100).toFixed(2)}%`;
const formatCurrency = (value: number): string =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

export const ResultsCard: React.FC<ResultsCardProps> = ({ result }) => {
  if (!result) {
    return null;
  }

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Results</h2>

      <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-slate-500">Current Yield</dt>
          <dd className="text-base font-semibold text-slate-900">
            {formatPercent(result.currentYield)}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-slate-500">Yield to Maturity (YTM)</dt>
          <dd className="text-base font-semibold text-slate-900">
            {formatPercent(result.yieldToMaturity)}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-slate-500">Total Interest Earned</dt>
          <dd className="text-base font-semibold text-slate-900">
            {formatCurrency(result.totalInterestEarned)}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-slate-500">Price Classification</dt>
          <dd className="text-base font-semibold text-slate-900">{result.premiumOrDiscount}</dd>
        </div>
      </dl>
    </div>
  );
};

