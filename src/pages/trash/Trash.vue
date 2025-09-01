<script setup lang="ts">
import {
  IconApps,
  IconCalendar,
  IconDelete,
  IconEye,
  IconFolder,
  IconList,
  IconMore,
  IconRefresh,
  IconSearch,
  IconUser,
} from '@arco-design/web-vue/es/icon'
import Message from '@arco-design/web-vue/es/message'
import Modal from '@arco-design/web-vue/es/modal'

import { onMounted } from 'vue'
import QuestionnairePageHeader from '../../components/business/questionnaire-page-header/QuestionnairePageHeader.vue'
import usePageState from './hooks/usePageState'

const {
  loading,
  viewMode,
  searchKeyword,
  deletedTimeFilter,
  sortBy,
  currentPage,
  pageSize,
  selectedItems,
  questionnaires,
  tableColumns,
  filteredQuestionnaires,
  paginatedQuestionnaires,
} = usePageState()

// 方法
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

function handleSearch() {
  currentPage.value = 1
}

function handleFilter() {
  currentPage.value = 1
}

function handleSelectChange() {
  // 处理选择变化
}

function handleTableSelectionChange(selectedRowKeys: (string | number)[]) {
  selectedItems.value = selectedRowKeys as number[]
}

function previewQuestionnaire(questionnaire: any) {
  console.warn('预览问卷:', questionnaire)
  Message.info(`预览问卷：${questionnaire.title}`)
}

function restoreQuestionnaire(questionnaire: any) {
  Modal.confirm({
    title: '确认恢复问卷？',
    content: `问卷「${questionnaire.title}」将被恢复到我的问卷中。`,
    onOk: () => {
      const index = questionnaires.value.findIndex(q => q.id === questionnaire.id)
      if (index > -1) {
        questionnaires.value.splice(index, 1)
        selectedItems.value = selectedItems.value.filter(id => id !== questionnaire.id)
        Message.success('问卷已恢复')
      }
    },
  })
}

function permanentDelete(questionnaire: any) {
  Modal.error({
    title: '确认永久删除？',
    content: `问卷「${questionnaire.title}」将被永久删除，此操作无法撤销！`,
    onOk: () => {
      const index = questionnaires.value.findIndex(q => q.id === questionnaire.id)
      if (index > -1) {
        questionnaires.value.splice(index, 1)
        selectedItems.value = selectedItems.value.filter(id => id !== questionnaire.id)
        Message.success('问卷已永久删除')
      }
    },
  })
}

function batchRestore() {
  Modal.confirm({
    title: `确认恢复 ${selectedItems.value.length} 个问卷？`,
    content: '选中的问卷将被恢复到我的问卷中。',
    onOk: () => {
      questionnaires.value = questionnaires.value.filter(q => !selectedItems.value.includes(q.id))
      const count = selectedItems.value.length
      selectedItems.value = []
      Message.success(`已恢复 ${count} 个问卷`)
    },
  })
}

function batchDelete() {
  Modal.error({
    title: `确认永久删除 ${selectedItems.value.length} 个问卷？`,
    content: '选中的问卷将被永久删除，此操作无法撤销！',
    onOk: () => {
      questionnaires.value = questionnaires.value.filter(q => !selectedItems.value.includes(q.id))
      const count = selectedItems.value.length
      selectedItems.value = []
      Message.success(`已永久删除 ${count} 个问卷`)
    },
  })
}

function clearAll() {
  Modal.error({
    title: '确认清空回收站？',
    content: '回收站中的所有问卷将被永久删除，此操作无法撤销！',
    onOk: () => {
      questionnaires.value = []
      selectedItems.value = []
      Message.success('回收站已清空')
    },
  })
}

