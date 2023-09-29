<script setup lang="ts">
  import {useRouter} from "vue-router";
  import {onMounted, ref} from "vue";
  import {getCurrentUser} from "../services/user.ts";

  /*const user = {
    id:1,
    nickname:'da',
    loginAccount:"123",
    loginPassword:"13456",
    sex:'男',
    phone:"1666666",
    email:"123@qq.com",
    profilePhoto:"https://z1.ax1x.com/2023/06/11/pCVNPyD.jpg",
    profile:"我是一名程序员，O(∩_∩)O哈哈~",
    createTime:new Date(),
  }*/

  const user = ref();

  onMounted(async () => {
    user.value = await getCurrentUser();
    if(user.value.sex === 1){
      user.value.sex = '男'
    }
    if(user.value.sex === 0){
      user.value.sex = '女'
    }
  })

  const router = useRouter();

  const toEdit = (editKey:string, currentValue:string) => {
    router.push({
      path:'/user/edit',
      query:{
        editKey,
        currentValue
      }
    })
  }


</script>

<template>
  <template v-if="user">
    <div style="text-align: center">
      <van-image
          round
          fit="cover"
          width="10rem"
          height="10rem"
          :src="user.profilePhoto" />
    </div>

    <van-cell title="账号" is-link :value="user.loginAccount" />
    <van-cell title="昵称" is-link :value="user.nickname" @click="toEdit('nickname',user.nickname)"/>

<!--    <van-cell title="头像" is-link @click="toEdit('profilePhoto',user.profilePhoto)">-->
<!--      <img style="height: 48px" :src="user.profilePhoto" />-->
<!--    </van-cell>-->
    <van-cell title="性别" is-link :value="user.sex" @click="toEdit('sex',user.sex)"/>
    <van-cell title="电话" is-link  :value="user.phone" @click="toEdit('phone',user.phone)"/>
    <van-cell title="邮箱" is-link  :value="user.email" @click="toEdit('email',user.email)"/>
    <van-cell title="注册时间"  :value="user.createTime" />
  </template>

</template>

<style scoped>

</style>