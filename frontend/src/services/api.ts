import type { BondInput, BondResult } from '../types';

export async function calculateBond(input: BondInput): Promise<BondResult> {
  const response = await fetch('/bond/calculate', {
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

