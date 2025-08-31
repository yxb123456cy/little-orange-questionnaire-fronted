<script setup lang="ts">
import {
  IconApps,
  IconBarChart,
  IconDown,
  IconFile,
  IconHome,
  IconPoweroff,
  IconSettings,
  IconUser,
} from '@arco-design/web-vue/es/icon'
import Message from '@arco-design/web-vue/es/message'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const selectedKeys = computed(() => {
  const path = route.path
  if (path === '/')
    return ['home']
  if (path.startsWith('/questionnaires'))
    return ['questionnaires']
  if (path.startsWith('/templates'))
    return ['templates']
  if (path.startsWith('/analytics'))
    return ['analytics']
  return []
})

function handleLogout() {
  // TODO: 实现退出登录逻辑
  Message.success('已退出登录')
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo区域 -->
      <div class="logo" @click="$router.push('/')">
        <span class="logo-icon">🍊</span>
        <span class="logo-text">小橘问卷</span>
      </div>

      <!-- 导航菜单 -->
      <nav class="nav-menu">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          class="main-menu"
        >
          <a-menu-item key="home" @click="$router.push('/')">
            <template #icon>
              <IconHome />
            </template>
            首页
          </a-menu-item>
          <a-menu-item key="questionnaires" @click="$router.push('/questionnaires')">
            <template #icon>
              <IconFile />
            </template>
            我的问卷
          </a-menu-item>
          <a-menu-item key="templates" @click="$router.push('/templates')">
            <template #icon>
              <IconApps />
            </template>
            模板库
          </a-menu-item>
          <a-menu-item key="analytics" @click="$router.push('/analytics')">
            <template #icon>
              <IconBarChart />
            </template>
            数据分析
          </a-menu-item>
        </a-menu>
      </nav>

      <!-- 用户中心 -->
      <div class="user-section">
        <a-dropdown trigger="hover">
          <div class="user-info">
            <a-avatar :size="36" class="user-avatar">
              <img src="https://via.placeholder.com/36" alt="用户头像">
            </a-avatar>
            <span class="username">用户名</span>
            <IconDown class="dropdown-icon" />
          </div>
          <template #content>
            <a-doption @click="$router.push('/profile')">
              <template #icon>
                <IconUser />
              </template>
              个人中心
            </a-doption>
            <a-doption @click="$router.push('/settings')">
              <template #icon>
                <IconSettings />
              </template>
              设置
            </a-doption>
            <a-doption class="logout-option" @click="handleLogout">
              <template #icon>
                <IconPoweroff />
              </template>
              退出登录
            </a-doption>
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
  background: white;
  border-bottom: 1px solid #f0f0f0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
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

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.logo:hover {
  opacity: 0.8;
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  color: #ff7a00;
}

.nav-menu {
  flex: 1;
  display: flex;
  justify-content: center;
}

.main-menu {
  border-bottom: none;
  background: transparent;
}

:deep(.arco-menu-horizontal .arco-menu-item) {
  color: #666;
  font-weight: 500;
  margin: 0 8px;
  border-radius: 8px;
  transition: all 0.2s;
}

:deep(.arco-menu-horizontal .arco-menu-item:hover) {
  background-color: #fff7f0;
  color: #ff7a00;
}

:deep(.arco-menu-horizontal .arco-menu-item.arco-menu-selected) {
  background-color: #ff7a00;
  color: white;
}

.user-section {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-info:hover {
  background-color: #f5f5f5;
}

.username {
  font-weight: 500;
  color: #333;
}

.dropdown-icon {
  font-size: 12px;
  color: #999;
}

:deep(.arco-dropdown-option.logout-option) {
  color: #f53f3f;
}

:deep(.arco-dropdown-option.logout-option:hover) {
  background-color: #ffece8;
}
</style>
