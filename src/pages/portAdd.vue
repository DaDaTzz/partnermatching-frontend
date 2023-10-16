<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import routes from "../config/router.ts";

const router = useRouter()

const route = useRoute();
const DEFAULT_TITLE = '添加博文'
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


const titlee = ref('')
const content = ref('')
const fileList = ref([])

const onSubmit = () => {
  let formData = new FormData();
  for (let i = 0; i < fileList.value.length; i++) {
    formData.append('file', fileList.value[i].file)
  }
  formData.append('title', titlee.value)
  formData.append('content', content.value)
  myAxios.post("/post/add", formData, {
    headers: {
      //添加请求头
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => {
    if (res.data.code == 200) {
      alert("上传成功")
      //window.location.href = '/user/update'
      router.push('/my/post')
    }else {
      alert("上传失败，" + res.data.description);
    }
  });

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
      <p v-if="route.meta.TiJiaoShow" @click.stop="onSubmit">提交</p>
    </template>
  </van-nav-bar>

  <div id="portAdd">
    <van-uploader :after-read="afterRead" v-model="fileList" multiple :max-count="5"/>
    <van-field v-model="titlee" placeholder="请输入标题"/>
    <van-field v-model="content" type="textarea" rows="8" placeholder="请输入正文"/>
  </div>

</template>


<style scoped>

</style>