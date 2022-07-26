<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @cancel="$emit('close')"
    @confirm="confirmFn"
    @default-index="value"
    @change="onChange"
  />
</template>

<script>
import { UpdateUserProfile } from '@/Apis/user'
export default {
  name: 'gender',
  data () {
    return {
      columns: ['男', '女'],
      localgender: this.value || 1
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    async confirmFn () {
      try {
        // pankong
        const localgender = this.localgender
        const { data } = await UpdateUserProfile({
          gender: localgender
        })
        this.$emit('input', localgender)
        this.$emit('close')
        this.$toast('更新成功')
        console.log(data)
      } catch (error) {
        this.$toast('宇哥大事不好啦~')
        console.log(error)
      }
    },
    onChange (picker, value, index) {
      console.log('66', picker, value, index)
      this.localgender = index
    }
  }
}
</script>

<style scoped lang="less"></style>
