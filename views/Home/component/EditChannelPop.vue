<template>
  <div>
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '90%' }"
      closeable
      close-icon-position="top-left"
    >
      <div class="popMain">
        <div class="my-channel">
          <van-cell title="我的频道">
            <van-button
              size="small"
              round
              class="edit-btn"
              @click="isEdit = !isEdit"
              >编辑</van-button
            >
          </van-cell>
          <!-- 我的频道 -->
          <van-grid :border="true" gutter="10px">
            <van-grid-item
              v-for="item in myChannels"
              :key="item.id"
              :text="item.name"
              :class="{ 'active-channel': item.name === '推荐' }"
              @click="onClickMyChannel(item)"
            >
              <template #icon>
                <van-icon
                  name="cross"
                  v-show="isEdit && item.name != '推荐'"
                ></van-icon>
              </template>
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 推荐频道 -->
        <div class="recommend-channel">
          <van-cell title="推荐频道"></van-cell>
          <!-- 推荐频道 -->
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              v-for="item in recommendChannels"
              :key="item.id"
              :text="item.name"
              icon="plus"
              @click="addMychannels(item)"
            >
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels } from '@/Apis/channels'
export default {
  data () {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    addMychannels (channel) {
      this.$emit('add-mychannel', { ...channel })
    },
    onClickMyChannel (channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        this.$emit('del-myChannels', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    async getAllChannels () {
      const { data } = await getAllChannels()
      console.log(data)
      this.allChannels = data.data.channels
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter((item) => {
        const result = this.myChannels.find((i) => i.id === item.id)
        if (result) {
          return false
        } else {
          return true
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.active-channel {
  :deep(.van-grid-item__text) {
    color: pink;
  }
}
.popMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          font-size: 20px;
          z-index: 999;
        }
        // 推荐频道的样式
      }
    }
  }
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      background-color: rgb(234 234 234);

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
