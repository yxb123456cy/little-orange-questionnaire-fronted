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
  <div class="single-choice-renderer">
    <div class="question-title">
      {{ question.title }}
      <span v-if="question.required" class="required-mark">*</span>
    </div>
    <div v-if="question.description" class="question-description">
      {{ question.description }}
    </div>
    <a-radio-group :disabled="preview" class="options-group">
      <a-radio v-for="(option, index) in question.options" :key="index" :value="index" class="option-item">
        {{ option }}
      </a-radio>
    </a-radio-group>
  </div>
</template>

<style scoped>
.single-choice-renderer {
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

.options-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.option-item {
    margin: 0;
}
</style>
