<template>
  <van-uploader :afterRead="afterRead" class="fr">
  </van-uploader>
</template>


<script setup>
import myAxios from "../../plugins/myAxios.ts";
import {useRoute,useRouter} from "vue-router";
import {ref} from "vue";
import {Toast} from "vant";

const route = useRoute()
const router = useRouter()

const id = ref(route.query.id)

function afterRead(file) {
  this.headImg = file.file;
  let formData = new FormData();
  formData.append("file", file.file);
  formData.append("id",id.value)
  console.log(formData)
  myAxios.post("/img/uploadTeamImg", formData, {
    headers: {
      //添加请求头
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => {
    if (res.data.code == 200) {
      Toast.success("上传成功")
      router.push('/user/team/create')
    }else {
      Toast.fail("上传失败，" + res.data.message)
    }
  });

}

</script>
<style lang="scss" scoped>

</style>