<script setup lang="ts">
import {useRouter} from "vue-router";
import {portType} from "../models/post";

const router = useRouter()

interface PortCardListProps {
  loading: boolean;
  portList: portType[];
}

const props = withDefaults(defineProps<PortCardListProps>(), {
  loading: true,
  // @ts-ignore
  portList: [] as portType[],
})



/**
 * 跳转到文章详情页
 */
const portInfo = (id) => {
  router.push({
    path:'/post/info',
    query:{
      //post:JSON.stringify(post),
      id:id,
    }
  })
  //console.log(JSON.stringify(post))
}


</script>

<template>

  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="post in props.portList">
    <van-card
        id="portCard"
        @click="portInfo(post.id)"
        :desc="post?.content"
        :title="post?.title"
        :thumb="post?.img"
    >

      <template #footer>
        <van-icon v-if="post?.hasFavour === false" name="like-o"
                  style="margin-right: 20px">
          {{ post?.favourNum }}
        </van-icon>
        <van-icon v-if="post?.hasFavour === true" name="like-o"
                  style="margin-right: 20px;" color="#FF88C2">
          {{ post?.favourNum }}
        </van-icon>
        <van-icon v-if="post?.hasThumb === false" name="good-job-o"
                  style="margin-right: 15px">
          {{ post?.thumbNum }}
        </van-icon>
        <van-icon v-if="post?.hasThumb === true"  name="good-job-o"
                  style="margin-right: 15px" color="#FF88C2">
          {{ post?.thumbNum }}
        </van-icon>
      </template>
    </van-card>
  </van-skeleton>
</template>

<style scoped>


</style>