export interface QuestionnaireBaseDetails {
  id: number
  title: string
  description?: string
  status: string
  group?: string
  tags?: string[]
  is_starred: boolean
  response_count: number
  view_count: number
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface QuestionnaireTableProps {
  questionnaires: QuestionnaireBaseDetails[]
  loading?: boolean
  pagination?: {
    current: number
    pageSize: number
    total: number
  }
  rowSelection?: {
    selectedRowKeys: (string | number)[]
    onSelectionChange: (selectedRowKeys: (string | number)[]) => void
  }
}

export interface QuestionnaireTableEmits {
  preview: [questionnaire: QuestionnaireBaseDetails]
  edit: [questionnaire: QuestionnaireBaseDetails]
  duplicate: [questionnaire: QuestionnaireBaseDetails]
  toggleStar: [questionnaire: QuestionnaireBaseDetails]
  remove: [questionnaire: QuestionnaireBaseDetails]
  restore?: [questionnaire: QuestionnaireBaseDetails]
  permanentDelete?: [questionnaire: QuestionnaireBaseDetails]
}
