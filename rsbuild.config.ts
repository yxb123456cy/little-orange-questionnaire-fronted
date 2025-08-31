import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'

export default defineConfig({
  dev: {
    client: {
      overlay: false,
    },
  },
  plugins: [pluginVue()],
  performance: {
    buildCache: false,
  },
  tools: {
    // bundlerChain: (chain, { CHAIN_ID }) => {
    //   chain.plugin('Rsdoctor').use(RsdoctorRspackPlugin, [
    //     {
    //       // 插件选项
    //     },
    //   ]);
    // },
  },
})
