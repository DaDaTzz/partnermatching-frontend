<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";

const trends = ref()

onMounted(async () => {
  /**
   * 获取自己以及关注的用户的朋友圈
   */
  const res = await myAxios.get("/trends/");
  if (res?.data.code === 200) {
    trends.value = res?.data.data;
  }

  /**
   * 处理时间格式
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
  }
})





</script>

<template>
  <van-image
      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Febb1b35e-b314-4c2c-bb45-d794da09c56d%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1706158378&t=cdfabc2ce5d4b42333203b62b81eda1c"
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
        <P style="margin-left: 0px;font-size: 15px; color: black">{{t?.content}}</P>
        <P style="margin-left: 0px;font-size: 9px; color: #808080">{{ t?.createTime }}</P>
      </van-col>
    </van-row>
    <van-divider />

  </div>



</template>

<style scoped>

</style>