<template>
    <div class="validate-input-container pb-3">
        <input
            v-if="tag !== 'textarea'"
            v-bind="$attrs"
            class="form-control"
            :class="{ 'is-invalid': inputRef.error }"
            :value="inputRef.val"
            @blur="valadateInput"
            @input="updateValue"
        >
         <textarea
            v-else
            class="form-control"
            :class="{'is-invalid': inputRef.error}"
            @blur="validateInput"
            v-model="inputRef.val"
            v-bind="$attrs"
        >
        </textarea>
        <span class="invalid-feedback" v-if="inputRef.error">
            {{inputRef.message}}
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from 'vue'
import { emitter } from './valadateForm.vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
    type: 'required' | 'email'
    message: string
}
export type RulesProp = RuleProp[]
export type tagType = 'input' | 'textarea'
export default defineComponent({
    name: 'valadateInput',
    props: {
        rules: Array as PropType<RulesProp>,
        modelValue: String,
        tag: {
            type: String as PropType<tagType>,
            default: 'input'
        }
    },
    inheritAttrs: false,
    setup(props, context) {
        console.log(props.tag)
        const inputRef = reactive({
            val: props.modelValue || '',
            error: false,
            message: ''
        })
        const updateValue = (e:KeyboardEvent) => {
            const targetValue = (e.target as HTMLInputElement).value
            inputRef.val = targetValue
            context.emit('update:modelValue', targetValue)
        }
        const valadateInput = () => {
            if (props.rules) {
                // every  检查数组的所有项  全部符合条件 则返回 true  否则 返回false
                const allPassed = props.rules.every(rule => {
                    let passed = true
                    inputRef.message = rule.message
                    switch (rule.type) {
                        case 'required':
                            passed = (inputRef.val.trim() !== '')
                            break
                        case 'email':
                            passed = emailReg.test(inputRef.val)
                            break
                        default:
                            break
                    }
                    return passed
                })
                inputRef.error = !allPassed
                return allPassed
            }
            return true
        }
        onMounted(() => {
            emitter.emit('form-item-created', valadateInput)
        })
        return {
            inputRef,
            valadateInput,
            updateValue
        }
    }
})
</script>

<style>

</style>
