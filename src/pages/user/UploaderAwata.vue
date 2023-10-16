<template>
  <van-uploader :afterRead="afterRead" class="fr">
  </van-uploader>
</template>


<script setup>
import {useRoute, useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";

const route = useRoute()
const router = useRouter()

function afterRead(file) {
  this.headImg = file.file;
  let formData = new FormData();
  formData.append("file", file.file);
  console.log(formData)
  myAxios.post("/img/uploadAwatar", formData, {
    headers: {
      //添加请求头
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => {
    if (res.data.code == 200) {
      alert("上传成功")
      window.location.href = '/user/update'
      //router.push('/user/update')
    }
  });

}

</script>
<style lang="scss" scoped>

</style>