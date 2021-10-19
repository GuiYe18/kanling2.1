<!--
 * @Author: 飞
 * @Date: 2021-06-23 13:40:35
 * @LastEditTime: 2021-09-17 19:27:55
 * @FilePath: \you-shop1\src\views\index\SwipeTheVideo.vue
 * @Describe: 
-->
<template>
  <div class="content_swiper">
    <template>
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide class="item_swiper">
          <div style="height: 100%" ref="fixed" class="fixed" :key="show_swiper">
            <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="videoPlayerOptions" autoplay="autoplay" @ended.stop="onPlayerEnded($event)">
            </video-player>
          </div>
          <!-- 点赞分享 -->
          <div class="side-bar">
            <!-- 头像 -->
            <div class="avatar">
              <img :src="OneAvatarData.member.avatar" alt="" width="40" height="40" />
            </div>
            <!-- 点赞 -->
            <div class="like" @click.stop="toggleLike(OneAvatarData)">
              <img v-if="OneAvatarData.member_like == 0" src="../../assets/images/find_heart_r@2x.png" alt="" />
              <img v-if="OneAvatarData.member_like != 0" src="../../assets/images/find_heart_w@2x.png" alt="" />
              <span class="likenum">{{ OneAvatarData.like_num }}</span>
            </div>

            <!-- <div class="share" style="font-size: 30px" @click="shareVideo">
              <img src="../../../assets/images/find_share@2x.png" alt="" />
              <span class="sharenum" v-if="item.share_num">{{ item.share_num }}</span>
            </div> -->
          </div>
        </swiper-slide>

        <swiper-slide class="item_swiper" v-for="(item, i) in video_list" :key="i">
          <template v-if="i != 0">
            <!-- 第一帧画面 -->
            <div class="works_wrap" v-show="!item.show">
              <div class="poster">
                <img class="pic" ref="pic" :src="item.cover" />
              </div>
            </div>
            <!-- 点赞分享 -->
            <div class="side-bar">
              <!-- 头像 -->
              <div class="avatar">
                <img :src="item.member.avatar" alt="" width="40" height="40" />
              </div>
              <div class="like" @click.stop="toggleLike(item)">
                <img v-if="item.member_like == 0" src="../../assets/images/find_heart_r@2x.png" alt="" />
                <!-- <img v-if="item.member_like != 0" src="../../../assets/images/find_heart_w@2x.png" alt="" /> -->
                <img v-if="item.member_like != 0" src="../../assets/images/find_heart_w@2x.png" alt="" />
                <span class="likenum">{{ item.like_num }}</span>
              </div>

              <!-- <div class="share" style="font-size: 30px" @click="shareVideo">
              <img src="../../../assets/images/find_share@2x.png" alt="" />
              <span class="sharenum" v-if="item.share_num">{{ item.share_num }}</span>
            </div> -->
            </div>
          </template>
        </swiper-slide>

        <div class="" slot="pagination"></div>
      </swiper>
    </template>
  </div>
</template>

