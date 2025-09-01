<script setup lang="ts">
import type { QuestionnaireBaseDetails } from './types'
import Message from '@arco-design/web-vue/es/message'
import { useRouter } from 'vue-router'

defineOptions({ name: 'QuestionnaireCard' })
// defineProps vue3 用法
// 定义父组件传递给子组件的props;
const props = defineProps<{
  questionnaire: Partial<QuestionnaireBaseDetails>
}>()

// 子组件通知父组件相关事件;
const emits = defineEmits(['remove'])

const router = useRouter()

function getStatusColor(status: string) {
  const colorMap: Record<string, string> = {
    draft: 'gray',
    published: 'green',
    closed: 'red',
  }
  return colorMap[status] || 'gray'
}
function getStatusText(status: string) {
  const textMap: Record<string, string> = {
    draft: '草稿',
    published: '已发布',
    closed: '已关闭',
  }
  return textMap[status] || '未知'
}
function toggleStar(questionnaire: any) {
  questionnaire.is_starred = !questionnaire.is_starred
  Message.success(questionnaire.is_starred ? '已加入星标' : '已取消星标')
}
function previewQuestionnaire(questionnaire: any) {
  console.warn('预览问卷:', questionnaire)
  Message.info(`预览问卷：${questionnaire.title}`)
}
function editQuestionnaire(questionnaire: any) {
  router.push(`/questionnaires/${questionnaire.id}/edit`)
}

function duplicateQuestionnaire(questionnaire: any) {
  Message.success(`已复制问卷：${questionnaire.title}`)
}
// 通知父组件使用相关remove方法移至回收站;
function moveToTrash(questionnaire: any) {
  emits('remove', questionnaire)
}
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN')
}
// 暴露给父组件使用;
defineExpose({})
</script>

<template>
  <div class="questionnaire-card-container">
    <!-- 卡片header -->
    <div class="card-header">
      <div class="card-status">
        <a-tag :color="getStatusColor(props.questionnaire.status!)" class="status-tag">
          {{ getStatusText(props.questionnaire.status!) }}
        </a-tag>
        <div class="card-actions">
          <a-button
            type="text" size="small" :class="{ starred: questionnaire.is_starred }"
            @click="toggleStar(questionnaire)"
          >
            <template #icon>
              <IconHeart :style="{ color: questionnaire.is_starred ? '#ff7a00' : '#999' }" />
            </template>
          </a-button>
          <a-dropdown trigger="click">
            <a-button type="text" size="small">
              <template #icon>
                <IconMore />
              </template>
            </a-button>
            <template #content>
              <a-doption @click="previewQuestionnaire(questionnaire)">
                <template #icon>
                  <IconEye />
                </template>
                预览
              </a-doption>
              <a-doption @click="editQuestionnaire(questionnaire)">
                <template #icon>
                  <IconEdit />
                </template>
                编辑
              </a-doption>
              <a-doption @click="duplicateQuestionnaire(questionnaire)">
                <template #icon>
                  <IconCopy />
                </template>
                复制
              </a-doption>
              <a-doption class="danger-option" @click="moveToTrash(questionnaire)">
                <template #icon>
                  <IconDelete />
                </template>
                移至回收站
              </a-doption>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>

    <!-- 卡片正文 -->
    <div class="card-content" @click="previewQuestionnaire(questionnaire)">
      <h3 class="questionnaire-title">
        {{ questionnaire.title }}
      </h3>
      <p class="questionnaire-description">
        {{ questionnaire.description || '暂无简介' }}
      </p>

      <div class="questionnaire-meta">
        <div class="meta-item">
          <IconFolder class="meta-icon" />
          <span>{{ questionnaire.group || '未分组' }}</span>
        </div>
        <div class="meta-item">
          <IconCalendar class="meta-icon" />
          <span>{{ formatDate(questionnaire.created_at!) }}</span>
        </div>
      </div>

      <div v-if="questionnaire.tags && questionnaire.tags.length > 0" class="questionnaire-tags">
        <a-tag v-for="tag in questionnaire.tags" :key="tag" size="small" class="tag">
          {{ tag }}
        </a-tag>
      </div>
    </div>

    <!-- 卡片footer -->
    <div class="card-footer">
      <div class="questionnaire-stats">
        <span class="stat-item">
          <IconUser class="stat-icon" />
          {{ questionnaire.response_count || 0 }} 回答
        </span>
        <span class="stat-item">
          <IconEye class="stat-icon" />
          {{ questionnaire.view_count || 0 }} 浏览
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  padding: 16px 20px 0;
}

.card-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-actions {
  display: flex;
  gap: 4px;
}

.card-content {
  padding: 16px 20px;
  cursor: pointer;
}

.questionnaire-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  /* -webkit-line-clamp: 2; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.questionnaire-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  /* -webkit-line-clamp: 2; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.questionnaire-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
}

.meta-icon {
  font-size: 12px;
}

.questionnaire-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.tag {
  background: #fff7f0;
  border-color: #ff7a00;
  color: #ff7a00;
}

.card-footer {
  padding: 0 20px 16px;
  border-top: 1px solid #f5f5f5;
  margin-top: 12px;
  padding-top: 12px;
}

.questionnaire-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
}

.stat-icon {
  font-size: 12px;
}

/* 表格视图 */
.questionnaire-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.table-title {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-text {
  font-weight: 500;
  color: #333;
}

.title-text:hover {
  color: #ff7a00;
}

.star-icon {
  font-size: 14px;
}

.table-tags {
  display: flex;
  align-items: center;
  gap: 4px;
}

.more-tags {
  font-size: 12px;
  color: #999;
}

.table-actions {
  display: flex;
  gap: 4px;
}

.danger-btn:hover {
  color: #f53f3f;
}

.starred {
  color: #ff7a00;
}

.danger-option {
  color: #f53f3f;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.pagination {
  background: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .questionnaires-container {
    padding: 0 16px;
  }

  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .filter-row {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .filter-item {
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
  }

  .search-box {
    max-width: none;
  }
}

@media (max-width: 480px) {

  .questionnaire-meta {
    flex-direction: column;
    gap: 8px;
  }

  .questionnaire-stats {
    justify-content: space-between;
  }
}
</style>
