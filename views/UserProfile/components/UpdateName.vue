<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="OnConfirm"
    />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div style="padding: 10px">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>
<script>
import { UpdateUserProfile } from '@/Apis/user'
export default {
  name: '',
  data () {
    return {
      localName: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {},
  computed: {},
  beforeMount () {},
  mounted () {},
  methods: {
    async OnConfirm () {
      try {
        // pankong
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        const { data } = await UpdateUserProfile({
          name: localName
        })
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast('更新成功')
        console.log(data)
      } catch (error) {
        this.$toast('宇哥大事不好啦~')
        console.log(error)
      }
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped>
.van-popup {
  background: #f5f7f9;
}
</style>
