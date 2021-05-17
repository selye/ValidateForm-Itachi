<template>
  <div class="container" id="back">
    <globalHeader :user="currentUser"></globalHeader>
    <loader text='拼命加载中' backGround = 'rgba(0,0,0, .8)' v-if="isLoading"></loader>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import loader from './components/loader.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from 'vuex'
import globalHeader from './components/globalHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    globalHeader,
    loader
  },
  setup() {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.isLoading)
    return {
      isLoading,
      currentUser
    }
  }
})
</script>
