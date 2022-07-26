<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input
      type="file"
      ref="file"
      hidden="true"
      accept=".jpg"
      @change="onFileChange"
    />
    <!-- /导航栏 -->
    <van-cell @click="$refs.file.click()" title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="onUpdateShow" />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isShowUpdateGender = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isShowUpdateBirthdy = true"
    />
    <!-- 编辑昵称 -->
    <van-popup v-model="isUpdateShow" style="height: 100%" position="bottom">
      <UpdateName
        v-if="isUpdateShow"
        @close="isUpdateShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- 编辑昵称 -->
    <!-- 编辑性别弹层 -->
    <van-popup v-model="isShowUpdateGender" position="bottom">
      <updateGender
        v-if="isShowUpdateGender"
        v-model="user.gender"
        @close="isShowUpdateGender = false"
      />
    </van-popup>
    <!-- 编辑昵称弹层 -->
    <!-- 编辑生日弹层 -->
    <!-- 编辑生日弹层 -->
    <van-popup v-model="isShowUpdateBirthdy" position="bottom">
      <updatebirthdy
        v-if="isShowUpdateBirthdy"
        v-model="user.birthday"
        @close="isShowUpdateBirthdy = false"
      />
    </van-popup>
    <!-- 编辑生日弹层 -->
    <!-- 编辑生日弹层 -->
    <!-- 编辑头像弹层 -->
    <van-popup
      v-model="isShowUpdatePhoto"
      position="bottom"
      style="height: 100%"
    >
      <UpdatePhoto
        v-if="isShowUpdatePhoto"
        :img="img"
        @close="isShowUpdatePhoto = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!--  编辑头像弹层 -->
  </div>
</template>
<script>
import UpdateName from './components/UpdateName.vue'
import { getUserProfile } from '@/Apis/user'
import updateGender from './components/UpdateGender.vue'
import updatebirthdy from './components/UpdateBirthday'
import UpdatePhoto from './components/UpdatePhoto.vue'
export default {
  name: 'Userprofile',
  data () {
    return {
      isUpdateShow: false,
      user: [],
      usernames: '',
      isShowUpdateGender: false,
      isShowUpdateBirthdy: false,
      isShowUpdatePhoto: false,
      img: null
    }
  },
  components: {
    UpdateName,
    updateGender,
    updatebirthdy,
    UpdatePhoto
  },
  computed: {},
  beforeMount () {},
  mounted () {},
  created () {
    this.getUser()
  },
  methods: {
    onUpdateShow () {
      this.isUpdateShow = true
    },
    async getUser () {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
        this.usernames = data.data.name
      } catch (error) {
        this.$toast('宇哥大事不好啦~')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      console.log(file)
      // 基于文章对象获取blob数据
      const data = window.URL.createObjectURL(file)
      this.img = data
      console.log(data)
      // 展示图片弹出层
      this.isShowUpdatePhoto = true
      // file input 如果选了同一个文件 不会触发change事件
      // 解决办法就是每次使用完毕 把它的value 清空
      this.$refs.file.value = ''
    }
  },
  watch: {}
}
</script>
<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
