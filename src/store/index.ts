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
    }
})

export default store
