import dayjs from 'dayjs'

export function GetCurrentTime() {
  const nowStr = dayjs().format('YYYY-MM-DD HH:mm:ss')
  console.warn('生成时间:', nowStr) // "2025-09-01 21:08:15"
  return nowStr
}
// 在test目录中进行测试;
