<template>
  <div class="Options">
    <ul class="Options_itrm">
      <li>
        <div class="OptionsName">支持项目</div>
        <div class="OptionsValue projectValue">
          <van-radio-group v-model="Project">
            <!-- <van-radio name="1">
              <template #icon="props">
                <span :class="props.checked ? 'Selected' : ''"> 妇基会 </span>
              </template>
            </van-radio> -->
            <van-radio name="2">
              <template #icon="props">
                <span :class="props.checked ? 'Selected' : ''"> 儿慈会 </span>
              </template>
            </van-radio>
            <!-- <van-radio name="3">
              <template #icon="props">
                <span :class="props.checked ? 'Selected' : ''"> 初保会 </span>
              </template>
            </van-radio> -->
          </van-radio-group>
        </div>
      </li>
      <li>
        <div class="OptionsName" style="padding-top: 20px">捐款金额</div>
        <div class="OptionsValue figureValue">
          <van-radio-group v-model="figureSelection">
            <van-radio name="1">
              <template #icon="props">
                <span :class="props.checked ? 'figureSelected' : ''"> 20元 </span>
              </template>
            </van-radio>
            <van-radio name="2">
              <template #icon="props">
                <span :class="props.checked ? 'figureSelected' : ''"> 50元 </span>
              </template>
            </van-radio>
            <van-radio name="3">
              <template #icon="props">
                <span :class="props.checked ? 'figureSelected' : ''"> 100元 </span>
              </template>
            </van-radio>
          </van-radio-group>

          <input type="text" value="" placeholder="自定金额" v-model="figureValue" />
        </div>
      </li>
      <!-- 捐款人 -->
      <li>
        <div class="OptionsName">捐款人</div>
        <div class="OptionsValue subscriberValue">
          <input type="text" placeholder="请输入捐款人" v-model="subscriberValue" />
        </div>
      </li>
      <!-- 联系方式 -->
      <li>
        <div class="OptionsName">联系方式</div>
        <div class="OptionsValue contactValue">
          <input type="text" placeholder="请输入联系方式" v-model="contactValue" />
        </div>
      </li>
      <li>
        <div class="OptionsName">是否匿名</div>
        <div class="OptionsValue anonymityValue">
          <van-switch v-model="anonymity" active-color="#ee0a24" inactive-color="#dcdee0" />
        </div>
      </li>
    </ul>

    <div class="commit">
      <van-checkbox @click="NoAgree" v-model="checked" checked-color="#ee0a24" disabled>我已阅读并同意<span>捐赠协议</span></van-checkbox>
      <div class="OPT">
        <div class="DonationRecord">
          <router-link :to="fun.getUrl('DonationRecord')">捐款记录</router-link>
        </div>
        <div class="weixinPay" @click="WeChatPayment">
          微信支付
        </div>
      </div>
    </div>

    <!--协议 -->
    <van-overlay v-show="protocolshow" :lock-scroll="false">
      <div class="wrapper">
        <div class="block">
          <DonationAgreement />
          <div class="agree">
            <template>
              <div class="agreeLeft" @click="cancel" :class="AgreementAllowClick == false ? 'hide' : ''">不同意</div>
            </template>
            <div class="agreeRight" @click="confirm" :class="AgreementAllowClick == false ? 'hide' : ''">{{ AgreementText + AgreementTime + AgreementTimeUnit }}</div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Toast } from "vant";
import DonationAgreement from "./DonationAgreement";




