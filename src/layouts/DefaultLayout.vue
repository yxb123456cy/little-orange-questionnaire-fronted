<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter v-if="$route.name === 'Home'" />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 80px;
  /* Header高度 */
}
</style>
