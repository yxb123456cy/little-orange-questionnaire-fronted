/**
 * 题目统计类型定义
 */
export interface QuestionStatistics {
  /** 题目统计ID，主键 */
  id: number;
  /** 题目ID */
  question_id: number;
  /** 问卷ID */
  questionnaire_id: number;
  /** 该题目总回答数 */
  total_responses: number;
  /** 选项统计数据（key为选项ID，value为选择次数） */
  option_statistics?: Record<string, number>;
  /** 文本回答数组（填空题使用） */
  text_responses?: string[];
  /** 统计日期 */
  statistics_date: string;
  /** 创建时间 */
  created_at: string;
  /** 更新时间 */
  updated_at: string;
}