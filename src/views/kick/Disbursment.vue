<template>
  <div class="content">
    <div class="top">
      <div class="disbursment">支付费用</div>
      <span class="DetailsOfPayment">请核对价格（参考：首重12.00元，续重6.00元）</span>
      <van-cell :border="false" title="基础运费" class="tit" />
      <div class="details">
        <van-cell :border="false" title="计费类型" value="按重量计费" />
        <van-cell :border="false" title="实际重量" value="1.00KG" />
        <van-cell :border="false" title="计费重量" value="1.00KG" />
        <van-cell :border="false" title="计重运费" value="12.00元" />
        <van-cell :border="false" title="快递员调价" value="0.00元" />
      </div>
      <!--  地址信息-->
      <div v-show="!show" class="addressInformation">
        <div class="addressLeft">
          <div class="addressLefttop">
            <span></span>
            <span>王先生</span>
            <span>北京 北京市</span>
          </div>
          <div class="addressLefttop">
            <span></span>
            <span>王先生</span>
            <span>浙江省 杭州市</span>
          </div>
        </div>
        <div class="addressright" @click="expansion"><van-icon name="arrow-down" /></div>
      </div>
      <!--  详细地址信息-->

      <div v-show="show" class="expansionaddress">
        <ul>
          <li>
            <div class="expansionLeft">物品类型</div>
            <div class="expansionright">日用品</div>
          </li>
          <li>
            <div class="expansionLeft">寄件地址</div>
            <div class="expansionright">
              王先生&#32;&#32; 13700000000 <br />
              北京市海淀区知春里
            </div>
          </li>
          <li>
            <div class="expansionLeft">收件地址</div>
            <div class="expansionright">
              李先生&#32;&#32; 13700000000 <br />
              北京市海淀区知春里65号卫星通信大厦A座10层10层还
            </div>
            <div class="van-hairline--top"></div>
          </li>
          <li>
            <div class="expansionLeft">订单编号</div>
            <div class="expansionright">订单编号&#32;&#32; 13700000000 <br /></div>
          </li>
          <li>
            <div class="expansionLeft">下单时间</div>
            <div class="expansionright">李先生&#32;&#32;</div>
            <div class="van-hairline--top"></div>
          </li>
          <li>
            <van-icon name="arrow-up" @click="closure" />
          </li>
        </ul>
        <!-- 上边框 -->
      </div>
      <!-- 微信支付 -->
      <van-submit-bar :price="3050" label="实际支付" button-text="微信支付" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    //   展开地址
    expansion() {
      this.show = true;
    },
    // 闭合地址
    closure() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  .top {
    width: 332px;
    height: 271px;
    display: inline-block;
    margin-top: 15px;
    background-image: url("../../assets/images/kick/ShapeCombination.png");
    background-size: 404px 271px;
    // 微信支付
    .van-submit-bar {
      .van-submit-bar__text {
        text-align: left;
      }
      .van-submit-bar__text > span:first-child {
        color: #333333;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        font-size: 10px;
        margin-right: 4px;
      }
    }
    // 地址信息
    .addressInformation {
      width: 332px;
      height: 74px;
      background: #ffffff;
      border-radius: 2px;
      margin-top: 45px;
      .addressLeft {
        height: 100%;
        width: 80%;
        display: inline-block;

        .addressLefttop {
          line-height: 30px;
          text-align: left;
          padding: 4px 13px;
          span:nth-child(1) {
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background-color: #e60416;
            display: inline-block;
            margin-right: 10px;
          }
          span:nth-child(2) {
            margin-right: 10px;
            font-size: 12px;
            font-weight: 500;
            color: #333333;
          }
          span:nth-child(3) {
            font-size: 12px;
            font-family: SourceHanSansCN-Normal, SourceHanSansCN;
            font-weight: 400;
            color: #999999;
          }
        }
        .addressLefttop:nth-child(2) {
          span:nth-child(1) {
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background-color: #fd9601;
            display: inline-block;
          }
        }
      }
      .addressright {
        height: 100%;
        width: 20%;
        float: right;
        line-height: 74px;
        color: #cccdce;
      }
      .addressrightto {
        height: 100%;
        width: 20%;
        float: right;
        line-height: 74px;
        color: #cccdce;
      }
    }
    .expansionaddress {
      padding: 14px;
      margin-top: 45px;
      width: 100%;
      background: #fff;
      li:last-child {
        text-align: center;
        padding-top: 10px;
      }
      li {
        text-align: left;
        .expansionLeft,
        .expansionright {
          display: inline-block;
        }
        .expansionLeft {
          margin-right: 14px;
          float: left;
          margin-top: 10px;

          font-size: 11px;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 500;
          color: #b2b3b4;
        }
        .expansionright {
          margin: 10px 0;

          font-size: 11px;
          font-family: SourceHanSansSC-Normal, SourceHanSansSC;
          font-weight: 400;
          color: #333333;

          max-width: 70%;
        }
      }
    }
    // 支付费用
    .disbursment {
      font-size: 16px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #333333;
      line-height: 22px;
      margin-top: 23px;
      margin-bottom: 11px;
    }
    // 支付明细
    .DetailsOfPayment {
      font-size: 12px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #999999;
      line-height: 18px;
    }
    // 基础运费
    .tit {
      padding-top: 39px;
      font-size: 14px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #333333;
      line-height: 20px;
      letter-spacing: 1px;
      padding-bottom: 0;
      .van-cell__title {
        text-align: left;
      }
    }
    // 明细清单
    .details {
      .van-cell {
        padding-top: 0;
        padding-bottom: 0;
        font-size: 12px;
        color: #999999;
        .van-cell__title {
          text-align: left;
          color: #969799;
        }
      }
    }
  }
}
</style>