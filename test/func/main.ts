import CryptoJS from 'crypto-js'

export const sayHi = () => 'hi'
export function EncryptPasswordMD5(password: string): string {
  return CryptoJS.MD5(password).toString()
}
