<script setup lang="ts">
import { IconHome, IconLeft } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}

function goBack() {
  if (window.history.length > 1) {
    router.go(-1)
  }
  else {
    router.push('/')
  }
}
</script>

<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-content">
        <!-- 错误图标 -->
        <div class="error-icon">
          <div class="orange-stack">
            <span class="orange">🍊</span>
            <span class="orange">🍊</span>
            <span class="orange">🍊</span>
          </div>
        </div>

        <!-- 错误信息 -->
        <div class="error-info">
          <h1 class="error-code">
            404
          </h1>
          <h2 class="error-title">
            页面走丢了
          </h2>
          <p class="error-description">
            抱歉，您访问的页面不存在。可能是链接错误或页面已被移动。
          </p>
        </div>

        <!-- 操作按钮 -->
        <div class="error-actions">
          <a-button type="primary" size="large" class="primary-btn" @click="goHome">
            <template #icon>
              <IconHome />
            </template>
            返回首页
          </a-button>
          <a-button size="large" class="secondary-btn" @click="goBack">
            <template #icon>
              <IconLeft />
            </template>
            返回上页
          </a-button>
        </div>

        <!-- 帮助链接 -->
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

.orange-stack {
  display: inline-flex;
  gap: -8px;
  font-size: 48px;
  animation: bounce 2s infinite;
}

.orange {
  display: inline-block;
  animation: wiggle 3s ease-in-out infinite;
}

.orange:nth-child(2) {
  animation-delay: 0.3s;
  margin: 0 -8px;
}

.orange:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes wiggle {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
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
  margin-bottom: 24px;
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
