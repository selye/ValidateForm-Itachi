import { createStore, Commit } from 'vuex'
import axios from 'axios'

export interface UserProps {
    email?:string
    isLogin: boolean
    nickName?: string
    _id?: string
    column?: string
}

interface ImageProps {
    _id?: string
    url?: string
    createdAt?: string
}

export interface ColumnProps {
    _id: string
    title: string
    avatar?: ImageProps
    description: string
}

export interface PostProps {
    _id: string
    title: string
    content?: string
    excerpt?: string
    image?: ImageProps
    createdAt: string
    column?: string
}
const getAndcomit = async (url: string, mutationName: string, commit: Commit) => {
    const { data } = await axios.get(url)
    commit(mutationName, data)
}
const postAndCommit = async(url: string, mutationName: string, commit: Commit, payload:any) => {
    const { data } = await axios.post(url, payload)
    commit(mutationName, data)
    return data
}

interface GlobalErrorProps {
    status: boolean
    message?: string
}

export interface GlobalDataProps {
    error: GlobalErrorProps
    token:string
    columns: ColumnProps[]
    posts: PostProps[]
    user: UserProps,
    isLoading: boolean
}

const store = createStore<GlobalDataProps>({
    state: {
        error: { status: false },
        token: localStorage.getItem('token') || '',
        isLoading: false,
        columns: [],
        posts: [],
        user: {
            isLogin: false
        }
    },
    mutations: {
        setError(state, e:GlobalErrorProps) {
            state.error = e
        },
        createPost(state, newPost) {
            state.posts.push(newPost)
        },
        fetchColumns(state, rawData) {
            state.columns = rawData.data.list
        },
        fetchColumn(state, rawData) {
            state.columns = [rawData.data]
        },
        fetchPosts(state, rawData) {
            state.posts = rawData.data.list
        },
        setLoading(state, statu) {
            state.isLoading = statu
        },
        login(state, rawData) {
            const { token } = rawData.data
            state.token = token
            localStorage.setItem('token', state.token)
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
        },
        logOut(state) {
            state.token = ''
            state.user = { isLogin: false }
            localStorage.removeItem('token')
            delete axios.defaults.headers.common.Authorization
        },
        fetchCurrentUser(state, rawData) {
            state.user = { isLogin: true, ...rawData.data }
        }
    },
    actions: {
        fetchColumns({ commit }) {
            getAndcomit('/columns', 'fetchColumns', commit)
        },
        fetchColumn({ commit }, cid) {
            getAndcomit(`columns/${cid}`, 'fetchColumn', commit)
        },
        fetchPosts({ commit }, cid) {
            getAndcomit(`columns/${cid}/posts`, 'fetchPosts', commit)
        },
        login({ commit }, payload) {
            return postAndCommit('user/login', 'login', commit, payload)
        },
        fetchCurrentUser({ commit }) {
            getAndcomit('user/current', 'fetchCurrentUser', commit)
        },
        loginAndFetch({ dispatch }, loginData) {
            return dispatch('login', loginData).then(() => {
                return dispatch('fetchCurrentUser')
            })
        }
    },
    getters: {
        getColumnById: (state) => (id: string) => {
            return state.columns.find(c => c._id === id)
        },
        getPostById: (state) => (cid: string) => {
            return state.posts.filter(c => c.column === cid)
        }
    }
})

export default store
