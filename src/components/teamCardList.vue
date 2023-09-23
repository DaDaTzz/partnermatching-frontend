<script setup lang="ts">
import {teamType} from "../models/team";
import {teamStatesEnum} from "../constants/team.ts";
import teamLogo from '../assets/teamlogo.png'
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

interface TeamCardListProps {
  loading: boolean;
  teamList: teamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  loading: true,
  // @ts-ignore
  teamList: [] as teamType[],
})

// 加入队伍
const doJoinTeam = async (id: number) =>{
  const res = await myAxios.post("/team/join", {
    teamId: id
  });
  if(res.data.code === 200){
    Toast.success("加入成功");
  }else {
    Toast.fail('加入失败' + (res.data.description ? `，${res.data.description}`: ''));
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
          {{ "最大人数：" + team.maxNum }}
        </div>
        <div v-if="team.expireTime">
          {{ "过期时间：" + team.expireTime }}
        </div>
        <div>
          {{ "创建时间：" + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small" type="primary" plain @click="doJoinTeam(team.id)">加入队伍</van-button>
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