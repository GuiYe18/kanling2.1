<template>
  <div class="content">
    <div class="top">
      <div class="topleft">
        <img src="../../assets/images/goods/contribution_Img.png" alt="" />
      </div>
      <div class="topright van-multi-ellipsis--l2">
        <span> {{ shop_name }} </span><br />
      </div>
    </div>
    <div class="input">
      <span>金额</span>
      <van-field readonly clickable :value="value" label="￥" placeholder="请输入付款金额" @touchstart.native.stop="show = true" class="value" />
      <van-field v-model="comment" placeholder="请输入留言(可选)" @touchstart.native.stop="show = false" />
    </div>
    <van-number-keyboard
      :large="large"
      theme="custom"
      :show="show"
      v-model="value"
      extra-key="."
      close-button-text="支付"
      @close="onConfirm"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    ></van-number-keyboard>
    <van-popup v-model="zhifubao_show" @close="closeprompt">
      <div class="fillInIphone">
        <div class="fillInIphone_top">
          <img src="./img/温馨提示.png" alt="" />
          <span>温馨提示</span>
        </div>
        <van-field v-model="phone" placeholder="请输入您真实手机号" input-align="right" />
        <div class="remind">
          <span>请输入您真实手机号,会得到相应的通兑积分!通兑积分可在看领商城购物!</span>
        </div>
        <!-- error-message="请输入您真实手机号,会得到相应的通兑积分!通兑积分可在看领商城购物!"  -->
        <div class="confirm" @click="confirm">确认</div>
      </div>
    </van-popup>
    <van-dialog v-model="confirmPayment_show" title="是否确认支付" show-cancel-button @confirm="close"> </van-dialog>
    <!-- <van-number-keyboard :show="commentShow" @blur="commentShow = false" @input="onInput" @delete="onDelete" /> -->
    <van-dialog v-model="showshowshow" :show-confirm-button="false" class="prompt">
      <h3>支付系统正在升级中</h3>
    </van-dialog>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      showshowshow: false,
      comment: "", //留言
      confirmPayment_show: false, //确认支付
      show: false, //   输入金额键盘显示
      value: "", //付款金额
      douhao: false,
      IP: "", //ip地址
      TX_MER_ID: "", //商户id
      uid: "", //消费uid
      shop_name: "", //商户名称
      timestamp: "", //时间戳
      TRN_TX_LOGNO: "", //日期
      PAYTYPE_item: "1", //支付类型   1为location.href  2.axios.get
      payType: "", //1 在什么平台
      // 微信公众号支付：PA031;
      // 支付宝支付：PA032;

      zhifubao_show: false, //如果是支付宝 环境
      phone: "" //获取手机号
    };
  },
  watch: {
    payType: function (N, O) {
      if (N == "8") {
        this.zhifubao_show = true;
      }
    },
    value: function (N, O) {
      //    有逗号  逗号后只保留 一位
      if (this.douhao) {
        this.value = Number(this.value.toString().match(/^\d+(?:\.\d{0,1})?/)).toString();
      }
      // 判断从第二个字符开始   后面只保留一位   开关
      if (N.substr(1).includes(".")) {
        this.douhao = true;
      } else {
        this.douhao = false;
      }

      //  判断重第二个字符开始
      if (N.toString().length >= 2) {
        if (N.substring(1, 2) != ".") {
          // 如果为零去除
          if (N.substring(0, 1) == "0") {
            this.value = N.substr(1);
          }
        }
      }
      // //   判断第一个输入 的是不是点  如果是就改成0.几
      if (N.substring(0, 1) == ".") {
        this.value = "0" + N;
      }
    }
  },
  mounted() {
    $http
      .post("member.member.member-data", { v: 2 }, " ")
      .then(response => {
        if (response.result === 0) {
          Toast(response.msg);
          require("@/assets/css/member/02.scss");
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.query();

    this.TX_MER_ID = this.$route.query.shop_id;
    this.shop_name = this.$route.query.shop_name;
    console.log("TX_MER_ID", this.TX_MER_ID);
  },
  created() {
    this.keyupSubmit();
  },
  methods: {
    // 确定支付
    onConfirm() {
      if (Number(this.value) < 0.1) {
        Toast("支付金额不能为空");
        return;
      }
      this.confirmPayment_show = true;
    },

    //关闭提醒时请求uid
    closeprompt() {
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v1/get_uid",
        data: {
          phone: this.phone
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.result == 1) {
            this.uid = response.data.data.uid;
          }
          if (response.data.result == 0) {
            this.uid = window.localStorage.getItem("uid");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 点击确认关闭遮罩
    confirm() {
      this.zhifubao_show = !this.zhifubao_show;
    },
    keyupSubmit() {
      document.onkeydown = e => {
        let _key = window.event.keyCode;
        //!this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.close();
        }
      };
    },

    // //获取cookie值
    // getCookie: function (cname) {
    //   console.log("cname", cname);
    //   var name = cname + "=";
    //   var ca = document.cookie.split(";");
    //   for (var i = 0; i < ca.length; i++) {
    //     var c = ca[i];
    //     while (c.charAt(0) == " ") c = c.substring(1);
    //     if (c.indexOf(name) != -1) {
    //       return c.substring(name.length, c.length);
    //     }
    //   }
    //   return "";
    // },

    // // 随机生成一个 IP 地址。
    // ip: function () {
    //   this.IP = this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255);
    // },
    // 返回一个随机的自然数（大于等于 0 的整数）。
    // natural: function (min, max) {
    //   min = typeof min !== "undefined" ? parseInt(min, 10) : 0;
    //   max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992; // 2^53
    //   return Math.round(Math.random() * (max - min)) + min;
    // },
    close() {
      if (Number(this.value) < 0.1) {
        Toast("支付金额不能为空");
        return;
      }
      var aData = new Date();
      var month = "";
      var day = "";
      this.timestamp = aData.getTime();
      if ((aData.getMonth() + 1).toString().length == 1) {
        month = "0" + (aData.getMonth() + 1);
      } else {
        month = aData.getMonth() + 1;
      }
      if (aData.getDate().toString().length == 1) {
        day = "0" + aData.getDate();
      } else {
        day = aData.getDate();
      }

      this.TRN_TX_LOGNO = aData.getFullYear() + month + day;
      // 支付类型

      if (this.payType == "1") {
        this.uid = window.localStorage.getItem("uid");
        // 支付类型 uid ,时间戳,支付金额,商户id
        if (this.PAYTYPE_item == "1") {
          this.locationPay("PA031");
        } else if (this.PAYTYPE_item == "2") {
          this.payment("PA031");
        }
      } else if (this.payType == "8") {
        // 支付类型 uid ,时间戳,支付金额,商户id
        if (this.PAYTYPE_item == "1") {
          this.locationPay("PA032");
        } else if (this.PAYTYPE_item == "2") {
          this.payment("PA032");
        }
      } else {
        this.uid = window.localStorage.getItem("uid");
        // 支付类型 uid ,时间戳,支付金额,商户id
        if (this.PAYTYPE_item == "1") {
          this.locationPay("PA032");
        } else if (this.PAYTYPE_item == "2") {
          this.payment("PA032");
        }
      }
    },
    locationPay(PAY_TYPE) {
      console.log("locationPay", PAY_TYPE, this.uid, this.TRN_TX_LOGNO, this.value, this.comment, this.TRN_TX_LOGNO, this.TX_MER_ID);
      window.location.href =
        `http://zf.minpinyouxuan.com/scantopay/pay?TRADE_CODE=PASM20&TX_OUT_CHANNEL=WZPA&type=1
        &TX_PAY_TYPE=` +
        PAY_TYPE + //类型
        `&uid=` +
        this.uid + //uid
        `&TRN_TX_LOGNO=` +
        this.TRN_TX_LOGNO +
        // this.timestamp //日期加时间戳
        `&TX_MOBILE_NO=19889999966&TX_ORDER_AMOUNT=` +
        this.value + //金额
        `&TX_TRANS_DESC=留言:` +
        this.comment + //留言
        `&TX_BAG_THEME=商品名称&TX_IP=123.56.66.143&TRN_TX_DATE=` +
        this.TRN_TX_LOGNO + //日期
        `&TRN_TX_TIME=201355&TX_MER_ID=` +
        this.TX_MER_ID + //商户id
        // `&TX_MER_NAME=扫码支付测试&TX_AUTH_CODE=&TX_SUB_APPID=&TX_CALLBACK_URL=https://kl.minpinyouxuan.com/addons/yun_shop/?menu#/home?i=2`;
        `&TX_MER_NAME=扫码支付测试&TX_AUTH_CODE=&TX_SUB_APPID=&TX_JUMP_URL=https://www.baidu.com/`;
    },

    payment(PAY_TYPE) {
      console.log("PAY_TYPE, uid, TRN_TX_LOGNO, value, TX_MER_ID", PAY_TYPE);
      axios
        .get(
          `http://zf.minpinyouxuan.com/scantopay/pay?TRADE_CODE=PASM20&TX_OUT_CHANNEL=WZPA&type=1&TX_PAY_TYPE=` +
            PAY_TYPE + //类型
            `&uid=` +
            this.uid + //uid
            `&TRN_TX_LOGNO=` +
            this.TRN_TX_LOGNO +
            // this.timestamp //日期加时间戳
            `&TX_MOBILE_NO=19889999966&TX_ORDER_AMOUNT=` +
            this.value + //金额
            `&TX_TRANS_DESC=留言:` +
            this.comment + //留言
            `&TX_BAG_THEME=商品名称&TX_IP=123.56.66.143&TRN_TX_DATE=` +
            this.TRN_TX_LOGNO + //日期
            `&TRN_TX_TIME=201355&TX_MER_ID=` +
            this.TX_MER_ID + //商户id
            // `&TX_MER_NAME=扫码支付测试&TX_AUTH_CODE=&TX_SUB_APPID=&TX_CALLBACK_URL=https://kl.minpinyouxuan.com/addons/yun_shop/?menu#/home?i=2`;
            `&TX_MER_NAME=扫码支付测试&TX_AUTH_CODE=&TX_SUB_APPID=&TX_JUMP_URL=https://www.baidu.com/`,
          {
            headers: {
              // "Access-Control-Allow-Origin": "*",
              "content-type": "applicationjson"
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

      //       axios.get("/api/merchants/merchantsEnter?TRADE_CODE=PASM29&TX_OUT_CHANNEL=WZPA&TX_PAY_TYPE=PA029&TX_EXTERNAL_ID=LH202104241420528&TX_MERCHANT_NAME=天津市河北区一分利食品店&TX_MERCHANT_ALIAS_NAME=一分利食品店&TX_CONTACT_NAME=兰宏锴&TX_CONTACT_WXID=wy504723&TX_CONTACT_MOBILE=18222576859&TX_LNG=121.48789949&TX_LAT=31.24916171&TX_MERCHANT_TYPE=0&TX_CATEGORY_ID=2015063000028051&TX_OPEN_TIME=20210319&TX_CLOSE_TIME=20991231&TX_STORE_ADDRESS=天津市河北区月牙河街道大江路北头1号(月牙河菜市场M1-10)&TX_PROVINCE=天津&TX_CITY=天津市&TX_DISTRICT=河北区&TX_BIZ_LICENSE=92120105MA079TKRX3&TX_LEGAL_PERSON=兰宏锴&TX_LEGAL_CRED_TYPE=1&TX_LEGAL_ID_NO=120224199001166214&TX_SETTLE_TYPE=1&TX_ACCOUNT_TYPE=1&TX_BANK_CRAD_NO=6217000066026270509&TX_CARD_HOLDER=兰宏锴&TX_ID_CARD_NUM=120224199001166214&TX_BANK_NAME=中国建设银行王顶堤支行&TX_BANK_BRANCHID=102110000515&TX_BANK_RESERVEDPHONE=18222576859&TX_CASHIER_DESK_IMG_URL=https://tpkl.minpinyouxuan.com/uploads/images/2021/04-26/c4fa67b3e1d924c0c8ffaaeab28598c4.jpg&TX_STORE_FRONT_IMG_URL=https://tpkl.minpinyouxuan.com/uploads/images/2021/04-26/fab3e98d204fb96ddf9a814dd2c4a322.jpg&TX_BIZ_LICENSE_IMG_URL=https://tpkl.minpinyouxuan.com/uploads/images/2021/04-26/8ebfa8f600f153c4815287bd3ca19bbe.jpg&TX_ID_CARD_FRONT_IMG_URL=https://tpkl.minpinyouxuan.com/uploads/images/2021/04-26/e46a846dcd16226fee2a736c0c4c7ef2.jpg&TX_ID_CARD_BACK_IMG_URL=https://tpkl.minpinyouxuan.com/uploads/images/2021/04-26/b18d02edd9319919fc980feab92c5253.jpg&TX_UCP_BANK_CRAD_NO=https://tpkl.minpinyouxuan.com/uploads/images/2021/04-26/3e54a10e2fe4a7261a612117f715a613.jpg&uid=3&TX_WX_CATEGORY_ID=2015063000028051&TX_CARDNO_TIME=20051205-20251205&TX_SETTLE_HAND_CARD_IMG_URL=https://tpkl.minpinyouxuan.com/uploads/images/2021/04-26/3e54a10e2fe4a7261a612117f715a613.jpg&TX_BANKCARD_FRONT_IMG_URL=https://tpkl.minpinyouxuan.com/uploads/images/2021/04-26/3e54a10e2fe4a7261a612117f715a613.jpg"
      // );
    },
    //   获取商户信息
    query() {
      this.payType = window.localStorage.getItem("type");
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  .fillInIphone {
    .fillInIphone_top {
      text-align: left;
      margin-left: 14px;
      margin-top: 14px;
      img {
        width: 20px;
        height: 20px;
        vertical-align: sub;
        margin-right: 10px;
      }
      span {
        font-size: 20px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #a6a6a8;
        line-height: 30px;
      }
    }
  }
  //提示
  .prompt {
    line-height: 89px;
    color: red;
  }
  // 支付宝填写手机号
  .van-popup {
    width: 324px;
    height: 232px;
    background: #ffffff;
    border-radius: 10px;
    // confirm
    .confirm {
      margin-top: 8px;
      width: 93px;
      height: 38px;
      background: #0579fc;
      border-radius: 4px;
      line-height: 38px;
      font-size: 15px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #ffffff;
      float: right;
      margin-right: 32px;
    }
    /deep/.van-cell__title {
      width: 74px;
      span {
        font-size: 18px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #333333;
        line-height: 27px;
      }
    }
    /deep/.van-cell__value {
      .van-field__body {
        height: 39px;
        background: #f0f1f2;
        border-radius: 3px;
        font-size: 16px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #c5cacd;
        line-height: 24px;
        /deep/.van-field__control {
          padding-right: 12px;
        }
      }
    }
    .remind {
      padding: 6px 16px;
      display: inline-block;
      text-align: left;
      span {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #ee6561;
        line-height: 20px;
      }
    }
  }
  .input {
    width: 90%;
    height: 135px;
    background-color: #fff;
    border-radius: 10px;
    display: inline-block;
    text-align: left;
    padding: 8px;

    .value /deep/.van-field__control {
      font-size: x-large;
    }

    /deep/.van-field__control {
      text-align: right;
    }

    /deep/.van-cell {
      padding-left: 0px;
      ::after {
        display: none;
      }
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
    padding-left: 10%;
    padding-top: 60px;
    padding-bottom: 20px;
    .topleft,
    .topright {
      display: inline-block;
      text-align: left;
      height: 100%;
      vertical-align: middle;
      width: 68%;
      font-size: large;
      font-weight: 600;
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