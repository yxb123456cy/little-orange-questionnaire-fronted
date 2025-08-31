import { reactive, ref } from 'vue'

export default function usePageState() {
  const loading = ref(false)

  const form = reactive({
    email: '',
    password: '',
    remember: false,
  })

  const rules = {
    email: [
      { required: true, message: '请输入邮箱地址' },
      { type: 'email', message: '请输入正确的邮箱格式' },
    ],
    password: [
      { required: true, message: '请输入密码' },
      { minLength: 6, message: '密码长度不能少于6位' },
    ],
  }
  return { loading, form, rules }
}
