<script setup lang="ts">
import type { QuestionnaireBaseDetails, QuestionnaireTableProps } from './types'
import {
  IconCopy,
  IconDelete,
  IconEdit,
  IconEye,
  IconHeart,
  IconMore,
  IconRefresh,
} from '@arco-design/web-vue/es/icon'
import { computed, ref } from 'vue'

defineOptions({ name: 'QuestionnaireTable' })

// Props定义
const props = withDefaults(defineProps<QuestionnaireTableProps>(), {
  loading: false,
  pagination: () => ({ current: 1, pageSize: 10, total: 0 }),
  rowSelection: undefined,
})

// 事件定义
const emits = defineEmits(['preview', 'edit', 'duplicate', 'toggleStar', 'remove', 'restore', 'permanentDelete'])

interface BaseColumnType {
  title?: string
  dataIndex?: string
  slotName?: string
  width?: number
  ellipsis?: boolean
  fixed?: string
  render?: any
}
// 表格列配置
const columns = computed(() => {
  const baseColumns = ref<BaseColumnType[]>(
    [
      {
        title: '问卷标题',
        dataIndex: 'title',
        slotName: 'title',
        width: 300,
        ellipsis: true,
        fixed: '',
      },
      {
        title: '状态',
        dataIndex: 'status',
        slotName: 'status',
        width: 100,
        fixed: '',
      },
      {
        title: '分组',
        dataIndex: 'group',
        width: 120,
        fixed: '',
        render: ({ record }: any) => record.group || '未分组',
      },
      {
        title: '标签',
        dataIndex: 'tags',
        slotName: 'tags',
        width: 150,
        fixed: '',
      },
      {
        title: '回答数',
        dataIndex: 'response_count',
        width: 100,
        fixed: '',
        render: ({ record }: any) => record.response_count || 0,
      },
      {
        title: '浏览数',
        dataIndex: 'view_count',
        width: 100,
        fixed: '',
        render: ({ record }: any) => record.view_count || 0,
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        slotName: 'created_at',
        width: 120,
        fixed: '',
      },
    ],
  )

  // 如果有deleted_at字段，添加删除时间列
  if (props.questionnaires.some(q => q.deleted_at)) {
    baseColumns.value.splice(-1, 0, {
      title: '删除时间',
      dataIndex: 'deleted_at',
      slotName: 'deleted_at',
      width: 120,
      fixed: '',
    })
  }

  // 添加操作列
  baseColumns.value.push({
    title: '操作',
    slotName: 'actions',
    width: 150,
    fixed: 'right',
  })

  return baseColumns
})

// 工具函数
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

