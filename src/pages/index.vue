<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import qs from "qs";
import UserCardList from "../components/userCardList.vue";

const route = useRoute();

const {tags} = route.query;

const userList = ref([])

onMounted(async () => {
  const userListData = await myAxios.get('/user/recommend', {
    params: {
      pageSize:8,
      pageNum:1,
    },
  })
      .then(function (response) {
        console.log('/user/recommend success',response);
        Toast.success("响应成功");
        return response.data?.data?.records;
      })
      .catch(function (error) {
        console.log('/user/recommend error',error);
        Toast.fail("响应失败");
      })

  if (userListData){
    userListData.forEach(user =>{
      if(user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})


</script>

<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="暂无数据" />
</template>

<style scoped>

</style>