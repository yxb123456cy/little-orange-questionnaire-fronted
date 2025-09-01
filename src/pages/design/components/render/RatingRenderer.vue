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
  <!-- 评分渲染器 -->
  <div class="rating-renderer">
    <div class="question-title">
      {{ question.title }}
      <span v-if="question.required" class="required-mark">*</span>
    </div>
    <div v-if="question.description" class="question-description">
      {{ question.description }}
    </div>
    <div class="rating-container">
      <a-rate
        :count="question.config?.maxValue || 5"
        :disabled="preview"
        class="rating-stars"
        allow-half
      />
      <div class="rating-labels">
        <span class="label-min">{{ question.config?.minValue || 1 }}分</span>
        <span class="label-max">{{ question.config?.maxValue || 5 }}分</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rating-renderer {
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

.rating-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rating-stars {
  font-size: 24px;
}

:deep(.arco-rate-star-icon) {
  color: #ff7a00;
}

.rating-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}
</style>
