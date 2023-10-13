<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import UserCardList from "../components/userCardList.vue";


const user = ref();
const loading = ref(false)
const userList = ref([])

onMounted(async () => {
  user.value = await getCurrentUser()
  /**
   * 获取我关注的用户列表
   */
  const userListData = await myAxios.get('/user/get/love')
      .then(function (response) {
        console.log('/user/get/love succeed', response);
        return response?.data.data;
      })
      .catch(function (error) {
        console.error('/user/get/love error', error);
        Toast.fail('请求失败');
      })
  console.log(userListData)
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
})


</script>


<template>
  <user-card-list :user-list="userList" :loading="loading" />
  <van-empty v-if="!userList || userList.length < 1" description="没有更多了"/>

</template>

<style scoped>


</style>