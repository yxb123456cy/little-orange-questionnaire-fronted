import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import pinia from './store/base';

const app = createApp(App)
// 挂载pinia
app.use(pinia);
app.mount('#root');
