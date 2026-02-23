import React from 'react';
import type { CashFlowItem } from '../types';

interface CashFlowTableProps {
  cashFlows: CashFlowItem[];
}

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

export const CashFlowTable: React.FC<CashFlowTableProps> = ({ cashFlows }) => {
  if (cashFlows.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Cash Flow Schedule</h2>
      <div className="max-h-80 overflow-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="border-b border-slate-200 px-3 py-2 font-medium text-slate-600">
                Period
              </th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium text-slate-600">
                Payment Date
              </th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium text-slate-600">
                Coupon Payment
              </th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium text-slate-600">
                Cumulative Interest
              </th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium text-slate-600">
                Remaining Principal
              </th>
            </tr>
          </thead>
          <tbody>
            {cashFlows.map((item) => {
              const date = new Date(item.paymentDate);
              const formattedDate = date.toLocaleDateString();

              return (
                <tr key={item.period} className="even:bg-slate-50/40">
                  <td className="border-b border-slate-100 px-3 py-2 text-slate-800">
                    {item.period}
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2 text-slate-800">
                    {formattedDate}
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2 text-slate-800">
                    {formatCurrency(item.couponPayment)}
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2 text-slate-800">
                    {formatCurrency(item.cumulativeInterest)}
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2 text-slate-800">
                    {formatCurrency(item.remainingPrincipal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

