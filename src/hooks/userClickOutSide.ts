import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutSide = (elementRef: Ref<null | HTMLElement>):Ref<boolean> => {
    const isClickOutSide = ref(false)
    const handler = (e:MouseEvent) => {
        if (elementRef.value) {
            if (elementRef.value.contains(e.target as HTMLElement)) {
                isClickOutSide.value = false
            } else {
                isClickOutSide.value = true
            }
        }
    }
    onMounted(() => {
        document.addEventListener('click', handler)
    })
    onUnmounted(() => {
        document.removeEventListener('click', handler)
    })
    return isClickOutSide
}

export default useClickOutSide
