<template>
  <!-- <van-icon color="#777" name="star-o" /> -->
  <van-button
    bordered="false"
    :icon="value ? 'star' : 'star-o'"
    @click="OnChange"
    :class="{ collected: value }"
  ></van-button>
</template>
<script>
// import { addCollect, deleteCollect } from '@/Apis/article'
export default {
  name: 'collect-article',
  data () {
    return {}
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
    // articelId: {
    //   type: [Number, String, Object],
    //   required: true
    // }
  },
  components: {},
  computed: {},
  beforeMount () {},
  mounted () {},
  methods: {
    async OnChange () {
      this.$emit('update:value', !this.value)
      // try {
      //   if (this.value) {
      //     // 已收藏 取消收藏
      //     await deleteCollect(this.articelId)
      //   } else {
      //     await addCollect(this.articelId)
      //   }
      //   // 更新视图
      //   this.$emit('input', !this.value)
      //   this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      //   console.log(666)
      // } catch (error) {
      //   this.$toast.fail('操作失败，请重试')
      // }
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
