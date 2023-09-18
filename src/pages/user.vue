<script setup lang="ts">
  import {useRouter} from "vue-router";
  import myAxios from "../plugins/myAxios.ts";
  import {Toast} from "vant";
  import {onMounted} from "vue";

  const user = {
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
  }

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

  onMounted(async () => {
    const userListData = await myAxios.get('/user/search/tags', {
      paramsSerializer: params => {
        return qs.stringify(params, {indices: false})
      }
    })
        .then(function (response) {
          console.log('/user/search/tags success',response);
          Toast.success("响应成功");
          return response.data?.data;
        })
        .catch(function (error) {
          console.log('/user/search/tags error',error);
          Toast.fail("响应失败");
        })

    if (userListData){
      userListData.forEach(user =>{
        if(user.tags){
          user.tags = JSON.parse(user.tags)
        }
        if(user.sex){
          if(user.sex === 1){
            user.sex = "男";
          }
          if(user.sex === 0){
            user.sex = "女";
          }
        }
      })
      userList.value = userListData;
    }
  })

</script>

<template>
  <van-cell title="昵称" is-link :value="user.nickname" @click="toEdit('nickname',user.nickname)"/>
  <van-cell title="账号" is-link :value="user.loginAccount" />
  <van-cell title="头像" is-link to="/user/edit" >
    <img style="height: 48px" :src="user.profilePhoto" />
  </van-cell>
  <van-cell title="性别" is-link :value="user.sex" @click="toEdit('sex',user.sex)"/>
  <van-cell title="电话" is-link  :value="user.phone" @click="toEdit('phone',user.phone)"/>
  <van-cell title="邮箱" is-link  :value="user.email" @click="toEdit('email',user.email)"/>
  <van-cell title="注册时间"  :value="user.createTime.toISOString()" />
</template>

<style scoped>

</style>