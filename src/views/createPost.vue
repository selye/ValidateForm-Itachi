<template>
  <div class="create-post-page">
      <h4>新建文章</h4>
      <input type="file" name="file" @change.prevent="handleFileChange">
      <valadate-form class="needs-validation" @form-submit="onFromSubmit">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">文章标题</label>
            <valadate-Input :rules="titleRules"
                    v-model="titlelVal"
                    placeholder="请输入文章标题"
                    type="text"
                    >
            </valadate-Input>
        </div>
         <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">文章详情</label>
            <valadate-Input :rules="contentRules"
                tag = 'textarea'
                rows = '10'
                v-model="contentVal"
                placeholder="请输入内容"
                type="text"
                 >
                 </valadate-Input>
        </div>
         <template #submit>
            <button type="submit" class="btn btn-primary">新建文章</button>
        </template>
      </valadate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { GlobalDataProps, PostProps } from '../store'
import valadateForm from '../components/valadateForm.vue'
import valadateInput, { RulesProp } from '../components/valadateInput.vue'
export default defineComponent({
    name: 'createPost',
    components: {
        valadateInput,
        valadateForm
    },
    setup () {
        const titleRules:RulesProp = [
            {
                type: 'required',
                message: '标题不能为空！'
            }
        ]
        const contentRules:RulesProp = [
            {
                type: 'required',
                message: '内容不能为空！'
            }
        ]
        const titlelVal = ref('')
        const contentVal = ref('')
        const router = useRouter()
        const store = useStore<GlobalDataProps>()
        const onFromSubmit = (result: boolean) => {
            if (result) {
                const { column } = store.state.user
                if (column) {
                    const newPost:PostProps = {
                        _id: new Date().getTime() + '',
                        title: titlelVal.value,
                        content: contentVal.value,
                        createdAt: new Date().toLocaleString(),
                        column
                    }
                    store.commit('createPost', newPost)
                    router.push({
                        name: 'column',
                        params: {
                            id: column
                        }
                    })
                }
            }
        }
        const handleFileChange = (e: Event) => {
            const target = e.target as HTMLInputElement
            const files = target.files
            if (files) {
                const uploadedFile = files[0]
                const formData = new FormData()
                formData.append(uploadedFile.name, uploadedFile)
                axios.post('upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res)
                })
            }
        }
        return {
            titleRules,
            contentRules,
            titlelVal,
            contentVal,
            onFromSubmit,
            handleFileChange
        }
    }
})
</script>

<style>

</style>
