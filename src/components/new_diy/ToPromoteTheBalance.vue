<template>
  <div id="balance">
    <!-- <c-title :hide="false" :text="integral ? integral : '积分'" tolink="integrallist" :totext="'查看明细'"></c-title> -->
    <!-- <c-title :hide="false" :text="'推广余额'" tolink="ToPromoteTheDetail" :totext="'查看明细'"></c-title> -->
    <van-sticky>
      <van-nav-bar title="推广余额" name="arrow-left" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 优化 ToPromoteTheBalance-->
    <div class="content">
      <div class="ResidualTop">
        <li class="balance_b">
          {{ tgmoney == null ? "0.00" : tgmoney }}
          <span>元</span>
        </li>
        <span>我的推广余额</span>
        <div class="function">
          <!-- <span>充值</span> -->
          <span @click="transferHandel">转赠</span>
        </div>
      </div>

      <div class="TheTitle">
        <van-tabs v-model="active" color="#368DFE" title-active-color="#368DFE">
          <van-tab title="全部">
            <van-list v-model="Allloading" :finished="AllFinished" finished-text="没有更多了" @load="AllOnLoad">
              <van-cell v-for="item in AllList" :key="item">
                <div class="item">
                  <div class="OnImg">
                    <img src="./img/rollOut.png" alt="" v-if="item.type == 2" />
                    <img src="./img/Received.png" alt="" v-if="item.type == 1" />
                  </div>
                  <div class="Ontext">
                    <div class="van-ellipsis roll" v-if="item.type == 2">转赠给{{ item.nickname }}</div>
                    <div class="van-ellipsis roll" v-if="item.type == 1">来自{{ item.nickname }}转赠</div>
                    <span class="time">{{ item.create_time }}</span>
                  </div>
                  <div class="OnMouny">
                    <span v-if="item.type == 1" class="add">+{{ item.money }}</span>
                    <span v-if="item.type == 2" class="reduce">-{{ item.money }}</span>
                  </div>
                </div>
              </van-cell>
            </van-list>
          </van-tab>
          <van-tab title="支出">
            <van-list v-model="Outlayloading" :finished="OutlayFinished" finished-text="没有更多了" @load="OutlayOnLoad">
              <van-cell v-for="item in OutlayList" :key="item" >
                <div class="item">
                  <div class="OnImg">
                    <img src="./img/rollOut.png" alt="" v-if="item.type == 2" />
                    <img src="./img/Received.png" alt="" v-if="item.type == 1" />
                  </div>
                  <div class="Ontext">
                    <div class="van-ellipsis roll" v-if="item.type == 2">转赠给{{ item.nickname }}</div>
                    <div class="van-ellipsis roll" v-if="item.type == 1">来自{{ item.nickname }}转赠</div>
                    <span class="time">{{ item.create_time }}</span>
                  </div>
                  <div class="OnMouny">
                    <span v-if="item.type == 1" class="add">+{{ item.money }}</span>
                    <span v-if="item.type == 2" class="reduce">-{{ item.money }}</span>
                  </div>
                </div>
              </van-cell>
            </van-list>
          </van-tab>
          <van-tab title="收入">
            <van-list v-model="Revenueloading" :finished="RevenueFinished" finished-text="没有更多了" @load="RevenueOnLoad">
              <van-cell v-for="item in RevenueList" :key="item" >
                <div class="item">
                  <div class="OnImg">
                    <img src="./img/rollOut.png" alt="" v-if="item.type == 2" />
                    <img src="./img/Received.png" alt="" v-if="item.type == 1" />
                  </div>
                  <div class="Ontext">
                    <div class="van-ellipsis roll" v-if="item.type == 2">转赠给{{ item.nickname }}</div>
                    <div class="van-ellipsis roll" v-if="item.type == 1">来自{{ item.nickname }}转赠</div>
                    <span class="time">{{ item.create_time }}</span>
                  </div>
                  <div class="OnMouny">
                    <span v-if="item.type == 1" class="add">+{{ item.money }}</span>
                    <span v-if="item.type == 2" class="reduce">-{{ item.money }}</span>
                  </div>
                </div>
              </van-cell>
            </van-list>
          </van-tab>
          <van-tab title="" disabled></van-tab>
          <van-tab title="" disabled></van-tab>
          <van-tab title="" disabled></van-tab>
          <van-tab title="" disabled></van-tab>
        </van-tabs>
      </div>
      <!-- <ul class="my_balance">
        <li class="balance_a">
          <i class="iconfont icon-wealth-b"></i> -->
      <!-- <span>我的{{ integral ? integral : "积分" }}</span> -->
      <!-- </li>
        <li class="balance_b">{{ tgmoney == null ? "0.00" : tgmoney }}</li>
      </ul> -->
      <!-- <ul class="list_box">
        <li @click="transferHandel">
          <i class="iconfont icon-balance_c"></i>转赠
          <i class="fa fa-angle-right"></i>
        </li>
      </ul> -->
    </div>
  </div>
