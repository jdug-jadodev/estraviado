// Formatea un número colombiano al formato internacional +57XXXXXXXXXX
export function formatColombianPhone(phone: string): string {
  const clean = phone.replace(/[\s\-\(\)]/g, '')

  if (clean.startsWith('+57')) return clean
  if (clean.startsWith('57') && clean.length === 12) return `+${clean}`

  return `+57${clean}`
}
