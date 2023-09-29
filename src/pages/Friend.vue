<script setup lang="ts">
import {ref,onMounted} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import UserCardList from "../components/userCardList.vue";
import qs from "qs";

const userList = ref([])

const loading = ref(true)

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/friends', {

  })
      .then(function (response) {
        console.log('/user/search/friends succeed', response);
        return response?.data.data;
      })
      .catch(function (error) {
        console.error('/user/search/friends error', error);
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

  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="好友列表为空！" />
</template>

<style scoped>

</style>