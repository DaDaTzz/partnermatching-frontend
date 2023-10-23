<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {nextTick, onMounted, ref} from "vue";
import {Dialog, Notify, Toast} from "vant";
import myAxios from "../../plugins/myAxios.ts";
import {getCurrentUser} from "../../services/user.ts";
import routes from "../../config/router.ts";
import Clipboard from 'clipboard'

const router = useRouter()
const DEFAULT_TITLE = '正文'
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


const show = ref(false)


const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  show.value = true
};

/////////////////////////////////////////////////////


const route = useRoute()

//const post = JSON.parse(route.query.post)

const content = ref('')

const currentUser = ref()

const postId = route.query.id
const post = ref()
const postComments = ref([])
const commentUser = ref()
const imgs = ref([])


/**
 * 根据 id 获取 post
 */
const getPostById = async () => {
  const res = await myAxios.get("/post/get/vo", {
    params: {
      id: postId,
    },
  });
  if (res?.data.code === 200) {
    post.value = res?.data.data
    postComments.value = post.value.postCommentUserVOs
    commentUser.value = postComments.value
    imgs.value = JSON.parse(post.value.img)

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
        //console.log(year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds)
        postComments.value[i].createTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
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
  currentUser.value = await getCurrentUser()
  await getPostById()
})


/**
 * 文章点赞
 */
const doThumb = async (id) => {
  const res = await myAxios.post("/post_thumb/", {
    postId: id,
  });
  if (res?.data.code === 200) {
    await getPostById()
  } else {
    Toast.fail("点赞失败")
  }
}

/**
 * 评论点赞
 */
const doCommentThumb = async (id) => {
  const res = await myAxios.post("/comment_thumb/", {
    commentId: id,
  });
  if (res?.data.code === 200) {
    await getPostById()
  }else{
    Toast.fail("操作异常！")
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
    await getPostById()
  } else {
    Toast.fail("点赞失败")
  }
}

/**
 * 添加评论
 */
const doAddComment = async (id) => {
  const res = await myAxios.post("/post_comment/add", {
    postId: id,
    content: content.value
  });
  if (res?.data.code === 200) {
    await getPostById()
    content.value = ''

  } else {
    Toast.fail("添加失败")
  }

}


/**
 * 删除评论
 */
const doDeleteComment = async (id, userId) => {
  Dialog.confirm({
    title: '删除',
    message:
        '您确认要删除这条评论吗？',
    theme: 'round-button',
  }).then(async () => {
    const res = await myAxios.post("/post_comment/del", {
      id: id,
      createUserId: userId,
    });
    if (res?.data.code === 200) {
      await getPostById()
    } else {
      Toast.fail("删除失败")
    }
  })
}

/**
 * 复制链接
 */
const copyLink = () => {
  let copyInput = document.createElement("input"); // 创建标签
  copyInput.value = window.location.href; // 标签赋值
  document.body.appendChild(copyInput); // 添加标签
  copyInput.select(); // 选取文本框内容
  document.execCommand("copy"); // 调用浏览器复制
  document.body.removeChild(copyInput); // 复制成功后再将构造的标签 移除
  Toast.success("已复制到剪切板")
}

/**
 * 删除文章
 */

const deletePost = async (id) => {
  Dialog.confirm({
    title: '删除',
    message:
        '您确认要删除这片文章吗？',
    theme: 'round-button',
  }).then(async () => {
    const res = await myAxios.post("/post/delete", {
      id: id,
    });
    show.value = false
    if (res?.data.code === 200) {
      Toast.success("删除成功")
      await router.push("/my/post")
    } else {
      Toast.fail("删除失败")
    }
  })
}

/**
 * 跳转到文章编辑页面
 */
