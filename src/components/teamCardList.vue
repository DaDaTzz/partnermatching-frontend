<script setup lang="ts">
import {teamType} from "../models/team";
import {teamStatesEnum} from "../constants/team.ts";
import teamLogo from '../assets/teamlogo.png'
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

const router = useRouter();

const currentUser = ref();

interface TeamCardListProps {
  loading: boolean;
  teamList: teamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  loading: true,
  // @ts-ignore
  teamList: [] as teamType[],
})


onMounted(async () =>{
  currentUser.value = await getCurrentUser();
})


// 加入队伍，跳转至加入队伍页
const doJoinTeam = async (team: teamType) =>{
  if(team.states === 2){
    let password = window.prompt("请输入密码")
    const res = await myAxios.post("/team/join", {
      teamId: team.id,
      password,
    });
    if(res.data.code === 200){
      Toast.success("加入成功");
      team.password = '';
      window.location.reload();
    }else {
      Toast.fail('加入失败' + (res.data.description ? `，${res.data.description}`: ''));
    }
  }else{
    const res = await myAxios.post("/team/join", {
      teamId: team.id,
    });
    if(res.data.code === 200){
      Toast.success("加入成功");
      window.location.reload();
    }else {
      Toast.fail('加入失败' + (res.data.description ? `，${res.data.description}`: ''));
    }
  }



}



// 更新队伍，跳转至更新队伍页
const doUpdateTeam = (id: number) => {
  router.push({
    path:'/team/update',
    query:{
      id,
    }
  })
}

// 退出队伍
const doExitTeam = async (id: number) =>{
  const res = await myAxios.post("/team/exit", {
    teamId: id
  });
  if(res.data.code === 200){
    Toast.success("退出成功");
    window.location.reload();
  }else {
    Toast.fail('退出失败' + (res.data.description ? `，${res.data.description}`: ''));
  }
}

// 解散队伍
const doDisbandTeam = async (id: number, password:string) =>{
  const res = await myAxios.post("/team/disband", {
    teamId: id,
    password,
  });
  if(res.data.code === 200){
    Toast.success("解散成功");
    window.location.reload();
  }else {
    Toast.fail('解散失败' + (res.data.description ? `，${res.data.description}`: ''));
  }
}


</script>

<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :thumb="teamLogo"
        :desc="team.description"
        :title="team.name"
    >

      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{ teamStatesEnum[team.states] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ "可加入人数：" + team.maxNum }}
        </div>
        <div :style="[ team.maxNum === team.hasJoinNum ? { color: 'red' } : { color: '' } ]">
          {{ "已加入人数：" + team.hasJoinNum }}
        </div>
        <div v-if="team.expireTime">
          {{ "过期时间：" + team.expireTime }}
        </div>
        <div>
          {{ "创建时间：" + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="small" type="primary" plain @click="doJoinTeam(team)">加入队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small"  plain @click="doUpdateTeam(team.id)">更新队伍</van-button>
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small"  plain @click="doExitTeam(team.id)">退出队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small"  type="danger" plain @click="doDisbandTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
  </div>

</template>

<style scoped>
#teamCardList :deep(.van-image__img){
  height: 110px;
  object-fit: unset;
}
</style>