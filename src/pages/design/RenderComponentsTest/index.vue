<script setup lang="ts">
import type { QuestionComponent } from '../types'
import {
  IconDelete,
  IconPlus,
  IconRefresh,
} from '@arco-design/web-vue/es/icon'

import Message from '@arco-design/web-vue/es/message'
import { computed, reactive, ref } from 'vue'
import DateRenderer from '../components/render/DateRenderer.vue'
import MultiChoiceRenderer from '../components/render/MultiChoiceRenderer.vue'
import MultiLineRenderer from '../components/render/MultiLineRenderer.vue'
import NumberRenderer from '../components/render/NumberRenderer.vue'
import RatingRenderer from '../components/render/RatingRenderer.vue'
import SingleChoiceRenderer from '../components/render/SingleChoiceRenderer.vue'

import SingleLineRenderer from '../components/render/SingleLineRenderer.vue'
// 导入所有渲染器组件
import TitleRenderer from '../components/render/TitleRenderer.vue'

// 预览模式开关
const previewMode = ref(false)

// 问卷标题数据
const titleQuestion = reactive<QuestionComponent>({
  id: 'title_1',
  type: 'title',
  title: '用户体验调研问卷',
  description: '感谢您参与我们的用户体验调研，您的反馈对我们非常重要！',
  required: false,
  config: {},
})

// 单行文本数据
const singleLineQuestion = reactive<QuestionComponent>({
  id: 'single_1',
  type: 'single-line',
  title: '请输入您的姓名',
  description: '请填写您的真实姓名',
  required: true,
  config: {
    placeholder: '请输入您的姓名',
    maxLength: 50,
  },
})

// 多行文本数据
const multiLineQuestion = reactive<QuestionComponent>({
  id: 'multi_1',
  type: 'multi-line',
  title: '请分享您对我们产品的建议',
  description: '您的宝贵建议将帮助我们改进产品',
  required: false,
  config: {
    placeholder: '请详细描述您的建议...',
    maxLength: 500,
  },
})

// 单选题数据
const singleChoiceQuestion = reactive<QuestionComponent>({
  id: 'single_choice_1',
  type: 'single-choice',
  title: '您的性别是？',
  description: '请选择您的性别',
  required: true,
  options: ['男', '女', '不愿透露'],
  config: {},
})

// 多选题数据
const multiChoiceQuestion = reactive<QuestionComponent>({
  id: 'multi_choice_1',
  type: 'multi-choice',
  title: '您的兴趣爱好有哪些？',
  description: '可以选择多个选项',
  required: false,
  options: ['运动健身', '音乐', '阅读', '旅行', '摄影', '美食'],
  config: {},
})

// 评分数据
const ratingQuestion = reactive<QuestionComponent>({
  id: 'rating_1',
  type: 'rating',
  title: '请为我们的服务评分',
  description: '1分最低，5分最高',
  required: true,
  config: {
    minValue: 1,
    maxValue: 5,
  },
})

// 日期选择数据
const dateQuestion = reactive<QuestionComponent>({
  id: 'date_1',
  type: 'date',
  title: '请选择您的出生日期',
  description: '用于年龄统计分析',
  required: false,
  config: {
    format: 'YYYY-MM-DD',
  },
})

// 数字输入数据
const numberQuestion = reactive<QuestionComponent>({
  id: 'number_1',
  type: 'number',
  title: '请输入您的年龄',
  description: '请输入您的真实年龄',
  required: true,
  config: {
    placeholder: '请输入年龄',
    minValue: 0,
    maxValue: 150,
    step: 1,
  },
})

// 所有问题数据的计算属性
const allQuestions = computed(() => ({
  title: titleQuestion,
  singleLine: singleLineQuestion,
  multiLine: multiLineQuestion,
  singleChoice: singleChoiceQuestion,
  multiChoice: multiChoiceQuestion,
  rating: ratingQuestion,
  date: dateQuestion,
  number: numberQuestion,
}))

// 更新问题数据
function updateQuestion(id: string, updates: Partial<QuestionComponent>) {
  console.warn('更新问题:', id, updates)
  // 这里可以实现具体的更新逻辑
}

// 添加选项
function addOption(type: 'single' | 'multi') {
  const question = type === 'single' ? singleChoiceQuestion : multiChoiceQuestion
  if (question.options) {
    question.options.push(`选项 ${question.options.length + 1}`)
  }
}

// 删除选项
function removeOption(type: 'single' | 'multi', index: number) {
  const question = type === 'single' ? singleChoiceQuestion : multiChoiceQuestion
  if (question.options && question.options.length > 2) {
    question.options.splice(index, 1)
  }
}

