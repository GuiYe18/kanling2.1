<!--
 * @Author: 飞
 * @Date: 2021-06-02 15:34:35
 * @LastEditTime: 2021-09-29 17:11:42
 * @FilePath: \you-shop1\src\views\MerchantSettled\MerchantSettled.vue
 * @Describe: 
-->
<template>
  <div id="content">
    <van-steps :active="active" class="">
      <van-step>主体信息</van-step>
      <van-step>经营信息</van-step>
      <van-step>收款账户</van-step>
      <van-step>入驻审核</van-step>
    </van-steps>

    <div class="active" v-show="active == 0">
      <!-- 推荐人 -->
      <van-field v-model="RecommendedPerson" label="推荐人" required placeholder="请填写推荐人手机号" class="MerchantName" type="digit" @blur="blur" />
      <!-- 获取验证码 -->
      <van-field v-model="VerificationCode" required type="number" label="验证码" maxlength="6" placeholder="请输入短信验证码">
        <template #button>
          <van-count-down v-show="!getVerificationCode" ref="countDown" millisecond :time="Calculatetime" :auto-start="false" format="ss" @finish="finish" @change="change" />
          <van-grid clickable v-show="getVerificationCode">
            <van-grid-item text="获取验证码" @click="start" />
          </van-grid>
        </template>
      </van-field>

      <!-- 商户名 -->
      <van-field v-model="MerchantName" label="营业执照名称" required placeholder="请填写营业执照名称" class="MerchantName" />
      <!-- 商户简称 -->
      <van-field v-model="Merchant" label="商户简称" required placeholder="请填写商户简称" @blur="Merchant_onblur" />
      <!-- 联系人 -->
      <van-field v-model="Contact" label="联系人" required placeholder="请填写商户联系人" @blur="Contact_onblur" />
      <!-- 联系人微信号 -->
      <van-field v-model="ContactMicroSignal" label="联系人微信号" placeholder="请填写联系人微信号（选填）" />
      <!-- 联系人手机号 -->
      <van-field v-model="ContactMobilePhoneNumber" label="联系人手机号" required placeholder="请填写联系人手机号" @blur="ContactMobilePhoneNumber_onblur" type="digit" />
      <!-- 地区 -->
      <van-field v-model="fieldValue" is-link readonly label="营业执照地区" required placeholder="请选择营业执照地区" @click="show = true" />
      <!-- this.$route.query.ReRe -->
      <van-popup v-model="show" round position="bottom">
        <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="show = false" @finish="onFinish" :field-names="fieldNames" />
      </van-popup>

      <!-- 详细地址 -->
      <van-field v-model="address_S" label="营业执照详细地址" required placeholder="请填写营业执照详细地址" />
      <!-- 商户门头照 -->
      <van-field label="商户门头照(只能上传一张)" required class="StoreCashier" />

      <van-uploader :after-read="onRead_MerchantDoorPhoto" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="MerchantDoorPhoto ? MerchantDoorPhoto : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="MerchantDoorPhoto != ''" class="Stroke" name="cross" @click="Stroke('MerchantDoorPhoto')" />
        </div>
      </van-uploader>

      <!-- 店内场景照 -->
      <van-field label="店内场景照(只能上传一张)" required class="StoreCashier" />

      <van-uploader :after-read="onRead_InStoreScene" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="InStoreScene ? InStoreScene : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="InStoreScene != ''" class="Stroke" name="cross" @click="Stroke('InStoreScene')" />
        </div>
      </van-uploader>

      <!-- 店面收银台照 -->
      <van-field label="店面收银台照(只能上传一张)" required class="StoreCashier" />

      <van-uploader :after-read="onRead_StoreCashierashier" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="StoreCashierashier ? StoreCashierashier : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="StoreCashierashier != ''" class="Stroke" name="cross" @click="Stroke('StoreCashierashier')" />
        </div>
      </van-uploader>
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
      <van-field v-model="MerchantAlipayBusiness_text" is-link readonly label="商户支付宝经营范围" required placeholder="请选择商户支付宝经营范围" @click="onfocus('ZFB')" />

      <!-- <van-field
        v-model="MerchantAlipayBusiness"
        label="商户支付宝经营范围"
        required
        placeholder="例:2015050700000000"
        right-icon="warning-o"
        @click-right-icon="click_weixin"
        @focus="onfocus('ZFB')"
      /> -->

      <!-- <van-field v-model="value1" label="文本" left-icon="smile-o" right-icon="warning-o" placeholder="显示图标" /> -->
      <!-- 商户微信经营范围   -->
      <van-field v-model="MerchantWeChatBusiness_text" is-link readonly label="商户微信经营范围" required placeholder="请选择商户微信经营范围" @click="onfocus('WX')" />

      <!-- <van-field
        v-model="MerchantWeChatBusiness"
        label="商户微信经营范围"
        required
        placeholder="例:545"
        type="digit"
        right-icon="warning-o"
        @click-right-icon="click_right"
        @focus="onfocus('WX')"
        readonly
      /> -->
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
      <van-field v-model="StartBusinessHours" is-link readonly label="开始营业期限" required placeholder="开始营业期限" @click="StartingTime" />

      <!-- <van-field v-model="StartBusinessHours" label="开始营业时间" required placeholder="例：20210405" @blur="StartBusinessHours_onblur" type="digit" /> -->
      <!-- 结束时间  如果是企业自己填写接收日期 -->
      <van-field v-show="MerchantCategory == 1" v-model="EndBusinessHours_show" is-link readonly label="结束营业期限" required placeholder="结束营业期限" @click="EndTime" />

      <!-- 营业执照编号    -->
      <van-field v-model="BusinessLicenseNumber" label="营业执照编号" required placeholder="请填写营业执照编号" />
      <!-- 营业执照  -->
      <van-field label="营业执照(只能上传一张)  " required class="StoreCashier" />

      <van-uploader :after-read="onRead_businessLicense" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="businessLicense ? businessLicense : require('./img/businessLicense.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="businessLicense != ''" class="Stroke" name="cross" @click="Stroke('businessLicense')" />
        </div>
      </van-uploader>
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

      <!-- <van-field v-model="IDCardValidity_begin" label="身份证有效期开始时间" required placeholder="20051205"  /> -->
      <!-- <van-field v-model="IDCardValidity_theEnd" label="身份证有效期结束时间" required placeholder="20051205"  /> -->

      <van-field v-model="IDCardValidity_begin" is-link readonly label="身份证有效期开始时间" required placeholder="请选择身份证有效期开始时间" @click="ValidUntilStartTime" />
      <van-field v-model="IDCardValidity_theEnd" is-link readonly label="身份证有效期结束时间" required placeholder="请选择身份证有效期结束时间" @click="ValidityPeriodEndTime" />
    </div>
    <div class="active" v-show="active == 2">
      <!-- 是否法人收款  -->
      <van-field label="是否法人收款 " required class="MerchantCategory">
        <template #input>
          <van-radio-group v-model="WhetherLegalPersonSettlement" direction="horizontal">
            <van-radio name="1" checked-color="#ee0a24">是</van-radio>
            <!-- <van-radio name="2" checked-color="#ee0a24">否</van-radio> -->
          </van-radio-group>
        </template>
      </van-field>
      <!-- 收款账户类型   -->
      <van-field label="收款账户类型  " required class="MerchantCategory">
        <template #input>
          <van-radio-group v-model="SettleAccountYype" direction="horizontal">
            <van-radio name="1" checked-color="#ee0a24"> 对私</van-radio>

            <van-radio name="0" checked-color="#ee0a24" v-show="MerchantCategory != 0">对公</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 商家自定义费率  -->
      <!-- <van-field v-model="BusinessCustomRate" label="商家自定义费率" required placeholder="请填写商家自定义费率（选填）" /> -->

      <!-- 收款卡号    -->
      <van-field v-show="SettleAccountYype == 1" v-model="SettlementCardNumber" label="收款银行卡号" required placeholder="请填写收款银行卡号" type="digit" />
      <!-- 收款卡号    -->
      <van-field v-show="SettleAccountYype == 0" v-model="SettlementCardNumber" label="公司收款卡号" required placeholder="请填写公司收款卡号" type="digit" />

      <!-- 收款持卡人姓名     -->
      <van-field v-show="SettleAccountYype == 1" v-model="SettlementCardholderName" label="收款持卡人姓名" required placeholder="请填写收款持卡人姓名" />

      <!-- 收款公司全称     -->
      <van-field v-show="SettleAccountYype == 0" v-model="SettlementCardholderName" label="收款公司全称" required placeholder="请填写收款公司全称" />

      <!-- 收款人身份证号      -->
      <van-field v-model="SettlementPersonIDNumber" label="收款人身份证号" required placeholder="请填写收款人身份证号" />

      <!-- 银行地址      -->
      <van-field v-model="BankAddress" is-link readonly label="银行地址" required placeholder="请选择银行所在地区" @click="show = true" />
      <van-popup v-model="show" round position="bottom">
        <van-cascader v-model="cascaderValue" title="请选择银行所在地区" :options="options" @close="show = false" @finish="ONBankAddress" :field-names="fieldNames" />
      </van-popup>

      <!-- 选择开户银行       -->
      <van-field v-model="ChooseTheBank" is-link readonly label="选择开户银行" required placeholder="选择开户银行" @click="SelectBankShow = true" />

      <!-- 开户行名称       -->
      <van-field v-show="!BankNameShow" v-model="BankName" label="开户行名称" required placeholder="请选择开户支行名称" @click="ONBankName" @input="oninput" />

      <!-- 联行号        -->
      <!-- <van-field v-model="JointNumber" label="联行号"  placeholder="系统会自动获取" type="digit" disabled /> -->

      <!-- 预留手机号         -->
      <van-field v-model="ReservedMobilePhoneNumber" label="银行预留手机号" required placeholder="请填写银行预留手机号" type="digit" />
      <!-- /**
       * @Author: 飞
       * @Date: 2021-06-03 00:02:49
       * @Describe: 是法人收款
       */ -->
      <!-- 是法人收款 -->
      <template v-if="WhetherLegalPersonSettlement == '1'">
        <!-- 法人身份证正面照片   -->
        <van-field label="法人身份证正面照片(只能上传一张)" required class="StoreCashier" />

        <van-uploader :after-read="onRead_LegalIDCardFrontPhoto" class="MerchantPhoto">
          <div style="padding: 0px; margin: 0 auto">
            <img :src="LegalIDCardFrontPhoto ? LegalIDCardFrontPhoto : require('./img/LegalIDCardFrontPhoto.png')" style="width: 100%" class="avatar" />
            <van-icon v-show="LegalIDCardFrontPhoto != ''" class="Stroke" name="cross" @click="Stroke('LegalIDCardFrontPhoto')" />
          </div>
        </van-uploader>
        <!-- 法人身份证反面照片    -->
        <van-field label="法人身份证反面照片(只能上传一张)" required class="StoreCashier" />

        <van-uploader :after-read="onRead_FrenchIDCard" class="MerchantPhoto">
          <div style="padding: 0px; margin: 0 auto">
            <img :src="FrenchIDCard ? FrenchIDCard : require('./img/FrenchIDCard.png')" style="width: 100%" class="avatar" />
            <van-icon v-show="FrenchIDCard != ''" class="Stroke" name="cross" @click="Stroke('FrenchIDCard')" />
          </div>
        </van-uploader>
      </template>
      <!-- /**
       * @Author: 飞
       * @Date: 2021-06-03 00:02:49
       * @Describe: 非法人收款
       */ -->
      <!-- 是法人收款 -->
      <template v-if="WhetherLegalPersonSettlement == '2'">
        <!-- 收款人身份证正面照片    -->
        <van-field label="收款人身份证正面照片(只能上传一张)" required class="StoreCashier" />
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
          <img src="./img/Group.png" alt="" />
        </el-upload>
        <!-- 收款人身份证反面照片     -->
        <van-field label="收款人身份证反面照片(只能上传一张)" required class="StoreCashier" />
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
          <img src="./img/Group.png" alt="" />
        </el-upload>
        <!-- 收款卡正面照片      -->
        <van-field label="收款卡正面照片(只能上传一张)" required class="StoreCashier" />
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
          <img src="./img/Group.png" alt="" />
        </el-upload>
      </template>
      <!-- 收款人手持身份证照    -->
      <van-field label="收款人手持身份证照(只能上传一张)" required class="StoreCashier" />
      <!-- <el-upload
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
      </el-upload> -->
      <van-uploader :after-read="onRead_SettlementPersonHandheldIDCard" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="SettlementPersonHandheldIDCard ? SettlementPersonHandheldIDCard : require('./img/SettlementPersonHandheldIDCard.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="SettlementPersonHandheldIDCard != ''" class="Stroke" name="cross" @click="Stroke('SettlementPersonHandheldIDCard')" />
        </div>
      </van-uploader>

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
      <el-button class="submit" @click="doubleConfirm">提交</el-button>
    </template>
    <template v-if="active != 2 && active != 3">
      <el-button class="btn" @click="Previous">上一步</el-button>
      <el-button class="submit" @click="next">下一步</el-button>
    </template>

    <!-- 选择银行 -->
    <van-popup v-model="SelectBankShow" position="bottom" :style="{ height: '60%' }">
      <van-list finished-text="没有更多了">
        <van-cell v-for="item in banklist" :key="item" :title="item" @click="Choose(item)" />
      </van-list>
    </van-popup>

    <!-- 开户行显示 -->
    <van-popup v-model="BankNameShow" position="bottom" :style="{ height: '60%' }" @close="onclose">
      <!-- 开户行名称       -->
      <van-field v-model="BankName" label="开户行名称" required placeholder="请选择开户支行名称" @click="ONBankName" @input="oninput" />
      <van-list finished-text="没有更多了" error-text="本区域未获取到支行 请联系客服 客服电话:01053382256" :error.sync="error">
        <van-cell v-for="item in OpeningList" :key="item" :title="item.fh" @click="OpenBankDisplay(item)" />
      </van-list>
    </van-popup>
    <!-- 商户微信经营范围 -->
    <van-overlay v-show="protocolshow" :lock-scroll="false" @click="protocolshow = false">
      <div class="wrapper">
        <div class="block">
          <MatterAgreement />
        </div>
      </div>
    </van-overlay>
    <!-- 商户支付宝经营范围 -->
    <van-overlay v-show="protocolshow_p" :lock-scroll="false" @click="protocolshow_p = false">
      <div class="wrapper">
        <div class="block">
          <MatterAgreementcopy />
        </div>
      </div>
    </van-overlay>
    <!-- 支付宝经营范围 -->
    <van-popup v-model="BusinessScope" round position="bottom" :style="{ height: '60%' }">
      <van-list finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in BusinessScopeList" :key="item" :title="item.name" @click="ONChoose(item)" />
      </van-list>
    </van-popup>
    <!-- Dates -->
    <van-popup v-model="Dates" round position="bottom">
      <div class="IDCardValidTime" v-show="longIt">
        <span @click="long">有效期为长期点击此处</span>
      </div>
      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import { Tabs, Toast } from "vant";
