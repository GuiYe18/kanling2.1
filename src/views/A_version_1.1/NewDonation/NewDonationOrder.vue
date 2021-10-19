<!--
 * @Author: 飞
 * @Date: 2021-09-06 17:36:15
 * @LastEditTime: 2021-10-11 18:42:44
 * @FilePath: \you-shop1\src\views\A_version_1.1\NewDonation\NewDonationOrder.vue
 * @Describe: 
-->
<template>
  <div class="content" ref="box">
    <van-sticky>
      <van-nav-bar title="我的订单" name="arrow-left" left-arrow @click-left="onClickLeft" />

      <van-tabs v-model="active" animated @click="goClassification">
        <van-tab :title="item" v-for="(item, i) in listName" :key="i"> </van-tab>
      </van-tabs>
    </van-sticky>
    <section class="core">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="(item, i) in listdata" :key="i">
            <div class="order">
              <ul>
                <li class="orderItem">
                  <div class="orderTit">
                    <span class="orderNumber"><img :src="item.avatar" alt="" style="height: 24px; width: 24px; border-radius: 50%; margin-top: 8px" /></span>
                    <span class="orderNumberValue">{{ item.nickname }}</span>
                    <span v-show="item.status == 1" class="shippingStatus">代发货</span>
                    <span v-show="item.status == 2" class="shippingStatus">已发货</span>
                    <span v-show="item.status == 3" class="shippingStatus">已完成</span>
                    <span v-show="item.status == -1" class="shippingStatus">已完成</span>
                  </div>
                </li>
                <li>
                  <router-link :to="fun.getUrl('NewDonationOrderDetails', {}, { order_id: item.order_id, status: item.status, active: active })">
                    <div class="orderCenter">
                      <div class="orderCenter_l">
                        <div class="orderImg">
                          <img :src="`https://kl.minpinyouxuan.com/static/upload/` + item.thumb" alt="" />
                        </div>
                        <div class="orderName">
                          <span class="orderNameItem van-multi-ellipsis--l2">{{ item.title }}</span>
                          <p>X{{ item.goods_total }}</p>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </li>
                <li>
                  <div class="outOfPocket">
                    <span>实收款: </span><span>{{ item.price }}</span>
                  </div>
                </li>
                <!-- 订单的底部导航 -->
                <li>
                  <div class="expect">
                    <div>
                      <router-link :to="fun.getUrl('NewDonationOrderDetails', {}, { order_id: item.order_id, status: item.status })">查看详情</router-link>
                    </div>
                    <div v-if="(active == 0 && item.status == 1) || active == 1">
                      <router-link :to="fun.getUrl('NewShipByAppointment', {}, { order_id: item.order_id, status: item.status })">预约发货</router-link>
                    </div>
                    <div v-if="active == 1 && item.status == 2">
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
    <!-- 技术支持 -->
    <div :class="TechnicalSupportForTheStyle ? 'footer' : 'footer_fa'">
      <EyebrowEnd />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import EyebrowEnd from "./EyebrowEnd";
