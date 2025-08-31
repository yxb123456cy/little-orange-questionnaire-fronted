<script setup lang="ts">
import {
  IconBarChart,
  IconDelete,
  IconDown,
  IconFile,
  IconHeart,
  IconHome,
  IconPoweroff,
  IconSettings,
  IconUser,
} from '@arco-design/web-vue/es/icon'
import Message from '@arco-design/web-vue/es/message'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../../store/modules/user/useUserStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const selectedKeys = computed(() => {
  const path = route.path
  if (path === '/')
    return ['home']
  if (path.startsWith('/questionnaires'))
    return ['questionnaires']
  if (path.startsWith('/starred'))
    return ['starred']
  if (path.startsWith('/trash'))
    return ['trash']
  if (path.startsWith('/analytics'))
    return ['analytics']
  return []
})

function handleLogout() {
  // TODO: 实现退出登录逻辑
  userStore.logOut()
  Message.success('已退出登录')
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo区域 -->
      <div class="logo" @click="$router.push('/')">
        <div class="logo-wrapper">
          <span class="logo-icon">🍊</span>
          <div class="logo-shine" />
        </div>
        <span class="logo-text">小橘问卷</span>
      </div>

      <!-- 导航菜单 -->
      <nav class="nav-menu">
        <a-menu mode="horizontal" :selected-keys="selectedKeys" class="main-menu">
          <a-menu-item key="home" class="menu-item" @click="$router.push('/')">
            <template #icon>
              <IconHome />
            </template>
            <span class="menu-text">首页</span>
          </a-menu-item>
          <a-menu-item key="questionnaires" class="menu-item" @click="$router.push('/questionnaires')">
            <template #icon>
              <IconFile />
            </template>
            <span class="menu-text">我的问卷</span>
          </a-menu-item>
          <a-menu-item key="starred" class="menu-item" @click="$router.push('/starred')">
            <template #icon>
              <IconHeart />
            </template>
            <span class="menu-text">星标问卷</span>
          </a-menu-item>
          <a-menu-item key="trash" class="menu-item" @click="$router.push('/trash')">
            <template #icon>
              <IconDelete />
            </template>
            <span class="menu-text">回收问卷</span>
          </a-menu-item>
          <a-menu-item key="analytics" class="menu-item" @click="$router.push('/analytics')">
            <template #icon>
              <IconBarChart />
            </template>
            <span class="menu-text">数据分析</span>
          </a-menu-item>
        </a-menu>
      </nav>

      <!-- 用户中心 -->
      <div class="user-section">
        <a-dropdown trigger="hover" class="user-dropdown" position="bottom">
          <div class="user-info">
            <div class="avatar-wrapper">
              <a-avatar :size="36" class="user-avatar">
                <img :src="userStore.getCurrentUserInfo?.avatar" alt="用户头像">
              </a-avatar>
              <div class="avatar-status" />
            </div>
            <span class="username">{{ userStore.getCurrentUserInfo?.username }}</span>
            <IconDown class="dropdown-icon" />
          </div>
          <template #content>
            <div class="dropdown-content">
              <a-doption class="dropdown-item" @click="$router.push('/profile')">
                <template #icon>
                  <IconUser />
                </template>
                <span class="dropdown-text">个人中心</span>
              </a-doption>
              <a-doption class="dropdown-item" @click="$router.push('/settings')">
                <template #icon>
                  <IconSettings />
                </template>
                <span class="dropdown-text">设置</span>
              </a-doption>
              <div class="dropdown-divider" />
              <a-doption class="logout-option dropdown-item" @click="handleLogout">
                <template #icon>
                  <IconPoweroff />
                </template>
                <span class="dropdown-text">退出登录</span>
              </a-doption>
            </div>
          </template>
        </a-dropdown>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 122, 0, 0.1);
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(255, 122, 0, 0.08);
  transition: all 0.3s ease;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

/* Logo样式优化 */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 12px;
}

