<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";


const route = useRoute()
const router = useRouter()
const order = ref()
onMounted(async () => {
  const orderId = route.query.orderId
  const res = await myAxios.post('/orders/get/vo', {
    orderId,
  })
  if (res.data.code === 200 && res.data.data) {
    order.value = res.data.data
  } else {
    Toast.fail('加载失败，' + res.data.message)
  }
  if (order) {
    /**
     * 处理时间格式
     */
    if (order.value.createTime) {
      let date = new Date(order.value.createTime);
      let year = date.getFullYear();
      let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      //console.log(year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds)
      order.value.createTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }
  }
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
const doRefund = async (orderId) => {
  const res = await myAxios.post('/orders/refund', {
    orderId: orderId,
  })
  if (res.data.code === 200 && res.data.data === true) {
    Toast.success('退款成功！');
  } else {
    Toast.fail('退款失败，' + res.data.description);
  }
}


</script>

<template>
  <template v-if="order">
    <div>
      <van-row style="margin-left: 10px">
        <van-col span="5">
          <van-space :size="20">
            <van-image
                title="头像"
                round
                fit="cover"
                width="5rem"
                height="5rem"
                :src="order.goods.image"/>
          </van-space>
        </van-col>
        <van-col span="18">
          <P style="margin-left: 20px;font-size: 13px; color: #1a1a1a">{{ order.goods.name }}</P>
          <P style="margin-left: 20px;font-size: 10px; color: #969799">{{ order.goods.description }}</P>
        </van-col>
      </van-row>
    </div>

    <van-cell title="商品总价" is-link :value="order.amount"/>
    <van-cell title="确认收货后付款" is-link :value="order.amount"/>
    <van-cell title="订单编号" is-link :value="order.id"/>
    <van-cell title="支付方式" is-link value="暂无"/>
    <van-cell title="下单时间" is-link :value="order.createTime"/>
    <van-cell title="付款时间" is-link value="暂无"/>
    <van-cell title="发货时间" is-link value="暂无"/>
    <div style="margin: 16px;">
      <van-button v-if="order.states === 1" @click.stop="toBuyAgain(order)" plain round block type="primary"
                  native-type="submit" style="border-color: skyblue; color: #969799;">
        再次购买
      </van-button>
      <van-button @click.stop="doRefund(order.id)" plain round block type="primary"
                  native-type="submit" style="border-color: skyblue; color: #969799; margin-top: 10px;">
        申请退款
      </van-button>
    </div>
  </template>
</template>

<style scoped>

</style>