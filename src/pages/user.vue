<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import myAxios from "../plugins/myAxios.ts";
import { Toast} from "vant";
import {useRouter} from "vue-router";


const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser()
  if (user.value.tags) {
    user.value.tags = JSON.parse(user.value.tags);
  }
})

const doLogout = async () => {
  const res = await myAxios.post("/user/logout");
  if (res.data.code === 200) {
    localStorage.setItem("token", '');
    Toast.success("注销成功");
    window.location.reload();
  } else {
    Toast.fail('注销失败' + (res.data.description ? `，${res.data.description}` : ''));
  }
}

const router = useRouter()
const toUserUpdatePage = () => {
  router.push('/user/update')
}


/**
 * 联系客服
 */

</script>

<template>
  <div>
    <van-space :size="20">
      <van-image
          title="头像"
          @click="toUserUpdatePage"
          round
          fit="cover"
          width="5rem"
          height="5rem"
          :src="user?.profilePhoto"/>

    </van-space>
  </div>
  <van-cell-group>
    <van-cell title="我的标签" is-link :value="user?.tags">
      <van-tag plain type="danger" v-for="tag in user?.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </van-cell>
    <van-grid>
      <van-grid-item icon="photo-o" text="已创建队伍" to="/user/team/create"/>
      <van-grid-item icon="photo-o" text="已加入队伍" to="/user/team/join"/>
      <van-grid-item icon="photo-o" text="我写的贴文" to="/my/port"/>
      <van-grid-item icon="photo-o" text="联系客服" @click="show"/>

    </van-grid>
    <van-cell icon="user-circle-o" title="编辑信息" is-link to="/user/update"/>
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button @click="doLogout" color="red" style="margin-top: 20px" block round type="primary" native-type="submit">
      注销
    </van-button>
  </div>


</template>

<style scoped>

.center-text p {
  line-height: 40px;
  text-align: left;
  font-size: 16px;
  font-family: 楷体;
}

</style>