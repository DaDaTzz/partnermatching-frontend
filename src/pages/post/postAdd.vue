<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import routes from "../../config/router.ts";

const router = useRouter()

const route = useRoute();
const DEFAULT_TITLE = '发布博客'
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
  show.value = true
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
    show.value = false;
    if (res.data.code == 200) {
      alert("发布成功")
      router.push('/my/post')
    } else {
      alert("发布失败，" + res.data.description);
    }
  });

}

const show = ref(false)


/**
 * 判断文件类型
 * @param file
 */
const beforeRead = () =>{
  if (fileList instanceof Array && fileList.length) {
    for (let i = 0; i < fileList.value.length; i++) {
      if (fileList.value[i].file.type !== 'image/jpeg' && fileList.value[i].file.type !== 'image/png' && fileList.value[i].file.type !== 'image/jpg') {
        alert('请选择正确图片格式上传')
        return false
      }
    }
    return fileList
  } else {
    if (fileList.value.file.type !== 'image/jpeg' && fileList.value.file.type !== 'image/png' && fileList.value.file.type !== 'image/jpg') {
      alert('请选择正确图片格式上传')
      return false
    }
    return fileList;
  }
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
    <van-uploader :before-read="beforeRead" :max-count="5" :max-size="5*1024*1024" :after-read="afterRead" v-model="fileList" multiple/>
    <van-field v-model="titlee" placeholder="请输入标题"/>
    <van-field v-model="content" type="textarea" rows="8" placeholder="请输入正文"/>
  </div>

  <van-overlay :show="show">
    <div class="wrapper" @click.stop>
      <div class="block">
        <van-loading type="spinner"/>
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