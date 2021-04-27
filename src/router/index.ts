import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../views/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../views/login.vue')
    },
    {
        path: '/column/:id',
        name: 'column',
        component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../views/ColumnDetail.vue')
    }
]
const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: routes
})

export default router
