export function formatYear(dateOrTimestamp: number): string {
  if (!dateOrTimestamp) return ""
  const ts = dateOrTimestamp * 1000;
      
  const d = new Date(ts)
  return isNaN(d.getTime()) ? "" : String(d.getFullYear())
}
