/**
 * Convierte minutos a formato legible "Xh Ym"
 * 
 * @param minutes - Duración en minutos
 * @returns Duración formateada (ej: "2h 30m", "45m", "1h")
 * 
 * @example
 * formatDuration(150)  // "2h 30m"
 * formatDuration(45)   // "45m"
 * formatDuration(120)  // "2h"
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = Math.round(minutes % 60)

  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}
