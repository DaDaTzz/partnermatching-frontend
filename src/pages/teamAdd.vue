<script setup lang="ts">
import {ref} from "vue";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";

const router = useRouter()


const initFormData = {
  "name": "",
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "password": "",
  "states": 0,
}

const minDate = new Date();

// 用户填写的表单数据
const addTeamData = ref({...initFormData})

// 展示日期选择器
const showPicker = ref(false);

// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    states: Number(addTeamData.value.states)
  }
  const res = await myAxios.post("/team/add", postData);
  if (res.data.code === 200 && res.data.data) {
    Toast.success("添加成功");
    router.push({
      path: '/team',
      replace: true,
    });
  }else {
    Toast.fail("添加失败，" + res.data.description);
  }
}


</script>

<template>
  <div id="teamAdd">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请填写队伍名"
            :rules="[{ required: true, message: '请填写队伍名' }]"
        />
          <van-field
              v-model="addTeamData.description"
              rows="4"
              autosize
              label="队伍描述"
              type="textarea"
              placeholder="请输入队伍描述"
          />

        <van-field
            is-link
            readonly
            name="datetimePicker"
            label="过期时间"
            :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-datetime-picker
              v-model="addTeamData.expireTime"
              @confirm="showPicker = false"
              type="datetime"
              title="请选择过期时间"
              :min-date="minDate"
          />
        </van-popup>

        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.states" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
            v-if="addTeamData.states === '2'"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

</template>


<style scoped>

</style>