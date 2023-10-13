<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/teamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const router = useRouter();

/**
 * 跳转到加入队伍页面
 */
const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);

const searchText = ref('')

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '', states = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      states,
    }
  });
  if (res?.data.code === 200) {
    teamList.value = res.data.data;
  } else {
    Toast.fail("加载队伍失败，请刷新重试")
  }
}



// 页面加载时触发一次
onMounted(() => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);
};

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  // 查公开
  if (name === 'public'){
    listTeam(searchText.value, 0);
    // 查加密
  }else {
    listTeam(searchText.value, 2);
  }
}

</script>

<template>
  <div id="team"></div>
  <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab title="公开" name="public"></van-tab>
    <van-tab title="加密" name="secret"></van-tab>
  </van-tabs>
  <van-button style="position: fixed; bottom: 60px; width: 50px; right: 12px; height: 50px; border-radius: 50%; z-index:999" class="add-button" icon="plus" type="primary" @click="toAddTeam"></van-button>
  <team-card-list :teamList="teamList" :myJoinTeamList="myJoinTeamList"/>
  <van-empty v-if="!teamList || teamList.length < 1" description="没有更多了" />
</template>

<style scoped>

</style>