<!--
 * @Author: 飞
 * @Date: 2021-09-17 16:35:42
 * @LastEditTime: 2021-10-19 18:09:39
 * @FilePath: \you-shop1\src\views\A_version_1.1\industry\Industry.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-sticky>
      <van-nav-bar title="行业代表" name="arrow-left" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 主图 -->
    <img class="CZG" src="./img/555.png" alt="" />
    <img class="CZG" src="./img/111.png" alt="" />
    <img class="CZG" src="./img/222.png" alt="" />
    <img class="CZG" src="./img/444.png" alt="" />
    <img class="CZG" src="./img/333.png" alt="" />
    <!-- 表格 -->
    <div class="Grid">
      <van-cell-group class="BasicInformation">
        <van-field v-model="formDta.username" required label="姓名" placeholder="请输入您的姓名" />
        <van-field v-model="formDta.phone" required label="联系电话" placeholder="请输入您的联系电话号码" />
      </van-cell-group>
      <!-- 区域 -->
      <van-cell-group class="Area">
        <!-- 银行地址      -->
        <van-field v-model="formDta.BankAddress" is-link readonly label="选择地区" required placeholder="请选择地区" @click="show = true" />
        <van-popup v-model="show" round position="bottom">
          <van-cascader v-model="cascaderValue" title="请选择地区" :options="options" @close="show = false" @finish="ONBankAddress" :field-names="fieldNames" />
        </van-popup>
        <!-- 选择行业       -->
        <van-field v-model="formDta.BankName" label="选择行业" is-link readonly required placeholder="请选择要授权店铺的行业" @click="ONBankName" />
        <!-- 推荐人手机号 -->
        <van-field v-model="formDta.ReferenceCellPhoneNumber" required label="推荐人手机号" placeholder="请输入推荐人的手机号" />
      </van-cell-group>
      <van-cell-group class="SelectTheNumberOf">
        <div class="tit">
          <!--  -->
          <p>*</p>
          <span>选择数量</span>
        </div>
        <!-- 单选 -->
        <div class="Radio">
          <span v-for="(item, i) in listdata" :key="i" :class="formDta.morenwei == item.id ? 'active' : ''" @click="open(item)">{{ item.name }}</span>
        </div>
        <!-- span -->
        <div class="prepaidAmount">
          预付金额：<span>{{ money }}</span> &nbsp;元<s>{{ original }}</s>
        </div>
      </van-cell-group>
      <!-- 协议 -->
      <li @click="NoAgree" style="margin: 0.56rem">
        <van-checkbox v-show="!formDta.checked" v-model="formDta.checked" disabled icon-size="17px">我已阅读并同意<span>看领慈善终端行业代表合作协议</span></van-checkbox>
        <van-checkbox v-show="formDta.checked" v-model="formDta.checked" checked-color="#E60416" icon-size="17px">我已阅读并同意<span>看领慈善终端行业代表合作协议</span></van-checkbox>
      </li>
    </div>
    <!--协议 -->
    <van-overlay v-show="protocolshow" :lock-scroll="false">
      <div class="wrapper" v-if="protocolshow">
        <div class="block">
          <IndustryRepresentativesAgreement :formDta="formDta" :num="num" :money="money" />
          <div class="agree">
            <template>
              <div class="agreeLeft" @click="cancel" :class="AgreementAllowClick == false ? 'hide' : ''">不同意</div>
            </template>
            <div class="agreeRight" @click="confirm" :class="AgreementAllowClick == false ? 'hide' : ''">{{ AgreementText + AgreementTime + AgreementTimeUnit }}</div>
          </div>
        </div>
      </div>
    </van-overlay>

    <el-button class="submit" v-show="!ButtonIdentification">提交</el-button>
    <el-button class="submit ok" @click="pay" v-show="ButtonIdentification">提交</el-button>

    <!-- 选择行业显示 -->
    <van-popup v-model="BankNameShow" position="bottom" :style="{ height: '60%' }">
      <!-- 选择行业       -->
      <van-field v-model="entering" label="选择行业" required placeholder="请简要输入行业的名称" />
      <van-list finished-text="没有更多了" error-text="本区域未获取到支行 请联系客服 客服电话:01053382256" :error.sync="error">
        <van-cell v-for="(item, i) in OpeningList" :key="i" :title="item.industry_name" @click="OpenBankDisplay(item)" :class="item.type == true ? 'CanTChoose' : ''" />
      </van-list>
    </van-popup>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import IndustryRepresentativesAgreement from "./IndustryRepresentativesAgreement";