// 生命周期
onMounted(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<template>
  <div class="trash">
    <div class="trash-container">
      <!-- 页面头部 -->
      <QuestionnairePageHeader
        ben-type="primary" btn-text="清空回收站" description=" 管理已删除的问卷，可恢复或永久删除" title="回收问卷"
        is-remove :btn-disabled="filteredQuestionnaires.length === 0" @click="clearAll"
      >
        <template #titleIcon>
          <IconDelete class="title-icon" />
        </template>
        <template #btnIcon>
          <IconDelete />
        </template>
      </QuestionnairePageHeader>

      <!-- 筛选和搜索区域 -->
      <div class="filter-section">
        <div class="filter-row">
          <!-- 搜索框 -->
          <div class="search-box">
            <a-input-search
              v-model="searchKeyword" placeholder="搜索已删除的问卷..." size="large" allow-clear
              @search="handleSearch" @clear="handleSearch"
            >
              <template #prefix>
                <IconSearch />
              </template>
            </a-input-search>
          </div>

          <!-- 视图切换 -->
          <div class="view-toggle">
            <!-- //@change="(value:string) => handleViewModechanged(value)" -->
            <a-radio-group v-model="viewMode" size="large">
              <a-radio value="card">
                <IconApps /> 卡片
              </a-radio>
              <a-radio value="table">
                <IconList /> 表格
              </a-radio>
            </a-radio-group>
          </div>
        </div>

        <div class="filter-row">
          <!-- 删除时间筛选 -->
          <div class="filter-item">
            <label class="filter-label">删除时间：</label>
            <a-select
              v-model="deletedTimeFilter" placeholder="选择时间范围" size="large" style="width: 160px" allow-clear
              @change="handleFilter"
            >
              <a-option value="">
                全部时间
              </a-option>
              <a-option value="today">
                今天
              </a-option>
              <a-option value="week">
                最近一周
              </a-option>
              <a-option value="month">
                最近一月
              </a-option>
            </a-select>
          </div>

          <!-- 排序 -->
          <div class="filter-item">
            <label class="filter-label">排序：</label>
            <a-select v-model="sortBy" size="large" style="width: 140px" @change="handleFilter">
              <a-option value="deleted_desc">
                删除时间↓
              </a-option>
              <a-option value="deleted_asc">
                删除时间↑
              </a-option>
              <a-option value="title_asc">
                标题A-Z
              </a-option>
            </a-select>
          </div>

          <!-- 批量操作 -->
          <div v-if="selectedItems.length > 0" class="batch-actions">
            <span class="selected-count">已选择 {{ selectedItems.length }} 项</span>
            <a-button type="primary" class="batch-btn" @click="batchRestore">
              <template #icon>
                <IconRefresh />
              </template>
              批量恢复
            </a-button>
            <a-button type="outline" status="danger" class="batch-btn" @click="batchDelete">
              <template #icon>
                <IconDelete />
              </template>
              永久删除
            </a-button>
          </div>
        </div>
      </div>

      <!-- 问卷列表 -->
      <div class="questionnaires-content">
        <!-- 卡片视图 -->
        <div v-if="viewMode === 'card'" class="card-view">
          <div v-if="loading" class="loading-state">
            <a-spin size="large" />
            <p>加载中...</p>
          </div>
          <div v-else-if="filteredQuestionnaires.length === 0" class="empty-state">
            <div class="empty-icon">
              🗑️
            </div>
            <h3>回收站为空</h3>
            <p>{{ searchKeyword ? '没有找到匹配的问卷' : '回收站中暂无问卷' }}</p>
          </div>
          <div v-else class="questionnaire-grid">
            <div
              v-for="questionnaire in paginatedQuestionnaires" :key="questionnaire.id" class="questionnaire-card"
              :class="{ selected: selectedItems.includes(questionnaire.id) }"
            >
              <div class="card-header">
                <div class="card-checkbox">
                  <a-checkbox v-model="selectedItems" :value="questionnaire.id" @change="handleSelectChange" />
                </div>
                <div class="card-status">
                  <a-tag color="red" class="deleted-tag">
                    已删除
                  </a-tag>
                  <div class="card-actions">
                    <a-dropdown trigger="click">
                      <a-button type="text" size="small">
                        <template #icon>
                          <IconMore />
                        </template>
                      </a-button>
                      <template #content>
                        <a-doption @click="restoreQuestionnaire(questionnaire)">
                          <template #icon>
                            <IconRefresh />
                          </template>
                          恢复问卷
                        </a-doption>
                        <a-doption @click="previewQuestionnaire(questionnaire)">
                          <template #icon>
                            <IconEye />
                          </template>
                          预览
                        </a-doption>
                        <a-doption class="danger-option" @click="permanentDelete(questionnaire)">
                          <template #icon>
                            <IconDelete />
                          </template>
                          永久删除
                        </a-doption>
                      </template>
                    </a-dropdown>
                  </div>
                </div>
              </div>

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
                    <span>删除于 {{ formatDate(questionnaire.deleted_at) }}</span>
                  </div>
                </div>

                <div v-if="questionnaire.tags && questionnaire.tags.length > 0" class="questionnaire-tags">
                  <a-tag v-for="tag in questionnaire.tags" :key="tag" size="small" class="tag">
                    {{ tag }}
                  </a-tag>
                </div>
              </div>

              <div class="card-footer">
                <div class="questionnaire-stats">
                  <span class="stat-item">
                    <IconUser class="stat-icon" />
                    {{ questionnaire.response_count || 0 }} 回答
                  </span>
                  <span class="stat-item">
                    <IconCalendar class="stat-icon" />
                    创建于 {{ formatDate(questionnaire.created_at) }}
                  </span>
                </div>
                <div class="restore-actions">
                  <a-button type="primary" size="small" @click="restoreQuestionnaire(questionnaire)">
                    <template #icon>
                      <IconRefresh />
                    </template>
                    恢复
                  </a-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 表格视图 -->
        <div v-else class="table-view">
          <a-table
            :columns="tableColumns" :data="paginatedQuestionnaires" :loading="loading" :pagination="false"
            row-key="id" :row-selection="{
              type: 'checkbox',
              selectedRowKeys: selectedItems,
              onSelectionChange: handleTableSelectionChange,
            }" class="questionnaire-table"
          >
            <template #title="{ record }">
              <div class="table-title" @click="previewQuestionnaire(record)">
                <span class="title-text">{{ record.title }}</span>
              </div>
            </template>

            <template #deleted_at="{ record }">
              {{ formatDate(record.deleted_at) }}
            </template>

            <template #created_at="{ record }">
              {{ formatDate(record.created_at) }}
            </template>

            <template #tags="{ record }">
              <div class="table-tags">
                <a-tag v-for="tag in (record.tags || []).slice(0, 2)" :key="tag" size="small">
                  {{ tag }}
                </a-tag>
                <span v-if="record.tags && record.tags.length > 2" class="more-tags">
                  +{{ record.tags.length - 2 }}
                </span>
              </div>
            </template>

            <template #actions="{ record }">
              <div class="table-actions">
                <a-button type="text" size="small" class="restore-btn" @click="restoreQuestionnaire(record)">
                  <template #icon>
                    <IconRefresh />
                  </template>
                </a-button>
                <a-button type="text" size="small" @click="previewQuestionnaire(record)">
                  <template #icon>
                    <IconEye />
                  </template>
                </a-button>
                <a-button type="text" size="small" class="danger-btn" @click="permanentDelete(record)">
                  <template #icon>
                    <IconDelete />
                  </template>
                </a-button>
              </div>
            </template>
          </a-table>
        </div>

        <!-- 分页 -->
        <div v-if="filteredQuestionnaires.length > 0" class="pagination-wrapper">
          <a-pagination
            v-model:current="currentPage" v-model:page-size="pageSize"
            :total="filteredQuestionnaires.length" :show-total="true" :show-jumper="true" :show-page-size="true"
            :page-size-options="['10', '20', '50', '100']" class="pagination"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trash {
  min-height: 100vh;
  background: #fafafa;
  padding: 40px 0;
}

