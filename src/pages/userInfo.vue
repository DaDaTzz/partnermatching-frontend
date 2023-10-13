<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";


const currentUser = ref();

/**
 * 获取当前用户信息
 */
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const route = useRoute()
const user = route.query

</script>

<template>
  <template v-if="user">
    <div style="text-align: center">
      <van-image
          title="头像"
          round
          fit="cover"
          width="10rem"
          height="10rem"
          :src="user.profilePhoto"/>
    </div>

    <van-cell title="账号" is-link :value="user.loginAccount"/>
    <van-cell title="昵称" is-link :value="user.nickname"/>
    <van-cell title="性别" is-link :value="user.sex === '1' ? '男':'女'"/>
    <van-cell title="邮箱" is-link :value="user.email"/>
    <van-cell title="标签" is-link :value="user.tags">
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </van-cell>
    <van-cell title="个人简介" is-link :value="user.profile"/>
    <div style="margin: 16px;">
      <van-button block round plain hairline type="primary" native-type="submit">
        关注
      </van-button>
      <van-button style="margin-top: 15px" block round plain hairline type="primary" native-type="submit">
        私聊
      </van-button>

    </div>
  </template>
</template>

<style scoped>

</style>