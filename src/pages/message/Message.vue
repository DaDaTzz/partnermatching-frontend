<script setup lang="ts">
import qs from "qs";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";
import publicLogo from "../../assets/imags/tpic/public.png";


const myTeamList = ref([])

onMounted(async () => {
  await getCurrentUser()
  const myTeamListData = await myAxios.get('/team/list/my')
      .then(function (response) {
        return response?.data.data;
      })
      .catch(function (error) {
        console.log("获取我的队伍信息，" + error)
        Toast.fail('请求失败');
      })
  //console.log(myTeamListData)
  if (myTeamListData) {
    myTeamList.value = myTeamListData;
  }
})

</script>

<template >
  <van-grid :border="false">
    <van-grid-item icon="friends" icon-color="#9999FF" text="粉丝" to="/user/fans"/>
    <van-grid-item icon="star-o" icon-color="#FFB3FF" text="关注" to="/user/loves"/>
    <van-grid-item icon="good-job" icon-color="#77DDFF" text="赞" to="/user/thumbToMe"/>
    <van-grid-item icon="like" icon-color="#99BBFF" text="收藏" to="/my/favours"/>
  </van-grid>


  <van-cell icon="location" title="公共聊天室"   label="组队鸭公共聊天室" to="/message/publicChatroom">
    <template #right-icon>
      <van-image :src="publicLogo" style="height: 50px; width: 50px"></van-image>
    </template>
  </van-cell>
  <template v-for="team in myTeamList">
    <van-cell  icon="location-o" :title="`${team.name}队伍聊天室`"  :label="team.description" :to="{path:'/message/teamChatRoom/',query:{teamId:team.id}}">
      <template #right-icon>
        <van-image :src="team.profilePhoto" style="height: 50px; width: 50px"></van-image>
      </template>
    </van-cell>
  </template>



</template>

<style scoped>

</style>