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
    store.commit('setLoading', false)
    return response
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  })
axios.get('columns').then(response => {
    console.log(response.data)
})
const app = createApp(App)
app.use(router).use(store).mount('#app')
