<template>
  <!-- 牛人 -->
  <div class="content">
    <!-- 红包转圈 -->
    <div v-if="isReceive" class="red">
      <!-- <div class="red"> -->
      <div class="redDetail">
        <div v-if="!showRed">
          <van-circle stroke-width="60" color="#f63a39" class="progress" v-model="rate" :rate="val" size="4.75rem" layer-color="#ebedf0" />
        </div>
      </div>
    </div>
    <!-- 红包 -->
    <div class="redSuccess" v-if="showRed">
      <!-- <div class="redSuccess"> -->
      <img :src="redGif" alt="" />
      <div @click="closeRed" class="closeIcon">
        <van-icon name="close" size="1.13rem" color="#fff" />
      </div>
      <div class="money" v-show="delay">{{ money }}</div>
      <div class="name">
        <img class="imgss" src="./img/bj.png" alt="" />
        <span>{{ qsn_name }}送你一个红包</span>
      </div>
    </div>
    <!-- 遮罩 -->
    <div class="mask" v-if="showRed"></div>
    <!-- 头部轮播 -->
    <div class="swiper" style="position: relative">
      <van-swipe class="my-swipe" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in content.topurl" :key="index">
          <img :src="item" alt="" />
        </van-swipe-item>
      </van-swipe>
      <div id="back" @click="Retreat">
        <van-icon name="arrow-left" />
      </div>
    </div>

    <!-- 头像 -->
    <div class="logo">
      <div>
        <img :src="content.logourl" alt="" />
      </div>
      <div class="industry" v-if="industry_data[0] !== ''">
        <li v-for="(labelItem, labelIndex) in industry_data" :key="labelIndex">{{ labelItem }}{{ industry_data.length }}</li>
      </div>
    </div>

    <div class="contentInfo">
      <div class="title">
        <h3>
          <strong
            >{{ content.qsn_name }}
            <!-- <div><span></span></div> -->
          </strong>
        </h3>
      </div>
      <!-- 标题 -->
      <div class="classification">
        <div>
          <strong>{{ content.qsntitle }}</strong>
        </div>
      </div>
    </div>
    <!-- 标签  -->
    <div class="lableList" v-if="navigation_Show">
      <ul>
        <li @click="cheangeLabel(index)" v-for="(item, index) in lableList" v-show="item.isShow" :key="index" :class="{ cur: labelIndex === index }">
          <span>{{ item.name }}</span>
          <div></div>
        </li>
      </ul>
    </div>
    <!-- 企业信息 内容 -->
    <div style="padding: 0 0.9375rem">
      <div class="detail" v-show="labelIndex === 0">
        <!-- 牛人介绍 -->
        <div class="detailTitle">牛人介绍</div>
        <!-- 最多显示两行 -->
        <div class="van-multi-ellipsis--l2 IntroductionInformation" v-if="IntroductionInformation_show">
          {{ content.qsntext }}
        </div>
        <div class="IntroductionInformation" v-if="!IntroductionInformation_show">
          {{ content.qsntext }}
        </div>
        <!-- <i @click="Expand" class="el-icon-d-arrow-right"></i> -->
        <img @click="Expand" src="./img/Expand.gif" alt="" :class="IntroductionInformation_show == true ? 'img' : 'img_S'" />
        <!-- 联系方式 -->
        <div class="detailTitle">联系方式</div>
        <!-- 地址 -->
        <div class="position">
          <img src="./img/Position.png" alt="" />
          <!-- 最多显示两行 -->
          <div class="van-multi-ellipsis--l2">{{ content.sqnadress }}<van-icon name="arrow" /></div>
        </div>
        <div class="position">
          <img src="./img/phone.png" alt="" />
          <!-- 最多显示两行 -->
          <div class="van-multi-ellipsis--l2">{{ content.qsnphone }} <a :href="`tel:` + content.qsnphone">拨打</a></div>
        </div>
        <div class="Album detailTitle">相册</div>
        <div class="demo" v-if="content.qsnvideo !== ''">
          <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"> </video-player>
        </div>

        <div class="detailPic sp" v-for="(item, index) in content.texturl" :key="index">
          <img :src="item" alt="" @click="PicturePreview(index)" />
          <span>{{ index + 1 }}/{{ content.texturl.length }}</span>
        </div>
      </div>

      <div class="dynamic" v-show="labelIndex === 2">
        <van-list v-model="dynamicLoading" :finished="dynamicFinished" finished-text="没有更多了" @load="dynamicOnLoad">
          <van-cell v-for="item in dynamicList" :key="item.id">
            <div class="dynamic-item" @click="toPreview(item)">
              <div class="dynamic-wrap">
                <img class="dynamic-img" :src="item.img" alt="封面图" />
                <div class="dynamic-info">
                  <p class="dinamic-title">{{ item.title }}</p>
                  <p class="dinamic-pub-time">{{ item.create_time }}</p>
                </div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
      <!-- <div class="aboutUs" v-show="labelIndex === 3"> -->
      <!-- <ul>
          <li>
            <span>企业地址</span>
            <strong>{{ content.sqnadress }}</strong>
          </li>
          <li>
            <span>企业电话</span>
            <em>{{ content.qsnphone }}</em>
          </li>
        </ul> -->
      <!-- </div> -->
    </div>
    <!-- 点赞 -->
    <div class="operationBtn 11">
      <div @click="likeHandle">
        <img v-if="content.fabulousstatus === 0" src="./img/like.png" alt="" />
        <img v-else src="./img/like_ed.png" alt="" />
        <!-- <van-icon v-if="content.fabulousstatus === 0" size="2.2rem" name="like" color="#dbdbdb" />
        <van-icon v-else size="2.2rem" name="like" color="#f7173a" /> -->
        <span>{{ content.fabulous }}</span>
      </div>
      <!-- 点击评论 -->
      <div @click="showCommentHandle">
        <!-- information -->
        <img src="./img/information.png" alt="" />
        <span>{{ content.comment }}</span>
      </div>
      <!-- 关注 -->
      <div @click="followHandle">
        <img v-if="content.followstatus === 0" src="./img/Collect.png" alt="" />
        <img v-else src="./img/Collect_ed.png" alt="" />
        <span>{{ content.follow }}</span>
      </div>
    </div>
    <!-- 
    /**
     * @Author: 飞
     * @Date: 2021-06-23 10:44:50
     * @Describe: 回复
     */
      -->
    <van-action-sheet v-model="showComment" :title="commentTitle">
      <div class="commentContent" @click.stop="clearReply">
        <div class="commentList">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in commentList" :key="item.id">
              <div class="commentListItem">
                <div class="commenAavatar"><img :src="item.avatar" alt="" /></div>
                <div class="commentItemContent">
                  <div class="commentUserName">{{ item.nickname }}</div>
                  <p class="commentItem">
                    {{ item.content }}
                    <strong>
                      <span>{{ item.create_Time }}</span>
                      <span @click.stop="replyCommentHandle(item)">回复</span>
                    </strong>
                  </p>
                </div>
              </div>
              <ul class="commentChildren">
                <li v-for="commentChild in item.children" :key="commentChild.id">
                  <div class="commenAavatar">
                    <img :src="commentChild.avatar" alt="头像" style="width: 100%; height: 100%" />
                  </div>
                  <div class="commentItemContent">
                    <div class="commentUserName">{{ commentChild.nickname }}</div>
                    <p class="commentItem">
                      {{ commentChild.content }}
                      <strong>
                        <span>{{ item.create_Time }}</span>
                      </strong>
                    </p>
                  </div>
                </li>
              </ul>
            </van-cell>
          </van-list>
        </div>
        <!-- 评论 -->
        <div class="submitComment">
          <van-cell-group>
            <van-field ref="commentValue" @click.stop="nothHandle" v-model="commentValue" :placeholder="commentPlaceholder"></van-field>
          </van-cell-group>
          <van-button @click.stop="submitComment" size="small" plain>发送</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Toast, Circle, ActionSheet, ImagePreview } from "vant";
