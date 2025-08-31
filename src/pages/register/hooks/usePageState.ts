import { reactive, ref } from 'vue'

export default function usePageState() {
  const loading = ref(false)

  const form = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  })

  const rules = {
    username: [
      { required: true, message: '请输入用户名' },
      { minLength: 2, message: '用户名长度不能少于2位' },
      { maxLength: 20, message: '用户名长度不能超过20位' },
    ],
    email: [
      { required: true, message: '请输入邮箱地址' },
      { type: 'email', message: '请输入正确的邮箱格式' },
    ],
    password: [
      { required: true, message: '请输入密码' },
      { minLength: 6, message: '密码长度不能少于6位' },
    ],
    confirmPassword: [
      { required: true, message: '请确认密码' },
      {
        // eslint-disable-next-line ts/no-unsafe-function-type
        validator: (value: string, callback: Function) => {
          if (value !== form.password) {
            callback('两次输入的密码不一致')
          }
          else {
            callback()
          }
        },
      },
    ],
  }
  return { loading, rules, form }
}
