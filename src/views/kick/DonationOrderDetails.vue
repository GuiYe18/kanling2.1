<!--
 * @Author: 飞
 * @Date: 2021-07-01 16:29:13
 * @LastEditTime: 2021-08-12 13:32:15
 * @FilePath: \you-shop1\src\views\kick\DonationOrderDetails.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <!-- {{$route.query.item}} -->

    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />

    <div class="bj">
      <p class="reason" v-show="dataItem.status == -1">买家取消支付，交易失败</p>
      <p class="reason" v-show="dataItem.status == 0">买家拍下，等待付款</p>
      <p class="reason" v-show="dataItem.status == 1">待发货</p>
      <p class="reason" v-show="dataItem.status == 2">已发货</p>
      <p class="reason" v-show="dataItem.status == 3">交易完成</p>
      <p class="reason" v-show="dataItem.status == 4">预约详情</p>

      <div class="orderCenter">
        <!--  -->
        <div class="orderCenter_l">
          <div class="orderImg">
            <img :src="`https://kl.minpinyouxuan.com/static/upload/` + dataItem.thumb" alt="" />
          </div>
          <div class="orderName">
            <span class="orderNameItem van-multi-ellipsis--l2">{{ dataItem.title }}</span>
            <p>X{{ dataItem.goods_total }}</p>
          </div>
          <!-- <div class="orderCenterRight">
                      <span>4</span><br />
                      <span>4</span><br />
                    </div> -->
        </div>
        <div class="orderCenter_B">
          <div class="Left">
            <p>商品总价</p>
            <p>运费</p>
          </div>
          <div class="RIGHT">
            <p>¥{{ dataItem.price }}</p>
            <p>¥{{ dataItem.dispatch_price }}</p>
          </div>
        </div>
      </div>
      <!-- 收货地址 -->
      <div class="ShippingAddress">
        <div class="ShippingAddressLeft">
          <span class="TOP">收件地址：</span>
          <span class="TOP">{{ deliveryAnformation.realname }}</span>
          <span class="TOP">{{ deliveryAnformation.mobile }}</span><br />
          <span class="BOt">{{ deliveryAnformation.address }}</span>
        </div>
        <div class="ShippingAddressRight" @click="copy">
          <img src="./img/copy.png" alt="" />
          <!-- <span v-clipboard:copy="`姓名:` + dataItem.address.realname + `\n手机号:` + dataItem.address.mobile + `\n地址:` + dataItem.address.address" v-clipboard:success="onCopy">复制</span> -->
        </div>
      </div>
      <!-- 订单详情 -->
      <div class="orderDetails">
        <p class="p">订单信息</p>
        <p>买家用户名：{{ dataItem.nickname }}</p>
        <p>订单编号：{{ dataItem.order_sn }} <span v-clipboard:copy="dataItem.order_sn" v-clipboard:success="onCopy">复制</span></p>

        <p>交易时间：{{ created_at }}</p>
        <!-- <p v-show="dataItem.status == -1">交易时间：{{ created_at }}</p>
        <p v-show="dataItem.status == 0">交易时间：{{ created_at }}</p>
        <p v-show="dataItem.status == 1">交易时间：{{ PaymentOrderTime }}</p> -->
      </div>
      <!-- 处理事件 预约发货 -->
      <!-- <div class="HandleEvent">
        <div class="expect">
          <div v-show="dataItem.status == 1">
            <router-link :to="fun.getUrl('ShipByAppointment', {}, {})">预约发货</router-link>
          </div>
          <div v-show="dataItem.status == 2">查看物流</div>
          <div v-show="dataItem.status == 3">查看物流</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      PaymentOrderTime: "", //支付订单时间
      created_at: "", //提交订单时间

      dataItem: {}, //商品详情
      order_id: "", //商品id
      status: "", //商品状态 all全部，-1取消状态，0待付款，1为已付款，2为已发货，3为已完成,4为预约详情
      active: "",
      deliveryAnformation:{}
    };
  },
  created() {},
  activated() {
    console.log("this.$route.query.item", this.$route.query.order_id);
    this.order_id = this.$route.query.order_id;
    this.status = this.$route.query.status;
    this.active = this.$route.query.active;

    this.GetItemDetails();
  },
  methods: {
    // 后退
    onClickLeft() {
      this.$router.push(this.fun.getUrl("MyDonation", {}, { age: this.active }));
    },

    shijianc(lll) {
      var date = new Date(lll * 1000);

      console.log(date);

      var Y = date.getFullYear() + "-";
      var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
      var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // 物品详情

    GetItemDetails() {
      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v2/order_detail",
        data: {
          order_id: this.order_id,
          status: this.status
        }
      })
        .then(res => {
          if (res.data.result == 1) {
            that.dataItem = res.data.data;
            that.deliveryAnformation = res.data.data.address
            // 提交订单时间
            that.created_at = that.shijianc(res.data.data.created_at);
            // 支付订单时间
            that.PaymentOrderTime = that.shijianc(res.data.data.pay_time);
          }
          if (res.data.result == 0) {
            console.log(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    copy() {
      Toast("复制");
    },
    onCopy: function () {
      Toast({
        message: "复制成功"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  .bj {
    height: 156px;
    background: linear-gradient(90deg, #ff6362 0%, #ff9465 100%);
    .reason {
      font-size: 24px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #ffffff;
      line-height: 36px;
      text-align: left;
      padding-left: 14px;
      padding-top: 30px;
      padding-bottom: 20px;
    }

    .orderCenter {
      background-color: #fff;
      border-radius: 10px;
      display: block;
      margin: 0 10px;
      padding: 13px;
      text-align: start;
      .orderCenter_l {
        width: 100%;
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
      .orderCenter_B {
        padding-top: 8px;
        border-top: 1px dashed #999999;
        color: #999;
        P {
          line-height: 24px;
        }
        .Left {
          width: 50%;
          display: inline-block;
          text-align: left;
        }
        .RIGHT {
          width: 50%;
          display: inline-block;
          text-align: right;
        }
      }
    }
    // 收件地址
    .ShippingAddress {
      margin: 10px 10px;
      border-radius: 10px;
      background-color: #fff;
      .ShippingAddressLeft {
        display: inline-block;
        text-align: left;
        width: 80%;
        padding: 10px;
        span {
          line-height: 24px;
        }
        .TOP {
          font-size: 14px;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 500;
          color: #333333;
        }
        .TOP:nth-child(2) {
          margin-right: 10px;
        }
        .BOT {
          font-size: 12px;
          font-family: SourceHanSansCN-Normal, SourceHanSansCN;
          font-weight: 400;
          color: #999999;
          line-height: 18px;
        }
      }

      .ShippingAddressRight {
        img {
          width: 11px;
          height: 11px;
          vertical-align: middle;
        }
        width: 20%;
        float: right;
        margin-top: 10px;
        font-size: 12px;
        font-weight: 400;
        color: #333333;
      }
    }
    // 订单详情
    .orderDetails {
      margin: 10px 10px;
      border-radius: 10px;
      background-color: #fff;
      text-align: left;
      padding: 10px;
      .p {
        font-size: 14px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #333333;
        line-height: 21px;
      }
      p {
        font-size: 11px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #b2b3b4;
        line-height: 26px;
      }
      span {
        font-size: 12px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #333333;
        line-height: 18px;
      }
    }
    // 处理事件 预约发货
    .HandleEvent {
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
    }
  }
}
</style>