import { Toast } from "vant";
export default {
  data() {
    return {
      options: regionData, //地址库
      fieldValue: "", //[地址]
      fieldNames: {
        //属性名 重置
        text: "label",
        value: "value",
        children: "children"
      },
      show: false, //展示隐藏
      openid: "",
      BankNameID: "", //选中行业的id
      BankNameShow: false, //行业弹窗开关
      OpeningList: [],
      OpeningListCS: [], //测试用
      radio: "1",
      listdata: [
        {
          name: "30家送15家",
          id: 2,
          money: 18000,
          original: 27000,
          num: 30
        },
        {
          name: "40家送20家",
          id: 3,
          money: 24000,
          original: 36000,
          num: 40
        },
        {
          name: "50家送25家",
          id: 4,
          money: 30000,
          original: 45000,
          num: 50
        },
        {
          name: "60家送30家",
          id: 5,
          money: 36000,
          original: 54000,
          num: 60
        },
        {
          name: "70家送35家",
          id: 6,
          money: 42000,
          original: 63000,
          num: 70
        }
      ],

      money: 18000,
      original: 27000,
      province_bank: "",
      city_bank: "",
      isWechat: "",

      trade_type: "", //支付类型
      host: "", //支付host
      url: "", //支url

      formDta: {
        morenwei: 2,
        BankName: "", //选中行业的名称
        ReferenceCellPhoneNumber: "", //推荐人手机号
        BankAddress: "", //银行地址
        username: "", //姓名
        phone: "", //联系电话
        checked: false //我已阅读并同意 捐赠协议
      },
      ButtonIdentification: false,
      uid: "",
      num: 30,
      zhixiashi: ["110000", "120000", "310000", "500000"], //直辖市
      /**
       * @Author: 飞
       * @Date: 2021-09-26 17:28:31
       * @Describe:
       */
      entering: "",
      /**
       * @Author: 飞
       * @Date: 2021-10-08 15:38:23
       * @Describe: 协议
       */
      // 协议同意倒计时 初始时间
      InitialTime: 6,
      // 协议同意倒计时 计算时间
      AgreementTime: 0,
      // 协议同意倒计时时间单位
      AgreementTimeUnit: "s",
      // 协议允许点击
      AgreementAllowClick: false,
      protocolshow: false, //协议书显示隐藏
      // 协议同意文本
      AgreementText: "同意"
    };
  },
  activated() {
    /**
     * @Author: 飞
     * @Date: 2021-10-08 16:27:15
     * @Describe: 显示协议进来
     */
    // this.protocolshow = true;
    this.getOpenId();

    this.isWechat = (function () {
      return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
    })();
    this.host = "https://" + window.location.host;
    this.url = this.host + "/addons/yun_shop/?menu#/member/queryResults?i=2&type=5&mid=0&shop_id";
    this.trade_type = this.isWechat ? "JSAPI" : "MWEB";
    this.uid = JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid;
    console.log("options", this.options);
    // 地址初始化  2级联动
    this.options.forEach(item => {
      if (this.zhixiashi.indexOf(item.value) != -1) {
        item.children = item.children[0].children;
      } else {
        item.children.forEach(is => {
          delete is.children;
        });
      }
    });
  },
  components: {
    IndustryRepresentativesAgreement
  },
  watch: {
    formDta: {
      //监听的对象
      deep: true, //深度监听设置为 true
      handler: function (newV, oldV) {
        this.ButtonIdentification = this.dataOver();
      }
    },
    entering: function (newV, oldV) {
      if (this.entering.length > 0) {
        this.component();
      } else {
        this.OpeningList = this.OpeningListCS;
      }
    },
    // 监控用户是否点击协议 (倒计时)
    protocolshow: function (N, O) {
      if (N == true) {
        this.AgreementTime = this.AgreementTime - 1;
      }
    },
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
    }
  },
  methods: {
    /**
     * @Author: 飞
     * @Date: 2021-10-08 15:51:34
     * @Describe:
     */
    // 用户点击不同意修改状态
    cancel() {
      if (this.AgreementAllowClick) {
        this.formDta.checked = false;
        this.protocolshow = false;
      }
    },
    // 用户点击同意修改状态
    confirm() {
      if (this.AgreementAllowClick) {
        this.formDta.checked = true;
        this.protocolshow = false;
      }
    },
    /**
     * @Author: 飞
     * @Date: 2021-10-08 15:30:08
     * @Describe:
     */
    // 点击协议时   改变已同意的状态  (初始化)
    NoAgree() {
      // 初始化倒计时时间
      this.AgreementTime = this.InitialTime;
      this.protocolshow = !this.protocolshow;
      this.AgreementAllowClick = false;
    },
    // 搜索计算
    component() {
      var applist = [];
      this.OpeningListCS.forEach(item => {
        // console.log('item',item);
        // return item
        if (item.industry_name.indexOf(this.entering) != -1) {
          applist.push(item);
        }
      });
      this.OpeningList = applist;
    },

    dataOver() {
      for (var item in this.formDta) {
        if (this.formDta[item] == "") {
          return false;
        }
      }
      return true;
    },
    urlencode(str) {
      str = (str + "").toString();
      return encodeURIComponent(str).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+");
    },
    // 获取行业列表
    getHylbCom() {
      var that = this;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v3/industrycates";
      axios({
        method: "POST",
        url,
        data: {
          uid: this.uid,
          adress_province: this.province_bank,
          adress_city: this.city_bank
        }
      }).then(async res => {
        if (res.data.result === 1) {
          that.OpeningList = res.data.data;
          that.OpeningListCS = res.data.data;
        } else {
          Toast("获取行业失败 请刷新页面");
        }
      });
    },
    open(item) {
      this.formDta.morenwei = item.id;
      this.money = item.money;
      this.num = item.num;
      this.original = item.original;
    },
    // 行业选中
    OpenBankDisplay(item) {
      if (item.type) {
        return;
      }
      // 支行列表隐藏起来
      this.formDta.BankName = item.industry_name;
      this.BankNameID = item.id;
      this.BankNameShow = false;
      this.entering = ""; //行业搜索成功之后关闭行业选择清空搜索值
    },
    // 点击选择行业
    ONBankName() {
      // 判断地区是否为空
      if (this.formDta.BankAddress == "") {
        Toast("请先选择地区");
        return;
      }
      // 获取行业列表
      this.getHylbCom();
      // 弹出框
      this.BankNameShow = true;
    },
    // 返回会员中心
    onClickLeft() {
      this.$router.push(this.fun.getUrl("member", {}));
    },
    // 请求获取apenid
    getOpenId() {
      $http.post("member.member.member-data", { v: 2 }, " ").then(res => {
        this.openid = res.data.member.yz_member.yz_openid;
      });
    },
    pay() {
      // this.$router.push(this.fun.getUrl("Industrydetails"));
      // console.log("this.uid ", this.uid);
      // return
      if (this.uid == "685" || this.uid == "1" || this.uid == "115507") {
        this.money = 0.11;
      }
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v3/addindustry";
      axios({
        method: "POST",
        url,
        data: {
          adress_city: this.city_bank, //城市id编码
          adress_province: this.province_bank, //省份id编码
          industry_cate: this.BankNameID, //行业id
          money: this.money, //金钱
          num: this.num * 1, //开通数量
          openid: this.openid, //onid
          trade_type: this.trade_type, //支付类型
          tuid_phone: this.formDta.ReferenceCellPhoneNumber, //推荐人的手机号

          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid, //uid
          name: this.formDta.username,
          phone: this.formDta.phone //申请人的手机号
        }
      }).then(async res => {
        console.log("resresresresresresresresres", res.data.data);
        if (res.data.result === 1) {
          if (this.isWechat) {
            this.wexinPay(res.data.data);
          } else {
            const payURL = res.data.data.mweb_url + "&redirect_url=" + encodeURIComponent(this.url + "&out_trade_no=" + res.data.data.out_trade_no);
            window.location.href = payURL;
          }
        } else {
          this.$dialog({ message: res.data.msg });
        }
      });
    },
    // 微信支付
    wexinPay(data, cb, errorCb) {
      const that = this;
      //获取后台传入的数据
      let appId = data.appId;
      let timestamp = data.timeStamp;
      let nonceStr = data.nonceStr;
      let signature = data.signature;
      let packages = data.package;
      let paySign = data.paySign;
      let signType = data.signType;
      console.log("发起微信支付");
      //下面要发起微信支付了
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function () {
        wx.chooseWXPay({
          timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
          package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: paySign, // 支付签名
          success: function (res) {
            // 支付成功后的回调函数
            // Toast.success('支付成功');
            // cb(res);
            if (res.errMsg === "chooseWXPay:ok") {
              that.$router.push(that.fun.getUrl("Industrydetails"));
            } else if (res.errMsg === "chooseWXPay:cancel") {
              that.$toast("取消支付");
            }
          },
          fail: function (res) {
            //失败回调函数
            that.$toast.fail("支付失败");
            // errorCb(res);
          }
        });
      });
      wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        /*alert("config信息验证失败");*/
        console.log(res);
      });
    },
    // 全部选项选择完毕后，会触发 finish 事件
    ONBankAddress({ selectedOptions }) {
      this.show = false;
      this.formDta.BankAddress = selectedOptions.map(option => option.label).join("/");
      this.province_bank = selectedOptions[0].value; //省
      // this.province_text = selectedOptions[0].label; //省
      if (this.zhixiashi.indexOf(selectedOptions[0].value) != -1) {
        if (selectedOptions[0].value == "110000") {
          this.city_bank = "110100";
        }
        if (selectedOptions[0].value == "120000") {
          this.city_bank = "120100";
        }
        if (selectedOptions[0].value == "310000") {
          this.city_bank = "310100";
        }
        if (selectedOptions[0].value == "500000") {
          this.city_bank = "500100";
        }
      } else {
        this.city_bank = selectedOptions[1].value; //市
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  // 导航
  /deep/.van-nav-bar {
    .van-icon {
      color: #979797;
    }
    .van-nav-bar__title {
      font-size: 1rem;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #121212;
      line-height: 1.5rem;
    }
    .van-nav-bar__right .van-nav-bar__text {
      color: #121212;
    }
  }

  // 主图
  .CZG {
    width: 100%;
    display: block;
  }
  // 表格
  .Grid {
    margin: 0.56rem 0;
    // 姓名  电话
    .BasicInformation {
      margin: 0 0.56rem;
      border-radius: 0.75rem;
      /deep/.van-cell {
        border-radius: 0.75rem;
      }
    }

    .Area {
      margin: 0.56rem;
      border-radius: 0.75rem;

      /deep/.van-cell {
        border-radius: 0.75rem;
      }
    }
    .SelectTheNumberOf {
      margin: 0 0.56rem;
      border-radius: 0.75rem;
      .tit {
        font-size: 0.88rem;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #666666;
        line-height: 1.31rem;
        text-align: left;
        padding: 1.25rem 0 0.56rem 0.44rem;
        p {
          color: red;
          display: inline-block;
        }
      }
      .Radio {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 1.25rem 0 0.56rem 1rem;
        span {
          width: 5.63rem;
          height: 1.88rem;
          border-radius: 0.19rem;
          border: 0.06rem solid #9e9e9e;
          display: inline-block;
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #666666;
          line-height: 1.88rem;
          margin-bottom: 0.63rem;
        }
        span:nth-child(3n + 2) {
          margin: 0 1.5rem;
        }
        .active {
          background: #0579fc;
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #ffffff;
        }
      }
      .prepaidAmount {
        padding: 0 0 0.56rem 1rem;
        text-align: left;
        span {
          font-size: 1rem;
          font-family: SourceHanSansCN-Bold, SourceHanSansCN;
          font-weight: bold;
          color: #e44e41;
          line-height: 1.5rem;
        }
        s {
          font-size: 12px;
          margin-left: 0.4rem;
        }
      }
    }
  }
  .CanTChoose {
    color: #979797;
  }
  // 提交
  .submit {
    width: 18.75rem;
    height: 2.25rem;
    background: #d6d6d6;
    border-radius: 1.13rem;
    font-size: 1rem;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 2.25rem;
    display: inline-block;
    margin-bottom: 30px;
    margin-top: 3.06rem;
  }
  .ok {
    background: #0579fc;
  }

  //协议
  .protocol {
    height: 500px;
  }
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
}
</style>