<template>
<h3>{{biggerColumnLen}}</h3>
  <div class="home-page text-center">
      <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/createPost" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-List :list="list"></column-List>
     <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
    >
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import columnList from '../components/columnList.vue'
export default defineComponent({
    components: {
        columnList
    },
    setup () {
      const store = useStore<GlobalDataProps>()
      const list = computed(() => store.state.columns)
      onMounted(() => {
        store.dispatch('fetchColumns')
      })
        return {
            list
        }
    }
})
</script>

<style>

</style>