</template>
<script>
// import cTitle from "components/title";
import cTitle from "../../components/title.vue";
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      credit1: 0.0,
      transfer: false, //是否开启转账
      integral: window.localStorage.integral,
      activity: false, //是否开启积分活动
      lan_name: "", //蓝牛积分名称
      lan_plugin: false, //蓝牛积分是否开启
      /**
       * @Author: 飞
       * @Date: 2021-10-18 18:36:16
       * @Describe: 推广余额
       */
      tgmoney: "",
      active: 0,

      AllList: [], //全部列表
      Allloading: false, //是否处于加载状态，加载过程中不触发load事件
      AllFinished: false, //是否已加载完成，加载完成后不再触发load事件
      OutlayList: [], //支出列表
      Outlayloading: false, //是否处于加载状态，加载过程中不触发load事件
      OutlayFinished: false, //是否已加载完成，加载完成后不再触发load事件
      RevenueList: [], //收入列表
      Revenueloading: false, //是否处于加载状态，加载过程中不触发load事件
      RevenueFinished: false, //是否已加载完成，加载完成后不再触发load事件
      page: 0, //第几页
      total_page: 0 //总页数
    };
  },
  watch: {},
  methods: {
    // 获取明细
    getIntegralInfo(typea) {
      // this.isLoadMore = true; //防止多次请求分页数据
      return axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v3/tgmoneylist",
        data: {
          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
          type: typea,
          page: this.page
        }
      });
    },
    // 全部
    async AllOnLoad() {
      // 异步更新数据
      const { data } = await this.getIntegralInfo("0");
      data.data.forEach(element => {
        this.AllList.push(element);
      });
      // 加载状态结束
      this.Allloading = false;
      // 数据全部加载完成
      // if (this.AllList.length >= 40) {
      this.AllFinished = true;
      // }
    },

    // 支出
    async OutlayOnLoad() {
      // 异步更新数据
      const { data } = await this.getIntegralInfo("2");
      data.data.forEach(element => {
        this.OutlayList.push(element);
      });

      // 加载状态结束
      this.Outlayloading = false;

      // 数据全部加载完成
      // if (this.OutlayList.length >= 40) {
      this.OutlayFinished = true;
      // }
    },

    // 收入
    async RevenueOnLoad() {
      // 异步更新数据
      const { data } = await this.getIntegralInfo("1");
      data.data.forEach(element => {
        this.RevenueList.push(element);
      });
      // 加载状态结束
      this.Revenueloading = false;

      // 数据全部加载完成
      // if (this.RevenueList.length >= 40) {
      this.RevenueFinished = true;
      // }
    },

    // 返回会员中心
    onClickLeft() {
      this.$router.push(this.fun.getUrl("member", {}));
    },
    /**
     * @Author: 飞
     * @Date: 2021-10-18 18:37:26
     * @Describe: 转账
     */
    //转账的响应方法
    transferHandel() {
      this.$router.push(
        this.fun.getUrl("ToPromoteTheBalance_TurnAdd", {
          i: this.toi
        })
      );
    },
    toIntegral() {
      this.$router.push(
        this.fun.getUrl("IntegralActivity", {
          integral: this.credit1,
          i: this.toi
        })
      );
    },
    toIntegralBlueCattle() {
      this.$router.push(
        this.fun.getUrl("integralBlueCattle", {
          integral: this.credit1,
          i: this.toi
        })
      );
    },

    getIntegral() {
      var that = this;
      $http
        .post("member.member.member-data", { v: 3 }, " ")
        .then(response => {
          if (response.result === 1) {
            that.tgmoney = response.data.member.tgmoney;
          }
        })
        .catch(err => {
          console.error(err);
          require("@/assets/css/member/02.scss");
        });
    }
  },

  activated() {
    this.toi = this.fun.getKeyByI();
    // 获取推广余额
    this.getIntegral();

    // this.fun.setWXTitle(this.integral);
  },
  components: { cTitle }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
