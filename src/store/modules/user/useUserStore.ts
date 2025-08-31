import type { User } from '../../../types'
import { Message } from '@arco-design/web-vue'

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State: 当前浏览器存储的Users 以邮箱作为用户标识;
  const userList = ref<User[]>([]) // 初始为空数组
  // State: 当前登录用户信息
  const currentUserInfo = ref<User | null>(null)

  // action: 设置当前登录用户信息
  function setCurrentUserInfo(userInfo: User) {
    currentUserInfo.value = userInfo
  }

  // action: 注册用户 pinia+LocalStorage模拟;
  function registerUser(userInfo: User): boolean {
    // TODO: 注册用户
    console.warn('注册用户：', userInfo)
    // 先检查是否存在;
    const exist = userList.value.find(u => u.email === userInfo.email)
    if (exist && exist !== undefined && exist !== null) {
      console.error(`邮箱为: ${userInfo.email}的用户已存在！`)
      Message.error(`邮箱为: ${userInfo.email}的用户已存在！`)
      return false
    }
    else {
      userInfo.token = ''
      userList.value?.push(userInfo) // 加入至UserList;
      console.warn(`用户: ${userInfo.username} 注册成功！`)
      return true
    }
  }

  // getter: 获取当前登录用户信息
  const getCurrentUserInfo = computed(() => currentUserInfo.value)
  const getUserList = computed(() => userList.value)
  return {
    currentUserInfo,
    userList,
    setCurrentUserInfo,
    registerUser,
    getCurrentUserInfo,
    getUserList,
  }
}, {
  // 使用持久化插件;
  persist: true,
})
