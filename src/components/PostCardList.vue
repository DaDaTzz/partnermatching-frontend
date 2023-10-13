<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";
import {portType} from "../models/post";

interface PortCardListProps {
  loading: boolean;
  portList: portType[];
}

const props = withDefaults(defineProps<PortCardListProps>(), {
  loading: true,
  // @ts-ignore
  portList: [] as portType[],
})

const currentUser = ref();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})


const router = useRouter()

/**
 * 跳转到文章详情页
 */
const portInfo = (port) =>{
  router.push({
    path:'/port/info',
    query: port,
  })
}


</script>

<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="port in props.portList">
    <van-card
        @click="portInfo(port)"
        :desc="port?.content"
        :title="port?.title"
        :thumb="port?.img"
    >

      <template #footer>
      </template>
    </van-card>
  </van-skeleton>
</template>

<style scoped>

</style>