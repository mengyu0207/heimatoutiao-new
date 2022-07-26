<template>
  <div class="update-avatar">
    <img :src="img" class="img" ref="img" />
    <div class="toolbar">
      <span class="cancel" @click="$emit('close')">取消</span>
      <span class="confirm" @click="Confirm">完成</span>
    </div>
  </div>
</template>
<script>
import { UpdateUserPhoto } from '@/Apis/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'updatephoto',
  data () {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: [Object, String],
      required: true
    }
  },
  components: {},
  computed: {},
  beforeMount () {},
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    Confirm () {
      //   console.log(this.cropper.getDate())
      // 基于客户端裁切使用 getCroppedCanvas 获取裁切的文件
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        console.log(blob)
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await UpdateUserPhoto(formData)
        console.log(data)
        // guanbi pop
        this.$emit('close')
        // xuanran
        this.$emit('update-photo', data.data.photo)
      })
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .img {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
