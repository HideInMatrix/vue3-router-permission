import { createApp } from 'vue'
import './style.css'
import 'uno.css';
import App from './App.vue'
// Pinia 持久化
import store from '@/store/index'
//导入路由
import router from '@/router/index'

const app = createApp(App)

// 注册已经加上了持久化的pinia
app.use(store)

app.use(router)

app.mount('#app')
