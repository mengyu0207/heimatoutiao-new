<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="onClickLeft"
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>

          <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            :loading="followloading"
            >已关注</van-button
          >
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-else
            @click="onFollow"
            :loading="followloading"
            >关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <commitList
          :source="article.art_id"
          @onload_success="totalCount = $event.total_count"
          :list="commentlist"
        />
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalCount" color="#777" />
          <!-- //收藏组件 -->
          <collectText
            :value.sync="article.is_collected"
            :article-id="article.art_id"
          />
          <likeArticle v-model="article.attitude" :articleId="article.art_id" />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <van-popup v-model="isPostShow" position="bottom">
          <commentPost :target="article.art_id" @Post-sucess="postsucess" />
        </van-popup>
      </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>
<script>
import commitList from '@/components/commit-list/index.vue'
import { getArticleById } from '@/Apis/article'

import './markdown.css'
// import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/Apis/user'
import collectText from '@/components/collect-article'
import likeArticle from '@/components/good-article'
import commentPost from '@/components/commit-list/commentPost.vue'
// ImagePreview({
//   images: [
//     'https://img.yzcdn.cn/vant/apple-1.jpg',
//     'https://img.yzcdn.cn/vant/apple-2.jpg'
//   ],
//   // 预览图片的起始位置
//   startPosition: 1,
//   // 点击关闭
//   onClose () {
//     // do something
//   }
// })
export default {
  name: 'ArticleIndex',
  components: {
    collectText,
    likeArticle,
    commitList,
    commentPost
  },
  props: {
    articleId: {
      type: [Number, String],
      default: undefined
    }
  },
  data () {
    return {
      followloading: false,
      article: [], // 文章详情
      loading: false, // 加载的状态
      errStatus: 0, // 失败的状态码
      totalCount: 0,
      isPostShow: false, //
      commentlist: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticle()
  },
  mounted () {},
  methods: {
    postsucess (data) {
      this.isPostShow = false
      this.commentlist.unshift(data.new_obj)
    },
    collectFn () {
      this.article.is_collected = !this.article.is_collected
    },
    // previewImg () {
    //   const contentEl = this.$refs.contentRef
    //   const allImg = contentEl.querySelectorAll('img')
    //   const images = []
    //   allImg.forEach((element, index) => {
    //     images.push(element.src)
    //     element.onclick = () => {
    //       ImagePreview({
    //         images,
    //         startPosition: index
    //       })
    //     }
    //   })
    // },
    async onFollow () {
      this.followloading = true // 开启按钮加载
      try {
        if (this.article.is_followed) {
          // 已关注 取消关注
          const res = await deleteFollow(this.article.aut_id)
          console.log(666)
          console.log(res)
        } else {
          // 没有关注 添加关注
          await addFollow(this.article.aut_id)
        }
        this.article.is_followed = !this.article.is_followed
      } catch (error) {
        this.$toast('操作失败请重试')
      }
      this.followloading = false // 关闭按钮加载
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    async getArticle () {
      this.loading = true
      try {
        const res = await getArticleById(this.articleId)
        console.log(res)
        this.article = res.data.data
        this.loading = false
        // // 数据加载完成
        // setTimeout(() => {
        //   this.previewImg()
        // }, 10)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
        this.loading = false
        this.$toast('您的数据丢失了哦~')
      }
    }
  }
}
</script>
<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
