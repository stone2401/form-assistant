import { createRouter, createWebHashHistory } from 'vue-router'
const speekFile = () => import('@/views/speekFile.vue')
const speekShow = () => import('@/views/speekShow.vue')
const speekConfig = () => import('@/views/speekConfig.vue')
const speekBlank = () => import('@/views/speekBlank.vue')
const routes = [
    { path: '/', name: 'speekFile', component: speekFile },
    { path: '/show', name: 'speekShow', component: speekShow },
    { path: '/config', name: 'speekConfig', component: speekConfig },
    { path: '/blank', name: 'speekBlank', component: speekBlank },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router

