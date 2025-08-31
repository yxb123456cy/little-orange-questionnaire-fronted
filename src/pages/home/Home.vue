<script setup lang="ts">
import { IconEye, IconPlus } from '@arco-design/web-vue/es/icon'
</script>

<template>
  <div class="home">
    <!-- Hero区域 -->
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            轻松创建
            <span class="highlight">专业问卷</span>
          </h1>
          <p class="hero-description">
            小橘问卷为您提供简单易用的问卷创建工具，
            帮助您快速收集和分析数据，做出更好的决策。
          </p>
          <div class="hero-actions">
            <a-button type="primary" size="large" class="cta-button" @click="$router.push('/questionnaires/create')">
              <template #icon>
                <IconPlus />
              </template>
              创建问卷
            </a-button>
            <a-button size="large" class="demo-button" @click="$router.push('/templates')">
              <template #icon>
                <IconEye />
              </template>
              查看模板
            </a-button>
          </div>
        </div>
        <div class="hero-image">
          <div class="mockup">
            <div class="mockup-header">
              <div class="mockup-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div class="mockup-content">
              <div class="form-item">
                <div class="form-label" />
                <div class="form-input" />
              </div>
              <div class="form-item">
                <div class="form-label" />
                <div class="form-options">
                  <div class="option" />
                  <div class="option" />
                  <div class="option" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能特性 -->
    <section class="features">
      <div class="features-container">
        <h2 class="section-title">
          为什么选择小橘问卷？
        </h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              📝
            </div>
            <h3>简单易用</h3>
            <p>拖拽式问卷编辑器，无需技术背景，几分钟即可创建专业问卷</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              📊
            </div>
            <h3>数据分析</h3>
            <p>实时数据统计和可视化图表，帮助您快速洞察调研结果</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              🎨
            </div>
            <h3>丰富模板</h3>
            <p>提供多种行业模板，满足不同场景的调研需求</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              📱
            </div>
            <h3>多端适配</h3>
            <p>完美支持手机、平板、电脑等设备，随时随地收集数据</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="stats">
      <div class="stats-container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">
              10,000+
            </div>
            <div class="stat-label">
              活跃用户
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-number">
              50,000+
            </div>
            <div class="stat-label">
              问卷创建
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-number">
              1,000,000+
            </div>
            <div class="stat-label">
              数据收集
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-number">
              99.9%
            </div>
            <div class="stat-label">
              服务可用性
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA区域 -->
    <section class="cta">
      <div class="cta-container">
        <h2>开始您的第一份问卷</h2>
        <p>加入数万用户的选择，体验专业的问卷调研服务</p>
        <a-button type="primary" size="large" class="cta-button" @click="$router.push('/register')">
          免费注册
        </a-button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

/* Hero区域 */
.hero {
  padding: 80px 0;
  background: linear-gradient(135deg, #fff7f0 0%, #ffffff 100%);
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: #333;
  margin-bottom: 24px;
}

.highlight {
  color: #ff7a00;
}

.hero-description {
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

.cta-button {
  background-color: #ff7a00;
  border-color: #ff7a00;
  height: 48px;
  padding: 0 32px;
  font-size: 16px;
  font-weight: 500;
}

.cta-button:hover {
  background-color: #ff9500;
  border-color: #ff9500;
}

.demo-button {
  height: 48px;
  padding: 0 32px;
  font-size: 16px;
  border-color: #ff7a00;
  color: #ff7a00;
}

.demo-button:hover {
  border-color: #ff9500;
  color: #ff9500;
}

/* 模拟图 */
.mockup {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 400px;
}

.mockup-header {
  height: 40px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.mockup-dots {
  display: flex;
  gap: 6px;
}

.mockup-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
}

.mockup-dots span:nth-child(1) {
  background: #ff5f57;
}

.mockup-dots span:nth-child(2) {
  background: #ffbd2e;
}

.mockup-dots span:nth-child(3) {
  background: #28ca42;
}

.mockup-content {
  padding: 32px 24px;
}

.form-item {
  margin-bottom: 24px;
}

.form-label {
  height: 16px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 8px;
  width: 60%;
}

.form-input {
  height: 40px;
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
}

.form-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option {
  height: 32px;
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  width: 80%;
}

/* 功能特性 */
.features {
  padding: 80px 0;
  background: white;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-title {
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  color: #333;
  margin-bottom: 64px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.feature-card {
  text-align: center;
  padding: 32px 24px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: #ff7a00;
  box-shadow: 0 8px 24px rgba(255, 122, 0, 0.1);
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* 数据统计 */
.stats {
  padding: 80px 0;
  background: #fafafa;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #ff7a00;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 16px;
  color: #666;
}

/* CTA区域 */
.cta {
  padding: 80px 0;
  background: white;
}

.cta-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 0 24px;
}

.cta h2 {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.cta p {
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 48px;
    text-align: center;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-actions {
    justify-content: center;
  }
}
</style>
