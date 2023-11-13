<script setup lang="ts">
import {portType} from "../models/post";

interface GoodsCardListProps {
  loading: boolean;
  goodsList: portType[];
}

const props = withDefaults(defineProps<GoodsCardListProps>(), {
  loading: true,
  // @ts-ignore
  goodsList: [] as portType[],
})

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
          <van-button type="default" size="small" >兑换商品</van-button>
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