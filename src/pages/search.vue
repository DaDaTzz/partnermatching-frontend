<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from "vue-router";

const router = useRouter()
const searchText = ref('');


const originTagList = [
  {
    text: '语言',
    children: [
      { text: 'java', id: 'java' },
      { text: 'c++', id: 'c++' },
      { text: 'go', id: 'go' },
      { text: 'python', id: 'python' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大一', id: '大1' },
      { text: '大1', id: '大2' },
      { text: '大2', id: '大3' },
      { text: '大3', id: '大4' },
      { text: '大4', id: '大5' },
      { text: '大5', id: '大6' },
      { text: '大1111', id: '大1111' },
      { text: '大2222', id: '大2222' },
      { text: '大3333', id: '大3333' },
    ],
  },
]

let tagList = ref(originTagList);

/**
 * 搜索过滤
 * @param val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag}
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
        return tempParentTag;
    })
};
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};


const activeId = ref([]);
const activeIndex = ref(0);


/**
 * 移除标签
 * @param tag
 */
const doClose = (tag) => {
  activeId.value = activeId.value.filter(item => {
    return item !== tag;
  })
}


/**
 * 执行搜索
 */
const doSearchResult = () => {
  router.push({
    path:'/user/list',
    query:{
      tags:activeId.value
    }
  })
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeId.length === 0">请选择标签</div>
  <van-row gutter="16">
    <van-col v-for="tag in activeId" >
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeId"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult()" style="margin: 6px">搜索</van-button>
  </div>

</template>

<style scoped>

</style>