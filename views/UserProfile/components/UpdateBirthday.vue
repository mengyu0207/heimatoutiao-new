<template>
  <div class="update-birthdy">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="ConFirm"
    />
  </div>
</template>
<script>
import { UpdateUserProfile } from '@/Apis/user'
import dayjs from 'dayjs'
export default {
  name: 'birthday',
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2022, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  components: {},
  computed: {},
  beforeMount () {},
  mounted () {},
  methods: {
    async ConFirm () {
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await UpdateUserProfile({
          birthday: currentDate
        })
        this.$emit('input', currentDate)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast('宇哥大事不好啦~')
      }
    }
  },
  watch: {},
  props: {
    value: {
      type: String,
      default: undefined
    }
  }
}
</script>
<style lang="less" scoped></style>
