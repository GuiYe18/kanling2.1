<template>
  <div class="content">
    <van-nav-bar title="我的订单" name="arrow-left" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active" animated>
      <van-tab :title="item" v-for="(item, i) in listName" :key="i">
        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
          <div class="order">
            <ul>
              <li class="orderItem">
                <div class="orderTit">
                  <span class="orderNumber">订单号:</span>
                  <span class="orderNumberValue">SN785233333333369874</span>
                  <span class="shippingStatus">代发货</span>
                </div>
              </li>
              <li>
                <div class="orderCenter">
                  <div class="orderCenter_l">
                    <div class="orderImg">
                      <img src="../../assets/images/kick/四扶.png" alt="" />
                    </div>
                    <div class="orderName">
                      <span class="orderNameItem van-multi-ellipsis--l2"
                        >打死都不撒谎VB打死都不撒谎VB打死都不撒谎VB 癌生存爱好巴奴</span
                      >
                      <p>规格</p>
                    </div>
                    <div class="orderCenterRight">
                      <span>4</span><br />
                      <span>4</span><br />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="outOfPocket"><span>共一件 实付: </span><span>5</span></div>
              </li>
              <li>
                <div class="expect">
                  <div>
                    <router-link :to="fun.getUrl('ShipByAppointment', {})">预约发货</router-link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      listName: ["全部", "代付款", "代发货", "待收货", "已完成"],
      active: this.$route.query.age,
      isLoading: false,

    };
  },

  mounted() {
    console.log("ssssssssssss");
    // this.parse =  this.$route.params.userId
  },
  methods: {
    // 预约发货
    // shipByAppointment(){
    //   this.$router.push(this.fun.getUrl('shipByAppointment',{}));
    // },
    // 返回
    onClickLeft() {
      // Toast("返回");
      this.$router.push(this.fun.getUrl("member", {}));
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 1000);
      console.log("this.$route.params.userId", this.$route);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  // 订单
  .order {
    height: 190px;
    width: 100%;
    background: #fff;
    margin-top: 10px;
    // 预约发货
    .expect {
      text-align: end;
      padding: 10px 13px;
      div {
        height: 26px;
        width: 79px;
        border-radius: 6px;
        line-height: 26px;
        display: inline-block;
        text-align: center;
        border: 1px solid #ababab;
      }
    }
    // 实付
    .outOfPocket {
      display: inline-table;
      height: 20px;
      padding: 10px;
      text-align: end;
      width: 100%;
      border-bottom: 1px solid #e6e6e6;
      span {
        font-weight: bold;
      }
    }
    // 商品top
    .orderItem {
      padding: 0 13px;
      .orderTit {
        width: 100%;
        height: 40px;
        text-align: left;

        span {
          line-height: 36px;
          display: inline-flex;
        }
        .shippingStatus {
          float: right;
          color: #f15353;
        }
      }
    }
    // 商品Center
    .orderCenter {
      padding: 0 13px;
      text-align: start;
      .orderCenter_l {
        width: 100%;
        height: 60px;
        display: inline-block;
        .orderImg {
          width: 60px;
          float: left;
          img {
            width: 60px;
            height: 60px;
          }
        }
        .orderName {
          float: left;
          margin-left: 20px;
          height: 60px;
          width: 170px;

          p {
            color: #9c9c9c;
            font-size: 12px;
            margin-top: 4px;
          }
        }
      }
    }
    .orderCenterRight {
      float: right;
      // display: inline-block;
      // display: flex;
      span {
        display: inline-block;
      }
    }
  }
  // 顶部导航
  /deep/.van-nav-bar {
    .van-icon {
      color: #666666;
    }
    .van-nav-bar__title {
      width: 52px;
      font-size: 13px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #666666;
      line-height: 20px;
    }
  }
  /deep/.van-tabs {
    /deep/.van-tabs__content {
      height: calc(100% - 44px);
      /deep/.van-tab__pane {
        /deep/.van-pull-refresh {
          height: 100%;
        }
      }
    }
  }
}
</style>