export function formatPace(metersPerSecond: number): string {
  if (!metersPerSecond || metersPerSecond === 0) return '--:--';
  const secondsPerKm = 1000 / metersPerSecond;
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.round(secondsPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function formatDistance(meters: number): string {
  const km = meters / 1000;
  return km >= 10 ? `${km.toFixed(1)} km` : `${km.toFixed(2)} km`;
}

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
}

export function formatElevation(meters: number): string {
  return `${Math.round(meters)}m`;
}

export function getPaceColor(pace: number): string {
  // pace en segundos/km
  if (pace < 240) return '#22c55e';  // < 4:00 - verde
  if (pace < 300) return '#3b82f6';  // < 5:00 - azul
  if (pace < 360) return '#f59e0b';  // < 6:00 - amarillo
  return '#ef4444';                   // > 6:00 - rojo
}
