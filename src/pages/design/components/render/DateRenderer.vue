<script setup lang="ts">
import type { QuestionComponent } from '../../types'

defineProps<{
  question: QuestionComponent
  preview?: boolean
}>()

defineEmits<{
  update: [id: string, updates: Partial<QuestionComponent>]
}>()
</script>

<template>
  <div class="date-renderer">
    <div class="question-title">
      {{ question.title }}
      <span v-if="question.required" class="required-mark">*</span>
    </div>
    <div v-if="question.description" class="question-description">
      {{ question.description }}
    </div>
    <a-date-picker
      :format="question.config?.format || 'YYYY-MM-DD'"
      :disabled="preview"
      class="date-picker"
      placeholder="请选择日期"
      style="width: 100%; max-width: 300px;"
    />
  </div>
</template>

<style scoped>
.date-renderer {
  margin-bottom: 16px;
}

.question-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.required-mark {
  color: #f53f3f;
  margin-left: 4px;
}

.question-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

:deep(.arco-picker-focused) {
  border-color: #ff7a00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
}
</style>
