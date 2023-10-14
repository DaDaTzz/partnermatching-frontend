<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

const router = useRouter()

const showCodeInput = ref(false)
const receiveEmail = ref('')
const inputCode = ref('')





const onSubmit = async () => {
  const res = await myAxios.post('/user/bindEmail', {
    receiveEmail: receiveEmail.value,
    inputCode:inputCode.value,
  })
  if (res.data.code === 200) {
    alert("邮箱绑定成功！");
    await router.push('/user/update')
  } else {
    alert("邮箱绑定失败，" + res.data.description);
  }
};


/**
 * 发送邮箱验证码
 */
const doSendEmail = async () => {
  showCodeInput.value = true;
  const res = await myAxios.post('/user/sendEmail', {
    receiveEmail: receiveEmail.value,
  })
  if (res.data.code === 200) {
    alert("邮箱验证码发送成功，验证码5分钟内有效！");
  } else {
    alert("邮箱验证码发送失败，" + res.data.description);
  }
}


</script>

<template>
  <van-field v-model="receiveEmail" label="邮箱" placeholder="请输入邮箱"/>
  <van-field v-if="showCodeInput" v-model="inputCode" label="验证码" placeholder="请输入验证码"/>
  <van-button plain @click="doSendEmail" type="primary">发送验证码</van-button>
  <van-button v-if="showCodeInput" round block type="primary" @click="onSubmit">提交</van-button>
</template>

<style scoped>

</style>