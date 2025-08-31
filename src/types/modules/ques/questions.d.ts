/**
 * 题目类型定义
 */
export interface Question {
  /** 题目ID，主键 */
  id: number;
  /** 所属问卷ID */
  questionnaire_id: number;
  /** 所属问卷名称（冗余字段，便于查询） */
  questionnaire_name?: string;
  /** 题目标题 */
  title: string;
  /** 题目类型：single-单选，multiple-多选，fill-填空 */
  type: 'single' | 'multiple' | 'fill';
  /** 是否必答：0-否，1-是 */
  is_required: 0 | 1;
  /** 排序顺序，数字越小越靠前 */
  sort_order: number;
  /** 填空题行数（仅填空题使用） */
  rows?: number;
  /** 填空题占位符文本（仅填空题使用） */
  placeholder?: string;
  /** 创建时间 */
  created_at: string;
  /** 更新时间 */
  updated_at: string;
}