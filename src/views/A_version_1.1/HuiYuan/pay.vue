<template>
  <div class="content">
    <div class="top">
      <div class="topleft">
        <img src="../../../assets/images/goods/contribution_Img.png" alt="" />
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
    <div class="RTS" :class="adcode != '' ? 'signaled' : 'Nonsignaled'"></div>
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
      TX_MER_ID: "", //商户id
      uid: "", //消费uid
      shop_name: "", //商户名称
      payType: "", //1 在什么平台
      zhifubao_show: false, //如果是支付宝 环境
      phone: "", //获取手机号

      /**
       * @Author: 飞
       * @Date: 2021-09-28 22:06:05
       * @Describe:
       */
      broadcast_type: 1, //汇元类型    2微信，3支付宝
      adcode: "", //定位编码
      NumberOfLocation: 0, //定位次数
      TargetNumber: 4 //定位次数
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
    // $http
    //   .post("member.member.member-data", { v: 2 }, " ")
    //   .then(response => {
    //     if (response.result === 0) {
    //       Toast(response.msg);
    //       require("@/assets/css/member/02.scss");
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // 获取环境
    this.payType = window.localStorage.getItem("type");

    //商户号  商户名
    this.TX_MER_ID = this.$route.query.shop_id;
    this.shop_name = this.$route.query.shop_name;
  },
  created() {
    this.keyupSubmit();
  },
  activated() {
    // 获取环境
    this.payType = window.localStorage.getItem("type");
    this.GetAGeographicLocation();
  },
  methods: {
    // 获取地理位置
    GetAGeographicLocation() {
      var that = this;
      var mapObj = new AMap.Map("iCenter");
      mapObj.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 2000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); // 返回定位信息
        AMap.event.addListener(geolocation, "error", onError); // 返回定位出错信息
      });

      function onComplete(obj) {
        console.log("定位成功", obj);
        that.adcode = obj.addressComponent.adcode;
      }
      function onError(obj) {
        // Toast("定位失败,请手动切换位置");
        // setInterval(() => {
        that.NumberOfLocation = that.NumberOfLocation + 1;
        if (that.NumberOfLocation < that.TargetNumber) {
          that.GetAGeographicLocation();
        }
        // }, 500);
      }
    },
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
        // !this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.close();
        }
      };
    },
    close() {
      if (Number(this.value) < 0.1) {
        Toast("支付金额不能为空");
        return;
      }

      // 支付类型
      if (this.payType == 1) {
        this.broadcast_type = 2;
      }
      if (this.payType == 8) {
        this.broadcast_type = 3;
      }

      var formData = {
        mch_uid: this.TX_MER_ID, //商户号
        subject: this.shop_name + this.comment, //备注
        total_fee: this.value, //金额
        uid: window.localStorage.getItem("uid") * 1, //支付用户uid
        broadcast_type: this.broadcast_type //2微信，3支付宝
      };
      if (this.adcode != "") formData.adcode = this.adcode;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v3/ApplyPay",
        data: formData
      })
        .then(response => {
          // 成功跳转支付
          if (response.data.result == 1) {
            window.location.href = response.data.data;
          }
          if (response.data.result == 0) {
          }
        })
        .catch(error => {
          console.log(error);
        });
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
  .RTS {
    width: 1px;
    height: 1px;
    border-radius: 50%;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  // 有信号
  .signaled {
    background: rgb(124, 230, 165);
  }
  .Nonsignaled {
    background: rgb(158, 158, 158);
  }
}
</style>