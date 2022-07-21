<template>
  <div>
    <van-cell title="搜索历史">
      <van-icon name="delete-o" @click="clearFn" />
    </van-cell>
    <van-cell :title="item" v-for="(item, index) in histroy" :key="index">
      <van-icon name="close"></van-icon>
    </van-cell>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {}
  },
  props: {
    histroy: {
      type: Array,
      required: true
    }
  },
  components: {},
  computed: {},
  beforeMount () {},
  mounted () {},
  methods: {
    clearFn () {
      this.$emit('clearFn', [])
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped></style>
