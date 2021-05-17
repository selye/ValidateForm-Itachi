<template>
<teleport to="#back">
  <div
   class="loading-container d-flex justify-content-center d-flex align-items-center h-100"
   :style="{backgroundColor: backGround || ''}"
   >
      <div class="loading-content">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">{{text || 'loading'}}</span>
        </div>
        <p v-if='text' class="text-primary small">{{text}}</p>
        <p v-if='text' class="text-primary small">{{backGround}}</p>
      </div>
  </div>
</teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
    name: 'loader',
    props: {
        text: {
            type: String
        },
        backGround: {
            type: String
        }
    },
    setup (props) {
        const node = document.createElement('div')
        node.id = 'back'
        document.body.appendChild(node)
        onUnmounted(() => {
            document.body.removeChild(node)
        })
    }
})
</script>

<style scoped>
.loading-container {
    background: rgba(255,255,255, .5);
    z-index: 100;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
}
.loading-content {
    text-align: center;
}
</style>
