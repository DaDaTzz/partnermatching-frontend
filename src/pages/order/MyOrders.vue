<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Toast} from "vant";
import qs from "qs";
import myAxios from "../../plugins/myAxios.ts";
import {getCurrentUser} from "../../services/user.ts";


const router = useRouter();
const route = useRoute()

const orderList = ref([])

const loading = ref(true)


/**
 * 查询订单
 */
const myOrders = async (val: number) => {
  let orderListData;
  loading.value = true;
  orderListData = await myAxios.get('/orders/my', {
    params: {
      states: val,
    },
  })
      .then(function (response) {
        return response.data?.data;
      })
      .catch(function (error) {
        console.log('/orders/my error', error);
        Toast.fail("响应失败");
      })
  if (orderListData) {
    orderList.value = orderListData;
  }
  loading.value = false;
}


onMounted(() => {
  getCurrentUser()
  myOrders(-1);
})


const showOrdersStates = ref(2)

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  // 全部订单
  if (name === 'all') {
    showOrdersStates.value = 0;
    myOrders(-1)
    // 已完成订单
  } else if (name === 'finish') {
    showOrdersStates.value = 1;
    myOrders(1)
    // 未完成订单
  } else if (name === 'unFinish') {
    showOrdersStates.value = 2;
    myOrders(0)
  }
}


</script>

<template>
  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab title="未完成" name="unFinish"></van-tab>
    <van-tab title="已完成" name="finish"></van-tab>
    <van-tab title="全部" name="all"></van-tab>
  </van-tabs>
  <order-card-list :order-list="orderList" :loading="loading"/>
  <van-empty v-if="!orderList || orderList.length < 1" description="没有更多了"/>
</template>

<style scoped>
.my-swipe .van-swipe-item {
  height: 150px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
</style>