import { sum } from './sum'

test('should correctly add two numbers', () => {
  expect(sum(1, 2)).toBe(3)
  expect(sum(-1, 2)).toBe(1)
  expect(sum(0, 0)).toBe(0)
})