export default {
  data() {
    return {
      // 协议
      // 协议同意文本
      AgreementText: "同意",

      // 协议同意倒计时 初始时间
      InitialTime: 6,
      // 协议同意倒计时 计算时间
      AgreementTime: 0,
      // 协议同意倒计时时间单位
      AgreementTimeUnit: "s",
      // 协议允许点击
      AgreementAllowClick: false,

      disabled: false,
      protocolshow: false,

      ppp: "#",
      Project: "", //项目名
      figureSelection: "", //自选捐款
      figureValue: "", //自定义金额
      anonymity: false, //匿名
      agree: false, //阅读协议
      contactValue: "", //联系方式
      subscriberValue: "", //捐款人
      searcBarCode: "",
      checked:false//我已阅读并同意
    };
  },
  components: {
    DonationAgreement
  },
  activated() {
    this.NoAgree()
  },
  watch: {
    // 监控用户是否点击协议 (倒计时)
    protocolshow: function (N, O) {
      console.log("params", N, O);
      if (N == true) {
        this.AgreementTime = this.AgreementTime - 1;
      }
    },
    // 监控倒计时时间
    AgreementTime: function (N, O) {
      if (N >= 1) {
        setTimeout(() => {
          this.AgreementTime = this.AgreementTime - 1;
        }, 1000);
      }
      // 倒计时结束 时间.单位 清空  允许点击
      if (N < 1) {
        this.AgreementTime = "";
        this.AgreementTimeUnit = "";
        this.AgreementAllowClick = true;
      }
    },

    // 只能输入数字
    figureValue: function () {
      this.figureValue = this.figureValue.replace(/[^\d]/g, "");
    },
    // 捐款人 只能输入数字，英文及中文
    subscriberValue: function () {
      this.subscriberValue = this.subscriberValue.replace(/[^A-Za-z0-9\u4e00-\u9fa5]/g, "");
    },
    // 联系方式 只能输入数字，英文及中文
    contactValue: function () {
      this.contactValue = this.contactValue.replace(/[^\d]/g, "");
    }
  },
  mounted() {},
  methods: {
    // 微信支付
    WeChatPayment() {
      console.log("Project", this.Project);
      console.log("figureSelection", this.figureSelection);

      if (this.Project == "") {
        Toast("未选择支持项目");
        return;
      }
      if (this.figureSelection == "") {
        Toast("请选择或输入捐款金额");
        return;
      }
      if (this.subscriberValue== "") {
        Toast("捐款人并不能为空");
        return;
      }
      if (this.contactValue== "") {
        Toast("联系方式不能为空");
        return;
      }
      if (!this.checked) {
        Toast("请点击我已阅读并同意捐赠协议并同意");
        return;
      }

      Toast("微信支付待对接");
    },
    // 用户点击不同意修改状态
    cancel() {
      if (this.AgreementAllowClick) {
        this.checked = false;
        this.protocolshow = false;
      }
    },
    // 用户点击同意修改状态
    confirm() {
      if (this.AgreementAllowClick) {
        this.checked = true;
        this.protocolshow = false;
      }
    },
    // 点击协议时   改变已同意的状态  (初始化)
    NoAgree() {
      // 初始化倒计时时间
      this.AgreementTime = this.InitialTime;
      this.protocolshow = !this.protocolshow;
      this.AgreementAllowClick = false;
    },

    inputChange() {
      //输入框值改变
      this.pageIndex = this.pageIndex.replace(/[^\d]/g, "");
    },
    Record() {
      console.log("thissssssssssssss", this);
    }
  }
};
</script>

<style lang="scss" scoped>
.img-icon {
  height: 20px;
}
.Options {
  height: 285px;
  width: 100%;
  .Options_itrm {
    background: #ffffff;
    .OptionsName {
      line-height: 47px;

      box-shadow: none;

      width: 86px;
      text-align: left;
      padding-left: 13px;
      float: left;
    }
    .OptionsValue {
      line-height: 47px;
      text-align: left;
      padding-left: 88px;
      border-top: 1px solid #f4f5f6;
    }
    .projectValue .van-radio,
    .figureValue .van-radio {
      display: inline-block;
      overflow: initial;
      span {
        border: 1px solid #dddddd;
        border-radius: 4px;
        display: inline-block;
        line-height: 30px;
        margin-right: 5px;
        width: 56px;
        text-align: center;
        font-size: 13px;
      }
    }
    .projectValue,
    .figureValue {
      .figureSelected {
        color: #e60416;
        background-image: url("../../assets/images/kick/Selected.png");
        background-repeat: no-repeat;
      }
      span {
        border: 1px solid #dddddd;
        border-radius: 4px;
        display: inline-block;
        line-height: 30px;
        margin-right: 5px;
        width: 56px;
        text-align: center;
      }
      input {
        height: 34px;
        line-height: 34px;
        width: 143px;
        border-radius: 4px;
        border: 1px solid #dddddd;
        padding-left: 10px;
      }
    }
    .projectValue .Selected {
      color: #e60416;
      background-image: url("../../assets/images/kick/Selected.png");
      background-repeat: no-repeat;
    }
    .subscriberValue,
    .contactValue {
      input {
        border: 1px solid #f4f5f6;
        padding-left: 10px;
        width: 260px;
        border-radius: 2px;
        height: 35px;
        line-height: 35px;
        background: #f4f5f6;
      }
    }
    .anonymityValue {
      text-align: right;
      padding-right: 30px;
      .van-switch {
        font-size: 18px;
      }
    }
  }
  //协议
  .van-overlay {
    .wrapper {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      // 垂直居中
      justify-content: center;
      .block {
        background: #fff;
        height: 500px;
        overflow: auto;
        border-radius: 18px;
        margin: 0 36px;
        .agree {
          height: 50px;
          width: 100%;
          border-top: 1px solid #f0f1f2;
          .hide {
            color: #999999;
          }
          .agreeLeft,
          .agreeRight {
            width: 50%;
            display: inline-block;
            line-height: 50px;
            text-align: center;
          }
          .agreeLeft {
            border-right: 1px solid #f0f1f2;
          }
        }
      }
    }
  }
  //我已阅读协议
  .commit {
    padding: 0 13px;
    margin: 23px 0;
    .protocol {
      color: #e60416;
      background: #f4f5f6;
    }
    .OPT {
      margin-top: 20px;
    }
    /deep/.van-checkbox__label {
      color: #666666;
      span {
        color: #e60416;
      }
    }
    .DonationRecord,
    .weixinPay {
      width: 160px;
      height: 38px;
      border-radius: 4px;
      line-height: 38px;
      font-size: 15px;
      font-weight: 400;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      display: inline-block;
    }
    .DonationRecord {
      background: #ffffff;
      border: 1px solid #dddddd;
      color: #666666;
      margin-right: 25px;
    }
    .weixinPay {
      background: #e60416;
      color: #ffffff;
    }
  }
}
</style>