<script setup lang="ts">
import { IconLock, IconUser } from '@arco-design/web-vue/es/icon'

import Message from '@arco-design/web-vue/es/message'
import usePageState from './hooks/usePageState'

const { loading, form, rules } = usePageState()

// 处理用户登录 暂时先试用webStorage+Pinia;
async function handleSubmit({ errors }: any) {
  if (errors)
    return

  loading.value = true
  try {
    // TODO: 实现登录逻辑
    console.warn('登录信息:', form)
    Message.success('登录成功')
  }
  catch (error) {
    console.error(error)
    Message.error('登录失败，请检查账号密码')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Logo区域 -->
      <div class="logo-section">
        <div class="logo">
          <span class="logo-icon">🍊</span>
          <span class="logo-text">小橘问卷</span>
        </div>
        <p class="subtitle" style="color: #ff7a00;font-weight: 800;">
          Xiaoju Questionnaire
        </p>
        <p class="subtitle" style="margin-top: 1vh;">
          欢迎回来
        </p>
      </div>

      <!-- 登录表单 -->
      <a-form :model="form" :rules="rules" layout="vertical" class="login-form" @submit="handleSubmit">
        <a-form-item field="email" label="邮箱">
          <a-input v-model="form.email" placeholder="请输入邮箱地址" size="large" :prefix="IconUser" />
        </a-form-item>

        <a-form-item field="password" label="密码">
          <a-input-password v-model="form.password" placeholder="请输入密码" size="large" :prefix="IconLock" />
        </a-form-item>

        <div class="form-options">
          <a-checkbox v-model="form.remember">
            记住我
          </a-checkbox>
          <a-link href="/forgot-password" class="forgot-link">
            忘记密码？
          </a-link>
        </div>

        <a-button type="primary" html-type="submit" size="large" class="login-button" :loading="loading" long>
          登录
        </a-button>
      </a-form>

      <!-- 注册链接 -->
      <div class="register-link">
        <span>还没有账号？</span>
        <a-link href="/register" class="register-text">
          立即注册
        </a-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("/images/bg.png");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  padding: 40px 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.logo-section {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.logo-icon {
  font-size: 32px;
}

.logo-text {
  font-size: 24px;
  font-weight: 600;
  color: #ff7a00;
}

.subtitle {
  color: #666;
  font-size: 16px;
  margin: 0;
}

.login-form {
  margin-bottom: 24px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.forgot-link {
  color: #ff7a00;
  text-decoration: none;
}

.forgot-link:hover {
  color: #ff9500;
}

.login-button {
  background-color: #ff7a00;
  border-color: #ff7a00;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
}

.login-button:hover {
  background-color: #ff9500;
  border-color: #ff9500;
}

.register-link {
  text-align: center;
  color: #666;
}

.register-text {
  color: #ff7a00;
  text-decoration: none;
  margin-left: 4px;
}

.register-text:hover {
  color: #ff9500;
}

:deep(.arco-input-wrapper) {
  border-radius: 8px;
}

:deep(.arco-btn) {
  border-radius: 8px;
}
</style>
