/**
 * 题目回答详情类型定义
 */
export interface QuestionResponse {
  /** 题目回答ID，主键 */
  id: number;
  /** 问卷回答记录ID */
  questionnaire_response_id: number;
  /** 题目ID */
  question_id: number;
  /** 题目类型 */
  question_type: 'single' | 'multiple' | 'fill';
  /** 回答内容（填空题使用） */
  answer_text?: string;
  /** 选择的选项ID数组（单选题和多选题使用） */
  answer_option_ids?: number[];
  /** 回答时间 */
  answered_at: string;
}