.trash-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  color: #f53f3f;
  font-size: 28px;
}

.page-description {
  color: #666;
  margin: 0;
}

.clear-btn {
  border-color: #f53f3f;
  color: #f53f3f;
  height: 44px;
  padding: 0 24px;
  font-weight: 500;
}

.clear-btn:hover:not(:disabled) {
  border-color: #f76965;
  color: #f76965;
  background: #fff2f0;
}

.clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 筛选区域 */
.filter-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}

.filter-row:last-child {
  margin-bottom: 0;
}

.search-box {
  flex: 1;
  max-width: 400px;
}

.view-toggle .view-btn {
  border-color: #ff7a00;
  color: #ff7a00;
}

.view-toggle .view-btn:hover {
  border-color: #ff9500;
  color: #ff9500;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-weight: 500;
  color: #666;
  white-space: nowrap;
}

.batch-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.selected-count {
  font-size: 14px;
  color: #666;
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 6px;
}

.batch-btn {
  height: 32px;
  padding: 0 16px;
}

/* 卡片视图 */
.card-view {
  min-height: 400px;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 8px;
}

.empty-state p {
  color: #666;
  margin-bottom: 24px;
}

.questionnaire-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}

.questionnaire-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
  overflow: hidden;
  position: relative;
}

.questionnaire-card:hover {
  border-color: #ff7a00;
  box-shadow: 0 8px 24px rgba(255, 122, 0, 0.1);
  transform: translateY(-2px);
}

.questionnaire-card.selected {
  border-color: #ff7a00;
  box-shadow: 0 4px 16px rgba(255, 122, 0, 0.2);
}

.questionnaire-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #f53f3f;
}

.card-header {
  padding: 16px 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-checkbox {
  margin-top: 4px;
}

.card-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.deleted-tag {
  background: #fff2f0;
  border-color: #f53f3f;
  color: #f53f3f;
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
  flex-direction: column;
  gap: 8px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.questionnaire-stats {
  display: flex;
  flex-direction: column;
  gap: 4px;
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

.restore-actions {
  flex-shrink: 0;
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

.restore-btn {
  color: #52c41a;
}

.restore-btn:hover {
  color: #73d13d;
}

.danger-btn:hover {
  color: #f53f3f;
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
  .trash-container {
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

  .questionnaire-grid {
    grid-template-columns: 1fr;
  }

  .search-box {
    max-width: none;
  }

  .batch-actions {
    margin-left: 0;
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 480px) {
  .questionnaire-card {
    margin: 0 -8px;
  }

  .card-footer {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
}
</style>
