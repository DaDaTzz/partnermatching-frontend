<script setup lang="ts">
import qs from "qs";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {getCurrentUser} from "../../services/user.ts";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import routes from "../../config/router.ts";

const router = useRouter()
const DEFAULT_TITLE = '公共聊天室'
const title = ref(DEFAULT_TITLE);


/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})




const onClickLeft = () => {
  router.back();
};

/////////////////////////////////////////////////////

const currentUser = ref()
const userMessage = ref([])
const context = ref('')
const oldMessage = ref([])


onMounted(async () => {
  currentUser.value = await getCurrentUser();
  /**
   * 历史聊天记录
   */
  const oldMessageData = await myAxios.get('/message/publicRoomOldMessage')
      .then(function (response) {
        return response?.data.data;
      })
      .catch(function (error) {
        console.log("获取历史记录失败，" + error)
        Toast.fail('请求失败');
      })
  //console.log(oldMessageData)
  if (oldMessageData) {
    oldMessage.value = oldMessageData;
  }

  let websocket = null;
  if ('WebSocket' in window) {
    // websocket = new WebSocket("ws://8.130.133.165:8080/api/websocket");
    websocket = new WebSocket("ws://localhost:8080/api/websocket");
    // websocket = new WebSocket("ws://www.iyaya.icu:8080/api/websocket");

  } else {
    alert('Not support websocket')
  }

  //连接发生错误的回调方法
  websocket.onerror = function () {
    console.log("发生错误");
  };

  //连接成功建立的回调方法
  websocket.onopen = function (event) {
    console.log("建立连接");
  }

  //接收到消息的回调方法
  websocket.onmessage = function (event) {
    let um = JSON.parse(event.data);
    //console.log(um.message)
    userMessage.value.push(um)
    //console.log(event.data)
    // setMessageInnerHTML(event.data);
    //$(".progress-bar").attr("style","width:"+event.data+"%")
  }

  //连接关闭的回调方法
  websocket.onclose = function () {
    console.log("关闭连接");
  }

  //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
  window.onbeforeunload = function () {
    alert("已关闭连接");
    websocket.close();
  }

  //关闭连接
  function closeWebSocket() {
    alert("已关闭连接");
    websocket.close();
  }

})



/**
 * 发送信息
 */
const sendMessage = async () => {
  const res = await myAxios.get('/message/publicRoom', {
    params: {
      msg: context.value,
    }
  })
  context.value = ''
}

</script>


<template >

  <van-nav-bar
      fixed
      id="reset"
      :title="title"
      left-arrow
      @click-left="onClickLeft"
  >
  </van-nav-bar>



  <template v-for="om in oldMessage">
    <van-row style="margin-left: 10px">
      <van-col span="3">
        <van-space :size="20">
          <van-image
              title="头像"
              round
              fit="cover"
              width="3rem"
              height="3rem"
              :src="om.profilePhoto"/>
        </van-space>
      </van-col>
      <van-col span="20">
        <P style="margin-top: 10px;margin-left: 10px; font-size: 12px; color: #1a1a1a">
          {{ om.nickname }}
        </P>
        <p type="text" style="margin-top: 10px;margin-left: 10px;  font-size: 13px; color: #969799">{{
            om?.message
          }}
        </p>
      </van-col>
    </van-row>
  </template>

  <template v-for="um in userMessage">
    <div class="context" ref="left-main">
      <van-row style="margin-left: 10px">
        <van-col span="3">
          <van-space :size="20">
            <van-image
                title="头像"
                round
                fit="cover"
                width="3rem"
                height="3rem"
                :src="um.profilePhoto"/>
          </van-space>
        </van-col>
        <van-col span="20">
          <P style="margin-top: 10px;margin-left: 10px; font-size: 12px; color: #1a1a1a">
            {{ um.nickname }}
          </P>
          <p type="text" style="margin-top: 10px;margin-left: 10px;  font-size: 13px; color: #969799">{{
              um?.message
            }}
          </p>
        </van-col>
      </van-row>
    </div>
  </template>

  <van-tabbar>
    <van-field v-model="context" placeholder="聊点什么吧..." type="textarea" autosize/>
    <van-icon @click="sendMessage" name="upgrade" size="30px" style="margin-right: 20px;margin-top: 10px"/>
  </van-tabbar>
</template>

<style scoped>

</style>