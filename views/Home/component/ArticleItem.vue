<template>
  <div @click="goArticle">
    <!-- 渲染无图片 -->
    <van-cell
      v-if="articleInfo.cover.type"
      :title="articleInfo.title"
      :label="articleDesc"
    ></van-cell>
    <!-- 渲染1图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <div>
        <van-image
          width="3rem"
          height="2rem"
          :src="articleInfo.cover.images[0]"
        />
      </div>
    </van-cell>
    <!-- 渲染3图片 -->
    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <div>
          <van-image
            v-for="item in articleInfo.cover.image"
            :key="item"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
      </template>

      <!-- 文章描述 -->
      <!-- <span>{{ articleDesc }}}</span> -->
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utlis/dayjs'
export default {
  name: 'ArticleItem',
  created () {
    console.log(this.articleInfo)
  },
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc () {
      const art = this.articleInfo
      const relativeTime = dayjs(art.pubdate).fromNow()
      return `${art.aut_name}${art.comm_count}评论${relativeTime}`
    }
  },
  methods: {
    goArticle () {
      this.$router.push(`article/${this.articleInfo.art_id}`)
    }
  }
}
</script>

<style></style>
