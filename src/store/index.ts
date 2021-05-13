import { createStore, Commit } from 'vuex'
import axios from 'axios'

interface UserProps {
    isLogin: boolean
    name?: string
    id?: string
    columnId?: number
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
export interface GlobalDataProps {
    columns: ColumnProps[]
    posts: PostProps[]
    user: UserProps,
    isLoading: boolean
}
const store = createStore<GlobalDataProps>({
    state: {
        isLoading: false,
        columns: [],
        posts: [],
        user: {
            isLogin: true,
            name: 'shijie',
            id: '1',
            columnId: 1
        }
    },
    mutations: {
        login(state) {
            state.user = { ...state.user, isLogin: true, name: 'shijie' }
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
