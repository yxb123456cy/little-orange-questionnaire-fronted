import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
// 引入ArcoVue ICON库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import pinia from './store/base';

const app = createApp(App)
// 使用ArcoVue 全量注册;
app.use(ArcoVue);
// 使用 ArcoVue ICON库
app.use(ArcoVueIcon);
// 挂载pinia
app.use(pinia);
app.mount('#root');
