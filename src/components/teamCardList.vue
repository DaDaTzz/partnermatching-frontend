<script setup lang="ts">
import {teamType} from "../models/team";
import {teamStatesEnum} from "../constants/team.ts";
import myAxios from "../plugins/myAxios.ts";
import {Dialog, Toast} from "vant";
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


onMounted(async () => {
  currentUser.value = await getCurrentUser();
})


// 加入队伍，跳转至加入队伍页
const doJoinTeam = async (team: teamType) => {
  if (team.states === 2) {
    let password = window.prompt("请输入密码")
    const res = await myAxios.post("/team/join", {
      teamId: team.id,
      password,
    });
    if (res.data.code === 200) {
      Toast.success("加入成功");
      team.password = '';
      await router.push('/user/team/join')
    } else {
      Toast.fail('加入失败' + (res.data.description ? `，${res.data.description}` : ''));
    }
  } else {
    const res = await myAxios.post("/team/join", {
      teamId: team.id,
    });
    if (res.data.code === 200) {
      Toast.success("加入成功");
      await router.push('/user/team/join')
    } else {
      Toast.fail('加入失败' + (res.data.description ? `，${res.data.description}` : ''));
    }
  }

}


/**
 * 跳转到更新队伍信息页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 退出队伍
 * @param id
 */
const doExitTeam = async (id: number, name: string) => {
  await Dialog.confirm({
    title: '确认退出',
    message:
        '您确定要退出' + name + '?',
  })
      .then(async () => {
        // on confirm
        const res = await myAxios.post("/team/exit", {
          teamId: id
        });
        if (res.data.code === 200) {
          Toast.success("退出成功");
          window.location.reload();
        } else {
          Toast.fail('退出失败' + (res.data.description ? `，${res.data.description}` : ''));
        }
      })
}

// 解散队伍
const doDisbandTeam = async (id: number, name:string) => {
  await Dialog.confirm({
    title: '确认解散',
    message:
        '您确定要解散' + name + '?',
  })
      .then(async () => {
        // on confirm
        const res = await myAxios.post("/team/disband", {
          teamId: id,
        });
        if (res.data.code === 200) {
          Toast.success("解散成功");
          window.location.reload();
        } else {
          Toast.fail('解散失败' + (res.data.description ? `，${res.data.description}` : ''));
        }
      })
}

/**
 * 跳转队伍详情页
 */

const teamInfo = (id) => {
  // console.log(JSON.stringify(team.createUser))
  // console.log(JSON.stringify(team.joinUsers))
  router.push({
    path: '/team/info',
    query: {
      //team:JSON.stringify(team),
      id,
    }
  })
}


</script>

<template>
  <div id="teamCardList">
    <van-card
        @click="teamInfo(team.id)"
        v-for="team in props.teamList"
        :thumb="team.profilePhoto"
        :desc="team.description"
        :title="team.name"
        :tag="teamStatesEnum[team.states]"
    >

      <template #tags>
        <!--        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">-->
        <!--          {{ teamStatesEnum[team.states] }}-->
        <!--        </van-tag>-->
        <br>
        <span v-for="joinUser in team.joinUsers">
          <van-image
              round
              fit="cover"
              width="30px"
              height="30px"
              :src="joinUser.profilePhoto"/>
        </span>
      </template>
      <template #bottom>
        <div :style="[ team.maxNum === team.hasJoinNum ? { color: 'red' } : { color: '' } ]">
          {{ "队伍人数：" + team.hasJoinNum + "/" + team.maxNum }} <br>
        </div>

      </template>
      <template #footer>
        <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="small" type="primary" plain
                    @click.stop="doJoinTeam(team)">加入队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" plain @click.stop="doUpdateTeam(team.id)">
          更新队伍
        </van-button>
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small" plain
                    @click.stop="doExitTeam(team.id,team.name)">退出队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain
                    @click.stop="doDisbandTeam(team.id,team.name)">解散队伍
        </van-button>
      </template>
    </van-card>
  </div>

</template>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 110px;

}

#teamCardList :deep(.van-card__title) {
  font-weight: bold;
  font-size: 14px;

}
</style>