// 重置所有数据
function resetAllData() {
  // 重置问卷标题
  Object.assign(titleQuestion, {
    title: '用户体验调研问卷',
    description: '感谢您参与我们的用户体验调研，您的反馈对我们非常重要！',
  })

  // 重置单行文本
  Object.assign(singleLineQuestion, {
    title: '请输入您的姓名',
    description: '请填写您的真实姓名',
    required: true,
    config: {
      placeholder: '请输入您的姓名',
      maxLength: 50,
    },
  })

  // 重置多行文本
  Object.assign(multiLineQuestion, {
    title: '请分享您对我们产品的建议',
    description: '您的宝贵建议将帮助我们改进产品',
    required: false,
    config: {
      placeholder: '请详细描述您的建议...',
      maxLength: 500,
    },
  })

  // 重置单选题
  Object.assign(singleChoiceQuestion, {
    title: '您的性别是？',
    description: '请选择您的性别',
    required: true,
    options: ['男', '女', '不愿透露'],
  })

  // 重置多选题
  Object.assign(multiChoiceQuestion, {
    title: '您的兴趣爱好有哪些？',
    description: '可以选择多个选项',
    required: false,
    options: ['运动健身', '音乐', '阅读', '旅行', '摄影', '美食'],
  })

  // 重置评分
  Object.assign(ratingQuestion, {
    title: '请为我们的服务评分',
    description: '1分最低，5分最高',
    required: true,
    config: {
      minValue: 1,
      maxValue: 5,
    },
  })

  // 重置日期
  Object.assign(dateQuestion, {
    title: '请选择您的出生日期',
    description: '用于年龄统计分析',
    required: false,
    config: {
      format: 'YYYY-MM-DD',
    },
  })

  // 重置数字
  Object.assign(numberQuestion, {
    title: '请输入您的年龄',
    description: '请输入您的真实年龄',
    required: true,
    config: {
      placeholder: '请输入年龄',
      minValue: 0,
      maxValue: 150,
      step: 1,
    },
  })

  Message.success('所有数据已重置')
}
</script>

