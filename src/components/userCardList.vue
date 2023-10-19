<script setup lang="ts">
import {userType} from "../models/user";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

interface UserCardListProps {
  loading: boolean;
  userList: userType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  // @ts-ignore
  userList: [] as userType[],
})

const currentUser = ref();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const router = useRouter()

/**
 * 跳转到用户详情页
 * @param user
 */
const userInfo = (user) => {
  router.push({
    path: '/user/info',
    query: user,
  })
}


</script>

<template>
  <div id="userCardList">
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
      <van-card
          @click="userInfo(user)"
          :desc="user.profile"
          :title="user.nickname"
          :thumb="user.profilePhoto"

      >

        <template #tags>
          <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
            {{ tag }}
          </van-tag>
        </template>
        <template #footer>
          <van-icon name="star-o" v-if="user.isFollow === false"/>
          <van-icon name="star-o" v-if="user.isFollow === true" color="pink"/>
        </template>
      </van-card>
    </van-skeleton>
  </div>
</template>

<style scoped>
#userCardList :deep(.van-card__title) {
  font-weight: bold;
  font-size: 14px;

}

</style>