<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const loginAccount = ref('')
const loginPassword = ref('')
const checkPassword = ref('')
const nickname = ref('')

/**
 * 用户注册
 */
const onSubmit = async () => {
  const res = await myAxios.post('/user/register', {
    loginAccount: loginAccount.value,
    loginPassword: loginPassword.value,
    checkPassword: checkPassword.value,
    nickname: nickname.value,
  })
  if (res.data.code === 200) {
    alert("注册成功");
    window.location.href = "/user/login";
  } else {
    alert("注册失败，" + res.data.description);
  }
};

</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="loginAccount"
          name="账号"
          label="账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="nickname"
          name="昵称"
          label="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
          v-model="loginPassword"
          type="password"
          name="密码"
          label="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="checkPassword"
          type="password"
          name="确认密码"
          label="确认密码"
          :rules="[{ required: true, message: '请确认密码' }]"
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