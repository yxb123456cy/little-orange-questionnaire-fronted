import { createPinia } from 'pinia'
// 引入Pinia持久化插件;
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 创建Pinia示例;
const pinia = createPinia()
// 使用Pinia持久化插件;
pinia.use(piniaPluginPersistedstate)

// 默认导出Pinia实例;
export default pinia;