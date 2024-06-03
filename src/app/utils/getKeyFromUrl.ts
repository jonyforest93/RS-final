export function getKeyFromUrl(): string {
  const urlPath = window.location.pathname
  const lastIndex = urlPath.lastIndexOf('/')
  return urlPath.substr(lastIndex + 1)
}
