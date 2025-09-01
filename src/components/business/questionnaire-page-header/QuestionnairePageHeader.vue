<script setup lang="ts">
defineOptions({ name: 'QuestionnairePageHeader' })
const props = defineProps<{
  title?: string
  description?: string
  btnText?: string
  btnType?: string
  isRemove?: boolean
  btnDisabled?: boolean
}>()
const emits = defineEmits(['click'])
function handleBtnClick() {
  emits('click')
}
defineExpose({})
</script>

<template>
  <div class="container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">
          <slot name="titleIcon" />
          {{ props.title }}
        </h1>
        <p class="page-description">
          {{ props.description }}
        </p>
      </div>
      <div class="header-right">
        <!-- dashed outline  primary secondary text -->
        <a-button
          :disabled="btnDisabled"
          type="primary" :status="props.isRemove ? 'danger' : 'normal'"
          size="large"
          :class="{ 'create-btn': !props.isRemove, 'clear-btn': props.isRemove }"
          @click="handleBtnClick"
        >
          <template #icon>
            <slot name="btnIcon" />
          </template>
          {{ props.btnText }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  color: #f53f3f;
  font-size: 28px;
}

.page-description {
  color: #666;
  margin: 0;
}

.clear-btn {
  border-color: #f53f3f;
  height: 44px;
  padding: 0 24px;
  font-weight: 500;
}

.clear-btn:hover:not(:disabled) {
  border-color: #f76965;
  color: #f76965;
  background: #fff2f0;
}

.clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.create-btn {
  background-color: #ff7a00;
  border-color: #ff7a00;
  height: 44px;
  padding: 0 24px;
  font-weight: 500;
}

.create-btn:hover {
  background-color: #ff9500;
  border-color: #ff9500;
}
</style>
