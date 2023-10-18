<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import routes from "../../config/router.ts";
import {getCurrentUser} from "../../services/user.ts";
import {Toast} from "vant";

const router = useRouter()

const route = useRoute();
const DEFAULT_TITLE = '编辑博客'
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

const post = JSON.parse(route.query.post)
//console.log(post)
const titlee = ref(post.title)
const content = ref(post.content)
const imgs = JSON.parse(post.img)


onMounted(() =>{
  getCurrentUser();
})

/**
 * 编辑（删除原来的博客，重新创建）
 */
const onSubmit = () => {
  myAxios.post("/post/update", {
    id:post.id,
    title:titlee.value,
    content:content.value,
  }).then((res) => {
    show.value = false;
    if (res.data.code == 200) {
      Toast.success("编辑成功")
      router.push('/my/post')
    } else {
      Toast.fail("编辑失败，" + res.data.description);
    }
  });

}

const show = ref(false)


</script>

<template>
  <van-swipe class="my-swipe" :autoplay="2000" style="margin-top: 10px">
    <van-swipe-item v-for="img in imgs" :key="img">
      <van-image radius="15px" width="90%" height="150px" :src="img"/>
    </van-swipe-item>
  </van-swipe>
  <van-nav-bar
      fixed
      id="reset"
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <p v-if="route.meta.TiJiaoShow" @click.stop="onSubmit">提交</p>
    </template>
  </van-nav-bar>

  <div id="portAdd">
    <van-field v-model="titlee" placeholder="请输入标题"/>
    <van-field v-model="content" type="textarea" rows="8" placeholder="请输入正文"/>
  </div>

  <van-overlay :show="show">
    <div class="wrapper" @click.stop>
      <div class="block">
        <van-loading size="24px">请稍等...</van-loading>
      </div>
    </div>
  </van-overlay>


</template>


<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
}
</style>