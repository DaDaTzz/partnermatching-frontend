<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";
import {getCurrentUser} from "../../services/user.ts";
import {ref} from "vue";


const route = useRoute()
const router = useRouter()
const order = JSON.parse(route.query.order)
const number = ref(order.goodsNumber)


const onSubmit = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    Toast.fail("用户未登录");
    return;
  }

  const res = await myAxios.post('/orders/create', {
    'goodsId': order.goods.id,
    'address':order.address,
    'goodsNumber':number.value,
  })
  if (res.data.code === 200 && res.data.data === true) {
    Toast.success("下单成功");
    router.back();
  } else {
    Toast.fail("下单失败，" + res.data.description                                                                    );
  }
};


</script>

<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="order.goods.name"
          name="商品名称"
          label="商品名称"
          disabled
      />
    <van-field
        v-model.number="order.goods.price"
        name="消耗积分"
        label="消耗积分"
        disabled
    />
    <van-field
        v-model="order.address"
        name="收货地址"
        label="收货地址"
    />
    下单数量：<van-stepper v-model.number="number"  min="1" max="10" integer />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        下单
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>