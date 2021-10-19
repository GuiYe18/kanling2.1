<!--
 * @Author: 飞
 * @Date: 2021-05-17 15:24:57
 * @LastEditTime: 2021-08-28 22:23:55
 * @FilePath: \you-shop1\src\views\news\SolitudeChat.vue
 * @Describe: 
-->

<template>
  <div id="content" ref="box">
    <!-- 导航 -->
    <van-nav-bar :title="nickname" left-arrow fixed>
      <template #left>
        <!-- <i class="el-icon-arrow-left" @click="onClickLeft"></i> -->
        <van-icon name="arrow-left" @click="onClickLeft" />
      </template>
      <!-- <template #right>
        <i class="el-icon-more" @click="onClickRight"></i>
      </template> -->
    </van-nav-bar>

    <!-- 文本聊天内容区 -->
    <div id="text_content">
      <ul class="AAA">
        <!-- 对面的对话 -->

        <!-- <li>
          <div class="shell_left">
            <div class="imgDiv_Left">
              <img src="./img/位图备份 6@2x.png" alt="" />
            </div>
            <div class="TextArea_Left">
              <h2>{{ this.$route.query.username }}</h2>
              <div class="Dialogue_Left">{{ this.$route.query.mag }}</div>
            </div>
          </div>
        </li> -->

        <!-- 单聊对话 -->
        <li v-for="(item, i) in list" :key="i">
          <div class="shell_left" v-show="item.informationTypesOf == 'L'">
            <van-image class="Avatar imgDiv_Left" :src="Avatar">
              <template v-slot:error>加载失败</template>
            </van-image>
            <!-- <div class="imgDiv_Left">
              <img :src="item.topurl" alt="" />
            </div> -->

            <div class="TextArea_Left">
              <h2>{{ item.from_name }}</h2>
              <div class="Dialogue_Left">{{ item.msg_body.text }}</div>
            </div>
          </div>

          <div class="shell" v-show="item.informationTypesOf == 'R'">
            <div class="TextArea">
              <h2>{{ IMname }}</h2>
              <div class="Dialogue">{{ item.msg_body.text }}</div>
            </div>

            <!-- <div class="imgDiv">
              <img :src="photo_wx" alt="" />
            </div> -->
            <van-image class="Avatar imgDiv" :src="photo_wx">
              <template v-slot:error>加载失败</template>
            </van-image>
          </div>
        </li>
      </ul>
    </div>
    <!-- 输入框 -->
    <div class="InputBox">
      <van-field v-model="value" rows="1" type="textarea" placeholder="请输入内容..." class="leftsend" :autosize="{ maxHeight: 100, minHeight: 30 }" @focus="onfocus" />
      <div class="rightsend">
        <!-- <div class="AddTo" @click="AddTo"><van-icon name="add-o" size="30" /></div> -->
        <div @click="onSearch" :class="value === '' ? 'send' : 'sendcolor send'">发送</div>
      </div>
    </div>

    <!-- <van-field v-model="message" rows="1" autosize type="textarea" placeholder="请输入内容..." /> -->
  </div>
</template>

<script>
import { Toast } from "vant";
import API from "./API.js";
// import { getNewNews } from "../../IM/IMAPI";