const toPostEdit = (post) => {
  router.push({
    path:'/post/edit',
    query:{
      post:JSON.stringify(post)
    }
  })
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

      <van-icon name="wap-nav"/>
    </template>
  </van-nav-bar>


  <template v-if="post">
    <van-swipe class="my-swipe" :autoplay="2000" style="margin-top: 10px">
      <van-swipe-item v-for="img in imgs" :key="img">
        <van-image radius="15px" width="90%" height="150px" :src="img"/>
      </van-swipe-item>
    </van-swipe>
    <van-cell>
      <van-image
          title="头像"
          round
          fit="cover"
          width="2rem"
          height="2rem"
          :src="post?.user.profilePhoto"/>
      <span style="margin-bottom: 20px;margin-left: 10px">{{ post?.user.nickname }}</span>
    </van-cell>
    <van-cell center style="font-size: 19px" :value="post.title"/>
    <van-cell :value="post.content"/>
    <van-cell :value="'评论' + post.commentNum"/>
    <van-row v-for="postComment in postComments" style="margin-left: 10px">
      <van-col span="3">
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
        <P style="margin-top: 10px;margin-left: 10px; font-size: 14px; color: #1a1a1a">
          {{ postComment?.commentUser.nickname }}

            <van-icon v-if="postComment.hasThumb === false" @click="doCommentThumb(postComment?.id)"
                      name="good-job-o"
                      style="margin-left: 7px"
                      size="15px">
              {{ postComment.thumbNum }}
            </van-icon>
          <van-icon v-if="postComment.hasThumb === true" @click="doCommentThumb(postComment?.id)"
                    name="good-job-o"
                    style="margin-left: 7px;color: red"
                    size="15px">
            {{ postComment.thumbNum }}
          </van-icon>

            <!-- 自己的评论内容或者帖子的创建者才有权限删除评论 -->
            <van-icon @click="doDeleteComment(postComment?.id,post.userId)"
                      v-if="postComment?.isCanDelete === true || currentUser.id === post.userId" name="delete-o"
                      style="margin-left: 4px"
                       size="15px"/>

        </P>
        <p type="text" style="margin-top: 10px;margin-left: 10px;  font-size: 14px; color: #1a1a1a;">{{
            postComment?.content
          }}
        </p>
        <P style="font-size: 10px;margin-top: 10px; color: #969799">
          {{ postComment?.createTime }}
        </P>
      </van-col>
    </van-row>

    <van-tabbar>
      <van-field v-model="content" placeholder="评论" type="textarea" autosize/>
      <van-icon @click="doAddComment(post.id)" name="upgrade" size="30px" style="margin-right: 20px;margin-top: 10px"/>
      <van-icon v-if="post.hasFavour === false" @click.stop="doPostFavour(post?.id,)" name="like-o"
                style="margin-right: 20px; margin-top: 10px">
        {{ post.favourNum }}
      </van-icon>
      <van-icon v-if="post.hasFavour === true" @click.stop="doPostFavour(post?.id,)" name="like-o"
                style="margin-right: 20px; margin-top: 10px" color="#FF88C2">
        {{ post.favourNum }}
      </van-icon>
      <van-icon v-if="post.hasThumb === false" @click.stop="doThumb(post?.id,)" name="good-job-o"
                style="margin-right: 15px; margin-top: 10px">
        {{ post.thumbNum }}
      </van-icon>
      <van-icon v-if="post.hasThumb === true" @click.stop="doThumb(post?.id,)" name="good-job-o"
                style="margin-right: 15px; margin-top: 10px" color="#FF88C2">
        {{ post.thumbNum }}
      </van-icon>
    </van-tabbar>

  </template>

  <van-popup round v-model:show="show" position="bottom" :style="{ height: '13%' }">
    <van-grid :border="false">
      <van-grid-item @click="copyLink" icon="link-o" text="复制链接"/>
      <van-grid-item v-if="post.userId === currentUser.id" icon="edit" text="编辑" @click="toPostEdit(post)"/>
      <van-grid-item v-if="post.userId === currentUser.id" icon="delete-o" text="删除" @click="deletePost(post.id)"/>
      <van-grid-item icon="warn-o" text="举报" @click="Toast.success('举报成功')"/>
    </van-grid>
  </van-popup>
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