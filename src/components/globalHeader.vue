<template>
 <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
     <router-link class="navbar-brand" to="/">者也专栏</router-link>
     <ul v-if="!user.isLogin" class="list-inline mb-0">
         <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
         <li class="list-inline-item"><router-link to="/signUp" class="btn btn-outline-light my-2">注册</router-link></li>
     </ul>
     <ul v-else class="list-inline mb-0">
        <dropDown :title="`你好 ${user.nickName}`">
            <dropDownItem ><router-link to="/createPost" class="dropdown-item">新建文章</router-link></dropDownItem>
            <dropDownItem disabled><a href="#" class="dropdown-item">编辑资料</a></dropDownItem>
            <dropDownItem><a href="#" @click.prevent="logOut" class="dropdown-item">退出登录</a></dropDownItem>
        </dropDown>
     </ul>
 </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import dropDown from './dropDown.vue'
import dropDownItem from './dropDownItem.vue'
import store, { UserProps } from '../store'
import { useStore } from 'vuex'
import createMessage from '../hooks/crreateMessage'
export default defineComponent({
    name: 'globalHeader',
    components: {
        dropDown,
        dropDownItem
    },
    props: {
        user: {
            type: Object as PropType<UserProps>,
            required: true
        }
    },
    setup () {
        const store = useStore()
        const logOut = () => {
            store.commit('logOut')
            createMessage('退出成功', 'success')
        }
        return {
            logOut
        }
    }

})
</script>

<style>
</style>
