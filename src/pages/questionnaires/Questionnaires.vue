<script setup lang="ts">
import {
  IconApps,
  IconCalendar,
  IconCopy,
  IconDelete,
  IconEdit,
  IconEye,
  IconFolder,
  IconHeart,
  IconList,
  IconMore,
  IconPlus,
  IconSearch,
  IconUser,
} from '@arco-design/web-vue/es/icon'
import Message from '@arco-design/web-vue/es/message'
import Modal from '@arco-design/web-vue/es/modal'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import usePageState from './hooks/usePageState'

const router = useRouter()

const {
  loading,
  viewMode,
  searchKeyword,
  selectedGroup,
  selectedTags,
  selectedStatus,
  sortBy,
  currentPage,
  pageSize,
  groups,
  tags,
  questionnaires,
  tableColumns,
  filteredQuestionnaires,
  paginatedQuestionnaires,
} = usePageState()

// 方法
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

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

function handleSearch() {
  currentPage.value = 1
}

function handleFilter() {
  currentPage.value = 1
}

function createQuestionnaire() {
  router.push('/questionnaires/create')
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

function toggleStar(questionnaire: any) {
  questionnaire.is_starred = !questionnaire.is_starred
  Message.success(questionnaire.is_starred ? '已加入星标' : '已取消星标')
}

function moveToTrash(questionnaire: any) {
  Modal.confirm({
    title: '确认移至回收站？',
    content: `问卷「${questionnaire.title}」将被移至回收站，可在回收站中恢复。`,
    onOk: () => {
      const index = questionnaires.value.findIndex(q => q.id === questionnaire.id)
      if (index > -1) {
        questionnaires.value.splice(index, 1)
        Message.success('已移至回收站')
      }
    },
  })
}

// 生命周期
onMounted(() => {
  // 模拟加载数据
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<template>
  <div class="questionnaires">
    <div class="questionnaires-container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <h1 class="page-title">
            <IconList />
            我的问卷
          </h1>
          <p class="page-description">
            管理和查看您创建的所有问卷
          </p>
        </div>
        <div class="header-right">
          <a-button type="primary" size="large" class="create-btn" @click="createQuestionnaire">
            <template #icon>
              <IconPlus />
            </template>
            创建问卷
          </a-button>
        </div>
      </div>

      <!-- 筛选和搜索区域 -->
      <div class="filter-section">
        <div class="filter-row">
          <!-- 搜索框 -->
          <div class="search-box">
            <a-input-search
              v-model="searchKeyword" placeholder="搜索问卷标题或简介..." size="large" allow-clear
              @search="handleSearch" @clear="handleSearch"
            >
              <template #prefix>
                <IconSearch />
              </template>
            </a-input-search>
          </div>

          <!-- 视图切换 -->
          <div class="view-toggle">
            <a-radio-group v-model="viewMode" type="button" size="large">
              <a-radio value="card">
                <template #radio="{ checked }">
                  <a-button :type="checked ? 'primary' : 'outline'" class="view-btn">
                    <template #icon>
                      <IconApps />
                    </template>
                    卡片
                  </a-button>
                </template>
              </a-radio>
              <a-radio value="table">
                <template #radio="{ checked }">
                  <a-button :type="checked ? 'primary' : 'outline'" class="view-btn">
                    <template #icon>
                      <IconList />
                    </template>
                    表格
                  </a-button>
                </template>
              </a-radio>
            </a-radio-group>
          </div>
        </div>

        <div class="filter-row">
          <!-- 分组筛选 -->
          <div class="filter-item">
            <label class="filter-label">分组：</label>
            <a-select
              v-model="selectedGroup" placeholder="选择分组" size="large" style="width: 160px" allow-clear
              @change="handleFilter"
            >
              <a-option value="">
                全部分组
              </a-option>
              <a-option v-for="group in groups" :key="group.value" :value="group.value">
                {{ group.label }}
              </a-option>
            </a-select>
          </div>

          <!-- 标签筛选 -->
          <div class="filter-item">
            <label class="filter-label">标签：</label>
            <a-select
              v-model="selectedTags" placeholder="选择标签" size="large" style="width: 200px" multiple allow-clear
              @change="handleFilter"
            >
              <a-option v-for="tag in tags" :key="tag.value" :value="tag.value">
                {{ tag.label }}
              </a-option>
            </a-select>
          </div>

          <!-- 状态筛选 -->
          <div class="filter-item">
            <label class="filter-label">状态：</label>
            <a-select
              v-model="selectedStatus" placeholder="选择状态" size="large" style="width: 120px" allow-clear
              @change="handleFilter"
            >
              <a-option value="">
                全部状态
              </a-option>
              <a-option value="draft">
                草稿
              </a-option>
              <a-option value="published">
                已发布
              </a-option>
              <a-option value="closed">
                已关闭
              </a-option>
            </a-select>
          </div>

          <!-- 排序 -->
          <div class="filter-item">
            <label class="filter-label">排序：</label>
            <a-select v-model="sortBy" size="large" style="width: 140px" @change="handleFilter">
              <a-option value="created_desc">
                创建时间↓
              </a-option>
              <a-option value="created_asc">
                创建时间↑
              </a-option>
              <a-option value="updated_desc">
                更新时间↓
              </a-option>
              <a-option value="title_asc">
                标题A-Z
              </a-option>
            </a-select>
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
              📋
            </div>
            <h3>暂无问卷</h3>
            <p>{{ searchKeyword ? '没有找到匹配的问卷' : '开始创建您的第一份问卷吧' }}</p>
            <a-button v-if="!searchKeyword" type="primary" @click="createQuestionnaire">
              <template #icon>
                <IconPlus />
              </template>
              创建问卷
            </a-button>
          </div>
          <div v-else class="questionnaire-grid">
            <div v-for="questionnaire in paginatedQuestionnaires" :key="questionnaire.id" class="questionnaire-card">
              <div class="card-header">
                <div class="card-status">
                  <a-tag :color="getStatusColor(questionnaire.status)" class="status-tag">
                    {{ getStatusText(questionnaire.status) }}
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
                    <span>{{ formatDate(questionnaire.created_at) }}</span>
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
                    <IconEye class="stat-icon" />
                    {{ questionnaire.view_count || 0 }} 浏览
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 表格视图 -->
        <div v-else class="table-view">
          <a-table
            :columns="tableColumns" :data="paginatedQuestionnaires" :loading="loading" :pagination="false"
            row-key="id" class="questionnaire-table"
          >
            <template #title="{ record }">
              <div class="table-title" @click="previewQuestionnaire(record)">
                <span class="title-text">{{ record.title }}</span>
                <IconHeart v-if="record.is_starred" class="star-icon" :style="{ color: '#ff7a00' }" />
              </div>
            </template>

            <template #status="{ record }">
              <a-tag :color="getStatusColor(record.status)">
                {{ getStatusText(record.status) }}
              </a-tag>
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

            <template #created_at="{ record }">
              {{ formatDate(record.created_at) }}
            </template>

            <template #actions="{ record }">
              <div class="table-actions">
                <a-button type="text" size="small" :class="{ starred: record.is_starred }" @click="toggleStar(record)">
                  <template #icon>
                    <IconHeart :style="{ color: record.is_starred ? '#ff7a00' : '#999' }" />
                  </template>
                </a-button>
                <a-button type="text" size="small" @click="previewQuestionnaire(record)">
                  <template #icon>
                    <IconEye />
                  </template>
                </a-button>
                <a-button type="text" size="small" @click="editQuestionnaire(record)">
                  <template #icon>
                    <IconEdit />
                  </template>
                </a-button>
                <a-button type="text" size="small" class="danger-btn" @click="moveToTrash(record)">
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
.questionnaires {
  min-height: 100vh;
  background: #fafafa;
  padding: 40px 0;
}

.questionnaires-container {
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
}

.page-description {
  color: #666;
  margin: 0;
}

.create-btn {
  background-color: #ff7a00;
  border-color: #ff7a00;
  height: 44px;
  padding: 0 24px;
  font-weight: 500;
}

.create-btn:hover {
  background-color: #ff9500;
  border-color: #ff9500;
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
}

.questionnaire-card:hover {
  border-color: #ff7a00;
  box-shadow: 0 8px 24px rgba(255, 122, 0, 0.1);
  transform: translateY(-2px);
}

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

  .questionnaire-grid {
    grid-template-columns: 1fr;
  }

  .search-box {
    max-width: none;
  }
}

@media (max-width: 480px) {
  .questionnaire-card {
    margin: 0 -8px;
  }

  .questionnaire-meta {
    flex-direction: column;
    gap: 8px;
  }

  .questionnaire-stats {
    justify-content: space-between;
  }
}
</style>
