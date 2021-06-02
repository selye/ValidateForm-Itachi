<template>
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
    <uploader action = 'upload' :beforeUpload = 'beforeUpload' @file-uploaded = 'onFileLoaded'></uploader>
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
import { GlobalDataProps, ResponseType, ImageProps } from '../store'
import columnList from '../components/columnList.vue'
import uploader from '../components/Uploader.vue'
import createMessage from '../hooks/crreateMessage'
export default defineComponent({
    components: {
        columnList,
        uploader
    },
    setup () {
      const store = useStore<GlobalDataProps>()
      const list = computed(() => store.state.columns)
      const isLoading = computed(() => store.state.isLoading)
      const beforeUpload = (file: File) => {
        const isJpg = file.type === 'image/jpeg'
        if (!isJpg) {
          createMessage('必须传入jpg格式', 'error')
        }
        return isJpg
      }
      const onFileLoaded = (rawData: ResponseType<ImageProps>) => {
        createMessage(`图片id为${rawData.data._id}`, 'success')
      }
      onMounted(() => {
        store.dispatch('fetchColumns')
      })
        return {
            isLoading,
            list,
            beforeUpload,
            onFileLoaded
        }
    }
})
</script>

<style>

</style>
