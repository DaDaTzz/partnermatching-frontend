<script setup lang="ts">
import qs from "qs";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {getCurrentUser} from "../../services/user.ts";

const currentUser = ref()
const userMessage = ref([])
const context = ref('')

onMounted(async () => {
  currentUser.value = await getCurrentUser();
  let websocket = null;
  if('WebSocket' in window){
    websocket = new WebSocket("ws://localhost:8080/api/websocket");
  }else{
    alert('Not support websocket')
  }

  //连接发生错误的回调方法
  websocket.onerror = function(){
    console.log("发生错误");
  };

  //连接成功建立的回调方法
  websocket.onopen = function(event){
    console.log("建立连接");
  }

  //接收到消息的回调方法
  websocket.onmessage = function(event){
    let um = JSON.parse(event.data);
    //console.log(um.message)
    userMessage.value.push(um)
    //console.log(event.data)
    // setMessageInnerHTML(event.data);
    //$(".progress-bar").attr("style","width:"+event.data+"%")
  }

  //连接关闭的回调方法
  websocket.onclose = function(){
    console.log("关闭连接");
  }

  //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
  window.onbeforeunload = function(){
    alert("已关闭连接");
    websocket.close();
  }

  //关闭连接
  function closeWebSocket(){
    alert("已关闭连接");
    websocket.close();
  }

})

/**
 * 发送信息
 */
const sendMessage = async () =>{
  const res = await myAxios.get('/ws/publicRoom', {
    params:{
      msg:context.value,
    }
  })
  context.value = ''
}

</script>


<template>
  <van-row v-for="um in userMessage" style="margin-left: 10px">
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




  <van-field v-model="context" />
  <van-button @click="sendMessage">发送</van-button>


</template>

<style scoped>

</style>