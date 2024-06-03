import { addDotPrice } from 'utils/addDotPrice'

describe('addDotPrice function', () => {
  it('should return an empty string when the input is undefined', () => {
    expect(addDotPrice(undefined)).toBe('')
  })

  it('should return the price without a dot when it has less than 2 digits', () => {
    expect(addDotPrice(5)).toBe('5')
  })

  it('should return the price with a dot separating the last 2 digits', () => {
    expect(addDotPrice(12345)).toBe('123.45')
  })

  it('should return the correct price for a larger number', () => {
    expect(addDotPrice(987654321)).toBe('9876543.21')
  })
})
