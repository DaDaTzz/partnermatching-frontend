<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../../components/teamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";

const router = useRouter();


const teamList = ref([]);

const searchText = ref('')

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/join", {
    params: {
      searchText: val,
      pageNum: 1,
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

</script>

<template>
  <div id="team"></div>
  <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
  <team-card-list :teamList="teamList" :myJoinTeamList="myJoinTeamList"/>
  <van-empty v-if="!teamList || teamList.length < 1" description="没有更多了" />
</template>

<style scoped>

</style>