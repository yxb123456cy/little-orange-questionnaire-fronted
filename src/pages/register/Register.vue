<script setup lang="ts">
import type { User } from '../../types'
import { IconEmail, IconLock, IconUser } from '@arco-design/web-vue/es/icon'
import Message from '@arco-design/web-vue/es/message'
import { ref } from 'vue'
import { useUserStore } from '../../store/modules/user/useUserStore'
import { EncryptPasswordMD5 } from '../../utils/modules/crypto'
import { GetCurrentTime } from '../../utils/modules/date'
import { GetRandom7DigitNumber } from '../../utils/modules/number'
import usePageState from './hooks/usePageState'

const { loading, form, rules } = usePageState()
const registerFormRef = ref()
const userStore = useUserStore()
// 处理注册;
async function handleSubmit({ errors }: any) {
  if (errors) {
    console.error('注册表单error:', errors)
    return
  }

  if (!form.agree) {
    Message.warning('请先同意用户协议和隐私政策')
    return
  }

  loading.value = true
  try {
    // TODO: 实现注册逻辑
    console.warn('注册信息:', form)
    const req: User = {
      id: GetRandom7DigitNumber(),
      username: form.username,
      email: form.email,
      password_hash: EncryptPasswordMD5(form.password),
      role: 'user',
      status: 1,
      created_at: GetCurrentTime(),
      updated_at: GetCurrentTime(),
    }
    // 在此处进行store调用;
    const result = userStore.registerUser(req)
    console.warn('注册结果:', result)
    if (result) {
      Message.success('注册成功')
    }
    else {
      registerFormRef.value?.setFields({
        email: {
          status: 'error',
          message: '该邮箱已被注册',
        },
      })
      console.error('注册失败')
    }
  }
  catch (error) {
    console.error(error)
    Message.error('注册失败，请稍后重试')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-card">
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
          创建您的账号
        </p>
      </div>

      <!-- 注册表单 -->
      <a-form
        ref="registerFormRef" :model="form" :rules="rules" layout="vertical" class="register-form"
        @submit="handleSubmit"
      >
        <a-form-item field="username" label="用户名">
          <a-input v-model="form.username" placeholder="请输入用户名" size="large" :prefix="IconUser" />
        </a-form-item>

        <a-form-item field="email" label="邮箱">
          <a-input v-model="form.email" placeholder="请输入邮箱地址" size="large" :prefix="IconEmail" />
        </a-form-item>

        <a-form-item field="password" label="密码">
          <a-input-password v-model="form.password" placeholder="请输入密码（至少6位）" size="large" :prefix="IconLock" />
        </a-form-item>

        <a-form-item field="confirmPassword" label="确认密码">
          <a-input-password v-model="form.confirmPassword" placeholder="请再次输入密码" size="large" :prefix="IconLock" />
        </a-form-item>

        <div class="agreement">
          <a-checkbox v-model="form.agree">
            我已阅读并同意
          </a-checkbox>
          <a-link class="agreement-link">
            《用户协议》
          </a-link>
          <span>和</span>
          <a-link class="agreement-link">
            《隐私政策》
          </a-link>
        </div>

        <a-button
          type="primary" html-type="submit" size="large" class="register-button" :loading="loading"
          :disabled="!form.agree" long
        >
          注册
        </a-button>
      </a-form>

      <!-- 登录链接 -->
      <div class="login-link">
        <span>已有账号？</span>
        <a-link href="/login" class="login-text">
          立即登录
        </a-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #fafafa; */
  background-image: url("/images/bg.png");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  padding: 10px;
}

.register-card {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  padding: 40px 32px;
  box-shadow: 0 1px 1px #ff7a00;
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
  font-size: 28px;
  font-weight: 600;
  color: #ff7a00;
}

.subtitle {
  color: #666;
  font-size: 16px;
  margin: 0;
}

.register-form {
  margin-bottom: 24px;
}

.agreement {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #666;
  flex-wrap: wrap;
}

.agreement-link {
  color: #ff7a00;
  text-decoration: none;
}

.agreement-link:hover {
  color: #ff9500;
}

.register-button {
  background-color: #ff7a00;
  border-color: #ff7a00;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
}

.register-button:hover:not(:disabled) {
  background-color: #ff9500;
  border-color: #ff9500;
}

.register-button:disabled {
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  color: #bfbfbf;
}

.login-link {
  text-align: center;
  color: #666;
}

.login-text {
  color: #ff7a00;
  text-decoration: none;
  margin-left: 4px;
}

.login-text:hover {
  color: #ff9500;
}

:deep(.arco-input-wrapper) {
  border-radius: 8px;
}

:deep(.arco-btn) {
  border-radius: 8px;
}
</style>
