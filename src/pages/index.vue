<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import qs from "qs";
import UserCardList from "../components/userCardList.vue";
import {userType} from "../models/user";



const route = useRoute();

const isMatchMode = ref<boolean>(false);

const {tags} = route.query;

const userList = ref([])

const loading = ref(true)


const loadData = async () => {
  let userListData;
  loading.value = true;

  // 匹配模式，根据标签匹配用户
  if(isMatchMode.value){
    const num = 20;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match success',response);
          return response.data?.data;
        })
        .catch(function (error) {
          console.log('/user/match error',error);
          Toast.fail("响应失败");
        })
  }else{
    // 普通模式，直接分页查询用户
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize:50,
        pageNum:1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend success',response);
          return response.data?.data?.records;
        })
        .catch(function (error) {
          console.log('/user/recommend error',error);
          Toast.fail("响应失败");
        })
}
    if (userListData){
      userListData.forEach(user =>{
        if(user.tags){
          user.tags = JSON.parse(user.tags);
        }
      })
      userList.value = userListData;
    }
    loading.value = false;
}

watchEffect(() =>{
  loadData();
})






</script>

<template>
  <van-cell center title="开启伙伴匹配" style="color: #1989fa">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="暂无数据" />
</template>

<style scoped>

</style>