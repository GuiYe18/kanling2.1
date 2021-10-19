<!--
 * @Author: 飞
 * @Date: 2021-08-20 18:00:05
 * @LastEditTime: 2021-08-23 17:27:18
 * @FilePath: \you-shop1\src\views\A_version_1.1\DonateBook\DonateItem.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-nav-bar title="书海工程详情" left-arrow @click-left="onClickLeft" />
    <div class="Intermediate">
      <div class="headers">
        <div class="GeneralNeedle">
          <!-- 总需 -->
          <div class="GeneralContent">
            <div class="van-ellipsis tit">郑州市汝河新区小学</div>
            <div class="le">
              <li><span>总需</span><span>100,000</span></li>
              <li><span>已赞助(本)</span><span>25,000</span></li>
            </div>
            <div class="rig">
              <van-circle v-model="currentRate" :stroke-width="90" :rate="30" :speed="100" layer-color="#FFF6F6" :text="text" size="57px" :color="gradientColor" />
            </div>
          </div>
        </div>
      </div>
      <div class="Layout">
        <!-- 项目介绍 -->
        <div class="ProjectIntroduction">
          <span>项目介绍</span>
          <p>由团中央中国光华科技基金会书海工程扭住解决“教育保障”这个核心，精准施策，扎实推进，为1000所学校搭建读书室活动。</p>
        </div>
        <!-- 所需书籍 -->
        <div class="RequiredBook">
          <div class="BookTop"><span>所需书籍</span> <span>多选赞助书籍分类</span></div>
          <!-- 选框 -->
          <div class="Box">
            <li v-for="(item, i) in MultipleChoice" :key="i">
              <el-checkbox v-model="item.checked" border>
                <span>{{ item.name }}</span>
                <span>{{ item.Quantity }}</span>
              </el-checkbox>
            </li>
          </div>

          <div class="BookTop"><span>赞助流程</span> <span>客服电话：400-8978-288</span></div>
          <!-- <el-steps :active="1" simple>
          <el-step title="步骤 1" icon="el-icon-edit"></el-step>
          <el-step title="步骤 2" icon="el-icon-upload"></el-step>
          <el-step title="步骤 3" icon="el-icon-picture"></el-step>
        </el-steps> -->
          <!-- 步骤 -->
          <div class="Step">
            <div class="Item">
              <span>1</span>
              <span>填写信息</span>
            </div>
            <p class="Arrow">></p>
            <div class="Item">
              <span>2</span>
              <span>快递上门</span>
            </div>
            <p class="Arrow">></p>
            <div class="Item">
              <span>3</span>
              <span>完成赞助</span>
            </div>
          </div>
        </div>
        <!-- 学校介绍 -->
        <div class="SchoolIntroduction">
          <div class="BookTop"><span>赞助流程</span></div>

          <p>郑州市中原区汝河新区小学始建于1985年，是一所环境优美、文化底蕴丰富，被社会、领导、家长、师生高度认可的国家公办标准小学。</p>
          <img src="./img/20210823143317.png" alt="" />
          <img src="./img/20210823143317.png" alt="" />
          <img src="./img/20210823143317.png" alt="" />
        </div>
        <!-- 发起机构 -->
        <div class="Initiator">
          <div class="BookTop"><span>发起机构</span></div>
          <div class="van-ellipsis">中国光华科技基金会</div>
          <div class="van-ellipsis">中民社会捐助发展中心</div>
          <div class="van-ellipsis">中华志愿者协会应急救援委员会</div>
          <div class="van-ellipsis">申通快递有限公司</div>
          <div class="BookTop"><span>技术支持</span></div>
          <div class="van-ellipsis">北京拣到互联技术有限公司</div>
        </div>
        <!-- 赞助名单 -->
        <div class="SponsorList">
          <div class="BookTop"><span>赞助名单</span></div>

          <swiper ref="mySwiper" :options="swiperOptions" class="mySwiper">
            <swiper-slide>
              <div class="Avatar">
                <img src="./img/20210823143317.png" alt="" />
              </div>
              <span>王梦梦</span>
              <span>北京市</span>
              <span>捐赠 5 本</span>
              <span>2分钟前</span>
            </swiper-slide>
            <swiper-slide>
              <div class="Avatar">
                <img src="./img/20210823143317.png" alt="" />
              </div>
              <span>王梦梦</span>
              <span>北京市</span>
              <span>捐赠 5 本</span>
              <span>2分钟前</span>
            </swiper-slide>
            <swiper-slide>
              <div class="Avatar">
                <img src="./img/20210823143317.png" alt="" />
              </div>
              <span>王梦梦</span>
              <span>北京市</span>
              <span>捐赠 5 本</span>
              <span>2分钟前</span>
            </swiper-slide>
            <swiper-slide>
              <div class="Avatar">
                <img src="./img/20210823143317.png" alt="" />
              </div>
              <span>王梦梦</span>
              <span>北京市</span>
              <span>捐赠 5 本</span>
              <span>2分钟前</span>
            </swiper-slide>
            <swiper-slide>
              <div class="Avatar">
                <img src="./img/20210823143317.png" alt="" />
              </div>
              <span>王梦梦</span>
              <span>北京市</span>
              <span>捐赠 5 本</span>
              <span>2分钟前</span>
            </swiper-slide>
            <swiper-slide>
              <div class="Avatar">
                <img src="./img/20210823143317.png" alt="" />
              </div>
              <span>王梦梦</span>
              <span>北京市</span>
              <span>捐赠 5 本</span>
              <span>2分钟前</span>
            </swiper-slide>
            <swiper-slide>
              <div class="Avatar">
                <img src="./img/20210823143317.png" alt="" />
              </div>
              <span>王梦梦</span>
              <span>北京市</span>
              <span>捐赠 5 本</span>
              <span>2分钟前</span>
            </swiper-slide>
            <swiper-slide>
              <div class="Avatar">
                <img src="./img/20210823143317.png" alt="" />
              </div>
              <span>王梦梦</span>
              <span>北京市</span>
              <span>捐赠 5 本</span>
              <span>2分钟前</span>
            </swiper-slide>
            <swiper-slide>
              <div class="Avatar">
                <img src="./img/20210823143317.png" alt="" />
              </div>
              <span>王梦梦</span>
              <span>北京市</span>
              <span>捐赠 5 本</span>
              <span>2分钟前</span>
            </swiper-slide>
            <swiper-slide>
              <div class="Avatar">
                <img src="./img/20210823143317.png" alt="" />
              </div>
              <span>王梦梦</span>
              <span>北京市</span>
              <span>捐赠 5 本</span>
              <span>2分钟前</span>
            </swiper-slide>
            <swiper-slide>
              <div class="Avatar">
                <img src="./img/20210823143317.png" alt="" />
              </div>
              <span>王梦梦</span>
              <span>北京市</span>
              <span>捐赠 5 本</span>
              <span>2分钟前</span>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <!-- 我要捐赠 -->
    <div class="IWantToDonate" @click="Donation">我要捐书</div>
  </div>
  
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      swiperOptions: {
        loop: true,
        direction: "vertical",
        slidesPerView: 3,
        autoplay: {
          delay: 1000 //1秒切换一次
        }
        // Some Swiper option/callback...
      },
      MultipleChoice: [
        {
          name: "备选项",
          checked: false,
          Quantity: "6000本"
        },
        {
          name: "备选项",
          checked: false,
          Quantity: "6000本"
        },
        {
          name: "备选项",
          checked: false,
          Quantity: "6000本"
        },
        {
          name: "备选项",
          checked: false,
          Quantity: "6000本"
        },
        {
          name: "备选项",
          checked: false,
          Quantity: "60本"
        }
      ],

      currentRate: 0,
      gradientColor: {
        "0%": "#FF8068",
        "100%": "#FF5665"
      }
    };
  },
  watch: {},
  methods: {
    // 去捐赠
    Donation() {
      Toast("去捐赠");
      this.$router.push(this.fun.getUrl("ReservationInformation", {}));
    },
    //   返回上一层
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "%";
    },
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background: #fcfcfc;
  height: 100%;
  position: relative;
  // 导航
  /deep/.van-nav-bar {
    .van-icon {
      color: #979797;
    }
    .van-nav-bar__title {
      font-size: 1rem;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #121212;
      line-height: 1.5rem;
    }
    .van-nav-bar__right .van-nav-bar__text {
      color: #121212;
    }
  }

  .Intermediate {
    height: calc(100% - 46px);
    overflow: overlay;
    //   头部背景
    .headers {
      position: relative;
      height: 13.56rem;
      background-image: url("./img/3a3e43166d224f4af9ad845c1ef790529922d18b.jpg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .GeneralNeedle {
        width: 100%;
        position: absolute;
        top: 100%;
        transform: translateY(-50%);
        padding: 0 0.63rem;
        // 总需
        .GeneralContent {
          width: 100%;
          height: 7.13rem;
          background: #ffffff;
          box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
          border-radius: 0.38rem;
          padding: 0.75rem 1.25rem;
          .tit {
            font-size: 1rem;
            font-family: SourceHanSansSC-Medium, SourceHanSansSC;
            font-weight: 500;
            color: #333333;
            line-height: 1.5rem;
            text-align: left;
            margin-bottom: 0.94rem;
          }
          .le,
          .rig {
            display: inline-block;
          }
          .le {
            vertical-align: top;
            width: 60%;
            text-align: left;
            border-right: 0.06rem solid #e7e7e7;
            li {
              span:nth-child(1) {
                font-size: 0.75rem;
                font-family: SourceHanSansSC-Medium, SourceHanSansSC;
                font-weight: 500;
                color: #666666;
                line-height: 1.13rem;
                width: 50%;
                display: inline-block;
              }
              span:nth-child(2) {
                font-size: 1rem;
                font-family: SourceHanSansSC-Medium, SourceHanSansSC;
                font-weight: 500;
                color: #f15353;
                line-height: 1.5rem;
                width: 50%;
                display: inline-block;
              }
            }
          }
          .rig {
            width: 40%;
          }
        }
      }
    }
    // 布局
    .Layout {
      margin-top: 4rem;
      width: 100%;
      background-color: #fefefe;
      padding: 0 0.63rem;
      // 总的小标题
      .BookTop {
        text-align: left;
        margin-bottom: 0.63rem;
        span:nth-child(1) {
          font-size: 1rem;
          font-family: SourceHanSansSC-Medium, SourceHanSansSC;
          color: #333333;
          line-height: 1.5rem;
          font-weight: bold;
          margin-right: 0.63rem;
        }
        span:nth-child(2) {
          font-size: 0.69rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 1rem;
        }
      }
      // 项目介绍
      .ProjectIntroduction {
        background: #ffffff;
        box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
        border-radius: 0.38rem;
        text-align: left;
        margin-bottom: 0.63rem;
        padding: 0.75rem 1.25rem;
        span {
          display: block;
          font-size: 1rem;
          font-family: SourceHanSansSC-Medium, SourceHanSansSC;
          font-weight: bolder;
          color: #333333;
          line-height: 1.5rem;
        }
        p {
          font-size: 0.88rem;
          font-family: SourceHanSansSC-Normal, SourceHanSansSC;
          font-weight: 400;
          color: #333333;
          line-height: 1.25rem;
        }
      }
      // 所需书籍
      .RequiredBook {
        background: #ffffff;
        box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
        border-radius: 0.38rem;
        padding: 0.75rem 1.25rem;
        margin-bottom: 0.63rem;

        // 选框
        .Box {
          text-align: left;
          margin-bottom: 0.63rem;

          li {
            margin-bottom: 0.5rem;
            width: 50%;
            display: inline-block;
            text-align: center;

            /deep/.el-checkbox {
              width: 7.5rem;
              background-color: #f4f8f9;
              padding: 0;
              text-align: left;
              line-height: 2.5rem;
              .el-checkbox__input {
                display: none;
              }
              .el-checkbox__label {
                padding: 0;
                color: #999999;
                width: 100%;
                span:nth-child(1) {
                  padding-left: 0.5rem;
                  width: 50%;
                  display: inline-block;
                }
                span:nth-child(2) {
                  padding-right: 0.5rem;
                  width: 50%;
                  display: inline-block;
                  text-align: right;
                }
              }
            }

            /deep/.is-checked {
              border-color: #f15353;
              .el-checkbox__label {
                color: #f15353;
              }
            }
          }
        }
        // 步骤
        .Step {
          line-height: 2.25rem;
          height: 2.25rem;
          background: #f15353;
          border-radius: 0.38rem;
          color: #fff;
          .Item {
            display: inline-block;
            span:nth-child(1) {
              width: 0.88rem;
              height: 0.88rem;
              display: inline-block;
              background-color: #fff;
              border-radius: 50%;
              line-height: 0.88rem;
              margin-right: 0.31rem;
              font-size: 0.75rem;
              font-family: Roboto-Medium, Roboto;
              font-weight: 500;
              color: #f15353;
            }
            span:nth-child(2) {
              font-size: 0.75rem;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
            }
          }
          .Arrow {
            display: inline-block;
            margin: 0 0.95rem;
          }
        }
      }
      // 学校介绍
      .SchoolIntroduction {
        background: #ffffff;
        box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
        border-radius: 0.38rem;
        padding: 0.75rem 1.25rem;
        margin-bottom: 0.63rem;
        text-align: left;

        p {
          font-size: 0.88rem;
          font-family: SourceHanSansSC-Normal, SourceHanSansSC;
          font-weight: 400;
          color: #333333;
          line-height: 1.25rem;
          margin-bottom: 0.63rem;
        }
        img {
          width: 100%;
          margin-bottom: 0.63rem;
        }
      }
      // 发起机构
      .Initiator {
        background: #ffffff;
        box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
        border-radius: 0.38rem;
        padding: 0.75rem 1.5rem;
        margin-bottom: 0.63rem;
        text-align: left;
        .van-ellipsis {
          font-size: 0.88rem;
          font-family: SourceHanSansSC-Normal, SourceHanSansSC;
          font-weight: 400;
          color: #333333;
          line-height: 1.5rem;
        }
        .BookTop {
          margin-top: 1rem;
        }
      }
      // 赞助名单
      .SponsorList {
        background: #ffffff;
        box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
        border-radius: 0.38rem;
        padding: 0.75rem 1.5rem;
        margin-bottom:4.5rem;
        text-align: left;
        /deep/.mySwiper {
          height: 9rem;
          .swiper-slide {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            // 头像
            .Avatar {
              display: inline-block;
              img {
                width: 1.63rem;
                height: 1.63rem;
                border-radius: 50%;
              }
            }
            span {
              font-size: 0.75rem;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #333333;
              padding-top: 0.25rem;
            }
            span:nth-child(4) {
              color: red;
            }
            span:nth-child(5) {
              color: #999999;
            }
          }
        }
      }
    }
  }
  // 我要捐赠
  .IWantToDonate {
    margin-top: 1rem;
    width: 18.75rem;
    height: 2.25rem;
    background: #f15353;
    border-radius: 0.38rem;
    display: inline-block;
    font-size: 1rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 2.25rem;

    position: absolute;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    z-index: 9;
  }
}
</style>