import type { BondInput, BondResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bond-yield-calculator-production-5d73.up.railway.app';
export async function calculateBond(input: BondInput): Promise<BondResult> {
  const response = await fetch(`${API_BASE_URL}/bond/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  const data = (await response.json()) as BondResult;
  return data;
}

