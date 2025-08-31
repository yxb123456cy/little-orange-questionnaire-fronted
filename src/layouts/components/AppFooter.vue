<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="logo">
            <span class="logo-icon">🍊</span>
            <span class="logo-text">小橘问卷</span>
          </div>
          <p class="description">
            简单易用的在线问卷调查平台
          </p>
        </div>

        <div class="footer-section">
          <h4>产品</h4>
          <ul>
            <li><a href="#">问卷创建</a></li>
            <li><a href="#">数据分析</a></li>
            <li><a href="#">模板库</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>支持</h4>
          <ul>
            <li><a href="#">帮助中心</a></li>
            <li><a href="#">联系我们</a></li>
            <li><a href="#">意见反馈</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>关于</h4>
          <ul>
            <li><a href="#">关于我们</a></li>
            <li><a href="#">隐私政策</a></li>
            <li><a href="#">服务条款</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 小橘问卷. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #fafafa;
  border-top: 1px solid #f0f0f0;
  margin-top: 80px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 32px;
}

.footer-section h4 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 8px;
}

.footer-section a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-section a:hover {
  color: #ff7a00;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #ff7a00;
}

.description {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid #e5e5e5;
  text-align: center;
  color: #999;
  font-size: 14px;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
