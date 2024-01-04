<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import routes from "../../config/router.ts";
import {getCurrentUser} from "../../services/user.ts";
import {Toast} from "vant";

const router = useRouter()

const route = useRoute();
const DEFAULT_TITLE = '发布动态'
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


const content = ref('')
const fileList = ref([])


onMounted(() => {
  getCurrentUser();
})

const onSubmit = () => {
  let formData = new FormData();
  if (fileList.value.length === 0) {
    Toast.fail("先加张图片吧！")
    return
  }
  show.value = true
  for (let i = 0; i < fileList.value.length; i++) {
    formData.append('file', fileList.value[i].file)
  }
  formData.append('content', content.value)
  myAxios.post("/trends/add", formData, {
    headers: {
      //添加请求头
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => {
    show.value = false;
    if (res.data.code == 200) {
      Toast.success("发布成功")
      router.push('/trends/info')
    } else {
      Toast.fail("发布失败，" + res.data.description);
    }
  });

}

const show = ref(false)


/**
 * 判断文件类型
 * @param file
 */
const beforeRead = (file) => {
  if (file instanceof Array && file.length) {
    file.forEach(item => {
      if (item.type !== 'image/jpeg' && item.type !== 'image/png' && item.type !== 'image/jpg') {
        Toast.fail('请选择正确图片格式上传')
        return false
      }
    })
    return file
  } else {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
      Toast.fail('请选择正确图片格式上传')
      return false
    }
    return file
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
      <p v-if="route.meta.FaBuShow" @click.stop="onSubmit">提交</p>
    </template>
  </van-nav-bar>

  <div id="trendsAdd">
    <van-uploader :before-read="beforeRead" :max-count="5" :max-size="5*1024*1024" :after-read="afterRead"
                  v-model="fileList" multiple/>
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