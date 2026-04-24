export function parsePriceToNumber(price?: string | null) {
  if (!price) return 0;

  const clean = price
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s/g, '')
    .replace(/[^\d,.]/g, '');

  const normalized = clean.replace(/\./g, '').replace(',', '.');

  const value = Number(normalized);

  return Number.isNaN(value) ? 0 : value;
}

export function formatRsdPrice(value: number) {
  return `${value.toLocaleString('sr-RS', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} RSD`;
}
