<script setup lang="ts">
import type { QuestionComponent } from '../../types'

defineProps<{
  question: QuestionComponent
  preview?: boolean // 是否处于预览状态?
}>()

defineEmits<{
  /**
   * 更新问卷标题 id:题目的唯一标识
   */
  update: [id: string, updates: Partial<QuestionComponent>]
}>()
</script>

<template>
  <!-- 标题渲染器 -->
  <div class="title-renderer">
    <div class="questionnaire-header">
      <h1 class="questionnaire-title">
        {{ question.title || '问卷标题' }}
      </h1>
      <div v-if="question.description" class="questionnaire-description">
        <!-- 问卷详情 -->
        {{ question.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-renderer {
  margin-bottom: 24px;
  text-align: center;
}

.questionnaire-header {
  padding: 24px;
  background: linear-gradient(135deg, #fff7f0 0%, #ffede0 100%);
  border-radius: 12px;
  border: 2px solid #ff7a00;
}

.questionnaire-title {
  font-size: 24px;
  font-weight: 700;
  color: #ff7a00;
  margin-bottom: 12px;
  line-height: 1.3;
}

.questionnaire-description {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}
</style>