export default {
  data() {
    return {
      // token: getNewNews,
      list: [],
      nickname: "",
      defaultTit: "", //设置默认标题为空
      itemData: "", //父组件传过来的值
      value: "", //输入框的值
      message: "",
      MyUsername: "Jion",
      username: "", //用户username
      // 自己头像
      photo_wx: "",
      // 自己IM ID
      IMID: "",
      IMname: "",
      Timestamp: "", //时间戳
      mmgettime: "",
      hhgettime: "",
      Avatar:'',//头像
    };
  },
  mounted() {
    let box = this.$refs.box;
    box.addEventListener("scroll", this.handleScroll, true);
    // 有新的消息
    // window.getaddNewinformation = this.getaddNewinformation;
  },
  created() {},
  activated() {
    // 获取当前时间
    this.getCurrentTime();
    //   把默认的title改变
    document.title = this.defaultTit;
    // this.itemData = this.$route.query.name;
    this.username = this.$route.query.username;
    this.nickname = this.$route.query.nickname;
    // window.GetTotalData = this.GetTotalData()
    // 获取总数据
    // this.GetTotalData();
    // // 获取消息
    // this.getaddNewinformation()
    // window.JIM.GetAListOfSessions();   username
    // //
    // // // 获取单个聊天记录
    // this.GetChatRecords();

    // 第一次进入 获取单聊内容
    this.theFirstTime();

    // 进入滑到最底部
    this.scrollToBottom();
    // 获取用户im信息
    this.GetIMInformation();
  },
  //每次页面渲染完之后滚动条在最底部
  updated: function () {
    console.log("gengxin", this.$route);
    this.list = this.$store.state.NewArray[this.username];
    if (this.$route.name == "SolitudeChat") {
      this.scrollToBottom();
    }
  },
  beforeDestroy() {
    console.log("聊天销毁前");
  },

  destroyed() {
    console.log("聊天销毁后");
  },

  //利用计算属性
  computed: {
    NewArray() {
      return this.$store.state.NewArray;
    }

  },
  watch: {
    NewArray(val, cal) {
      console.log("聊天消息有变化", val, this.username);
      // this.list = val[this.username];
      this.list = this.$store.state.NewArray[this.username];
    }
  },

  methods: {
    // 聊天界面更多功能
    AddTo() {
      Toast("功能正在开发");
    },
    // 点击输入框  输入框覆盖文本  获得焦点时触发
    onfocus() {
      console.log("gengxin", this.$route);
      if (this.$route.name == "SolitudeChat") {
        // setTimeout(() => {
        //   this.scrollToBottom();
        // },500);
        for (let index = 0; index < 10; index++) {
          // this.scrollToBottom();
          setTimeout(() => {
            this.scrollToBottom();
            console.log("index", index);
          }, index * 150);
        }
      }
    },
// 获取单聊内容
    theFirstTime() {
      this.list = this.$store.state.NewArray[this.username];
      this.Avatar = this.$store.state.IDtopurl[this.username];
    },
    // 获取用户自己IM信息
    GetIMInformation() {
      setTimeout(() => {
        console.log("获取用户IM信息", window.JIM);
        this.IMID = window.JIM.current_user;
        this.photo_wx = window.JIM.photo_wx;
        this.IMname = window.JIM.useData.nickname;
      }, 100);
    },
    // 划到最底部
    scrollToBottom: function () {
      if (this.$route.name == "SolitudeChat") {
        /**
         * @Author: 飞
         * @Date: 2021-06-22 15:21:12
         * @Describe:移动端  点击输入框后   弹起键盘 输入框在输入法上面
         * url:https://www.cnblogs.com/wx1993/p/6059668.html
         */
        document.querySelector("#text_content").scrollIntoView(false);
        document.querySelector(".InputBox").scrollIntoView(true);
      }
    },
    //获取当前时间
    getCurrentTime() {
      //获取当前时间并打印
      console.log("当前时间戳", new Date().getTime());
      this.Timestamp = new Date().getTime();

      var _this = this;
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
      _this.mmgettime = mm + "-" + dd;
      _this.hhgettime = hh + ":" + mf;

      console.log(_this.gettime);
    },

    // 导航返回
    onClickLeft() {
      console.log("返回");
      this.$router.go(-1);
    },
    // 聊天界面右上角设置
    onClickRight() {
      console.log("按钮");
    },
    //点击回车发送函数
    onSearch() {
      this.getCurrentTime();
      // window.JIM.SendGroupChatText()
      // return
      // if (this.value == "") {
      //   return;
      // }
      // var obj = {};
      // obj.mag = this.value;
      // // 对  聊天界面 发送信息
      // 发文本请求
      // 判断用户id是否为空
      if (this.username == "") {
        Toast("该用户最近未登录过看领平台");
        return;
      }

      window.JIM.SendASingleChatMessage(this.username, this.value.replace(/^\s*|\s*$/g, ""));

      // this.list.push(obj);
      var sendMessage = {
        create_time: new Date().getTime(),
        mmgettime: this.mmgettime,
        hhgettime: this.hhgettime, //创建时间
        from_id: this.username,
        from_platform: "api",
        from_type: "user",
        from_name: this.nickname,
        msg_body: {
          extras: [],
          text: this.value.replace(/^\s*|\s*$/g, "")
        },

        msg_level: 0,
        msg_type: "text",
        target_id: this.IMID,
        target_type: "single", //
        version: 1
      };
      // 主动发消息
      this.$store.commit("ActiveMessage", sendMessage);

      if (this.value != "") {
        this.value = "";
      }

      console.log("this", this);

      // setInterval(() => {

      //   this.$store.commit('saveCurrDbSource',this.$store.state.NumberOfMessages+1)
      // }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
#content {
  min-height: 100%;
  background-color: #fff;
  position: relative;
  // 导航
  .van-nav-bar {
    .van-icon {
      color: #333;
    }
  }
  //聊天区
  #text_content {
    width: 100%;
    padding: 50px 0;
    li {
      padding: 6px 15px;
      // 右侧
      .shell {
        text-align: right;
        .imgDiv,
        .TextArea {
          display: inline-block;
        }
        /deep/.imgDiv {
          text-align: right;
          margin-left: 8px;
          vertical-align: top;
          width: 42px;
          height: 42px;

          img {
            width: 42px;
            height: 42px;
            border-radius: 0.25rem;
          }
        }
        .TextArea {
          text-align: right;
          vertical-align: super;
          max-width: 251px;
          .Dialogue {
            text-align: left;
            display: inline-block;
            font-size: 13px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: #fff;
            line-height: 18px;
            word-break: break-all; //英文换行
            background-color: #0579fc;
            padding: 10px 8px 6px 8px;
            border-radius: 10px;
            border-top-right-radius: 0;
          }
        }
      }
      // 左侧
      .shell_left {
        text-align: left;
        .TextArea_Left,
        .imgDiv_Left {
          display: inline-block;
        }
        /deep/.imgDiv_Left {
          margin-right: 8px;
          text-align: right;
          vertical-align: top;
          img {
            width: 42px;
            height: 42px;
            border-radius: 0.25rem;
          }
        }
        .TextArea_Left {
          text-align: left;
          vertical-align: super;
          max-width: 251px;
          .Dialogue_Left {
          display: inline-block;
            text-align: left;
            font-size: 13px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: #666666;
            line-height: 18px;
            word-break: break-all; //英文换行
            background-color: #f5f5f5;
            padding: 10px 8px 6px 8px;
            border-radius: 10px;
            border-top-left-radius: 0;
          }
        }
      }
    }
  }
  // 输入区
  /deep/.InputBox {
    // position: absolute;
    // // bottom: -50px;
    // width: 100%;
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: #fff;

    .leftsend {
      width: 70%;
      vertical-align: middle;
      display: inline-block;
      padding: 10px 5px;
      .van-field__control {
        border-radius: 20px;
        font-size: 14px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        background: #e4e4e4;
        padding: 4px 8px;
      }
    }
    .rightsend {
      width: 30%;
      display: inline-block;
      .AddTo {
        width: 30px;
        height: 30px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 11px;
      }
      .send {
        display: inline-block;
        // width: 60px;
        width: 100px;

        line-height: 36px;
        background: #e4e4e4;
        border-radius: 20px;
        font-size: 14px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #999999;
      }
      .sendcolor {
        background: #0579fc;
        color: #fff;
      }
    }
    .van-search__content {
      width: 200px;
      height: 36px;
      border-radius: 18px;
    }
    .tool {
      width: 90px;
    }
  }
}
</style>