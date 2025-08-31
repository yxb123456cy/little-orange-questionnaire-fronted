/**
 * 问卷类型定义
 */
export interface Questionnaire {
  /** 问卷ID，主键 */
  id: number;
  /** 问卷标题 */
  title: string;
  /** 问卷描述 */
  description?: string;
  /** 问卷背景图片URL */
  wallpaper?: string;
  /** 是否星标：0-否，1-是 */
  is_starred: 0 | 1;
  /** 是否发布：0-未发布，1-已发布 */
  is_published: 0 | 1;
  /** 发布用户ID */
  publish_user_id: number;
  /** 发布用户名称 */
  publish_user_name: string;
  /** 发布时间 */
  published_at?: string;
  /** 是否删除：0-否，1-是（软删除） */
  is_deleted: 0 | 1;
  /** 删除时间 */
  deleted_at?: string;
  /** 浏览次数 */
  view_count: number;
  /** 回答次数 */
  response_count: number;
  /** 创建时间 */
  created_at: string;
  /** 更新时间 */
  updated_at: string;
}