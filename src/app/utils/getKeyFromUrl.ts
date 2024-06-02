export function getKeyFromUrl(): string {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('key') ?? 'heart-box'
}
