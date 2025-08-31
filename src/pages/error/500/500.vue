<script setup lang="ts">
import { IconHome, IconRefresh } from '@arco-design/web-vue/es/icon'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const errorTime = ref('')
const errorId = ref('')

function refresh() {
  window.location.reload()
}

function goHome() {
  router.push('/')
}

function generateErrorId() {
  return Math.random().toString(36).substr(2, 9).toUpperCase()
}

onMounted(() => {
  errorTime.value = new Date().toLocaleString('zh-CN')
  errorId.value = generateErrorId()
})
</script>

<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-content">
        <!-- 错误图标 -->
        <div class="error-icon">
          <div class="broken-orange">
            <span class="orange-half left">🍊</span>
            <div class="crack" />
            <span class="orange-half right">🍊</span>
          </div>
        </div>

        <!-- 错误信息 -->
        <div class="error-info">
          <h1 class="error-code">
            500
          </h1>
          <h2 class="error-title">
            服务器开小差了
          </h2>
          <p class="error-description">
            服务器遇到了一些问题，我们正在努力修复中。请稍后再试或联系技术支持。
          </p>
        </div>

        <!-- 操作按钮 -->
        <div class="error-actions">
          <a-button type="primary" size="large" class="primary-btn" @click="refresh">
            <template #icon>
              <IconRefresh />
            </template>
            刷新页面
          </a-button>
          <a-button size="large" class="secondary-btn" @click="goHome">
            <template #icon>
              <IconHome />
            </template>
            返回首页
          </a-button>
        </div>

        <!-- 状态信息 -->
        <div class="status-info">
          <div class="status-item">
            <span class="status-label">错误时间：</span>
            <span class="status-value">{{ errorTime }}</span>
          </div>
          <div class="status-item">
            <span class="status-label">错误ID：</span>
            <span class="status-value">{{ errorId }}</span>
          </div>
        </div>

        <!-- 帮助链接 -->
        <div class="help-links">
          <a-link class="help-link" @click="$router.push('/status')">
            服务状态
          </a-link>
          <span class="divider">|</span>
          <a-link class="help-link" @click="$router.push('/contact')">
            技术支持
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

.broken-orange {
  position: relative;
  display: inline-block;
  font-size: 48px;
}

.orange-half {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.orange-half.left {
  clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
  animation: shake-left 2s ease-in-out infinite;
}

.orange-half.right {
  clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
  margin-left: -24px;
  animation: shake-right 2s ease-in-out infinite;
}

.crack {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 40px;
  background: #ff7a00;
  opacity: 0.6;
  animation: flash 1.5s ease-in-out infinite;
}

@keyframes shake-left {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

@keyframes shake-right {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
}

@keyframes flash {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
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

.status-info {
  background: #fafafa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  border: 1px solid #f0f0f0;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
}

.status-item:last-child {
  margin-bottom: 0;
}

.status-label {
  color: #666;
  font-weight: 500;
}

.status-value {
  color: #333;
  font-family: monospace;
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

  .status-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>
