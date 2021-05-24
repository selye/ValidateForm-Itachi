<template>
<teleport to="#message">
    <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
    :class="classObject" v-if="isVisible"
    >
        <span>{{messge}}</span>
        <button type="button" class="btn-close" aria-label="Close" @click.prevent="hide"></button>
    </div>
</teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import useDomCreate from '../hooks/useDomCreate'
export type MessageType = 'success' | 'error' | 'default'
export default defineComponent({
    name: 'message',
    props: {
        messge: String,
        type: {
            type: String as PropType<MessageType>
        }
    },
    emits: ['close-message'],
    setup (props, context) {
        useDomCreate('message')
        const isVisible = ref(true)
        const classObject = {
            'alert-primary': props.type === 'default',
            'alert-success': props.type === 'success',
            'alert-danger': props.type === 'error'
        }
        const hide = () => {
            isVisible.value = false
            context.emit('close-message', true)
        }
        return {
            classObject,
            isVisible,
            hide
        }
    }
})
</script>

<style scoped>

</style>