// 导航
/deep/.van-nav-bar {
  .van-icon {
    color: #979797;
  }
  .van-nav-bar__title {
    font-size: 0.85rem;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #666666;
    line-height: 1.5rem;
  }
  .van-nav-bar__right .van-nav-bar__text {
    color: #121212;
  }
}
#balance {
  .content {
    // 余额上
    .ResidualTop {
      width: 100%;
      height: 9.63rem;
      background: #368dfe;
      .balance_b {
        padding-top: 1.13rem;
        font-size: 2.88rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 4.06rem;
        span {
          font-size: 1.13rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 1.56rem;
        }
      }
      span {
        font-size: 0.88rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 1.25rem;
      }
      .function {
        text-align: right;
        span {
          width: 3.69rem;
          height: 1.63rem;
          border-radius: 0.38rem;
          border: 0.06rem solid #ffffff;
          font-size: 1rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 1.38rem;
          display: inline-block;
          margin-right: 0.63rem;
          text-align: center;
          margin-top: 0.8rem;
        }
      }
    }
    // 明细
    .TheTitle {
      /deep/.van-tabs__wrap--scrollable{
        border-bottom: 1px solid #E9E9E9;
      }
      .van-cell {
        padding: 0;
      }
      .item {
        height: 3.2rem;
        display: flex;
        padding: 0 0.63rem;
        border-bottom: 1px solid #e9e9e9;
        margin-top: 0.6rem;
        .OnImg,
        .Ontext,
        .OnMouny {
          display: inline-block;
        }
        .OnImg {
          width: 10%;
          height: 100%;
          display: flex;
          img {
            width: 1.38rem;
            height: 1.38rem;
          }
        }
        .Ontext {
          height: 100%;
          width: 70%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          align-content: center;
          span {
            display: block;
          }
          .roll {
            font-size: 1rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
          }
          .time {
            font-size: 0.75rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
          }
        }
        .OnMouny {
          height: 100%;
          width: 20%;
          text-align: right;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .add {
            display: block;
            color: #f6776b;
          }
          .reduce {
            display: block;
            color: #83d99b;
          }
        }
      }
    }

    // .my_balance {
    //   background: #fff;
    //   padding: 0.625rem 0;

    //   .balance_a {
    //     line-height: 2.5rem;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;

    //     .icon-wealth-b {
    //       //   background: url("../../../assets/images/member/member_a(18).png") no-repeat center;
    //       background: url("../../assets/images/member/member_a(18).png") no-repeat center;
    //       background-size: 1.125rem;
    //       width: 1.125rem;
    //       height: 1.125rem;
    //       margin-right: 0.375rem;
    //     }

    //     .icon-wealth-b::before {
    //       content: "";
    //     }

    //     span {
    //       font-size: 14px;
    //     }
    //   }

    //   .balance_b {
    //     line-height: 3.75rem;
    //     font-size: 36px;

    //     small {
    //       font-size: 24px;
    //     }
    //   }
    // }

    // .list_box {
    //   background: #fff;

    //   //border-bottom: solid 0.0625rem #ebebeb;
    //   li {
    //     padding-left: 0.875rem;
    //     border-top: solid 0.0625rem #ebebeb;
    //     //border-bottom: solid 0.0625rem #ebebeb;
    //     padding-right: 0.875rem;
    //     display: flex;
    //     align-items: center;
    //     line-height: 2.875rem;
    //     font-size: 16px;
    //     position: relative;

    //     .icon-balance_a {
    //       color: #6cbf6a;
    //     }

    //     .icon-balance_b {
    //       color: #fac337;
    //     }

    //     .icon-balance_c {
    //       color: #069ce7;
    //     }

    //     .icon-balance_l {
    //       color: #f27435;
    //     }

    //     .iconfont {
    //       font-size: 2rem;
    //       margin-right: 0.375rem;
    //     }

    //     .fa {
    //       position: absolute;
    //       top: 0;
    //       right: 0.875rem;
    //       font-size: 1.5rem;
    //       color: #ccc;
    //       line-height: 2.875rem;
    //     }
    //   }

    //   li:last-child {
    //     border-bottom: solid 0.0625rem #ebebeb;
    //   }
    // }
  }
}

button {
  width: 90%;
  height: 2.875rem;
  font-size: 16px;
  margin-bottom: 12px;
}

i {
  font-size: 4.375rem;
  color: #ffd147;
}

.my-banlance {
  margin: 1.25rem 0;
  font-size: 14px;
  color: #333;
  line-height: 2rem;
}

.my-banlance span {
  font-size: 14px;
  color: #333;
  margin-top: 0.625rem;
}

.my-banlance span b {
  font-size: 24px;
}
</style>
