<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {effect, onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {Toast} from "vant";
import myAxios from "../plugins/myAxios.ts";


const currentUser = ref();

/**
 * 获取当前用户信息
 */
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const route = useRoute()

const post = JSON.parse(route.query.post)
const favourNum = ref(post.favourNum)
const thumbNum = ref(post.thumbNum)
const hasThumb = ref(post.hasThumb)
const hasFavour = ref(post.hasFavour)
const postComments = ref(post.postCommentUserVOs)

/**
 * 处理时间格式
 */
for (let i = 0; i < postComments.value.length; i++) {
  if (postComments.value[i].createTime) {
    let date = new Date(postComments.value[i].createTime);
    let year = date.getFullYear();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    postComments.value[i].createTime = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
  }
}





const content = ref('')



/**
 * 点赞
 */
const doThumb = async (id) => {
  const res = await myAxios.post("/post_thumb/", {
    postId: id,
  });
  if (res?.data.code === 200) {
    if (hasThumb.value === false) {
      thumbNum.value = (thumbNum.value = parseInt(thumbNum.value) + 1)
      hasThumb.value = true
    } else {
      thumbNum.value = (thumbNum.value = parseInt(thumbNum.value) - 1)
      hasThumb.value = false
    }
  } else {
    Toast.fail("点赞失败")
  }
}

/**
 * 收藏
 */

const doPostFavour = async (id) => {
  const res = await myAxios.post("/post_favour/", {
    postId: id,
  });
  if (res?.data.code === 200) {
    if (hasFavour.value === false) {
      favourNum.value = (favourNum.value = parseInt(favourNum.value) + 1)
      hasFavour.value = true
    } else {
      favourNum.value = (favourNum.value = parseInt(favourNum.value) - 1)
      hasFavour.value = false
    }
  } else {
    Toast.fail("点赞失败")
  }
}

/**
 * 添加评论
 */
const doAddComment = async (id) =>{
  const res = await myAxios.post("/post_comment/add", {
    postId: id,
    content:content.value
  });
  if (res?.data.code === 200) {
    location.reload();
    alert("添加成功")
  } else {
    Toast.fail("添加失败")
  }
}

</script>

<template>
  <template v-if="post">
    <div style="text-align: center">
      <van-image
          title="封面"
          fit="cover"
          width="100%"
          height="100%"
          :src="post.img"/>
    </div>
    <van-cell>
      <van-image
          title="头像"
          round
          fit="cover"
          width="2rem"
          height="2rem"
          :src="post?.user.profilePhoto"/>
      <span style="margin-bottom: 20px;margin-left: 10px">{{ currentUser?.nickname }}</span>
    </van-cell>
    <van-cell center style="font-size: 19px" :value="post.title"/>
    <van-cell :value="post.content"/>
    <van-cell  :value="post.content"/>
    <van-cell  :value="'评论' + post.commentNum"/>
    <van-row v-for="postComment in postComments" style="margin-left: 10px">
      <van-col  span="3">
        <van-space :size="20">
          <van-image
              title="头像"
              round
              fit="cover"
              width="3rem"
              height="3rem"
              :src="postComment?.commentUser.profilePhoto"/>
        </van-space>
      </van-col>
      <van-col span="20">
        <P style="margin-top: 10px; font-size: 12px; color: #1a1a1a">{{ postComment?.commentUser.nickname }}</P>
        <P style="font-size: 10px;margin-top: 1px; color: #969799">{{ postComment?.createTime }}</P>
        <van-cell type="text" style="margin: 0px;  font-size: 15px; color: #969799">{{ postComment?.content }}</van-cell>
      </van-col>
    </van-row>

  <van-tabbar>
    <van-field v-model="content" placeholder="评论" type="textarea" autosize/>
    <van-icon @click="doAddComment(post.id)" name="upgrade" size="30px" style="margin-right: 20px;margin-top: 10px"/>
    <van-icon v-if="hasFavour === false" @click.stop="doPostFavour(post?.id,)" name="like-o"
              style="margin-right: 20px; margin-top: 10px">
      {{ favourNum }}
    </van-icon>
    <van-icon v-if="hasFavour === true" @click.stop="doPostFavour(post?.id,)" name="like-o"
              style="margin-right: 20px; margin-top: 10px" color="#FF88C2">
      {{ favourNum }}
    </van-icon>
    <van-icon v-if="hasThumb === false" @click.stop="doThumb(post?.id,)" name="good-job-o"
              style="margin-right: 15px; margin-top: 10px">
      {{ thumbNum }}
    </van-icon>
    <van-icon v-if="hasThumb === true" @click.stop="doThumb(post?.id,)" name="good-job-o"
              style="margin-right: 15px; margin-top: 10px" color="#FF88C2">
      {{ thumbNum }}
    </van-icon>
  </van-tabbar>
  </template>
</template>

<style scoped>
#postComment{
  --van-card-background-color:#FFFFFF;
  --van-card-thumb-size: 30px;

}

</style>