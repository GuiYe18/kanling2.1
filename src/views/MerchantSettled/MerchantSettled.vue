<!--
 * @Author: 飞
 * @Date: 2021-06-02 15:34:35
 * @LastEditTime: 2021-06-08 11:19:15
 * @FilePath: \you-shop1\src\views\MerchantSettled\MerchantSettled.vue
 * @Describe: 
-->

<template>
  <div id="content">
    <van-steps :active="active" class="">
      <van-step>主体信息</van-step>
      <van-step>经营信息</van-step>
      <van-step>结算账户</van-step>
      <van-step>入驻审核</van-step>
    </van-steps>

    <div class="active" v-show="active == 0">
      <!-- 推荐人 -->
      <van-field v-model="RecommendedPerson" label="推荐人" placeholder="请填写推荐人手机号（选填）" class="MerchantName" type="digit" />
      <!-- 商户名 -->
      <van-field v-model="MerchantName" label="商户名" required placeholder="请填写商户名" class="MerchantName" @blur="MerchantName_onblur" />
      <!-- 商户简称 -->
      <van-field v-model="Merchant" label="商户简称" required placeholder="请填写商户简称" @blur="Merchant_onblur" />
      <!-- 联系人 -->
      <van-field v-model="Contact" label="联系人" required placeholder="请填写商户联系人" @blur="Contact_onblur" />
      <!-- 联系人微信号 -->
      <van-field v-model="ContactMicroSignal" label="联系人微信号" placeholder="请填写联系人微信号（选填）" type="digit" />
      <!-- 联系人手机号 -->
      <van-field v-model="ContactMobilePhoneNumber" label="联系人手机号" required placeholder="请填写联系人手机号" @blur="ContactMobilePhoneNumber_onblur" type="digit" />
      <!-- 地区 -->
      <van-field v-model="fieldValue" is-link readonly label="地区" required placeholder="请选择所在地区" @click="show = true" @blur="fieldValue_onblur" />
      <van-popup v-model="show" round position="bottom">
        <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="show = false" @finish="onFinish" :field-names="fieldNames" />
      </van-popup>
      <!-- 详细地址 -->
      <van-field v-model="address_S" label="地址" required placeholder="请填写详细地址" />
      <!-- 商户门头照 -->
      <van-field label="商户门头照(只能上传一张)" required class="StoreCashier" />
      <el-upload
        action="https://tpkl.minpinyouxuan.com/index.php/api/image"
        list-type="picture-card"
        :auto-upload="true"
        :data="{ type: 1 }"
        :name="'image[]'"
        :on-success="MerchantDoorPhoto_S"
        :limit="1"
        class="MerchantPhoto"
      >
        <img src="./img/编组 3@2x.png" alt="" />
      </el-upload>

      <!-- 店内场景照 -->
      <van-field label="店内场景照(只能上传一张)" required class="StoreCashier" />
      <el-upload
        action="https://tpkl.minpinyouxuan.com/index.php/api/image"
        list-type="picture-card"
        :auto-upload="true"
        :data="{ type: 1 }"
        :name="'image[]'"
        :on-success="InStoreScene_S"
        :limit="1"
        class="MerchantPhoto"
      >
        <img src="./img/编组 3@2x.png" alt="" />
      </el-upload>
      <!-- 店面收银台照 -->
      <van-field label="店面收银台照(只能上传一张)" required class="StoreCashier" />
      <el-upload
        action="https://tpkl.minpinyouxuan.com/index.php/api/image"
        list-type="picture-card"
        :auto-upload="true"
        :data="{ type: 1 }"
        :name="'image[]'"
        :on-success="StoreCashierashier_S"
        :limit="1"
        class="MerchantPhoto"
      >
        <img src="./img/编组 3@2x.png" alt="" />
      </el-upload>
    </div>
    <div class="active" v-show="active == 1">
      <!-- 商户类别 -->
      <van-field label="商户类别" required class="MerchantCategory">
        <template #input>
          <van-radio-group v-model="MerchantCategory" direction="horizontal">
            <van-radio name="0" checked-color="#ee0a24">个人</van-radio>
            <van-radio name="1" checked-color="#ee0a24">企业</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 商户支付宝经营范围  -->
      <van-field v-model="MerchantAlipayBusiness" label="商户支付宝经营范围" required placeholder="例:2015050700000000" type="digit" right-icon="warning-o" @click-right-icon=" click_weixin" />
      <!-- <van-field v-model="value1" label="文本" left-icon="smile-o" right-icon="warning-o" placeholder="显示图标" /> -->
      <!-- 商户微信经营范围   -->
      <van-field v-model="MerchantWeChatBusiness" label="商户微信经营范围" required placeholder="例:545" type="digit" right-icon="warning-o" @click-right-icon="click_right"  />
      <!-- 商户微信经营范围  
      <van-field v-model="MerchantAlipayBusiness " label="商户微信经营范围  " required placeholder="请填写商户微信经营范围" /> -->
      <!-- 开始营业时间  -->
      <!-- <van-field label="开始营业时间 " required class="StoreCashier" /> -->
      <!-- <van-cell title="开始营业时间 " :value="date" @click="showshow = true" />
      <van-calendar v-model="showshow" :min-date="minDate" :max-date="maxDate" /> -->

      <!-- <van-calendar v-model="showshow" :min-date="minDate" :max-date="maxDate" /> -->

      <!-- <van-cell title="选择单个日期" :value="date" @click="showshow = true" />
      <van-calendar v-model="showshow" @confirm="onConfirm" />
      <van-calendar v-model="showshow" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" /> -->
      <!-- 开业时间 -->
      <van-field v-model="StartBusinessHours" label="开始营业时间" required placeholder="例：20210405" @blur="StartBusinessHours_onblur" type="digit" />
      <!-- 结束时间   -->
      <van-field v-model="EndBusinessHours" label="结束营业时间" required placeholder="例：20210405" @blur="EndBusinessHours_onblur" type="digit" />
      <!-- 营业执照编号    -->
      <van-field v-model="BusinessLicenseNumber" label="营业执照编号" required placeholder="请填写营业执照编号" />
      <!-- 营业执照  -->
      <van-field label="营业执照(只能上传一张)  " required class="StoreCashier" />
      <el-upload
        action="https://tpkl.minpinyouxuan.com/index.php/api/image"
        list-type="picture-card"
        :auto-upload="true"
        :data="{ type: 1 }"
        :name="'image[]'"
        :on-success="businessLicense_S"
        :limit="1"
        class="MerchantPhoto"
      >
        <img src="./img/编组 3@2x.png" alt="" />
      </el-upload>
      <!-- 商户备注    -->
      <van-field v-model="MerchantNote" label="商户备注" placeholder="请填写商户备注（选填）" />
      <!-- 法人姓名    -->
      <van-field v-model="LegalPersonName" label="法人姓名" required placeholder="请填写法人姓名" />
      <!-- 法人证件类型  -->
      <van-field label="法人证件类型 " required class="MerchantCategory">
        <template #input>
          <van-radio-group v-model="LegalIDType" direction="horizontal">
            <van-radio name="1" checked-color="#ee0a24">身份证</van-radio>
            <van-radio name="2" checked-color="#ee0a24">护照</van-radio>
            <van-radio name="3" checked-color="#ee0a24">户口本</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 法人证件号     -->
      <van-field v-model="LegalIDNumber" label="法人证件号" required placeholder="请填写法人证件号" />
      <!-- 身份证有效期     -->
      <van-field v-model="IDCardValidity" label="身份证有效期" required placeholder="20051205—20251205" @blur="IDCardValidity_onblur" />
    </div>
    <div class="active" v-show="active == 2">
      <!-- 是否法人结算  -->
      <van-field label="是否法人结算 " required class="MerchantCategory">
        <template #input>
          <van-radio-group v-model="WhetherLegalPersonSettlement" direction="horizontal">
            <van-radio name="1" checked-color="#ee0a24">是</van-radio>
            <van-radio name="2" checked-color="#ee0a24">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 结算账户类型   -->
      <van-field label="结算账户类型  " required class="MerchantCategory">
        <template #input>
          <van-radio-group v-model="SettleAccountYype" direction="horizontal">
            <van-radio name="1" checked-color="#ee0a24">对公</van-radio>
            <van-radio name="0" checked-color="#ee0a24">对私</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 商家自定义费率  -->
      <!-- <van-field v-model="BusinessCustomRate" label="商家自定义费率" required placeholder="请填写商家自定义费率（选填）" /> -->
      <!-- 结算卡号    -->
      <van-field v-model="SettlementCardNumber" label="结算卡号" required placeholder="请填写结算卡号" type="digit" />
      <!-- 结算持卡人姓名     -->
      <van-field v-model="SettlementCardholderName" label="结算持卡人姓名" required placeholder="请填写结算持卡人姓名" />
      <!-- 结算人身份证号      -->
      <van-field v-model="SettlementPersonIDNumber" label="结算人身份证号" required placeholder="请填写结算人身份证号" />
      <!-- 开户行名称       -->
      <van-field v-model="BankName" label="开户行名称" required placeholder="请填写开户行名称" />
      <!-- 联行号        -->
      <van-field v-model="JointNumber" label="联行号" required placeholder="请填写联行号" type="digit" />
      <!-- 预留手机号         -->
      <van-field v-model="ReservedMobilePhoneNumber" label="预留手机号" required placeholder="请填写预留手机号" type="digit" />
      <!-- /**
       * @Author: 飞
       * @Date: 2021-06-03 00:02:49
       * @Describe: 是法人结算
       */ -->
      <!-- 是法人结算 -->
      <template v-if="WhetherLegalPersonSettlement == '1'">
        <!-- 法人身份证正面照片   -->
        <van-field label="法人身份证正面照片(只能上传一张)" required class="StoreCashier" />
        <el-upload
          action="https://tpkl.minpinyouxuan.com/index.php/api/image"
          list-type="picture-card"
          :auto-upload="true"
          :data="{ type: 1 }"
          :name="'image[]'"
          :on-success="LegalIDCardFrontPhoto_S"
          :limit="1"
          class="MerchantPhoto"
        >
          <img src="./img/编组 3@2x.png" alt="" />
        </el-upload>
        <!-- 法人身份证反面照片    -->
        <van-field label="法人身份证反面照片(只能上传一张)" required class="StoreCashier" />
        <el-upload
          action="https://tpkl.minpinyouxuan.com/index.php/api/image"
          list-type="picture-card"
          :auto-upload="true"
          :data="{ type: 1 }"
          :name="'image[]'"
          :on-success="FrenchIDCard_S"
          :limit="1"
          class="MerchantPhoto"
        >
          <img src="./img/编组 3@2x.png" alt="" />
        </el-upload>
      </template>
      <!-- /**
       * @Author: 飞
       * @Date: 2021-06-03 00:02:49
       * @Describe: 非法人结算
       */ -->
      <!-- 是法人结算 -->
      <template v-if="WhetherLegalPersonSettlement == '2'">
        <!-- 结算人身份证正面照片    -->
        <van-field label="结算人身份证正面照片(只能上传一张)" required class="StoreCashier" />
        <el-upload
          action="https://tpkl.minpinyouxuan.com/index.php/api/image"
          list-type="picture-card"
          :auto-upload="true"
          :data="{ type: 1 }"
          :name="'image[]'"
          :on-success="PositivePhotoOfASettlementPersonIDCard_S"
          :limit="1"
          class="MerchantPhoto"
        >
          <img src="./img/编组 3@2x.png" alt="" />
        </el-upload>
        <!-- 结算人身份证反面照片     -->
        <van-field label="结算人身份证反面照片(只能上传一张)" required class="StoreCashier" />
        <el-upload
          action="https://tpkl.minpinyouxuan.com/index.php/api/image"
          list-type="picture-card"
          :auto-upload="true"
          :data="{ type: 1 }"
          :name="'image[]'"
          :on-success="CompletePhotoCard_S"
          :limit="1"
          class="MerchantPhoto"
        >
          <img src="./img/编组 3@2x.png" alt="" />
        </el-upload>
        <!-- 结算卡正面照片      -->
        <van-field label="结算卡正面照片(只能上传一张)" required class="StoreCashier" />
        <el-upload
          action="https://tpkl.minpinyouxuan.com/index.php/api/image"
          list-type="picture-card"
          :auto-upload="true"
          :data="{ type: 1 }"
          :name="'image[]'"
          :on-success="SettlementCardFrontPhoto_S"
          :limit="1"
          class="MerchantPhoto"
        >
          <img src="./img/编组 3@2x.png" alt="" />
        </el-upload>
      </template>
      <!-- 结算人手持身份证照    -->
      <van-field label="结算人手持身份证照(只能上传一张)" required class="StoreCashier" />
      <el-upload
        action="https://tpkl.minpinyouxuan.com/index.php/api/image"
        list-type="picture-card"
        :auto-upload="true"
        :data="{ type: 1 }"
        :name="'image[]'"
        :on-success="SettlementPersonHandheldIDCard_S"
        :limit="1"
        class="MerchantPhoto"
      >
        <img src="./img/编组 3@2x.png" alt="" />
      </el-upload>

      <!-- 商户微信经营范围  
      <van-field v-model="MerchantAlipayBusiness " label="商户微信经营范围  " required placeholder="请填写商户微信经营范围" /> -->
      <!-- 开始营业时间  -->
      <!-- <van-field label="开始营业时间 " required class="StoreCashier" /> -->
      <!-- <van-cell title="开始营业时间 " :value="date" @click="showshow = true" />
      <van-calendar v-model="showshow" :min-date="minDate" :max-date="maxDate" /> -->

      <!-- <van-calendar v-model="showshow" :min-date="minDate" :max-date="maxDate" /> -->

      <!-- <van-cell title="选择单个日期" :value="date" @click="showshow = true" />
      <van-calendar v-model="showshow" @confirm="onConfirm" />
      <van-calendar v-model="showshow" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" /> -->
    </div>
    <template v-if="active == 2">
      <el-button class="btn" @click="Previous">上一步</el-button>
      <el-button class="submit" @click="submit">提交</el-button>
    </template>
    <template v-if="active != 2 && active != 3">
      <el-button class="btn" @click="Previous">上一步</el-button>
      <el-button class="submit" @click="next">下一步</el-button>
    </template>

    <van-overlay v-show="protocolshow" :lock-scroll="false" @click="protocolshow = false">
      <div class="wrapper">
        <div class="block">
          <MatterAgreement />
        </div>
      </div>
    </van-overlay>
    <van-overlay v-show="protocolshow_p" :lock-scroll="false" @click="protocolshow_p = false">
      <div class="wrapper">
        <div class="block">
          <MatterAgreementcopy />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import { Toast } from "vant";
