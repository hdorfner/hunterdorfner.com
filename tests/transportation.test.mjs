import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateCost, summarize, shipments, regions } from '../src/lib/transportation.mjs';

test('calculator includes fuel on linehaul and additional charges', () => {
  assert.deepEqual(calculateCost({ miles: 500, rate: 2.25, fuelPercent: 20, additional: 75 }), {
    linehaul: 1125,
    fuel: 225,
    total: 1425,
    perMile: 2.85,
  });
});
test('zero surcharges and zero rate remain valid', () => {
  assert.equal(calculateCost({ miles: 100, rate: 0, fuelPercent: 0, additional: 75 }).total, 75);
});
test('invalid distances and invalid numeric input are rejected', () => {
  const valid = { miles: 500, rate: 2.25, fuelPercent: 20, additional: 75 };
  for (const input of [
    { miles: 0 },
    { miles: -1 },
    { miles: Infinity },
    { miles: 10001 },
    { rate: NaN },
    { rate: -1 },
    { rate: 101 },
    { fuelPercent: 101 },
    { additional: -1 },
    { additional: 100001 },
  ])
    assert.throws(() => calculateCost({ ...valid, ...input }), RangeError);
});
test('cost per mile is weighted by mileage and service is counted', () => {
  const data = [
    { miles: 100, cost: 300, onTime: true },
    { miles: 900, cost: 1800, onTime: false },
  ];
  assert.deepEqual(summarize(data), {
    count: 2,
    cost: 2100,
    miles: 1000,
    costPerMile: 2.1,
    onTime: 50,
  });
});
test('empty summaries avoid NaN and division by zero', () => {
  assert.deepEqual(summarize([]), { count: 0, cost: 0, miles: 0, costPerMile: 0, onTime: 0 });
});
test('region filtering reconciles to the complete synthetic dataset', () => {
  assert.equal(shipments.length, 24);
  assert.equal(new Set(shipments.map((row) => row.id)).size, 24);
  assert.equal(summarize(shipments).onTime, (20 / 24) * 100);
  const groups = regions.map((region) =>
    summarize(shipments.filter((row) => row.region === region)),
  );
  assert.ok(groups.every((group) => group.count === 8));
  assert.equal(
    groups.reduce((total, group) => total + group.cost, 0),
    summarize(shipments).cost,
  );
});
