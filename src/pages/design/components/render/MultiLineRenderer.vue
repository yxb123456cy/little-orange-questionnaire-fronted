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
  <div class="multi-line-renderer">
    <div class="question-title">
      {{ question.title }}
      <span v-if="question.required" class="required-mark">*</span>
    </div>
    <div v-if="question.description" class="question-description">
      {{ question.description }}
    </div>
    <a-textarea
      :placeholder="question.config?.placeholder || '请输入...'"
      :max-length="question.config?.maxLength"
      :rows="4"
      :disabled="preview"
      class="question-textarea"
      show-word-limit
    />
  </div>
</template>

<style scoped>
.multi-line-renderer {
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

.question-textarea {
  width: 100%;
}
</style>