import MatterAgreement from "./MatterAgreement";
import MatterAgreementcopy from "./MatterAgreement copy";
// import axios from "axios";
export default {
  components: {
    MatterAgreement,
    MatterAgreementcopy
  },
  data() {
    return {
      // date: "",
      // showshow: false,
      // minDate: new Date(2000, 0, 1),
      // maxDate: new Date(2099, 0, 31),
      protocolshow: false,
      protocolshow_p: false,
      value1: "",
      pattern: /\d{6}/,

      LegalIDType: "", //法人证件类型
      active: 0, //第一步
      MerchantCategory: "", // 商户类型
      options: regionData, //地址库
      fieldNames: {
        //属性名 重置
        text: "label",
        value: "value",
        children: "children"
      },
      MerchantDoorPhoto: "", //商户门头照
      InStoreScene: "", //店内场景照
      StoreCashierashier: "", //店面收银台照

      fieldValue: "", //[地址]
      show: false, //展示隐藏
      cascaderValue: "", //展示

      province: "", //省
      city: "", //市
      Area: "", //区
      address_S: "", //详细地址

      MerchantName: "", //商户名
      Merchant: "", //商户简称
      Contact: "", //商户联系人
      ContactMicroSignal: "", //商户微信号
      ContactMobilePhoneNumber: "", //商户联系人手机号
      MerchantAlipayBusiness: "", //商户支付宝经营范围
      MerchantWeChatBusiness: "", //商户微信经营范围
      StartBusinessHours: "", //开业时间
      EndBusinessHours: "", //结束时间
      BusinessLicenseNumber: "", //营业执照编号
      businessLicense: "", //营业执照
      MerchantNote: "", //商户备注
      LegalPersonName: "", //法人姓名
      LegalIDType: "", //法人证件类型
      LegalIDNumber: "", //法人证件号
      IDCardValidity: "", //身份证有效期
      WhetherLegalPersonSettlement: "", //是否法人结算
      SettleAccountYype: "", //结算账户类型
      BusinessCustomRate: "380", //商家自定义费率

      SettlementCardNumber: "", //结算卡号

      SettlementCardholderName: "", //结算持卡人姓名
      SettlementPersonIDNumber: "", //结算人身份证号
      BankName: "", //开户行名称
      JointNumber: "", //联行号
      ReservedMobilePhoneNumber: "", //预留手机号

      LegalIDCardFrontPhoto: "", //法人身份证正面照片
      FrenchIDCard: "", //法人身份证反面照片

      PositivePhotoOfASettlementPersonIDCard: "", //结算人身份证正面照片
      CompletePhotoCard: "", //结算人身份证反面照片
      SettlementCardFrontPhoto: "", //结算卡正面照片

      SettlementPersonHandheldIDCard: "", //结算人手持身份证照
      tuid: 0, //推荐人uid
      RecommendedPerson: "", //推荐人手机号
      longitude: "",
      latitude: "",
      uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid
    };
  },
  watch: {
    // 推荐人
    RecommendedPerson: function (N, O) {
      if (N.length == 11) {
        this.new_uid(N);
      }
    }
  },
  methods: {
    click_right() {
      this.protocolshow = !this.protocolshow;
    },
    click_weixin() {
      this.protocolshow_p = !this.protocolshow_p;
    },
    next() {
      if (this.active == 0) {
        if (!this.MerchantName) {
          Toast("请填写商户名");
          return;
        }
        if (!this.Merchant) {
          Toast("请填写商户简称");
          return;
        }
        if (!this.Contact) {
          Toast("请填写商户联系人");
          return;
        }
        if (this.ContactMobilePhoneNumber.length != 11) {
          Toast("商户联系人手机号填写有误");
          return;
        }
        if (!this.fieldValue) {
          Toast("请选择地址");
          return;
        }
        if (!this.address_S) {
          Toast("详细地址不能为空");
          return;
        }

        if (!this.MerchantDoorPhoto) {
          Toast("请上传一张商户门头照");
          return;
        }
        if (!this.InStoreScene) {
          Toast("请上传一张店内场景照");
          return;
        }
        if (!this.StoreCashierashier) {
          Toast("请上传一张店面收银台照");
          return;
        }

        if (this.active++ > 1) this.active = 2;
      } else if (this.active == 1) {
        if (!this.MerchantCategory) {
          Toast("请选择商户类型");
          return;
        }
        if (!this.MerchantAlipayBusiness) {
          Toast("请填写商户支付宝经营范围");
          return;
        }
        if (!this.MerchantWeChatBusiness) {
          Toast("请填写商户微信经营范围");
          return;
        }
        if (!this.StartBusinessHours) {
          Toast("请填写开始营业时间");
          return;
        }
        if (!this.EndBusinessHours) {
          Toast("请填写结束营业时间");
          return;
        }
        if (!this.BusinessLicenseNumber) {
          Toast("请填写营业执照编号");
          return;
        }
        if (!this.businessLicense) {
          Toast("请上传一张营业执照");
          return;
        }
        if (!this.LegalPersonName) {
          Toast("请填写法人姓名");
          return;
        }
        if (!this.LegalIDType) {
          Toast("请选择法人证件类型 ");
          return;
        }
        if (!this.LegalIDNumber) {
          Toast("请填写法人证件号 ");
          return;
        }
        if (!this.IDCardValidity) {
          Toast("请填写身份证有效期 ");
          return;
        }
        if (this.active++ > 1) this.active = 2;
      }
    },
    // 上一步
    Previous() {
      if (this.active-- < 1) this.active = 0;
    },
    // 开业时间
    StartBusinessHours_onblur() {
      if (this.StartBusinessHours.length != 8) {
        Toast("开始营业时间填写有误");
      }
    },
    // 结束营业时间
    EndBusinessHours_onblur() {
      if (this.EndBusinessHours.length != 8) {
        Toast("结束营业时间填写有误");
      }
    },
    //身份证有效期
    IDCardValidity_onblur() {
      if (this.IDCardValidity.length != 17) {
        Toast("身份证有效期格式有误");
      }
    },
    // 商户名称字数
    MerchantName_onblur() {
      if (this.MerchantName.length < 8) {
        Toast("商户名必须大于八个字");
      }
    },
    // 商户简称名称字数
    Merchant_onblur() {
      if (this.Merchant.length < 8) {
        Toast("商户简称必须大于八个字");
      }
    },

    //联系人手机号验证
    ContactMobilePhoneNumber_onblur() {
      if (this.ContactMobilePhoneNumber.length != 11) {
        Toast("联系人手机号填写有误");
      }
    },

    //获取当前的经纬度
    getLocation() {
      var that = this;
      var mapObj = new AMap.Map("iCenter");
      mapObj.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
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
        // that.showLoaction = false;
        console.log("获取定位成功", obj);
        that.longitude = obj.position.lng;
        that.latitude = obj.position.lat;
      }

      function onError(obj) {
        that.$toast("获取定位失败，请点击定位按钮");
        // that.showLoaction = true;
      }
    },
    // 提交
    submit() {
      if (!this.WhetherLegalPersonSettlement) {
        Toast("请选择是否法人结算");
        return;
      }
      if (!this.SettleAccountYype) {
        Toast("请选择结算账户类型");
        return;
      }
      if (!this.SettlementCardNumber) {
        Toast("请填写结算卡号");
        return;
      }
      if (!this.SettlementCardholderName) {
        Toast("请填写结算持卡人姓名");
        return;
      }
      if (!this.SettlementPersonIDNumber) {
        Toast("请填写结算人身份证号");
        return;
      }
      if (!this.BankName) {
        Toast("请填写开户行名称");
        return;
      }
      if (!this.JointNumber) {
        Toast("请填写联行号");
        return;
      }

      if (this.ReservedMobilePhoneNumber.length != 11) {
        Toast("预留手机号有误");
        return;
      }

      if (this.WhetherLegalPersonSettlement == 1) {
        if (!this.LegalIDCardFrontPhoto) {
          Toast("请上传一张法人身份证正面照片");
          return;
        }
        if (!this.FrenchIDCard) {
          Toast("请上传一张法人身份证反面照片");
          return;
        }
      } else if (this.WhetherLegalPersonSettlement == 2) {
        if (!this.PositivePhotoOfASettlementPersonIDCard) {
          Toast("请上传一张结算人身份证正面照片");
          return;
        }
        if (!this.CompletePhotoCard) {
          Toast("请上传一张结算人身份证反面照片");
          return;
        }
        if (!this.SettlementCardFrontPhoto) {
          Toast("请上传一张结算卡正面照片");
          return;
        }
      }
      if (!this.SettlementPersonHandheldIDCard) {
        Toast("请上传一张结算人手持身份证照");
        return;
      }

      axios
        .get("http://zf.minpinyouxuan.com/merchants/merchantsEnter", {
          params: {
            TRADE_CODE: "PASM29",
            TX_OUT_CHANNEL: "WZPA",
            TX_PAY_TYPE: "PA029",
            TX_MERCHANT_NAME: this.MerchantName, //商户名
            TX_MERCHANT_ALIAS_NAME: this.Merchant, //商户简称
            TX_CONTACT_NAME: this.Contact, //商户联系人
            TX_CONTACT_WXID: this.ContactMicroSignal, //商户微信号
            TX_CONTACT_MOBILE: this.ContactMobilePhoneNumber, //商户联系人手机号
            TX_LNG: this.longitude,
            TX_LAT: this.latitude,
            TX_MERCHANT_TYPE: this.MerchantCategory, //商户类别

            TX_CATEGORY_ID: this.MerchantAlipayBusiness, //商户支付宝经营范围
            TX_OPEN_TIME: this.StartBusinessHours, //开业时间
            TX_CLOSE_TIME: this.EndBusinessHours, //结束时间

            TX_STORE_ADDRESS: this.address_S, //地址
            TX_PROVINCE: this.province, //省份名称
            TX_CITY: this.city, //城市名称
            TX_DISTRICT: this.Area, //区县名称

            TX_BIZ_LICENSE: this.BusinessLicenseNumber, //营业执照编号
            TX_LEGAL_PERSON: this.LegalPersonName, //法人姓名
            TX_LEGAL_CRED_TYPE: this.LegalIDType, //法人证件类型
            TX_LEGAL_ID_NO: this.LegalIDNumber, //法人证件号
            TX_SETTLE_TYPE: this.WhetherLegalPersonSettlement, //是否法人结算
            TX_ACCOUNT_TYPE: this.SettleAccountYype, //结算账户类型
            TX_BANK_CRAD_NO: this.SettlementCardNumber, //结算卡号
            TX_CARD_HOLDER: this.SettlementCardholderName, //结算持卡人姓名
            TX_ID_CARD_NUM: this.SettlementPersonIDNumber, //结算人身份证号
            TX_BANK_NAME: this.BankName, //开户行名称
            TX_BANK_BRANCHID: this.JointNumber, //联行号
            TX_BANK_RESERVEDPHONE: this.ReservedMobilePhoneNumber, //预留手机号
            TX_CASHIER_DESK_IMG_URL: this.StoreCashierashier, //店面收银台照
            TX_STORE_FRONT_IMG_URL: this.MerchantDoorPhoto, //商户门头照
            TX_BIZ_LICENSE_IMG_URL: this.businessLicense, //营业执照
            TX_ID_CARD_FRONT_IMG_URL: this.LegalIDCardFrontPhoto, //法人身份证正面照片
            TX_ID_CARD_BACK_IMG_URL: this.FrenchIDCard, //法人身份证反面照片
            TX_UCP_BANK_CRAD_NO: this.SettlementCardNumber, //请填写非法人   结算卡号
            uid: this.uid, //入住商户uid
            TX_WX_CATEGORY_ID: this.MerchantWeChatBusiness, //商户微信经营范围
            TX_CARDNO_TIME: this.IDCardValidity, //身份证有效期  20051205-20251205
            TX_SETTLE_HAND_CARD_IMG_URL: this.SettlementPersonHandheldIDCard, //结算人手持身份证照
            TX_BANKCARD_FRONT_IMG_URL: this.InStoreScene, //店内场景照

            phone: this.RecommendedPerson, //推荐人手机号
            tuid: this.tuid //推荐人uid
          }
        })
        .then(response => {
          if (response.data.MSG_CODE == "00") {
            console.log("response.data.MSG_TXT", response.data);
            this.$router.push({ name: "CashCodeApplicationSubmissionSuccess", params: {}, query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid } });

            // Toast("支付码已申请,等待审核");
            // setTimeout(() => {
            //   window.history.back(-1);
            // }, 1000);
            // this.$emit("SendOff", false);
          }
          if (response.data.MSG_CODE == "N9") {
            console.log("response.data.MSG_TXT", response.data);
            Toast("有必填项未填写");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // formatDate(date) {
    //   return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    // },
    // onConfirm(date) {
    //   this.showshow = false;
    //   this.date = this.formatDate(date);
    // },

    //通过手机号查询推荐人uid
    new_uid(val) {
      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v1/get_uid",
        data: {
          phone: val
        }
      })
        .then(response => {
          console.log("response", response.data.data.uid);
          if (response.data.result == 1) {
            // 推荐人
            console.log("type", type);
            that.tuid = response.data.data.uid;
          }
          if (response.data.result == 0) {
            // 手机号暂未绑定看领,请前往微信端绑定   默认tuid为0
            that.tuid = 0;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 结算卡正面照片
    SettlementCardFrontPhoto_S(res) {
      this.SettlementCardFrontPhoto = res.data.img_path;
    },
    // 结算人身份证反面照片
    CompletePhotoCard_S(res) {
      this.CompletePhotoCard = res.data.img_path;
    },
    // 结算人身份证正面照片
    PositivePhotoOfASettlementPersonIDCard_S(res) {
      this.PositivePhotoOfASettlementPersonIDCard = res.data.img_path;
    },

    // 结算人手持身份证照
    SettlementPersonHandheldIDCard_S(res) {
      this.SettlementPersonHandheldIDCard = res.data.img_path;
    },

    // 法人身份证反面照片
    FrenchIDCard_S(res) {
      this.FrenchIDCard = res.data.img_path;
    },
    // 法人身份证正面照片
    LegalIDCardFrontPhoto_S(res) {
      this.LegalIDCardFrontPhoto = res.data.img_path;
    },
    // 营业执照
    businessLicense_S(res) {
      this.businessLicense = res.data.img_path;
    },
    // 商户门头照 选择图片及上传
    MerchantDoorPhoto_S(res) {
      this.MerchantDoorPhoto = res.data.img_path;
    },
    // 店内场景照 选择图片及上传
    InStoreScene_S(res) {
      this.InStoreScene = res.data.img_path;
    },
    // 店面收银照 选择图片及上传
    StoreCashierashier_S(res) {
      this.StoreCashierashier = res.data.img_path;
    },

    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      console.log("selectedOptions", selectedOptions);
      this.show = false;
      this.fieldValue = selectedOptions.map(option => option.label).join("/");
      console.log("this.fieldValue", this.fieldValue);
      this.province = selectedOptions[0].label;
      this.city = selectedOptions[1].label;
      this.Area = selectedOptions[2].label;
    }
  },
  activated() {
    regionData;
    console.log("regionData", regionData);
    this.getLocation();
    // 每次进来后置顶
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="scss" scoped>
#content {
  height: calc(100% + 50px);
  .van-steps--horizontal {
    padding: 10px 12px 0;
    text-align: initial;
    margin-bottom: 16px;
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
      }
    }
  }
  //   文本
  .active {
    width: 92%;
    margin: 0 14px;
    background: #ffffff;
    display: inline-block;
    border-radius: 12px;
    .MerchantName {
      margin-top: 12px;
    }
    // 收银台
    .StoreCashier {
      /deep/.van-cell__title {
        width: 100%;
      }
    }
    .MerchantPhoto {
      .el-upload {
        img {
          //   width: 100%;
          //   height: 100%;
        }
      }
      /deep/.el-upload--picture-card {
        width: 300px;
        height: 184px;
        border: 0;
      }
      /deep/.el-upload-list__item {
        width: 300px;
        height: 184px;
      }
    }
    // 商户类别
    .MerchantCategory {
      /deep/.van-radio__icon {
        display: inline-block;
        vertical-align: sub;
      }
    }
  }
  //   提交
  .btn {
    width: 300px;
    height: 36px;
    background: #e60416;
    border-radius: 18px;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 36px;
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .submit {
    width: 300px;
    height: 36px;
    background: #e60416;
    border-radius: 18px;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 36px;
    display: inline-block;
    margin-bottom: 30px;
  }
}
</style>