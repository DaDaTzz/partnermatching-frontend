<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import myAxiosTwo from "../../plugins/myAxiosTwo.ts";
import {useRoute, useRouter} from "vue-router";
import routes from "../../config/router.ts";

const router = useRouter()

const route = useRoute();
const DEFAULT_TITLE = '朋友圈'
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
--------------------------------------------
 */



const trends = ref()

const backgroundImage = ref('')


onMounted(async () => {
  /**
   * 随机背景图
   */
  const result = await myAxiosTwo.get('https://api.btstu.cn/sjbz/api.php?lx=suiji&format=json&method=pc')
  if (result.data.code === "200" && result.data.imgurl) {
    //console.log(result.data.imgurl)
    backgroundImage.value = result.data.imgurl
  }


  /**
   * 获取自己以及关注的用户的朋友圈
   */
  const res = await myAxios.get("/trends/");
  if (res?.data.code === 200) {
    trends.value = res?.data.data;
  }
  /**
   * 处理时间格式以及转换图片 JSON url数组
   */
  for (let i = 0; i < trends.value.length; i++) {
    if (trends.value[i].createTime) {
      let date = new Date(trends.value[i].createTime);
      let year = date.getFullYear();
      let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      //console.log(year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds)
      trends.value[i].createTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }
    if(trends.value[i].img){
      trends.value[i].img = JSON.parse(trends.value[i].img)
      console.log(trends.value[i].img)
    }
  }
})

/**
 * 跳转到发布朋友圈页面
 */
const onSubmit = () =>{
  router.push('/trends/add')
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
      <p v-if="route.meta.FaBuShow" @click.stop="onSubmit">发布</p>
    </template>
  </van-nav-bar>



  <van-image
      :src=backgroundImage
  />

  <br>
  <br>

  <div v-for="t in trends">
    <van-row style="margin-left: 10px">
      <van-col span="5">
        <van-space :size="20">
          <van-image
              title="头像"
              @click="toUserUpdatePage"
              round
              fit="cover"
              width="4rem"
              height="4rem"
              :src="t?.profilePhoto"/>
        </van-space>
      </van-col>
      <van-col span="18">
        <P style="margin-left: 0px;font-size: 15px; color: #38b9fa">{{ t?.nickname }}</P>
        <P style="margin-left: 0px;font-size: 15px; color: black">{{ t?.content }}</P>
        <van-row>
          <van-col span="4" v-for="img in t.img">
            <van-image :src="img" style="width: 50px; height: 50px"/>
          </van-col>
        </van-row>
        <P style="margin-left: 0px;font-size: 9px; color: #808080">{{ t?.createTime }}</P>
      </van-col>
    </van-row>
    <van-divider/>

  </div>


</template>

<style scoped>
#reset /deep/ .van-ellipsis {
  font-weight: bold;
}

</style>