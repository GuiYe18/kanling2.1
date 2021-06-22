<!--
 * @Author: 飞
 * @Date: 2021-05-17 10:37:54
 * @LastEditTime: 2021-06-22 10:55:48
 * @FilePath: \you-shop1\src\views\news\Messages.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in GroupThatTotalList" :key="item">
        <router-link :to="fun.getUrl('GroupChat', {}, { username: item.gid, nickname: item.name })">
          <div class="Avatar">
            <img src="./img/位图备份 6@2x.png" alt="" />
            <van-badge v-if="item.SessionNotRead != 0" :content="item.SessionNotRead" />
          </div>
          <div class="text">
            <h2>群名称:{{ item.name }}</h2>
            <p>{{ item.gid }}</p>
          </div>
        </router-link>
      </van-cell> -->
      <router-link v-for="item in GroupThatTotalList" :key="item" :to="fun.getUrl('GroupChat', {}, { username: item.gid, nickname: item.name })">
        <van-cell>
          <div class="Avatar">
            <img src="./img/位图备份 6@2x.png" alt="" />
            <van-badge v-if="item.SessionNotRead != 0" :content="item.SessionNotRead" />
          </div>
          <div class="text">
            <h2>群名称:{{ item.name }}</h2>
            <p>{{ item.gid }}</p>
          </div>
        </van-cell>
      </router-link>

      <router-link v-for="(item, index) in list" :key="index" :to="fun.getUrl('SolitudeChat', {}, { username: item[0].from_id, nickname: item[0].from_name })">
        <van-cell>
          <div class="Avatar">
            <img :src="item[item.length - 1].topurl" alt="" />
            <van-badge v-if="item[item.length - 1].SessionNotRead != 0" :content="item[item.length - 1].SessionNotRead" />
          </div>
          <div class="text">
            <!-- <van-badge :content="5">
              <div class="child">{{ item.nickName }}</div>
            </van-badge> -->

            <!-- <h2>{{ item }}</h2> -->
            <h2>{{ item[item.length - 1].from_name }}</h2>
            <!-- <p></p> -->
            <div class="van-ellipsis">{{ item[item.length - 1].msg_body.text }}</div>
          </div>
        </van-cell>
      </router-link>
    </van-list>
  </div>
</template>

<script>
import "./eventBus";
import { Toast } from "vant";
export default {
  data() {
    return {
      list: "",
      group: [
        // {
        //   name: "测试群",
        //   id: 6,
        //   mag: "干啥呢额都"
        // }
      ],
      loading: true,
      finished: true,
      appkData: {},
      notlogin: true
    };
  },
  beforeDestroy() {
    console.log("消息销毁前");
  },

  destroyed() {
    console.log("消息销毁后");
  },

  watch: {
    // 单聊监控
    NewArray(val, cal) {
      console.log("单聊监控有信息", val, cal);
      this.list = val;
    },
    // 监控群列表
    GroupThatTotalList(val, cal) {
      console.log("监控群列表", val, cal);
      this.GroupThatTotalList = val;
    },
    // 监控群列表会话
    Group_Chat(val, cal) {
      console.log("监控群列表会话", val, cal);
    },

    //监测路由变化
    $route(to, from) {
      console.log("route", to, from);
      // 消息界面点进去 未读数更新
      if (to.name == "SolitudeChat" || from.name == "name") {
        // window.JIM.SingleChatMessageHasBeenReadBack(to.query.username)

        this.wwwwwwwwwww(to.query.username);
      }
      // 单聊界面有消息  退出未读数更新
      if (to.name == "news" || from.name == "SolitudeChat") {
        // window.JIM.SingleChatMessageHasBeenReadBack(to.query.username)
        this.wwwwwwwwwww(from.query.username);
      }
    }
  },

  // //利用计算属性
  computed: {
    // 单聊列表
    NewArray() {
      return this.$store.state.NewArray;
    },
    // 监控群列表
    GroupThatTotalList() {
      return this.$store.state.GroupThatTotalList;
    },
    // 监控群会话
    Group_Chat() {
      return this.$store.state.Group_Chat;
    }
  },
  activated() {
    // this.onLoad()
    // this.list = window.JIM.Session;
    // this.FriendsList();

    // 单聊消息列表重载
    this.list = this.$store.state.NewArray;

    // 群聊消息列表重载
    this.GroupThatTotalList = this.$store.state.GroupThatTotalList;

    // var listdata = this.$store.state.NewArray;
    // delete listdata[window.JIM.current_user]
    // console.log('消息列表重载',listdata,window.JIM.current_user);
  },
  methods: {
    /**
     * @Author: 飞
     * @Date: 2021-06-11 01:29:18
     * @Describe:
     */
    // 总消息未读数变更
    wwwwwwwwwww(msgid) {
      console.log("this.$store.state.msg_idArry", this.$store.state.msg_idArry);
      this.$store.state.msg_idArry[msgid] = 0;
      this.$store.commit("Unread", msgid);
    },
    dainji() {
      this.$store.commit("saveCurrDbSource", this.$store.state.NumberOfMessages + 1);
    },
    // // 打开单聊界面
    // OpenSolitudeChat(item) {
    //   // this.$router.push({ name: "SolitudeChat", params: {}, query: { id: item } });
    // },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // for (let i = 0; i < 10; i++) {
      //   this.list.push(this.list.length + 1);
      // }
      // // 加载状态结束
      // this.loading = false;
      // // 数据全部加载完成
      // if (this.list.length >= 40) {
      //   this.finished = true;
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  .van-list {
    //   联系人每行
    .van-cell {
      // 头像
      .Avatar {
        vertical-align: text-bottom;

        img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
        display: inline-block;
        .van-badge {
          position: absolute;
          left: 31px;
        }
      }
      // 名称
      .text {
        padding-left: 10px;
        display: inline-block;
        width: 86%;
        /deep/.child {
          width: 40px;
          height: 40px;
          background: #f2f3f5;
          border-radius: 4px;
        }
      }
    }
    // .van-cell::after {
    //   // border: 0;
    // }
  }
}
</style>