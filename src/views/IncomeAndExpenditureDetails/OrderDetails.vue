<!--
 * @Author: 飞
 * @Date: 2021-05-24 14:30:28
 * @LastEditTime: 2021-06-21 18:00:42
 * @FilePath: \you-shop1\src\views\IncomeAndExpenditureDetails\OrderDetails.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <div class="Detail">
      <h1>来自-{{item.nickname}}</h1>
      <p>+{{item.trans_amount}}</p>
    </div>
    <div class="itemconten">
      <ul>
        <li class="detailItem">
          <div class="name">当前状态</div>
          <div class="value">已收款</div>
        </li>
        <li class="detailItem">
          <div class="name">收款时间</div>
          <div class="value">{{item.create_time}}</div>
        </li>
        <li class="detailItem">
          <div class="name">收款金额</div>
          <div class="value">{{item.trans_amount}}</div>
        </li>
        <li class="detailItem">
          <div class="name">交易订单号</div>
          <div class="value">20200404150000</div>
        </li>
        <li class="detailItem">
          <div class="name">交易说明</div>
          <div class="value">支付码收款</div>
        </li>
      </ul>
    </div>
    <!-- 退款 -->
    <!-- <div class="Refund" @click="Refund">退款</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      item:{},
    }
  },
  activated() {
    console.log(this.$route.query.item);
    this.item =   this.$route.query.item
  },
  methods: {
    Refund() {
      this.$router.push(this.fun.getUrl("RequestARefund", {}, { wwwwww: 13 }));
    }
  }
};
</script>

<style lang="scss" scoped>
/**
 * @Author: 飞
 * @Date: 2021-05-24 14:31:52
 * @Describe: 
 */
.content {
  // 明细
  .Detail {
    width: 100%;

    height: 136px;
    background: #ffffff;
    margin-bottom: 10px;
    h1 {
      font-size: 16px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #000000;
      line-height: 24px;
      padding-top: 26px;
      padding-bottom: 14px;
    }
    p {
      font-size: 40px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #000000;
      line-height: 60px;
    }
  }
  //细节
  .itemconten {
    width: 100%;
    height: 227px;
    background: #ffffff;
    .detailItem {
      padding-top: 20px;
      .name {
        display: inline-block;
        width: 50%;
        text-align: left;
        padding-left: 20px;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: #c0c1c2;
        line-height: 21px;
      }
      .value {
        width: 50%;
        display: inline-block;
        text-align: right;
        padding-right: 20px;

        font-size: 14px;
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: #000000;
        line-height: 21px;
      }
    }
  }
  // 退款
  .Refund {
    margin-top: 30px;
    width: 300px;
    height: 36px;
    background: #ffffff;
    border-radius: 3px;
    border: 1px solid #cccccc;
    display: inline-block;
    line-height: 36px;
  }
}
</style>