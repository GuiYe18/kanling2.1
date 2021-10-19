<!--
 * @Author: 飞
 * @Date: 2021-07-25 20:10:57
 * @LastEditTime: 2021-09-22 15:58:55
 * @FilePath: \you-shop1\src\views\AggregatePayment\AggregatePayment.vue
 * @Describe: 
-->

<template>
  <div class="content">
    <van-steps :active="active" class="">
      <van-step>基本信息</van-step>
      <van-step>店铺信息</van-step>
      <van-step>收款账户</van-step>
      <van-step>入驻审核</van-step>
    </van-steps>
    <!-- 第一步基本信息 -->
    <div class="active" v-show="active == 0">
      <!-- 商户入驻类型 -->
      <van-field label="商户入驻类型" required class="Radio">
        <template #input>
          <van-radio-group v-model="allow_type" direction="horizontal">
            <van-radio name="0" checked-color="#ee0a24">入驻微信和支付宝</van-radio>
            <!-- <van-radio name="1" checked-color="#ee0a24">只入驻支付宝</van-radio>
            <van-radio name="2" checked-color="#ee0a24">只入驻微信</van-radio> -->
          </van-radio-group>
        </template>
      </van-field>
      <!-- 是否签约云闪付 -->
      <!-- <van-field label="是否签约云闪付" required class="Radio">
        <template #input>
          <van-radio-group v-model="open_union_pay" direction="horizontal">
            <van-radio name="0" checked-color="#ee0a24">不签约</van-radio>
            <van-radio name="1" checked-color="#ee0a24">签约</van-radio>
          </van-radio-group>
        </template>
      </van-field> -->
      <!-- 商户类型 -->
      <van-field label="商户类型" required class="Radio">
        <template #input>
          <van-radio-group v-model="merchant_type" direction="horizontal">
            <van-radio name="1" checked-color="#ee0a24">小微</van-radio>
            <van-radio name="2" checked-color="#ee0a24">个体户</van-radio>
            <van-radio name="3" checked-color="#ee0a24">企事业</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 个体工商户是否有商户名称 -->
      <van-field label="个体工商户是否有商户名称" required class="Radio" v-if="merchant_type == 2">
        <template #input>
          <van-radio-group v-model="IndividualHasNoName" direction="horizontal">
            <van-radio name="1" checked-color="#ee0a24">有</van-radio>
            <van-radio name="0" checked-color="#ee0a24">没有</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!-- 商户全称 -->
      <template>
        <van-field v-if="merchant_type == 1" v-model="merchant_name_text" label="商户全称" required placeholder="请填写身份证上的姓名" @blur="merchant_name_blur" />
      </template>
      <template>
        <van-field v-if="merchant_type == 3 || IndividualHasNoName == 1" v-model="merchant_name_text" label="商户全称" required placeholder="请填写商户营业执照上的名称" @blur="merchant_name_onblur" />
      </template>
      <template>
        <van-field v-if="merchant_type == 2 && IndividualHasNoName == 0" v-model="merchant_name_text" label="商户全称" required placeholder="请填写身份证上的姓名" @blur="IndividualHasNoName_blur" />
      </template>
      <!-- 商户简称 -->
      <van-field v-model="alias_name" label="商户简称" required placeholder="请填写商户简称" />
      <!-- 客服电话 -->
      <van-field v-model="service_phone" label="客服电话" required placeholder="请填写客服电话" type="digit" />
      <!-- 经营类目 -->
      <van-field v-model="category_id_name" label="经营类目" readonly required placeholder="请填写经营类目" @click="onfocus" />
      <!-- 商户邮箱地址 -->
      <van-field v-model="email" label="商户邮箱地址" required placeholder="请填写商户邮箱地址" />
      <!-- 商户座机号码 -->
      <!-- <van-field v-model="phone" label="商户座机号码" placeholder="0571-xxxxx" /> -->
      <!-- 商户手机号码 -->
      <van-field v-model="mobile" label="商户手机号码" required placeholder="请填写商户手机号码" type="digit" />
    </div>
    <!-- 第二步店铺信息 -->
    <div class="active" v-show="active == 1">
      <!-- 地区 -->
      <!-- <van-field v-model="fieldValue" is-link readonly label="商户经营地区" required placeholder="请选择商户经营地区" @click="show = true" />
      <van-popup v-model="show" round position="bottom">
        <van-cascader title="请选择所在地区" :options="options" @close="show = false" @finish="onFinish" :field-names="fieldNames" />
      </van-popup> -->
      <!-- 详细地址 -->
      <van-field v-model="store_address" label="营业执照详细地址" required placeholder="请填写营业执照详细地址" />

      <!-- 商户门头照 -->
      <van-field label="商户门头照(只能上传一张)" required class="StoreCashier" />
      <van-uploader :after-read="onRead_store_front_img" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="store_front_img_url ? store_front_img_url : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="store_front_img_url != ''" class="Stroke" name="cross" @click="Stroke('store_front_img')" />
        </div>
      </van-uploader>
      <!-- 收银台照片 -->
      <van-field label="收银台照片(只能上传一张)" required class="StoreCashier" />
      <van-uploader :after-read="onRead_checkstand_pic" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="checkstand_pic_url ? checkstand_pic_url : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="checkstand_pic_url != ''" class="Stroke" name="cross" @click="Stroke('checkstand_pic')" />
        </div>
      </van-uploader>
      <!-- 店内环境照 -->
      <van-field label="店内环境照(只能上传一张)" required class="StoreCashier" />
      <van-uploader :after-read="onRead_indoor_pic" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="indoor_pic_url ? indoor_pic_url : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="indoor_pic_url != ''" class="Stroke" name="cross" @click="Stroke('indoor_pic')" />
        </div>
      </van-uploader>
      <!-- 非小微 营业资质 -->
      <template v-if="merchant_type != 1">
        <!-- 营业执照注册号 -->
        <van-field v-model="business_license" label="营业执照注册号" required placeholder="请填写营业执照注册号" />
        <!-- 营业执照照片 -->
        <van-field label="营业执照照片(只能上传一张)" required class="StoreCashier" />
        <van-uploader :after-read="onRead_business_license_img" class="MerchantPhoto">
          <div style="padding: 0px; margin: 0 auto">
            <img :src="business_license_img_url ? business_license_img_url : require('./img/Group.png')" style="width: 100%" class="avatar" />
            <van-icon v-show="business_license_img_url != ''" class="Stroke" name="cross" @click="Stroke('business_license_img')" />
          </div>
        </van-uploader>
        <!-- 营业执照开始时间 -->
        <van-field v-model="StartBusinessHours" is-link readonly label="营业执照开始时间" required placeholder="请选择营业执照开始时间" @click="StartingTime" />
        <!-- 营业执照结束时间 -->
        <van-field v-if="merchant_type == 3" v-model="EndBusinessHours" is-link readonly label="营业执照结束时间" required placeholder="请选择营业执照结束时间" @click="EndTime" />
      </template>
      <!-- 营业执照身份证姓名 -->
      <van-field v-model="id_card_name" label="营业执照身份证姓名" required placeholder="请填写营业执照身份证姓名" />
      <!-- 营业执照身份证号 -->
      <van-field v-model="id_card_num" label="营业执照身份证号" required placeholder="请填写营业执照身份证号" />
      <!-- 营业执照身份证正面照片 -->
      <van-field label="营业执照身份证正面照片(只能上传一张)" required class="StoreCashier" />
      <van-uploader :after-read="onRead_id_card_heads_pic" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="id_card_heads_pic_url ? id_card_heads_pic_url : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="id_card_heads_pic_url != ''" class="Stroke" name="cross" @click="Stroke('id_card_heads_pic')" />
        </div>
      </van-uploader>
      <!-- 营业执照身份证反面照片 -->
      <van-field label="营业执照身份证反面照片(只能上传一张)" required class="StoreCashier" />
      <van-uploader :after-read="onRead_id_card_tails_pic" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="id_card_tails_pic_url ? id_card_tails_pic_url : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="id_card_tails_pic_url != ''" class="Stroke" name="cross" @click="Stroke('id_card_tails_pic')" />
        </div>
      </van-uploader>
      <!-- 营业执照身份证开始时间 -->
      <van-field v-model="IDStartingTime_A" is-link readonly label="营业执照身份证开始时间" required placeholder="请选择营业执照身份证开始时间" @click="IDStartingTime" />
      <!-- 营业执照身份证结束时间 -->
      <van-field v-model="IDEndTime_B" is-link readonly label="营业执照身份证结束时间" required placeholder="请选择营业执照身份证结束时间" @click="IDEndTime" />
    </div>
    <!-- 第三步结算信息 -->
    <div class="active" v-show="active == 2">
      <!-- 结算卡类型 -->
      <van-field label="结算卡类型" required class="Radio">
        <template #input>
          <van-radio-group v-model="card_type" direction="horizontal">
            <!-- <van-radio name="0" checked-color="#ee0a24">非法人</van-radio> -->
            <van-radio name="1" checked-color="#ee0a24">法人</van-radio>
            <!-- 如果是小微申请   结算账户没有企业 -->
            <van-radio v-if="merchant_type != 1" name="2" checked-color="#ee0a24">企业</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 账户类型 -->
      <van-field label="账户类型" required class="Radio">
        <template #input>
          <van-radio-group v-model="is_public_account" direction="horizontal">
            <van-radio v-show="card_type == 1" name="0" checked-color="#ee0a24">对私</van-radio>
            <van-radio v-show="card_type == 2" name="1" checked-color="#ee0a24">对公</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 结算银行卡开户名 -->
      <template>
        <!-- 如果是对公 填写公司名称 -->
        <van-field v-show="is_public_account == '1'" v-model="bank_card_name" label="结算银行卡开户名" required placeholder="请填写营业执照名称" />
        <!-- 如果是对私 填写公司名称 -->
        <van-field v-show="is_public_account == '0'" v-model="bank_card_name" label="结算银行卡开户名" required placeholder="请填写营业执照身份证姓名" />
      </template>
      <!-- 结算人身份证号 -->
      <van-field v-model="bank_id_card_num" label="结算人身份证号" required placeholder="请填写结算人身份证号" />
      <!-- 结算银行卡卡号 -->
      <van-field v-model="bank_card_no" label="结算银行卡卡号" required placeholder="请填写结算银行卡卡号" type="digit" />

      <!-- 结算银行卡正面照 -->
      <template v-if="is_public_account == '0'">
        <van-field label="结算银行卡正面照(只能上传一张)" required class="StoreCashier" />
        <van-uploader :after-read="onRead_bank_card_pic" class="MerchantPhoto">
          <div style="padding: 0px; margin: 0 auto">
            <img :src="bank_card_pic_url ? bank_card_pic_url : require('./img/Group.png')" style="width: 100%" class="avatar" />
            <van-icon v-show="bank_card_pic_url != ''" class="Stroke" name="cross" @click="Stroke('bank_card_pic')" />
          </div>
        </van-uploader>
      </template>

      <!-- 银行地址      -->
      <van-field v-model="BankAddress" is-link readonly label="银行地址" required placeholder="请选择银行所在地区" @click="show = true" />
      <van-popup v-model="show" round position="bottom">
        <van-cascader v-model="cascaderValue" title="请选择银行所在地区" :options="options" @close="show = false" @finish="ONBankAddress" :field-names="fieldNames" />
      </van-popup>
      <!-- 选择开户银行       -->
      <van-field v-model="ChooseTheBank" is-link readonly label="选择开户银行" required placeholder="选择开户银行" @click="SelectBankShow = true" />

      <!-- 结算卡开户支行 -->
      <!-- <van-field v-show="!BankNameShow" v-model="open_bank" label="结算卡开户支行" required placeholder="请填写结算卡开户支行" /> -->

      <!-- 开户行名称       -->
      <van-field v-show="!BankNameShow" v-model="BankName" label="开户行名称" required placeholder="请选择开户支行名称" @click="ONBankName" @input="oninput" />

      <!-- 开户支行联行号 -->
      <van-field v-model="united_bank_no" label="开户支行联行号" required placeholder="请填写开户支行联行号" type="digit" />

      <!-- 银行开户许可证 -->
      <template v-if="is_public_account == '1'">
        <van-field label="银行开户许可证(只能上传一张)" required class="StoreCashier" />
        <van-uploader :after-read="onRead_bank_account_opening_certificate" class="MerchantPhoto">
          <div style="padding: 0px; margin: 0 auto">
            <img :src="bank_account_opening_certificate_url ? bank_account_opening_certificate_url : require('./img/Group.png')" style="width: 100%" class="avatar" />
            <van-icon v-show="bank_account_opening_certificate_url != ''" class="Stroke" name="cross" @click="Stroke('bank_account_opening_certificate')" />
          </div>
        </van-uploader>
      </template>
      <!-- 注册资金 -->
      <van-field v-if="merchant_type == '3'" v-model="capital" label="注册资金" required placeholder="请填写注册资金" type="digit" />
    </div>

    <!-- 下一步 提交 -->
    <template v-if="active == 2">
      <el-button class="btn" @click="Previous">上一步</el-button>
      <el-button class="submit" @click="doubleConfirm">提交</el-button>
    </template>
    <template v-if="active != 2 && active != 3">
      <el-button class="btn" @click="Previous" v-if="active != 0">上一步</el-button>
      <el-button class="submit" @click="next">下一步</el-button>
    </template>

    <!-- 日期组件 -->
    <van-popup v-model="Dates" round position="bottom">
      <!-- <div class="IDCardValidTime" v-show="longIt">
        <span @click="long">有效期为长期点击此处</span>
      </div> -->
      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" />
    </van-popup>
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

    <!-- 经营范围 -->
    <van-popup v-model="BusinessScope" round position="bottom" :style="{ height: '60%' }">
      <van-field v-model="category_id_name" label="经营名称" required placeholder="请填写经营名称" />
      <van-list finished-text="没有更多了" error-text="本区域未获取到支行 请联系客服 客服电话:01053382256" :error.sync="category_error">
        <van-cell v-for="item in BusinessScopeList" :key="item" :title="item.name" @click="ONChoose(item)" />
      </van-list>
    </van-popup>
  </div>
