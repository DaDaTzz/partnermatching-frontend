<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import logo from "/src/assets/imags/tpic/logo.png"
import { Md5 } from 'ts-md5';
import myAxiosTwo from "../../plugins/myAxiosTwo.ts";


const isLoading = ref(false)

// 盐值
const SALT = "Da";

const loginAccount = ref('');
const loginPassword = ref('');
const onSubmit = async () => {
  const safePassword = ref('');
  isLoading.value = true;
  const md5:any = new Md5()
  md5.appendAsciiStr(SALT + loginPassword.value)
  safePassword.value = md5.end()
  console.log("safe password:" + safePassword.value)
  const res = await myAxios.post('/user/login', {
    loginAccount: loginAccount.value,
    loginPassword: safePassword.value,
  })
  if (res.data.code === 200 && res.data.data) {
    localStorage.setItem('token', res.data.message)
    window.location.href = "/";
  } else {
    Toast.fail("登陆失败，" + res.data.message);
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

const chickenSoup = ref('每日毒鸡汤：')

onMounted(async () =>{
  const result = await myAxiosTwo.get('https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json')
  if(result.data.text){
    chickenSoup.value += result.data.text
  }
})


</script>

<template>
  <van-notice-bar
      background="#d5ecf3"
      color="#1989fa"
      left-icon="volume-o"
      :text=chickenSoup
  />
  <div id="login-page" style="text-align: center">
    <van-image :src="logo" style="width: 45%; height: 45%"/>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="loginAccount"
            name="loginAccount"
            label="账号"
            placeholder="测试账号：dadada"
            :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
            v-model="loginPassword"
            type="password"
            name="loginPassword"
            label="密码"
            placeholder="密码：66666666"
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