// import { videoPlayer } from 'vue-video-player'
import { videoPlayer } from "vue-video-player";
import { EventBus } from "../A_version_1.1/event-bus.js";
import { Notify } from "vant";
export default {
  data() {
    return {
      navigation_Show: true, //导航是否隐藏
      IntroductionInformation_show: true, //牛人介绍展开收拢
      industry_data: [], //行业

      dynamicLoading: false,
      dynamicFinished: false,
      dynamicList: [],
      dynamicPage: 1,
      loading: false,
      finished: false,
      commentPage: 1,
      commentValue: "",
      commentNum: 0, //评论数
      showComment: false,
      rate: 100,
      lableList: [
        {
          name: "牛人信息",
          isShow: true
        },
        {
          name: "产品信息",
          isShow: true
        },
        {
          name: "企业动态",
          isShow: true
        },
        {
          name: "联系我们",
          isShow: false
        }
      ],
      labelIndex: 0, //标题第几个
      content: {
        // swipeList: [
        //   { url: require("../../assets/newImg/detail/swipeItem.png") },
        //   { url: require("../../assets/newImg/detail/swipeItem.png") },
        //   { url: require("../../assets/newImg/detail/swipeItem.png") },
        //   { url: require("../../assets/newImg/detail/swipeItem.png") }
        // ],
        // logo: require("../../assets/newImg/detail/logo.png"),
        // title: "李兴华",
        // classification: {
        //   one: "高级管理",
        //   two: "高级管理",
        //   three: "创始人",
        //   four: ""
        // }
      },
      val: 0,
      timer: "",
      timeoutOnoff: "",
      showRed: false,
      uid: "",
      isReceive: false,
      money: "",
      qsn_name: "",
      delay: false,
      timeStamp: new Date().getTime().toString(),
      // redGif: require("./img/red6.gif"),
      redGif: require("./img/hbbj.gif"),

      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: "16:9",
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            type: "video/mp4",
            //url地址
            src: "" //视频播放地址
          }
        ],
        //你的封面地址
        poster: "",
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: true
        }
      },

      commentList: [],
      parent_id: 0,
      commentPlaceholder: "写评论...",
      /**
       * @Author: 飞
       * @Date: 2021-08-12 19:45:00
       * @Describe:
       */
      qsntype: ""
    };
  },
  activated() {
    window.scrollTo(0, 0);
    this.showRed = false;
    this.isReceive = false;
    this.redGif = this.redGif + "?" + this.timeStamp;
    this.val = 0;
    this.uid = this.$route.query.objId;
    /**
     * @Author: 飞
     * @Date: 2021-08-12 18:55:13
     * @Describe: 新增类型 企业1  商铺 2 牛人3
     */
    this.qsntype = this.$route.query.qsntype;

    this.commentList = [];
    this.dynamicList = [];
    this.getInfo(); //获取个人基本信息
    this.commentPage = 1;
    this.dynamicPage = 1;
    this.getCommentList();
    this.getDynamicList();
    this.canReceive(); //判断能否领取红包
    this.labelIndex = 0;
    // 浏览次数加1
    EventBus.$emit("Browse");
  },
  deactivated() {
    this.showRed = false;
    clearInterval(this.timer);
    clearTimeout(this.timeoutOnoff);
  },
  computed: {
    commentTitle() {
      return `共${this.commentNum}条评论`;
    }
  },
  methods: {
    // 后退
    Retreat() {
      this.$router.go(-1);
    },
    //牛人介绍 展开 收拢
    Expand() {
      this.IntroductionInformation_show = !this.IntroductionInformation_show;
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-23 11:01:06
     * @Describe: 图片预览
     */
    PicturePreview(msg) {
      ImagePreview({
        images: this.content.texturl,
        startPosition: msg
      });
    },

    nothHandle() {},
    clearReply() {
      this.parent_id = 0;
      this.commentPlaceholder = "写评论...";
    },
    replyCommentHandle(item) {
      console.log(item);
      this.$refs.commentValue.focus();
      this.parent_id = item.id;
      this.commentPlaceholder = "回复" + item.nickname;
    },
    showCommentHandle() {
      //评论
      this.$nextTick(() => {
        this.showComment = true;
      });
    },
    closeRed() {
      console.log("关闭");

      this.showRed = false;
      this.isReceive = false;
    },
    getRed() {
      const currentAddress = JSON.parse(localStorage.getItem("currentAddress"));
      const data = {
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
        id: this.content.id,
        citycode: currentAddress.citycode,
        addcode: currentAddress.adcode,
        latitude: currentAddress.lat,
        longitude: currentAddress.lng
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/watchbonus";
      var that = this;
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        if (res.data.result === 1) {
          that.money = res.data.data.money;
          that.qsn_name = res.data.data.qsn_name;
          that.showRed = true;

          /**
           * @Author: 飞
           * @Date: 2021-06-30 17:48:23
           * @Describe:领取红包成功   关注发信息
           */
          /**
           * @Author: 飞
           * @Date: 2021-10-20 17:36:26
           * @Describe: 直接显示出金额
           */
          // that.timeoutOnoff = setTimeout(() => {
          that.delay = true;
          //   clearTimeout(that.timeoutOnoff);
          // }, 1500);
          const hideRed = setTimeout(() => {
            that.closeRed();
            clearTimeout(hideRed);
          }, 5000);

          // 更新关注列表
          // window.SendAListOfFriends();
          // window.JIM.SendASingleChatMessage(res.data.data.username, window.JIM.useData.nickname + "领取了你发的红包,并已关注");
        } else {
          that.isReceive = false;
          Toast(res.data.msg);
        }
      });
    },
    setVal() {
      this.timer = setInterval(() => {
        this.val++;
        if (this.val === 100) {
          this.getRed();
          clearInterval(this.timer);
        }
      }, 50);
    },
    // 获取个人基本信息
    getInfo() {
      const data = {
        id: this.uid,
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/basicname";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        if (res.data.result === 1) {
          // this.$set 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 this.myObject.newProperty = 'hi')
          for (const key in res.data.data) {
            this.$set(this.content, key, res.data.data[key]);
          }
          // if (this.content.surplusnum > 0) {
          //   this.canReceive();
          // }else{

          // }
          this.industry_data = res.data.data.catename.split("/"); //行业
          this.commentNum = this.content.comment; //评论数
          this.playerOptions.sources[0].src = this.content.qsnvideo; //播放视频地址
          // 浏览
          this.addvisit();
          // 个人中心 标签判断
          this.judgeLabel();
        }
      });
    },
    // 个人中心 标签判断
    judgeLabel() {
      // 是否是供应商1是.0不是
      if (!this.content.supplier) {
        this.lableList[1].isShow = false;
      } else {
        this.lableList[1].isShow = true;
      }
      //  有没有动态  1有动态,,0没有
      if (!this.content.dynamic) {
        this.lableList[2].isShow = false;
      } else {
        this.lableList[2].isShow = false;
      }
      // 产品 动态都为空  影藏导航
      if (this.lableList[2].isShow == false && this.lableList[1].isShow == false) {
        this.navigation_Show = false;
      }
    },
    // 个人中心 标签事件
    cheangeLabel(index) {
      if (index === 1) {
        if (this.content.supplier) {
          this.$router.push(this.fun.getUrl("o2oStore_v2", { store_id: this.content.store_id }));
        } else {
          Toast("暂无产品");
        }
      }
      this.labelIndex = index;
    },
    //浏览
    addvisit() {
      const data = {
        sid: this.content.id,
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/addvisit";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {});
    },

    likeHandle() {
      if (this.content.fabulousstatus === 0) {
        this.getlike();
      } else {
        this.updatelike();
      }
    },
    getlike() {
      //点赞
      const data = {
        sid: this.content.id,
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/getlike";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        if (res.data.result === 1) {
          this.content.fabulousstatus = 1;
          this.content.fabulous++;
          EventBus.$emit("likeEB", {
            num: {
              type_N: 1,
              state: 1
            }
          });
          Toast(res.data.msg);
        } else {
          Toast(res.data.msg);
        }
      });
    },
    updatelike() {
      //取消点赞
      const data = {
        sid: this.content.id,
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/updatelike";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        if (res.data.result === 1) {
          this.content.fabulousstatus = 0;
          this.content.fabulous--;
          EventBus.$emit("likeEB", {
            num: {
              type_N: -1,
              state: 0
            }
          });
          Toast(res.data.msg);
        } else {
          Toast(res.data.msg);
        }
      });
    },
    followHandle() {
      if (this.content.followstatus === 0) {
        this.addfollow();
      } else {
        this.cancelfollow();
      }
    },
    addfollow() {
      //关注
      const data = {
        sid: this.content.id,
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/addfollow";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        if (res.data.result === 1) {
          this.content.followstatus = 1;
          this.content.follow++;
          Toast(res.data.msg);

          EventBus.$emit("payAttentionToEB", {
            num: {
              type_N: 1,
              state: 1
            }
          });
        } else {
          Toast(res.data.msg);
        }
      });
    },
    cancelfollow() {
      //取消关注
      const data = {
        sid: this.content.id,
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/cancelfollow";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        if (res.data.result === 1) {
          this.content.followstatus = 0;
          this.content.follow--;
          Toast(res.data.msg);
          EventBus.$emit("payAttentionToEB", {
            num: {
              type_N: -1,
              state: 0
            }
          });
        } else {
          Toast(res.data.msg);
        }
      });
    },
    onLoad() {
      this.commentPage++;
      this.getCommentList();
    },
    getCommentList() {
      const data = {
        id: this.uid,
        page: this.commentPage
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/comments";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        if (res.data.result === 1) {
          if (res.data.data.length !== 0) {
            this.$nextTick(() => {
              res.data.data.forEach(item => {
                this.commentList.push(item);
              });
            });
            this.loading = false;
            this.finished = false;
          } else {
            this.finished = true;
          }
        }
      });
    },
    submitComment() {
      if (this.commentValue === "") {
        Toast("请输入内容");
        return;
      }
      if (this.commentValue.length > 20) {
        Toast("字数限制20字");
        return;
      }
      const data = {
        parent_id: this.parent_id,
        sid: this.content.id,
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
        common_text: this.commentValue
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/getcomment";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        if (res.data.result === 1) {
          Toast("评论成功");
          this.commentPlaceholder = "写评论...";
          this.parent_id = 0;
          this.content.comment++;
          this.commentPage = 1;
          this.commentList = [];
          this.commentValue = "";
          this.finished = true;
          this.getCommentList();
        }
      });
    },
    dynamicOnLoad() {
      this.dynamicPage++;
      this.getDynamicList();
    },
    getDynamicList() {
      const data = {
        sid: this.uid,
        page: this.dynamicPage
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/dynamiclists";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        if (res.data.result === 1) {
          if (res.data.data.length !== 0) {
            res.data.data.forEach(item => {
              this.dynamicList.push(item);
            });
            this.dynamicLoading = false;
            this.dynamicFinished = false;
          } else {
            this.dynamicFinished = true;
          }
        }
      });
    },
    toPreview(item) {
      this.$router.push(this.fun.getUrl("dynamicPreview", { id: item.id }));
    },
    canReceive() {
      //判断能否领取红包
      const currentAddress = JSON.parse(localStorage.getItem("currentAddress"));
      console.log("currentAddress", currentAddress);
      console.log(currentAddress);
      const data = {
        id: this.uid,
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
        citycode: currentAddress.citycode,
        addcode: currentAddress.adcode,
        latitude: currentAddress.lat,
        longitude: currentAddress.lng
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/actioncheckbonus";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        console.log(res);
        if (res.data.result === 1) {
          this.isReceive = true;
          this.setVal();
        } else {
          this.isReceive = false;
          Toast(res.data.msg);
          // Notify({ type: 'danger',background: '#ee0a2487', message: res.data.msg });
        }
      });
    }
  },
  components: {
    videoPlayer
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  background-color: #fff;
  padding: 12px;
  border-radius: 15px;
}
/deep/.van-button--small {
  font-size: 14px;
}
/deep/.van-hairline--top-bottom::after {
  border: 0px;
}
/deep/.submitComment .van-cell-group .van-field__control {
  border: 1px solid #d8d8d8;
}
.progress {
  background-size: 3.7rem 3rem;
  background-image: url("../../assets/newImg/detail/redtop2.png");
  // background-image: url("./img/hbbj.gif");
  background-repeat: no-repeat;
  background-position: center;
}
.mt-progress-content {
  border-radius: 5px;
  overflow: hidden;
}
/deep/ .mt-progress-runway {
  border-radius: 5px;
  overflow: hidden;
}
/deep/.mt-progress-progress {
  background-color: #f63a39;
  border-radius: 5px;
}

