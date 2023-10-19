

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";
import qs from 'qs';
import UserCardList from "../../components/userCardList.vue";


const route = useRoute();
const {tags} = route.query;

const userList = ref([]);

const loading = ref(true)

onMounted(async () => {
  let userListData;
  loading.value = true;

  userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        //console.log('/user/search/tags succeed', response);
        return response?.data.data;
      })
      .catch(function (error) {
        console.error('/user/search/tags error', error);
        Toast.fail('请求失败');
      })
  // console.log(userListData)
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
})



// const mockUser = {
//   id: 12345,
//   username: 'dadada',
//   userAccount: '12314',
//   profile: '阿巴阿巴阿巴',
//   avatarUrl: '',
//   gender: 0,
//   phone: '13113113111',
//   email: '592342721987@xzcxcz.com',
//   userRole: 0,
//   planetCode: '1234',
//   tags: ['java', 'emo', '打工中', 'emo', '打工中'],
//   createTime: new Date(),
// }


</script>

<template>
  <!--  <user-card-list :user-list="userList"  />-->
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空！" />

</template>

<style scoped>

</style>
