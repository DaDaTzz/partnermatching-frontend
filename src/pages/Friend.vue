<script setup lang="ts">
import {ref,onMounted} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
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




/**
 * 删除好友
 */
const doDeleteFriend = async (id: number) =>{
  const res = await myAxios.post('/user/deleteFriend', {
    id,
  })
  if (res.data.code === 200) {
    alert("删除成功");
    window.location.href = '/friend'
  } else {
    alert("删除失败，" + res.data.description);
  }
}




</script>

<template>

  <van-skeleton title avatar :row="3" :loading="loading" v-for="user in userList">
    <van-card
        :desc="user.profile"
        :title="user.nickname"
        :thumb="user.profilePhoto"
        :tag="user.sex === 1?'男':'女'"
    >

      <template #tags>
        <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini" @click="doDeleteFriend(user.id)">删除好友</van-button>
      </template>
    </van-card>
  </van-skeleton>
  <van-empty v-if="!userList || userList.length < 1" description="好友列表为空！" />
</template>

<style scoped>

</style>