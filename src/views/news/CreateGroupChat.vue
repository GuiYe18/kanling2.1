<!--
 * @Author: 飞
 * @Date: 2021-05-17 11:56:32
 * @LastEditTime: 2021-06-17 16:01:00
 * @FilePath: \you-shop1\src\views\news\CreateGroupChat.vue
 * @Describe: 
-->
<template>
  <div class="Chat">
    <!-- 搜索用户 -->
    <!-- <van-search v-model="value" placeholder="搜索用户" /> -->
    <van-checkbox v-model="selectAll" class="selectAll">全选</van-checkbox>

    <van-index-bar :index-list="indexList">
      <div v-for="(item, i) in list" :key="i">
        <van-index-anchor :index="item.letter" />
        <!-- <van-index-anchor :index="i" /> -->

        <li class="ItemFans">
          <div class="img">
            <img :src="item.photo_wx" alt="" />
          </div>
          <div class="van-ellipsis">{{ item.nickname }}</div>
          <van-checkbox v-model="item.checked" />
        </li>
      </div>
    </van-index-bar>
    <!-- 发起群聊 -->
    <!-- 没选 -->
    <div class="NotChoose" v-show="Choose == 0">发起聊天</div>
    <!-- 选了 -->
    <div class="InitiateChat" v-show="Choose == 1" @click="ChatGo">发起聊天</div>
    <!-- 群聊名称 -->
    <van-dialog v-model="show" title="快给群聊去一个名字吧" show-cancel-button @confirm="confirm">
      <input type="text" v-model="GroupChat" class="GroupName" />
    </van-dialog>
  </div>
</template>

<script>
import { Toast } from "vant";
import { MessageBox } from "mint-ui";
export default {
  props: ["chat", "list", "CreateAGroupChat", "Allocation", "PoonsTheButton"],
  data() {
    return {
      GroupChat: "", //群聊名
      show: false, //创建名显示隐藏
      // 发起群聊   全选时    0 没选中  1 选中
      Choose: 0,
      indexList: this.$store.state.Lettercombination,
      // checked: true,
      //   全选中
      selectAll: false,
      list: [] //发起群聊
    };
  },
  watch: {
    // PoonsTheButton: function () {
    //   if (this.PoonsTheButton == true) {
    //     this.Choose = 1;
    //   }
    //   if (this.PoonsTheButton == false) {
    //     this.Choose = 0;
    //   }
    // },

    Allocation: function () {
      console.log("选中1");
      if (this.Allocation == true) {
        this.selectAll = true;
      }
      if (this.Allocation == false) {
        this.selectAll = false;
      }
    },
    CreateAGroupChat: function () {
      console.log("选中2");
      if (this.CreateAGroupChat == true) {
        this.Choose = 1;
      }
      if (this.CreateAGroupChat == false) {
        this.Choose = 0;
      }
    },
    selectAll: function (N, O) {
      console.log("全选");
      this.$emit("func", this.selectAll);
      // if (N == true) {
      //   this.Choose = 1;
      // }
      // if (N == false) {
      //   this.Choose = 0;
      // }
    }
  },
  activated() {
    console.log("创建群聊列表", this.$store.state.FansList);
    this.list = this.$store.state.FansList;
  },

  methods: {
    // ChatGo() {
    //   Toast("发起群聊");
    // },

    // 发起群聊 弹出群聊名
    ChatGo() {
      this.show = !this.show;
    },
    // 弹出群聊名 点击确认创建
    confirm() {
      console.log("确认创建了");
      // 创建群聊
      window.JIM.CreateAGroupChat(this.GroupChat, this.$store.state.CreateAGroupChatLibraryusename);
      
      this.GroupChat = "";
    }
  }
};
</script>

<style lang="scss" scoped>
// 创建群聊
.Chat {
  // 起群名
  .GroupName {
    height: 36px;
    border: 1px solid #a7a1a1;
    border-radius: 18px;
    text-align: center;
    margin-top: 8px;
    font-size: larger;
  }
  //发起群聊
  .NotChoose {
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    width: 200px;
    line-height: 40px;
    color: #999999;
    background-color: #e4e4e4;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
  }
  .InitiateChat {
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    width: 200px;
    line-height: 40px;
    color: #ffffff;
    background: #0579fc;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
  }
  // 全选
  /deep/.selectAll {
    position: absolute;
    top: 53px;
    display: inline-flex;
    z-index: 3;
    right: 19px;
    // 全选变色
    .van-checkbox__icon--checked .van-icon {
      background-color: #e60416;
      border-color: #e60416;
    }
  }
  /deep/.van-index-bar {
    padding-bottom: 68px;
    padding-top: 20px;
    //   标题索引
    .van-index-anchor {
      text-align: left;
    }
    .van-index-anchor--sticky {
      top: -1px;
    }
    // 每个人列表
    .ItemFans {
      padding: 0 16px;
      text-align: left;

      .img {
        display: inline-block;
        vertical-align: middle;
        img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
      }
      .van-ellipsis {
        margin-left: 11px;
        display: inline-block;
        font-size: 14px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #333333;
        width: 73%;
      }
      .van-checkbox {
        display: inline-block;
        vertical-align: text-top;
        width: 9%;
        text-align: right;
        .van-checkbox__icon {
          display: inline-block;
        }
        // 单个人选中
        .van-checkbox__icon--checked .van-icon {
          background-color: #e60416;
          border-color: #e60416;
        }
      }
    }
  }
}
</style>