const documentElement = document.documentElement;
const body = document.body;
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      listName: ["全部", "待发货", "已发货", "已完成"],
      active: this.$route.query.age * 1,
      isLoading: false,
      listdata: [],
      count: "", // 全部个数
      page: 0,
      TechnicalSupportForTheStyle: true, // true 未超出  false 超出
      timing: "" //存放定时器
    };
  },
  components: {
    EyebrowEnd
  },
  created() {
    //
    console.log("创建对象创建vue对象时");
  },
  activated() {
    console.log("首次加载进来   组件激活");
    // 第几个
    this.active = this.$route.query.age * 1;
    this.page = 0;
    // 开始计算高度
    this.CalculateHeight();
  },
  watch: {
    active: function (N, O) {
      // this.listdata = [];
      // console.log("N", N, O);
      // this.activeNotState = false;
      // // if (this.activeNotState) {
      // // }
      // if (N == 0) {
      //   this.$router.push(this.fun.getUrl("NewDonationOrder", {}, { age: 0 }));
      // }
      // if (N == 1) {
      //   this.$router.push(this.fun.getUrl("NewDonationOrder", {}, { age: 1 }));
      // }
      // if (N == 2) {
      //   this.$router.push(this.fun.getUrl("NewDonationOrder", {}, { age: 2 }));
      // }
      // if (N == 3) {
      //   this.$router.push(this.fun.getUrl("NewDonationOrder", {}, { age: 3 }));
      // }
      // console.log("结束跳转");
    },
    // 2021年10月11日18:39:22
    $route: function (N, O) {
      console.log("N,O", N, O);
      if (N.name == "NewDonationOrder" && O.name == "NewDonationOrder") {
        // 清除定时器
        clearInterval(this.timing);
      }
      if (N.name == "NewDonation" && O.name == "NewDonationOrder") {
        // 清除定时器
        clearInterval(this.timing);
      }
    }
  },
  methods: {
    // 计算高度
    CalculateHeight() {
      this.timing = setInterval(() => {
        if (this.$refs.box.clientHeight > this.getClientHeight()) {
          this.TechnicalSupportForTheStyle = false;
        } else {
          this.TechnicalSupportForTheStyle = true;
        }
      }, 500);
    },
    //获取文档完整的高度
    getScrollHeight() {
      return Math.max(body.scrollHeight, documentElement.scrollHeight);
    },
    //获取当前可视范围的高度
    getClientHeight() {
      var clientHeight = 0;
      if (body.clientHeight && documentElement.clientHeight) {
        clientHeight = Math.min(body.clientHeight, documentElement.clientHeight);
      } else {
        clientHeight = Math.max(body.clientHeight, documentElement.clientHeight);
      }
      return clientHeight;
    },
    //点击标签进行跳转
    goClassification(name, title) {
      console.log("点击的是第几个标签", name, title);
      // return
      if (name == 0) {
        this.$router.push(this.fun.getUrl("NewDonationOrder", {}, { age: 0 }));
      }
      if (name == 1) {
        this.$router.push(this.fun.getUrl("NewDonationOrder", {}, { age: 1 }));
      }
      if (name == 2) {
        this.$router.push(this.fun.getUrl("NewDonationOrder", {}, { age: 2 }));
      }
      if (name == 3) {
        this.$router.push(this.fun.getUrl("NewDonationOrder", {}, { age: 3 }));
      }
    },
    // //首次加载数据
    // FirstTrigger() {
    //   this.listdata = [];
    //   this.page = this.page + 1;
    //   console.log("首次", this.active, this.page);
    //   if (this.active == null) {
    //     return;
    //   }
    //   if (this.active == 0) {
    //     this.LazyLoading("all"); //全部
    //   }
    //   if (this.active == 1) {
    //     this.LazyLoading("1"); //代发货
    //   }
    //   if (this.active == 2) {
    //     this.LazyLoading("2"); //待收货
    //   }
    //   if (this.active == 3) {
    //     this.LazyLoading("3"); //已完成
    //   }
    // },
    // 到底了
    onLoad() {
      this.page = this.page + 1;
      console.log("到底了", this.active, this.page);
      if (this.active == 0) {
        this.LazyLoading("all"); //全部
      }
      if (this.active == 1) {
        this.LazyLoading("1"); //代发货
      }
      if (this.active == 2) {
        this.LazyLoading("2"); //待收货
      }
      if (this.active == 3) {
        this.LazyLoading("3"); //已完成
      }
      console.log("加载中");
    },

    LazyLoading(parameter) {
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
            that.count = res.data.data.count;
            if (res.data.data.lists.length != 0) {
              that.listdata.push.apply(that.listdata, res.data.data.lists);
              console.log("首次获取的数据是 ", that.listdata);
            }
            that.isLoading = false;
            that.loading = false;

            if (that.listdata.length >= that.count) {
              console.log("this.listdata.length,", that.listdata.length);
              console.log("this.count", that.count);
              that.finished = true;
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

    // 预约发货
    // shipByAppointment(){
    //   this.$router.push(this.fun.getUrl('shipByAppointment',{}));
    // },
    // 返回
    onClickLeft() {
      // Toast("返回");
      this.$router.push(this.fun.getUrl("NewDonation", {}));
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        // 清空列表数据
        this.listdata = [];
        this.page = 0;
        // 重新加载数据
        this.onLoad();
      }, 1000);
    }
  },
  beforeDestroy() {
    console.log("销毁前");
  },
  deactivated() {
    console.log("销毁后");
  }
  // destroyed() {
  //   alert("实例已销毁");
  // }
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
  // /deep/.van-tabs {
  //   /deep/.van-tabs__content {
  //     height: calc(100% - 44px);
  //     /deep/.van-tab__pane {
  //     }
  //   }
  // }
  .core {
    height: calc(100% - 90px);
    /deep/.van-pull-refresh {
      .van-pull-refresh__track {
        height: 100%;
      }
    }
  }
  // 技术支持
  .footer {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 100%;
  }
}
</style>