<script>
export default {
  name: "carrousel",
  props: ["Level_2"],
  data() {
    let that = this;
    return {
      swiperOptions: {
        direction: "vertical",
        observer: true,
        width: window.innerWidth,
        height: window.innerHeight,
        watchOverflow: true,
        autoHeight: true,
        pagination: false,
        // Some Swiper option/callback...

        on: {
          // 向上滑结束
          // slideChangeTransitionEnd() {
          //   console.log("0");
          // },
          /**
           * @Author: 飞
           * @Date: 2021-07-07 13:33:42
           * @Describe: 回调函数，swiper从一个slide过渡到另一个slide结束时执行
           */
          // slideChangeTransitionEnd() {
          //   console.log("swiper.activeIndex", this.realIndex, this, this.size, that.list); //切换结束时，告诉我现在是第几个slide
          //   that.height_swipwe_item = this.size; //记录单个轮播的高度
          //   that.realIndex_swiper = this.realIndex; //记录滑到第几个了
          //   // that.ISlide = true; //有滑动的动作
          // },
          click: function () {
            that.play_Pause = !that.play_Pause;
          },
          // 滑动中
          touchMove: function (swiper, event) {
            // console.log("滑动中", swiper, this.touches, this.activeIndex, this.realIndex);
          },
          // 上划事件
          slidePrevTransitionStart: function () {
            console.log("上划事件", this.activeIndex);
            that.height_swipwe_item = this.size; //记录单个轮播的高度
            that.realIndex_swiper = that.realIndex_swiper - 1; //记录滑到第几个了

            that.slide_IS = true;
          },
          // 下划事件
          slideNextTransitionStart: function () {
            console.log("下划事件", this.activeIndex);
            that.height_swipwe_item = this.size; //记录单个轮播的高度
            that.realIndex_swiper = that.realIndex_swiper + 1; //记录滑到第几个了

            that.slide_IS = true;
          }
        }
      },
      // video: "https://video.worldaic.com.cn/VIDEO2021/2021-06-07/3c79d534d1db46159a06d3798c526cbf.mp4", //具体视频
      // video: "./mp4/D5C84A3B6D14E42AD74722DC2083A2EA.mp4", //具体视频
      fileType: "mp4", // 资源的类型
      posterUrl: "./img/三角形.png", //封面地址
      aaa: 1,
      play_Pause: true, //播放暂停状态
      list: 4,
      height_swipwe_item: 0, //高度
      realIndex_swiper: 0, //第几个swiper
      show_swiper: false, //重新 渲染播放器
      video_list: [], //视频列表
      // ISlide: false //是否有滑动的动作
      slide_IS: false, //来判断 上一秒有没有滑动过

      // 第一张轮播图的头像
      OneAvatarData: ""
    };
  },
  watch: {
    // 监控播放暂停的状态
    play_Pause: function (N, O) {
      console.log("NO", N, O);
      if (N) {
        this.$refs.videoPlayer.player.play();
      } else {
        this.$refs.videoPlayer.player.pause();
      }
    },
    Level_2: function (N, O) {
      console.log("Level_2", N, O);
      /**
       * @Author: 飞
       * @Date: 2021-07-07 13:26:01
       * @Describe: 点击视频菜单进行播放
       */
      if (N == 3) {
        // 让视频播放器显示出来
        // 给新的播放器添加新的src地址
        console.log("video_list", this.video_list, this.realIndex_swiper);
        this.show_swiper = true; //让播放器显示出来
        this.play_Pause = true; //进入播放

        // setTimeout(() => {
        this.videoPlayerOptions.sources[0]["src"] = this.video_list[this.realIndex_swiper].video_src;
        this.videoPlayerOptions.poster = this.video_list[this.realIndex_swiper].cover;

        // }, 1000);

        // this.play_Pause = true; //

        // setTimeout(() => {
        // this.$refs.videoPlayer.player.play(); // 播放
        // }, 700);
      } else {
        this.play_Pause = false; //出来之后修改播放状态
      }
    },
    // 监控上一秒是否有滑动过
    slide_IS: function (N, O) {
      if (N) {
        console.log("监控上一秒是否有滑动过");
        this.play_Pause = true; //进入播放

        // 先隐藏播放器在打开
        // this.show_swiper = !this.show_swiper;

        console.log("视频播完回调", this.height_swipwe_item, this.realIndex_swiper, this.videoPlayerOptions.sources[0].src, this.video_list, this.$refs);
        // 定位播放器的位置
        // console.log('this.$refs.fixed.$el',this.$refs.fixed.style);
        // this.$refs.fixed.style.transform = `translateY(500px)`;

        // 给新的播放器添加新的src地址
        this.videoPlayerOptions.sources[0]["src"] = this.video_list[this.realIndex_swiper].video_src;
        this.videoPlayerOptions.poster = this.video_list[this.realIndex_swiper].cover;
        this.show_swiper = this.show_swiper;
        console.log("this.height_swipwe_item * this.realIndex_swiper", this.height_swipwe_item, this.realIndex_swiper);
        setTimeout(() => {
          this.$refs.fixed.style.transform = `translateY(` + this.height_swipwe_item * this.realIndex_swiper + `px)`;
          this.$refs.fixed.style["z-index"] = `2`;
        }, 200);

        // 把下滑的动作设置为false
        this.slide_IS = false;
      }
    }
  },
  methods: {
    // 点赞
    toggleLike(item) {
      // 判断视频是否在播放  如果在播放  点赞会暂停 使用函数给矫正过来
      // if (this.play_Pause) {
      //   this.$refs.videoPlayer.player.play(); // 播放
      // } else {
      //   this.$refs.videoPlayer.player.pause();
      // this.play_Pause = !this.play_Pause;

      item.member_like = !item.member_like;
      !item.member_like ? item.like_num++ : item.like_num--;
      $http
        .post("plugin.video-share.frontend.video.like", {
          video_goods_id: item.id
        })
        .then(response => {
          if (response.result === 1) {
            console.log(response.msg);
          } else {
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 视频播完回调
    onPlayerEnded(player) {
      // this.$refs.fixed.style.transform = `translateY(500px)`;
      // return
      //  视频播放完毕 往下滑
      // 判断当前第几个swiper  是否等于视频库里面的个数   如果等于   就重头播放
      if (this.realIndex_swiper + 1 == this.video_list.length) {
        console.log("到底了", this.realIndex_swiper, this.video_list.length);
        this.$refs.mySwiper.swiper.slideTo(0, 0, false);
        this.realIndex_swiper = 0;
        this.$refs.fixed.style.transform = `translateY(` + this.height_swipwe_item * this.realIndex_swiper + `px)`;
        this.$refs.fixed.style["z-index"] = `2`;
        this.$refs.videoPlayer.player.play();
      } else {
        console.log("没到底");
        this.$refs.mySwiper.swiper.slideNext();
      }
    },
    // 暂停回调
    onPlayerPause(player) {
      console.log("暂停回调", player);
      this.$refs.fixed.style.transform = `translateY(500px)`;
    },

    giveColor() {
      console.log("少时诵诗书所所所所所所所");
      return {
        top: this.aaa + "!important"
      };
    }
  },
  activated() {
    console.log("activated获取视频列表");
  },
  created() {
    // 获取视频列表
    console.log("created获取视频列表");
    var that = this;
    $http
      .post("plugin.video-share.frontend.video.getList", {
        page: 1
      })
      .then(response => {
        if (response.result === 1) {
          console.log("获取视频列表", response.data.list.data);
          that.video_list = response.data.list.data;
          that.OneAvatarData = response.data.list.data[0];
        } else {
          Toast(response.msg);
        }
      })
      .catch(err => {
        console.error(err);
      });
  },
  computed: {
    videoPlayerOptions() {
      const videoPlayerOptions = {
        // autoplay: true, // 是否自动播放。
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频
        loop: false, // 是否循环播放。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        fluid: false, // 是否流体从而按比例缩放以适应其容器。
        flash: { hls: { withCreadentials: false } }, //可以播放rtmp视频
        html5: { hls: { withCreadentials: false } }, //可以播放m3u8视频
        sources: [
          {
            type: "video/" + this.fileType,
            src: "" // url地址
            // src: require("./mp4/4BD4F6B64FF47ACBCFF778C20D0E0A84.mp4") // url地址
            // src:'',
          }
        ],
        // poster: this.posterUrl, // 封面地址
        // poster: require("./img/red3.gif"), // 封面地址
        width: "100%",
        notSupportedMessage: "此视频暂无法播放..." // 当无法播放时允许覆盖Video.js，显示的默认信息。
      };
      return videoPlayerOptions;
    },
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.content_swiper {
  position: relative;
  height: 100%;
  /**
   * @Author: 飞
   * @Date: 2021-06-29 14:25:52
   * @Describe:轮播  轮播 播放 按钮 
   */

  /deep/.swiper-container {
    height: 100%;
    video {
      width: 100% !important;
      // height: calc(100vh - 200px) !important; //我的容器高度设置的是100vh-95px，你们根据你们容器高度设置视频高度即可
      // object-fit: fill; //消除两边留白
    }
    // item_swiper
    .item_swiper {
      width: 100%;
      // height: calc(100vh + 25px) !important;
      background-color: #000;
      color: #fff;
      height: 100% !important;
      // 第一帧画面
      .works_wrap {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        right: 0;
        height: 100%;
        visibility: visible;
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        overflow: hidden;
        .poster {
          height: 100%;
          width: 100%;
          img {
            max-width: 100%;
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .play {
          position: absolute;
          z-index: 11;
          left: calc(55% - 2rem);
          top: calc(50% - 2rem);
          width: 2rem;
          height: 2rem;
        }
      }

      //点赞分享
      .side-bar {
        position: absolute;
        z-index: 10;
        right: 10px;
        bottom: 15rem;
        display: flex;
        flex-direction: column;
        height: 150px;
        justify-content: space-between;
        // 头像
        .avatar {
          position: relative;
          border-radius: 50%;
          background: none;
          border: 1px solid rgb(232, 232, 233);
          img {
            border-radius: 50%;
            display: block;
          }
          .follow {
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%) translateY(50%);
            width: 16px;
            height: 16px;
            font-size: 16px;
            border-radius: 50%;
            background: rgb(252, 52, 93);
          }
        }
        // 点赞
        .like {
          position: relative;

          img {
            width: 40px;
            height: 40px;
          }

          .likenum {
            font-size: 10px;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%) translateY(100%);
            color: rgb(232, 232, 233);
          }
        }
      }
    }
    // 原始控制台
    .video-js {
      // 原始控制台
      .vjs-control-bar {
        display: none;
      }
      .vjs-big-play-button {
        display: none;
      }
    }
    // 视频
    .fixed {
      z-index: 1;
      height: 100%;
      width: 100%;
      position: absolute;
      .video-player {
        height: 100%;
        // 包括播放
        .video-js {
          height: 100%;
          // 视频垂直居中
          .vjs-tech {
            height: "" !important;
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>