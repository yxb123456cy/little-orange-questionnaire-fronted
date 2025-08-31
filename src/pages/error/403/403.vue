<script setup lang="ts">
import { IconHome, IconLock, IconUser } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'

const router = useRouter()

function goLogin() {
  router.push('/login')
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-content">
        <!-- 错误图标 -->
        <div class="error-icon">
          <div class="lock-container">
            <span class="orange">🍊</span>
            <div class="lock-overlay">
              <IconLock class="lock-icon" />
            </div>
          </div>
        </div>

        <!-- 错误信息 -->
        <div class="error-info">
          <h1 class="error-code">
            403
          </h1>
          <h2 class="error-title">
            访问被拒绝
          </h2>
          <p class="error-description">
            抱歉，您没有权限访问此页面。请联系管理员或检查您的登录状态。
          </p>
        </div>

        <!-- 操作按钮 -->
        <div class="error-actions">
          <a-button type="primary" size="large" class="primary-btn" @click="goLogin">
            <template #icon>
              <IconUser />
            </template>
            重新登录
          </a-button>
          <a-button size="large" class="secondary-btn" @click="goHome">
            <template #icon>
              <IconHome />
            </template>
            返回首页
          </a-button>
        </div>

        <!-- 帮助信息 -->
        <div class="help-info">
          <p class="help-text">
            如果您认为这是一个错误，请联系技术支持
          </p>
          <div class="help-links">
            <a-link class="help-link" @click="$router.push('/help')">
              帮助中心
            </a-link>
            <span class="divider">|</span>
            <a-link class="help-link" @click="$router.push('/contact')">
              联系我们
            </a-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  padding: 20px;
}

.error-container {
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.error-content {
  background: white;
  border-radius: 16px;
  padding: 48px 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.error-icon {
  margin-bottom: 32px;
}

.lock-container {
  position: relative;
  display: inline-block;
  font-size: 48px;
}

.orange {
  display: block;
  filter: grayscale(0.3);
  opacity: 0.8;
}

.lock-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 122, 0, 0.1);
  border-radius: 50%;
  padding: 8px;
  backdrop-filter: blur(2px);
}

.lock-icon {
  font-size: 24px;
  color: #ff7a00;
}

.error-code {
  font-size: 72px;
  font-weight: 700;
  color: #ff7a00;
  margin: 0 0 16px 0;
  line-height: 1;
}

.error-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.error-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 32px 0;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.primary-btn {
  background-color: #ff7a00;
  border-color: #ff7a00;
  height: 44px;
  padding: 0 24px;
  font-weight: 500;
}

.primary-btn:hover {
  background-color: #ff9500;
  border-color: #ff9500;
}

.secondary-btn {
  height: 44px;
  padding: 0 24px;
  border-color: #d9d9d9;
  color: #666;
}

.secondary-btn:hover {
  border-color: #ff7a00;
  color: #ff7a00;
}

.help-info {
  border-top: 1px solid #f0f0f0;
  padding-top: 24px;
}

.help-text {
  font-size: 14px;
  color: #999;
  margin: 0 0 12px 0;
}

.help-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.help-link {
  color: #ff7a00;
  text-decoration: none;
  font-size: 14px;
}

.help-link:hover {
  color: #ff9500;
}

.divider {
  color: #d9d9d9;
  font-size: 14px;
}

@media (max-width: 480px) {
  .error-content {
    padding: 32px 24px;
  }

  .error-code {
    font-size: 56px;
  }

  .error-title {
    font-size: 20px;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
