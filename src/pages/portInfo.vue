<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import UserCardList from "../components/userCardList.vue";


const currentUser = ref();

/**
 * 获取当前用户信息
 */
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const route = useRoute()
const port = route.query

</script>

<template>
  <template v-if="port">
    <div style="text-align: center">
      <van-image
          title="头像"
          fit="cover"
          width="100%"
          height="100%"
          :src="port.img"/>
    </div>
    <van-cell :value="'author：' + currentUser?.nickname"/>
    <van-cell center style="font-size: 19px" :value="port.title"/>
    <van-cell :value="port.content"/>


  </template>

</template>

<style scoped>

</style>