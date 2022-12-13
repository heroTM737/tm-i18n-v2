import { createRouter, createWebHashHistory } from 'vue-router'

const HomePage = () => import('../views/HomePage.vue')
const EditorPage = () => import('../views/EditorPage.vue')

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    }, {
        path: '/edit',
        name: 'EditorPage',
        component: EditorPage
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router