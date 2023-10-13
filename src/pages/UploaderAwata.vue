<template>
  <van-uploader :afterRead="afterRead" class="fr">
    <van-image
        round
        width="2rem"
        height="2rem"
        :src="imgUrl"
    />
  </van-uploader>
</template>


<script setup>
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";

const route = useRoute()
const imgUrl = route.query.currentValue

function afterRead(file) {
  console.log(file);
  this.headImg = file.file;
  let formData = new FormData();
  formData.append("file", file.file);
  myAxios
      .post("/upload/uploadFile", formData, {
        headers: {
          //添加请求头
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.code == 200){
          alert("上传成功")
        }
      });
}

</script>
<style lang="scss" scoped>

</style>