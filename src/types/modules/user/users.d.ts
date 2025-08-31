/**
 * 用户类型定义
 */
export interface User {
  /** 用户ID，主键 */
  id: number
  /** 用户名，唯一 */
  username: string
  /** 邮箱地址，唯一 */
  email: string
  /** 密码哈希值 */
  password_hash: string
  /** 头像URL */
  avatar?: string
  /** 用户角色：admin-管理员，user-普通用户 */
  role: 'admin' | 'user'
  /** 用户状态：0-禁用，1-启用 */
  status: 0 | 1
  /** 最后登录时间 */
  last_login_at?: string
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
  /** tokenValue */
  token?: string
}
