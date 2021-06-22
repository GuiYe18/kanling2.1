<template>
  <div class="content" @click="ppp">
    <div class="top">
      <div class="topleft">
        <img src="../../assets/images/goods/contribution_Img.png" alt="" />
      </div>
      <div class="topright">
        <span> 科技有限公司 </span><br />
        <span><span class="key">门店</span>科技有限公司</span>
      </div>
    </div>
    <div class="input">
      <span>金额</span>
      <van-field readonly clickable :value="value" label="￥" placeholder="请输入付款金额" />
    </div>
    <van-number-keyboard :show="show" v-model="value" theme="custom" extra-key="." close-button-text="完成" @blur="ok" @input="onInput" @delete="onDelete" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      value: "", //付款金额
      douhao: false,
      jianpan: false,
      waijianpan: false,
      cishu: 0,
      payType: "" //区分商户支付的方式   5-浏览器   1-微信浏览器    8-支付宝浏览器
    };
  },
  watch: {
    //
    cishu: function (N, O) {
      if (N == 2 || O == 1) {
        this.pay();
        this.cishu = 0;
      }
    },
    jianpan: function (N, O) {
      setTimeout(() => {
        if (this.jianpan == true || this.waijianpan == false) {
          this.cishu = this.cishu + 1;
        }
      }, 150);
      this.waijianpan = false;
      this.jianpan = false;
    },

    value: function (N, O) {
      //    有逗号  逗号后只保留 两位
      if (this.douhao) {
        this.value = Number(this.value.toString().match(/^\d+(?:\.\d{0,2})?/)).toString();
      }
      // 判断从第二个字符开始   后面只保留两位
      if (N.substr(1).includes(".")) {
        this.douhao = true;
      } else {
        this.douhao = false;
      }

      //  判断重第二个字符开始   后面只保留两位
      if (N.toString().length >= 2) {
        if (N.substring(1, 2) != ".") {
          if (N.substring(0, 1) == "0") {
            this.value = N.substr(1);
          }
        }
      }
      //   判断第一个输入 的是不是点  如果是就改成0.几
      if (N.substring(0, 1) == ".") {
        this.value = "0" + N;
      }
    }
  },
  mounted() {
    this.query();
    // this.geterweima()
  },

  methods: {
    // 支付
    pay() {
      var aData = new Date();
      var TRN_TX_LOGNO = "";
      var month = "";
      var day = "";
      // TRN_TX_LOGNO = aData.getFullYear();
      var timestamp = ""; //时间戳
      timestamp = aData.getTime();
      if ((aData.getMonth() + 1).toString().length == 1) {
        month = "0" + (aData.getMonth() + 1);
      }
      if (aData.getDate().toString().length == 1) {
        day = "0" + aData.getDate();
      }
      TRN_TX_LOGNO = aData.getFullYear() + month + day;

      // 支付类型

      if (this.payType == "1") {
        window.location.href =
          `http://zf.minpinyouxuan.com/scantopay/pay?TRADE_CODE=PASM20&TX_OUT_CHANNEL=WZPA&TX_PAY_TYPE=PA031&TRN_TX_LOGNO=` +
          TRN_TX_LOGNO +
          `&TX_MOBILE_NO=19889999966&TX_ORDER_AMOUNT=` +
          this.value +
          `&TX_TRANS_DESC=商品描述&TX_BAG_THEME=商品名称&TX_IP=123.56.66.143&TRN_TX_DATE=20210504&TRN_TX_TIME=20135&TX_MER_ID=20210429102425536536&TX_MER_NAME=扫码支付测试&TX_AUTH_CODE=&TX_SUB_APPID=&TX_CALLBACK_URL=http://zf.minpinyouxuan.com/scantopay/payCallback&TX_SUB_OPENID=&TX_JUMP_URL=&TX_HBFQ_NUM=&TX_ORDER_EXPIRE=`;
      } else if (this.payType == "8") {
        window.location.href =
          `http://zf.minpinyouxuan.com/scantopay/pay?TRADE_CODE=PASM20&TX_OUT_CHANNEL=WZPA&TX_PAY_TYPE=PA032&TRN_TX_LOGNO=` +
          TRN_TX_LOGNO +
          `&TX_MOBILE_NO=19889999966&TX_ORDER_AMOUNT=` +
          this.value +
          `&TX_TRANS_DESC=商品描述&TX_BAG_THEME=商品名称&TX_IP=123.56.66.143&TRN_TX_DATE=20210504&TRN_TX_TIME=20135&TX_MER_ID=20210429102425536536&TX_MER_NAME=扫码支付测试&TX_AUTH_CODE=&TX_SUB_APPID=&TX_CALLBACK_URL=http://zf.minpinyouxuan.com/scantopay/payCallback&TX_SUB_OPENID=&TX_JUMP_URL=&TX_HBFQ_NUM=&TX_ORDER_EXPIRE=`;
      } else {
        window.location.href =
          `http://zf.minpinyouxuan.com/scantopay/pay?TRADE_CODE=PASM20&TX_OUT_CHANNEL=WZPA&TX_PAY_TYPE=PA032&TRN_TX_LOGNO=20170528134051&TX_MOBILE_NO=19889999966&TX_ORDER_AMOUNT=` +
          this.value +
          `&TX_TRANS_DESC=商品描述&TX_BAG_THEME=商品名称&TX_IP=123.56.66.143&TRN_TX_DATE=20210506&TRN_TX_TIME=201355&TX_MER_ID=20210429102425536536&TX_MER_NAME=扫码支付测试&TX_AUTH_CODE=&TX_SUB_APPID=&TX_CALLBACK_URL=http://zf.minpinyouxuan.com/scantopay/payCallback&TX_SUB_OPENID=&TX_JUMP_URL=&TX_HBFQ_NUM=&TX_ORDER_EXPIRE=`;
      }
    },

    //获取商户信息
    query() {
      this.payType = this.$route.query.type;
    },

    ok() {
      this.jianpan = true;
    },
    ppp() {
      this.waijianpan = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  .input {
    width: 90%;
    height: 100px;
    background-color: #fff;
    border-radius: 10px;
    display: inline-block;
    text-align: left;
    padding: 8px;
    /deep/.van-cell {
      padding-left: 0px;
      .van-cell__title {
        width: 9%;
        span {
          font-size: 24px;
          font-weight: bold;
          color: black;
        }
      }
    }
    span {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
      display: block;
    }
  }
  .top {
    text-align: left;
    padding: 60px 50px;
    padding-bottom: 20px;
    .topleft,
    .topright {
      display: inline-block;
      text-align: left;
      height: 100%;
      vertical-align: middle;
      .key {
        border-radius: 4px;
        background-color: #949494;
        color: #fff;
        padding: 0 4px;
        margin-right: 8px;
      }
    }
    .topleft {
      width: 72px;
      img {
        border-radius: 50%;
      }
    }
  }
}
</style>