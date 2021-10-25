<!--
 * @Author: 飞
 * @Date: 2021-08-30 11:39:01
 * @LastEditTime: 2021-10-20 17:13:53
 * @FilePath: \you-shop1\src\views\A_version_1.1\NewDonation\NewDonationCenter.vue
 * @Describe: 
-->

<template>
  <div id="content">
    <div class="header">
      <!-- 标题 _ 轮播 -->
      <div class="Boom">
        <!-- 标题 -->
        <van-nav-bar title="捐赠中心" @click-left="onClickLeft">
          <template #left>
            <img src="./img/position.png" alt="" />
            <span>{{ city }}</span>
          </template>
        </van-nav-bar>
        <!-- 轮播 -->
        <van-swipe class="my-swipe" :autoplay="3000">
          <van-swipe-item>
            <img src="./img/lunb1.jpg" alt="" />
          </van-swipe-item>
          <van-swipe-item>
            <img src="./img/lunb2.jpg" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 爱心快讯 -->
      <div class="LoveNewsletter">
        <div class="Newsletter">
          <img src="./img/LoveNewsletter.png" alt="" />
        </div>
        <div class="NewNotice">
          <swiper ref="mySwiper" :options="swiperOptions" class="mySwiper">
            <swiper-slide>
              <p>· 李**捐赠<span>1件</span>物品至北京捐赠中心</p>
            </swiper-slide>
            <swiper-slide>
              <p>· 王**捐赠<span>4件</span>物品至北京捐赠中心</p>
            </swiper-slide>
            <swiper-slide>
              <p>· 张**捐赠<span>3件</span>物品至北京捐赠中心</p>
            </swiper-slide>
            <swiper-slide>
              <p>· 景**捐赠<span>6件</span>物品至北京捐赠中心</p>
            </swiper-slide>
          </swiper>
        </div>
        <!-- 上边框 -->
        <div class="HorizontalLine"></div>
      </div>
      <!-- 捐赠流程 -->
      <div class="DonationProcess">
        <div class="Process">
          <!-- 导航 -->
          <div class="head">
            <div>捐赠流程</div>
            <div>
              <img src="./img/hotline.png" alt="" />
              <span class="telephone">400-8978-288</span>
            </div>
          </div>
          <!-- 步骤 -->
          <div class="step">
            <div>
              <img src="./img/step.png" alt="" />
            </div>
            <!-- 立即捐赠 -->
            <div @click="DonateImmediately">
              <img src="./img/immediately.png" alt="" />
            </div>
            <img @click="DonateImmediately" class="SmallHand" src="./img/HandClick.gif" alt="" />
          </div>
        </div>
      </div>

      <!-- 捐赠排行榜 -->
      <div class="Leaderboard">
        <!-- <div @click="OnRanking"> -->
        <div>
          <img src="./img/Leaderboard_2.png" alt="" />
        </div>
      </div>
      <!-- 捐赠列表 -->
      <div class="List">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item.id">
            <div class="item">
              <div class="ProductMap">
                <img :src="item.thumb" alt="" />
              </div>
              <div class="DonateDetails">
                <div class="van-multi-ellipsis--l2" style="height: 2.6rem">{{ item.title }}</div>
                <div class="UserInfo">
                  <div class="Avatar">
                    <img :src="item.avatar" alt="" />
                  </div>
                  <div class="name">
                    <div class="van-ellipsis tit">{{ item.nicename }}</div>
                    <div class="Detail van-ellipsis">
                      <van-icon name="location-o" />
                      <!-- <span class="address VerticalLine">北京市丰台区</span> -->
                      <span class="address VerticalLine">{{ item.adress }}</span>

                      <van-icon name="clock-o" />
                      <span class="address">{{ item.created_at }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
      <!-- footer -->
      <div class="footer">
        <EyebrowEnd :active="1" />
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import EyebrowEnd from "./EyebrowEnd";

export default {
  data() {
    return {
      TheTotalNumberOf: 0, //总个数
      list: [],
      loading: false,
      finished: false,

      swiperOptions: {
        loop: true,
        direction: "vertical",
        slidesPerView: 2,
        autoplay: {
          delay: 3000 //1秒切换一次
        }
        // Some Swiper option/callback...
      },
      // 市
      city: "正在获取地理位置···",
      position: {},
      pageS: 0,
      OpenTheTip: true, //协议是否开启提示
      NumberOfLocation: 0, //定位计数
      TargetNumber: 4 //定位次数
    };
  },
  components: {
    EyebrowEnd
  },
  activated() {
    // 获取捐赠列表
    this.getDonationList();
    // 获取地理位置
    this.GetAGeographicLocation();

    // this.Tmap()
  },
  methods: {
    // 获取定位
    onClickLeft() {
      this.GetAGeographicLocation();
    },
    // // 获取市
    // Tmap() {
    //   var that = this;
    //   window.addEventListener(
    //     "message",
    //     function (event) {
    //       var loc = event.data;
    //       this.opp = loc.city;
    //       that.city = this.opp;
    //       console.log("opp", opp); // 显示你当前位置
    //     },
    //     false
    //   );
    // },
    // 获取地理位置
    GetAGeographicLocation() {
      var that = this;
      var mapObj = new AMap.Map("iCenter");
      mapObj.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 2000, // 超过10秒后停止定位，默认：无穷大
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
        console.log("定位成功", obj);
        that.city = obj.addressComponent.province;
        /**
         * @Author: 飞
         * @Date: 2021-10-20 17:12:49
         * @Describe: 区域
         */        
        localStorage.setItem("Area", JSON.stringify(obj.addressComponent.district));
        that.position = obj.position;
        var citydata = {};
        citydata.city = obj.addressComponent.province;
        citydata.position = obj.position;
        // 城市地址存本地
        localStorage.setItem("citydata", JSON.stringify(citydata));
      }
      function onError(obj) {
        that.NumberOfLocation = that.NumberOfLocation + 1;
        if (that.NumberOfLocation < that.TargetNumber) {
          that.GetAGeographicLocation();
        } else {
          Toast("定位失败,请手动切换位置");
        }
      }
    },
    // 获取捐赠列表
    getDonationList() {
      this.pageS++;
      var that = this;
      let json = {
        page: this.pageS,
        brand_id: 5 //捐赠物品
      };
      $http.get("goods.goods.get-goods-brand-list", json).then(json => {
        if (json.result == 1) {
          console.log("json", json.data.goods);
          that.TheTotalNumberOf = json.data.goods.total;
          json.data.goods.data.map(item => {
            that.list.push(item);
          });
        } else {
          console.log("请求有问题,错误信息：", json.msg);
        }
      });
    },
    // 懒加载
    onLoad() {
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        if (this.list.length >= this.TheTotalNumberOf) {
          //加载完关闭
          this.finished = true;
        }

        this.getDonationList();
        this.loading = true;
      }, 500);
    },
    // 点击跳转排行榜
    OnRanking() {
      this.$router.push(this.fun.getUrl("Leaderboard", {}));
    },
    // 点击立即捐赠
    DonateImmediately() {
      this.$router.push(this.fun.getUrl("OneClickDonation", { OpenTheTip: this.OpenTheTip }, {}));
    },
    IDPhoto(res) {
      this.fileList = this.fileList.replace(",,", ",");
      if (res.result == "1") {
        if (this.fileList == "") {
          this.fileList = res.data.img_path;
          return;
        }

        if (this.fileList != "") {
          this.fileList = this.fileList + "," + res.data.img_path;
          // this.fileList = res.data.img_path;
          return;
        }
      } else {
        Toast("只能上传图片");
      }
      // this.fileList.push(res.data.img_path);
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
#content {
  height: 100%;
  .header {
    position: relative;
    width: 100%;
    text-align: center;
    // 轮播
    .Boom {
      background-image: url("./img/HeadBackground.png");
      background-size: 100% 80%;
      background-repeat: no-repeat;
      /deep/.my-swipe {
        .van-swipe__indicators {
          bottom: 1.2rem;
          .van-swipe__indicator {
            width: 0.63rem;
            height: 0.25rem;
            background: #cacaca;
            border-radius: 0.19rem;
          }
          .van-swipe__indicator--active {
            width: 1.25rem;
            height: 0.25rem;
            background: #f26363;
            border-radius: 0.19rem;
          }
        }
        .van-swipe-item {
          img {
            width: 98%;
            height: 100%;
            border-radius: 1rem;
          }
        }
      }
    }
    /deep/.van-nav-bar {
      background-color: #fff0;
      .van-nav-bar__title {
        font-size: 1.13rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #ffffff;
      }
      .van-nav-bar__left {
        padding: 0 1rem;
        img {
          width: 1rem;
          height: 1rem;
          margin-right: 0.31rem;
        }
        span {
          font-size: 0.75rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
    // 去除导航底部白边
    /deep/ .van-hairline--bottom::after {
      border: 0;
    }
    // 爱心快讯
    .LoveNewsletter {
      padding: 0 0.63rem;
      margin-bottom: 1rem;
      .Newsletter {
        display: inline-block;
        width: 16%;
        overflow: hidden;
        text-align: left;
        vertical-align: top;
        img {
          width: 2.31rem;
          height: 2.25rem;
          margin-left: 0.62rem;
        }
      }
      .NewNotice {
        display: inline-block;
        width: 84%;
        height: 40px;
        .swiper-container {
          width: 100%;
          height: 100%;
          .swiper-slide {
            p {
              font-size: 0.75rem;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #666666;
              line-height: 1.13rem;
              text-align: left;
              span {
                color: #f55e5e;
              }
            }
          }
        }
      }
      .HorizontalLine {
        height: 0.03rem;
        background-color: #dedede;
        margin-top: 0.56rem;
      }
    }
    //  捐赠流程
    .DonationProcess {
      padding: 0 0.63rem;
      // 流程
      .Process {
        background-image: url("./img/ProcessBj.png");
        background-size: 100% 100%;
        height: 13.1rem;
        width: 100%;
        // 标题
        .head {
          .telephone {
            font-size: 0.69rem;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 500;
          }
          div {
            width: 50%;
            display: inline-block;
          }
          div:nth-child(1) {
            text-align: left;
            font-size: 0.88rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 600;
            color: #333333;
            padding-left: 0.69rem;
            vertical-align: top;
            margin-top: 0.2rem;
          }
          div:nth-child(2) {
            text-align: right;
            padding-right: 0.69rem;
            display: inline-flex;
            align-items: flex-end;
            img {
              width: 1.19rem;
              height: 1.19rem;
              margin-right: 0.31rem;
              vertical-align: text-bottom;
              margin-top: 0.44rem;
            }
            span {
              color: #fff;
            }
          }
        }
        //步骤
        .step {
          padding: 0 0.63rem;
          position: relative;
          div {
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          .SmallHand {
            position: absolute;
            width: 3.125rem;
            height: 3.125rem;
            bottom: -1rem;
            right: 0.625rem;
          }
        }
      }
    }
    // 排行榜
    .Leaderboard {
      margin-top: 0.56rem;
      padding: 0 0.63rem;
      div {
        width: 100%;
        height: 7.75rem;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    // 捐赠列表
    .List {
      margin-top: 0.56rem;
      padding: 0 0.63rem;
      background-color: #fefefe;
      /deep/.van-list {
        .van-cell::after {
          border: 0;
        }
        .van-cell {
          padding: 0.63rem;
          margin-bottom: 0.63rem;
          border-radius: 0.38rem;
          background-color: #fffefe;
          box-shadow: 0rem 0rem 0.38rem 0rem rgba(0, 0, 0, 0.05);
          .item {
            .ProductMap {
              vertical-align: top;
              width: 5.56rem;
              display: inline-block;
              img {
                width: 5.56rem;
                height: 5.56rem;
                border-radius: 0.38rem;
                display: block;
              }
            }
            .DonateDetails {
              width: calc(100% - 5.56rem);
              display: inline-block;
              .van-multi-ellipsis--l2 {
                padding-left: 0.56rem;
                font-size: 0.75rem;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #333333;
                margin-bottom: 0.625rem;
              }
              // 用户信息
              .UserInfo {
                padding-left: 0.56rem;

                .Avatar {
                  width: 1.75rem;
                  height: 1.75rem;
                  display: inline-block;
                  vertical-align: unset;
                  img {
                    width: 1.75rem;
                    height: 1.75rem;
                    border-radius: 50%;
                    display: block;
                  }
                }
                .name {
                  display: inline-block;
                  width: calc(100% - 1.75rem);
                  padding-left: 0.5rem;
                  .van-ellipsis {
                    font-size: 0.75rem;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #666666;
                    line-height: 1.13rem;
                  }
                  .tit {
                    padding-left: 0.12rem;
                  }
                  .Detail {
                    font-size: 0.63rem;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #999999;
                    line-height: 0.94rem;
                    display: flex;
                    align-items: center;
                    // 竖线
                    .VerticalLine {
                      border-right: 0.06rem solid #979797;
                      padding-right: 0.31rem;
                      margin-right: 0.31rem;
                    }
                    .address {
                      margin-left: 0.13rem;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .footer {
      padding-bottom: 3rem;
      background: #fff;
    }
  }
}
</style>