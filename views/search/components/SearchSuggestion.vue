<template>
  <div>
    <van-cell
      icon="search"
      v-for="item in Suggestion"
      :key="item.id"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestions } from '@/Apis/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      Suggestion: [] // 联想数据列表
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  created () {},
  components: {},
  computed: {},
  beforeMount () {},
  mounted () {},
  methods: {
    async loadgetSearchSuggestions (q) {
      try {
        const data = await getSearchSuggestions(q)
        console.log(111)
        console.log(data)
        this.Suggestion = data.data.data.options
        console.log(data.data.data.options)
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    highlight (item) {
      const highlightStr = `<span class='active'>${this.keywords}</span>`
      const reg = new RegExp(this.keywords, 'gi')
      return item.replace(reg, highlightStr)
    }
  },
  watch: {
    keywords: {
      // handler (value) {
      //   console.log(11)
      //   this.loadgetSearchSuggestions(value)
      // },
      handler: debounce(function (value) {
        this.loadgetSearchSuggestions(value)
      }, 1000),
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.van-cell {
  /deep/.active {
    color: pink;
  }
}
</style>