</template>

<script>
// 引入省市区
import { regionData } from "element-china-area-data";
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 0, //第一步
      IndividualHasNoName: "", //判断个体户是否有名称的 参数
      merchant_name_text: "", //全称_文本
      options: regionData, //地址库
      fieldNames: {
        //地址 属性名 重置
        text: "label",
        value: "value",
        children: "children"
      },
      fieldValue: "", //省市区显示地址
      show: false, //省市区显示开关
      store_front_img_url: "", //商户门头照 url
      checkstand_pic_url: "", //收银台照片 url
      indoor_pic_url: "", //店内环境照 url
      business_license_img_url: "", //营业执照照片 url

      Dates: false, //日期
      currentDate: new Date(2021, 0, 17),
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2099, 12, 31),
      TimeType: "", //选择时间时 存 属性名
      StartBusinessHours: "", //开始营业的时间
      EndBusinessHours: "", //结束营业的时间

      id_card_heads_pic_url: "", //法人身份证正面照片 url
      id_card_tails_pic_url: "", //法人身份证反面照片 url

      IDStartingTime_A: "", //营业执照身份证开始时间
      IDEndTime_B: "", //营业执照身份证结束时间
      bank_card_pic_url: "", //结算银行卡正面照url

      bank_account_opening_certificate_url: "", //银行开户许可证 url

      BankAddress: "", //银行地址
      province_bank: "", //省
      city_bank: "", //市
      banklist: [], //银行列表
      ChooseTheBank: "", //选择的银行
      SelectBankShow: false, //选择银行

      error: false, //提示
      BankName: "", //开户行名称
      OpeningList: [], //开户行列表
      BankNameShow: false, //开户行

      BusinessScope: false,
      BusinessScopeList: [],
      Class: [], //查询时用
      category_error: false,
      // ----------------------基本信息----------------------
      allow_type: "0", //商户入住类型
      merchant_type: "", //商户类型
      merchant_name: "", //商户全称
      alias_name: "", //商户简称
      // service_phone: "", //客服电话
      category_id_name: "", //经营类目 名
      category_id: "", //经营类目
      email: "", //商户邮箱地址
      // phone: "", //商户座机号码
      mobile: "", //商户手机号码
      // open_union_pay: "0", //是否签约云闪付
      // ----------------------商铺信息----------------------
      province_code: "", //省级编码
      city_code: "", //市级编码
      district_code: "", //区级编码
      store_address: "", //商户经营详细地址

      store_front_img: "", //商户门头照 file_id
      checkstand_pic: "", //收银台照片 file_id
      indoor_pic: "", //店内环境照 file_id

      business_license_type: "", //商户经营执照证件类型
      business_license: "", //营业执照注册号
      business_license_img: "", //营业执照照片 file_id
      business_expiry: "", //营业执照有效期限  格式为： yyyy-MM-dd-yyyy-MM-dd
      // --------------------法人信息--------------------
      id_card_name: "", //法人姓名
      id_card_num: "", //法人身份证号码
      id_card_heads_pic: "", //法人身份证正面照片 file_id
      id_card_tails_pic: "", //法人身份证反面照片 file_id
      id_card_expiry: "", //法人身份证证件有效期 格式为： yyyy-MM-dd-yyyy-MM-dd
      // ----------------------结算信息----------------------
      card_type: "", //结算卡类型
      is_public_account: "", //结算卡类型
      bank_card_name: "", //结算银行卡开户名  商户是法人对私结算时，该字段应与法人姓名一致；商户是企业对公结算时，该字段应与营业执照名称一致
      bank_id_card_num: "", //结算人身份证号
      bank_card_no: "", //结算银行卡卡号
      bank_card_pic: "", //结算银行卡正面照

      open_bank: "", //结算卡开户支行
      united_bank_no: "", //开户支行联行号
      bank_account_opening_certificate: "", //银行开户许可证 file_id
      // ----------------------费率信息----------------------
      ali_merchant_rate: "0.003", //商户支付宝通道终端费率示例:0.003
      wx_merchant_rate: "0.003", //商户微信通道终端费率示例:0.003
      union_merchant_rate: "", //商户云闪付通道终端费率示例:0.003
      union_credit_rate: "", //商户银联二维码通道贷记卡费率（暂不支持）示例:0.003
      union_debit_rate: "", //商户银联二维码通道借记卡费率（暂不支持）示例:0.003

      capital: "" //注册资金，企事业商户必填
    };
  },
  watch: {
    //  商户类型变化  就清空商户全称
    merchant_type: function (N, O) {
      this.merchant_name_text = "";
      // 小微时  清空营业执照信息
      if (N == 1) {
        this.business_license_type = "";
        this.business_license = "";
        this.business_license_img = "";
        this.business_license_img_url = "";
        this.business_expiry = "";
      }

      if (N == 2) {
        // 个人没有结束时间
        this.EndBusinessHours = "2099-12-30";
        this.business_license_type = "NATIONAL_LEGAL";
      }
      if (N == 3) {
        // 企业有结束时间
        this.EndBusinessHours = "";
        this.business_license_type = "NATIONAL_LEGAL";
      }
    },
    // 监控开始时间变化
    StartBusinessHours: function (N, O) {
      this.business_expiry = this.StartBusinessHours + "-" + this.EndBusinessHours;
      console.log("this.StartBusinessHours", this.StartBusinessHours);
      console.log("this.EndBusinessHours", this.EndBusinessHours);
    },
    // 监控结束时间变化
    EndBusinessHours: function (N, O) {
      this.business_expiry = this.StartBusinessHours + "-" + this.EndBusinessHours;
    },
    // 监控商户经营身份证开始时间变化
    IDStartingTime_A: function (N, O) {
      this.id_card_expiry = this.IDStartingTime_A + "-" + this.IDEndTime_B;
    },
    // 监控商户经营身份证结束时间变化
    IDEndTime_B: function (N, O) {
      this.id_card_expiry = this.IDStartingTime_A + "-" + this.IDEndTime_B;
    },
    // 结算卡类型  决定是对私还是对公
    card_type: function (N, O) {
      if (N == 1) {
        this.is_public_account = "0";
      }
      if (N == 2) {
        this.is_public_account = "1";
      }
    },
    // 经营类目计算
    category_id_name: function (N, O) {
      this.Category(N);
    }
  },
  methods: {
    // 经营类目计算
    Category(msg) {
      this.BusinessScopeList = this.Class.filter(item => {
        return item.name.indexOf(msg) != "-1";
      });
      if (this.BusinessScopeList.length == 0) {
        this.category_error = true;
      } else {
        this.category_error = false;
      }
    },
    // 选中经营类目单项
    ONChoose(msg) {
      this.BusinessScope = !this.BusinessScope;
      this.category_id_name = msg.name;
      this.category_id = msg.value;
    },
    onfocus() {
      this.BusinessScope = !this.BusinessScope;
      this.Class = this.BusinessScopeList = [
        { value: "4011", name: "铁路运输" },
        { value: "4111", name: "本市和市郊通勤旅客运输(包括轮渡)" },
        { value: "4112", name: "铁路客运" },
        { value: "4119", name: "救护车服务" },
        { value: "4121", name: "出租车服务" },
        { value: "4131", name: "公路客运" },
        { value: "4411", name: "轮船及巡游航线服务" },
        { value: "4457", name: "出租船只" },
        { value: "4468", name: "船舶、海运服务提供商" },
        { value: "4784", name: "路桥通行费" },
        { value: "4511", name: "航空公司" },
        { value: "4582", name: "机场服务" },
        { value: "4722", name: "旅行社" },
        { value: "4733", name: "大型景区售票" },
        { value: "4789", name: "未列入其他代码的运输服务" },
        { value: "7011", name: "住宿服务(旅馆、酒店、汽车旅馆、度假村等)" },
        { value: "7012", name: "分时使用的别墅或度假用房" },
        { value: "7032", name: "运动和娱乐露营地" },
        { value: "7033", name: "活动房车场及露营场所" },
        { value: "4214", name: "货物搬运和托运—当地长途，移动和存储公司" },
        { value: "4215", name: "快递服务(空运、地面运输或海运)" },
        { value: "4225", name: "公共仓储服务－农产品、冷冻品和家用产品" },
        { value: "742", name: "兽医服务" },
        { value: "763", name: "农业合作" },
        { value: "780", name: "景观美化及园艺服务" },
        { value: "1520", name: "一般承包商－住宅与商业楼" },
        { value: "6513", name: "不动产管理－物业管理" },
        { value: "7013", name: "不动产代理——房地产经纪" },
        { value: "4900", name: "公共事业(电力、煤气、自来水、清洁服务)" },
        { value: "4829", name: "邮政服务(电报、汇款)-已删除" },
        { value: "5933", name: "当铺(典当、拍卖和信托类)" },
        { value: "6010", name: "金融机构－人工现金支付" },
        { value: "6011", name: "金融机构－自动现金支付" },
        { value: "6012", name: "金融机构－商品和服务" },
        { value: "6050", name: "金融机构－农民工现金支付" },
        { value: "6051", name: "非金融机构－外币兑换、非电子转账的汇票" },
        { value: "6211", name: "证券公司－经纪人和经销商" },
        { value: "6300", name: "保险销售、保险业和保险金" },
        { value: "6760", name: "储蓄-已删除" },
        { value: "7512", name: "汽车出租" },
        { value: "7513", name: "卡车及拖车出租" },
        { value: "7519", name: "房车和娱乐车辆出租" },
        { value: "7523", name: "停车场" },
        { value: "7531", name: "车体维修店" },
        { value: "7534", name: "轮胎翻新、维修店" },
        { value: "7535", name: "汽车喷漆店" },
        { value: "7538", name: "汽车服务商店(非经销商)" },
        { value: "7542", name: "洗车" },
        { value: "7549", name: "拖车服务" },
        { value: "5935", name: "海上船只遇难救助" },
        { value: "7311", name: "广告服务" },
        { value: "7321", name: "消费者信用报告机构" },
        { value: "7333", name: "商业摄影、工艺、绘图服务" },
        { value: "7338", name: "复印及绘图服务" },
        { value: "7339", name: "速记、秘书服务(包括各类办公服务)" },
        { value: "7342", name: "灭虫及消毒服务" },
        { value: "7349", name: "清洁、保养及门卫服务" },
        { value: "7361", name: "职业中介、临时工" },
        { value: "7392", name: "管理、咨询和公共关系服务" },
        { value: "7393", name: "侦探、保安、安全服务" },
        { value: "7394", name: "设备、工具、家具和电器出租" },
        { value: "7395", name: "照相洗印服务" },
        { value: "7399", name: "未列入其他代码的商业服务" },
        { value: "7210", name: "洗衣店" },
        { value: "7211", name: "洗熨服务(自助洗衣服务)" },
        { value: "7216", name: "干洗店" },
        { value: "7217", name: "室内清洁服务(地毯沙发家具表面的清洁服务)" },
        { value: "7221", name: "摄影工作室" },
        { value: "7230", name: "美容理发店" },
        { value: "7251", name: "修鞋店、擦鞋店、帽子清洗店" },
        { value: "7261", name: "殡葬服务" },
        { value: "7273", name: "婚姻介绍及陪同服务" },
        { value: "7276", name: "税收准备服务" },
        { value: "7277", name: "咨询服务－债务、婚姻和私人事务" },
        { value: "7278", name: "购物服务及会所(贸易、经纪服务)" },
        { value: "7295", name: "家政服务" },
        { value: "7296", name: "出租衣物－服装、制服和正式场合服装" },
        { value: "7297", name: "按摩店" },
        { value: "7298", name: "保健及美容SPA" },
        { value: "7299", name: "未列入其他代码的其他个人服务" },
        { value: "5310", name: "折扣商店" },
        { value: "7622", name: "电器设备维修" },
        { value: "7623", name: "空调、制冷设备维修" },
        { value: "7629", name: "电器设备、小家电维修" },
        { value: "7631", name: "手表、钟表和首饰维修店" },
        { value: "7641", name: "家具维修、翻新" },
        { value: "7692", name: "焊接维修服务" },
        { value: "7699", name: "各类维修店及相关服务" },
        { value: "5960", name: "直销－保险直销" },
        { value: "5962", name: "旅游相关服务直销" },
        { value: "5963", name: "门对门销售" },
        { value: "5964", name: "目录销售商户" },
        { value: "5965", name: "目录、零售兼营商户" },
        { value: "5966", name: "电话呼出直销" },
        { value: "5967", name: "电话呼入直销" },
        { value: "5968", name: "订阅/订购直销服务" },
        { value: "5969", name: "其他直销商户" },
        { value: "5300", name: "会员制批量零售店" },
        { value: "5309", name: "免税商店" },
        { value: "5311", name: "百货商店" },
        { value: "5331", name: "各类杂货店、便利店" },
        { value: "5399", name: "其他综合零售" },
        { value: "5411", name: "大型仓储式超级市场" },
        { value: "5983", name: "燃料经销商－燃油、木材、煤炭和液化石油" },
        { value: "5998", name: "其他批发商" },
        { value: "5999", name: "其他专门零售店" },
        { value: "5137", name: "男女及儿童制服和服装(批发商)" },
        { value: "5139", name: "鞋类(批发商)" },
        { value: "5611", name: "男子和男童服装及用品商店" },
        { value: "5621", name: "妇女成衣商店" },
        { value: "5631", name: "女性用品商店" },
        { value: "5651", name: "家庭服装商店" },
        { value: "5661", name: "鞋店" },
        { value: "5681", name: "皮货店" },
        { value: "5691", name: "成人成衣店" },
        { value: "5697", name: "裁缝、修补、改衣店" },
        { value: "5698", name: "假发商店" },
        { value: "5699", name: "各类服装及饰物店" },
        { value: "5948", name: "箱包、皮具店" },
        { value: "5039", name: "未列入其他代码的建材批发(批发商)" },
        { value: "5131", name: "布料、缝纫用品和其他纺织品(批发商)" },
        { value: "5193", name: "花木栽种用品、苗木和花卉(批发商)" },
        { value: "5198", name: "油漆、清漆用品(批发商)" },
        { value: "5200", name: "大型仓储式家庭用品卖场" },
        { value: "5211", name: "木材和各类建材卖场" },
        { value: "5231", name: "玻璃、油漆涂料、墙纸零售" },
        { value: "5251", name: "五金商店" },
        { value: "5261", name: "草坪、花园用品商店" },
        { value: "5712", name: "家具、家庭摆品、家用设备零售商" },
        { value: "5713", name: "地板商店" },
        { value: "5714", name: "帏帐、窗帘、室内装潢商店" },
        { value: "5718", name: "壁炉、壁炉防护网及配件商店" },
        { value: "5719", name: "各种家庭装饰专营店" },
        { value: "5949", name: "纺织品及针织品零售" },
        { value: "5996", name: "游泳池－销售、供应和服务" },
        { value: "5094", name: "贵重珠宝、首饰，钟表零售" },
        { value: "5944", name: "银器店" },
        { value: "5977", name: "化妆品商店" },
        { value: "5997", name: "电动剃须刀商店－销售和服务" },
        { value: "5641", name: "婴儿、儿童服装店" },
        { value: "5945", name: "玩具、游戏店" },
        { value: "4812", name: "通讯设备和电话销售" },
        { value: "5045", name: "计算机、计算机外围设备(批发商)" },
        { value: "5722", name: "家用电器商店" },
        { value: "5732", name: "电子设备商店" },
        { value: "5946", name: "照相器材商店" },
        { value: "5192", name: "书、期刊和报纸(批发商)" },
        { value: "5735", name: "音像制品商店" },
        { value: "5942", name: "书店" },
        { value: "5994", name: "报亭、报摊" },
        { value: "5733", name: "音乐商店－乐器、钢琴、乐谱" },
        { value: "5931", name: "旧商品店、二手商品店" },
        { value: "5932", name: "古玩店——出售、维修及还原" },
        { value: "5937", name: "古玩复制店" },
        { value: "5947", name: "礼品、卡片、装饰品、纪念品商店" },
        { value: "5950", name: "玻璃器皿和水晶饰品店" },
        { value: "5970", name: "工艺美术商店" },
        { value: "5971", name: "艺术商和画廊" },
        { value: "5972", name: "邮票和纪念币商店" },
        { value: "5973", name: "宗教品商店" },
        { value: "5992", name: "花店" },
        { value: "5995", name: "宠物商店、宠物食品及用品" },
        { value: "7993", name: "电子游戏供给" },
        { value: "5422", name: "各类肉类零售商" },
        { value: "5441", name: "糖果及坚果商店" },
        { value: "5451", name: "乳制品店、冷饮店" },
        { value: "5462", name: "面包房、糕点商店" },
        { value: "5499", name: "各类食品店及专门食品零售店" },
        { value: "5811", name: "包办伙食，宴会承包商" },
        { value: "5812", name: "就餐场所和餐馆" },
        { value: "5813", name: "饮酒场所(酒吧/夜总会/鸡尾酒大厅/舞厅)" },
        { value: "5814", name: "快餐店" },
        { value: "5921", name: "瓶装酒零售店" },
        { value: "5993", name: "香烟、雪茄专卖店" },
        { value: "5655", name: "运动服饰商店" },
        { value: "5940", name: "自行车商店" },
        { value: "5941", name: "体育用品店" },
        { value: "7995", name: "彩票销售" },
        { value: "4814", name: "电信服务,包括本地长途信用卡磁卡电话传真" },
        { value: "4821", name: "电报服务" },
        { value: "4899", name: "有线和其他付费电视服务" },
        { value: "4816", name: "计算机网络/信息服务" },
        { value: "5734", name: "计算机软件商店" },
        { value: "7372", name: "计算机编程、数据处理和系统集成设计服务" },
        { value: "7375", name: "信息检索服务" },
        { value: "7379", name: "未列入其他代码的计算机维护和修理服务" },
        { value: "7829", name: "电影和录像创作、发行" },
        { value: "7832", name: "电影院" },
        { value: "7841", name: "音像制品出租商店" },
        { value: "7911", name: "歌舞厅" },
        { value: "7922", name: "戏剧制片(不含电影)、演出和票务" },
        { value: "7929", name: "未列入其他代码的乐队、文艺表演" },
        { value: "7932", name: "台球、撞球场所" },
        { value: "7933", name: "保龄球馆" },
        { value: "7941", name: "商业体育场馆、职业体育俱乐部、运动场" },
        { value: "7991", name: "旅游与展览" },
        { value: "7992", name: "公共高尔夫球场" },
        { value: "7994", name: "大型游戏机和游戏场所" },
        { value: "7996", name: "游乐园、马戏团、嘉年华、占卜" },
        { value: "7997", name: "会员俱乐部、乡村俱乐部以及私人高尔夫课程" },
        { value: "7998", name: "水族馆、海洋馆和海豚馆" },
        { value: "7999", name: "未列入其他代码的娱乐服务" },
        { value: "8211", name: "中小学校(公立)" },
        { value: "8220", name: "普通高校(公立)" },
        { value: "8241", name: "函授学校(成人教育)" },
        { value: "8244", name: "商业和文秘学校(中等专业学校)" },
        { value: "8249", name: "贸易和职业学校(职业技能培训)" },
        { value: "8299", name: "其他学校和教育服务" },
        { value: "8351", name: "儿童保育服务(含学前教育)" },
        { value: "8398", name: "慈善和社会公益服务组织" },
        { value: "8641", name: "市民、社会及友爱组织" },
        { value: "8651", name: "政治组织(政府机构)" },
        { value: "8661", name: "宗教组织" },
        { value: "8675", name: "汽车协会" },
        { value: "8699", name: "其他会员组织" },
        { value: "8011", name: "其他医疗卫生活动" },
        { value: "8021", name: "牙科医生" },
        { value: "8031", name: "正骨医生" },
        { value: "8041", name: "按摩医生" },
        { value: "8042", name: "眼科医生" },
        { value: "8043", name: "光学产品、眼镜店" },
        { value: "8049", name: "手足病医生" },
        { value: "8050", name: "护理和照料服务" },
        { value: "8062", name: "公立医院" },
        { value: "8071", name: "医学及牙科实验室" },
        { value: "8099", name: "其他医疗保健服务" },
        { value: "9211", name: "法庭费用，包括赡养费和子女抚养费" },
        { value: "9222", name: "罚款" },
        { value: "9223", name: "保释金" },
        { value: "9311", name: "纳税" },
        { value: "9399", name: "未列入其他代码的政府服务(社会保障服务)" },
        { value: "9400", name: "使领馆收费" },
        { value: "9402", name: "国家邮政服务" },
        { value: "9411", name: "政府贷款-已删除" },
        { value: "8111", name: "法律服务和律师事务所服务" },
        { value: "8911", name: "建筑、工程和测量服务" },
        { value: "8912", name: "装修、装潢、园艺" },
        { value: "8931", name: "会计、审计、财务服务" },
        { value: "8999", name: "未列入其他代码的专业服务" },
        { value: "5021", name: "办公及商务家具(批发商)" },
        { value: "5044", name: "办公、影印及微缩摄影器材(批发商)" },
        { value: "5046", name: "未列入其他代码的商用器材(批发商)" },
        { value: "5111", name: "文具、办公用品、复印纸和书写纸(批发商)" },
        { value: "5943", name: "文具用品商店、各类办公用品商店" },
        { value: "5978", name: "打字机商店—销售、服务和出租" },
        { value: "5051", name: "金属产品服务商和公司(批发商)" },
        { value: "5065", name: "电器零件和设备(批发商)" },
        { value: "5072", name: "三金器材及用品(批发商)" },
        { value: "5074", name: "管道和供暖设备(批发商)" },
        { value: "5172", name: "石油及石油产品(批发商)" },
        { value: "5013", name: "机动车供应及零配件(批发商)" },
        { value: "5271", name: "活动房车销售商" },
        { value: "5511", name: "汽车货车经销商－新旧车的销售服务维修零件" },
        { value: "5521", name: "汽车货车经销商－专门从事旧车销售服务维修" },
        { value: "5532", name: "汽车轮胎经销商" },
        { value: "5533", name: "汽车零配件商店" },
        { value: "5541", name: "加油站、服务站" },
        { value: "5542", name: "自助加油站" },
        { value: "5551", name: "船只销售商" },
        { value: "5561", name: "旅行拖车、娱乐用车销售商" },
        { value: "5571", name: "摩托车商店和经销商" },
        { value: "5592", name: "露营、房车销售商" },
        { value: "5598", name: "雪车商" },
        { value: "5599", name: "汽车、飞行器、农用机车综合经营商" },
        { value: "5047", name: "牙科/实验室/医疗/眼科医院器材和用品(批)" },
        { value: "5122", name: "药品、药品经营者(批发商)" },
        { value: "5912", name: "药房、药店" },
        { value: "5975", name: "助听器－销售、服务和用品" },
        { value: "5976", name: "假肢店(整形外科用品、辅助设备)" }
      ];
      return;
    },
    // 提交失败 照片重新上传获取最新id
    PictureAcquisitionId() {
      var that = this;
      var url = [];
      var name = ["store_front_img", "checkstand_pic", "indoor_pic", "business_license_img", "id_card_heads_pic", "id_card_tails_pic", "bank_account_opening_certificate"];

      url.push(
        this.store_front_img_url,
        this.checkstand_pic_url,
        this.indoor_pic_url,
        this.business_license_img_url,
        this.id_card_heads_pic_url,
        this.id_card_tails_pic_url,
        this.bank_account_opening_certificate_url
      );

      for (let index = 0; index < url.length; index++) {
        if (url[index] != "") {
          axios
            .get("https://zf.minpinyouxuan.com/newMerchants/uploadFiles", {
              params: {
                fileUrl: url[index], //服务商的商户编号,由服务商自己定义,该商户编号必须在系统中唯一
                remarks: "测试", //备注
                uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid //uid
              }
            })
            .then(response => {
              if (response.data.success == true) {
                // Toast(response.data.return_value.file_list[0].failReason);
                that[name[index]] = response.data.return_value.file_list[0].fileId;
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    },
    // 提交
    submit() {
      var that = this;
      axios
        .get("https://zf.minpinyouxuan.com/newMerchants/merchantsEnter", {
          params: {
            // ----------------------基本信息----------------------
            allow_type: this.allow_type, //商户入驻类型
            merchant_type: this.merchant_type, //商户类型
            merchant_name: this.merchant_name, //商户全称
            alias_name: this.alias_name, //商户简称
            service_phone: this.service_phone, //客服电话
            category_id: this.category_id, //经营类目
            email: this.email, //商户邮箱地址
            // phone: this.phone, //商户座机号码
            mobile: this.mobile, //商户手机号码

            // ----------------------商铺信息----------------------
            province_code: this.province_code, //省级编码
            city_code: this.city_code, //市级编码
            district_code: this.district_code, //区级编码
            store_address: this.store_address, //商户经营详细地址
            store_front_img: this.store_front_img, //商户门头照
            checkstand_pic: this.checkstand_pic, //收银台照片
            indoor_pic: this.indoor_pic,
            business_license_type: this.business_license_type, //商户经营执照证件类型
            business_license: this.business_license, //营业执照注册号
            business_license_img: this.business_license_img, //营业执照照片
            business_expiry: this.business_expiry, //营业执照有效期限
            // --------------------法人信息--------------------
            id_card_name: this.id_card_name, //法人姓名
            id_card_num: this.id_card_num, //法人身份证号码
            id_card_heads_pic: this.id_card_heads_pic, //法人身份证正面照片
            id_card_tails_pic: this.id_card_tails_pic, //法人身份证反面照片
            id_card_expiry: this.id_card_expiry, //法人身份证证件有效期
            // ----------------------结算信息----------------------
            card_type: this.card_type, //结算卡类型
            is_public_account: this.is_public_account, //账户类型
            bank_card_name: this.bank_card_name, //结算银行卡开户名
            bank_id_card_num: this.bank_id_card_num, //结算人身份证号
            bank_card_no: this.bank_card_no, //结算银行卡卡号
            bank_card_pic: this.bank_card_pic, //结算银行卡正面照
            open_bank: this.BankName, //结算卡开户支行
            united_bank_no: this.united_bank_no, //开户支行联行号
            bank_account_opening_certificate: this.bank_account_opening_certificate, //银行开户许可证
            // ----------------------费率信息----------------------
            ali_merchant_rate: "0.0023", //商户支付宝通道终端费率示例
            wx_merchant_rate: "0.0022", //商户微信通道终端费率

            // author_certificate_pic: "20210726011729016299", //非法人清算授权函
            // settle_id_card_heads_pic: "", //结算人身份证正面照
            // settle_id_card_tails_pic: "", //结算人身份证反面照
            // settle_id_card_expiry: "",//结算人身份证证件有效期限

            uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,

            // id_card_hand_img: "20210726011729016299", //手持身份证照片    可选
            // ----------------------支付平台信息----------------------
            contact_wechatid: "", //联系人微信账号
            channel_id: "", //微信渠道号   为空
            jsapi_path: "", //支付授权目录
            sub_appid: "", //需要绑定的 APPID
            pid: "", //支付宝渠道号

            capital: this.capital //注册资金 //企事业必填
          }
        })
        .then(response => {
          console.log("填写完毕", response.data.success);
          if (response.data.success) {
            Toast(response.data.msg);
            this.$router.push({ name: "CashCodeApplicationSubmissionSuccess", params: {}, query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid } });

            // Toast("支付码已申请,等待审核");
            // setTimeout(() => {
            //   window.history.back(-1);
            // }, 1000);
            // this.$emit("SendOff", false);
          } else {
            // 图片重新上传获取id
            if (response.data.error_code == "-101") {
              Toast(response.data.error_message.split("原因:")[1]);
            }
            if (response.data.error_code == "-103") {
              Toast(response.data.error_message);
            }

            that.PictureAcquisitionId();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 上一步
    Previous() {
      if (this.active-- < 1) this.active = 0;
    },
    // 下一步
    next() {
      if (this.active == 0) {
        if (this.active++ > 1) this.active = 2;
      } else if (this.active == 1) {
        if (this.active++ > 1) this.active = 2;
      }
    },
    // 提交
    doubleConfirm() {


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
    // 商户全称 小微:商户加姓名
    merchant_name_blur() {
      this.merchant_name = "商户_" + this.merchant_name_text;
      console.log("小微", this.merchant_name);
    },
    // 商户全称 企事业:营业 执照名称  个体有名称
    merchant_name_onblur() {
      this.merchant_name = this.merchant_name_text;
      console.log("企事业:营业 执照名称  个体有名称", this.merchant_name);
    },
    // 选择个体户没有名称
    IndividualHasNoName_blur() {
      this.merchant_name = "个体户" + this.merchant_name_text;
      console.log("选择个体户没有名称", this.merchant_name);
    },

    // 地址 全部选项选择完毕后，会触发 finish 事件
    onFinish(selectedOptions) {
      console.log("selectedOptions", selectedOptions);

      this.show = false;
      // this.fieldValue = selectedOptions.map(option => option.label).join("/");

      this.province_code = selectedOptions[0].value; //省
      this.city_code = selectedOptions[1].value; //市
      this.district_code = selectedOptions[2].value; //区

      // window.localStorage.removeItem('datalist_');

      // var provinceNotData = ["北京市", "天津市", "上海市", "重庆市"];
      // for (var value of provinceNotData) {
      //   if (selectedOptions[0].label == value) {
      //     this.province = value.split("市")[0]; //省
      //   }
      // }
      // var Secondary_ity = ["市辖区", "县"];
      // for (var value of Secondary_ity) {
      //   if (selectedOptions[1].label == value) {
      //     console.log("value", value, selectedOptions[0].label);
      //     this.city = selectedOptions[0].label; //市
      //   }
      // }
    },
    // 门头照
    onRead_store_front_img(e, flag) {
      this.onRead(e, flag, "store_front_img");
    },
    // 收银台照片
    onRead_checkstand_pic(e, flag) {
      this.onRead(e, flag, "checkstand_pic");
    },
    // 店内环境照
    onRead_indoor_pic(e, flag) {
      this.onRead(e, flag, "indoor_pic");
    },
    // 营业执照照片
    onRead_business_license_img(e, flag) {
      this.onRead(e, flag, "business_license_img");
    },
    // 营业执照身份证正面照片
    onRead_id_card_heads_pic(e, flag) {
      this.onRead(e, flag, "id_card_heads_pic");
    },
    // 营业执照身份证反面照片
    onRead_id_card_tails_pic(e, flag) {
      this.onRead(e, flag, "id_card_tails_pic");
    },
    // 银行开户许可证
    onRead_bank_account_opening_certificate(e, flag) {
      this.onRead(e, flag, "bank_account_opening_certificate");
    },
    // 结算银行卡正面照
    onRead_bank_card_pic(e, flag) {
      this.onRead(e, flag, "bank_card_pic");
    },

    // 获取在线图片地址
    onRead(e, flag, parameter) {
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
            // 给表面上图
            That[parameter + "_url"] = responseData.data.img_path;
            axios
              .get("https://zf.minpinyouxuan.com/newMerchants/uploadFiles", {
                params: {
                  fileUrl: responseData.data.img_path, //服务商的商户编号,由服务商自己定义,该商户编号必须在系统中唯一
                  remarks: "测试", //备注
                  uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid //uid
                }
              })
              .then(response => {
                if (response.data.success == true) {
                  Toast(response.data.return_value.file_list[0].failReason);
                  That[parameter] = response.data.return_value.file_list[0].fileId;
                  console.log("图片", response, That[parameter]);
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            Toast(responseData.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //删除照片
    Stroke(msg) {
      // 显示清空
      this[msg + "_url"] = "";
      // id清空
      this[msg] = "";
    },
    // 点击选择开始时间
    StartingTime() {
      this.Dates = true;
      this.TimeType = "StartBusinessHours"; //属性名传过去
    },
    // 点击选择结束时间
    EndTime() {
      this.Dates = true;
      this.TimeType = "EndBusinessHours"; //属性名传过去
    },
    // 营业执照身份证开始时间
    IDStartingTime() {
      this.Dates = true;
      this.TimeType = "IDStartingTime_A"; //属性名传过去
    },
    // 营业执照身份证结束时间
    IDEndTime() {
      this.Dates = true;
      this.TimeType = "IDEndTime_B"; //属性名传过去
    },

    // 日期组件确认
    onConfirm(date) {
      this.Dates = false; //关闭时间选择组件
      this.date = this.formatDate(date); //解析时间
      this[this.TimeType] = this.date; //给相应的时间赋值
      this.longIt = false; //结束日期的长期关闭
    },
    // 日期处理函数
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
      return `${date.getFullYear()}-${getMonth}-${getDate}`;
    },

    // 全部选项选择完毕后，会触发 finish 事件
    ONBankAddress({ selectedOptions }) {
      // // 选择完地址 联行号  支行  清空
      // this.BankName = "";
      // this.JointNumber = "";

      this.show = false;
      this.BankAddress = selectedOptions.map(option => option.label).join("/");

      this.province_bank = selectedOptions[0].label; //省
      this.city_bank = selectedOptions[1].label; //市
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
          console.log("sssssssssssssssss", response);

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
    // 选中的银行列表
    Choose(item) {
      this.ChooseTheBank = item;
      this.SelectBankShow = false;
      // // 重复选中银行  给重置 // 支行名称// 联行号
      // this.BankName = "";
      // this.JointNumber = "";
    },
    // 支行有动静
    oninput() {
      // 地址银行有获取联合号
      this.GetAUnion();
    },
    // 点击支行
    ONBankName() {
      // // 支行名称
      // this.BankName = "";
      // // 联行号
      // this.JointNumber = "";

      // 弹出框
      this.BankNameShow = true;
      // 并进行搜索
      // 地址银行有获取联合号
      this.GetAUnion();
    },
    // 选中支行
    OpenBankDisplay(item) {
      console.log("选中支行", item);
      // 支行列表隐藏起来
      this.BankNameShow = false;
      // 支行名
      this.BankName = item.fh;
      // 联行号
      this.united_bank_no = item.llh;
    }
  },
  activated() {
    // 获取银行列表
    this.GetBankList();
    // //获取当前的经纬度
    // this.getLocation();
    // 每次进来后置顶
    window.scrollTo(0, 0);

    this.onFinish(JSON.parse(window.localStorage.getItem("datalist_")));
  }
};
</script>
<style lang="scss" scoped>
.content {
  // 步骤
  .van-steps--horizontal {
    padding: 10px 12px 0;
    text-align: initial;
    margin-bottom: 16px;
  }
  // 第一步
  .active {
    width: 92%;
    margin: 0 14px;
    background: #ffffff;
    display: inline-block;
    border-radius: 12px;
    // 单选
    .Radio {
      /deep/.van-radio__icon {
        display: inline-block;
        vertical-align: sub;
      }
    }
    // 照片标题
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
  }
  // /deep/.van-sticky--fixed {
  //   top: 40%;
  // }
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
    margin-top: 10px;
  }
}
</style>

