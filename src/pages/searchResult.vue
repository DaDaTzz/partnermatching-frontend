<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import qs from "qs";

const route = useRoute();

const {tags} = route.query;

const userList = ref([])

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList:tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        console.log('/user/search/tags success',response);
        Toast.success("响应成功");
        return response.data?.data;
      })
      .catch(function (error) {
        console.log('/user/search/tags error',error);
        Toast.fail("响应失败");
      })

      if (userListData){
        userListData.forEach(user =>{
          if(user.tags){
            user.tags = JSON.parse(user.tags)
          }
          if(user.sex){
            if(user.sex === 1){
              user.sex = "男";
            }
            if(user.sex === 0){
              user.sex = "女";
            }
          }
        })
        userList.value = userListData;
      }
})


const mockUser = {
  id:1,
  nickname:'秋雨',
  loginAccount:"123",
  loginPassword:"13456",
  sex:"男",
  phone:"1666666",
  email:"123@qq.com",
  profilePhoto:"https://z1.ax1x.com/2023/06/11/pCVNPyD.jpg",
  tags:['JAVA语言','emo','大一','打工中'],
  profile:"我是一名程序员，O(∩_∩)O哈哈~",
  createTime:new Date(),
}



</script>

<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="user.nickname"
      :thumb="user.profilePhoto"
      :tag="user.sex"
  >

    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  <van-empty  v-if="!userList || userList.length < 1" description="搜索结果为空"/>
</template>

<style scoped>

</style>