<script setup lang="ts">
  import {useRouter} from "vue-router";
  import {onMounted, ref} from "vue";
  import {getCurrentUser} from "../services/user.ts";
  import myAxios from "../plugins/myAxios.ts";
  import {Toast} from "vant";

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
    user.value = await getCurrentUser()
  })

  const doLogout = async () =>{
      const res = await myAxios.post("/user/logout");
      if(res.data.code === 200){
        localStorage.setItem("token",'');
        Toast.success("注销成功");
        window.location.reload();
      }else {
        Toast.fail('注销失败' + (res.data.description ? `，${res.data.description}`: ''));
      }
  }


</script>

<template>
    <van-cell-group>
      <van-cell title="用户" :value="user?.nickname"/>
      <van-cell title="个人信息" is-link to="/user/update" />
      <van-cell title="已创建队伍" is-link to="/user/team/create" />
      <van-cell title="已加入队伍" is-link to="/user/team/join" />
    </van-cell-group>
  <van-button size="small" type="primary" plain @click="doLogout">注销</van-button>

</template>

<style scoped>

</style>