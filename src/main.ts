import { createApp } from 'vue'
import App from './App.vue'
import './samples/node-api'
import './assets/common.scss'

createApp(App)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
    })
