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
  <div class="number-renderer">
    <div class="question-title">
      {{ question.title }}
      <span v-if="question.required" class="required-mark">*</span>
    </div>
    <div v-if="question.description" class="question-description">
      {{ question.description }}
    </div>
    <a-input-number
      :min="question.config?.minValue"
      :max="question.config?.maxValue"
      :step="question.config?.step || 1"
      :disabled="preview"
      :placeholder="question.config?.placeholder || '请输入数字'"
      class="number-input"
      style="width: 100%; max-width: 300px;"
    />
    <div v-if="question.config?.minValue !== undefined || question.config?.maxValue !== undefined" class="number-hint">
      <span v-if="question.config?.minValue !== undefined">最小值: {{ question.config.minValue }}</span>
      <span v-if="question.config?.maxValue !== undefined">最大值: {{ question.config.maxValue }}</span>
    </div>
  </div>
</template>

<style scoped>
.number-renderer {
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

.number-hint {
  display: flex;
  gap: 16px;
  margin-top: 4px;
  font-size: 12px;
  color: #999;
}

:deep(.arco-input-number-focused) {
  border-color: #ff7a00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
}
</style>
