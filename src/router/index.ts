import axios from 'axios'
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
    },
    {
        path: '/signUp',
        name: 'signUp',
        component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../views/signUp.vue')
    }
]
const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: routes
})
router.beforeEach((to, from, next) => {
    const { user, token } = store.state
    const { requiredLogin, requiredDirectiveLogin } = to.meta
    if (!user.isLogin) {
        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            store.dispatch('fetchCurrentUser').then(() => {
                if (requiredDirectiveLogin) {
                    next('/')
                } else {
                    next()
                }
            }).catch(e => {
                console.log(e)
                store.commit('logOut')
            })
        } else {
            if (requiredLogin) {
                next('/login')
            } else {
                next()
            }
        }
    } else {
        if (requiredDirectiveLogin) {
            next('/')
        } else {
            next()
        }
    }
})

export default router
