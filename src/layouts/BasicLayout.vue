<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import routes from "../config/router.ts";

const router = useRouter();
const route = useRoute();
const DEFAULT_TITLE = '组队鸭'
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
  router.back()
};
const onClickRight = () => {
  router.push('/search');
};


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

      <van-icon name="search" size="18" v-if="route.meta.SearchShow !== false"/>
      <p v-if="route.meta.TiJiaoShow" @click.stop="">提交</p>
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view/>
  </div>

  <van-tabbar router v-if="route.meta.BottomNavShow !== false">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/post/add" icon="add-o" name="port">发布</van-tabbar-item>
    <van-tabbar-item to="/message" icon="smile-comment-o" name="message">消息</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o" name="user">个人</van-tabbar-item>
  </van-tabbar>


</template>

<style scoped>
#content {
  margin-top: 60px;
  padding-bottom: 50px;
}

#reset /deep/ .van-ellipsis {
  font-weight: bold;
}
</style>