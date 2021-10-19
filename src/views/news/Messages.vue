<!--
 * @Author: 飞
 * @Date: 2021-05-17 10:37:54
 * @LastEditTime: 2021-08-28 22:14:14
 * @FilePath: \you-shop1\src\views\news\Messages.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <!-- 没有更多消息了 -->
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="height: 100%"> -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多消息了" @load="onLoad">
      <!-- <router-link v-for="item in GroupThatTotalList" :key="item" :to="fun.getUrl('GroupChat', {}, { username: item.gid, nickname: item.name })">
        <van-cell>
          <div class="Avatar">
            <img src="./img/BitmapBackup.png" alt="" />
          </div>

          <van-badge v-if="item.SessionNotRead != 0" :content="item.SessionNotRead" max="99" size="40px" />

          <div class="text">
            <h2>群名称:{{ item.name }}</h2>
            <p>{{ item.gid }}</p>
          </div>
        </van-cell>
      </router-link> -->

      <router-link v-for="(item, index) in list" :key="index" :to="fun.getUrl('SolitudeChat', {}, { username: item.from_id, nickname: item.from_name })">
        <!-- <router-link v-for="(item, index) in list" :key="index" :to="fun.getUrl('SolitudeChat', {}, {})"> -->
        <van-cell>
          <!-- <div class="Avatar">
            <img :src="item.topurl" alt="" />
          </div> -->

          <div class="Avatarwai">
            <van-image class="Avatar" :src="item.topurl">
              <template v-slot:error>加载失败</template>
            </van-image>
            <van-badge v-if="item.SessionNotRead != 0" :content="item.SessionNotRead" />
          </div>

          <div class="waixian">
            <div class="text">
              <!-- <van-badge :content="5">
              <div class="child">{{ item.nickName }}</div>
            </van-badge> -->

              <!-- <h2>{{ item }}</h2> -->
              <h2>{{ item.from_name }}</h2>
              <!-- <p></p> -->
              <div class="van-ellipsis">{{ item.msg_body.text }}</div>
            </div>
            <div class="shijian">
              <span v-if="mmgettime == item.mmgettime">{{ item.hhgettime }}</span>
              <span v-else>{{ item.mmgettime }}</span>
            </div>
          </div>
        </van-cell>
      </router-link>
    </van-list>
    <!-- </van-pull-refresh> -->
    <!-- <div style="color: #969799; font-size: 14px; line-height: 50px; text-align: center">消息接口正在维护</div> -->
  </div>
</template>

