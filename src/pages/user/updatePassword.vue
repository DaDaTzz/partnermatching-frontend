<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {useRouter} from "vue-router";
import {Toast} from "vant";

const router = useRouter()

const loginAccount = ref('')
const newPassword = ref('')
const checkPassword = ref('')
const email = ref('')
const showCodeInput = ref(false)
const inputCode = ref('')

/**
 * 修改密码
 */
const onSubmit = async () => {
  const res = await myAxios.post('/user/updatePassword', {
    loginAccount: loginAccount.value,
    newPassword:newPassword.value,
    checkPassword: checkPassword.value,
    email: email.value,
    inputCode:inputCode.value
  })
  if (res.data.code === 200) {
    Toast.success("修改密码成功");
    await router.push('/user/login');
  } else {
    Toast.fail("修改密码失败，" + res.data.description);
  }
};

/**
 * 发送邮箱验证码
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
          v-model="newPassword"
          type="password"
          name="新的密码"
          label="新的密码"
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