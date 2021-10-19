<!--
 * @Author: 飞
 * @Date: 2021-05-17 15:24:57
 * @LastEditTime: 2021-08-10 14:52:24
 * @FilePath: \you-shop1\src\views\news\GroupChat.vue
 * @Describe: 
-->

<template>
  <div id="content" ref="box">
    <!-- 导航 -->
    <van-nav-bar :title="nickname + '(' + Object.keys(GroupMemberNameAvatar).length + ')'" left-arrow fixed>
      <template #left>
        <!-- <i class="el-icon-arrow-left" @click="onClickLeft"></i> -->
        <van-icon name="arrow-left" @click="onClickLeft" />
      </template>
      <template #right>
        <router-link :to="fun.getUrl('GroupDetails', {}, { username: $route.query.username, nickname: $route.query.nickname })">
          <!-- <i class="el-icon-more" @click="onClickRight"></i> -->
          <van-icon name="ellipsis" @click="onClickRight" />
        </router-link>
      </template>
    </van-nav-bar>

    <!-- 文本聊天内容区 -->
    <div id="text_content">
      <ul class="AAA">
        <!-- 群聊对话列表 -->
        <li v-for="(item, i) in list" :key="i">
          <div class="shell_left" v-show="item.informationTypesOf == 'L'">
            <div class="imgDiv_Left">
              <img :src="item.photo_wx" alt="" />
            </div>
            <div class="TextArea_Left">
              <h2>{{ item.nickname_name }}</h2>
              <div class="Dialogue_Left">{{ item.msg_body.text }}</div>
            </div>
          </div>

          <div class="shell" v-show="item.informationTypesOf == 'R'">
            <div class="TextArea">
              <h2>{{ IMname }}</h2>
              <div class="Dialogue">{{ item.msg_body.text }}</div>
            </div>
            <div class="imgDiv">
              <img :src="photo_wx" alt="" />
            </div>
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
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      list: [], //群聊对话列表
      nickname: "", //群名称
      defaultTit: "", //设置默认标题为空
      value: "", //输入框的值

      group_gid: "", //群名称gid

      // 自己头像
      photo_wx: "",
      // 自己IM ID
      IMID: "",

      IMname: "",
      GroupMemberNameAvatar: {}, //群成员姓名头像
      mmgettime:'',//天数
      hhgettime:'',//小时
    };
  },
  mounted() {
    let box = this.$refs.box;
    box.addEventListener("scroll", this.handleScroll, true);
  },
  created() {},
  activated() {
    /**
     * @Author: 飞
     * @Date: 2021-06-16 17:25:38
     * @Describe: 获取最新时间
     */
    // this.timeFormate(new Date());
    /**
     * @Author: 飞
     * @Date: 2021-06-16 17:25:02
     * @Describe: 把默认的title改变
     */
    document.title = this.defaultTit;
    // this.itemData = this.$route.query.name;
    /**
     * @Author: 飞
     * @Date: 2021-06-16 17:25:24
     * @Describe: 群名称gid
     */
    this.group_gid = this.$route.query.username;
    /**
     * @Author: 飞
     * @Date: 2021-06-16 17:25:18
     * @Describe: 群名称
     */
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

    /**
     * @Author: 飞
     * @Date: 2021-06-16 17:22:23
     * @Describe: 第一次进入获取群聊天数据
     */
    this.GetGroupChatData();

    // 进入滑到最底部
    this.scrollToBottom();
    /**
     * @Author: 飞
     * @Date: 2021-06-16 17:23:11
     * @Describe: 获取自己im信息
     */
    this.GetIMInformation();
    /**
     * @Author: 飞
     * @Date: 2021-06-18 01:00:22
     * @Describe: 获取本群成员的头像
     */
    this.GetGroupMemberAvatar();
  },
  //每次页面渲染完之后滚动条在最底部
  updated: function () {
    /**
     * @Author: 飞
     * @Date: 2021-06-16 17:31:27
     * @Describe: 界面更新
     */
    console.log("gengxin", this.$route);
    this.list = this.$store.state.Group_Chat[this.group_gid];
    if (this.$route.name == "GroupChat") {
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
    Group_Chat() {
      return this.$store.state.Group_Chat;
    }
  },

  watch: {
    Group_Chat(val, cal) {
      console.log("群聊天消息有变化", val, this.group_gid);
      this.list = this.$store.state.Group_Chat[this.group_gid];
      /**
       * @Author: 飞
       * @Date: 2021-06-18 01:07:03
       * @Describe:有新信息获取头像姓名
       */
      this.SessionAddAvatarName();
    }
  },

  methods: {
    // 实时时间
    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
      _this.mmgettime = mm + "-" + dd
      _this.hhgettime = hh + ":" + mf;

      console.log(_this.gettime);
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-18 15:54:03
     * @Describe: 聊天界面更多功能
     */
    AddTo() {
      Toast("功能正在开发");
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-18 00:57:51
     * @Describe: 会话添加 头像 姓名
     */
    SessionAddAvatarName() {
      var that = this;
      this.list.map(function (item, index, key) {
        item.photo_wx = that.GroupMemberNameAvatar[item.from_id].photo_wx;
        item.nickname_name = that.GroupMemberNameAvatar[item.from_id].nickname;
      });
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-18 00:54:10
     * @Describe: 获取群成员头像
     */
    GetGroupMemberAvatar() {
      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/api/v1/getgroupmem",
        data: {
          gid: this.group_gid
        }
      })
        .then(response => {
          if (response.data.result == 1) {
            that.GroupMemberNameAvatar = response.data.data;
            that.SessionAddAvatarName();
            // 重置  开始 秒表
          }
          if (response.data.result == 0) {
            Toast("获取群成员头像失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-16 17:24:07
     * @Describe: 点击输入框  输入框覆盖文本  获得焦点时触发
     */
    onfocus() {
      /**
       * @Author: 飞
       * @Date: 2021-06-17 16:56:41
       * @Describe:发送信息输入框上移
       */
      console.log("gengxin", this.$route);
      if (this.$route.name == "GroupChat") {
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

    /**
     * @Author: 飞
     * @Date: 2021-06-16 17:22:23
     * @Describe: 第一次进入获取群聊天数据
     */
    GetGroupChatData() {
      this.list = this.$store.state.Group_Chat[this.group_gid];
    },

    /**
     * @Author: 飞
     * @Date: 2021-06-16 17:23:36
     * @Describe: 获取群IM信息
     */
    //
    GetIMInformation() {
      setTimeout(() => {
        this.IMID = window.JIM.current_user;
        this.photo_wx = window.JIM.photo_wx;
        this.IMname = window.JIM.useData.nickname;
      }, 100);
    },

    // 划到最底部
    scrollToBottom: function () {
      if (this.$route.name == "GroupChat") {
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
      // if (this.value == "") {
      //   return;
      // }
      // var obj = {};
      // obj.mag = this.value;
      // // 对  聊天界面 发送信息

      /**
       * @Author: 飞
       * @Date: 2021-06-16 17:57:22
       * @Describe: 发群文本信息请求(极光发送)
       */
      window.JIM.SendGroupChatText(this.group_gid, this.value);
      console.log("获取时间",new Date());

      // this.getCurrentTime()
      return
      
      // this.list.push(obj);
      var sendMessage = {
        create_time:'',
        from_id: this.IMID,
        from_name: this.nickname,
        msg_body: {
          extras: [],
          text: this.value
        },
        msg_type: "text",
        target_id: this.group_gid,
        target_type: "single" //single单    group群
      };
      // // 主动发消息
      this.$store.commit("GroupChatMessage", sendMessage);

      if (this.value != "") {
        this.value = "";
      }

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
  /**
   * @Author: 飞
   * @Date: 2021-06-22 16:21:45
   * @Describe: 导航
   */
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
        .imgDiv {
          text-align: right;
          margin-left: 8px;
          vertical-align: top;
          img {
            width: 42px;
            height: 42px;
            border-radius: 50%;
          }
        }
        .TextArea {
          text-align: right;
          vertical-align: super;
          max-width: 251px;
          .Dialogue {
            text-align: left;
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
        .imgDiv_Left {
          margin-right: 8px;
          text-align: right;
          vertical-align: top;
          img {
            width: 42px;
            height: 42px;
            border-radius: 50%;
          }
        }
        .TextArea_Left {
          text-align: left;
          vertical-align: super;
          max-width: 251px;
          .Dialogue_Left {
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
  // 聊天区
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