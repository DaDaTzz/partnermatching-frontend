<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";
import PostCardList from "../../components/PostCardList.vue";
import {useRoute, useRouter} from "vue-router";
import routes from "../../config/router.ts";

const router = useRouter()

const route = useRoute();
const DEFAULT_TITLE = '我的博客'
const title = ref(DEFAULT_TITLE);

/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})

const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search');
};

/*
---------------------------------------------------
 */



const currentUser = ref();

/**
 * 获取当前用户信息
 */
onMounted(async () => {
  currentUser.value = await getCurrentUser();
  await getMyPorts()
})

const portList = ref([])
const loading = ref(false)

/**
 * 获取我的博客列表
 */
/**
 * 匹配用户
 */
const getMyPorts = async () => {
  let portListData;
  loading.value = true;
  portListData = await myAxios.get('/post/list/page/vo', {
    params: {
      userId:currentUser.value.id
    },
  })
      .then(function (response) {
        //console.log('/port/get/vo success', response);
        return response.data?.data;
      })
      .catch(function (error) {
        console.log('/port/get/vo error', error);
        Toast.fail("响应失败");
      })
  if (portListData) {
    portList.value = portListData.records;
  }
  for (let i = 0; i < portList.value.length; i++) {
    if(portList.value[i].img){
      let imgUrls = []
      imgUrls = JSON.parse(portList.value[i].img)
      portList.value[i].img = imgUrls[0]
    }
  }
  loading.value = false;
}

/**
 * 跳转到创建博客页面
 */
const onSubmit = () =>{
  router.push('/post/add')
}

</script>

<template>
  <van-nav-bar
      fixed
      id="reset"
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <p v-if="route.meta.ChuangJianShow" @click.stop="onSubmit">创建</p>
    </template>
  </van-nav-bar>

  <post-card-list :port-list="portList" :loading="loading"/>
  <van-empty v-if="!portList || portList.length < 1" description="没有更多了"/>

</template>

<style scoped>

</style>