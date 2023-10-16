<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import qs from "qs";
import UserCardList from "../components/userCardList.vue";
import imag1 from "../assets/imags/tpic/111.jpg";
import imag2 from "../assets/imags/tpic/222.jpg";
import imag3 from "../assets/imags/tpic/333.jpg";
import imag4 from "../assets/imags/tpic/444.png";
import PostCardList from "../components/PostCardList.vue";


const images = [imag1, imag2, imag3, imag4];

const route = useRoute();

const {tags} = route.query;

const userList = ref([])

const portList = ref([])

const loading = ref(true)

const searchText = ref('')


/**
 * 匹配用户
 */
const matchUsers = async (val = '') => {
  let userListData;
  loading.value = true;
  const num = 20;
  userListData = await myAxios.get('/user/match', {
    params: {
      num,
      nickname: val
    },
  })
      .then(function (response) {
        //console.log('/user/match success', response);
        return response.data?.data;
      })
      .catch(function (error) {
        console.log('/user/match error', error);
        Toast.fail("响应失败");
      })
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

/**
 * 热门博文
 */
const getPorts = async (val = '') => {
  let portListData;
  loading.value = true;
  portListData = await myAxios.get('/post/list/page/vo', {
    params: {
      title: val
    }
  })
      .then(function (response) {
        //console.log('/port/list/page/vo success', response);
        return response.data?.data;
      })
      .catch(function (error) {
        console.log('/port/list/page/vo error', error);
        Toast.fail("响应失败");
      })
  if (portListData) {
    portList.value = portListData.records
  }
  for (let i = 0; i < portList.value.length; i++) {
    if (portList.value[i].img) {
      let imgUrls = []
      imgUrls = JSON.parse(portList.value[i].img)
      portList.value[i].img = imgUrls[0]
    }

  }
  loading.value = false;
}

const onSearch = (val) => {
  if (userOrPort.value === 0) {
    matchUsers(val);
  } else {
    getPorts(val)
  }

};


onMounted(() => {
  matchUsers();
})


const userOrPort = ref(0)

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  // 队伍
  if (name === 'match') {
    userOrPort.value = 0;
    matchUsers(searchText.value)
    // 博文
  } else if (name === 'port') {
    userOrPort.value = 1;
    getPorts(searchText.value)
  }
}


</script>

<template>
  <van-notice-bar
      background="#d5ecf3"
      color="#1989fa"
      left-icon="volume-o"
      text="前端真的恶心人啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"
  />
  <van-swipe class="my-swipe" :autoplay="2000" style="margin-top: 10px">
    <van-swipe-item v-for="image in images" :key="image">
      <van-image radius="15px" width="90%" height="150px" :src="image"/>
    </van-swipe-item>
  </van-swipe>
  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab title="推荐用户" name="match"></van-tab>
    <van-tab title="热门博文" name="port"></van-tab>
  </van-tabs>
  <van-search shape="round" v-model="searchText" placeholder="请输入搜索关键词" @search="onSearch"/>

  <div v-if="userOrPort === 0">
    <user-card-list :user-list="userList" :loading="loading"/>
  </div>
  <div v-if="userOrPort === 1">
    <post-card-list :port-list="portList" :loading="loading"/>
  </div>
  <van-empty v-if="!userList || userList.length < 1" description="没有更多了"/>
</template>

<style scoped>
.my-swipe .van-swipe-item {
  height: 150px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
</style>