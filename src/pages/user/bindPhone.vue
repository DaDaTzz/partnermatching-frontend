<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {useRoute, useRouter} from "vue-router";
import {Toast} from "vant";

const router = useRouter()
const route = useRoute()

const showCodeInput = ref(false)
const phone = ref(route.query.phone)
const inputCode = ref('')





const onSubmit = async () => {
  const res = await myAxios.post('/user/bindPhone', {
    phone: phone.value,
    inputCode:inputCode.value,
  })
  if (res.data.code === 200) {
    Toast.success("手机绑定成功！");
    await router.push('/user/update')
  } else {
    Toast.fail("手机绑定失败，" + res.data.description);
  }
};


/**
 * 发送手机验证码
 */
const doSendEmail = async () => {
  showCodeInput.value = true;
  const res = await myAxios.post('/user/sendSms', {
    phone: phone.value,
  })
  if (res.data.code === 200) {
    Toast.success("手机验证码发送成功，验证码5分钟内有效！");
  } else {
    Toast.fail("手机验证码发送失败，" + res.data.description);
  }
}


</script>

<template>
  <van-field v-model="phone" label="手机号" placeholder="请输入手机号"/>
  <van-field v-if="showCodeInput" v-model="inputCode" label="验证码" placeholder="请输入验证码"/>
  <van-button   plain @click="doSendEmail" type="primary">发送验证码</van-button>
  <van-button v-if="showCodeInput" round block type="primary" @click="onSubmit">提交</van-button>
</template>

<style scoped>

</style>