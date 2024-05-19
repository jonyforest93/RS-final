export function transfromName(str: string): string {
  const arr = str.split(' ')
  if (arr.length === 1) {
    return arr.join('')
  }

  return arr
    .map((e, i) => {
      if (i > 0) {
        return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()
      }
      return e.toLowerCase()
    })
    .join('')
}
