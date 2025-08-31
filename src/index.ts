import ArcoVue from '@arco-design/web-vue'
// 引入ArcoVue ICON库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
import pinia from './store/base'
import './index.css'
import '@arco-design/web-vue/dist/arco.css'

const app = createApp(App)
// 使用ArcoVue 全量注册;
app.use(ArcoVue)
// 使用 ArcoVue ICON库
app.use(ArcoVueIcon)
// 挂载pinia
app.use(pinia)
// 挂载路由
app.use(router)
app.mount('#root')
