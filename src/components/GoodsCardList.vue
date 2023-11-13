<script setup lang="ts">
import {portType} from "../models/post";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";

const  router = useRouter()
const user = ref()

onMounted(() =>{
  user.value = getCurrentUser()
})

interface GoodsCardListProps {
  loading: boolean;
  goodsList: portType[];
}

const props = withDefaults(defineProps<GoodsCardListProps>(), {
  loading: true,
  // @ts-ignore
  goodsList: [] as portType[],
})

/**
 * 跳转下订单页面
 */
const toCreateOrder = (goods) =>{
  router.push({
    path:'/order/create',
    query:{
      goods:JSON.stringify(goods),
    }
  })
}

</script>


<template>
  <div id="goodsCardList" >
    <van-skeleton  title avatar :row="3" :loading="props.loading" v-for="goods in props.goodsList">
      <van-card
          id="goodsCard"
          :price="goods?.price"
          :desc="goods?.description"
          :title="goods?.name"
          :thumb="goods?.image"
      >
        <template #footer>
          <van-button type="default" size="small" @click="toCreateOrder(goods)">兑换商品</van-button>
        </template>
      </van-card>
    </van-skeleton>
  </div>
</template>

<style scoped>
#goodsCardList :deep(.van-card__title) {
  font-weight: bold;
  font-size: 14px;

}


</style>