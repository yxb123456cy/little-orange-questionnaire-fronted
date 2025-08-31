export function GetRandom7DigitNumber(): number {
  // 生成范围 1000000 - 9999999
  const res = Math.floor(1000000 + Math.random() * 9000000)
  console.warn('生成的7位随机数为:', res) // 例如：4839201
  return res
}
// 在test目录中进行测试;
