<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
   import myAxios from "../plugins/myAxios.ts";
   import {Toast} from "vant";
import {getCurrentUser} from "../services/user.ts";


   const route = useRoute()
   const router = useRouter()
   const editUser = ref({
     editKey: route.query.editKey,
     currentValue: route.query.currentValue,
     editName: route.query.editName,
   })

const imageAccept = "/jpg,/png";
const fileList2 = [];


   const onSubmit = async () => {
     const currentUser = await getCurrentUser();

     if(!currentUser){
       Toast.fail("用户未登录");
       return;
     }

     const res = await myAxios.post('/user/update',{
       'id':currentUser.id,
       [editUser.value.editKey as string]:editUser.value.currentValue,
     })
     if(res.data.code === 200 && res.data.data === true){
       Toast.success("修改成功");
       window.location.reload();
       router.back();
     }else{
       Toast.fail("修改失败" );
     }
   };




</script>

<template>
  <van-form @submit="onSubmit">
    <div v-if="editUser.editKey === 'sex'">
      <van-radio-group v-model="editUser.currentValue" direction="horizontal">
        <van-radio name="1">男</van-radio>
        <van-radio name="0">女</van-radio>
      </van-radio-group>
    </div>

    <div v-if="editUser.editKey !== 'sex' " >
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    </div>

  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
  </van-form>
</template>

<style scoped>

</style>