<script setup lang="ts">
import {ref} from "vue";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";

const router = useRouter()

const title = ref('')
const content = ref('')
const fileList = ref([])


const onSubmit = () => {
  var formData = new FormData();
  for (let i = 0; i < fileList.value.length; i++) {
    formData.append('file', fileList.value[i].file)
  }
  formData.append('title', title.value)
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
      router.push('/my/port')
    }else {
      alert("上传失败，" + res.data.description);
    }
  });

}





// 提交

</script>

<template>
  <van-button  @click="onSubmit" plain type="primary">发布</van-button>
  <div id="portAdd">
    <van-uploader :after-read="afterRead" v-model="fileList" multiple :max-count="5"/>
    <van-field v-model="title" placeholder="请输入标题"/>
    <van-field v-model="content" type="textarea" rows="8" placeholder="请输入正文"/>
  </div>

</template>


<style scoped>

</style>