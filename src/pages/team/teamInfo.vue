<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";
import UserCardList from "../../components/userCardList.vue";

const router = useRouter()

const currentUser = ref();
const currentUserId = ref('')

/**
 * 获取当前用户信息
 */
onMounted(async () => {
  currentUser.value = await getCurrentUser();
  currentUserId.value = currentUser.value.id
})

const route = useRoute()
const team = JSON.parse(route.query.team)
const joinUsers = team.joinUsers
if (joinUsers) {
  joinUsers.forEach(user => {
    if (user.tags) {
      user.tags = JSON.parse(user.tags);
    }
  })
}

const loading = ref(false)


const toUploadTeamImg = (id) =>{
  router.push({
    path:'/team/uploadImg',
    query:{
      id,
    }
  })
}


</script>

<template>

  <template v-if="team">
    <div style="text-align: center">
      <van-image
          title="头像"
          fit="cover"
          width="90%"
          height="150px"
          :src="team.profilePhoto"/>
    </div>
    <van-cell v-if="currentUserId === team.userId" @click="toUploadTeamImg(team.id)" icon="photo-o" title="修改封面"  is-link >
      <van-button size="small" icon="plus" type="primary">上传图片</van-button>
    </van-cell>
    <van-cell icon="flag-o" title="队伍名" is-link :value="team.name"/>
    <van-cell icon="label-o" title="队伍描述" is-link :value="team.description"/>
    <van-cell icon="manager-o" title="队长" is-link :value="team.createUser.nickname"/>
    <van-cell icon="shield-o" title="队伍状态" is-link :value="team.states === '0' ? '公开':'加密'"/>
    <van-cell icon="friends-o" title="队伍人数" is-link :value="team.hasJoinNum + '/' + team.maxNum">
    </van-cell>
    <van-cell icon="clock-o" title="过期时间" is-link :value="team.expireTime === null ? '永不过期' : team.expireTime"/>
    <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      队伍成员
    </van-divider>
    <user-card-list :user-list="team.joinUsers" :loading="loading"></user-card-list>
  </template>

</template>

<style scoped>

</style>