import type { User } from '../../../types'

import { Message } from '@arco-design/web-vue'

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { EncryptPasswordMD5 } from '../../../utils/modules/crypto'
import { GetRandomUuid8Mix } from '../../../utils/modules/uuid'

export interface UserExtensions {
  introduction?: string // 个人简介;
  viewed?: number // 被浏览次数;
  questionnaireCount?: number // 发布的问卷数量;
  responseCount?: number // 总回答数;
}
export const useUserStore = defineStore('user', () => {
  const tokenValue = ref<string>('')
  // State: 当前浏览器存储的Users 以邮箱作为用户标识;
  const userList = ref<Array<User & UserExtensions>>([]) // 初始为空数组
  // State: 当前登录用户信息
  const currentUserInfo = ref<User & UserExtensions | null>(null)

  // action: 设置当前登录用户信息
  function setCurrentUserInfo(userInfo: User & UserExtensions) {
    currentUserInfo.value = userInfo
    // 同时更新userList中的数据;
    // 根据唯一标识（比如 id 或 email）找到 userList 中的用户并更新
    const index = userList.value.findIndex(u => u.id === userInfo.id && u.email === userInfo.email)

    if (index !== -1) {
      // 更新已有用户
      userList.value[index] = { ...currentUserInfo.value }
    }
    else {
      // 如果没找到，说明是新用户，追加进去
      userList.value.push(userInfo)
    }
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

  function login(email: string, password: string): { field?: string, state: boolean } {
    const exist = userList.value.find(u => u.email === email)
    if (exist === undefined) {
      return {
        field: 'email',
        state: false,
      }
    }
    else {
      if (exist.password_hash !== EncryptPasswordMD5(password)) {
        return {
          field: 'password',
          state: false,
        }
      }
      else {
        tokenValue.value = GetRandomUuid8Mix()
        // 设置当前登录用户
        currentUserInfo.value = exist
        currentUserInfo.value.avatar = 'https://qy-red-book.oss-cn-guangzhou.aliyuncs.com/%E3%80%90%E5%93%B2%E9%A3%8E%E5%A3%81%E7%BA%B8%E3%80%91%E5%B0%91%E5%A5%B3-%E7%9C%9F%E4%BA%BA%E7%B3%BB%E5%88%97.png'
        return {
          state: true,
          field: '',
        }
      }
    }
  }
  // 退出登录
  function logOut() {
    currentUserInfo.value = null
    tokenValue.value = ''
  }

  // getter: 获取当前登录用户信息
  const getCurrentUserInfo = computed(() => currentUserInfo.value)
  const getUserList = computed(() => userList.value)
  const getTokenValue = computed(() => tokenValue.value)
  return {
    currentUserInfo,
    userList,
    setCurrentUserInfo,
    registerUser,
    getCurrentUserInfo,
    getUserList,
    login,
    tokenValue,
    getTokenValue,
    logOut,
  }
}, {
  // 使用持久化插件;
  persist: true,
})