// 遮罩
.mask {
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  height: 100%;
  width: 100%;

  z-index: 200000;
}
.redSuccess {
  position: fixed;
  width: 15.625rem;
  height: 15.625rem;
  top: 50%;
  left: 50%;
  margin-top: -7.8125rem;
  margin-left: -7.8125rem;
  background-size: 100% 100%;
  z-index: 200001;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 200000;
    top: 0;
    left: 0;
  }
  .money {
    font-size: x-large;
    position: relative;
    z-index: 200001;
    text-align: center;
    // line-height: 16.9rem;
    margin-top: 7.2rem;
    color: #f72419;
  }

  .name {
    width: 100%;
    position: absolute;
    z-index: 200000;
    top: 222px;
    left: 0;
    .imgss {
      width: 14.81rem;
      height: 3.06rem;
      z-index: 200001;
    }
    span {
      position: relative;
      z-index: 200001;
      color: #fff;
      line-height: 3.06rem;
      font-size: 1.13rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
    }
  }
  .closeIcon {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 200002;
    // border:1px solid #000;
    overflow: hidden;
    /deep/ i {
      margin: 0.5rem auto;
    }
  }
}
.redSuccessBg {
  position: fixed;
  width: 15.625rem;
  height: 15.625rem;
  top: 50%;
  left: 50%;
  margin-top: -7.8125rem;
  margin-left: -7.8125rem;
  background-color: #000;
  opacity: 0.5;
  z-index: 200000;
}
.content {
  background-color: #fff;
}
.mt-progress {
  width: 3.72rem;
  height: 0.2rem;
}
.red {
  position: fixed;
  top: 50%;
  left: 0.5rem;
  width: 5rem;
  height: 5rem;
  z-index: 9997;
  .redDetail {
    position: relative;
  }
  .redTop {
    width: 3.7rem;
    height: 3rem;
    background-size: 100% 100%;
    background-image: url("../../assets/newImg/detail/redtop2.png");
  }
  .redDown {
    box-sizing: content-box;
    width: 3.7rem;
    height: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    border: 0.0625rem solid #979797;
    border-top: none;
    background-color: #fff;
    font-size: 0.2rem;
  }
  .redEffect {
    // background-color: #fff;
    z-index: 9998;
    position: absolute;
    height: 4rem;
    width: 3.7rem;
    top: 0;
    left: 0;
    font-size: 0.2rem;
    line-height: 4rem;
    span {
      position: relative;
      z-index: 10000;
    }
    img {
      width: 100%;
      height: 100%;
      z-index: 9999;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
.my-swipe {
  height: 10rem;
  img {
    width: 100%;
    height: 100%;
  }
  /deep/.van-swipe__indicators {
    left: 90%;
    .van-swipe__indicator {
      opacity: 1;
    }
    .van-swipe__indicator--active {
      background-color: rgb(5, 121, 252);
    }
  }
}
#back {
  padding: 0.3125rem;
  position: absolute;
  z-index: 2;
  height: 2.25rem;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 100%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  text-indent: 0;
  overflow: hidden;
  top: 0;
  margin: 0.5rem 0 0 0.5rem;
}
// 头像

.logo {
  width: calc(100% - 2rem);
  margin: -2.1875rem 1rem 0rem;
  position: relative;
  z-index: 1;
  overflow: hidden;
  text-align: left;
  div {
    width: 4.94rem;
    height: 4.94rem;
    display: inline-block;
    img {
      width: 4.94rem;
      height: 4.94rem;
      border-radius: 50%;
    }
  }
  // 行业
  .industry {
    display: inline-block;
    width: calc(100% - 5rem);
    text-align: right;
    li {
      display: inline-block;
      height: 18px;
      font-size: 10px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      line-height: 18px;
      border-radius: 0.1875rem;
      box-sizing: content-box;
      padding: 0 0.3125rem;
      margin-right: 0.625rem;
      margin-bottom: 0.3125rem;
      border-radius: 0px 3px 0px 3px;
      // display: flex;
      // /*实现垂直居中*/
      // align-items: center;
      // /*实现水平居中*/
      // justify-content: center;

      // text-align: justify;
    }
    li:nth-child(3n + 1) {
      background-color: #e0eefe;
      color: #0579fc;
    }
    li:nth-child(3n + 2) {
      background-color: #e9f9e6;
      color: #50c81b;
    }
    li:nth-child(3n + 3) {
      background-color: #ffe9da;
      color: #fa6400;
    }
  }
}
.contentInfo {
  padding: 0 0.9375rem;
}
.title {
  h3 {
    // height: 1.25rem;
    padding-left: 0.5rem;
    height: 2rem;
    font-size: 1rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    line-height: 2rem;
    overflow: hidden;
    vertical-align: middle;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: left;
  }
  span {
    display: inline-block;
    width: 0.8125rem;
    height: 0.8125rem;
    background-image: url("../../assets/newImg/detail/collection.png");
    background-size: 100% 100%;
    // margin-left: 0.5rem;
    // margin-top: 0.3rem;
  }
  strong {
    position: relative;
    font-size: 1.25rem;
    div {
      position: absolute;
      width: 0.8125rem;
      height: 0.8125rem;
      top: 0;
      right: -0.8125rem;
    }
  }
}
.classification {
  margin-top: 0.625rem;
  padding-left: 0.5rem;
}
.classification > div {
  // // height: 1.0625rem;
  // font-family: PingFang-SC-Medium, PingFang-SC;
  // font-weight: 500;
  // color: #666666;
  // line-height: 1.0625rem;
  text-align: left;
  strong {
    font-size: 0.88rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 1.25rem;
  }
}
.numList {
  // height: 0.875rem;
  font-size: 0.625rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #666666;
  line-height: 1.2rem;
  margin-top: 0.625rem;
  padding-left: 0.9375rem;
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  li {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 22%;
  }
  .numListItem {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  strong {
    color: #999;
  }
  .numListBorder {
    height: 1.1875rem;
    width: 2px;
    background-color: #e4e4e4;
    margin-top: 0.625rem;
  }
}
.lableList {
  margin-top: 1.5rem;
  height: 1.9375rem;
  border-top: 0.5rem solid #f6f6f6;
  border-bottom: 0.06rem solid #f6f6f6;
  padding: 0 0.7813rem;
  padding-top: 0.81rem;
  box-sizing: content-box;
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
  }
  li {
    font-size: 1rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3a3a3e;
    line-height: 1.38rem;
    span {
      display: block;
    }
    div {
      width: 2.25rem;
      height: 0.19rem;
      margin: 0 auto -0.3125rem;
    }
  }
  .cur {
    font-size: 1rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0579fc;
    line-height: 1.38rem;
    text-shadow: 0px 0px 0px #e0eefe;
    span {
      margin-bottom: 0.4rem;
    }
    div {
      background: linear-gradient(270deg, #0579fc 0%, #2367fe 0%, #49a0ff 100%);
    }
  }
}
.detail {
  margin-top: 1.63rem;
  font-size: 0.9375rem;
  //  font-size:0.875rem;
  font-family: PingFang-SC-Bold, PingFang-SC;
  color: #333333;
  // line-height: 1.0625rem;
  line-height: 1.5625rem;
  // 标题(介绍,联系方式,相册)

  .detailTitle {
    text-align: left;
    font-size: 1rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #3a3a3e;
    line-height: 1.13rem;
    margin-bottom: 0.75rem;
  }
  // 展开
  .img,
  .img_S {
    height: 1.5rem;
    width: 1.5rem;
  }
  // 牛人介绍 内容
  .IntroductionInformation {
    text-indent: 2em;
    text-align: justify;
    margin-bottom: 0.625rem;
    font-size: 0.88rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 1.25rem;
  }
  .detailPic {
    width: 100%;
    height: auto;
    margin-top: 0.625rem;
    img {
      width: 100%;
      height: 100%;
      vertical-align: text-top;
    }
    span {
      font-size: 0.8rem;
      display: block;
      text-align: right;
    }
  }
  // 相册
  .Album {
    margin-top: 1rem;
  }
  //展开
  .img {
    animation: img_S 0.5s forwards;
  }
  .img_S {
    animation: loading 0.5s forwards;
  }
  @-webkit-keyframes img_S {
    0% {
      transform: rotate3d(0, 0, 1, 180deg);
    }

    100% {
      transform: rotate3d(0, 0, 1, 0deg);
    }
  }

  @keyframes img_S {
    0% {
      transform: rotate3d(0, 0, 1, 180deg);
    }

    100% {
      transform: rotate3d(0, 0, 1, 0deg);
    }
  }
  @-webkit-keyframes loading {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }

    100% {
      transform: rotate3d(0, 0, 1, 180deg);
    }
  }

  @keyframes loading {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }

    100% {
      transform: rotate3d(0, 0, 1, 180deg);
    }
  }
  //
  .position {
    text-align: left;
    img {
      width: 1.38rem;
      height: 1.38rem;
      vertical-align: top;
    }
    .van-multi-ellipsis--l2 {
      display: inline-block;
      width: 80%;
      margin-left: 0.5rem;

      font-size: 0.88rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #6c6c73;
      line-height: 1.38rem;
      i {
        vertical-align: middle;
      }
      // 电话拨打
      a {
        font-size: 0.88rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 800;
        color: #0579fc;
        line-height: 1.38rem;
        margin-left: 0.6rem;
        vertical-align: top;
      }
    }
  }
}
.aboutUs {
  margin-top: 1.25rem;
  font-size: 0.875rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #333333;
  line-height: 1.25rem;
}
.demo {
  // display: inline-block;
  width: 100%;
  height: 10.5625rem;
  text-align: center;
  line-height: 3.125rem;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
  margin-top: 0.3125rem;
}
.demo /deep/ .vjs-custom-skin > .video-js .vjs-big-play-button {
  width: 3.125rem !important;
  height: 3.125rem !important;
  border-radius: 50% !important;
  line-height: 3.125rem !important;
  margin-left: -1.5625rem !important;
}
.demo:hover {
  display: block;
}
.operationBtn {
  z-index: 1;
  position: fixed;
  top: 24.0625rem;
  right: 0.6875rem;
  height: 9.6875rem;
  div {
    img {
      width: 2.31rem;
      height: 2.06rem;
    }
    span {
      display: block;
      // font-size: 0.625rem;
      font-size: 0.875rem;
      color: #000;
      text-align: center;
    }
  }
}
.comment {
  z-index: 30001;
  height: 26.375rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
.commentContent {
  height: 26.375rem;
  overflow: hidden;
}
.commentList {
  height: 24rem;
  overflow-y: auto;
  .commentListItem {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding-left: 0.625rem;
  }
  .commenAavatar {
    width: 1.875rem;
    height: 1.875rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .commentItemContent {
    margin-left: 0.625rem;
    width: 12.8125rem;
  }
  .commentUserName {
    height: 1.0625rem;
    font-size: 0.75rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    // font-weight: 600;
    color: #333;
    line-height: 1.0625rem;
  }
  .commentItem {
    font-size: 0.875rem;
    font-family: PingFang-SC-Medium, PingFang-SC;
    // font-weight: 500;
    color: #333333;
    line-height: 1.25rem;
    strong {
      display: block;
      // margin-top: 0.3125rem;
      font-size: 0.625rem;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #999999;
      line-height: 0.875rem;
    }
    span {
      // display: block;
      // margin-left: 0.9375rem;
      display: inline-block;
    }
    span:nth-of-type(2) {
      margin-left: 5px;
    }
  }
  .commentChildren {
    padding-left: 3.125rem;
    overflow: hidden;
    li {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: flex-start;
      margin-top: 0.5rem;
    }
  }
}
.submitComment {
  padding-left: 1.5625rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  background-color: #fff;
  /deep/ .van-cell-group input {
    border-radius: 1.0625rem;
    border: 2px solid #d8d8d8;
    background: #ffffff;
    height: 1.875rem;
    text-indent: 1em;
  }
  /deep/ .van-field {
    width: 18.125rem;

    background: #ffffff;
  }
  /deep/ .van-cell {
    padding: 0;
    line-height: 1.875rem;
  }
  /deep/.van-button {
    border: none;
    line-height: 1.875rem;
    height: 1.875rem;
  }
}
</style>