import MatterAgreement from "./MatterAgreement";
import MatterAgreementcopy from "./MatterAgreement copy";
// import axios from "axios";
import data from "./data.js";
let { wx_data, zfb_data, wx_data_enterprise } = data();

export default {
  components: {
    MatterAgreement,
    MatterAgreementcopy
  },
  data() {
    return {
      zfb_data: zfb_data,
      wx_data: wx_data,
      wx_data_enterprise: wx_data_enterprise,
      // 设置验证码时间
      Calculatetime: 60 * 1000,
      VerificationCode: "", //验证码

      // 验证码展示
      getVerificationCode: true,
      Anti_shake: true, //防抖
      longIt: false, //选择结束日期的时间
      TimeType: "", //存放选择时间类型

      date: "",
      Dates: false, //日期
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2099, 12, 31),
      currentDate: new Date(2021, 0, 17),

      BusinessScope: false,
      BusinessScopeList: [],
      finished: false,

      error: false, //提示
      BankName: "", //开户行名称
      OpeningList: [], //开户行列表
      BankNameShow: false, //开户行

      banklist: [], //银行列表
      ChooseTheBank: "", //选择的银行
      SelectBankShow: false, //选择银行
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
      BankAddress: "", //银行地址

      fieldValue: "", //[地址]
      show: false, //展示隐藏
      cascaderValue: "", //展示

      province_bank: "", //银行省
      city_bank: "", //银行市

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
      EndBusinessHours_show: "", //结束时间

      BusinessLicenseNumber: "", //营业执照编号
      businessLicense: "", //营业执照
      MerchantNote: "", //商户备注
      LegalPersonName: "", //法人姓名
      LegalIDType: "", //法人证件类型
      LegalIDNumber: "", //法人证件号
      IDCardValidity: "", //身份证有效期
      IDCardValidity_begin: "", //身份证有效期开始时间
      IDCardValidity_theEnd: "", //身份证有效期结束时间
      WhetherLegalPersonSettlement: "1", //是否法人收款
      SettleAccountYype: "", //收款账户类型
      BusinessCustomRate: "380", //商家自定义费率

      SettlementCardNumber: "", //收款卡号

      SettlementCardholderName: "", //收款持卡人姓名
      SettlementPersonIDNumber: "", //收款人身份证号

      JointNumber: "", //联行号
      ReservedMobilePhoneNumber: "", //预留手机号

      LegalIDCardFrontPhoto: "", //法人身份证正面照片
      FrenchIDCard: "", //法人身份证反面照片

      PositivePhotoOfASettlementPersonIDCard: "", //收款人身份证正面照片
      CompletePhotoCard: "", //收款人身份证反面照片
      SettlementCardFrontPhoto: "", //收款卡正面照片

      SettlementPersonHandheldIDCard: "", //收款人手持身份证照
      tuid: 0, //推荐人uid
      RecommendedPerson: "", //推荐人手机号
      longitude: "",
      latitude: "",
      uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid
    };
  },
  watch: {
    // 手机号监控
    VerificationCode: function (N, O) {
      if (N.length == 6) {
        // 验证码验证是否正确
        this.VerificationCodeVerification();
      }
    },
    // 推荐人
    RecommendedPerson: function (N, O) {
      if (N.length == 11) {
        this.new_uid(N);
      }
    },
    MerchantCategory: function (N, O) {
      if (N == 0) {
        // 个人没有结束时间
        this.EndBusinessHours = "20991230";
        // 个人选对私
        this.SettleAccountYype = "1";
      }
      if (N == 1) {
        // 企业有结束时间
        this.EndBusinessHours = "";
        // 企业选对公
        this.SettleAccountYype = "0";
      }
      // 微信 支付宝经营范围  为空

      this.MerchantWeChatBusiness_text = "";
      this.MerchantAlipayBusiness_text = "";
      this.MerchantWeChatBusiness = "";
      this.MerchantAlipayBusiness = "";
    }
    // 监控是否选择地址
  },
  methods: {
    // 验证码验证是否正确
    VerificationCodeVerification() {
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v1/superior_check",
        data: {
          phone: this.RecommendedPerson,
          code: this.VerificationCode
        }
      })
        .then(response => {
          if (response.data.result == 0) {
            // console.log("response.data", );
            Toast(response.data.msg);
            setTimeout(() => {
              this.$router.push({ name: "member", params: {}, query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid } });
            }, 3000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 重新填写
    fillInAgain() {
      if (this.$route.query.ReRe !== undefined) {
        var that = this;
        axios({
          method: "post",
          url: "https://tpkl.minpinyouxuan.com/api/v1/shop_details",
          data: {
            id: this.$route.query.MasterkeyID //银行省
          }
        })
          .then(response => {
            if (response.data.result == 1) {
              // 主体信息
              if (response.data.data.phone !== null) {
                that.RecommendedPerson = response.data.data.phone; //推荐人
              }
              that.MerchantName = response.data.data.tx_merchant_name; //商户名_data
              that.Merchant = response.data.data.tx_merchant_alias_name; //商户简称_data
              that.Contact = response.data.data.tx_contact_name; //联系人
              that.ContactMicroSignal = response.data.data.tx_contact_wxid; //联系人微信号
              that.ContactMobilePhoneNumber = response.data.data.tx_contact_mobile; //联系人手机号
              that.fieldValue = response.data.data.tx_province + "/" + response.data.data.tx_city + "/" + response.data.data.tx_district; // 省市区

              that.province = response.data.data.tx_province; //省
              that.city = response.data.data.tx_city; //市
              that.Area = response.data.data.tx_district; //区
              that.address_S = response.data.data.tx_store_address; //详细地址
              that.MerchantDoorPhoto = response.data.data.tx_store_front_img_url; //商户门头照
              that.InStoreScene = response.data.data.tx_bankcard_front_img_url; //店内场景照
              that.StoreCashierashier = response.data.data.tx_cashier_desk_img_url; //收银台照片

              // 经营
              that.MerchantCategory = response.data.data.tx_merchant_type; //商户类别
              that.$nextTick(() => {
                that.MerchantAlipayBusiness = response.data.data.tx_category_id; //商户支付宝经验范围:
                that.zfb_data.forEach(item => {
                  if (item.val == response.data.data.tx_category_id) {
                    that.MerchantAlipayBusiness_text = item.name;
                  }
                });
                that.MerchantWeChatBusiness = response.data.data.tx_wx_category_id; //微  信经营范围:
                if (response.data.data.tx_merchant_type == "0") {
                  that.wx_data.forEach(item => {
                    if (item.val == response.data.data.tx_wx_category_id) {
                      that.MerchantWeChatBusiness_text = item.name;
                    }
                  });
                }
                if (response.data.data.tx_merchant_type == "1") {
                  that.wx_data_enterprise.forEach(item => {
                    if (item.val == response.data.data.tx_wx_category_id) {
                      that.MerchantWeChatBusiness_text = item.name;
                    }
                  });
                }
              });
              that.StartBusinessHours = response.data.data.tx_open_time; //开始营业时间:
              that.EndBusinessHours = response.data.data.tx_close_time; //结束营业时间:
              that.BusinessLicenseNumber = response.data.data.tx_biz_license; //营业执照编号:
              that.businessLicense = response.data.data.tx_biz_license_img_url; //营业执照照片:
              that.MerchantNote = response.data.data.tx_memo; //商户备注:
              that.LegalPersonName = response.data.data.tx_legal_person; //法人姓名:
              that.LegalIDType = response.data.data.tx_legal_cred_type; //法人证件类型:
              that.LegalIDNumber = response.data.data.tx_legal_id_no; //法人证件号:

              // 收款
              that.WhetherLegalPersonSettlement = response.data.data.tx_settle_type; //是否法人收款
              that.SettleAccountYype = response.data.data.tx_account_type; //收款账户类型
              that.SettlementCardNumber = response.data.data.tx_bank_crad_no; //收款银行卡号
              that.SettlementCardholderName = response.data.data.tx_card_holder; //收款持卡人姓名
              that.SettlementPersonIDNumber = response.data.data.tx_id_card_num; //收款人身份证号码

              that.ReservedMobilePhoneNumber = response.data.data.tx_bank_reservedphone; //银行预留手机号
              that.LegalIDCardFrontPhoto = response.data.data.tx_id_card_front_img_url; //法人身份证正面
              that.FrenchIDCard = response.data.data.tx_id_card_back_img_url; //法人身份证反面
              that.SettlementPersonHandheldIDCard = response.data.data.tx_settle_hand_card_img_url; //收款人手持身份证照片
            }
            if (response.data.result == 0) {
              that.OpeningList = "";
              that.error = true;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 点击长期
    long() {
      this.Dates = false;
      this.longIt = false; //结束日期的长期关闭
      if (this.TimeType == "IDCardValidity_theEnd") {
        this.IDCardValidity_theEnd = "长期";
        return;
      }
      if (this.TimeType == "EndBusinessHours") {
        this.EndBusinessHours = "20991230";
        this.EndBusinessHours_show = "长期";
        return;
      }
    },
    // 有效期开始时间
    ValidUntilStartTime() {
      this.Dates = true;
      this.TimeType = "IDCardValidity_begin";
    },
    // 有效期结束时间
    ValidityPeriodEndTime() {
      this.longIt = true; //结束日期的长期打开
      this.Dates = true; //打开选择日期组件
      this.TimeType = "IDCardValidity_theEnd";
    },

    // 点击选择开始时间
    StartingTime() {
      this.Dates = true;
      this.TimeType = "StartBusinessHours";
    },
    // 点击选择结束时间
    EndTime() {
      this.longIt = true; //结束日期的长期打开
      this.Dates = true;
      this.TimeType = "EndBusinessHours";
    },

    // 日期组件确认
    onConfirm(date) {
      this.date = this.formatDate(date);
      this.Dates = false;

      if (this.TimeType == "EndBusinessHours") {
        this.EndBusinessHours_show = this.date;
      }

      this[this.TimeType] = this.date;
      this.longIt = false; //结束日期的长期关闭
    },

    //删除
    Stroke(msg) {
      this[msg] = "";
    },
    // 关闭是出发
    onclose() {
      if (this.JointNumber == "") {
        this.BankName = "";
      }
    },
    // 支行有动静
    oninput() {
      // 地址银行有获取联合号
      this.GetAUnion();
    },
    // 点击支行
    ONBankName() {
      // 支行名称
      this.BankName = "";
      // 联行号
      this.JointNumber = "";

      // 弹出框
      this.BankNameShow = true;
      // 并进行搜索
      // 地址银行有获取联合号
      this.GetAUnion();
    },
    // 选中支行
    OpenBankDisplay(item) {
      // 支行列表隐藏起来
      this.BankNameShow = false;
      // 支行名
      this.BankName = item.fh;
      // 联行号
      this.JointNumber = item.llh;
    },

    // 获取联合号
    GetAUnion() {
      this.error = false;
      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/api/v1/deposit_bank_list",
        data: {
          province: this.province_bank, //银行省
          city: this.city_bank, //银行市
          bank: this.ChooseTheBank, //选择的银行
          deposit_name: this.BankName //支行名称
        }
      })
        .then(response => {
          if (response.data.result == 1) {
            that.OpeningList = response.data.data;
          }
          if (response.data.result == 0) {
            that.OpeningList = "";
            that.error = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 选中的银行列表
    Choose(item) {
      this.ChooseTheBank = item;
      this.SelectBankShow = false;
      // 重复选中银行  给重置 // 支行名称// 联行号
      this.BankName = "";
      this.JointNumber = "";
    },
    // 获取银行list
    GetBankList() {
      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/api/v1/bank_list"
      })
        .then(response => {
          if (response.data.result == 1) {
            that.banklist = response.data.data;
          }
          if (response.data.result == 0) {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 商户门头照(只能上传一张)
    onRead_MerchantDoorPhoto(e, flag) {
      this.onRead(e, flag, "MerchantDoorPhoto");
    },
    // 店内场景照
    onRead_InStoreScene(e, flag) {
      this.onRead(e, flag, "InStoreScene");
    },
    // 店面收银台照
    onRead_StoreCashierashier(e, flag) {
      this.onRead(e, flag, "StoreCashierashier");
    },
    // 营业执照
    onRead_businessLicense(e, flag) {
      this.onRead(e, flag, "businessLicense");
    },
    // 法人身份证正面照片
    onRead_LegalIDCardFrontPhoto(e, flag) {
      this.onRead(e, flag, "LegalIDCardFrontPhoto");
    },
    // 法人身份证反面照片
    onRead_FrenchIDCard(e, flag) {
      this.onRead(e, flag, "FrenchIDCard");
    },
    // 收款人手持身份证照
    onRead_SettlementPersonHandheldIDCard(e, flag) {
      this.onRead(e, flag, "SettlementPersonHandheldIDCard");
    },

    // 上传照片
    onRead(e, flag, parameter) {
      console.log("e, flag, parameter", e, flag, parameter);
      if (e.file.size > 1024 * 1024 * 8) {
        this.$dialog.confirm({ message: "上传的图片太大啦,请重新上传,记住 上传的图片一定不要超过8M哦!" });
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      if (flag !== true) {
        if (e.file.size > this.photosize) {
          this.imgPreview(e.file, 1);
          return false;
        }
      }

      let fd = new FormData();
      if (flag === true) {
        fd.append("image[]", e);
        fd.append("type", 1);
      } else {
        fd.append("image[]", e.file); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
        fd.append("type", 1);
      }
      var That = this;
      axios
        .post("https://tpkl.minpinyouxuan.com/index.php/api/image", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          var responseData = response.data;

          if (responseData.result == 1) {
            That[parameter] = responseData.data.img_path;
            loading.close();
          } else {
            Toast(responseData.msg);
          }
        })
        .catch(error => {
          this.$dialog.confirm({ message: "上传图片的格式有误,请重新上传!" });
          loading.close();
        });
    },

    click_right() {
      this.protocolshow = !this.protocolshow;
    },
    click_weixin() {
      this.protocolshow_p = !this.protocolshow_p;
    },
    // 支付宝经营范围
    onfocus(msg) {
      if (msg == "ZFB") {
        if (this.MerchantCategory == "") {
          Toast("请先选择商户类型");
          return;
        }
        this.BusinessScope = !this.BusinessScope;
        this.BusinessScopeList = this.zfb_data;

        return;
      }
      if (msg == "WX") {
        // 个人
        if (this.MerchantCategory == "0") {
          this.BusinessScope = !this.BusinessScope;
          this.BusinessScopeList = this.wx_data;
          return;
        }
        // 企业
        if (this.MerchantCategory == "1") {
          this.BusinessScope = !this.BusinessScope;
          this.BusinessScopeList = this.wx_data_enterprise;
          return;
        }
        Toast("请先选择商户类型");
      }
    },
    ONChoose(msg) {
      if (msg.type == "ZFB") {
        this.BusinessScope = !this.BusinessScope;
        this.MerchantAlipayBusiness = msg.val;
        this.MerchantAlipayBusiness_text = msg.name;
        return;
      }
      if (msg.type == "WX") {
        this.BusinessScope = !this.BusinessScope;
        this.MerchantWeChatBusiness = msg.val;
        this.MerchantWeChatBusiness_text = msg.name;
        return;
      }
    },
    // 正则验证手机号
    blur() {
      const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      // const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!regMobile.test(this.RecommendedPerson)) {
        Toast("请输入合法的手机号");
        return;
      }
    },
    //获取验证码
    finish() {
      this.getVerificationCode = !this.getVerificationCode;
    },
    // 倒计时变化时发生变化
    change() {
      this.getVerificationCode = false;
    },
    // 倒计时开始  获取验证码
    start() {
      if (this.RecommendedPerson == "") {
        Toast("手机号不能为空");
        return;
      }

      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!regMobile.test(this.RecommendedPerson)) {
        Toast("请输入合法的手机号");
        return;
      }

      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/identify",
        data: {
          phone: this.RecommendedPerson
        }
      })
        .then(response => {
          if (response.data.result == 1) {
            Toast("发送成功");
            // 重置  开始 秒表
            this.$refs.countDown.reset();
            this.$refs.countDown.start();
          }
          if (response.data.result == 0) {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    next() {
      if (this.active == 0) {
        if (!this.RecommendedPerson) {
          Toast("请填写推荐人手机号");
          return;
        }
        if (!this.VerificationCode) {
          Toast("请填写验证码");
          return;
        }

        if (!this.MerchantName) {
          Toast("请填写商户名");
          return;
        }
        if (!this.Merchant) {
          Toast("请填写商户简称");
          return;
        }
        if (this.Merchant.length < 8) {
          Toast("商户简称必须大于八个字");
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
        if (this.EndBusinessHours.length != 8) {
          Toast("结束营业时间填写有误");
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
        if (!this.IDCardValidity_begin) {
          Toast("请填写身份证有效期开始时间");
          return;
        }
        if (!this.IDCardValidity_theEnd) {
          Toast("请填写身份证有效期结束时间 ");
          return;
        }
        if (this.active++ > 1) this.active = 2;
      }
    },
    // 上一步
    Previous() {
      if (this.active-- < 1) this.active = 0;
    },

    // // 开业时间
    // StartBusinessHours_onblur() {
    //   if (this.StartBusinessHours.length != 8) {
    //     Toast("开始营业时间填写有误");
    //   }
    // },

    // 结束营业时间
    EndBusinessHours_onblur() {
      if (this.EndBusinessHours.length != 8) {
        Toast("结束营业时间填写有误");
      }
    },
    // //身份证有效期
    // IDCardValidity_onblur() {
    //   if (this.IDCardValidity.length != 17) {
    //     Toast("身份证有效期格式有误");
    //   }
    // },
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
        // console.log("获取定位成功", obj);
        that.longitude = obj.position.lng;
        that.latitude = obj.position.lat;
      }

      function onError(obj) {
        that.$toast("获取定位失败，请点击定位按钮");
        // that.showLoaction = true;
      }
    },

    // 再次确认
    doubleConfirm() {
      // console.log("regionData", this.options);
      // return;
      this.$dialog
        .confirm({
          message: `请详细检查填写的资料,提交之后一律不能修改!`
        })
        .then(() => {
          // on confirm
          this.submit();
        })
        .catch(() => {
          return;
          // on cancel
        });
    },
    // 提交
    submit() {
      if (!this.RecommendedPerson) {
        Toast("推荐人手机号不能为空");
        return;
      }
      if (!this.VerificationCode) {
        Toast("验证码不能为空");
        return;
      }

      if (!this.WhetherLegalPersonSettlement) {
        Toast("请选择是否法人收款");
        return;
      }
      if (!this.SettleAccountYype) {
        Toast("请选择收款账户类型");
        return;
      }
      if (!this.SettlementCardNumber) {
        Toast("请填写收款卡号");
        return;
      }
      if (!this.SettlementCardholderName) {
        Toast("请填写收款持卡人姓名");
        return;
      }
      if (!this.SettlementPersonIDNumber) {
        Toast("请填写收款人身份证号");
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
          Toast("请上传一张收款人身份证正面照片");
          return;
        }
        if (!this.CompletePhotoCard) {
          Toast("请上传一张收款人身份证反面照片");
          return;
        }
        if (!this.SettlementCardFrontPhoto) {
          Toast("请上传一张收款卡正面照片");
          return;
        }
      }
      if (!this.SettlementPersonHandheldIDCard) {
        Toast("请上传一张收款人手持身份证照");
        return;
      }

      setTimeout(() => {
        this.Anti_shake = true;
      }, 5000);

      if (this.Anti_shake == false) {
        return;
      }

      this.Anti_shake = false;

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

            TX_PROVINCE: this.province, //省
            TX_CITY: this.city, //市
            TX_DISTRICT: this.Area, //区
            TX_STORE_ADDRESS: this.address_S, //地址

            TX_BIZ_LICENSE: this.BusinessLicenseNumber, //营业执照编号
            TX_LEGAL_PERSON: this.LegalPersonName, //法人姓名
            TX_LEGAL_CRED_TYPE: this.LegalIDType, //法人证件类型
            TX_LEGAL_ID_NO: this.LegalIDNumber, //法人证件号
            TX_SETTLE_TYPE: this.WhetherLegalPersonSettlement, //是否法人收款
            TX_ACCOUNT_TYPE: this.SettleAccountYype, //收款账户类型
            TX_BANK_CRAD_NO: this.SettlementCardNumber, //收款卡号
            TX_CARD_HOLDER: this.SettlementCardholderName, //收款持卡人姓名
            TX_ID_CARD_NUM: this.SettlementPersonIDNumber, //收款人身份证号
            TX_BANK_NAME: this.BankName, //开户行名称
            TX_BANK_BRANCHID: this.JointNumber, //联行号
            TX_BANK_RESERVEDPHONE: this.ReservedMobilePhoneNumber, //预留手机号
            TX_CASHIER_DESK_IMG_URL: this.StoreCashierashier, //店面收银台照
            TX_STORE_FRONT_IMG_URL: this.MerchantDoorPhoto, //商户门头照
            TX_BIZ_LICENSE_IMG_URL: this.businessLicense, //营业执照
            TX_ID_CARD_FRONT_IMG_URL: this.LegalIDCardFrontPhoto, //法人身份证正面照片
            TX_ID_CARD_BACK_IMG_URL: this.FrenchIDCard, //法人身份证反面照片
            TX_UCP_BANK_CRAD_NO: this.SettlementCardNumber, //请填写非法人   收款卡号
            uid: this.uid, //入住商户uid
            TX_WX_CATEGORY_ID: this.MerchantWeChatBusiness, //商户微信经营范围
            TX_CARDNO_TIME: this.IDCardValidity_begin + `-` + this.IDCardValidity_theEnd, //身份证有效期  20051205-20251205
            TX_SETTLE_HAND_CARD_IMG_URL: this.SettlementPersonHandheldIDCard, //收款人手持身份证照
            TX_BANKCARD_FRONT_IMG_URL: this.InStoreScene, //店内场景照

            phone: this.RecommendedPerson, //推荐人手机号
            tuid: this.tuid //推荐人uid
          }
        })
        .then(response => {
          if (response.data.MSG_CODE == "00") {
            // console.log("response.data.MSG_TXT", response.data);
            this.$router.push({ name: "CashCodeApplicationSubmissionSuccess", params: {}, query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid } });

            // Toast("支付码已申请,等待审核");
            // setTimeout(() => {
            //   window.history.back(-1);
            // }, 1000);
            // this.$emit("SendOff", false);
          }
          if (response.data.MSG_CODE == "N9") {
            // console.log("response.data.MSG_TXT", response.data);
            Toast("有必填项未填写");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    formatDate(date) {
      if ((date.getMonth() + 1).toString().length == 1) {
        var getMonth = `0` + (date.getMonth() + 1);
      } else {
        var getMonth = date.getMonth() + 1;
      }
      if (date.getDate().toString().length == 1) {
        var getDate = `0` + date.getDate();
      } else {
        var getDate = date.getDate();
      }

      // console.log("getMonth", date.getMonth() + 1, date.getDate(), getMonth, getDate);
      return `${date.getFullYear()}${getMonth}${getDate}`;

      // return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
    },

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
          // console.log("response", response.data.data.uid);
          if (response.data.result == 1) {
            // 推荐人
            // console.log("type", type);
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

    // // 收款卡正面照片
    // SettlementCardFrontPhoto_S(res) {
    //   this.SettlementCardFrontPhoto = res.data.img_path;
    // },
    // // 收款人身份证反面照片
    // CompletePhotoCard_S(res) {
    //   this.CompletePhotoCard = res.data.img_path;
    // },
    // // 收款人身份证正面照片
    // PositivePhotoOfASettlementPersonIDCard_S(res) {
    //   this.PositivePhotoOfASettlementPersonIDCard = res.data.img_path;
    // },

    // // 收款人手持身份证照
    // SettlementPersonHandheldIDCard_S(res) {
    //   this.SettlementPersonHandheldIDCard = res.data.img_path;
    // },

    // // 法人身份证反面照片
    // FrenchIDCard_S(res) {
    //   this.FrenchIDCard = res.data.img_path;
    // },
    // // 法人身份证正面照片
    // LegalIDCardFrontPhoto_S(res) {
    //   this.LegalIDCardFrontPhoto = res.data.img_path;
    // },
    // // 营业执照
    // businessLicense_S(res) {
    //   // if (res.result == 1) {
    //   //   this.businessLicense = res.data.img_path;
    //   // }
    //   // if (res.result == 0) {
    //   //   Toast("图片太大, 大于6M,请重新上传");
    //   // }
    // },
    // // 商户门头照 选择图片及上传
    // MerchantDoorPhoto_S(res) {
    //   this.MerchantDoorPhoto = res.data.img_path;
    // },
    // // 店内场景照 选择图片及上传
    // InStoreScene_S(res) {
    //   this.InStoreScene = res.data.img_path;
    // },
    // // 店面收银照 选择图片及上传
    // StoreCashierashier_S(res) {
    //   this.StoreCashierashier = res.data.img_path;
    // },

    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.show = false;
      this.fieldValue = selectedOptions.map(option => option.label).join("/");

      this.province = selectedOptions[0].label; //省
      this.city = selectedOptions[1].label; //市
      this.Area = selectedOptions[2].label;

      var provinceNotData = ["北京市", "天津市", "上海市", "重庆市"];
      for (var value of provinceNotData) {
        if (selectedOptions[0].label == value) {
          this.province = value.split("市")[0]; //省
        }
      }
      var Secondary_ity = ["市辖区", "县"];
      for (var value of Secondary_ity) {
        if (selectedOptions[1].label == value) {
          this.city = selectedOptions[0].label; //市
        }
      }

      var Province = ["安徽省", "四川省", "青海省", "北京", "西藏自治区"];

      //
      if (this.$route.query.payStype == 2) {
        if (Province.indexOf(this.province) != "-1") {
          //   付临门
          Toast("请选择营业执照地区");
          this.fieldValue = "";
        }
      }
      
    },
    // 全部选项选择完毕后，会触发 finish 事件
    ONBankAddress({ selectedOptions }) {
      // 选择完地址 联行号  支行  清空
      this.BankName = "";
      this.JointNumber = "";

      this.show = false;
      this.BankAddress = selectedOptions.map(option => option.label).join("/");

      this.province_bank = selectedOptions[0].label; //省
      this.city_bank = selectedOptions[1].label; //市
    }
  },
  mounted() {
    this.fillInAgain(); //重新填写
  },
  activated() {
    // 获取银行列表
    this.GetBankList();
    //获取当前的经纬度
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
      // 删除
      /deep/.Stroke {
        z-index: 1;
        position: absolute;
        right: 0px;
        font-size: 20px;
        background: #000;
        color: #fff;
        border-radius: 0 0 0 7px;
        top: 0;
      }
      /**
       * @Author: 飞
       * @Date: 2021-06-25 18:27:38
       * @Describe: 优化后的图片 
       */
      /deep/.van-uploader__input-wrapper {
        width: 300px;
        height: 184px;
        div {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
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
  // 验证码
  /deep/.van-cell {
    .van-cell__value {
      .van-field__button {
        width: 80px;
        // 倒计时颜色
        .van-count-down {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #999999;
          line-height: 21px;
        }
        text-align: center;
        .van-hairline--top::after {
          border-top-width: 0;
        }
        .van-grid {
          display: inline-block;
          .van-grid-item__content::after {
            border-width: 0;
          }
          .van-grid-item__content--clickable:active {
            background-color: #fff;
          }
          .van-grid-item__content {
            padding: 0;
            span {
              font-size: 14px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #e60416;
              line-height: 21px;
            }
          }
        }
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
  // 选择时间
  .IDCardValidTime {
    text-align: right;
    padding: 0.5rem;
    span {
      font-size: 16px;
      padding: 4px;
      border-radius: 11px;
      color: #576b95;
    }
  }
}
</style>