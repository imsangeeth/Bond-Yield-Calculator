import React, { useState, FormEvent } from 'react';
import type { BondInput } from '../types';

interface BondFormProps {
  onSubmit: (input: BondInput) => void;
  loading: boolean;
}

export const BondForm: React.FC<BondFormProps> = ({ onSubmit, loading }) => {
  const [faceValue, setFaceValue] = useState<string>('');
  const [annualCouponRate, setAnnualCouponRate] = useState<string>('');
  const [marketPrice, setMarketPrice] = useState<string>('');
  const [yearsToMaturity, setYearsToMaturity] = useState<string>('');
  const [couponFrequency, setCouponFrequency] = useState<'1' | '2'>('2');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!faceValue || !annualCouponRate || !marketPrice || !yearsToMaturity || !couponFrequency) {
      setError('All fields are required.');
      return;
    }

    const numericFaceValue = Number(faceValue);
    const numericAnnualCouponRate = Number(annualCouponRate);
    const numericMarketPrice = Number(marketPrice);
    const numericYearsToMaturity = Number(yearsToMaturity);

    if (
      !Number.isFinite(numericFaceValue) ||
      !Number.isFinite(numericAnnualCouponRate) ||
      !Number.isFinite(numericMarketPrice) ||
      !Number.isFinite(numericYearsToMaturity)
    ) {
      setError('Please enter valid numeric values.');
      return;
    }

    if (
      numericFaceValue <= 0 ||
      numericAnnualCouponRate <= 0 ||
      numericMarketPrice <= 0 ||
      numericYearsToMaturity <= 0
    ) {
      setError('All numeric values must be positive.');
      return;
    }

    onSubmit({
      faceValue: numericFaceValue,
      annualCouponRate: numericAnnualCouponRate,
      marketPrice: numericMarketPrice,
      yearsToMaturity: numericYearsToMaturity,
      couponFrequency: couponFrequency === '1' ? 1 : 2
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">Bond Inputs</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Face Value
            <input
              type="number"
              min={0}
              step="0.01"
              value={faceValue}
              onChange={(e) => setFaceValue(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Annual Coupon Rate (%)
            <input
              type="number"
              min={0}
              step="0.01"
              value={annualCouponRate}
              onChange={(e) => setAnnualCouponRate(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Market Price
            <input
              type="number"
              min={0}
              step="0.01"
              value={marketPrice}
              onChange={(e) => setMarketPrice(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Years to Maturity
            <input
              type="number"
              min={0}
              step="0.01"
              value={yearsToMaturity}
              onChange={(e) => setYearsToMaturity(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Coupon Frequency
            <select
              value={couponFrequency}
              onChange={(e) => setCouponFrequency(e.target.value as '1' | '2')}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            >
              <option value="1">Annual (1)</option>
              <option value="2">Semi-Annual (2)</option>
            </select>
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        {loading ? 'Calculating...' : 'Calculate'}
      </button>
    </form>
  );
};

