// pinia数据持久化存储
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { SelfStorage } from './secureStore'

// 第一个参数是应用程序中 store 的唯一 id
const store = createPinia()
store.use(
  createPersistedState({
    storage: SelfStorage
  })
)
export default store