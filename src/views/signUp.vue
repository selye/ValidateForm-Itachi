<template>
  <div class="signup-page mx-auto p-3 w-330">
    <valadate-Form class="needs-validation" @form-submit="onFromSubmit">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
          <valadate-Input :rules="emailRules"
             v-model="formData.email"
             placeholder="请输入邮箱地址"
             type="text"
             ref="inputRef"
             >
          </valadate-Input>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">昵称</label>
          <valadate-Input :rules="nickNameRulse"
             v-model="formData.nickName"
             placeholder="请输入昵称"
             type="text"
             ref="inputRef"
             >
          </valadate-Input>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">密码</label>
          <valadate-Input :rules="passWordRules"
             v-model="formData.password"
             placeholder="请输入密码"
             type="password"
             ref="inputRef"
             >
          </valadate-Input>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">再次输入密码</label>
          <valadate-Input :rules="repeatPasswordRules"
             v-model="formData.repeatPassword"
             placeholder="请输入密码"
             type="password"
             ref="inputRef"
             >
          </valadate-Input>
        </div>
        <template #submit>
            <button type="submit" class="btn btn-primary btn-block btn-large">注册新用户</button>
        </template>
    </valadate-Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from 'axios'
import valadateForm from '../components/valadateForm.vue'
import valadateInput, { RulesProp } from '../components/valadateInput.vue'
import createMessage from '../hooks/crreateMessage'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'signup',
    components: {
        valadateForm,
        valadateInput
    },
    setup () {
        const router = useRouter()
        const formData = reactive({
            email: '',
            nickName: '',
            password: '',
            repeatPassword: ''
        })
        const emailRules: RulesProp = [
            {
                type: 'required',
                message: '邮箱地址不能为空'
            },
            {
                type: 'email',
                message: '邮箱格式不正确'
            }
        ]
        const nickNameRulse: RulesProp = [
            {
                type: 'required',
                message: '昵称不能为空'
            }
        ]
        const passWordRules: RulesProp = [
            {
                type: 'required',
                message: '密码不能为空'
            }
        ]
        const repeatPasswordRules: RulesProp = [
            {
                type: 'required',
                message: '密码不能为空'
            },
            {
                type: 'custom',
                validator: () => {
                    return formData.password === formData.repeatPassword
                },
                message: '两次密码不相同'
            }
        ]
        const onFromSubmit = (result: boolean) => {
            if (result) {
                const payload = {
                    email: formData.email,
                    nickName: formData.nickName,
                    password: formData.password
                }
                axios.post('/users', payload).then(res => {
                    createMessage('注册成功', 'success')
                     setTimeout(() => {
                        router.push('/')
                    }, 2000)
                }).catch(e => {
                    console.log(e)
                })
            }
        }
        return {
            emailRules,
            nickNameRulse,
            passWordRules,
            repeatPasswordRules,
            onFromSubmit,
            formData
        }
    }
})
</script>

<style>

</style>
