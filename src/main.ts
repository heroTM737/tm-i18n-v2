import { createApp } from 'vue'
import App from './App.vue'
import './samples/node-api'
import './assets/common.scss'
import './assets/tm.scss'
import './assets/theme.scss'

// router
import router from './routes/routes'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives,
})

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

// create app
createApp(App)
    .use(vuetify)
    .use(pinia)
    .use(router)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
    })