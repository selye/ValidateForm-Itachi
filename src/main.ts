import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
    store.commit('setLoading', true)
    config.params = { ...config.params, icode: '4BC4323D9ED4EBD6' }
    if (config.data instanceof FormData) {
        config.data.append('icode', '4BC4323D9ED4EBD6')
    } else {
        config.data = { ...config.data, icode: '4BC4323D9ED4EBD6' }
    }
    return config
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    setTimeout(() => {
        store.commit('setLoading', false)
    }, 2000)
    return response
  }, e => {
    console.log(e.response)
    const { error } = e.response.data
    store.commit('setError', { status: true, message: error })
    store.commit('setLoading', false)
    return Promise.reject(error)
  })
const app = createApp(App)
app.use(router).use(store).mount('#app')
