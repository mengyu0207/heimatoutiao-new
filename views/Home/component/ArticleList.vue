<template>
  <div class="yg">
    <van-pull-refresh
      v-model="refreshLoading"
      success-text="刷新成功"
      @refresh="loadNextPage"
    >
      <van-list
        @load="loadNextPage"
        offset="0"
        :immediate-check="false"
        v-model="loading"
        loading-text="正在加载中~~"
        :finished="isFinished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="出错了，请重新加载"
      >
        <ArticleItem
          v-for="(item, index) in articles"
          :key="index"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/Apis/news'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    ArticleItem
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        console.log(data.data.results)
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
        console.log('111')
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败')
        }
      }
    },
    async loadNextPage () {
      try {
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        this.articles.push(...data.data.results)
        this.pre_timestamp = data.data.pre_timestamp // 更新页码
        this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        // finally 语句一定会执行
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
/* // 头部固定的样式 */

.yg {
  padding-bottom: 100px;
  // .navbar {
  //   position: sticky;
  //   top: 0;
  //   left: 0;
  // }
  // /deep/.van-tabs__wrap {
  //   position: sticky;
  //   top: 92px;
  //   left: 0;
  //   z-index: 99;
  // }
  // .toutiao-gengduo {
  //   position: fixed;
  //   top: 92px;
  // }

  // /deep/.van-tabs__content {
  //   max-height: calc(100vh - 92px - 82px - 100px);
  //   overflow: auto;
  // }
}
</style>
