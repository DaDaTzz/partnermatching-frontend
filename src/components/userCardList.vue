<script setup lang="ts">
import {userType} from "../models/user";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import myAxios from "../plugins/myAxios.ts";
import {useRoute, useRouter} from "vue-router";
import routes from "../config/router.ts";

const router = useRouter()
const route = useRoute()

interface UserCardListProps{
  loading: boolean;
  userList: userType[];
}
const props = withDefaults(defineProps<UserCardListProps>(),{
  loading: true,
  // @ts-ignore
  userList: [] as userType[],
})

const currentUser = ref();

onMounted(async () =>{
  currentUser.value = await getCurrentUser();
})


/**
 * 加好友
 */
const doAddFriend = async (id: number) =>{
  const res = await myAxios.post('/user/addFriend', {
    id,
  })
  if (res.data.code === 200) {
    alert("添加成功");
  } else {
    alert("添加失败，" + res.data.description);
  }
}

/**
 * 删除好友
 */
const doDeleteFriend = async (id: number) =>{
  const res = await myAxios.post('/user/deleteFriend', {
    id,
  })
  if (res.data.code === 200) {
    alert("删除成功");
    window.location.href = '/friend'
  } else {
    alert("删除失败，" + res.data.description);
  }
}



</script>

<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
  <van-card
      :desc="user.profile"
      :title="user.nickname"
      :thumb="user.profilePhoto"
      :tag="user.sex === 1?'男':'女'"
  >

    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini" @click="doAddFriend(user.id)">加为好友</van-button>
      <van-button size="mini" @click="doDeleteFriend(user.id)">删除好友</van-button>
    </template>
  </van-card>
  </van-skeleton>
</template>

<style scoped>

</style>