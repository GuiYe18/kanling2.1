<!--
 * @Author:飞
 * @Date:2021-10-22 17:00:43
 * @LastEditTime: 2021-10-22 17:19:38
 * @FilePath: \you-shop1\src\views\A_version_1.1\OperationsCenter\DetailEarnings.vue
 * @Describe:
-->  
<template>
  <div class="content">
    <!--顶部-->
    <van-sticky>
      <van-nav-bar title="收益明细" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="UGC">
      <div class="item">
        <div class="left">
          <img src="./img/PromotionRecharge.png" alt="" />
          <span>区域广告费收益</span>
        </div>
        <div class="right">+600.00</div>
      </div>
      <div class="item">
        <div class="left">
          <img src="./img/pay.png" alt="" />
          <span>区域支付收益</span>
        </div>
        <div class="right">+600.00</div>
      </div>
      <div class="item">
        <div class="left">
          <img src="./img/onlineSales.png" alt="" />
          <span>区域线上销售收益</span>
        </div>
        <div class="right">+600.00</div>
      </div>
      <div class="item">
        <div class="left">
          <img src="./img/redPacket.png" alt="" />
          <span>抢红包收益</span>
        </div>
        <div class="right">+600.00</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    //   返回后退
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  // 顶部导航
  /deep/.van-nav-bar {
    border-bottom: 1px solid #edeeee;
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
  .UGC {
    .item {
      background-color: #fff;
      height: 3.69rem;
      border-bottom: 0.06rem solid #e9e9e9;
      .left {
        height: 100%;
        text-align: left;
        display: inline-block;
        width: 80%;
        img {
          width: 1.38rem;
          height: 1.38rem;
          margin: 0 0.63rem;
          vertical-align: text-top;
        }
        span {
          line-height: 3.69rem;
          font-size: 1rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
      }
      .right {
        text-align: right;
        display: inline-block;
        width: 20%;
        height: 100%;
        padding-right: 0.63rem;
        vertical-align: bottom;
        line-height: 3.69rem;
        font-size: 1rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
      }
    }
  }
}
</style>