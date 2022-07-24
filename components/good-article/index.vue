<template>
  <div>
    <template>
      <van-icon
        :color="value === 1 ? 'red' : ''"
        :name="value === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
    </template>
  </div>
</template>
<script>
import { addLike, deleteLike } from '@/Apis/article'
export default {
  name: '',
  data () {
    return {}
  },
  props: {
    articleId: {
      type: [Number, String],
      default: undefined
    },
    value: {
      type: Number,
      default: undefined
    }
  },
  components: {},
  computed: {},
  beforeMount () {},
  mounted () {},
  methods: {
    // 通过父子通信的形式更改点赞状态
    async onLike () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped></style>
