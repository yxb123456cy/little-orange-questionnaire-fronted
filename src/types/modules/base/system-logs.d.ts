/**
 * 系统操作日志类型定义
 */
export interface SystemLog {
  /** 日志ID，主键 */
  id: number;
  /** 操作用户ID */
  user_id?: number;
  /** 操作类型（如：create_questionnaire, delete_question等） */
  action: string;
  /** 资源类型（如：questionnaire, question, user等） */
  resource_type: string;
  /** 资源ID */
  resource_id?: number;
  /** 操作详情（JSON格式） */
  details?: Record<string, any>;
  /** IP地址 */
  ip_address?: string;
  /** 用户代理信息 */
  user_agent?: string;
  /** 创建时间 */
  created_at: string;
}