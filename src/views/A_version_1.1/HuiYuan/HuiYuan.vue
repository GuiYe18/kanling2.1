<!--
 * @Author: 飞
 * @Date: 2021-09-22 15:58:28
 * @LastEditTime: 2021-10-09 13:38:41
 * @FilePath: \you-shop1\src\views\A_version_1.1\HuiYuan\HuiYuan.vue
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
      <!-- 商户全名称 -->
      <van-field v-model="merch_full_name" label="商户全称" required placeholder="请填写商户全名称" />
      <!-- 商户简称 -->
      <van-field v-model="merch_short_name" label="商户简称" required placeholder="请填写商户简称" />
      <!-- 商户类型 -->
      <van-field label="商户类型" required class="Radio">
        <template #input>
          <van-radio-group v-model="merch_type" direction="horizontal">
            <van-radio name="0" checked-color="#ee0a24">线下商户</van-radio>
            <van-radio name="1" checked-color="#ee0a24">线上商户</van-radio>
            <van-radio name="-1" checked-color="#ee0a24">未知</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 商户行政类型 -->
      <van-field label="商户行政类型" required class="Radio">
        <template #input>
          <van-radio-group v-model="offical_type" direction="horizontal">
            <van-radio name="5" checked-color="#ee0a24">个体工商户</van-radio>
            <van-radio name="4" checked-color="#ee0a24">企业</van-radio>
            <van-radio name="6" checked-color="#ee0a24">个人</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 联系人姓名 -->
      <van-field v-model="contact_name" label="联系人姓名" required placeholder="请填写联系人姓名" />
      <!-- 联系人手机号 -->
      <van-field v-model="contact_mobile" label="联系人手机号" required placeholder="请填写联系人手机号" type="digit" />
      <!-- 联系人身份证号 -->
      <van-field v-model="contact_idcard" label="联系人身份证号" required placeholder="请填写联系人身份证号" />
      <!-- 联系人身份证有效期-->
      <van-field v-model="IdStartTime" is-link readonly label="身份证有效期开始时间" required placeholder="请选择身份证有效期开始时间" @click="IdCardIsValidStartTime" />
      <van-field v-model="IdEndTime" is-link readonly label="身份证有效期结束时间" required placeholder="请选择身份证有效期结束时间" @click="IdCardIsValidEndTime" />
    </div>
    <!-- 第二步店铺信息 -->
    <div class="active" v-show="active == 1">
      <!-- 营业执照类型 -->
      <van-field label="营业执照类型" required class="Radio">
        <template #input>
          <van-radio-group v-model="area_type" direction="horizontal">
            <van-radio name="NATIONAL_LEGAL" checked-color="#ee0a24">营业执照</van-radio>
            <van-radio name="NATIONAL_LEGAL_MERGE" checked-color="#ee0a24">营业执照(多证合一)</van-radio>
            <van-radio name="INST_RGST_CTF" checked-color="#ee0a24">事业单位法人证书</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!-- 营业执照号 -->
      <van-field v-model="business_no" label="营业执照号" required placeholder="请填写营业执照号" />
      <!-- 营业执照注册名称 -->
      <van-field v-model="business_name" label="营业执照注册名称" required placeholder="请填写营业执照注册名称" />
      <!-- 营业执照有效期-->
      <van-field v-model="business_valid_Start" is-link readonly label="营业执照有效期开始" required placeholder="请选择身份证有效期开始时间" @click="StartTimeOfBusinessLicense" />
      <van-field v-model="business_valid_End" is-link readonly label="营业执照有效期结束" required placeholder="请选择身份证有效期结束时间" @click="EndTimeOfBusinessLicense" />

      <!-- 营业执照上的地址 -->
      <van-field v-model="licence_address" label="营业执照地址" required placeholder="请填写营业执照地址" />

      <!-- 商户经营地址      -->
      <van-field v-model="shengshiqu" is-link readonly label="商户经营地址" required placeholder="请选择商户经营地址" @click="show = true" />
      <!-- 商户经营详细地址-->
      <van-field v-model="xaingxidizhi" label="商户经营详细地址" required placeholder="请填写商户经营详细地址" />

      <!-- 法人姓名 -->
      <van-field v-model="legal_user" label="法人姓名" required placeholder="请填写法人姓名" />
      <!-- 法人手机号 -->
      <van-field v-model="legal_mobile" label="法人手机号" required placeholder="请填写法人手机号" type="digit" />
      <!-- 法人身份证号 -->
      <van-field v-model="legal_idcard" label="法人身份证号" required placeholder="请填写法人身份证号" />
      <!-- 法人身份证有效期限-->
      <van-field
        v-model="legal_idcard_valid_Start"
        is-link
        readonly
        label="法人身份证有效期开始时间"
        required
        placeholder="请选择法人身份证有效期开始时间"
        @click="StartTimeOfValidityOfLegalPersonDdCard"
      />
      <van-field
        v-model="legal_idcard_valid_End"
        is-link
        readonly
        label="法人身份证有效期结束时间"
        required
        placeholder="请选择法人身份证有效期结束时间"
        @click="EndTimeOfValidityOfLegalPersonDdCard"
      />
      <!-- 经营范围  -->
      <van-field v-model="business_scope" is-link readonly label="商户经营范围" required placeholder="请选择经营范围" @click="onfocus" />
      <!-- 客服电话 -->
      <van-field v-model="serv_phone" label="客服电话" required placeholder="请填写客服电话" />
      <!-- 邮箱 -->
      <van-field v-model="serv_email" label="邮箱" required placeholder="请填写邮箱" />

      <!-- 营业执照 -->
      <van-field label="营业执照(只能上传一张)" required class="StoreCashier" />
      <van-uploader :after-read="onRead_bupload_file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="bupload_file ? bupload_file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="bupload_file != ''" class="Stroke" name="cross" @click="Stroke('bupload_file')" />
        </div>
      </van-uploader>
      <!-- 收银台照片 -->
      <van-field label="收银台照片(只能上传一张)" required class="StoreCashier" />
      <van-uploader :after-read="onRead_material_upload_7file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="material_upload_7file ? material_upload_7file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="material_upload_7file != ''" class="Stroke" name="cross" @click="Stroke('material_upload_7file')" />
        </div>
      </van-uploader>

      <!-- 商户门头照 -->
      <van-field label="商户门头照(只能上传一张)" required class="StoreCashier" />
      <van-uploader :after-read="onRead_registry_upload_file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="registry_upload_file ? registry_upload_file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="registry_upload_file != ''" class="Stroke" name="cross" @click="Stroke('registry_upload_file')" />
        </div>
      </van-uploader>
      <!-- 店主身份证国徽面(正面) -->
      <van-field label="店主身份证国正面(只能上传一张)" required class="StoreCashier" />
      <van-uploader :after-read="onRead_material_upload_4file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="material_upload_4file ? material_upload_4file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="material_upload_4file != ''" class="Stroke" name="cross" @click="Stroke('material_upload_4file')" />
        </div>
      </van-uploader>
      <!-- 店主身份证国徽面(反面) -->
      <van-field label="店主身份证国反面(只能上传一张)" required class="StoreCashier" />
      <van-uploader :after-read="onRead_material_upload_3file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="material_upload_3file ? material_upload_3file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="material_upload_3file != ''" class="Stroke" name="cross" @click="Stroke('material_upload_3file')" />
        </div>
      </van-uploader>
    </div>
    <!-- 第三步结算信息 -->
    <div class="active" v-show="active == 2">
      <!-- 账户类型 -->
      <van-field label="账户类型" required class="Radio">
        <template #input>
          <van-radio-group v-model="acct_type" direction="horizontal">
            <van-radio name="1" checked-color="#ee0a24">对公</van-radio>
            <van-radio name="2" checked-color="#ee0a24">对私</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 银行卡号 -->
      <van-field v-model="bank_card_no" label="银行卡号" required placeholder="请填写银行卡号" />
      <!-- 银行账户名称       -->
      <van-field v-model="bank_account" label="银行账户名称" required placeholder="请填写银行账户名称" />

      <!-- 银行地址      -->
      <!-- <van-field v-model="BankAddress" is-link readonly label="银行地址" required placeholder="请选择银行所在地区" @click="show = true" /> -->
      <van-field v-model="BankAddress" is-link readonly label="银行地址" required placeholder="请选择银行所在地区" />

      <!-- 开户行名称       -->
      <van-field v-model="ChooseTheBank" is-link readonly label="请选择开户行名称" required placeholder="选择开户行名称" @click="SelectBankShow = true" />

      <!-- 支行名称 -->
      <van-field v-model="BankName" is-link label="支行名称" readonly required placeholder="请选择支行名称" @click="ONBankName" @input="oninput" />

      <!-- 银行预留手机号 -->
      <van-field v-model="bank_mobile" label="银行预留手机号" required placeholder="请填写银行预留手机号" />

      <!-- 对公账户许可 -->
      <van-field label="对公账户许可" required class="StoreCashier" />
      <van-uploader :after-read="onRead_rupload_file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="rupload_file ? rupload_file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="rupload_file != ''" class="Stroke" name="cross" @click="Stroke('rupload_file')" />
        </div>
      </van-uploader>

      <!-- 法人身份证国徽(正面照) -->
      <van-field label="法人身份证国徽(正面照)" required class="StoreCashier" />
      <van-uploader :after-read="onRead_material_upload_file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="material_upload_file ? material_upload_file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="material_upload_file != ''" class="Stroke" name="cross" @click="Stroke('material_upload_file')" />
        </div>
      </van-uploader>
      <!-- 法人身份证国徽(反面照) -->
      <van-field label="法人身份证国徽(反面照)" required class="StoreCashier" />
      <van-uploader :after-read="onRead_legal_upload_file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="legal_upload_file ? legal_upload_file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="legal_upload_file != ''" class="Stroke" name="cross" @click="Stroke('legal_upload_file')" />
        </div>
      </van-uploader>
      <!-- 内部经营照片 -->
      <van-field label="内部经营照片" required class="StoreCashier" />
      <van-uploader :after-read="onRead_photo_upload_file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="photo_upload_file ? photo_upload_file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="photo_upload_file != ''" class="Stroke" name="cross" @click="Stroke('photo_upload_file')" />
        </div>
      </van-uploader>
      <!-- 结算银行卡正面照 -->
      <van-field label="结算银行卡正面照" required class="StoreCashier" />
      <van-uploader :after-read="onRead_material_upload_2file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="material_upload_2file ? material_upload_2file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="material_upload_2file != ''" class="Stroke" name="cross" @click="Stroke('material_upload_2file')" />
        </div>
      </van-uploader>
      <!-- 入账人手持身份证正面 -->
      <van-field label="入账人手持身份证正面" required class="StoreCashier" />
      <van-uploader :after-read="onRead_material_upload_5file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="material_upload_5file ? material_upload_5file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="material_upload_5file != ''" class="Stroke" name="cross" @click="Stroke('material_upload_5file')" />
        </div>
      </van-uploader>
      <!-- 入账授权书 -->
      <van-field label="入账授权书" required class="StoreCashier" />
      <van-uploader :after-read="onRead_material_upload_1file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="material_upload_1file ? material_upload_1file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="material_upload_1file != ''" class="Stroke" name="cross" @click="Stroke('material_upload_1file')" />
        </div>
      </van-uploader>
      <!-- 协议照 -->
      <van-field label="协议照" required class="StoreCashier" />
      <van-uploader :after-read="onRead_protocol_upload_file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="protocol_upload_file ? protocol_upload_file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="protocol_upload_file != ''" class="Stroke" name="cross" @click="Stroke('protocol_upload_file')" />
        </div>
      </van-uploader>
      <!-- 申明协议函 -->
      <van-field label="申明协议函" required class="StoreCashier" />
      <van-uploader :after-read="onRead_agreement_upload_file" class="MerchantPhoto">
        <div style="padding: 0px; margin: 0 auto">
          <img :src="agreement_upload_file ? agreement_upload_file : require('./img/Group.png')" style="width: 100%" class="avatar" />
          <van-icon v-show="agreement_upload_file != ''" class="Stroke" name="cross" @click="Stroke('agreement_upload_file')" />
        </div>
      </van-uploader>
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
    <!-- 地址 -->
    <van-popup v-model="show" round position="bottom">
      <van-cascader v-model="cascaderValue" title="请选择银行所在地区" :options="options" @close="show = false" @finish="ONBankAddress" :field-names="fieldNames" />
    </van-popup>
    <!-- 日期组件 -->
    <van-popup v-model="Dates" round position="bottom">
      <div class="IDCardValidTime" v-show="longIt">
        <span @click="long">有效期为长期点击此处</span>
      </div>
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
      <!-- 支行名称       -->
      <van-field v-model="BankName" label="支行名称" required placeholder="请选择支行名称" @click="ONBankName" @input="oninput" />
      <van-list finished-text="没有更多了" error-text="本区域未获取到支行 请联系客服 客服电话:01053382256" :error.sync="error">
        <van-cell v-for="item in OpeningList" :key="item" :title="item.fh" @click="OpenBankDisplay(item)" />
      </van-list>
    </van-popup>

    <!-- 经营范围 -->
    <van-popup v-model="BusinessScope" round position="bottom" :style="{ height: '60%' }">
      <van-list finished-text="没有更多了">
        <van-cell v-for="item in BusinessScopeList" :key="item" :title="item.name" @click="ONChoose(item)" />
      </van-list>
    </van-popup>
    <!-- 神户基本信息 -->
    <van-dialog v-model="MerchantShow" title="基础信息填写" class="basis" :show-confirm-button="false">
      <van-cell-group>
        <van-field v-model="KnowledgeBase.company" label="公司名称" required placeholder="请输入公司名称" />
        <van-field v-model="KnowledgeBase.contact_name" label="联系人" required placeholder="请输入联系人" />
        <van-field v-model="KnowledgeBase.contact_mobile" label="手机号" required placeholder="请输入手机号" />
        <van-field v-model="remark" label="备注" placeholder="请输入备注" />
        <el-button
          style="
            width: 6rem;
            height: 36px;
            background: #e60416;
            border-radius: 18px;
            font-size: 16px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 36px;
            display: inline-block;
            margin-bottom: 1rem;
            margin-top: 0.8rem;
          "
          @click="onconfirm_SSS"
          >确认</el-button
        >
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
// 引入省市区
import { regionData } from "element-china-area-data";
import { Toast } from "vant";
export default {
  data() {
    return {
      KnowledgeBase: {
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
        company: "", //公司名称
        contact_name: "", //联系人
        contact_mobile: "" //手机号
      },
      remark: "", //备注
      MerchantShow: true, //填写基础信息开关
      active: 0, //第一步
      options: regionData, //地址库
      fieldNames: {
        //地址 属性名 重置
        text: "label",
        value: "value",
        children: "children"
      },
      show: false, //省市区显示开关
      Dates: false, //日期
      currentDate: new Date(2021, 0, 17),
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2099, 12, 31),
      TimeType: "", //选择时间时 存 属性名用于赋值

      // ----------------------基本信息----------------------
      // ----------------------商铺信息----------------------
      // --------------------法人信息--------------------
      // ----------------------结算信息----------------------

      // ****************************************************************************
      //   **************************基本信息**************************
      merch_full_name: "", //商户全名称   ok
      merch_short_name: "", //商户简称   ok
      merch_type: "", //商户类型编码，0线下商户，1线上商户，-1未知   ok
      province_id: "", //省份ID   ok在本地存着直接用
      city_id: "", //城市ID   ok在本地存着直接用
      offical_type: "", //商户行政类型，5 个体工商户，4 企业，6 个人  OK
      contact_type: "LEGAL_PERSON", //联系人类型，LEGAL_PERSON 法人，CONTROLLER 实际控制人，AGENT代理人，OTHER 其他
      contact_name: "", //联系人姓名  OK
      contact_mobile: "", //联系人手机号  OK
      contact_idcard: "", //联系人身份证号  OK
      contact_idcard_valid: "", //联系人身份证有效期   二合一
      IdStartTime: "", //身份证有效期开始时间
      IdEndTime: "", //身份证有效期结束时间
      //   **************************商铺信息**************************
      area_type: "", //营业执照类型,营业执照:NATIONAL_LEGAL,营业执照()多证合一):NATIONAL_LEGAL_MERGE,事业单位法人证书:INST_RGST_CTF
      business_no: "", //营业执照号 OK
      business_name: "", //营业执照注册名称 OK
      business_valid: "", //营业执照有效期   二合一
      business_valid_Start: "", //营业执照有效期开始
      business_valid_End: "", //营业执照有效期结束
      licence_address: "", //营业执照上的地址 OK
      address: "", //商户经营地址  三合一
      shengshiqu: "", //省市区
      xaingxidizhi: "", //详细地址

      legal_user: "", //法人姓名 OK
      legal_mobile: "", //法人手机号 OK
      legal_idcard: "", //法人身份证号 OK
      legal_idcard_valid: "", //法人身份证有效期限   二合一
      legal_idcard_valid_Start: "", //法人身份证有效期限
      legal_idcard_valid_End: "", //法人身份证有效期限
      business_scope: "", //经营范围   OK
      industry_id: "", //所属行业编码,详情看下方示例编码  OK上id

      serv_phone: "", //客服电话  OK
      serv_email: "", //邮箱  OK

      bupload_file: "", //营业执照,图片的全路径   OK
      material_upload_7file: "", //收银台照片,图片的全路径  OK
      registry_upload_file: "", //门头照,图片的全路径  OK
      material_upload_3file: "", //店主身份证国徽面(反面),图片的全路径  OK
      material_upload_4file: "", //店主身份证人像面(正面),图片的全路径  OK
      //   **************************结算信息**************************
      settle_type: "T", //结算类型,T：T+1结算,D：D+1结算   OK
      acct_type: "", //银行开户类型,1对公,2对私   OK
      bank_card_no: "", //银行卡号   OK
      bank_account: "", //银行账户名称   OK

      open_bank: "", //开户行名称    no
      open_branch_bank: "", //开户支行名称   no

      bank_province_id: "", //银行省份ID  OK 根据银行地址赋值
      bank_city_id: "", //银行城市ID  OK 根据银行地址赋值
      bank_mobile: "", //银行预留手机号  OK

      rupload_file: "", //对公账户许可,图片的全路径  OK
      material_upload_file: "", //法人身份证人像面(正面),图片的全路径  OK
      legal_upload_file: "", //法人身份证国徽(反面照),图片的全路径  OK
      photo_upload_file: "", //内部经营照片,图片的全路径  OK
      material_upload_2file: "", //结算银行卡正面照,图片的全路径  OK
      material_upload_5file: "", //入账人手持身份证正面,图片的全路径  OK
      material_upload_1file: "", //入账授权书,图片的全路径  OK

      protocol_upload_file: "", //协议照,开通付款功能必填，图片的全路径
      agreement_upload_file: "", //申明协议函,开通付款功能必填，图片的全路径
      //   **************************费率**************************

      //++++++++++++++++++++++++附加

      longIt: false, //日期长期显示
      province_bank: "", //省名_name
      city_bank: "", //市名_name
      BankAddress: "", //银行地址_name
      banklist: [], //银行列表
      ChooseTheBank: "", //选择的银行_name
      SelectBankShow: false, //选择银行显示隐藏
      error: false, //提示
      BankName: "", //开户行名称_name
      OpeningList: [], //开户行总列表
      BankNameShow: false, //选择开户行是否显示
      BusinessScope: false, //经营范围库显示隐藏
      BusinessScopeList: [], //经营范围库
      Classs: [], //查询时用
      category_error: false,
      RecommendedPerson: "", //推荐人手机号
      VerificationCode: "", //验证码
      getVerificationCode: true,
      Calculatetime: 60 * 1000, // 设置验证码时间
      MerchantData: "", //商户号信息
      bank_branch_code: "" //银行支行联行号
    };
  },
  watch: {
    // 手机号监控
    VerificationCode: function (N, O) {
      if (N.length == 6) {
        // 验证码验证是否正确
        this.VerificationCodeVerification();
      }
    }
  },
  mounted() {
    // this.fillInAgain(); //重新填写
  },
  activated() {
    // 获取银行列表
    this.GetBankList();
    // 每次进来后置顶
    window.scrollTo(0, 0);
    // 在本地存着直接用
    // this.onFinish(JSON.parse(window.localStorage.getItem("datalist_")));
    // 获取 商户是否申请过
    this.getMerchantsQuery();
  },
  methods: {
    // 重新填写
    fillInAgain() {
      if (this.$route.query.ReRe !== undefined) {
        var that = this;
        axios({
          method: "post",
          url: "https://tpkl.minpinyouxuan.com/index.php/api/v3/MerchProviderdetails",
          data: {
            uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid //银行省
          }
        })
          .then(response => {
            if (response.data.result == 1) {
              console.log("response.data.data", response.data.data);

              // 主体信息
              if (response.data.data.tuid_phone !== null) {
                that.RecommendedPerson = response.data.data.tuid_phone; //推荐人
              }

              that.merch_full_name = response.data.data.merch_full_name; //商户全名称
              (that.merch_short_name = response.data.data.merch_short_name), //商户简称
                (that.merch_type = response.data.data.merch_type); //商户简称_data
              that.offical_type = response.data.data.offical_type; //商户行政类型
              that.contact_type = response.data.data.contact_type; //联系人类型
              that.contact_name = response.data.data.contact_name; //联系人姓名
              that.contact_mobile = response.data.data.contact_mobile; //联系人手机号
              that.contact_idcard = response.data.data.contact_idcard; //联系人手机号
              that.IdStartTime = response.data.data.contact_idcard_valid.split("_")[0]; //联系人身份证有效期
              that.IdEndTime = response.data.data.contact_idcard_valid.split("_")[1];
              that.area_type = response.data.data.area_type; //营业执照类型
              that.business_no = response.data.data.business_no; //营业执照号
              that.business_name = response.data.data.business_name; //营业执照注册名称
              that.business_valid_Start = response.data.data.business_valid.split("_")[0]; //营业执照有效期
              that.business_valid_End = response.data.data.business_valid.split("_")[1]; //营业执照有效期
              that.licence_address = response.data.data.licence_address; //营业执照上的地址
              that.address = " response.data.data.licence_address"; //营业执照地址
              that.legal_user = response.data.data.legal_user; //法人姓名
              that.legal_mobile = response.data.data.legal_mobile; //法人手机号
              that.legal_idcard = response.data.data.legal_idcard; //法人身份证号
              that.legal_idcard_valid_Start = response.data.data.legal_idcard_valid.split("_")[0]; //法人身份证有效期限
              that.legal_idcard_valid_End = response.data.data.legal_idcard_valid.split("_")[1]; //法人身份证有效期限
              that.business_scope = response.data.data.business_scope; //经营范围
              that.industry_id = response.data.data.industry_id; //所属行业编码
              that.serv_phone = response.data.data.serv_phone; //客服电话
              that.serv_email = response.data.data.serv_email; //邮箱
              that.bupload_file = response.data.data.bupload_file; //营业执照
              that.material_upload_7file = response.data.data.material_upload_7file; //营业执照
              that.registry_upload_file = response.data.data.registry_upload_file; //门头照
              that.material_upload_3file = response.data.data.material_upload_3file; //店主身份证国徽面
              that.material_upload_4file = response.data.data.material_upload_4file; //店主身份证人像面
              that.settle_type = response.data.data.settle_type; //店主身份证人结算类型像面
              that.acct_type = response.data.data.acct_type; //银行开户类型
              that.bank_card_no = response.data.data.bank_card_no; //银行卡号
              that.bank_account = response.data.data.bank_account; //银行账户名称
              that.bank_mobile = response.data.data.bank_mobile; //银行预留手机号
              that.rupload_file = response.data.data.rupload_file; //对公账户许可
              that.material_upload_file = response.data.data.material_upload_file; //法人身份证人像面
              that.legal_upload_file = response.data.data.legal_upload_file; //法人身份证人像面
              that.photo_upload_file = response.data.data.photo_upload_file; //内部经营照片
              that.material_upload_2file = response.data.data.material_upload_2file; //结算银行卡正面照
              that.material_upload_5file = response.data.data.material_upload_5file; //入账人手持身份证正面
              that.material_upload_1file = response.data.data.material_upload_1file; //入账授权书
              that.bank_branch_code = response.data.data.bank_branch_code; //银行支行联行号

              return;
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
    // 确认基础信息
    onconfirm_SSS() {
      console.log("this.KnowledgeBase", this.KnowledgeBase);
      for (const key in this.KnowledgeBase) {
        if (this.KnowledgeBase[key] == "") {
          Toast("必填项不能为空");
          return;
        }
      }
      this.KnowledgeBase.remark = this.remark; //增加备注
      axios({
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded"
        // },
        method: "post",
        data: this.KnowledgeBase,
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v3/MerchRegister"
      })
        .then(response => {
          console.log("response.data.data", response.data.data);
          if (response.data.result == 1) {
            // 关闭基础信息
            this.MerchantShow = false;
          } else {
            // 打开基础信息
            this.MerchantShow = true;
          }
        })
        .catch(error => {});
    },
    // 获取 商户是否申请过
    getMerchantsQuery() {
      var that = this;
      axios({
        method: "post",
        data: { uid: this.KnowledgeBase.uid },
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v3/MerchProviderdetails"
      })
        .then(response => {
          if (response.data.result == 1) {
            that.MerchantData = response.data.data.mch_uid;
            that.MerchantShow = false;
          }
          if (response.data.result == 0) {
            that.MerchantShow = true;
          }
          console.log("responseresponse", that.MerchantData);
        })
        .catch(error => {});
    },
    // 点击长期
    long() {
      this.Dates = false;
      this.longIt = false; //结束日期的长期关闭
      if (this.TimeType == "IdEndTime") {
        this.IdEndTime = "长期";
        return;
      }
      if (this.TimeType == "business_valid_End") {
        this.business_valid_End = "长期";
        return;
      }
      if (this.TimeType == "legal_idcard_valid_End") {
        this.legal_idcard_valid_End = "长期";
        return;
      }
    },
    // 有效期开始时间
    IdCardIsValidStartTime() {
      this.Dates = true;
      this.TimeType = "IdStartTime";
    },
    // 有效期结束时间
    IdCardIsValidEndTime() {
      this.longIt = true; //结束日期的长期打开
      this.Dates = true; //打开选择日期组件
      this.TimeType = "IdEndTime";
    },
    // 营业执照有效期开始时间
    StartTimeOfBusinessLicense() {
      this.Dates = true;
      this.TimeType = "business_valid_Start";
    },
    // 营业执照有效期结束时间
    EndTimeOfBusinessLicense() {
      this.longIt = true; //结束日期的长期打开
      this.Dates = true; //打开选择日期组件
      this.TimeType = "business_valid_End";
    },
    // 法人身份证有效期开始时间
    StartTimeOfValidityOfLegalPersonDdCard() {
      this.Dates = true;
      this.TimeType = "legal_idcard_valid_Start";
    },
    // 营业执照有效期结束时间
    EndTimeOfValidityOfLegalPersonDdCard() {
      this.longIt = true; //结束日期的长期打开
      this.Dates = true; //打开选择日期组件
      this.TimeType = "legal_idcard_valid_End";
    },
    // 选中经营类目单项
    ONChoose(msg) {
      this.BusinessScope = !this.BusinessScope;
      this.business_scope = msg.name;
      this.industry_id = msg.value;
    },
    // 点击经营范围显示经营范围
    onfocus() {
      this.BusinessScope = !this.BusinessScope;
      this.BusinessScopeList = [
        { value: "8", name: "小型超市/便利店/零售商店" },
        { value: "9", name: "小吃/快餐/美食城" },
        { value: "10", name: "水果零售/蔬菜零售" },
        { value: "11", name: "水吧/饮料/冷饮" },
        { value: "12", name: "药品/医疗/保健" },
        { value: "13", name: "美发/美容/足疗保健" },
        { value: "14", name: "网吧/KTV/酒吧休闲娱乐类" },
        { value: "15", name: "大中型餐饮" },
        { value: "16", name: "大中型连锁超市" },
        { value: "17", name: "校园内食堂/餐饮" },
        { value: "18", name: "校园内超市/便利店/零售" },
        { value: "19", name: "快递" },
        { value: "20", name: "彩票" },
        { value: "21", name: "交通运输/票务旅游" },
        { value: "22", name: "教育" },
        { value: "23", name: "烟酒零食" },
        { value: "24", name: "其他" }
      ];
      return;
    },

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
    // 提交
    submit() {
      if (!this.RecommendedPerson) {
        Toast("推荐人手机号" + "不能为空");
        return;
      }

      if (!this.VerificationCode) {
        Toast("验证码不能为空");
        return;
      }
      if (!this.merch_full_name) {
        Toast("商户全名称" + "不能为空");
        return;
      }
      if (!this.merch_short_name) {
        Toast("商户简称" + "不能为空");
        return;
      }
      if (!this.merch_type) {
        Toast("请选择" + "商户类型");
        return;
      }
      if (!this.offical_type) {
        Toast("请选择" + "商户行政类型");
        return;
      }
      if (!this.contact_name) {
        Toast("联系人姓名" + "不能为空");
        return;
      }
      if (!this.contact_mobile) {
        Toast("联系人手机号" + "不能为空");
        return;
      }
      if (!this.contact_idcard) {
        Toast("联系人身份证号" + "不能为空");
        return;
      }
      if (!this.IdStartTime) {
        Toast("请选择" + "身份证有效期开始时间");
        return;
      }
      if (!this.IdEndTime) {
        Toast("请选择" + "身份证有效期结束时间");
        return;
      }
      if (!this.area_type) {
        Toast("请选择" + "营业执照类型");
        return;
      }
      if (!this.business_no) {
        Toast("营业执照号" + "不能为空");
        return;
      }
      if (!this.business_name) {
        Toast("营业执照注册名称" + "不能为空");
        return;
      }
      if (!this.business_valid_Start) {
        Toast("请选择" + "营业执照有效期开始");
        return;
      }
      if (!this.business_valid_End) {
        Toast("请选择" + "营业执照有效期结束");
        return;
      }
      if (!this.licence_address) {
        Toast("营业执照上的地址" + "不能为空");
        return;
      }
      if (!this.shengshiqu) {
        Toast("请选择" + "商户经营地址");
        return;
      }
      if (!this.xaingxidizhi) {
        Toast("详细地址" + "不能为空");
        return;
      }
      if (!this.legal_user) {
        Toast("法人姓名" + "不能为空");
        return;
      }
      if (!this.legal_mobile) {
        Toast("法人手机号" + "不能为空");
        return;
      }
      if (!this.legal_idcard) {
        Toast("法人身份证号" + "不能为空");
        return;
      }
      if (!this.legal_idcard_valid_Start) {
        Toast("请选择" + "法人身份证有效期限开始时间");
        return;
      }
      if (!this.legal_idcard_valid_End) {
        Toast("请选择" + "法人身份证有效期限结束时间");
        return;
      }
      if (!this.business_scope) {
        Toast("经营范围" + "不能为空");
        return;
      }
      if (!this.serv_phone) {
        Toast("客服电话" + "不能为空");
        return;
      }
      if (!this.serv_email) {
        Toast("邮箱" + "不能为空");
        return;
      }
      if (!this.bupload_file) {
        Toast("请上传" + "营业执照");
        return;
      }
      if (!this.material_upload_7file) {
        Toast("请上传" + "收银台照片");
        return;
      }
      if (!this.registry_upload_file) {
        Toast("请上传" + "门头照");
        return;
      }
      if (!this.material_upload_3file) {
        Toast("请上传" + "店主身份证国(反面)");
        return;
      }
      if (!this.material_upload_4file) {
        Toast("请上传" + "店主身份证(正面)");
        return;
      }
      if (!this.acct_type) {
        Toast("请选择" + "银行开户类型");
        return;
      }
      if (!this.bank_card_no) {
        Toast("银行卡号" + "不能为空");
        return;
      }
      if (!this.bank_account) {
        Toast("银行账户名称" + "不能为空");
        return;
      }
      if (!this.open_bank) {
        Toast("请选择" + "开户行名称");
        return;
      }
      if (!this.open_branch_bank) {
        Toast("请选择" + "开户支行名称");
        return;
      }
      if (!this.bank_province_id) {
        Toast("请选择" + "银行地址");
        return;
      }
      if (!this.bank_mobile) {
        Toast("银行预留手机号" + "不能为空");
        return;
      }
      if (!this.rupload_file) {
        Toast("请选择" + "对公账户许可");
        return;
      }
      if (!this.material_upload_file) {
        Toast("请选择" + "法人身份证人像面(正面)");
        return;
      }
      if (!this.legal_upload_file) {
        Toast("请选择" + "法人身份证国徽(反面照)");
        return;
      }
      if (!this.photo_upload_file) {
        Toast("请选择" + "内部经营照片");
        return;
      }
      if (!this.material_upload_2file) {
        Toast("请选择" + "结算银行卡正面照");
        return;
      }
      if (!this.material_upload_5file) {
        Toast("请选择" + "入账人手持身份证正面");
        return;
      }
      if (!this.material_upload_1file) {
        Toast("请选择" + "入账授权书");
        return;
      }
      if (!this.protocol_upload_file) {
        Toast("请选择" + "协议照");
        return;
      }
      if (!this.agreement_upload_file) {
        Toast("请选择" + "申明协议函");
        return;
      }

      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v3/MerchProviderSubmit",
        data: {
          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
          mch_uid: this.MerchantData, //商户号
          // ----------------------基本信息----------------------
          merch_full_name: this.merch_full_name, //商户全名称
          merch_short_name: this.merch_short_name, //商户简称
          merch_type: this.merch_type, //商户类型编码，0线下商户，1线上商户，
          province_id: this.province_id, //省份ID
          city_id: this.city_id, //城市ID
          offical_type: this.offical_type, //商户行政类型
          contact_type: this.contact_type, //联系人类型
          contact_name: this.contact_name, //联系人姓名
          contact_mobile: this.contact_mobile, //联系人手机号
          contact_idcard: this.contact_idcard, //联系人身份证号
          contact_idcard_valid: this.IdStartTime + "_" + this.IdEndTime, //联系人身份证有效期
          // ----------------------商铺信息----------------------
          area_type: this.area_type, //营业执照类型
          business_no: this.business_no, //营业执照号
          business_name: this.business_name, //营业执照注册名称
          business_valid: this.business_valid_Start + "_" + this.business_valid_End, //营业执照有效期
          licence_address: this.licence_address, //营业执照上的地址
          address: this.shengshiqu + this.xaingxidizhi, //营业执照上的地址
          legal_user: this.legal_user, //法人姓名
          legal_mobile: this.legal_mobile, //法人手机号
          legal_idcard: this.legal_idcard, //法人身份证号
          legal_idcard_valid: this.legal_idcard_valid_Start + "_" + this.legal_idcard_valid_End, //法人身份证有效期限
          business_scope: this.business_scope, //经营范围
          industry_id: this.industry_id, //所属行业编码
          serv_phone: this.serv_phone, //客服电话
          serv_email: this.serv_email, //邮箱
          bupload_file: this.bupload_file, //营业执照
          material_upload_7file: this.material_upload_7file, //收银台照片
          registry_upload_file: this.registry_upload_file, //门头照
          material_upload_3file: this.material_upload_3file, //店主身份证国徽面(反面)
          material_upload_4file: this.material_upload_4file, //店主身份证人像面(正面)
          // --------------------法人信息--------------------
          settle_type: this.settle_type, //结算类型
          acct_type: this.acct_type, //银行开户类型
          bank_card_no: this.bank_card_no, //银行卡号
          bank_account: this.bank_account, //银行账户名称

          open_bank: this.open_bank, //开户行名称    no
          open_branch_bank: this.open_branch_bank, //开户支行名称   no
          bank_province_id: this.bank_province_id, //银行省份ID
          bank_city_id: this.bank_city_id, //银行城市ID
          bank_mobile: this.bank_mobile, //银行预留手机号

          rupload_file: this.rupload_file, //对公账户许可
          material_upload_file: this.material_upload_file, //法人身份证人像面(正面)
          legal_upload_file: this.legal_upload_file, //法人身份证人像面(反面照)
          photo_upload_file: this.photo_upload_file, //内部经营照片
          material_upload_2file: this.material_upload_2file, //结算银行卡正面照
          material_upload_5file: this.material_upload_5file, //入账人手持身份证正面
          material_upload_1file: this.material_upload_1file, //入账授权书
          tuid_phone: this.RecommendedPerson, //推荐人的手机号
          bank_branch_code: this.bank_branch_code //银行支行联行号
        }
      })
        .then(response => {
          console.log("thatthatthat", response);
          if (response.data.result == 1) {
            Toast("支付码申请成功");
            this.$router.push({ name: "CashCodeApplicationSubmissionSuccess", params: {}, query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid } });
            Toast("支付码已申请,等待审核");
            // setTimeout(() => {
            //   window.history.back(-1);
            // }, 1000);
            // this.$emit("SendOff", false);
          } else {
            Toast(response.data.msg);
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
    // 在本地存着直接用
    onFinish(selectedOptions) {
      console.log("selectedOptions", selectedOptions);

      this.province_id = selectedOptions[0].value.substring(0, 2); //省
      this.city_id = selectedOptions[0].value; //市
      // 结算人银行地址
      this.BankAddress = selectedOptions.map(option => option.label).join("/");
      this.bank_province_id = selectedOptions[0].value.substring(0, 2); //value
      this.bank_city_id = selectedOptions[0].value; //value
      this.province_bank = selectedOptions[0].label; //省
      this.city_bank = selectedOptions[1].label; //市
    },
    // 营业执照
    onRead_bupload_file(e, flag) {
      this.onRead(e, flag, "bupload_file");
    },
    // 收银台照片
    onRead_material_upload_7file(e, flag) {
      this.onRead(e, flag, "material_upload_7file");
    },
    // 门头照
    onRead_registry_upload_file(e, flag) {
      this.onRead(e, flag, "registry_upload_file");
    },
    // 店主身份证国徽面反面
    onRead_material_upload_3file(e, flag) {
      this.onRead(e, flag, "material_upload_3file");
    },
    // 店主身份证国徽面正面
    onRead_material_upload_4file(e, flag) {
      this.onRead(e, flag, "material_upload_4file");
    },

    // 对公账户许可
    onRead_rupload_file(e, flag) {
      this.onRead(e, flag, "rupload_file");
    },
    // 法人身份证人像面(正面)
    onRead_material_upload_file(e, flag) {
      this.onRead(e, flag, "material_upload_file");
    },
    // 法人身份证国徽(反面照)
    onRead_legal_upload_file(e, flag) {
      this.onRead(e, flag, "legal_upload_file");
    },
    // 内部经营照片
    onRead_photo_upload_file(e, flag) {
      this.onRead(e, flag, "photo_upload_file");
    },
    // 结算银行卡正面照
    onRead_material_upload_2file(e, flag) {
      this.onRead(e, flag, "material_upload_2file");
    },
    // 入账人手持身份证正面
    onRead_material_upload_5file(e, flag) {
      this.onRead(e, flag, "material_upload_5file");
    },
    // 入账授权书
    onRead_material_upload_1file(e, flag) {
      this.onRead(e, flag, "material_upload_1file");
    },
    // 协议照
    onRead_protocol_upload_file(e, flag) {
      this.onRead(e, flag, "protocol_upload_file");
    },
    // 申明协议函
    onRead_agreement_upload_file(e, flag) {
      this.onRead(e, flag, "agreement_upload_file");
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
            That[parameter] = responseData.data.img_path;
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
      console.log("${date.getFullYear()}-${getMonth}-${getDate}", `${date.getFullYear()}-${getMonth}-${getDate}`);
      return `${date.getFullYear()}-${getMonth}-${getDate}`;
    },

    // 全部选项选择完毕后，会触发 finish 事件
    ONBankAddress({ selectedOptions }) {
      this.show = false;
      // if (this.active == 2) {
      //   this.BankAddress = selectedOptions.map(option => option.label).join("/");

      //   this.bank_province_id = selectedOptions[0].value.substring(0, 2); //value
      //   this.bank_city_id = selectedOptions[0].value; //value
      //   this.province_bank = selectedOptions[0].label; //省
      //   this.city_bank = selectedOptions[1].label; //市
      // }
      if (this.active == 1) {
        console.log("selectedOptions", selectedOptions);
        // 商户经营地址
        this.shengshiqu = selectedOptions.map(option => option.label).join("/");

        this.province_id = selectedOptions[0].value.substring(0, 2); //省
        this.city_id = selectedOptions[1].value; //市
        // 结算人银行地址
        this.BankAddress = selectedOptions.map(option => option.label).join("/");
        this.bank_province_id = selectedOptions[0].value.substring(0, 2); //value
        this.bank_city_id = selectedOptions[1].value; //value
        this.province_bank = selectedOptions[0].label; //省
        this.city_bank = selectedOptions[1].label; //市
      }
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
      this.open_bank = item; //赋值开户行名称
      this.ChooseTheBank = item;
      this.SelectBankShow = false;
    },
    // 支行有动静
    oninput() {
      // 地址银行有获取联合号
      this.GetAUnion();
    },
    // 点击支行
    ONBankName() {
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
      /**
       * @Author: 飞
       * @Date: 2021-09-28 19:28:19
       * @Describe: 开户支行名称
       */
      this.open_branch_bank = item.fh;
      // 联行号
      this.bank_branch_code = item.llh;
    }
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

  // 基础信息
  /deep/.basis {
    .van-dialog__header {
      padding: 10px 0;
    }
    .van-dialog__content {
      padding: 0 1rem;
      .van-field__label {
        width: 4rem;
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
}
</style>

