<!--
 * @Author: 飞
 * @Date: 2021-04-20 11:09:03
 * @LastEditTime: 2021-09-13 16:11:03
 * @FilePath: \you-shop1\src\views\news\news.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <!-- <span>{{ uid }}</span>
    <van-field v-model="usename" type="number" />
    <van-field v-model="password" type="number" />
    <van-button type="primary" size="large" @click="logon">注册</van-button> -->
    <!-- <iframe src="https://webim-h5.easemob.com/" frameborder="0"></iframe> -->
    <!-- Tab 标签页 -->
    <!--  -->
    <!-- 右上角添加群聊 -->

    <!-- 导航 -->

    <van-sticky>
      <!-- <span class="CreateAGroupChat" @click="openChat"> -->
      <span class="CreateAGroupChat">
        <van-popover v-model="showPopover" trigger="click" :actions="actions" placement="bottom-end" @select="onSelect">
          <!-- 创建群聊 -->
          <!-- <template #reference>
            <van-icon name="add-o" />
          </template> -->
        </van-popover>
      </span>

      <van-tabs v-model="active">
        <van-tab title="关注" badge=""></van-tab>
        <van-tab title="消息" badge=""> </van-tab>
        <van-tab title="粉丝" badge=""></van-tab>
      </van-tabs>
    </van-sticky>
    <!-- <Middleware :active="active" /> -->

    <template>
      <div v-show="active == 0">
        <Follow />
      </div>
    </template>
    <template>
      <div v-show="active == 1" style="height: 100%">
        <Messages />
      </div>
    </template>
    <template>
      <div v-show="active == 2" class="是啥" style="height: calc(100% - 148px); overflow: auto">
        <Fans />
      </div>
    </template>
    <!-- 创建群聊组件 -->
    <van-action-sheet v-model="show" :title="listNum" :style="{ height: '80%' }">
      <CreateGroupChat :chat="show" :list="list" :CreateAGroupChat="CreateAGroupChat" :Allocation="Allocation" @func="getMsgFormSon" :PoonsTheButton="PoonsTheButton" />
    </van-action-sheet>
  </div>
</template>

<script>
// import API from '../../IM/API.js'
import API from "./API.js";

export default API;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.content {
  background-color: #fff;
  position: relative;
  height: 100%;
  // 创建全聊列表
  .van-popup {
    .van-action-sheet__header {
      font-size: 14px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #333333;
      z-index: 2;
      position: relative;
    }
  }
  //创建群聊
  .CreateAGroupChat {
    z-index: 1;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 17px;
    position: absolute;
    top: 14px;
    right: 16px;
    i {
      font-size: 20px;
      padding-right: 13px;
    }
  }
  // 导航
  /deep/.van-tabs {
    background-color: #fff;
    .van-tabs__wrap {
      padding: 0 80px;
      margin-bottom: 20px;
      .van-tabs__nav {
        .van-tab {
          font-size: 18px;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: #666666;
          position: relative;
          // 通知信息数
          .van-info {
            width: 18px;
            height: 18px;
            font-size: 10px;
            font-family: PingFang-SC-Bold, PingFang-SC;
            color: #ffffff;
            background-color: #ff2d55;
          }
        }
        .van-tab--active {
          color: #0579fc;
          font-weight: bolder;
        }
        .van-tabs__line {
          background: #0579fc;
          border-radius: 2px;
          width: 22px;
          height: 2px;
        }
      }
    }
  }
}
</style>
