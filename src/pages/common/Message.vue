<script setup lang="ts">
import qs from "qs";
import {onMounted} from "vue";
import {getCurrentUser} from "../../services/user.ts";

onMounted(() =>{
  getCurrentUser()
})

</script>

<template>
  <van-grid :border="false" >
      <van-grid-item icon="friends" icon-color="#9999FF" text="粉丝" to="/user/fans"/>
      <van-grid-item icon="star-o" icon-color="#FFB3FF" text="关注" to="/user/loves"/>
      <van-grid-item icon="good-job" icon-color="#77DDFF" text="赞" to=""/>
      <van-grid-item icon="like" icon-color="#99BBFF" text="收藏" to="/my/favours"/>
  </van-grid>
</template>

<style scoped>

</style>