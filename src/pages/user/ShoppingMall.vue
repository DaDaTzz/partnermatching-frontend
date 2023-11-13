<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";
import GoodsCardList from "../../components/GoodsCardList.vue";

const user = ref();
const loading = ref(false)
const goodsList = ref([])


onMounted(async () => {
  user.value = await getCurrentUser()
  /**
   * 获取商品列表
   */
  const goodsListData = await myAxios.get('goods/list/page')
      .then(function (response) {
        //console.log('/user/get/love succeed', response);
        return response?.data.data;
      })
      .catch(function (error) {
        console.error('/goods/list/page', error);
        Toast.fail('请求失败');
      })
  if (goodsListData) {
    console.log(goodsListData)
    goodsList.value = goodsListData.records;
  }
  loading.value = false;
})


</script>

<template>
  <van-cell title="我的积分" :value="user?.integral"/>
  <goods-card-list :goods-list="goodsList" :loading="loading"></goods-card-list>
  <van-empty v-if="!goodsList || goodsList.length < 1" description="没有更多了"/>

</template>

<style scoped>

.center-text p {
  line-height: 40px;
  text-align: left;
  font-size: 16px;
  font-family: 楷体;
}


</style>