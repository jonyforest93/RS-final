export function addDotPrice(str: number | undefined): string {
  if (typeof str === 'undefined') {
    return ''
  }
  const price = String(str)
  if (price.length < 2) {
    return price
  }
  const lastIndex = price.length - 2
  const result = `${price.slice(0, lastIndex)}.${price.slice(lastIndex)}`
  return result
}
