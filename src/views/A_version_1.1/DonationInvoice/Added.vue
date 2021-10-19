<!--
 * @Author: 飞
 * @Date: 2021-08-11 17:50:46
 * @LastEditTime: 2021-08-13 16:27:18
 * @FilePath: \you-shop1\src\views\A_version_1.1\DonationInvoice\Added.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-nav-bar title="新增抬头" left-arrow @click-left="onClickLeft" />
    <div class="OuterLayer">
      <div class="LifterBody">
        <p class="TypesOf">发票类型</p>
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="1" icon-size="16px" checked-color="#E60416">个人</van-radio>
          <van-radio name="2" icon-size="16px" checked-color="#E60416">企业</van-radio>
        </van-radio-group>
        <p class="TypesOf">发票抬头 <span>*</span></p>
        <van-field v-model="InvoiceValue" placeholder="抬头名称或极速开票六位代码" />
        <template v-if="radio == 2">
          <p class="TypesOf">税号 <span>*</span></p>
          <van-field v-model="TaxationValue" placeholder="纳税人识别号或社会统一征信代码" />
        </template>
      </div>

      <div class="CorporateInformation" v-if="radio == 2">
        <p class="TypesOf">开户银行</p>
        <van-field v-model="BankBankValue" placeholder="选填" />
        <p class="TypesOf">银行账号</p>
        <van-field v-model="BankAccountValue" placeholder="选填" />
        <p class="TypesOf">企业地址</p>
        <van-field v-model="companyAddressValue" placeholder="选填" />
        <p class="TypesOf">企业电话</p>
        <van-field v-model="TelephoneCallValue" placeholder="选填" />
      </div>
      <div class="SetTheDefault">
        <span>设为默认</span>
        <van-checkbox v-model="checked" icon-size="16px" checked-color="#E60416"></van-checkbox>
      </div>
    </div>
    <div class="Finish" @click="AddTo">完成</div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      checked: true, //是否设置默认
      radio: "1", //1个人 2企业
      InvoiceValue: "", //发票抬头
      TaxationValue: "", //税号

      BankBankValue: "", //开户银行
      BankAccountValue: "", //银行账号
      companyAddressValue: "", //企业地址
      TelephoneCallValue: "" //企业电话
    };
  },
  methods: {
    // 添加
    AddTo() {
      Toast("添加"  );
    },
    // 后退
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.van-nav-bar {
  .van-icon {
    color: #979797;
  }
  .van-nav-bar__title {
    font-size: 0.88rem;
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: #666666;
    line-height: 1.31rem;
  }
}
.content {
  height: 100%;
  // 外环
  .OuterLayer {
    height: calc(100% - 3.6rem - 67px);
    overflow: auto;
    // 抬头本体
    .LifterBody {
      background: #ffffff;
      border-radius: 0.75rem;
      margin: 0.63rem 0.8rem;
      padding: 1.25rem;
      .TypesOf {
        width: 100%;
        text-align: left;
        font-size: 0.88rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #333333;
        line-height: 1.31rem;
        span {
          color: red;
          font-weight: bold;
        }
      }
      /deep/.van-radio-group {
        margin: 1.25rem 0;
        .van-radio {
          width: 5rem;
        }

        .van-radio__label {
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #666666;
        }
      }
      /deep/.van-cell {
        padding: 0;
        margin: 1.25rem 0;
        border-bottom: 0.06rem solid #f0f1f2;
      }
    }
    // 企业信息
    .CorporateInformation {
      background: #ffffff;
      border-radius: 0.75rem;
      margin: 0.63rem 0.8rem;
      padding: 1.25rem;
      .TypesOf {
        width: 100%;
        text-align: left;
        font-size: 0.88rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #333333;
        line-height: 1.31rem;
      }
      /deep/.van-cell {
        padding: 0;
        margin: 1.25rem 0;
        border-bottom: 0.06rem solid #f0f1f2;
      }
    }
    // 设置默认
    .SetTheDefault {
      background: #ffffff;
      border-radius: 0.75rem;
      margin: 0 0.8rem;
      padding: 1.25rem;
      text-align: left;
      span {
        font-size: 0.88rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #333333;
        line-height: 1.31rem;
      }
      /deep/.van-checkbox {
        float: right;
      }
    }
  }
  // 完成
  .Finish {
    width: 20.75rem;
    display: inline-block;
    color: #fff;
    height: 2.25rem;
    background: #e60416;
    border-radius: 1.13rem;
    line-height: 2.25rem;
    font-size: 1rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    margin-top: 1rem;
  }
}
</style>