<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item v-for="item in list" :key="item.id" :comment="item" />
    </van-list>
  </div>
</template>
<script>
import { getCommit } from '@/Apis/commit'
import commentItem from './commentItem.vue'
export default {
  name: '',
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      //   list: []
      localList: this.list
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    commentItem
  },
  computed: {},
  beforeMount () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getCommit({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        console.log(666)
        console.log(data)
        // push 数据
        const { results } = data.data
        this.localList.push(...results)
        // 把数据传到父组件
        this.$emit('onload_success', data.data)
        //
        this.loading = false
        // 判断数据
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('宇哥大事不好啦~')
        console.log('888', error)
      }
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped></style>
