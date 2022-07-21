<template>
  <div class="search-container">
    <form class="search-form" action="/">
      <van-search
        background="#3296FA"
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPrePage"
        @focus="visibleSearchSuggestion"
      />
    </form>

    <SearchResult v-if="isShowSearchResults" :keywords="keywords" />
    <SearchSuggestion
      v-else-if="keywords"
      :keywords="keywords"
      @search="onSearch"
    />
    <SearchHistory v-else :histroy="histroy" @clearFn="clearFn" />
    <!-- <component :is="componentName" :keywords="keywords"></component> -->
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  data () {
    return {
      keywords: '',
      isShowSearchResults: false, // 控制搜索结果的展示
      histroy: JSON.parse(localStorage.getItem('his')) || [] // 搜索历史
    }
  },
  computed: {},
  watch: {
    keywords: {
      deep: true,
      handler () {
        const theSet = new Set(this.histroy)
        console.log(theSet)
        const arr = [...theSet]
        localStorage.setItem('his', JSON.stringify(arr))
      }
    }
  },
  methods: {
    clearFn (val) {
      this.histroy = val
    },
    onSearch (val) {
      if (this.keywords.length > 0) {
        this.histroy.push(val)
      }

      this.keywords = val
      console.log(val)
      this.isShowSearchResults = true
    },
    backToPrePage () {
      this.$router.back()
    },
    visibleSearchSuggestion () {
      this.isShowSearchResults = false
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
}

.search-form {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
}
</style>
