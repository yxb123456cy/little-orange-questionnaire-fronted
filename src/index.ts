import ArcoVue from '@arco-design/web-vue'
// 引入ArcoVue ICON库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
import './index.css'
import '@arco-design/web-vue/dist/arco.css'

// 创建Pinia示例;
const pinia = createPinia()
const app = createApp(App)
// 使用ArcoVue 全量注册;
app.use(ArcoVue)
// 使用 ArcoVue ICON库
app.use(ArcoVueIcon)
// 挂载pinia
app.use(pinia.use(piniaPluginPersistedstate))
// 挂载路由
app.use(router)
app.mount('#app')
