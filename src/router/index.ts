import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../views/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../views/login.vue'),
        meta: {
            requiredDirectiveLogin: true
        }
    },
    {
        path: '/column/:id',
        name: 'column',
        component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../views/ColumnDetail.vue')
    },
    {
        path: '/createPost',
        name: 'createPost',
        component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../views/createPost.vue'),
        meta: {
            requiredLogin: true
        }
    }
]
const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: routes
})
router.beforeEach((to, from, next) => {
    console.log(to.meta)
    if (to.meta.requiredLogin && !store.state.user.isLogin) {
        next({ name: 'login' })
    } else if (to.meta.requiredDirectiveLogin && store.state.user.isLogin) {
        next('/')
    } else {
        next()
    }
})

export default router
