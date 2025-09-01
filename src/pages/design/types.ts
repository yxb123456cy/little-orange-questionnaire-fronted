export interface QuestionComponent {
  id: string
  type: 'title' | 'single-line' | 'multi-line' | 'single-choice' | 'multi-choice' | 'rating' | 'date' | 'number'
  title: string
  description?: string
  required: boolean
  options?: string[]
  config?: {
    placeholder?: string
    maxLength?: number
    minValue?: number
    maxValue?: number
    step?: number
    format?: string
  }
}

export interface QuestionnaireDesign {
  id?: string
  title: string
  description: string
  components: QuestionComponent[]
  settings: {
    theme: string
    submitText: string
    thankYouText: string
  }
}

export interface ComponentTemplate {
  type: QuestionComponent['type']
  name: string
  icon: string
  description: string
  defaultConfig: Partial<QuestionComponent>
}
