<script setup lang="ts">
import qs from "qs";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";

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
  console.log(myTeamListData)
  if (myTeamListData) {
    myTeamList.value = myTeamListData;
  }
})

</script>

<template >
  <van-grid :border="false">
    <van-grid-item icon="friends" icon-color="#9999FF" text="粉丝" to="/user/fans"/>
    <van-grid-item icon="star-o" icon-color="#FFB3FF" text="关注" to="/user/loves"/>
    <van-grid-item icon="good-job" icon-color="#77DDFF" text="赞" to=""/>
    <van-grid-item icon="like" icon-color="#99BBFF" text="收藏" to="/my/favours"/>
  </van-grid>


  <van-cell title="公共聊天室"   label="组队鸭公共聊天室" to="/message/publicChatroom"/>
  <template v-for="team in myTeamList">
    <van-cell  :title="`${team.name}聊天室`"  :label="team.description" :to="{path:'/message/teamChatRoom/',query:{teamId:team.id}}"/>
  </template>



</template>

<style scoped>

</style>