<template>
  <div class="render-test">
    <!-- 页面头部 -->
    <div class="test-header">
      <h1 class="test-title">
        问卷渲染器组件测试
      </h1>
      <p class="test-description">
        测试所有问卷组件的渲染效果和交互功能
      </p>
      <div class="test-controls">
        <a-switch v-model="previewMode" class="preview-switch">
          <template #checked>
            预览模式
          </template>
          <template #unchecked>
            编辑模式
          </template>
        </a-switch>
        <a-button type="outline" @click="resetAllData">
          <template #icon>
            <IconRefresh />
          </template>
          重置数据
        </a-button>
      </div>
    </div>

    <!-- 测试内容区域 -->
    <div class="test-content">
      <!-- 问卷标题渲染器测试 -->
      <div class="test-section">
        <div class="section-header">
          <h2 class="section-title">
            1. 问卷标题渲染器
          </h2>
          <a-tag color="blue">
            TitleRenderer
          </a-tag>
        </div>
        <div class="component-demo">
          <TitleRenderer
            :question="titleQuestion"
            :preview="previewMode"
            @update="updateQuestion"
          />
        </div>
        <div class="component-config">
          <h4>配置参数：</h4>
          <a-form layout="vertical" size="small">
            <a-form-item label="标题">
              <a-input v-model="titleQuestion.title" placeholder="请输入问卷标题" />
            </a-form-item>
            <a-form-item label="描述">
              <a-textarea v-model="titleQuestion.description" placeholder="请输入问卷描述" :rows="2" />
            </a-form-item>
          </a-form>
        </div>
      </div>

      <!-- 单行文本渲染器测试 -->
      <div class="test-section">
        <div class="section-header">
          <h2 class="section-title">
            2. 单行文本渲染器
          </h2>
          <a-tag color="green">
            SingleLineRenderer
          </a-tag>
        </div>
        <div class="component-demo">
          <SingleLineRenderer
            :question="singleLineQuestion"
            :preview="previewMode"
            @update="updateQuestion"
          />
        </div>
        <div class="component-config">
          <h4>配置参数：</h4>
          <a-form layout="vertical" size="small">
            <a-form-item label="题目标题">
              <a-input v-model="singleLineQuestion.title" />
            </a-form-item>
            <a-form-item label="占位符">
              <a-input v-model="singleLineQuestion.config!.placeholder" />
            </a-form-item>
            <a-form-item label="最大字符数">
              <a-input-number v-model="singleLineQuestion.config!.maxLength" :min="1" :max="1000" />
            </a-form-item>
            <a-form-item>
              <a-checkbox v-model="singleLineQuestion.required">
                必填项
              </a-checkbox>
            </a-form-item>
          </a-form>
        </div>
      </div>

      <!-- 多行文本渲染器测试 -->
      <div class="test-section">
        <div class="section-header">
          <h2 class="section-title">
            3. 多行文本渲染器
          </h2>
          <a-tag color="green">
            MultiLineRenderer
          </a-tag>
        </div>
        <div class="component-demo">
          <MultiLineRenderer
            :question="multiLineQuestion"
            :preview="previewMode"
            @update="updateQuestion"
          />
        </div>
        <div class="component-config">
          <h4>配置参数：</h4>
          <a-form layout="vertical" size="small">
            <a-form-item label="题目标题">
              <a-input v-model="multiLineQuestion.title" />
            </a-form-item>
            <a-form-item label="占位符">
              <a-input v-model="multiLineQuestion.config!.placeholder" />
            </a-form-item>
            <a-form-item label="最大字符数">
              <a-input-number v-model="multiLineQuestion.config!.maxLength" :min="1" :max="2000" />
            </a-form-item>
            <a-form-item>
              <a-checkbox v-model="multiLineQuestion.required">
                必填项
              </a-checkbox>
            </a-form-item>
          </a-form>
        </div>
      </div>

      <!-- 单选题渲染器测试 -->
      <div class="test-section">
        <div class="section-header">
          <h2 class="section-title">
            4. 单选题渲染器
          </h2>
          <a-tag color="orange">
            SingleChoiceRenderer
          </a-tag>
        </div>
        <div class="component-demo">
          <SingleChoiceRenderer
            :question="singleChoiceQuestion"
            :preview="previewMode"
            @update="updateQuestion"
          />
        </div>
        <div class="component-config">
          <h4>配置参数：</h4>
          <a-form layout="vertical" size="small">
            <a-form-item label="题目标题">
              <a-input v-model="singleChoiceQuestion.title" />
            </a-form-item>
            <a-form-item label="选项设置">
              <div class="options-editor">
                <div v-for="(_option, index) in singleChoiceQuestion.options" :key="index" class="option-item">
                  <a-input v-model="singleChoiceQuestion.options![index]" :placeholder="`选项 ${index + 1}`" />
                  <a-button type="text" size="small" :disabled="singleChoiceQuestion.options!.length <= 2" @click="removeOption('single', index)">
                    <template #icon>
                      <IconDelete />
                    </template>
                  </a-button>
                </div>
                <a-button type="dashed" size="small" @click="addOption('single')">
                  <template #icon>
                    <IconPlus />
                  </template>
                  添加选项
                </a-button>
              </div>
            </a-form-item>
            <a-form-item>
              <a-checkbox v-model="singleChoiceQuestion.required">
                必填项
              </a-checkbox>
            </a-form-item>
          </a-form>
        </div>
      </div>

      <!-- 多选题渲染器测试 -->
      <div class="test-section">
        <div class="section-header">
          <h2 class="section-title">
            5. 多选题渲染器
          </h2>
          <a-tag color="orange">
            MultiChoiceRenderer
          </a-tag>
        </div>
        <div class="component-demo">
          <MultiChoiceRenderer
            :question="multiChoiceQuestion"
            :preview="previewMode"
            @update="updateQuestion"
          />
        </div>
        <div class="component-config">
          <h4>配置参数：</h4>
          <a-form layout="vertical" size="small">
            <a-form-item label="题目标题">
              <a-input v-model="multiChoiceQuestion.title" />
            </a-form-item>
            <a-form-item label="选项设置">
              <div class="options-editor">
                <div v-for="(_option, index) in multiChoiceQuestion.options" :key="index" class="option-item">
                  <a-input v-model="multiChoiceQuestion.options![index]" :placeholder="`选项 ${index + 1}`" />
                  <a-button type="text" size="small" :disabled="multiChoiceQuestion.options!.length <= 2" @click="removeOption('multi', index)">
                    <template #icon>
                      <IconDelete />
                    </template>
                  </a-button>
                </div>
                <a-button type="dashed" size="small" @click="addOption('multi')">
                  <template #icon>
                    <IconPlus />
                  </template>
                  添加选项
                </a-button>
              </div>
            </a-form-item>
            <a-form-item>
              <a-checkbox v-model="multiChoiceQuestion.required">
                必填项
              </a-checkbox>
            </a-form-item>
          </a-form>
        </div>
      </div>

      <!-- 评分渲染器测试 -->
      <div class="test-section">
        <div class="section-header">
          <h2 class="section-title">
            6. 评分渲染器
          </h2>
          <a-tag color="purple">
            RatingRenderer
          </a-tag>
        </div>
        <div class="component-demo">
          <RatingRenderer
            :question="ratingQuestion"
            :preview="previewMode"
            @update="updateQuestion"
          />
        </div>
        <div class="component-config">
          <h4>配置参数：</h4>
          <a-form layout="vertical" size="small">
            <a-form-item label="题目标题">
              <a-input v-model="ratingQuestion.title" />
            </a-form-item>
            <a-form-item label="最小值">
              <a-input-number v-model="ratingQuestion.config!.minValue" :min="1" :max="10" />
            </a-form-item>
            <a-form-item label="最大值">
              <a-input-number v-model="ratingQuestion.config!.maxValue" :min="1" :max="10" />
            </a-form-item>
            <a-form-item>
              <a-checkbox v-model="ratingQuestion.required">
                必填项
              </a-checkbox>
            </a-form-item>
          </a-form>
        </div>
      </div>

      <!-- 日期选择渲染器测试 -->
      <div class="test-section">
        <div class="section-header">
          <h2 class="section-title">
            7. 日期选择渲染器
          </h2>
          <a-tag color="cyan">
            DateRenderer
          </a-tag>
        </div>
        <div class="component-demo">
          <DateRenderer
            :question="dateQuestion"
            :preview="previewMode"
            @update="updateQuestion"
          />
        </div>
        <div class="component-config">
          <h4>配置参数：</h4>
          <a-form layout="vertical" size="small">
            <a-form-item label="题目标题">
              <a-input v-model="dateQuestion.title" />
            </a-form-item>
            <a-form-item label="日期格式">
              <a-select v-model="dateQuestion.config!.format">
                <a-option value="YYYY-MM-DD">
                  YYYY-MM-DD
                </a-option>
                <a-option value="YYYY/MM/DD">
                  YYYY/MM/DD
                </a-option>
                <a-option value="MM/DD/YYYY">
                  MM/DD/YYYY
                </a-option>
                <a-option value="DD-MM-YYYY">
                  DD-MM-YYYY
                </a-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-checkbox v-model="dateQuestion.required">
                必填项
              </a-checkbox>
            </a-form-item>
          </a-form>
        </div>
      </div>

      <!-- 数字输入渲染器测试 -->
      <div class="test-section">
        <div class="section-header">
          <h2 class="section-title">
            8. 数字输入渲染器
          </h2>
          <a-tag color="red">
            NumberRenderer
          </a-tag>
        </div>
        <div class="component-demo">
          <NumberRenderer
            :question="numberQuestion"
            :preview="previewMode"
            @update="updateQuestion"
          />
        </div>
        <div class="component-config">
          <h4>配置参数：</h4>
          <a-form layout="vertical" size="small">
            <a-form-item label="题目标题">
              <a-input v-model="numberQuestion.title" />
            </a-form-item>
            <a-form-item label="占位符">
              <a-input v-model="numberQuestion.config!.placeholder" />
            </a-form-item>
            <a-form-item label="最小值">
              <a-input-number v-model="numberQuestion.config!.minValue" />
            </a-form-item>
            <a-form-item label="最大值">
              <a-input-number v-model="numberQuestion.config!.maxValue" />
            </a-form-item>
            <a-form-item label="步长">
              <a-input-number v-model="numberQuestion.config!.step" :min="0.01" :step="0.01" />
            </a-form-item>
            <a-form-item>
              <a-checkbox v-model="numberQuestion.required">
                必填项
              </a-checkbox>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>

    <!-- 测试结果展示 -->
    <div class="test-results">
      <h2>测试数据输出</h2>
      <a-textarea
        :value="JSON.stringify(allQuestions, null, 2)"
        :rows="10"
        readonly
        class="json-output"
      />
    </div>
  </div>
</template>

<style scoped>
.render-test {
  min-height: 100vh;
  background: #fafafa;
  padding: 24px;
}

/* 页面头部 */
.test-header {
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.test-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.test-description {
  color: #666;
  margin-bottom: 16px;
}

.test-controls {
  display: flex;
  gap: 16px;
  align-items: center;
}

.preview-switch {
  background-color: #ff7a00;
}

/* 测试内容 */
.test-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.test-section {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: #fff7f0;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.component-demo {
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.component-config {
  padding: 20px 24px;
}

.component-config h4 {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-bottom: 16px;
}

/* 选项编辑器 */
.options-editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

/* 测试结果 */
.test-results {
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-top: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.test-results h2 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.json-output {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  background: #f5f5f5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .render-test {
    padding: 16px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .test-controls {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
