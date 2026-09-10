/** All records are intentionally synthetic and deterministic. No employer data. */
export const regions = ['East', 'Central', 'West'];
export const shipments = Array.from({ length: 24 }, (_, i) => ({
  id: `DEMO-${String(i + 1).padStart(3, '0')}`,
  region: regions[i % 3],
  carrier: `Demo carrier ${String.fromCharCode(65 + (i % 4))}`,
  miles: 180 + ((i * 137) % 1100),
  cost: Math.round((180 + ((i * 137) % 1100)) * (1.95 + (i % 5) * 0.17) + 95),
  onTime: i % 7 !== 0,
}));
/** @param {typeof shipments} records */
export function summarize(records) {
  const cost = records.reduce((sum, record) => sum + record.cost, 0);
  const miles = records.reduce((sum, record) => sum + record.miles, 0);
  return {
    count: records.length,
    cost,
    miles,
    costPerMile: miles ? cost / miles : 0,
    onTime: records.length
      ? (records.filter((record) => record.onTime).length / records.length) * 100
      : 0,
  };
}
/** @param {{miles:number, rate:number, fuelPercent:number, additional:number}} input */
export function calculateCost({ miles, rate, fuelPercent, additional }) {
  if (
    ![miles, rate, fuelPercent, additional].every(Number.isFinite) ||
    miles <= 0 ||
    miles > 10000 ||
    rate < 0 ||
    rate > 100 ||
    fuelPercent < 0 ||
    fuelPercent > 100 ||
    additional < 0 ||
    additional > 100000
  )
    throw new RangeError('Enter valid values within the displayed limits.');
  const linehaul = miles * rate;
  const fuel = (linehaul * fuelPercent) / 100;
  const total = linehaul + fuel + additional;
  return { linehaul, fuel, total, perMile: total / miles };
}
export const dollars = (/** @type {number} */ value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
