<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      type="primary"
      size="small"
      @click="onPushComment"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { PushComment } from '@/Apis/commit'
export default {
  name: 'PostComment',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      default: undefined
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPushComment () {
      try {
        const { data } = await PushComment({
          target: this.target,
          content: this.message,
          art_id: null
        })
        console.log(data)
        this.message = ''
        this.$emit('Post-sucess', data.data)
        this.$toast('发布成功')
      } catch (error) {
        this.$toast('宇哥大事不好了~')
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
