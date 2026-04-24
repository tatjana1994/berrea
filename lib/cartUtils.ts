export function parsePriceToNumber(price?: string | null): number {
  if (!price) return 0;
  // WP često vraća string tipa "€12.00" ili "12,00 €"
  const normalized = price
    .replace(/\s/g, '')
    .replace(',', '.')
    .replace(/[^0-9.]/g, '');
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

export function formatMoney(n: number, currency = 'EUR') {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency}`;
  }
}
