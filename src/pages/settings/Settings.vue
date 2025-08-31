<script setup lang="ts">
import { IconDelete, IconDownload, IconExclamationCircle } from '@arco-design/web-vue/es/icon'
import Message from '@arco-design/web-vue/es/message'
import Modal from '@arco-design/web-vue/es/modal'

import { reactive } from 'vue'

const accountForm = reactive({
  username: '张三',
  email: 'zhangsan@example.com',
  bio: '热爱数据分析的产品经理',
})

const securityForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const preferences = reactive({
  theme: 'light',
  language: 'zh',
  autoSave: true,
  emailNotifications: true,
  desktopNotifications: false,
})

function saveAccount() {
  // TODO: 实现保存账户信息逻辑
  Message.success('账户信息已保存')
}

function changePassword() {
  if (!securityForm.currentPassword) {
    Message.error('请输入当前密码')
    return
  }
  if (securityForm.newPassword !== securityForm.confirmPassword) {
    Message.error('两次输入的密码不一致')
    return
  }
  // TODO: 实现修改密码逻辑
  Message.success('密码修改成功')
  Object.assign(securityForm, {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
}

function savePreferences() {
  // TODO: 实现保存偏好设置逻辑
  Message.success('偏好设置已保存')
}

function resetPreferences() {
  Object.assign(preferences, {
    theme: 'light',
    language: 'zh',
    autoSave: true,
    emailNotifications: true,
    desktopNotifications: false,
  })
  Message.success('已重置为默认设置')
}

function exportData() {
  // TODO: 实现导出数据逻辑
  Message.success('数据导出已开始，请稍候...')
}

function clearTrash() {
  Modal.warning({
    title: '确认清空回收站？',
    content: '此操作将永久删除回收站中的所有问卷，无法恢复。',
    onOk: () => {
      // TODO: 实现清空回收站逻辑
      Message.success('回收站已清空')
    },
  })
}

function deleteAccount() {
  Modal.error({
    title: '确认删除账户？',
    content: '此操作将永久删除您的账户和所有数据，无法恢复。请输入您的密码确认。',
    onOk: () => {
      // TODO: 实现删除账户逻辑
      Message.success('账户删除请求已提交')
    },
  })
}
</script>

<template>
  <div class="settings">
    <div class="settings-container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">
          设置
        </h1>
        <p class="page-description">
          管理您的账户设置和偏好
        </p>
      </div>

      <!-- 设置内容 -->
      <div class="settings-content">
        <!-- 账户设置 -->
        <div class="settings-section">
          <div class="section-header">
            <h2 class="section-title">
              账户设置
            </h2>
            <p class="section-description">
              管理您的基本账户信息
            </p>
          </div>
          <div class="section-content">
            <a-form :model="accountForm" layout="vertical" class="settings-form">
              <a-row :gutter="24">
                <a-col :span="12">
                  <a-form-item label="用户名">
                    <a-input v-model="accountForm.username" placeholder="请输入用户名" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="邮箱">
                    <a-input v-model="accountForm.email" placeholder="请输入邮箱" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-form-item label="个人简介">
                <a-textarea v-model="accountForm.bio" placeholder="介绍一下自己..." :rows="3" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" class="save-btn" @click="saveAccount">
                  保存账户信息
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>

        <!-- 安全设置 -->
        <div class="settings-section">
          <div class="section-header">
            <h2 class="section-title">
              安全设置
            </h2>
            <p class="section-description">
              保护您的账户安全
            </p>
          </div>
          <div class="section-content">
            <a-form :model="securityForm" layout="vertical" class="settings-form">
              <a-form-item label="当前密码">
                <a-input-password v-model="securityForm.currentPassword" placeholder="请输入当前密码" />
              </a-form-item>
              <a-row :gutter="24">
                <a-col :span="12">
                  <a-form-item label="新密码">
                    <a-input-password v-model="securityForm.newPassword" placeholder="请输入新密码" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="确认新密码">
                    <a-input-password v-model="securityForm.confirmPassword" placeholder="请确认新密码" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-form-item>
                <a-button type="primary" class="save-btn" @click="changePassword">
                  修改密码
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>

        <!-- 偏好设置 -->
        <div class="settings-section">
          <div class="section-header">
            <h2 class="section-title">
              偏好设置
            </h2>
            <p class="section-description">
              个性化您的使用体验
            </p>
          </div>
          <div class="section-content">
            <div class="preference-grid">
              <div class="preference-item">
                <div class="preference-info">
                  <h3>主题模式</h3>
                  <p>选择您喜欢的界面主题</p>
                </div>
                <a-radio-group v-model="preferences.theme" type="button">
                  <a-radio value="light">
                    浅色
                  </a-radio>
                  <a-radio value="dark">
                    深色
                  </a-radio>
                  <a-radio value="auto">
                    跟随系统
                  </a-radio>
                </a-radio-group>
              </div>

              <div class="preference-item">
                <div class="preference-info">
                  <h3>语言设置</h3>
                  <p>选择界面显示语言</p>
                </div>
                <a-select v-model="preferences.language" style="width: 120px">
                  <a-option value="zh">
                    中文
                  </a-option>
                  <a-option value="en">
                    English
                  </a-option>
                </a-select>
              </div>

              <div class="preference-item">
                <div class="preference-info">
                  <h3>自动保存</h3>
                  <p>编辑问卷时自动保存草稿</p>
                </div>
                <a-switch v-model="preferences.autoSave" />
              </div>

              <div class="preference-item">
                <div class="preference-info">
                  <h3>邮件通知</h3>
                  <p>接收重要事件的邮件提醒</p>
                </div>
                <a-switch v-model="preferences.emailNotifications" />
              </div>

              <div class="preference-item">
                <div class="preference-info">
                  <h3>桌面通知</h3>
                  <p>在浏览器中显示通知</p>
                </div>
                <a-switch v-model="preferences.desktopNotifications" />
              </div>
            </div>

            <div class="preference-actions">
              <a-button type="primary" class="save-btn" @click="savePreferences">
                保存偏好设置
              </a-button>
              <a-button class="reset-btn" @click="resetPreferences">
                重置为默认
              </a-button>
            </div>
          </div>
        </div>

        <!-- 数据管理 -->
        <div class="settings-section">
          <div class="section-header">
            <h2 class="section-title">
              数据管理
            </h2>
            <p class="section-description">
              管理您的数据和隐私
            </p>
          </div>
          <div class="section-content">
            <div class="data-actions">
              <div class="data-item">
                <div class="data-info">
                  <h3>导出数据</h3>
                  <p>下载您的所有问卷和回答数据</p>
                </div>
                <a-button class="action-btn" @click="exportData">
                  <template #icon>
                    <IconDownload />
                  </template>
                  导出数据
                </a-button>
              </div>

              <div class="data-item">
                <div class="data-info">
                  <h3>清空回收站</h3>
                  <p>永久删除回收站中的所有问卷</p>
                </div>
                <a-button status="warning" class="action-btn" @click="clearTrash">
                  <template #icon>
                    <IconDelete />
                  </template>
                  清空回收站
                </a-button>
              </div>

              <div class="data-item danger">
                <div class="data-info">
                  <h3>删除账户</h3>
                  <p>永久删除您的账户和所有数据</p>
                </div>
                <a-button status="danger" class="action-btn" @click="deleteAccount">
                  <template #icon>
                    <IconExclamationCircle />
                  </template>
                  删除账户
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings {
  min-height: 100vh;
  background: #fafafa;
  padding: 40px 0;
}

.settings-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.page-description {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.settings-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
}

.section-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.section-description {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.settings-form {
  max-width: 600px;
}

.save-btn {
  background-color: #ff7a00;
  border-color: #ff7a00;
  height: 36px;
  padding: 0 20px;
}

.save-btn:hover {
  background-color: #ff9500;
  border-color: #ff9500;
}

.preference-grid {
  display: grid;
  gap: 24px;
  margin-bottom: 24px;
}

.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  transition: all 0.2s;
}

.preference-item:hover {
  border-color: rgba(255, 122, 0, 0.2);
  background: #fff7f0;
}

.preference-info h3 {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.preference-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.preference-actions {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.reset-btn {
  height: 36px;
  padding: 0 20px;
  border-color: #d9d9d9;
  color: #666;
}

.reset-btn:hover {
  border-color: #ff7a00;
  color: #ff7a00;
}

.data-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  transition: all 0.2s;
}

.data-item:hover {
  border-color: rgba(255, 122, 0, 0.2);
  background: #fff7f0;
}

.data-item.danger {
  border-color: #ffccc7;
  background: #fff2f0;
}

.data-item.danger:hover {
  border-color: #ff7875;
  background: #ffece8;
}

.data-info h3 {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.data-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.action-btn {
  height: 36px;
  padding: 0 16px;
}

@media (max-width: 768px) {
  .settings-container {
    padding: 0 16px;
  }

  .preference-item,
  .data-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .preference-actions {
    flex-direction: column;
  }
}
</style>
