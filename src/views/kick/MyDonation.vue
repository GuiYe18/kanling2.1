<template>
  <div class="content">
    <van-sticky>
      <van-nav-bar title="我的订单" name="arrow-left" left-arrow @click-left="onClickLeft" />

      <van-tabs v-model="active" animated>
        <van-tab :title="item" v-for="(item, i) in listName" :key="i"> </van-tab>
      </van-tabs>
    </van-sticky>
    <section>
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="(item, i) in listdata" :key="i">
            <div class="order">
              <ul>
                <li class="orderItem">
                  <div class="orderTit">
                    <span class="orderNumber"><img :src="item.avatar" alt="" style="height: 24px; width: 24px; border-radius: 50%; margin-top: 8px" /></span>
                    <span class="orderNumberValue">{{ item.nickname }}</span>
                    <!-- status -->
                    <span v-show="item.status == 0" class="shippingStatus">待付款</span>
                    <span v-show="item.status == 1" class="shippingStatus">已付款</span>
                    <span v-show="item.status == 2" class="shippingStatus">已发货</span>
                    <span v-show="item.status == 3" class="shippingStatus">已完成</span>
                    <span v-show="item.status == '-1'" class="shippingStatus">买家取消支付，交易失败</span>
                  </div>
                </li>
                <li>
                  <router-link :to="fun.getUrl('DonationOrderDetails', {}, { order_id: item.order_id, status: item.status, active: active })">
                    <div class="orderCenter">
                      <div class="orderCenter_l">
                        <div class="orderImg">
                          <img :src="`https://kl.minpinyouxuan.com/static/upload/` + item.thumb" alt="" />
                        </div>
                        <div class="orderName">
                          <span class="orderNameItem van-multi-ellipsis--l2">{{ item.title }}</span>
                          <p>X{{ item.goods_total }}</p>
                        </div>
                        <!-- <div class="orderCenterRight">
                      <span>4</span><br />
                      <span>4</span><br />
                    </div> -->
                      </div>
                    </div>
                  </router-link>
                </li>
                <li>
                  <div class="outOfPocket">
                    <span>实收款: </span><span>{{ item.price }}</span>
                  </div>
                </li>

                <li>
                  <div class="expect">
                    <div>
                      <router-link :to="fun.getUrl('DonationOrderDetails', {}, { order_id: item.order_id, status: item.status })">查看详情</router-link>
                    </div>

                    <div v-if="active == 2 && item.sto_status == 0">
                      <router-link :to="fun.getUrl('ShipByAppointment', {}, { order_id: item.order_id, status: item.status })">预约发货</router-link>
                    </div>
                    <div v-if="active == 2 && item.sto_status == 1">
                      <router-link :to="fun.getUrl('BookingInfo', {}, { order_id: item.order_id })">预约详情</router-link>
                    </div>

                    <!-- <div v-if="active == 6">
                      <router-link :to="fun.getUrl('BookingInfo', {}, { order_id: item.order_id })">预约详情</router-link>
                    </div> -->
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      listName: ["全部", "待付款", "待发货", "已发货", "已完成", "退货退款"],
      active: this.$route.query.age * 1,
      isLoading: false,
      listdata: [],
      count: "", // 全部个数
      page: 0
    };
  },
  activated() {
    console.log("chongxin", this.active);

    this.active = this.$route.query.age * 1;
  },
  watch: {
    active: function (N, O) {
      console.log("N", N, O);
      this.finished = false;
      this.page = 1;

      let query = this.$router.history.current.query;
      let path = this.$router.history.current.path;
      //对象的拷贝
      let newQuery = JSON.parse(JSON.stringify(query));
      // 地址栏的参数值赋值
      newQuery.age = N;
      this.$router.push({ path, query: newQuery });

      if (N == 0) {
        this.GetDonatedOrders("all"); //全部
      }
      if (N == 1) {
        this.GetDonatedOrders("0"); //代付款
      }
      if (N == 2) {
        this.GetDonatedOrders("1"); //代发货
      }
      if (N == 3) {
        this.GetDonatedOrders("2"); //待收货
      }
      if (N == 4) {
        this.GetDonatedOrders("3"); //已完成
      }
      if (N == 5) {
        this.GetDonatedOrders("-1"); //退货退款
      }
    }
  },

  methods: {
    onLoad() {
      console.log("到底了", this.active, this.page);
      // if (this.page==1) {
      //   return
      // }
      setTimeout(() => {
        if (this.refreshing) {
          this.listdata = [];
          this.refreshing = false;
        }

        // for (let i = 0; i < 20; i++) {
        //   this.list.push(this.list.length + 1);
        // }

        if (this.active == 0) {
          this.LazyLoading("all"); //全部
        }
        if (this.active == 1) {
          this.LazyLoading("0"); //代付款
        }
        if (this.active == 2) {
          this.LazyLoading("1"); //代发货
        }
        if (this.active == 3) {
          this.LazyLoading("2"); //待收货
        }
        if (this.active == 4) {
          this.LazyLoading("3"); //已完成
        }

        // 加载状态结束
        this.loading = false;

        if (this.listdata.length >= this.count) {
          this.finished = true;
        }
      }, 1000);
    },

    LazyLoading(parameter) {
      this.page++;
      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v2/donation_order",
        data: {
          uid: JSON.stringify(JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid),
          status: parameter,
          page: this.page
        }
      })
        .then(res => {
          if (res.data.result == 1) {
            // console.log("res.data.data", res.data.data);
            if (res.data.data.lists.length != 0) {
              that.listdata.push.apply(that.listdata, res.data.data.lists);
            }
          }
          if (res.data.result == 0) {
            console.log(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**
     * @Author: 飞
     * @Date: 2021-07-01 14:20:07
     * @Describe:获取捐赠订单
     * @param n*o name
     * @param n*o title
     */
    GetDonatedOrders(parameter) {
      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v2/donation_order",
        data: {
          uid: JSON.stringify(JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid),
          status: parameter,
          page: this.page
        }
      })
        .then(res => {
          if (res.data.result == 1) {
            console.log("res.data.data", res.data.data);
            that.listdata = res.data.data.lists;
            that.count = res.data.data.count;
          }
          if (res.data.result == 0) {
            console.log(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 预约发货
    // shipByAppointment(){
    //   this.$router.push(this.fun.getUrl('shipByAppointment',{}));
    // },
    // 返回
    onClickLeft() {
      // Toast("返回");
      this.$router.push(this.fun.getUrl("DonationCenter", {}));
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
    background: #fff;
    margin: 10px 10px 0;
    border-radius: 12px;
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
        margin-left: 8px;
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
      span:nth-child(1) {
        color: #999999;
      }
      span:nth-child(2) {
        color: #e44e41;
      }
    }
    // 商品top
    .orderItem {
      padding: 0 13px;
      .orderTit {
        width: 100%;
        height: 40px;
        text-align: left;
        .orderNumber {
          vertical-align: sub;
          margin-right: 10px;
        }
        .orderNumberValue {
          vertical-align: super;
        }
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
          width: 80px;
          float: left;
          img {
            width: 80px;
            height: 80px;
          }
        }
        .orderName {
          float: left;
          margin-left: 10px;
          height: 60px;
          width: 230px;
          color: #333333;
          p {
            color: #333;
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