<script>
import pinyin from "pinyin";
import "./eventBus";
import { Toast } from "vant";
export default {
  data() {
    return {
      isLoading: false,
      list: [],
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
      notlogin: true,
      mmgettime: "",
      hhgettime: ""
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
      var pppppp = Object.keys(val).sort(function (a, b) {
        return val[b][val[b].lastIndex].create_time - val[a][val[a].lastIndex].create_time;
      });
      console.log("单聊监控有信息", pppppp);
      var listtext = {};
      // for (let index = 0; index < pppppp.length; index++) {
      //   listtext[pppppp[index]] = val[pppppp[index]];
      // }
      pppppp.forEach(it => {
        // console.log("val[it]", val[it].lastIndex);
        listtext[it] = val[it][val[it].lastIndex];
      });
      this.list = listtext;
      console.log("单聊监控有信息", listtext);
      // 首次获取项目成功之后
      // 获取头像
      this.UpdateAvatar();
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
    // 头像监控
    IDtopurl(val, cal) {
      console.log("头像监控", val, cal);
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
    IDtopurl() {
      return this.$store.state.IDtopurl;
    },

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
    // 实时时间
    this.getCurrentTime();
    // 单聊消息列表重载

    var val = this.$store.state.NewArray;
    var pppppp = Object.keys(val).sort(function (a, b) {
      return val[b][val[b].lastIndex].create_time - val[a][val[a].lastIndex].create_time;
    });
    // console.log("lisssssssssssst", pppppp);
    var listtext = {};
    pppppp.forEach(it => {
      // console.log("val[it]", val[it].lastIndex);
      listtext[it] = val[it][val[it].lastIndex];
    });

    // for (let index = 0; index < pppppp.length; index++) {
    //   listtext[pppppp[index]] = val[pppppp[index]];
    // }
    // setTimeout(() => {
    this.list = listtext;
    // console.log("lisssssssssssst", this.list);
    // }, 5000);

    // 群聊消息列表重载
    this.GroupThatTotalList = this.$store.state.GroupThatTotalList;

    // var listdata = this.$store.state.NewArray;
    // delete listdata[window.JIM.current_user]
    // console.log('消息列表重载',listdata,window.JIM.current_user);
    this.UpdateAvatar();
    // setTimeout(() => {
    //   this.UpdateAvatar();
    // }, 5000);
  },
  methods: {
    // // 更新头像
    UpdateAvatar() {
      console.log("this.$store.state.GroupThatTotalList;", this.$store.state.IDtopurl);
      // return
      // let UpdateAvatardata = JSON.parse(localStorage.getItem("VuexDate_IDtopurl"));
      let UpdateAvatardata = this.$store.state.IDtopurl;
      // console.log("UpdateAvatardata", UpdateAvatardata, this.list);
      // this.list = this.list.map(item => {
      //   console.log('item',item);

      //   // item.topurl = UpdateAvatardata[item.from_id];
      // });

      for (var st in this.list) {
        //   // console.log("this.list[st]", this.list[st]);

        // this.list[st] = this.list[st].map(item => {
        // item.topurl = UpdateAvatardata[st];
        // });
        this.list[st].topurl = UpdateAvatardata[st];
      }

      //   // console.log("UpdateAvatardata[st]", this.list[st][0].topurl, UpdateAvatardata[st]);
      //   // this.list[st][0].topurl = UpdateAvatardata[st];
    },
    onRefresh() {
      console.log("this.list", this.list);
      // if (this.list.length!=0) {
      //     this.isLoading = false;
      //   return
      // }

      localStorage.setItem("initialization", "initialization-04");
      var that = this;
      axios({
        method: "post",
        data: { uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid },
        url: "http://tpkl.minpinyouxuan.com/index.php/api/v1/get_json"
      })
        .then(response => {
          that.isLoading = false;

          localStorage.setItem("VuexDate_NewArray", JSON.stringify(response.data.data.jmjosn));
          that.$store.commit("SaveData", { SaveDataitem: "NewArray", SaveDataValue: JSON.parse(localStorage.getItem("VuexDate_NewArray")) });
          window.xin();
        })
        .catch(error => {
          Toast("读取失败");
        });
    },
    // 实时时间
    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
      _this.mmgettime = mm + "-" + dd;
      _this.hhgettime = hh + ":" + mf;

      console.log(_this.gettime);
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-11 01:29:18
     * @Describe:
     */
    // 总消息未读数变更
    wwwwwwwwwww(msgid) {
      // console.log('this.$route.query.username',this.$route.query.username);

      // window.JIM.SingleChatMessageHasBeenReadBack(this.$route.query.username)

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
      padding: 10px 0 0 16px;

      // 头像
      .Avatarwai {
        display: inline-block;
        padding-top: 0.3rem;
        /deep/.Avatar {
          vertical-align: text-bottom;
          width: 2.75rem;
          height: 2.75rem;
          vertical-align: bottom;
          .van-image__error {
            text-align: center;
            font-size: 11px;
          }
          img {
            width: 2.75rem;
            height: 2.75rem;
            border-radius: 0.25rem;
          }
          display: inline-block;
        }
        .van-badge {
          position: absolute;
          left: 2rem;
          top: -1px;
          padding: 1px 5px;
        }
      }

      .waixian {
        width: calc(100% - 2.75rem - 10px);
        display: inline-block;
        border-bottom: 1px solid #f0f0f0;
        margin-left: 10px;
        padding-bottom: 0.6rem;
        // 名称
        .text {
          display: inline-block;
          width: calc(100% - 20%);
          h2 {
            font-size: 0.88rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 1.25rem;
            letter-spacing: 1px;
          }
          /deep/.child {
            width: 40px;
            height: 40px;
            background: #f2f3f5;
            border-radius: 4px;
          }
          .van-ellipsis {
            font-size: 0.75rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 1.06rem;
          }
        }
        .shijian {
          display: inline-block;
          width: 20%;
          text-align: right;
          vertical-align: top;
          span {
            font-size: 0.63rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 0.88rem;
            margin-right: 0.75rem;
          }
        }
      }
    }
    // .van-cell::after {
    //   // border: 0;
    // }
  }
}
</style>