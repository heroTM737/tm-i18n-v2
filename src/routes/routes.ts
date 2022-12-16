import { createRouter, createWebHashHistory } from 'vue-router'
import SettingsPage from '../views/Settings/SettingsPage.vue';

const HomePage = () => import('../views/HomePage.vue')
const EditorPage = () => import('../views/Editor/EditorPage.vue')

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    }, {
        path: '/edit',
        name: 'EditorPage',
        component: EditorPage
    }, {
        path: '/settings',
        name: 'Settings',
        component: SettingsPage
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router