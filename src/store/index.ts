import { createStore } from 'vuex'
import { ColumnProps, PostProps, testData, postList } from '../testData'
interface UserProps {
    isLogin: boolean
    name?: string
    id?: string
}
export interface GlobalDataProps {
    columns: ColumnProps[]
    posts: PostProps[]
    user: UserProps
}
const store = createStore<GlobalDataProps>({
    state: {
        columns: testData,
        posts: postList,
        user: {
            isLogin: false
        }
    },
    mutations: {
        login(state) {
            state.user = { ...state.user, isLogin: true, name: 'shijie' }
        }
    },
    getters: {
        biggerColumnLen(state) {
            return state.columns.filter(c => c.id > 2).length
        },
        getColumnById: (state) => (id:number) => {
            return state.columns.find(c => c.id === id)
        },
        getPostById: (state) => (cid:number) => {
            return state.posts.filter(c => c.id === cid)
        }
    }
})

export default store
