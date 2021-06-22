<template>
  <div id="app">
    <div
      id="appMain"
      :class="[fun.getPhoneEnv() == 3 && !fun.isApp() && (!$route.meta.isPC || ($store.state.caseLibrary != null && $store.state.caseLibrary.set.pc_style == 0)) ? 'pcStyle' : '']"
      :style="{
        width: fun.getPhoneEnv() == 3 && !fun.isApp() && (!$route.meta.isPC || ($store.state.caseLibrary != null && $store.state.caseLibrary.set.pc_style == 0)) ? '375px' : '',
        margin: fun.getPhoneEnv() == 3 && !fun.isApp() && (!$route.meta.isPC || ($store.state.caseLibrary != null && $store.state.caseLibrary.set.pc_style == 0)) ? '0 auto' : ''
      }"
    >
      <keep-alive>
        <router-view v-if="!$route.meta.notKeepAlive && isRouterAlive" :key="$route.fullPath" @changeFoot="initFoot"></router-view>
      </keep-alive>
      <router-view v-if="$route.meta.notKeepAlive && isRouterAlive" :key="$route.fullPath"></router-view>
      <loading></loading>
    </div>

    <!-- 返回直播按钮 -->
    <div id="returnLiveBtn" v-if="isShowReturnLiveBtn" @click.stop="gotoLiveRoom">
      <i class="fa fa-angle-left"></i><span class="rlbtext">返回直播<i class="iconfont icon-adsystem_icon_cancle clone_btn_style" @click.stop="clearLiveBtn"></i></span>
    </div>
    <!-- 返回直播按钮end -->

    <!--旧装修的底部导航-->
    <c-foot v-if="!foot && $store.state.temp.item.menustyle && !$store.state.temp.item.menus.page_info"></c-foot>
    <!--旧装修的底部导航end-->

    <!--新装修的底部导航-->
    <U_foot
      v-if="!foot && ($store.state.temp.item.is_decorate === 1 || $store.state.temp.item.menus === '' || ($store.state.temp.item.menus && $store.state.temp.item.menus.page_info))"
      :id="id + '1'"
    ></U_foot>

    <!--新装修的底部导航end-->
    <qrCode v-if="fun.getPhoneEnv() == 3 && !fun.isApp() && (!$route.meta.isPC || ($store.state.caseLibrary != null && $store.state.caseLibrary.set.pc_style == 0))"></qrCode>
  </div>
</template>

<script>
import cFoot from "components/foot";
import U_foot from "components/new_diy/foot";
import loading from "components/loading";
import qrCode from "components/qrCode";
// import { mapState, mapMutations } from 'vuex';
import { Toast } from "vant";
//import BMap from 'BMap';
// console.log('vuexvuexvuexvuexvuexvuexvuexvuexvuexvuexvuexvuex',vuex.Store);

