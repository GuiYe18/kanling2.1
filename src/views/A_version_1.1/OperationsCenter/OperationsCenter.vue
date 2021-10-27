<!--
 * @Author: 飞
 * @Date: 2021-10-21 17:34:31
 * @LastEditTime: 2021-10-27 10:54:52
 * @FilePath: \you-shop1\src\views\A_version_1.1\OperationsCenter\OperationsCenter.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <!-- 顶部   收益明细-->
    <van-sticky>
      <van-nav-bar title="山东省济南市运营中心" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 顶部 -->
    <div class="TopMessage">
      <div class="money">
        <span class="moneyTop">60278.48</span>
        <span class="moneyBottom">当前总资产(元)</span>
      </div>
      <div class="item">
        <div class="earnings" @click="ViewIncome(1)">
          <div class="HowMany">16.47</div>
          <div class="figure"><span>今日收益(元)</span><img src="./img/right.png" alt="" /></div>
        </div>
        <div class="earnings" @click="ViewIncome(2)">
          <div class="HowMany">16.47</div>
          <div class="figure"><span>昨日收益(元)</span><img src="./img/right.png" alt="" /></div>
        </div>
        <div class="earnings" @click="ViewIncome(3)">
          <div class="HowMany">16.47</div>
          <div class="figure"><span>本月收益(元)</span><img src="./img/right.png" alt="" /></div>
        </div>
      </div>
    </div>
    <!-- 分类 -->
    <div class="classification">
      <!--  -->
      <div class="level">
        <div class="claTop">
          <div class="left" @click="OnIndustryClassification" :class="Category == 1 ? 'active' : ''">
            <span>行业分类</span>
            <img src="./img/bottom.png" alt="" />
          </div>
          <div class="right" @click="OnIndustryRepresentatives" :class="Category == 2 ? 'active' : ''">
            <span>行业代表</span>
            <img src="" alt="" v-show="false" />
          </div>
        </div>
      </div>
      <div class="TheMainBody">
        <div class="item" v-show="Category == 1">
          <div class="secondTier">
            <div class="newHead">
              <div class="tit1">
                <div class="van-ellipsis tit"><img src="./img/stores.png" alt="" />张三杂货铺</div>
              </div>
              <div class="tit2">
                <div class="van-ellipsis tit"><img src="./img/city.png" alt="" />山东省济南市</div>
              </div>
            </div>
            <!-- 下半体 -->
            <div class="TheSecondHalfOfTheBody">
              <div class="top">
                <div class="left">
                  <div class="open1">合计收益</div>
                </div>
                <div class="right">
                  <span>80867.23元</span>
                </div>
              </div>
              <div class="top2">
                <div class="left">
                  <div class="open1">广告费收益</div>
                  <div class="open1">支付收益</div>
                  <div class="open1">线上销售收益</div>
                </div>
                <div class="right">
                  <span>96.67元</span>
                  <span>976.67元</span>
                  <span>9176.67元</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="representative" v-show="Category == 2">
          <div class="inTheNameOf">
            <div class="Top">
              <div class="TOPleft">
                <div class="van-ellipsis tit"><img src="./img/urban.png" alt="" />美容美发</div>
                <div class="van-ellipsis tit"><img src="./img/people.png" alt="" />张三</div>
              </div>
              <div class="TOPRight">
                <span @click="EditCommission">编辑提成</span>
              </div>
            </div>
            <div class="bottom">
              <div>本月收益：96.76元</div>
              <div>累计收益：96.76元</div>
            </div>
          </div>
          <div class="inTheNameOf">
            <div class="Top">
              <div class="TOPleft">
                <div class="van-ellipsis tit"><img src="./img/urban.png" alt="" />餐饮行业</div>
                <div class="van-ellipsis tit"><img src="./img/people.png" alt="" />李四</div>
              </div>
              <div class="TOPRight">
                <span @click="EditCommission">编辑提成</span>
              </div>
            </div>
            <div class="bottom">
              <div>本月收益：96.76元</div>
              <div>累计收益：96.76元</div>
            </div>
          </div>
        </div>
        <!-- 提成编辑 -->
        <van-dialog class="compile" v-model="show" :show-confirm-button="false" :close-on-click-overlay="Onoverlay">
          <div class="tit">编辑提成</div>
          <div class="EditContent">
            <div class="bein">请您为张三编辑提成</div>
            <div class="note">每项内容可自由分配，最底可分配为0%。</div>
            <div class="ABox">
              <div class="juan"><van-field v-model="ADValue" label="广告费收益" placeholder="0-30" />%</div>
              <div class="juan"><van-field v-model="PayValue" label="支付收益" placeholder="0-0.1" />%</div>
              <div class="juan"><van-field v-model="SalesValue" label="线上销售收益" placeholder="0-0.5" />%</div>
            </div>
          </div>
          <div class="commit" @click="GoSubmit">提交</div>
          <!-- 关闭按钮 -->
          <div class="OFF">
            <van-icon @click="Onoverlay" name="close" color="#FFFFFF" size="40" />
          </div>
        </van-dialog>
      </div>
    </div>
  </div>
