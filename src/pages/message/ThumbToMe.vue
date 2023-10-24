<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Toast} from "vant";
import myAxios from "../../plugins/myAxios.ts";
import {useRouter} from "vue-router";


const likeMyCommentUserList = ref([])


/**
 * 根据给我点赞的用户信息
 */
const getLikeMyCommentUser = async () => {
  const res = await myAxios.get("/post_comment/like/my");
  if (res?.data.code === 200) {
    likeMyCommentUserList.value = res.data.data
    console.log(likeMyCommentUserList)

    /**
     * 处理时间格式
     */
    for (let i = 0; i < likeMyCommentUserList.value.length; i++) {
      if (likeMyCommentUserList.value[i].thumbTime) {
        //console.log(likeMyCommentUserList.value[i].thumbTime)
        let date = new Date(likeMyCommentUserList.value[i].thumbTime);
        let year = date.getFullYear();
        let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        //console.log(year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds)
        likeMyCommentUserList.value[i].thumbTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
      }
      /**
       * 获取博客的第一张图片
       */
      if (likeMyCommentUserList.value[i].img) {
        let img = JSON.parse(likeMyCommentUserList.value[i].img)
        //console.log(img[0])
        likeMyCommentUserList.value[i].img = img[0]
      }
    }
  } else {
    Toast.fail("获取失败")
  }
}


/**
 * 钩子
 */
onMounted(async () => {
  await getLikeMyCommentUser()
})


const router = useRouter()

/**
 * 跳转到博客详情页
 */
const toPostInfo = (id) => {
  console.log(id)
  router.push({
    path: '/post/info',
    query: {
      id: id,
    }
  })
}


</script>


<template>
  <van-row v-for="lu in likeMyCommentUserList" style="margin-left: 10px;margin-top: 30px">
    <!-- 评论 -->
    <van-col span="20">
      <van-space :size="20">
        <van-image
            title="头像"
            round
            fit="cover"
            width="3rem"
            height="3rem"
            :src="lu.avatar"/>
        <P style=" font-size: 14px; color: #1a1a1a; ">
          {{ lu?.nickname }}
        </P>
      </van-space>
      <P style="font-size: 10px;color: #969799; margin-left: 10px ">
        {{ lu?.thumbTime }} <span v-if="lu.commentOrPost === 0">赞了我的评论</span> <span v-if="lu.commentOrPost === 1">赞了我的博客</span>
      </P>
    </van-col>
    <div @click="toPostInfo(lu.postId)">
      <van-col span="20">
        <P v-if="lu.commentOrPost === 1" style=" font-size: 14px; color: #1a1a1a;margin-left: 10px;font-weight: bold ">
          {{ lu?.title }}
        </P>
        <van-image v-if="lu?.commentOrPost === 1" :src="lu?.img"/>
        <van-field :model-value="lu?.content" readonly type="textarea"
                   style="  font-size: 14px;background-color: #EEEEEE; max-width: 100%; max-height: 100%;text-align: left;">
        </van-field>
      </van-col>
    </div>


  </van-row>
</template>


<style scoped>
#postComment {
  --van-card-background-color: #FFFFFF;
  --van-card-thumb-size: 30px;

}

.my-swipe .van-swipe-item {
  height: 150px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}

</style>