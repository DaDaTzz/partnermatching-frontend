<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const route = useRoute()

const loginAccount = ref('');
const loginPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/login',{
    loginAccount: loginAccount.value,
    loginPassword: loginPassword.value,
  })
  if(res.data.code === 200 && res.data.data){
    Toast.success("登录成功");
    window.location.href = "/";

  }else {
    Toast.fail("登陆失败");
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="loginAccount"
          name="loginAccount"
          label="账号"
          placeholder="请填写账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="loginPassword"
          type="password"
          name="loginPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>


</template>

<style scoped>

</style>