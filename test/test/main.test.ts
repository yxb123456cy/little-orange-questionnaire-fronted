import { expect, test } from '@rstest/core'
import { sayHi } from '../func/main'

test('should sayHi correctly', () => {
  expect(sayHi()).toBe('hi')
})
