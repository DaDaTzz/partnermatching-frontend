<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";

const router = useRouter()
const searchText = ref('');


const originTagList = [
  {
    text: '语言',
    children: [
      {text: 'java', id: 'java'},
      {text: 'c', id: 'c'},
      {text: 'c++', id: 'c++'},
      {text: 'go', id: 'go'},
      {text: 'python', id: 'python'},
      {text: 'php', id: 'php'},
    ],
  },
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '爱好',
    children: [
      {text: '睡觉', id: '睡觉'},
      {text: '喝酒', id: '喝酒'},
      {text: '打游戏', id: '打游戏'},
      {text: '运动', id: '运动'},
      {text: '旅行', id: '旅行'},
    ],
  },
  {
    text: '学历',
    children: [
      {text: '小学', id: '小学'},
      {text: '初中', id: '初中'},
      {text: '高中', id: '高中'},
      {text: '专科', id: '专科'},
      {text: '本科', id: '专科'},
      {text: '硕士', id: '硕士'},
      {text: '博士', id: '博士'},
    ],
  },
  {
    text: '婚姻状态',
    children: [
      {text: '未婚', id: '未婚'},
      {text: '已婚', id: '已婚'},
      {text: '离异', id: '离异'},
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
 * 更新
 */
const doUpdate = async () => {
  //alert(activeId.value)
  const res = await myAxios.post('/user/updateTag', {
    tags: activeId.value
  })
  if (res.data.code === 200) {
    alert("更新成功");
    window.location.href = '/user/update'
  } else {
    alert("更新失败，" + res.data.description);
  }
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
    <van-col v-for="tag in activeId">
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
    <van-button block type="primary" @click="doUpdate()" style="margin: 6px">更新</van-button>
  </div>

</template>

<style scoped>

</style>