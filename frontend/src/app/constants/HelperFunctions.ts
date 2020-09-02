export function toDate(isoString: string): string {
  return isoString.split('T')[0];
}