.logo:hover {
  background: linear-gradient(135deg, #fff7f0 0%, #ffede0 100%);
  transform: translateY(-1px);
}

.logo-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.logo-icon {
  font-size: 32px;
  filter: drop-shadow(0 2px 4px rgba(255, 122, 0, 0.2));
  transition: all 0.3s ease;
}

.logo:hover .logo-icon {
  transform: rotate(5deg) scale(1.05);
}

.logo-shine {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background: #ff7a00;
  border-radius: 50%;
  opacity: 0;
  animation: shine 2s ease-in-out infinite;
}

@keyframes shine {

  0%,
  100% {
    opacity: 0;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.logo-text {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #ff7a00 0%, #ff9500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

/* 导航菜单样式优化 */
.nav-menu {
  flex: 1;
  display: flex;
  justify-content: center;
}

.main-menu {
  border-bottom: none;
  background: transparent;
  padding: 0 20px;
}

:deep(.arco-menu-horizontal .arco-menu-item) {
  position: relative;
  color: #666;
  font-weight: 500;
  margin: 0 3px;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 10px 14px;
  overflow: hidden;
  border: 1px solid transparent;
}

/* 悬浮状态 */
:deep(.arco-menu-horizontal .arco-menu-item:hover) {
  color: #ff7a00;
  background: linear-gradient(135deg, #fff7f0 0%, #ffede0 100%);
  border-color: rgba(255, 122, 0, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 122, 0, 0.15);
}

/* 选中状态 */
:deep(.arco-menu-horizontal .arco-menu-item.arco-menu-selected) {
  background: linear-gradient(135deg, #fff7f0 0%, #ffede0 100%);
  color: #ff7a00;
  border: 1px solid #ff7a00;
  transform: translateY(-1px);
  box-shadow:
    0 4px 16px rgba(255, 122, 0, 0.2),
    0 2px 6px rgba(255, 122, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
}

/* 选中状态的底部橘色条 */
:deep(.arco-menu-horizontal .arco-menu-item.arco-menu-selected)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, #ff7a00 20%, #ff9500 80%, transparent 100%);
  border-radius: 2px 2px 0 0;
  box-shadow: 0 -1px 4px rgba(255, 122, 0, 0.2);
}

/* 选中状态的图标和文字样式 */
:deep(.arco-menu-horizontal .arco-menu-item.arco-menu-selected .arco-icon) {
  color: #ff7a00;
  transform: scale(1.05);
  filter: drop-shadow(0 1px 2px rgba(255, 122, 0, 0.2));
}

:deep(.arco-menu-horizontal .arco-menu-item.arco-menu-selected) .menu-text {
  color: #ff7a00;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(255, 122, 0, 0.1);
}

/* 选中状态的微妙发光效果 */
:deep(.arco-menu-horizontal .arco-menu-item.arco-menu-selected)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255, 122, 0, 0.08) 0%, transparent 70%);
  border-radius: 8px;
  animation: gentle-pulse 3s ease-in-out infinite;
}

@keyframes gentle-pulse {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.6;
  }
}

.menu-text {
  margin-left: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
}

/* 用户区域样式优化 */
.user-section {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.user-info:hover {
  background: linear-gradient(135deg, #fff7f0 0%, #ffede0 100%);
  border-color: rgba(255, 122, 0, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 122, 0, 0.1);
}

.avatar-wrapper {
  position: relative;
}

.user-avatar {
  border: 2px solid #ff7a00;
  transition: all 0.3s ease;
}

.user-info:hover .user-avatar {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(255, 122, 0, 0.2);
}

.avatar-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: #52c41a;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.username {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  transition: color 0.3s ease;
}

.user-info:hover .username {
  color: #ff7a00;
}

.dropdown-icon {
  font-size: 12px;
  color: #999;
  transition: all 0.3s ease;
}

.user-info:hover .dropdown-icon {
  color: #ff7a00;
  transform: rotate(180deg);
}

/* 下拉菜单样式优化 - 防止滚动条 */
.dropdown-content {
  padding: 8px 0;
  min-width: 140px;
  max-width: 180px;
  width: auto;
  overflow: hidden;
}

:deep(.arco-dropdown-option.dropdown-item) {
  padding: 8px 12px;
  margin: 2px 6px;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 13px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}

.dropdown-text {
  margin-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.arco-dropdown-option.dropdown-item:hover) {
  background: linear-gradient(135deg, #fff7f0 0%, #ffede0 100%);
  color: #ff7a00;
}

.dropdown-divider {
  height: 1px;
  background: #f0f0f0;
  margin: 6px 12px;
}

:deep(.arco-dropdown-option.logout-option) {
  color: #f53f3f;
}

:deep(.arco-dropdown-option.logout-option:hover) {
  background: #ffece8;
  color: #f53f3f;
}

/* 下拉菜单容器样式 */
:deep(.arco-dropdown) {
  max-height: none;
  overflow: visible;
}

:deep(.arco-dropdown-list) {
  max-height: none;
  overflow: visible;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 122, 0, 0.1);
  border-radius: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-container {
    padding: 0 16px;
  }

  .logo-text {
    display: none;
  }

  .menu-text {
    display: none;
  }

  :deep(.arco-menu-horizontal .arco-menu-item) {
    padding: 8px 10px;
    margin: 0 2px;
  }

  .username {
    display: none;
  }
}

@media (max-width: 480px) {
  .nav-menu {
    display: none;
  }
}
</style>
