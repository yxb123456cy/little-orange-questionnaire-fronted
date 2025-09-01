export interface QuestionnaireBaseDetails {
  id: number
  title: string
  description: string
  status: string
  group: string
  tags: string[]
  is_starred: boolean
  response_count: number
  view_count: number
  created_at: string
  updated_at: string
}
