import { shipments } from '../../lib/transportation.mjs';
export function GET() {
  const header = 'shipment,region,carrier,miles,cost_usd,on_time';
  const rows = shipments.map((row) =>
    [row.id, row.region, row.carrier, row.miles, row.cost, row.onTime].join(','),
  );
  return new Response([header, ...rows].join('\n') + '\n', {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
}
