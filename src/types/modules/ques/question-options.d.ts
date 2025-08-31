/**
 * 题目选项类型定义
 */
export interface QuestionOption {
  /** 选项ID，主键 */
  id: number;
  /** 所属题目ID */
  question_id: number;
  /** 选项文本内容 */
  text: string;
  /** 选项值（用于数据统计） */
  value?: string;
  /** 选项排序顺序 */
  sort_order: number;
  /** 创建时间 */
  created_at: string;
  /** 更新时间 */
  updated_at: string;
}