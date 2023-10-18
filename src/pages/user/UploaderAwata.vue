<template>
  <van-uploader :before-read="beforeRead" :max-size="5*1024*1024" :max-count="1" :afterRead="afterRead"/>

  <van-overlay :show="show">
    <div class="wrapper" @click.stop>
      <div class="block">
        <van-loading type="spinner"/>
      </div>
    </div>
  </van-overlay>
</template>


<script setup>
import {useRoute, useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import {ref} from "vue";
import {Toast} from "vant";

const route = useRoute()
const router = useRouter()

const show = ref(false)

function afterRead(file) {
  show.value = true
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
    show.value = false
    if (res.data.code == 200) {
      Toast.success("上传成功")
      window.location.href = '/user/update'
      //router.push('/user/update')
    }
  });

}

/**
 * 判断文件类型
 * @param file
 */
const beforeRead = (file) =>{
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


<style lang="scss" scoped>

</style>