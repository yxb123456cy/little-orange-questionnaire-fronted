/**
 * 问卷统计类型定义
 */
export interface QuestionnaireStatistics {
  /** 统计记录ID，主键 */
  id: number;
  /** 问卷ID */
  questionnaire_id: number;
  /** 总回答数 */
  total_responses: number;
  /** 总浏览数 */
  total_views: number;
  /** 平均完成时间（秒） */
  average_completion_time: number;
  /** 回答率（百分比） */
  response_rate: number;
  /** 最后回答时间 */
  last_response_at?: string;
  /** 统计日期 */
  statistics_date: string;
  /** 创建时间 */
  created_at: string;
  /** 更新时间 */
  updated_at: string;
}