</template>


<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      Category: "1", //1分类   2代表
      show: false,
      ADValue: "",
      PayValue: "",
      SalesValue: ""
    };
  },
  methods: {
    // 查看收益
    ViewIncome() {
      this.$router.push(this.fun.getUrl("DetailEarnings", {}));
    },

    // 初始化
    init() {
      this.ADValue = "";
      this.PayValue = "";
      this.SalesValue = "";
    },
    // 提交
    GoSubmit() {
      Toast("提交");
      this.show = false;
      this.init();
    },
    // 点击遮罩关闭
    Onoverlay() {
      this.show = false;
      this.init();
    },
    // 编辑提成
    EditCommission() {
      this.show = !this.show;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 点击代表
    OnIndustryRepresentatives() {
      this.Category = 2;
    },
    // 点击分类
    OnIndustryClassification() {
      this.Category = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  // 顶部导航
  /deep/.van-nav-bar {
    .van-icon {
      color: #666666;
    }
    .van-nav-bar__title {
      font-size: 13px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #666666;
      line-height: 20px;
    }
  }
  .TopMessage {
    width: 100%;
    height: 11.88rem;
    background: #4998fe;
    .money {
      text-align: left;
      padding: 0.94rem 0 0 0.69rem;
      .moneyTop {
        font-size: 2.88rem;
        font-family: ArialMT;
        color: #ffffff;
        line-height: 3.38rem;
        display: block;
      }
      .moneyBottom {
        font-size: 0.88rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 1.25rem;
        display: block;
      }
    }
    .item {
      width: 100%;
      margin-top: 2.5rem;
      display: flex;
      justify-content: space-around;
      .earnings {
        display: inline-block;
        text-align: left;
        .figure {
          display: flex;
          font-size: 0.88rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 1.25rem;
          img {
            margin-left: 0.2rem;
            width: 0.75rem;
            height: 0.75rem;
          }
        }
        .HowMany {
          font-size: 1.13rem;
          font-family: ArialMT;
          color: #ffffff;
          line-height: 1.31rem;
        }
      }
    }
  }
  .classification {
    .level {
      padding: 0.88rem 0.63rem;
      .claTop {
        width: 100%;
        height: 2.75rem;
        // border: 1px solid #bcbbbb;
        box-sizing: border-box;
        border-radius: 0.5rem;
        .left {
          width: 50%;
          display: inline-block;
          height: 100%;
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
          border: 1px solid #bcbbbb;
          border-right: 0;
          img {
            width: 0.81rem;
            height: 0.56rem;
            display: inline-block;
          }
          span {
            height: 2.75rem;
            line-height: 2.75rem;
            font-size: 1.13rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            margin-right: 0.2rem;
          }
        }
        .right {
          width: 50%;
          display: inline-block;
          height: 100%;
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border: 1px solid #bcbbbb;
          border-left: 0;
          img {
            display: inline-block;
          }
          span {
            height: 2.75rem;
            line-height: 2.75rem;
            font-size: 1.13rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            margin-right: 0.2rem;
          }
        }
        .active {
          background-color: #4998fe;
          border: 1px solid #4998fe;

          span {
            color: #fff;
          }
        }
      }
    }
  }
  // 主体
  .TheMainBody {
    //行业分类
    .item {
      width: 100%;
      display: inline-block;
      margin-bottom: 1rem;
      text-align: left;
      padding: 0 0.63rem;
      .secondTier {
        background-color: #fff;
        border-radius: 0.38rem;
        padding-bottom: 0.1rem;
        box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.08);
        .newHead {
          height: 3rem;
          border-bottom: 1px solid #e6e6e6;
          display: inline-flex;
          align-items: center;
          width: 100%;
          .tit1 {
            display: inline-block;
            width: 40%;
          }
          .tit2 {
            width: 60%;
            display: inline-block;
          }
          img {
            width: 1rem;
            height: 1rem;
            margin: 0 0.31rem 0 0.63rem;
            vertical-align: middle;
          }
          .tit {
            font-size: 1rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #333333;
            line-height: 1.5rem;
          }
        }
        // 下半体
        .TheSecondHalfOfTheBody {
          .top {
            .left {
              width: 60%;
              display: inline-block;
              text-align: left;
              margin-top: 0.2rem;
              .open1 {
                display: inline-flex;
                align-items: center;
                width: 100%;
                font-size: 1rem;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #666666;
                line-height: 1.5rem;
                margin: 0.56rem 1rem;
              }
            }
            .right {
              text-align: right;
              width: 40%;
              display: inline-block;
              span {
                font-size: 1rem;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #ff9f3c;
                line-height: 1.5rem;
                margin-right: 0.63rem;
              }
            }
          }
          .top2 {
            background: #f0f6ff;
            border-radius: 0.25rem;
            margin: 0.44rem 0.25rem;
            padding: 0.63rem 0.75rem;
            margin-top: 0;
            .left {
              width: 60%;
              display: inline-block;
              text-align: left;
              .open1 {
                font-size: 0.88rem;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #999999;
                line-height: 1.31rem;
                margin-bottom: 0.63rem;
              }
            }
            .right {
              text-align: right;
              width: 40%;
              display: inline-block;
              span {
                font-size: 0.88rem;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #666666;
                line-height: 1.31rem;
                margin-bottom: 0.63rem;
                display: block;
              }
            }
          }
        }
      }
    }
    // 行业代表
    .representative {
      padding: 0 0.63rem;
      width: 100%;
      .inTheNameOf {
        width: 100%;
        background: #ffffff;
        box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.08);
        border-radius: 0.38rem;
        margin-bottom: 0.63rem;
        .Top {
          height: 4.44rem;
          display: flex;
          border-bottom: 0.06rem solid #e6e6e6;
          padding-top: 0.54rem;
          .TOPleft {
            width: 70%;
            text-align: left;
            padding-left: 0.63rem;
            height: 100%;
            display: inline-grid;
            .tit {
              img {
                width: 1rem;
                height: 1rem;
                margin-right: 0.31rem;
              }
              font-size: 1rem;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #333333;
              line-height: 2rem;
            }
          }
          .TOPRight {
            display: inline-block;
            width: 30%;
            text-align: right;
            padding-right: 0.63rem;
            height: 100%;
            span {
              width: 4.81rem;
              height: 1.75rem;
              border-radius: 0.38rem;
              border: 0.06rem solid #378dfe;
              font-size: 0.88rem;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #378dfe;
              line-height: 1.75rem;
              display: inline-block;
              text-align: center;
              margin-top: 1.3rem;
            }
          }
        }
        .bottom {
          div {
            display: inline-block;
            width: 50%;
            font-size: 0.88rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #999999;
            line-height: 1.31rem;
          }
          div:nth-child(1) {
            text-align: left;
            padding: 0.94rem 0 1.13rem 1rem;
          }
          div:nth-child(2) {
            text-align: left;
            padding: 0.94rem 0 1.13rem 1rem;
          }
        }
      }
    }
    /deep/.van-dialog {
      overflow: inherit !important;
    }
    /deep/.compile {
      position: absolute;
      width: 80%;
      border-radius: 6px;
      .tit {
        background-color: #4998fe;
        width: 100%;
        font-size: 1.38rem;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #ffffff;
        line-height: 4rem;
        border-top-left-radius: 0.4rem;
        border-top-right-radius: 0.4rem;
      }
      .EditContent {
        .bein {
          font-size: 15px;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 500;
          color: #4998fe;
          line-height: 1.5rem;
          margin-top: 0.2rem;
        }
        .note {
          font-size: 0.75rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #333333;
          line-height: 1.13rem;
          margin-bottom: 1.25rem;
        }
        .ABox {
          display: inline-block;
          .juan {
            margin-bottom: 0.63rem;
            width: 80%;
            display: inline-block;
            .van-cell {
              margin-right: 0.4rem;
              width: 90%;
              border: 1px solid #d7d7d7;
              display: inline-flex;
            }
          }
        }
      }
      .commit {
        font-size: 1.25rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #ffffff;
        line-height: 2.5rem;
        width: 8.88rem;
        height: 2.5rem;
        background-color: #4998fe;
        border-radius: 4px;
        margin-top: 2.25rem;
        display: inline-block;
      }
      .OFF {
        bottom: -4rem;
        position: relative;
      }
    }
  }
}
</style>