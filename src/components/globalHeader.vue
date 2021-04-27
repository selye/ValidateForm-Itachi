<template>
 <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
     <router-link class="navbar-brand" to="/">者也专栏</router-link>
     <ul v-if="!user.isLogin" class="list-inline mb-0">
         <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
         <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">注册</router-link></li>
     </ul>
     <ul v-else class="list-inline mb-0">
        <dropDown :title="`你好 ${user.name}`">
            <dropDownItem ><a href="#" class="dropdown-item">新建文章</a></dropDownItem>
            <dropDownItem disabled><a href="#" class="dropdown-item">编辑资料</a></dropDownItem>
            <dropDownItem><a href="#" class="dropdown-item">退出登录</a></dropDownItem>
        </dropDown>
     </ul>
 </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import dropDown from './dropDown.vue'
import dropDownItem from './dropDownItem.vue'
export interface UserProps {
    isLogin: boolean
    name?: string
    id?: number
}
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
    }
})
</script>

<style>
</style>
