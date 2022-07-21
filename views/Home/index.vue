<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="标题" class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')"
          ><van-icon name="search" />搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <!-- 把id传给服用子组件 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <!-- 更多的按钮 -->
      <span class="toutiao toutiao-gengduo" @click="showPopup"></span>
    </van-tabs>
    <EditChannelPop
      @change-active="changeActive"
      @del-myChannels="delMyChannels"
      ref="popUp"
      :myChannels="myChannels"
      @add-mychannel="addMyChannel"
    ></EditChannelPop>
  </div>
</template>

<script>
import EditChannelPop from './component/EditChannelPop.vue'
import {
  addMyChannel,
  delMyChannel,
  getMyChannels,
  getMyChannelsByLocal,
  setMyChannelsToLocal
} from '@/Apis/channels.js'

// 引入复用组件
import ArticleList from './component/ArticleList.vue'
export default {
  data () {
    return {
      active: 1,
      myChannels: [],
      isShow: false
    }
  },
  components: {
    ArticleList,
    EditChannelPop
  },
  created () {
    // 获取频道列表
    this.getMyChannels()
  },
  methods: {
    showPopup () {
      this.$refs.popUp.isShow = true
    },
    async addMyChannel (channel) {
      this.myChannels.push(channel)
      if (!this.isLogin) {
        setMyChannelsToLocal(this.myChannels)
      } else {
        try {
          await addMyChannel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.fail('宇哥威武')
    },
    changeActive (active) {
      this.active = active
    },
    async delMyChannels (id) {
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      if (!this.isLogin) {
        setMyChannelsToLocal(this.myChannels)
      } else {
        try {
          await delMyChannel(id)
        } catch (error) {
          this.$toast.fail('删除用户频道失败')
        }
      }
    },
    // 获取频道列表
    async getMyChannels () {
      try {
        if (!this.login) {
          const myChannels = getMyChannelsByLocal()
          if (myChannels) {
            this.myChannels = myChannels
          } else {
            const { data } = await getMyChannels()
            // console.log(data)
            this.myChannels = data.data.channels
          }
        } else {
          console.log('666')
        }
        // console.log(this.myChannels)
      } catch (error) {
        this.$toast.fail('请重新获取频道列表')
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 头部导航
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0; /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    } /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
} /* 字体图标 */
.toutiao-gengduo {
  z-index: 99;
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
>
