<script setup lang="ts">
import {portType} from "../models/post";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const router = useRouter()
const user = ref()

onMounted(() => {
  user.value = getCurrentUser()
})

interface OrderCardListProps {
  loading: boolean;
  orderList: portType[];
}

const props = withDefaults(defineProps<OrderCardListProps>(), {
  loading: true,
  // @ts-ignore
  orderList: [] as portType[],
})



/**
 * 跳转到下订单页面
 */
const toBuyAgain = (order) => {
  router.push({
    path: '/order/again',
    query: {
      order: JSON.stringify(order)
    }
  })
}


/**
 * 退款
 */
const doRefund = async (orderId) =>{
  const res = await myAxios.post('/orders/refund',{
    orderId:orderId,
  })
  if(res.data.code === 200 && res.data.data === true){
    Toast.success('退款成功！');
  }else{
    Toast.fail('退款失败，' + res.data.description);
  }
}

/**
 * 跳转到订单详情页
 */
const toOrderInfo = (orderId) =>{
  router.push({
    path:'/order/info',
    query:{
      orderId:orderId,
    }
  })
}


</script>


<template>
  <div id="orderCardList">
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="order in props.orderList">
      <van-card
          @Click="toOrderInfo(order.id)"
          id="orderCard"
          :price="order.amount"
          :desc="`下单数量：x${order.goodsNumber}`"
          :title="`${order.goods.name}`"
          :thumb="order.goods.image"
          :tag="order.states === 0 ? '待发货':'已完成'"
      >
        <template #tags>
          收货地址：{{ order.address }}
        </template>
        <template #footer>
          <van-button v-if="order.states === 1" type="default" color="SteelBlue" size="small" @click.stop="toBuyAgain(order)">
            再次购买
          </van-button>
          <van-button type="default" color="SkyBlue" size="small" @click.stop="doRefund(order.id)">
            申请退款
          </van-button>
        </template>
      </van-card>
    </van-skeleton>
  </div>
</template>

<style scoped>
#orderCardList :deep(.van-card__title) {
  font-weight: bold;
  font-size: 14px;

}



</style>