<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";
import {Md5} from "ts-md5";

const loginAccount = ref('')
const loginPassword = ref('')
const checkPassword = ref('')
const nickname = ref('')
const email = ref('')
const showCodeInput = ref(false)
const inputCode = ref('')

const SALT = 'Da';

/**
 * 用户注册
 */
const onSubmit = async () => {
  const safePassword = ref('')
  const checkSafePassword = ref('')
  const md5:any = new Md5()
  md5.appendAsciiStr(SALT + loginPassword.value)
  safePassword.value = md5.end()
  const md52:any = new Md5()
  md52.appendAsciiStr(SALT + checkPassword.value)
  checkSafePassword.value = md52.end()
  //console.log("safe password:" + safePassword.value)
  const res = await myAxios.post('/user/register', {
    loginAccount: loginAccount.value,
    loginPassword: safePassword.value,
    checkPassword: checkSafePassword.value,
    nickname: nickname.value,
    email: email.value,
    inputCode:inputCode.value
  })
  if (res.data.code === 200 && res.data.data) {
    localStorage.setItem('token', res.data.message)
    Toast.success("注册成功");
    window.location.href = '/user/updateTag';
  } else {
    Toast.fail("注册失败，" + res.data.description);
  }
};

/**
 * 发送手机验证码
 *
 */
const doSendCode = async () => {
  showCodeInput.value = true;
  const res = await myAxios.post('/user/sendEmail', {
    receiveEmail: email.value,
  })
  if (res.data.code === 200) {
    Toast.success("邮箱验证码发送成功，验证码5分钟内有效！");
  } else {
    Toast.fail("邮箱验证码发送失败，" + res.data.description);
  }
}


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
      <van-field
          v-model="email"
          name="邮箱"
          label="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field
          v-if="showCodeInput"
          v-model="inputCode"
          name="验证码"
          label="验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
      />
      <van-button plain type="primary" @click="doSendCode">发送验证码</van-button>
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