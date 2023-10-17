<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import logo from "/src/assets/imags/tpic/logo.png"


const isLoading = ref(false)

const loginAccount = ref('');
const loginPassword = ref('');
const onSubmit = async () => {
  isLoading.value = true;
  const res = await myAxios.post('/user/login', {
    loginAccount: loginAccount.value,
    loginPassword: loginPassword.value,
  })
  if (res.data.code === 200 && res.data.data) {
    localStorage.setItem('token', res.data.message)
    Toast.success("登录成功");
    window.location.href = "/";
  } else {
    Toast.fail("登陆失败");
    isLoading.value = false;
  }
};

const router = useRouter()

/**
 * 跳转修改密码页
 */
const toUpdatePassword = () => {
  router.push('/user/updatePassword')
}

</script>

<template>
  <div id="login-page" style="text-align: center">
    <van-image :src="logo" style="width: 45%; height: 45%"/>
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
            placeholder="请填写密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button :loading="isLoading" loading-text="登录中........"
                    color="linear-gradient(to right, #4bb0ff, #6149f6)" block round type="primary" native-type="submit">
          登录
        </van-button>
        <van-button style="margin-top: 20px" to="/user/register" color="#FFBB00" block round type="primary"
                    native-type="submit">
          注册
        </van-button>
        <div style="text-align: right; margin-top: 15px">
          <a @click="toUpdatePassword" style="color:#0066FF; text-decoration:underline;">
            忘记密码
          </a>
        </div>

      </div>
      <van-divider dashed style="margin-top: 260px">author:Da</van-divider>
    </van-form>
  </div>

</template>


<style scoped>

</style>