const language = require("../public/static/app/locales/language.json"); //加载本地数据文件
let isCreated = 0;
export default {
  data() {
    return {
      invite: "",
      //记录form请求微信form请求只发送一次
      selected: false,
      foot: true,
      zone: "",
      isLocation: false,
      isRouterAlive: true,

      is_Inviter: "",
      invite_mobile: "",

      id: "M" + new Date().getTime()
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  computed: {
    isShowReturnLiveBtn() {
      return this.$store.state._isShowReturnLiveBtn;
    }

    // // 2021年6月10日11:33:34
    // 监听是否有最新消息   来更新总的未读数
    // NewArray() {
    //   return this.$store.state.NewArray;
    // }
  },
  watch: {
    /**
     * @Author: 飞
     * @Date: 2021-06-16 13:40:57
     * @Describe: 群聊监控
     */

    //监测路由变化
    $route(to, from) {
      if (from.path === "/") {
        if (this.fun.getKey("t")) {
          this.reload();
        }
      }
      if (this.$yzt("route." + to.name)) {
        //语言包
        this.fun.setWXTitle(this.$yzt("route." + to.name));
      } else if (to.meta.title) {
        this.fun.setWXTitle(to.meta.title);
      }
      this.foot = to.meta.foot;

      // 浏览足迹  页面切换时更新new_page_comeIn
      window.new_page_comeIn = 1;
    }
    // 2021年6月10日11:33:34
    // NewArray(val, cal) {
    //   console.log("列表有消息   更新未读数");
    //   // this.list = val;
    // }
  },
  mounted() {
    // this.initBalanceLang();
    this.setPcStyle();
    this.fun.setWXTitle("");
    this.$store.commit("onload");
    window.homeFirst = 0;
    let that = this;
    this.tempInfo();

    /*区分关闭和刷新，关闭清理vid  start*/
    window.onload = function () {
      if (!window.sessionStorage["tempFlag"]) {
        window.localStorage.removeItem("uid");
        window.localStorage.removeItem("mid");

        window.localStorage.removeItem("scope");
        window.localStorage.removeItem("appid");
        window.localStorage.removeItem("mob_parent");
        window.localStorage.removeItem("mob_user");
        window.localStorage.removeItem("timetamp");
        window.localStorage.removeItem("sign");
        window.localStorage.removeItem("videoReload");
      } else {
        window.sessionStorage.removeItem("tempFlag");
      }
    };
    window.onunload = function () {
      window.sessionStorage["tempFlag"] = true;
      window.localStorage.removeItem("vid");
    };
    window.onbeforeunload = function () {
      window.sessionStorage["tempFlag"] = true;
      that.delCookie("memberlogin_status");
    };
    /*区分关闭和刷新，关闭清理vid end*/
  },
  created() {
    /**
     * @Author: 飞
     * @Date: 2021-06-17 16:18:15
     * @Describe: 初始化cookie
     */
    if (localStorage.getItem("initialization") != 'initialization-03') {

      console.log("初始化cookie");
      window.localStorage.removeItem("VuexDate_NewArray");
      window.localStorage.removeItem("VuexDate_FriendsList");
      window.localStorage.removeItem("VuexDate_SaveInformationList");
      window.localStorage.removeItem("VuexDate_IDtopurl");
      window.localStorage.removeItem("VuexDate_FansList");
      window.localStorage.removeItem("VuexDate_Unread");
      window.localStorage.removeItem("VuexDate_msg_idArry");
      window.localStorage.removeItem("VuexDate_Group_Chat");
      window.localStorage.removeItem("VuexDate_GroupchatIDNumber");
      window.localStorage.removeItem("VuexDate_GroupThatTotalList");

      localStorage.setItem("initialization", "initialization-03");

    }else{

    }


    // this.getParams();
    this.getLanguage();
    if (isCreated === 0) {
      window.localStorage.removeItem("vid");
      window.localStorage.removeItem("uid");
      window.localStorage.removeItem("mid");
      window.localStorage.removeItem("customizeHotelHead");
      // this.getParams();
      // this.initShare();
      // this.getInvite();
    }

    // // 2021年6月10日11:33:34
    // // 页面刷新  存取vuex 数据

    // 接收单聊消息

    window.latestNews = this.latestNews;
    // 接收好友列表
    window.SendAListOfFriends = this.SendAListOfFriends;
    // 接收离线消息
    window.OfflineMessage = this.OfflineMessage;
    // 接收粉丝列表
    window.FansList = this.FansList;
    // 总消息未读数
    window.Unread = this.Unread;
    // 接收群聊列表
    window.PassivePlusGroupNotificationEvent = this.PassivePlusGroupNotificationEvent;
    // 接收群聊消息
    window.GroupChatNewInformation = this.GroupChatNewInformation;

    /**
     * @Author: 飞
     * @Date: 2021-06-15 17:47:38
     * @Describe:接收群列表
     */
    window.GroupThatTotalList = this.GroupThatTotalList;
    window.addEventListener("beforeunload", e => {
      console.log("刷新刷刷新刷新刷新刷新刷新刷新刷新刷新刷新刷新刷新刷新刷新刷新刷新刷新");
      // localStorage.setItem("VuexDate", JSON.stringify(this.$store.state));
    });
    // 在页面加载时读取sessionStorage里的状态信息
    if (typeof localStorage.VuexDate == "string") {
      console.log("读取读取读取读取读取读取读取读取读取读取读取读取读取读取读取读取读取读取");
      // this.$store.replaceState(Object.assign({}, this.$store.state.NewArray, JSON.parse(localStorage.getItem("VuexDate_NewArray"))));

      // 会话
      this.$store.commit("SaveData", { SaveDataitem: "NewArray", SaveDataValue: JSON.parse(localStorage.getItem("VuexDate_NewArray")) });
      // 好友列表
      this.$store.commit("SaveData", { SaveDataitem: "FriendsList", SaveDataValue: JSON.parse(localStorage.getItem("VuexDate_FriendsList")) });
      // 存信息列表个数
      this.$store.commit("SaveData", { SaveDataitem: "SaveInformationList", SaveDataValue: JSON.parse(localStorage.getItem("VuexDate_SaveInformationList")) });
      // 我关注的ID头像
      this.$store.commit("SaveData", { SaveDataitem: "IDtopurl", SaveDataValue: JSON.parse(localStorage.getItem("VuexDate_IDtopurl")) });
      // 粉丝列表
      this.$store.commit("SaveData", { SaveDataitem: "FansList", SaveDataValue: JSON.parse(localStorage.getItem("VuexDate_FansList")) });
      // 总未读数
      this.$store.commit("SaveData", { SaveDataitem: "Unread", SaveDataValue: JSON.parse(localStorage.getItem("VuexDate_Unread")) });
      // 总未读库
      this.$store.commit("SaveData", { SaveDataitem: "msg_idArry", SaveDataValue: JSON.parse(localStorage.getItem("VuexDate_msg_idArry")) });
      // 群聊会话
      this.$store.commit("SaveData", { SaveDataitem: "Group_Chat", SaveDataValue: JSON.parse(localStorage.getItem("VuexDate_Group_Chat")) });
      // 群聊会话ID
      this.$store.commit("SaveData", { SaveDataitem: "GroupchatIDNumber", SaveDataValue: JSON.parse(localStorage.getItem("VuexDate_GroupchatIDNumber")) });
      // 群聊列表
      this.$store.commit("SaveData", { SaveDataitem: "GroupThatTotalList", SaveDataValue: JSON.parse(localStorage.getItem("VuexDate_GroupThatTotalList")) });

      // this.$store.replaceState(Object.assign({}, this.$store.state.FriendsList, JSON.parse(localStorage.getItem("VuexDate_FriendsList"))));
      // this.$store.replaceState(Object.assign({}, this.$store.state.SaveInformationList, JSON.parse(localStorage.getItem("VuexDate_SaveInformationList"))));
      // this.$store.replaceState(Object.assign({}, this.$store.state.IDtopurl, JSON.parse(localStorage.getItem("VuexDate_IDtopurl"))));
      // this.$store.replaceState(Object.assign({}, this.$store.state.FansList, JSON.parse(localStorage.getItem("VuexDate_FansList"))));
      // this.$store.replaceState(Object.assign({}, this.$store.state.Unread, JSON.parse(localStorage.getItem("VuexDate_Unread"))));
      // this.$store.replaceState(Object.assign({}, this.$store.state.msg_idArry, JSON.parse(localStorage.getItem("VuexDate_msg_idArry"))));
    }

    window.addEventListener("unload", e => {
      // 会话
      localStorage.setItem("VuexDate_NewArray", JSON.stringify(this.$store.state.NewArray));
      // 好友列表
      localStorage.setItem("VuexDate_FriendsList", JSON.stringify(this.$store.state.FriendsList));
      // 存信息列表个数
      localStorage.setItem("VuexDate_SaveInformationList", JSON.stringify(this.$store.state.SaveInformationList));
      // 我关注的ID头像
      localStorage.setItem("VuexDate_IDtopurl", JSON.stringify(this.$store.state.IDtopurl));
      // 粉丝列表
      localStorage.setItem("VuexDate_FansList", JSON.stringify(this.$store.state.FansList));
      // 总未读数
      localStorage.setItem("VuexDate_Unread", JSON.stringify(this.$store.state.Unread));
      // 总未读数
      localStorage.setItem("VuexDate_msg_idArry", JSON.stringify(this.$store.state.msg_idArry));
      // 群聊会话
      localStorage.setItem("VuexDate_Group_Chat", JSON.stringify(this.$store.state.Group_Chat));
      // 群聊会话ID
      localStorage.setItem("VuexDate_GroupchatIDNumber", JSON.stringify(this.$store.state.GroupchatIDNumber));
      // 群聊会话ID
      localStorage.setItem("VuexDate_GroupThatTotalList", JSON.stringify(this.$store.state.GroupThatTotalList));
    });
  },
  beforeUpdate() {
    if (isCreated === 1) {
      // this.getParams();
      this.initShare();
      // this.getInvite();
    }
  },

  updated() {
    isCreated = 1;
  },
  // activated() {
  //   // 调用极光登录
  //   window.JIM.getSignature();
  // },
  methods: {
    // // 2021年6月10日11:33:34
    // // // 有新的消息就计算未读数
    // Unread() {
    //   var IMlist = this.$store.state.SaveInformationList;

    //   this.$store.commit("Unread", Unread);
    // },
    /**
     * @Author: 飞
     * @Date: 2021-06-16 15:54:58
     * @Describe: 业务事件 被动加群通知
     */
    PassivePlusGroupNotificationEvent(msg) {
      console.log("APP被动加群通知", msg);
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-15 17:48:26
     * @Describe:接收群列表
     */

    GroupThatTotalList(msg) {
      console.log("接收群列表", msg);
      this.$store.commit("GroupThatTotalList", msg);
    },

    // 接收好友列表
    SendAListOfFriends(msg) {
      // console.log("接收到的好友", msg);
      var that = this;
      axios({ method: "post", data: { uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid }, url: "http://tpkl.minpinyouxuan.com/index.php/api/v1/followlist" })
        .then(response => {
          // that.appkData = response.data.data;
          console.log("我关注的", response.data.data);
          that.$store.commit("FriendsList", response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 接收粉丝列表
    FansList(msg) {
      var that = this;
      axios({
        method: "post",
        // data: { uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid },
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded"
        // },
        data: {
          uid: JSON.stringify(JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid)
          // uid: "12"
        },

        url: "https://tpkl.minpinyouxuan.com/index.php/api/v1/shop_fanc"
      })
        .then(response => {
          // that.appkData = response.data.data;
          console.log("接收粉丝列表", response.data.data);
          that.$store.commit("FansList", response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 离线消息
    OfflineMessage(msg) {
      console.log("离线消息", msg);

      // this.$store.commit("OfflineMessage", msg);
      for (let index = 0; index < msg.length; index++) {
        for (let p = 0; p < msg[index].msgs.length; p++) {
          console.log("离线信息", msg[index].msgs[p].content);

          // 单聊离线消息
          if (msg[index].msgs[p].content.target_type == "single") {
            // 离线信息id  内id相同  即可判断为离线信息
            if (msg[index].from_username == msg[index].msgs[p].content.from_id) {
              this.$store.commit("NewArray", { NewArray: msg[index].msgs[p].content });
            }
          }

          // 群聊离线消息
          if (msg[index].msgs[p].content.target_type == "group") {

            if (window.JGusername != msg[index].msgs[p].content.from_id) {
              this.$store.commit("GroupChatNewInformation", { NewArray: msg[index].msgs[p] });
            }

          }
        }
      }
    },

    // 最新单聊消息
    latestNews(msg) {
      this.$store.commit("NewArray", { NewArray: msg.content });
      // 最新消息时获取总的消息数
      // this.Unread();
    },
    // 最新群聊消息
    GroupChatNewInformation(msg) {
      this.$store.commit("GroupChatNewInformation", { NewArray: msg });
      // 最新消息时获取总的消息数
      // this.Unread();
    },

    getLanguage(url) {
      if (!url) {
        url = "/addons/yun_shop/static/locales/" + this.fun.getKeyByI() + "/language.json";
      }
      $http.fetch(url).then(
        response => {
          if (response.data.en) {
            $i18n.mergeLocaleMessage("en", response.data.en);
            $i18n.mergeLocaleMessage("zh", response.data.zh);
          } else {
            $i18n.mergeLocaleMessage("en", language.en);
          }
        },
        response => {
          $i18n.mergeLocaleMessage("en", language.en);
          // this.getLanguage('/addons/yun_shop/static/app/locales/language.json');
        }
      );
    },
    gotoLiveRoom() {
      this.$router.push(this.fun.getUrl("livePage"));
    },
    clearLiveBtn() {
      this.$store.commit("setReturnLiveBtn", false);
    },

    setPcStyle() {
      //pc端浏览器网页或者pc端微信网页 样式
      // if (this.fun.getPhoneEnv() == 1 && !this.fun.isApp() && !this.$route.meta.isPC) {
      // if (this.fun.getPhoneEnv() == 2 ) {
      // document.getElementById('appMain').style.width = '375px';
      // 2021年6月10日11:33:34
      // document.getElementById("appMain").style.height = "100%";
      document.getElementById("appMain").style.margin = "0 auto";
      // }
      console.log("router", this.$router);
    },

    initFoot(item) {
      this.foot = item;
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    },
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    //new
    getParams() {
      let _url = document.location.href;

      // 要用post  链接太长
      $http
        .post("home-page.get-params", { url: _url }, " ")
        .then(response => {
          if (response.result === 1) {
            this.initLanguage(response.data.lang);
            this.initBalanceLang(response.data.balance);
            // this.getInvite(response.data.page);
            if (window.homeFirst === 0) {
              this.tempInfo(response.data.home);
            }
            if (response.data.home.memberinfo) {
              window.localStorage.uid = response.data.home.memberinfo.uid;
            }
            localStorage.setItem("globalParameter", JSON.stringify(response.data.globalParameter));
          } else {
            console.log(response.msg);
          }
        })
        .catch(err => {
          console.error(err, "app");
        });
    },
    //初始化语言设置
    initLanguage(data) {
      // let that = this;
      // let json = { i: this.fun.getKeyByI(), type: this.fun.getTyep() };
      // $http.get("setting.get-lang-setting", json).then(response => {
      //   if (response.result == 1) {
      //     console.log("lang-setting", response.data);
      localStorage.setItem("mailLanguage", JSON.stringify(data));
      // let mailLanguage = localStorage.getItem("mailLanguage");
      //   }
      // });
    },
    initBalanceLang(data) {
      // let that = this;
      // let json = { i: this.fun.getKeyByI(), type: this.fun.getTyep() };
      // $http.get("setting.get-balance", json).then(response => {
      //   if (response.result == 1) {
      localStorage.setItem("balanceLang", JSON.stringify(data));
      this.balanceLang = localStorage.getItem("balanceLang");
      //   }
      // });
    },
    getLocation() {
      var that = this;
      var myLocation = this.$store.state.o2oLocation;

      if (!myLocation.point) {
        var mapObj = new AMap.Map("iCenter");
        mapObj.plugin("AMap.Geolocation", function () {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000, // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, // 显示定位按钮，默认：true
            buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          mapObj.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, "complete", onComplete); // 返回定位信息
          AMap.event.addListener(geolocation, "error", onError); // 返回定位出错信息
        });

        function onComplete(obj) {
          console.log("objjjjj", obj);
          // var res =
          //   '经纬度：' +
          //   obj.position +
          //   '\n精度范围：' +
          //   obj.accuracy +
          //   '米\n定位结果的来源：' +
          //   obj.location_type +
          //   '\n状态信息：' +
          //   obj.info +
          //   '\n地址：' +
          //   obj.formattedAddress +
          //   '\n地址信息：' +
          //   JSON.stringify(obj.addressComponent, null, 4);
          //alert(JSON.stringify(obj.addressComponent, null, 4));
          var position = obj.position.toString().split(",");
          that.point = {
            lat: position[1],
            lng: position[0]
          };
          that.address = obj.formattedAddress;
          that.title = obj.formattedAddress;
          that.city = !that.fun.isTextEmpty(obj.addressComponent.city) ? obj.addressComponent.city : obj.addressComponent.province;

          var pos = {
            address: obj.formattedAddress,
            city: that.city,
            title: obj.formattedAddress,
            point: that.point
          };
          console.log("test pos", pos);
          that.$store.commit("updateLocation", pos);
          that.$store.commit("setLocation", pos);
        }

        function onError(obj) {
          Toast("定位失败,请手动切换位置");
        }
      }
    },

    tempInfo(data) {
      window.homeFirst = 1;
      var that = this;
      //
      $http.get("home-page.index", {}, "加载中").then(
        response => {
          if (!data) return;
          if (response.result === 1) {
            window.localStorage.setItem("integral", data.mailInfo.credit1);
            if (!data.default) {
              for (let j of data.item.data) {
                j.temp = "show" + j.temp;
                if (j.temp == "showlocation" || j.temp == "showstore" || j.temp == "showbusiness") {
                  that.isLocation = true;
                }
              }
              // 设置的标题（装修）
              if (data.item.pageinfo) {
                data.item.janst = data.item.pageinfo.params.title;
              }
            } else {
              // 设置的标题（默认）
              data.item.janst = data.mailInfo.name;
            }

            if (that.isLocation) {
              if (window.location.href.indexOf("/home?") > 0) {
                that.getLocation();
              }
            }

            this.$store.commit("tempIndex", data);
            // window.localStorage.setItem('tempIndex', JSON.stringify(data))  存vuex里不存localStorage
          } else {
            console.log(response.msg);
          }
        },
        response => {}
      );
    },
    //是否开启邀请页面
    getInvite() {
      if (this.is_Inviter !== 1 || this.invite_mobile !== 1) {
        $http.get("member.member.isValidatePage").then(res => {
          if (res.result === 1) {
            this.is_Inviter = res.data.is_invite;
            this.invite_mobile = res.data.invite_mobile;
            if (res.data.is_bind_mobile !== 0) {
              this.bindMobile(res.data.is_bind_mobile);
            } else {
              if (res.data.is_login === 1) {
                //登录
                if (res.data.is_invite !== 1) {
                  //没有填写过邀请人
                  if (res.data.invite_page === 1) {
                    //开启了邀请页面
                    if (this.$store.state.is_Inviter) {
                      //不是第一次进入商城  点击了确认邀请人
                    } else {
                      if (window.location.href.indexOf("input_visit") > 0 || window.location.href.indexOf("member/editmobile") > 0) {
                        //是在这两个页面do nothing
                      } else if (window.location.href.indexOf("input_visit") < 0 || window.location.href.indexOf("member/editmobile") < 0) {
                        this.$router.push(this.fun.getUrl("Inviter"));
                      }
                    }
                  }
                } else {
                  //已经填写过邀请人
                  if (res.data.invite_mobile !== 1 && res.data.invite_page === 1) {
                    //没有绑定手机而且开启了邀请页面
                    if (window.location.href.indexOf("input_visit") > 0 || window.location.href.indexOf("member/editmobile") > 0) {
                      console.log("nothing");
                    } else if (window.location.href.indexOf("input_visit") < 0 || window.location.href.indexOf("member/editmobile") < 0) {
                      this.$router.push(this.fun.getUrl("Inviter"));
                    }
                  }
                }
              }
            }
          }
        });
      }
    },

    //查看用户是否需要绑定手机号
    // getIsBingMobile() {
    //   var that = this;
    //   let json = {};
    //   $http.get("home-page.bindMobile", json).then(
    //     function(response) {
    //       if (response.result == 1) {
    //         that.bindMobile(response.data.is_bind_mobile);
    //       }
    //     },
    //     function(response) {
    //       // error callback
    //     }
    //   );
    // },

    //查看用户是否需要绑定手机号
    bindMobile(e) {
      if (e == 1) {
        //跳转绑定手机页面
        //判断是否是app分享扫码进入商城
        if (window.location.href.indexOf("/member/scaneditmobile") >= 0) {
          window.localStorage.setItem("is_force_mobile", 999);
          this.$router.push(this.fun.getUrl("editmobile", { num: "", myparent: this }));
        } else {
          this.$router.push(this.fun.getUrl("editmobile", { num: "", myparent: this }));
        }
      } else if (e == 2) {
        if (window.location.href.indexOf("/member?") > -1 || this.$route.name == "member") {
          this.$router.push(this.fun.getUrl("editmobile", { num: "", myparent: this }));
        } else {
          return;
        }
      } else if (e == 3) {
        if (window.location.href.indexOf("/goods/") > -1 || this.$route.name == "goods") {
          this.$router.push(this.fun.getUrl("editmobile", { num: "", myparent: this }));
        } else {
          return;
        }
      } else if (window.location.href.indexOf("/member/extension?") > -1 || e == 4) {
        if (this.$route.name == "extension") {
          this.$router.push(this.fun.getUrl("editmobile", { num: "", myparent: this }));
        } else {
          return;
        }
      } else {
        return;
      }
    },

    //获取商城信息
    // getMailInfo() {
    //   let that = this;
    //   let json = { i: this.fun.getKeyByI(), type: this.fun.getTyep() };
    //   $http.get("setting.get", json).then(response => {
    //     if (response.result == 1) {
    //       console.log("统计代码：", response.diycode);
    //       this.$store.commit("setMailInfo", response.data);
    //     }
    //   });
    // },

    //获取用户信息
    // getMemberInfo() {
    //   var that = this;
    //   let json = { i: this.fun.getKeyByI(), type: this.fun.getTyep() };
    //   $http.get("member.member.getUserInfo", json, "").then(
    //     function(response) {
    //       if (response.result == 1) {
    //         that.$store.commit("savemodel", response.data);
    //       }
    //     },
    //     function(response) {
    //       // error callback
    //     }
    //   );
    // },

    //初始化分享设置
    initShare() {
      //不是微信端 不访问
      // let token = this.fun.getToken()   不知道有什么用  先注释
      // if (token) {
      //   this.wxLocationGet()
      //   return
      // }

      if (window.localStorage.type == 5) {
        return;
      }

      //以下是需要单独设置分享的页面链接
      let list = [
        "/picture_album",
        "/goods/",
        "/groups/",
        "/newDiy",
        "/diy",
        "/homeseller",
        "/o2o/store_v2",
        "/o2o/store",
        "/o2o/home/homeseller/",
        "/share_page_detail",
        "/activity_detail",
        "/business_activity/business_activity",
        "/voice_good/",
        "/activity/task/list/",
        "/supplier_shop/",
        "/o2o/store",
        "/o2o/storeApply",
        "/grabGroupHome",
        "/grabGroup",
        "/community_buying/buying_personal/",
        "/community_solitaire/",
        "/group_list",
        "#/home?"
      ];

      for (let i = 0; i < list.length; i++) {
        // 编程式
        if (window.location.href.indexOf(list[i]) > -1) {
          return;
        }
      }

      let that = this;
      let _url = document.location.href;
      let json = {
        url: _url
      };
      $http.post("member.member.wxJsSdkConfig", json).then(
        function (response) {
          if (response.result === 1) {
            if (response.data.config) {
              that.share(response.data);
            }
          }
        },
        function (response) {
          console.log(response);
        }
      );
    },

    wxLocationGet() {
      let json = {
        longitude: this.fun.getLat(),
        latitude: this.fun.getLng()
      };

      //获取城市信息
      $http
        .get("geocoding.get-address-component", json)
        .then(response => {
          console.log("TAG:", json);
          if (response.result == 1) {
            //通过获取的district获取zoneId
            //this.getZoneId(response.data.district);
            //window.localStorage.setItem("nowZone", response.data.district);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //组装分享设置
    share(data) {
      let that = this;
      data.config.openTagList = ["wx-open-launch-weapp"];
      console.log("打印home组件app分享", data.config);
      wx.config(data.config);
      wx.ready(function () {
        let _title = "";
        //let _link = location.protocol + '//' + location.host + location.pathname + '?i=' + that.fun.getKeyByI() + "&type=" + that.fun.getTyep() + "&mid=" + data.info.uid;
        //let _link = document.location.href + "&mid=" + data.info.uid;

        let _link = document.location.href;
        _link = that.fun.isMid(_link, data.info.uid);
        // console.log(_link,"link");

        // 分享优先级： 单页设置（例如商品，拓客活动）> 店铺装修页面设置（仅限装修页面或者设置为首页的装修页面）data.share.title > 全局设置data.shop.share.title > 商城名称data.shop.shop.name
        // 全局标题
        _title = data.shop.share && that.fun.isTextEmpty(data.shop.share.title) ? data.shop.shop.name : data.shop.share.title;
        let _imgUrl = that.fun.isTextEmpty(data.shop.share.icon) ? data.shop.icon : data.shop.share.icon;
        let _desc = that.fun.isTextEmpty(data.shop.share.desc) ? data.shop.shop.name : data.shop.share.desc;

        // _title = _title.trim();
        // _imgUrl = _imgUrl.trim();
        // _desc = _desc.trim();
        console.log("qiang," + _title + "," + _imgUrl + "," + _desc);

        wx.showOptionMenu();
        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          success: function () {
            Toast("分享成功");
          },
          cancel: function () {
            Toast("取消分享");
          }
        });

        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          type: "link", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            Toast("分享成功");
          },
          cancel: function () {
            Toast("取消分享");
          }
        });
      });
    }
  },
  components: { cFoot, U_foot, loading, qrCode }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "assets/iconfont/iconfont.css";
@import "assets/css/font-awesome.min.css";
@import "assets/css/app.scss";
@import "layout";

// @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
//   #app {
//     box-sizing: border-box;
//     padding-bottom: 34px;
//     &:after {
//       content: "";
//       z-index: 9998;
//       position: fixed;
//       left: 0;
//       bottom: 0;
//       width: 100%;
//       height: 34px;
//       background: #fff;
//     }
//   }
// }
// ----- #appMain.pcStyle 用于pc端样式适配

#appMain {
  height: calc(100% - 50px);
  // height: 100%  ;
}
#appMain.pcStyle {
  .mint-header {
    width: 375px;
    margin: 0 auto;
  }

  .mint-popup-4,
  .mint-navbar {
    width: 375px !important;
  }

  .mint-navbar {
    margin: 0 auto;
  }

  .yd-popup {
    width: 375px !important;
    right: 50%;
    margin-right: -187.5px;
  }

  .van-popup {
    width: 375px !important;
    right: 50%;
    margin-right: -187.5px;
  }

  .yd-popup-show,
  .van-popup,
  .yd-navbar,
  .yd-actionsheet {
    width: 375px !important;
  }

  .van-popup--bottom {
    left: 50%;
    transform: translateX(-50%);
  }

  .yd-navbar,
  .yd-actionsheet {
    left: auto;
  }

  .set-pc-styleLeft {
    width: 375px !important;
    left: 50% !important;
    margin-left: -187.5px;
  }

  .set-pc-style {
    width: 375px !important;
    left: auto !important;
  }
}

.g-fix-ios-prevent-scroll {
  position: static;
}

.el-cascader-menus .el-cascader-menu {
  // 供应商选择分类
  min-width: 115px;

  .el-cascader-menu__item {
    width: 115px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.mint-indicator-wrapper {
  z-index: 2000;
}

#returnLiveBtn {
  position: fixed;
  bottom: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 9;
  width: 4.5rem;
  height: 3rem;
  line-height: 3rem;
  background: #04be02;
  color: #fff;
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
  z-index: 999;

  i {
    font-size: 1rem;
  }

  .rlbtext {
    width: 2rem;
    line-height: 1rem;
    display: inline-block;
    margin: 0 0.5rem 0 0.25rem;
    font-size: 0.875rem;
    position: relative;

    .clone_btn_style {
      font-size: 1rem;
      padding: 0.5rem;
      color: #333;
      position: absolute;
      top: -1rem;
      right: -2.875rem;
    }
  }
}

#aggregate {
  .add_photo {
    overflow: hidden;

    input {
      height: 5rem !important;
      margin: 0;
    }
  }
}

// loading大小
img[lazy="loading"] {
  width: 40px !important;
  height: 40px !important;
  display: flex;
  justify-content: center;
  margin: 20% auto;
}
</style>
