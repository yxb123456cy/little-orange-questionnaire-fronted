/**
 * 用户偏好设置类型定义
 */
export interface UserPreferences {
  /** 偏好设置ID，主键 */
  id: number;
  /** 用户ID */
  user_id: number;
  /** 主题：light-浅色，dark-深色 */
  theme: 'light' | 'dark';
  /** 语言：zh-中文，en-英文 */
  language: 'zh' | 'en';
  /** 自动保存：0-关闭，1-开启 */
  auto_save: 0 | 1;
  /** 邮件通知：0-关闭，1-开启 */
  email_notifications: 0 | 1;
  /** 创建时间 */
  created_at: string;
  /** 更新时间 */
  updated_at: string;
}