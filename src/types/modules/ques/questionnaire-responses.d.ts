/**
 * 问卷回答记录类型定义
 */
export interface QuestionnaireResponse {
  /** 回答记录ID，主键 */
  id: number;
  /** 问卷ID */
  questionnaire_id: number;
  /** 回答者标识（可以是用户ID或匿名标识） */
  respondent_id?: string;
  /** 回答者类型：user-注册用户，anonymous-匿名用户 */
  respondent_type: 'user' | 'anonymous';
  /** 完成时间（秒） */
  completion_time: number;
  /** IP地址 */
  ip_address?: string;
  /** 用户代理信息 */
  user_agent?: string;
  /** 提交时间 */
  submitted_at: string;
  /** 创建时间 */
  created_at: string;
}