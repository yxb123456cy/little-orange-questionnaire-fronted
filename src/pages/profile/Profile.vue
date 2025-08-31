<script setup lang="ts">
import {

  IconBarChart,
  IconCamera,
  IconEdit,
  IconEye,
  IconFile,
  IconHeart,

  IconPlus,
  IconSettings,
  IconUser,
} from '@arco-design/web-vue/es/icon'

import Message from '@arco-design/web-vue/es/message'
import Modal from '@arco-design/web-vue/es/modal'
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/modules/user/useUserStore'

const userStore = useUserStore()
const router = useRouter()
const editMode = ref(false)
// const avatarUploadRef = ref()

// 从store获取当前用户信息
const currentUser = computed(() => userStore.getCurrentUserInfo)

// 如果没有登录用户，重定向到登录页
if (!currentUser.value) {
  router.push('/login')
}

// 用户信息（从store获取）
const userInfo = reactive({
  username: currentUser.value?.username || '',
  email: currentUser.value?.email || '',
  avatar: currentUser.value?.avatar || '',
  bio: currentUser.value?.introduction || '', // 可以从用户扩展字段获取
  createdAt: currentUser.value?.created_at || new Date().toISOString(),
  role: currentUser.value?.role || 'user',
  status: currentUser.value?.status || 1,
})

// 用户统计数据（模拟数据，实际应该从API获取）
const userStats = reactive({
  questionnaires: 12,
  responses: 1580,
  views: 8920,
})

// 表单数据
const formData = reactive({
  username: userInfo.username,
  email: userInfo.email,
  bio: userInfo.bio,
})

// 监听用户信息变化，同步到表单
watch(currentUser, (newUser) => {
  if (newUser) {
    Object.assign(userInfo, {
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar || '',
      createdAt: newUser.created_at,
      role: newUser.role,
      status: newUser.status,
    })
    Object.assign(formData, {
      username: newUser.username,
      email: newUser.email,
      bio: userInfo.bio,
    })
  }
}, { immediate: true })

// 最近活动数据
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

// 获取活动图标
function getActivityIcon(type: string) {
  const iconMap: Record<string, any> = {
    create: IconFile,
    view: IconEye,
    star: IconHeart,
  }
  return iconMap[type] ?? IconFile
}

// 格式化日期
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 格式化时间
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

// 保存个人信息
function saveProfile() {
  try {
    // 验证表单数据
    if (!formData.username.trim()) {
      Message.error('用户名不能为空')
      return
    }
    if (!formData.email.trim()) {
      Message.error('邮箱不能为空')
      return
    }

    // 更新用户信息到store
    const updatedUser = {
      ...currentUser.value!,
      username: formData.username,
      email: formData.email,
      updated_at: new Date().toISOString(),
      introduction: formData.bio,
    }

    userStore.setCurrentUserInfo(updatedUser)

    // 更新本地显示数据
    Object.assign(userInfo, {
      username: formData.username,
      email: formData.email,
      bio: formData.bio,
    })

    editMode.value = false
    Message.success('个人信息已更新')
  }
  catch (error) {
    console.error('保存个人信息失败:', error)
    Message.error('保存失败，请重试')
  }
}

// 更换头像
function changeAvatar() {
  // 创建文件输入元素
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      // 验证文件大小（限制2MB）
      if (file.size > 2 * 1024 * 1024) {
        Message.error('图片大小不能超过2MB')
        return
      }

      // 创建预览URL
      const reader = new FileReader()
      reader.onload = (e) => {
        const avatarUrl = e.target?.result as string

        // 更新头像
        userInfo.avatar = avatarUrl

        // 更新store中的用户信息
        const updatedUser = {
          ...currentUser.value!,
          avatar: avatarUrl,
          updated_at: new Date().toISOString(),
        }
        userStore.setCurrentUserInfo(updatedUser)

        Message.success('头像更新成功')
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

// 退出登录
function handleLogout() {
  Modal.confirm({
    title: '确认退出登录？',
    content: '退出后需要重新登录才能访问个人信息',
    onOk: () => {
      userStore.logOut()
      Message.success('已退出登录')
      router.push('/login')
    },
  })
}

// 获取用户角色显示文本
const roleText = computed(() => {
  return userInfo.role === 'admin' ? '管理员' : '普通用户'
})

// 获取用户状态显示文本
const statusText = computed(() => {
  return userInfo.status === 1 ? '正常' : '禁用'
})
</script>

<template>
  <div class="profile">
    <div class="profile-container">
      <!-- 个人信息卡片 -->
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-section">
            <a-avatar :size="80" class="user-avatar">
              <img
                :src="userInfo.avatar || `https://via.placeholder.com/80?text=${encodeURIComponent(userInfo.username.charAt(0))}`"
                :alt="`${userInfo.username}的头像`"
              >
            </a-avatar>
            <a-button type="text" class="change-avatar-btn" @click="changeAvatar">
              <template #icon>
                <IconCamera />
              </template>
              更换头像
            </a-button>
          </div>
          <div class="user-info">
            <div class="user-title">
              <h2 class="username">
                {{ userInfo.username }}
              </h2>
              <a-tag :color="userInfo.role === 'admin' ? 'red' : 'blue'" class="role-tag">
                {{ roleText }}
              </a-tag>
            </div>
            <p class="email">
              {{ userInfo.email }}
            </p>
            <div class="user-meta">
              <span class="meta-item">
                <IconUser class="meta-icon" />
                状态：{{ statusText }}
              </span>
              <span class="meta-item">
                注册时间：{{ formatDate(userInfo.createdAt) }}
              </span>
            </div>
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
          <div class="profile-actions">
            <a-button type="outline" @click="$router.push('/settings')">
              <template #icon>
                <IconSettings />
              </template>
              设置
            </a-button>
            <a-button type="outline" status="danger" @click="handleLogout">
              <template #icon>
                <IconLogout />
              </template>
              退出
            </a-button>
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
              <a-form-item label="用户名" field="username" :rules="[{ required: true, message: '请输入用户名' }]">
                <a-input v-model="formData.username" placeholder="请输入用户名" />
              </a-form-item>
              <a-form-item label="邮箱" field="email" :rules="[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱格式' }]">
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
                <label>用户角色</label>
                <span>{{ roleText }}</span>
              </div>
              <div class="info-item">
                <label>账户状态</label>
                <a-tag :color="userInfo.status === 1 ? 'green' : 'red'">
                  {{ statusText }}
                </a-tag>
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
            <div v-if="recentActivities.length > 0" class="activity-list">
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
            <div v-else class="empty-state">
              <p>暂无活动记录</p>
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
              <a-button type="outline" size="large" class="action-btn" @click="$router.push('/starred')">
                <template #icon>
                  <IconHeart />
                </template>
                星标问卷
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
  flex-shrink: 0;
}

.user-avatar {
  margin-bottom: 12px;
  border: 3px solid #ff7a00;
}

.change-avatar-btn {
  color: #ff7a00;
  font-size: 12px;
}

.change-avatar-btn:hover {
  color: #ff9500;
}

.user-info {
  flex: 1;
}

.user-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.username {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.role-tag {
  font-size: 12px;
}

.email {
  color: #666;
  margin-bottom: 12px;
  font-size: 16px;
}

.user-meta {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-icon {
  font-size: 14px;
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

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
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

.empty-state {
  text-align: center;
  color: #999;
  padding: 20px 0;
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

  .profile-actions {
    flex-direction: row;
    justify-content: center;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .user-stats {
    justify-content: center;
  }

  .user-meta {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
