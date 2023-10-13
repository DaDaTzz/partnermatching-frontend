<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import UserCardList from "../components/userCardList.vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import PostCardList from "../components/PostCardList.vue";
import portInfo from "./portInfo.vue";


const currentUser = ref();

/**
 * 获取当前用户信息
 */
onMounted(async () => {
  currentUser.value = await getCurrentUser();
  await getMyPorts()
})

const portList = ref([])
const loading = ref(false)

/**
 * 获取我的博文列表
 */
/**
 * 匹配用户
 */
const getMyPorts = async () => {
  let portListData;
  loading.value = true;
  const num = 20;
  portListData = await myAxios.get('/post/list/page/vo', {
    params: {
      userId:currentUser.value.id
    },
  })
      .then(function (response) {
        console.log('/port/get/vo success', response);
        return response.data?.data;
      })
      .catch(function (error) {
        console.log('/port/get/vo error', error);
        Toast.fail("响应失败");
      })
  if (portListData) {
    portList.value = portListData.records;
  }
  loading.value = false;
}

</script>

<template>
  <post-card-list :port-list="portList" :loading="loading"/>
  <van-empty v-if="!portList || portList.length < 1" description="没有更多了"/>

</template>

<style scoped>

</style>