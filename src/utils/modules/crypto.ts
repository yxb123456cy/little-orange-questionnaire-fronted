import CryptoJS from 'crypto-js'

/**
 * 使用 MD5 加密密码
 * @param password 原始密码
 * @returns string 加密后的字符串
 */
export function EncryptPasswordMD5(password: string): string {
  return CryptoJS.MD5(password).toString()
}

// 示例
// console.log(encryptPasswordMD5('123456')) // e10adc3949ba59abbe56e057f20f883e
