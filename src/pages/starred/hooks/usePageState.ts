import { computed, ref } from 'vue'

export default function usePageState() {
  // 响应式数据
  const loading = ref(false)
  const viewMode = ref<'card' | 'table'>('card')
  const searchKeyword = ref('')
  const selectedGroup = ref('')
  const selectedStatus = ref('')
  const sortBy = ref('starred_desc')
  const currentPage = ref(1)
  const pageSize = ref(12)

  // 筛选选项
  const groups = ref([
    { label: '产品调研', value: 'product' },
    { label: '用户体验', value: 'ux' },
    { label: '市场分析', value: 'market' },
    { label: '员工满意度', value: 'employee' },
    { label: '客户反馈', value: 'feedback' },
  ])

  // 模拟星标问卷数据
  const starredQuestionnaires = ref([
    {
      id: 1,
      title: '用户满意度调研问卷',
      description: '了解用户对我们产品和服务的满意度，收集改进建议',
      status: 'published',
      group: 'product',
      tags: ['satisfaction', 'experience'],
      response_count: 156,
      view_count: 892,
      created_at: '2024-01-15T08:00:00Z',
      starred_at: '2024-01-16T10:30:00Z',
    },
    {
      id: 4,
      title: '员工工作满意度调查',
      description: '了解员工对工作环境和福利的满意度',
      status: 'closed',
      group: 'employee',
      tags: ['satisfaction', 'service'],
      response_count: 234,
      view_count: 567,
      created_at: '2024-01-05T11:30:00Z',
      starred_at: '2024-01-18T14:20:00Z',
    },
    {
      id: 6,
      title: '产品功能优先级调研',
      description: '收集用户对不同功能的优先级排序',
      status: 'published',
      group: 'product',
      tags: ['feature', 'priority'],
      response_count: 78,
      view_count: 345,
      created_at: '2024-01-08T16:45:00Z',
      starred_at: '2024-01-20T09:15:00Z',
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
      title: '状态',
      dataIndex: 'status',
      slotName: 'status',
      width: 100,
    },
    {
      title: '分组',
      dataIndex: 'group',
      width: 120,
      render: ({ record }: any) => record.group || '未分组',
    },
    {
      title: '回答数',
      dataIndex: 'response_count',
      width: 100,
      render: ({ record }: any) => record.response_count || 0,
    },
    {
      title: '收藏时间',
      dataIndex: 'starred_at',
      slotName: 'starred_at',
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
    let result = [...starredQuestionnaires.value]

    // 搜索过滤
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      result = result.filter(q =>
        q.title.toLowerCase().includes(keyword)
        || (q.description && q.description.toLowerCase().includes(keyword)),
      )
    }

    // 分组过滤
    if (selectedGroup.value) {
      result = result.filter(q => q.group === selectedGroup.value)
    }

    // 状态过滤
    if (selectedStatus.value) {
      result = result.filter(q => q.status === selectedStatus.value)
    }

    // 排序
    result.sort((a, b) => {
      switch (sortBy.value) {
        case 'starred_desc':
          return new Date(b.starred_at || b.created_at).getTime() - new Date(a.starred_at || a.created_at).getTime()
        case 'created_desc':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'updated_desc':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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
    selectedGroup,
    selectedStatus,
    sortBy,
    currentPage,
    pageSize,
    groups,
    starredQuestionnaires,
    tableColumns,
    filteredQuestionnaires,
    paginatedQuestionnaires,
  }
}
