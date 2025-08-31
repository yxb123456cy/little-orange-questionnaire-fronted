import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
export default defineConfig({
  plugins: [pluginVue()],
  performance: {
    buildCache: false,
  },
  tools: {
    bundlerChain: (chain, { CHAIN_ID }) => {
      chain.plugin('Rsdoctor').use(RsdoctorRspackPlugin, [
        {
          // 插件选项
        },
      ]);
    },
  },
});
