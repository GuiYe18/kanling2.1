<!--
 * @Author: 飞
 * @Date: 2021-08-19 13:56:09
 * @LastEditTime: 2021-09-15 11:22:20
 * @FilePath: \you-shop1\src\views\A_version_1.1\DonateBook\DonateBook.vue
 * @Describe: 
-->

<template>
  <div class="content">
    <van-nav-bar right-text="订单" title="光华公益书海工程" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />

    <van-search v-model="value" show-action placeholder="输入学校名称" @search="onSearch">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <section class="mainBody">
      <!-- 咨询 -->
      <div class="Question">
        <img src="./img/Questionimg.png" alt="" />
        <span>昨日赞助书籍5000本，已捐赠2万本</span>
      </div>
      <!-- list -->
      <div class="List">
        <van-notice-bar :scrollable="false" background="#fff7cc00" color="#FFFFFF" class="Bigcast">
          <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
            <van-swipe-item>
              <span>张**赞助了5本 1分钟前</span>
            </van-swipe-item>
            <van-swipe-item>
              <span>张**赞助了5本 1分钟前</span>
            </van-swipe-item>
            <van-swipe-item>
              <span>张**赞助了5本 1分钟前</span>
            </van-swipe-item>
          </van-swipe>
          <span data-v-4e9e0cf6="" style="position: absolute; width: 100%; left: 0; top: 0; height: 100%"></span>
        </van-notice-bar>

        <div class="bottom">
          <div class="van-ellipsis tit">河南省民权县北关镇北村小学</div>
          <div class="schedule">
            <div class="Progress">
              <p style="padding-top: 0.2rem">赞助图书进度</p>
              <p>5000/10000 本</p>
              <!-- <van-progress :percentage="50" color="#ee0a24" :show-pivot="false" /> -->
              <div class="progressBox">
                <div class="progressContent" :style="'width:' + 50 + '%;'"></div>
              </div>
            </div>
            <div class="GoSponsor">
              <span @click="GoSponsor">去赞助</span>
            </div>
          </div>
        </div>
      </div>

      <div class="List_Small">
        <div class="small_le">
          <img src="./img/3a3e43166d224f4af9ad845c1ef790529922d18b.jpg" alt="" />
        </div>
        <div class="small_ri">
          <div class="Small_top">
            <div class="van-ellipsis Small_top_tit">郑州市汝河新区小学</div>

            <van-notice-bar :scrollable="false" background="#fff7cc00" color="#FFFFFF" class="SmallRoundBroadcast">
              <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
                <van-swipe-item>
                  <span>张**赞助了5本 1分钟前</span>
                </van-swipe-item>
                <van-swipe-item>
                  <span>张**赞助了5本 1分钟前</span>
                </van-swipe-item>
                <van-swipe-item>
                  <span>张**赞助了5本 1分钟前</span>
                </van-swipe-item>
              </van-swipe>
              <span data-v-4e9e0cf6="" style="position: absolute; width: 100%; left: 0; top: 0; height: 100%"></span>
            </van-notice-bar>
          </div>
          <div class="Small_bottom">
            <div class="Small_Progress">
              <p>赞助图书进度</p>
              <p>5000/10000 本</p>
              <div class="progressBox">
                <div class="progressContent" :style="'width:' + 50 + '%;'"></div>
              </div>
            </div>
            <div class="Small_GoSponsor">
              <span @click="GoSponsor">去赞助</span>
            </div>
          </div>
        </div>
      </div>
      <div class="List_Small">
        <div class="small_le">
          <img src="./img/3a3e43166d224f4af9ad845c1ef790529922d18b.jpg" alt="" />
        </div>
        <div class="small_ri">
          <div class="Small_top">
            <div class="van-ellipsis Small_top_tit">郑州市汝河新区小学</div>

            <van-notice-bar :scrollable="false" background="#fff7cc00" color="#FFFFFF" class="SmallRoundBroadcast">
              <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
                <van-swipe-item>
                  <span>张**赞助了5本 1分钟前</span>
                </van-swipe-item>
                <van-swipe-item>
                  <span>张**赞助了5本 1分钟前</span>
                </van-swipe-item>
                <van-swipe-item>
                  <span>张**赞助了5本 1分钟前</span>
                </van-swipe-item>
              </van-swipe>
              <span data-v-4e9e0cf6="" style="position: absolute; width: 100%; left: 0; top: 0; height: 100%"></span>
            </van-notice-bar>
          </div>
          <div class="Small_bottom">
            <div class="Small_Progress">
              <p>赞助图书进度</p>
              <p>5000/10000 本</p>
              <div class="progressBox">
                <div class="progressContent" :style="'width:' + 50 + '%;'"></div>
              </div>
            </div>
            <div class="Small_GoSponsor">
              <span @click="GoSponsor">去赞助</span>
            </div>
          </div>
        </div>
      </div>
      <div class="List_Small">
        <div class="small_le">
          <img src="./img/3a3e43166d224f4af9ad845c1ef790529922d18b.jpg" alt="" />
        </div>
        <div class="small_ri">
          <div class="Small_top">
            <div class="van-ellipsis Small_top_tit">郑州市汝河新区小学</div>

            <van-notice-bar :scrollable="false" background="#fff7cc00" color="#FFFFFF" class="SmallRoundBroadcast">
              <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
                <van-swipe-item>
                  <span>张**赞助了5本 1分钟前</span>
                </van-swipe-item>
                <van-swipe-item>
                  <span>张**赞助了5本 1分钟前</span>
                </van-swipe-item>
                <van-swipe-item>
                  <span>张**赞助了5本 1分钟前</span>
                </van-swipe-item>
              </van-swipe>
              <span data-v-4e9e0cf6="" style="position: absolute; width: 100%; left: 0; top: 0; height: 100%"></span>
            </van-notice-bar>
          </div>
          <div class="Small_bottom">
            <div class="Small_Progress">
              <p>赞助图书进度</p>
              <p>5000/10000 本</p>
              <div class="progressBox">
                <div class="progressContent" :style="'width:' + 50 + '%;'"></div>
              </div>
            </div>
            <div class="Small_GoSponsor">
              <span @click="GoSponsor">去赞助</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    //去赞助
    GoSponsor() {
      this.$router.push(this.fun.getUrl("DonateItem", {}));
    },
    //   回车 /确认搜索
    onSearch(f) {
      Toast(this.value);
    },
    //   返回上一层
    onClickLeft() {
      this.$router.go(-1);
    },
    // 点击订单
    onClickRight() {
      this.$router.push(this.fun.getUrl("SponsoredList", {}));
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background: #fcfcfc;
  height: 100%;
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
  //   搜索
  .van-search {
    .van-search__action div {
      font-size: 0.88rem;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: #666666;
      line-height: 1.31rem;
    }
  }

  .mainBody {
    padding: 0.63rem;
    // 赞助快讯
    .Question {
      height: 1.63rem;
      background: #ffe9e9;
      border-radius: 0.38rem;
      text-align: left;
      margin-bottom: 0.63rem;
      img {
        height: 1.63rem;
        width: 5.81rem;

        vertical-align: top;
        margin-right: 0.8rem;
      }
      span {
        font-size: 12px;
        font-family: SourceHanSansSC-Medium, SourceHanSansSC;
        font-weight: 500;
        color: #f55c5c;
        line-height: 1.63rem;
      }
    }
    // 列表
    .List {
      height: 12.5rem;
      border-radius: 0.38rem;
      background-image: url("./img/3a3e43166d224f4af9ad845c1ef790529922d18b.jpg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 0.63rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      /deep/.Bigcast {
        background: #00000000 !important;
        .van-notice-bar__wrap {
          text-align: right;
          .van-notice-bar__content {
            width: 100%;
            .van-swipe-item {
              span {
                border-radius: 0.63rem;
                color: #ffffff;
                background: #000000a3;
                padding: 0.1rem 0.6rem;
              }
            }
          }
        }
        .notice-swipe {
          height: 40px;
          line-height: 40px;
        }
      }

      .bottom {
        border-radius: 0.38rem;
        text-align: left;
        margin: 0.63rem;
        .tit {
          font-size: 1.13rem;
          font-family: SourceHanSansSC-Medium, SourceHanSansSC;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.69rem;
          display: block;
          background: #00000045;
          margin-bottom: 0.2rem;
          display: inline-block;
          padding: 0.1rem 0.2rem;
        }
        // 底部内容
        .schedule {
          background: #ffffff;
          border-radius: 0.38rem;
          height: 3.8rem;
          // 进度左侧
          .Progress {
            width: 75%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 0.69rem;
            display: inline-block;
            // 进度
            .van-progress {
              height: 0.63rem;
            }
            p:nth-child(1) {
              font-size: 1rem;
              font-family: SourceHanSansSC-Medium, SourceHanSansSC;
              font-weight: 600;
              color: #333333;
            }

            p:nth-child(2) {
              font-size: 0.75rem;
              font-family: SourceHanSansSC-Medium, SourceHanSansSC;
              font-weight: 500;
              color: #333333;
              line-height: 1.13rem;
              text-align: right;
            }
            // 进度
            .progressBox {
              width: 100%;
              height: 0.63rem;
              background-color: #d9dadb;
              border-radius: 0.25rem;
              overflow: hidden;
              margin-top: 0.1rem;
              .progressContent {
                height: 0.63rem;
                background: linear-gradient(270deg, #ff6362 0%, #ff9465 100%);
                //  width:30%;
                border-radius: 0.25rem;
              }
            }
          }
          .GoSponsor {
            display: inline-block;
            width: 25%;
            text-align: center;
            vertical-align: super;
            span {
              width: 4rem;
              height: 1.5rem;
              background: #f15353;
              border-radius: 0.81rem;
              font-size: 0.75rem;
              font-family: SourceHanSansSC-Medium, SourceHanSansSC;
              font-weight: 500;
              color: #ffffff;
              line-height: 1.5rem;
              display: inline-block;
            }
          }
        }
      }
    }
    .List_Small {
      margin-bottom: 0.63rem;
      height: 6.88rem;
      background: #ffffff;
      box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
      border-radius: 0.38rem;
      padding: 0.63rem;
      .small_le {
        display: inline-block;
        width: 5.63rem;
        img {
          border-radius: 0.38rem;
          width: 5.63rem;
          height: 5.63rem;
        }
      }
      .small_ri {
        vertical-align: top;
        width: calc(100% - 5.63rem);
        display: inline-block;
        flex-direction: column;
        justify-content: center;
        padding-left: 0.5rem;
        text-align: left;
        .Small_top {
          margin-bottom: 0.75rem;
          position: relative;
          .Small_top_tit {
            font-size: 1.13rem;
            font-family: SourceHanSansSC-Medium, SourceHanSansSC;
            font-weight: 500;
            color: #333333;
            line-height: 1.69rem;
          }
          /deep/.SmallRoundBroadcast {
            color: rgb(255, 255, 255);
            background: #00000000 !important;
            position: absolute;
            top: -1rem;
            right: 0;
            width: 100%;
            padding: 0;
            .van-notice-bar__wrap {
              text-align: right;
              .van-notice-bar__content {
                width: 100%;
                .van-swipe-item {
                  span {
                    color: #ffffff;
                    background: #00000045;
                    padding: 0.1rem 0.6rem;
                    height: 1rem;
                    font-size: 0.63rem;
                    font-family: SourceHanSansSC-Medium, SourceHanSansSC;
                    font-weight: 500;
                    border-radius: 0.63rem;
                  }
                }
              }
            }
            .notice-swipe {
              height: 40px;
              line-height: 40px;
            }
          }
        }
        .Small_bottom {
          .Small_Progress {
            width: 65%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            display: inline-block;
            // 进度
            .van-progress {
              height: 0.38rem;
            }
            // 进度
            .progressBox {
              width: 100%;
              height: 0.38rem;
              background-color: #d9dadb;
              border-radius: 0.25rem;
              overflow: hidden;
              margin-top: 0.1rem;
              .progressContent {
                height: 0.38rem;
                background: linear-gradient(270deg, #ff6362 0%, #ff9465 100%);
                //  width:30%;
                border-radius: 0.25rem;
              }
            }
            p:nth-child(1) {
              font-size: 0.75rem;
              font-family: SourceHanSansSC-Medium, SourceHanSansSC;
              font-weight: 500;
              color: #ff9365;
              line-height: 1.13rem;
              margin-bottom: 0.25rem;
            }

            p:nth-child(2) {
              font-size: 0.63rem;
              font-family: SourceHanSansSC-Medium, SourceHanSansSC;
              font-weight: 500;
              color: #333333;
              line-height: 0.94rem;
              text-align: right;
              margin-bottom: 0.13rem;
            }
          }
          .Small_GoSponsor {
            display: inline-block;
            width: 35%;
            text-align: center;
            vertical-align: -webkit-baseline-middle;
            padding-left: 1rem;
            span {
              width: 4rem;
              height: 1.5rem;
              background: #f15353;
              border-radius: 0.81rem;
              font-size: 0.75rem;
              font-family: SourceHanSansSC-Medium, SourceHanSansSC;
              font-weight: 500;
              color: #ffffff;
              line-height: 1.5rem;
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>