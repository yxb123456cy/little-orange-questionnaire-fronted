import { expect, test } from '@rstest/core'
import { EncryptPasswordMD5 } from '../func/main'

test('should sayHi correctly', () => {
  expect(EncryptPasswordMD5('123456789')).toBe('25f9e794323b453885f5181f1b624d0b')
})