function formatDate(dateString: string) {
  if (!dateString)
    return '-'
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 事件处理函数
function handlePreview(questionnaire: QuestionnaireBaseDetails) {
  emits('preview', questionnaire)
}

function handleEdit(questionnaire: QuestionnaireBaseDetails) {
  emits('edit', questionnaire)
}

function handleDuplicate(questionnaire: QuestionnaireBaseDetails) {
  emits('duplicate', questionnaire)
}

function handleToggleStar(questionnaire: QuestionnaireBaseDetails) {
  emits('toggleStar', questionnaire)
}

function handleRemove(questionnaire: QuestionnaireBaseDetails) {
  emits('remove', questionnaire)
}

function handleRestore(questionnaire: QuestionnaireBaseDetails) {
  emits('restore', questionnaire)
}

function handlePermanentDelete(questionnaire: QuestionnaireBaseDetails) {
  emits('permanentDelete', questionnaire)
}

// 判断是否为回收站模式
const isTrashMode = computed(() => {
  return props.questionnaires.some(q => q.deleted_at)
})

// 暴露给父组件
defineExpose({
  getStatusColor,
  getStatusText,
  formatDate,
})
</script>

<template>
  <div class="questionnaire-table-container">
    <a-table
      :columns="columns"
      :data="questionnaires"
      :loading="loading"
      :pagination="false"
      :row-selection="rowSelection"
      row-key="id"
      class="questionnaire-table"
      :scroll="{ x: 1200 }"
    >
      <!-- 标题列 -->
      <template #title="{ record }">
        <div class="table-title" @click="handlePreview(record)">
          <span class="title-text" :title="record.title">{{ record.title }}</span>
          <IconHeart
            v-if="record.is_starred"
            class="star-icon"
            :style="{ color: '#ff7a00' }"
          />
        </div>
      </template>

      <!-- 状态列 -->
      <template #status="{ record }">
        <a-tag :color="getStatusColor(record.status)" class="status-tag">
          {{ getStatusText(record.status) }}
        </a-tag>
      </template>

      <!-- 标签列 -->
      <template #tags="{ record }">
        <div class="table-tags">
          <template v-if="record.tags && record.tags.length > 0">
            <a-tag
              v-for="tag in record.tags.slice(0, 2)"
              :key="tag"
              size="small"
              class="tag"
            >
              {{ tag }}
            </a-tag>
            <span v-if="record.tags.length > 2" class="more-tags">
              +{{ record.tags.length - 2 }}
            </span>
          </template>
          <span v-else class="no-tags">-</span>
        </div>
      </template>

      <!-- 创建时间列 -->
      <template #created_at="{ record }">
        <span class="date-text">{{ formatDate(record.created_at) }}</span>
      </template>

      <!-- 删除时间列 -->
      <template #deleted_at="{ record }">
        <span class="date-text deleted-date">{{ formatDate(record.deleted_at) }}</span>
      </template>

      <!-- 操作列 -->
      <template #actions="{ record }">
        <div class="table-actions">
          <!-- 普通模式操作 -->
          <template v-if="!isTrashMode">
            <a-button
              type="text"
              size="small"
              :class="{ starred: record.is_starred }"
              class="action-btn"
              @click="handleToggleStar(record)"
            >
              <template #icon>
                <IconHeart :style="{ color: record.is_starred ? '#ff7a00' : '#999' }" />
              </template>
            </a-button>
            <a-button type="text" size="small" class="action-btn" @click="handlePreview(record)">
              <template #icon>
                <IconEye />
              </template>
            </a-button>
            <a-button type="text" size="small" class="action-btn" @click="handleEdit(record)">
              <template #icon>
                <IconEdit />
              </template>
            </a-button>
            <a-dropdown trigger="click">
              <a-button type="text" size="small" class="action-btn">
                <template #icon>
                  <IconMore />
                </template>
              </a-button>
              <template #content>
                <a-doption @click="handleDuplicate(record)">
                  <template #icon>
                    <IconCopy />
                  </template>
                  复制
                </a-doption>
                <a-doption class="danger-option" @click="handleRemove(record)">
                  <template #icon>
                    <IconDelete />
                  </template>
                  移至回收站
                </a-doption>
              </template>
            </a-dropdown>
          </template>

          <!-- 回收站模式操作 -->
          <template v-else>
            <a-button
              type="text"
              size="small"
              class="action-btn restore-btn"
              @click="handleRestore(record)"
            >
              <template #icon>
                <IconRefresh />
              </template>
            </a-button>
            <a-button type="text" size="small" class="action-btn" @click="handlePreview(record)">
              <template #icon>
                <IconEye />
              </template>
            </a-button>
            <a-button
              type="text"
              size="small"
              class="action-btn danger-btn"
              @click="handlePermanentDelete(record)"
            >
              <template #icon>
                <IconDelete />
              </template>
            </a-button>
          </template>
        </div>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.questionnaire-table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.questionnaire-table {
  background: white;
}

/* 标题列样式 */
.table-title {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.title-text {
  font-weight: 500;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  transition: color 0.2s;
}

.title-text:hover {
  color: #ff7a00;
}

.star-icon {
  font-size: 14px;
  flex-shrink: 0;
}

/* 状态标签样式 */
.status-tag {
  font-size: 12px;
  border-radius: 4px;
}

/* 标签列样式 */
.table-tags {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.tag {
  background: #fff7f0;
  border-color: #ff7a00;
  color: #ff7a00;
  font-size: 12px;
}

.more-tags {
  font-size: 12px;
  color: #999;
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
}

.no-tags {
  color: #ccc;
  font-size: 12px;
}

/* 日期文本样式 */
.date-text {
  font-size: 12px;
  color: #666;
}

.deleted-date {
  color: #f53f3f;
}

/* 操作按钮样式 */
.table-actions {
  display: flex;
  gap: 4px;
  align-items: center;
}

.action-btn {
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: 6px;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #f5f5f5;
}

.starred {
  color: #ff7a00;
}

.starred:hover {
  background: #fff7f0;
}

.restore-btn {
  color: #52c41a;
}

.restore-btn:hover {
  background: #f6ffed;
  color: #73d13d;
}

.danger-btn:hover {
  background: #fff2f0;
  color: #f53f3f;
}

.danger-option {
  color: #f53f3f;
}

.danger-option:hover {
  background: #fff2f0;
}

/* 表格行样式 */
:deep(.arco-table-tbody .arco-table-tr:hover) {
  background: #fff7f0;
}

:deep(.arco-table-tbody .arco-table-tr:hover .title-text) {
  color: #ff7a00;
}

/* 表格头部样式 */
:deep(.arco-table-thead .arco-table-th) {
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 600;
  color: #333;
}

/* 表格边框样式 */
:deep(.arco-table-border .arco-table-container) {
  border: 1px solid #f0f0f0;
}

:deep(.arco-table-border .arco-table-cell) {
  border-right: 1px solid #f5f5f5;
}

/* 选择框样式 */
:deep(.arco-table-selection .arco-checkbox) {
  border-color: #ff7a00;
}

:deep(.arco-table-selection .arco-checkbox-checked) {
  background-color: #ff7a00;
  border-color: #ff7a00;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .table-actions {
    gap: 2px;
  }

  .action-btn {
    width: 24px;
    height: 24px;
  }

  .table-tags {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
}
</style>
