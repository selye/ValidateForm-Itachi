import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
    config.params = { ...config.params, icode: '4BC4323D9ED4EBD6' }
    if (config.data instanceof FormData) {
        config.data.append('icode', '4BC4323D9ED4EBD6')
    } else {
        config.data = { ...config.data, icode: '4BC4323D9ED4EBD6' }
    }
    return config
})
axios.get('columns').then(response => {
    console.log(response.data)
})
const app = createApp(App)
app.use(router).use(store).mount('#app')
