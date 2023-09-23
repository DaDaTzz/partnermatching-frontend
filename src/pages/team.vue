<script setup >

import {useRouter} from "vue-router";
import TeamCardList from "../components/teamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const router = useRouter();

/**
 * 跳转到加入队伍页面
 */
const doJoinTeam = () => {
  router.push({
    path:"/team/add"
  })
}

const teamList = ref([]);

// 页面加载时触发一次
onMounted(async () =>{
 const res = await myAxios.get("/team/list");
 if(res?.data.code === 200){
    teamList.value = res.data.data;
 }else {
   Toast.fail("加载队伍失败，请刷新重试")
 }
})
</script>

<template>
  <div id="team"></div>
  <van-button type="primary" @click="doJoinTeam">创建队伍</van-button>
  <team-card-list :teamList="teamList" />
</template>

<style scoped>

</style>