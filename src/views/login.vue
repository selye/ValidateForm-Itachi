<template>
  <div>
      <valadate-Form class="needs-validation" @form-submit="onFromSubmit">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
            <valadate-Input :rules="emailRules"
                v-model="emailVal"
                placeholder="请输入邮箱地址"
                type="text"
                ref="inputRef"
                >
                </valadate-Input>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">密码</label>
            <valadate-Input :rules="passWordRules"
                v-model="passwordVal"
                 placeholder="请输入密码"
                 type="password"
                 >
                 </valadate-Input>
        </div>
        <template #submit>
            <button type="submit" class="btn btn-danger">提交</button>
        </template>
    </valadate-Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import valadateInput, { RulesProp } from '../components/valadateInput.vue'
import valadateForm from '../components/valadateForm.vue'
export default defineComponent({
    name: 'login',
    components: {
        valadateInput,
        valadateForm
    },
    setup () {
        const inputRef = ref<any>()
        const emailVal = ref('')
        const passwordVal = ref('')
        const router = useRouter()
        const emailRules: RulesProp = [
            {
                type: 'required',
                message: '电子邮箱地址不能为空'
            },
            {
                type: 'email',
                message: '电子邮箱格式不正确'
            }
        ]
        const passWordRules: RulesProp = [
            {
                type: 'required',
                message: '密码不能为空'
            }
        ]
        const onFromSubmit = (result:boolean) => {
            console.log(result + ',result')
            if (result) {
                router.push({
                    name: 'column',
                    params: {
                        id: 1
                    }
                })
            }
        }
        const emailRef = reactive({
            val: '',
            error: false,
            message: ''
        })
        const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const validataEmail = () => {
            if (emailRef.val.trim() === '') {
                emailRef.error = true
                emailRef.message = 'can not be empty !'
            } else if (!emailReg.test(emailRef.val)) {
                emailRef.error = true
                emailRef.message = 'should be email address !'
            }
        }
        return {
            emailRef,
            validataEmail,
            emailRules,
            passWordRules,
            emailVal,
            onFromSubmit,
            inputRef,
            passwordVal
        }
    }
})
</script>

<style>

</style>
