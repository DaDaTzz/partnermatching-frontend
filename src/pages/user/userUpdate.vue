<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";


const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
  if (user.value.tags) {
    user.value.tags = JSON.parse(user.value.tags)
  }
})


const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

const toEditMsg = () => {
  router.push({
    path: '/upload/awata',
  })
}

const toUpdateTag = (currentValue: string) => {
  router.push({
    path: '/user/updateTag',
    query: {
      currentValue,
    }
  })
}

const toBindEmail = () => {
  router.push('/user/bindEmail');
}


</script>

<template>
  <template v-if="user">
    <div style="text-align: center">
      <van-image
          title="头像"
          @click="toEditMsg"
          round
          fit="cover"
          width="10rem"
          height="10rem"
          :src="user.profilePhoto"/>
    </div>

    <van-cell title="账号" is-link :value="user.loginAccount"/>
    <van-cell title="昵称" is-link :value="user.nickname" @click="toEdit('nickname','昵称', user.nickname)"/>
    <van-cell title="性别" is-link :value="user.sex === 1?'男':'女'" @click="toEdit('sex','性别', user.sex)"/>
    <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone','电话', user.phone)"/>
    <van-cell title="邮箱" is-link :value="user.email === null ? '未绑定邮箱': user.email " @click="toBindEmail"/>
    <van-cell title="标签" is-link @click="toUpdateTag(user.tags)">
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </van-cell>
    <van-cell title="个人简介" is-link :value="user.profile" @click="toEdit('profile','简介',user.profile)"/>
  </template>

</template>

<style scoped>

</style>