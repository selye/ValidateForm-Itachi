<template>
  <div class="row">
    <div v-for="item in columnList" :key="item.id" class="col-4 mb-4">
        <div class="card h-100 shadow-sm" style="width: 18rem;">
            <div class="card-body text-center">
                <img :src="item.avatar" :alt="item.title" class="rounded-circle border border-light my-3 w-100px">
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text text-start">{{item.description}}</p>
                <router-link :to="`/column/${item.id}`" class="btn btn-outline-primary">进入专栏</router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../testData'
export default defineComponent({
    name: 'columnList',
    props: {
        list: {
            type: Array as PropType<ColumnProps[]>,
            required: true
        }
    },
    setup(props) {
        //  map的作用的是每次遍历就会得到一个值，而不是在遍历完之后才得到值  所以需要return column
        const columnList = computed(() => {
            console.log(props.list)
            return props.list.map(column => {
                if (!column.avatar) {
                    column.avatar = require('@/assets/didala.png')
                }
                return column
            })
        })
        return {
            columnList
        }
    }
})
</script>

<style>
.w-100px{
    width: 100px;
}
</style>
