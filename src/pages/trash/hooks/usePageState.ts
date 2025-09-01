import { computed, ref } from 'vue'

export default function usePageState() {
  // 响应式数据
  const loading = ref(false)
  const viewMode = ref<'card' | 'table'>('card')
  const searchKeyword = ref('')
  const deletedTimeFilter = ref('')
  const sortBy = ref('deleted_desc')
  const currentPage = ref(1)
  const pageSize = ref(12)
  const selectedItems = ref<number[]>([])

  // 模拟回收站问卷数据
  const questionnaires = ref([
    {
      id: 1,
      title: '用户满意度调研问卷',
      description: '了解用户对我们产品和服务的满意度，收集改进建议',
      group: 'product',
      tags: ['satisfaction', 'experience'],
      response_count: 156,
      created_at: '2024-01-15T08:00:00Z',
      deleted_at: '2024-01-22T14:30:00Z',
    },
    {
      id: 2,
      title: '产品功能需求调研',
      description: '收集用户对新功能的需求和期望',
      group: 'product',
      tags: ['feature', 'ui'],
      response_count: 89,
      created_at: '2024-01-18T14:20:00Z',
      deleted_at: '2024-01-21T09:15:00Z',
    },
    {
      id: 3,
      title: '网站用户体验评估',
      description: '评估网站的易用性和用户体验',
      group: 'ux',
      tags: ['experience', 'ui'],
      response_count: 234,
      created_at: '2024-01-10T09:15:00Z',
      deleted_at: '2024-01-20T16:45:00Z',
    },
  ])

  // 表格列配置
  const tableColumns = [
    {
      title: '问卷标题',
      dataIndex: 'title',
      slotName: 'title',
      width: 300,
    },
    {
      title: '分组',
      dataIndex: 'group',
      width: 120,
      render: ({ record }: any) => record.group || '未分组',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      slotName: 'tags',
      width: 150,
    },
    {
      title: '回答数',
      dataIndex: 'response_count',
      width: 100,
      render: ({ record }: any) => record.response_count || 0,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      slotName: 'created_at',
      width: 120,
    },
    {
      title: '删除时间',
      dataIndex: 'deleted_at',
      slotName: 'deleted_at',
      width: 120,
    },
    {
      title: '操作',
      slotName: 'actions',
      width: 150,
      fixed: 'right',
    },
  ]

  // 计算属性
  const filteredQuestionnaires = computed(() => {
    let result = [...questionnaires.value]

    // 搜索过滤
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      result = result.filter(q =>
        q.title.toLowerCase().includes(keyword)
        || (q.description && q.description.toLowerCase().includes(keyword)),
      )
    }

    // 删除时间过滤
    if (deletedTimeFilter.value) {
      const now = new Date()
      const filterDate = new Date()

      switch (deletedTimeFilter.value) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0)
          break
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
      }

      result = result.filter(q => new Date(q.deleted_at) >= filterDate)
    }

    // 排序
    result.sort((a, b) => {
      switch (sortBy.value) {
        case 'deleted_desc':
          return new Date(b.deleted_at).getTime() - new Date(a.deleted_at).getTime()
        case 'deleted_asc':
          return new Date(a.deleted_at).getTime() - new Date(b.deleted_at).getTime()
        case 'title_asc':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return result
  })

  const paginatedQuestionnaires = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredQuestionnaires.value.slice(start, end)
  })

  return {
    loading,
    viewMode,
    searchKeyword,
    deletedTimeFilter,
    sortBy,
    currentPage,
    pageSize,
    selectedItems,
    questionnaires,
    tableColumns,
    filteredQuestionnaires,
    paginatedQuestionnaires,
  }
}
