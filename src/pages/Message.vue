<script setup lang="ts">
import qs from "qs";

</script>

<template>
  <van-grid>
    <van-grid-item icon="photo-o" text="粉丝" to="/user/fans"/>
    <van-grid-item icon="photo-o" text="关注" to="/user/loves"/>
    <van-grid-item icon="photo-o" text="我写的贴文" to="/my/port"/>
  </van-grid>
</template>

<style scoped>

</style>