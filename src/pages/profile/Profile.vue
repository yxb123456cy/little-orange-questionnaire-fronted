<script setup lang="ts">
import {
  IconApps,
  IconBarChart,
  IconCamera,
  IconEdit,
  IconEye,
  IconFile,
  IconHeart,
  IconPlus,
  IconSettings,
} from '@arco-design/web-vue/es/icon'
import Message from '@arco-design/web-vue/es/message'
import { reactive, ref } from 'vue'

const editMode = ref(false)

const userInfo = reactive({
  username: '张三',
  email: 'zhangsan@example.com',
  avatar: '',
  bio: '热爱数据分析的产品经理',
  createdAt: '2024-01-15T08:00:00Z',
})

const userStats = reactive({
  questionnaires: 12,
  responses: 1580,
  views: 8920,
})

const formData = reactive({
  username: userInfo.username,
  email: userInfo.email,
  bio: userInfo.bio,
})

const recentActivities = ref([
  {
    id: 1,
    type: 'create',
    description: '创建了问卷「用户满意度调研」',
    createdAt: '2024-01-20T10:30:00Z',
  },
  {
    id: 2,
    type: 'view',
    description: '查看了问卷「产品体验调研」的数据分析',
    createdAt: '2024-01-19T15:20:00Z',
  },
  {
    id: 3,
    type: 'star',
    description: '收藏了模板「员工满意度调研」',
    createdAt: '2024-01-18T09:15:00Z',
  },
])

function getActivityIcon(type: string) {
  const iconMap: Record<string, any> = {
    create: IconFile,
    view: IconEye,
    star: IconHeart,
  }
  return iconMap[type] ?? IconFile
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

function formatTime(dateString: string) {
  const now = new Date()
  const date = new Date(dateString)
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0)
    return '今天'
  if (days === 1)
    return '昨天'
  if (days < 7)
    return `${days}天前`
  return formatDate(dateString)
}

function saveProfile() {
  // TODO: 实现保存逻辑
  Object.assign(userInfo, formData)
  editMode.value = false
  Message.success('个人信息已更新')
}
</script>

<template>
  <div class="profile">
    <div class="profile-container">
      <!-- 个人信息卡片 -->
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-section">
            <a-avatar :size="80" class="user-avatar">
              <img :src="userInfo.avatar || 'https://via.placeholder.com/80'" alt="用户头像">
            </a-avatar>
            <a-button type="text" class="change-avatar-btn">
              <template #icon>
                <IconCamera />
              </template>
              更换头像
            </a-button>
          </div>
          <div class="user-info">
            <h2 class="username">
              {{ userInfo.username }}
            </h2>
            <p class="email">
              {{ userInfo.email }}
            </p>
            <div class="user-stats">
              <div class="stat">
                <span class="stat-number">{{ userStats.questionnaires }}</span>
                <span class="stat-label">问卷</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ userStats.responses }}</span>
                <span class="stat-label">回答</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ userStats.views }}</span>
                <span class="stat-label">浏览</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能区域 -->
      <div class="content-grid">
        <!-- 基本信息 -->
        <div class="info-card">
          <div class="card-header">
            <h3>基本信息</h3>
            <a-button type="text" @click="editMode = !editMode">
              <template #icon>
                <IconEdit />
              </template>
              {{ editMode ? '取消' : '编辑' }}
            </a-button>
          </div>
          <div class="card-content">
            <a-form v-if="editMode" :model="formData" layout="vertical">
              <a-form-item label="用户名">
                <a-input v-model="formData.username" placeholder="请输入用户名" />
              </a-form-item>
              <a-form-item label="邮箱">
                <a-input v-model="formData.email" placeholder="请输入邮箱" />
              </a-form-item>
              <a-form-item label="个人简介">
                <a-textarea v-model="formData.bio" placeholder="介绍一下自己..." :rows="3" />
              </a-form-item>
              <div class="form-actions">
                <a-button type="primary" @click="saveProfile">
                  保存
                </a-button>
                <a-button @click="editMode = false">
                  取消
                </a-button>
              </div>
            </a-form>
            <div v-else class="info-display">
              <div class="info-item">
                <label>用户名</label>
                <span>{{ userInfo.username }}</span>
              </div>
              <div class="info-item">
                <label>邮箱</label>
                <span>{{ userInfo.email }}</span>
              </div>
              <div class="info-item">
                <label>个人简介</label>
                <span>{{ userInfo.bio || '暂无简介' }}</span>
              </div>
              <div class="info-item">
                <label>注册时间</label>
                <span>{{ formatDate(userInfo.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 最近活动 -->
        <div class="activity-card">
          <div class="card-header">
            <h3>最近活动</h3>
            <a-link @click="$router.push('/questionnaires')">
              查看全部
            </a-link>
          </div>
          <div class="card-content">
            <div class="activity-list">
              <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
                <div class="activity-icon">
                  <component :is="getActivityIcon(activity.type)" />
                </div>
                <div class="activity-content">
                  <p class="activity-text">
                    {{ activity.description }}
                  </p>
                  <span class="activity-time">{{ formatTime(activity.createdAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 快捷操作 -->
        <div class="actions-card">
          <div class="card-header">
            <h3>快捷操作</h3>
          </div>
          <div class="card-content">
            <div class="action-buttons">
              <a-button type="outline" size="large" class="action-btn" @click="$router.push('/questionnaires/create')">
                <template #icon>
                  <IconPlus />
                </template>
                创建问卷
              </a-button>
              <a-button type="outline" size="large" class="action-btn" @click="$router.push('/templates')">
                <template #icon>
                  <IconApps />
                </template>
                浏览模板
              </a-button>
              <a-button type="outline" size="large" class="action-btn" @click="$router.push('/analytics')">
                <template #icon>
                  <IconBarChart />
                </template>
                数据分析
              </a-button>
              <a-button type="outline" size="large" class="action-btn" @click="$router.push('/settings')">
                <template #icon>
                  <IconSettings />
                </template>
                账户设置
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  min-height: 100vh;
  background: #fafafa;
  padding: 40px 0;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.profile-header {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.avatar-section {
  text-align: center;
}

.user-avatar {
  margin-bottom: 12px;
}

.change-avatar-btn {
  color: #ff7a00;
  font-size: 12px;
}

.user-info {
  flex: 1;
}

.username {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.email {
  color: #666;
  margin-bottom: 16px;
}

.user-stats {
  display: flex;
  gap: 32px;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: #ff7a00;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.info-card,
.activity-card,
.actions-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.actions-card {
  grid-column: 1 / -1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.card-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.info-display .info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item label {
  font-weight: 500;
  color: #666;
}

.info-item span {
  color: #333;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff7f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff7a00;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-text {
  color: #333;
  margin-bottom: 4px;
  font-size: 14px;
}

.activity-time {
  color: #999;
  font-size: 12px;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.action-btn {
  height: 56px;
  border-color: #ff7a00;
  color: #ff7a00;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.action-btn:hover {
  border-color: #ff9500;
  color: #ff9500;
  background: #fff7f0;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .user-stats {
    justify-content: center;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
