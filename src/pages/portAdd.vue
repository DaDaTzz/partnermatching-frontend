<script setup lang="ts">
import {ref} from "vue";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";

const router = useRouter()

const title = ref('')
const content = ref('')
const img = ref('')

const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search');
};

// 提交
const onSubmit = async () => {
  const res = await myAxios.post("/post/add", {
    title: title.value,
    content: content.value,
    img:img.value,
  });
  if (res.data.code === 200 && res.data.data) {
    Toast.success("发布成功");
    await router.push({
      path: '/',
      replace: true,
    });
  } else {
    Toast.fail("发布失败，" + res.data.description);
  }
}
</script>

<template>
  <van-button @click="onSubmit" type="default">发布</van-button>
  <div id="portAdd">
    <van-field v-model="img" placeholder="图片url"/>
    <van-field v-model="title" placeholder="请输入标题"/>
    <van-field v-model="content" type="textarea" rows="8" placeholder="请输入正文"/>
  </div>

</template>


<style scoped>

</style>