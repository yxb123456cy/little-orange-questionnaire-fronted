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
  <div class="single-line-renderer">
    <div class="question-title">
      {{ question.title }}
      <span v-if="question.required" class="required-mark">*</span>
    </div>
    <div v-if="question.description" class="question-description">
      {{ question.description }}
    </div>
    <a-input
      :placeholder="question.config?.placeholder || '请输入...'" :max-length="question.config?.maxLength"
      :disabled="preview" class="question-input"
    />
  </div>
</template>

<style scoped>
.single-line-renderer {
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

.question-input {
    width: 100%;
}
</style>
