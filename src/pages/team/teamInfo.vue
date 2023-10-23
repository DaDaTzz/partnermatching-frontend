<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";
import UserCardList from "../../components/userCardList.vue";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";

const router = useRouter()
const route = useRoute()

const currentUser = ref();
const currentUserId = ref('')


//const team = JSON.parse(route.query.team)
const team = ref()
const teamId = route.query.id
const joinUsers = ref([])

const loading = ref(false)


/**
 * 根据 id 获取 队伍信息
 */
const getTeamById = async () => {
  const res = await myAxios.get("/team/get/vo", {
    params: {
      id: teamId,
    },
  });
  if (res?.data.code === 200) {
    team.value = res.data.data
    joinUsers.value = team.value.joinUsers
    if (joinUsers) {
      for (let i = 0; i < joinUsers.value.length; i++) {
        if (joinUsers.value[i].tags) {
          joinUsers.value[i].tags = JSON.parse(joinUsers.value[i].tags)
        }
      }
    }
    /**
     * 处理时间格式
     */
    if(team.value.expireTime){
      let date = new Date(team.value.expireTime);
      let year = date.getFullYear();
      let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      //console.log(year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds)
      team.value.expireTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }
  } else {
    Toast.fail("获取失败")
  }
}

onMounted(async () => {
  await getTeamById()
  currentUser.value = await getCurrentUser();
  currentUserId.value = currentUser.value.id
})


/**
 * 更新队伍封面（队长）
 * @param id
 */
const toUploadTeamImg = (id) => {
  router.push({
    path: '/team/uploadImg',
    query: {
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
    <van-cell v-if="currentUserId === team.userId" @click="toUploadTeamImg(team.id)" icon="photo-o" title="修改封面"
              is-link>
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