<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import vxImg from "../../assets/imags/tpic/vx.jpg";


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
    Toast.success("退出成功");
    window.location.reload();
  } else {
    Toast.fail('退出失败' + (res.data.description ? `，${res.data.description}` : ''));
  }
}

const router = useRouter()
const toUserUpdatePage = () => {
  router.push('/user/update')
}


/**
 * 联系客服
 */
const show = ref(false)
const showVX = () => {
  show.value = !show.value;
}

/**
 * 每日签到
 */
const doSign = async () =>{
  const res = await myAxios.post("/user/sign",{})
  if (res.data.code === 200 && res.data.data === true) {
    user.value = await getCurrentUser()
    if (user.value.tags) {
      user.value.tags = JSON.parse(user.value.tags);
    }
    Toast.success('签到成功，已获得10积分！');

  } else {
    Toast.fail('签到失败，' + res.data.description);
  }
}

/**
 * 跳转到积分商城界面
 */
const toShoppingMall = () =>{
  router.push('/user/shoppingMall')
}

</script>

<template>
  <div>
    <van-row style="margin-left: 10px">
      <van-col span="5">
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
      </van-col>
      <van-col span="18">
        <P style="margin-left: 20px;font-size: 13px; color: #1a1a1a">{{ user?.nickname }}</P>
        <P style="margin-left: 20px;font-size: 10px; color: #969799">{{user?.profile}}</P>
      </van-col>
    </van-row>


  </div>
  <van-cell-group>
    <van-cell title="我的标签" is-link :value="user?.tags">
      <van-tag plain type="danger" v-for="tag in user?.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </van-cell>
    <van-grid :border="false">
      <van-grid-item icon="manager-o" text="已创建队伍" to="/user/team/create"/>
      <van-grid-item icon="flag-o" text="已加入队伍" to="/user/team/join"/>
      <van-grid-item icon="records" text="我的博客" to="/my/post"/>
      <van-grid-item icon="chat-o" text="联系客服" @click="showVX"/>
      <van-grid-item v-if="user?.sign === 1" icon="medal-o" text="签到有礼" @click="doSign"/>
      <van-grid-item v-if="user?.sign === 0" icon="medal-o" text="签到有礼" dot @click="doSign"/>
      <van-grid-item icon="shopping-cart-o"  text="积分商城" @click="toShoppingMall"/>
      <van-grid-item icon="orders-o"  text="我的订单" @click="我的订单"/>
    </van-grid>
    <van-cell icon="user-circle-o" title="编辑信息" is-link to="/user/update"/>
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button @click="doLogout" color="red" style="margin-top: 20px" block round type="primary" native-type="submit">
      退出
    </van-button>
  </div>

  <van-overlay :show="show">
    <div class="wrapper" @click.stop>
      <div class="block" style="text-align: center">
        <van-image :src="vxImg" style="width: 80%" @click="showVX"/>
      </div>
    </div>
  </van-overlay>


</template>

<style scoped>

.center-text p {
  line-height: 40px;
  text-align: left;
  font-size: 16px;
  font-family: 楷体;
}


.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}


</style>