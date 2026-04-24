export function formatPrice(price?: string | null) {
  if (!price) return '';

  const clean = price.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');

  const number = clean.replace(/[^\d,]/g, '');

  return `${number} RSD`;
}
