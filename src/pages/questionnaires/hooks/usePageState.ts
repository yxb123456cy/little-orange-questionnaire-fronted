import Message from '@arco-design/web-vue/es/message'
import Modal from '@arco-design/web-vue/es/modal'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export default function usePageState() {
  const router = useRouter()
  // 响应式数据
  const loading = ref(false)
  const viewMode = ref<'card' | 'table'>('card')
  const searchKeyword = ref('')
  const selectedGroup = ref('')
  const selectedTags = ref<string[]>([])
  const selectedStatus = ref('')
  const sortBy = ref('created_desc')
  const currentPage = ref(1)
  const pageSize = ref(12)

  const handleViewModechanged = (e: any) => {
    console.warn(e)
  }
  // 筛选选项
  const groups = ref([
    { label: '产品调研', value: 'product' },
    { label: '用户体验', value: 'ux' },
    { label: '市场分析', value: 'market' },
    { label: '员工满意度', value: 'employee' },
    { label: '客户反馈', value: 'feedback' },
  ])

  const tags = ref([
    { label: '满意度', value: 'satisfaction' },
    { label: '体验', value: 'experience' },
    { label: '功能', value: 'feature' },
    { label: '性能', value: 'performance' },
    { label: '界面', value: 'ui' },
    { label: '服务', value: 'service' },
  ])

  // 模拟问卷数据
  const questionnaires = ref([
    {
      id: 1,
      title: '用户满意度调研问卷',
      description: '了解用户对我们产品和服务的满意度，收集改进建议',
      status: 'published',
      group: 'product',
      tags: ['satisfaction', 'experience'],
      is_starred: true,
      response_count: 156,
      view_count: 892,
      created_at: '2024-01-15T08:00:00Z',
      updated_at: '2024-01-20T10:30:00Z',
    },
    {
      id: 2,
      title: '产品功能需求调研',
      description: '收集用户对新功能的需求和期望',
      status: 'draft',
      group: 'product',
      tags: ['feature', 'ui'],
      is_starred: false,
      response_count: 0,
      view_count: 23,
      created_at: '2024-01-18T14:20:00Z',
      updated_at: '2024-01-18T14:20:00Z',
    },
    {
      id: 3,
      title: '网站用户体验评估',
      description: '评估网站的易用性和用户体验',
      status: 'published',
      group: 'ux',
      tags: ['experience', 'ui'],
      is_starred: false,
      response_count: 89,
      view_count: 445,
      created_at: '2024-01-10T09:15:00Z',
      updated_at: '2024-01-19T16:45:00Z',
    },
    {
      id: 4,
      title: '员工工作满意度调查',
      description: '了解员工对工作环境和福利的满意度',
      status: 'closed',
      group: 'employee',
      tags: ['satisfaction', 'service'],
      is_starred: true,
      response_count: 234,
      view_count: 567,
      created_at: '2024-01-05T11:30:00Z',
      updated_at: '2024-01-15T09:20:00Z',
    },
    {
      id: 5,
      title: '客户服务质量评价',
      description: '收集客户对我们服务质量的评价和建议',
      status: 'published',
      group: 'feedback',
      tags: ['service', 'satisfaction'],
      is_starred: false,
      response_count: 67,
      view_count: 234,
      created_at: '2024-01-12T16:00:00Z',
      updated_at: '2024-01-17T14:30:00Z',
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

    // 分组过滤
    if (selectedGroup.value) {
      result = result.filter(q => q.group === selectedGroup.value)
    }

    // 标签过滤
    if (selectedTags.value.length > 0) {
      result = result.filter(q =>
        q.tags && q.tags.some(tag => selectedTags.value.includes(tag)),
      )
    }

    // 状态过滤
    if (selectedStatus.value) {
      result = result.filter(q => q.status === selectedStatus.value)
    }

    // 排序
    result.sort((a, b) => {
      switch (sortBy.value) {
        case 'created_desc':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'created_asc':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case 'updated_desc':
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
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
  // 方法
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }

  function getStatusColor(status: string) {
    const colorMap: Record<string, string> = {
      draft: 'gray',
      published: 'green',
      closed: 'red',
    }
    return colorMap[status] || 'gray'
  }

  function getStatusText(status: string) {
    const textMap: Record<string, string> = {
      draft: '草稿',
      published: '已发布',
      closed: '已关闭',
    }
    return textMap[status] || '未知'
  }

  function handleSearch() {
    currentPage.value = 1
  }

  function handleFilter() {
    currentPage.value = 1
  }

  function createQuestionnaire() {
    router.push('/questionnaires/create')
  }

  function previewQuestionnaire(questionnaire: any) {
    console.warn('预览问卷:', questionnaire)
    Message.info(`预览问卷：${questionnaire.title}`)
  }

  function editQuestionnaire(questionnaire: any) {
    router.push(`/questionnaires/${questionnaire.id}/edit`)
  }

  function toggleStar(questionnaire: any) {
    questionnaire.is_starred = !questionnaire.is_starred
    Message.success(questionnaire.is_starred ? '已加入星标' : '已取消星标')
  }

  function moveToTrash(questionnaire: any) {
    Modal.confirm({
      title: '确认移至回收站？',
      content: `问卷「${questionnaire.title}」将被移至回收站，可在回收站中恢复。`,
      onOk: () => {
        const index = questionnaires.value.findIndex(q => q.id === questionnaire.id)
        if (index > -1) {
          questionnaires.value.splice(index, 1)
          Message.success('已移至回收站')
        }
      },
    })
  }

  // 全部返回
  return {
    loading,
    viewMode,
    searchKeyword,
    selectedGroup,
    selectedTags,
    selectedStatus,
    sortBy,
    currentPage,
    pageSize,
    groups,
    tags,
    questionnaires,
    tableColumns,
    filteredQuestionnaires,
    paginatedQuestionnaires,
    handleViewModechanged,
    formatDate,
    getStatusColor,
    getStatusText,
    handleSearch,
    handleFilter,
    createQuestionnaire,
    previewQuestionnaire,
    editQuestionnaire,
    toggleStar,
    moveToTrash,
  }
}
