<template>
<div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{title}}</a>
    <ul class="dropdown-menu" :style="{display:'block'}" v-if="isOpen">
        <slot></slot>
    </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import userClickOutSide from '../hooks/userClickOutSide'
export default defineComponent({
    name: 'dropDown',
    props: {
        title: {
            type: String,
            required: true
        }
    },
    setup() {
        const isOpen = ref(false)
        const dropdownRef = ref<null | HTMLElement>(null)
        const toggleOpen = () => {
            isOpen.value = !isOpen.value
        }
        const isClickOutSide = userClickOutSide(dropdownRef)
        watch(isClickOutSide, () => {
            if (isOpen.value && isClickOutSide.value) {
                isOpen.value = false
            }
        })
        return {
            isOpen,
            toggleOpen,
            dropdownRef
        }
    }
})
</script>

<style>

</style>
