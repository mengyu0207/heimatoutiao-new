<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(articles, index) in list"
          :key="index"
          :title="articles.title"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getSearchResult } from '@/Apis/Result'
export default {
  name: '',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      per_page: 20
    }
  },
  components: {},
  computed: {},
  beforeMount () {},
  mounted () {},
  created () {
    this.SearchResult()
  },
  methods: {
    async SearchResult () {
      try {
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.per_page, // 每页大小
          q: this.keywords // 查询关键词
        })
        console.log(data)
        // 将数据添加到数组列表中
        const { results } = data.data
        this.list.push(...results)
        console.log('66', results)
        // 关闭loading加载
        this.loading = false
        // 判断是否有数据
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.$toast('获取数据失败')
      }
    },
    onLoad () {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped></style>
