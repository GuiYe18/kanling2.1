<!--
 * @Author: 飞
 * @Date: 2021-04-25 11:29:50
 * @LastEditTime: 2021-05-28 17:15:13
 * @FilePath: \you-shop1\src\views\Sifu\protocol.vue
 * @Describe: 
-->
<template>
  <div class="kkkkk">
    <div class="content">
      <div class="tit">四扶人员申请免费领取爱心物资额度的规则协议</div>
      <p>&nbsp;</p>
      <h6>尊敬的各位申请者请您仔细阅读爱心物资额度申请及使用规则：</h6>
      <p>
        1：必须符合四扶人员（军烈属、残疾人、低保户、五保户）的条件及相关证件才具备申请条件，申请人的身份证号和相关证件号必须一致，所有申请人用的手机号码必须是本人身份证申请的号码一致，才可以申请，必须保证三号一致才能有效。
      </p>
      <p>2：申请通过后，每三个月需再验证一次（刷脸验证），确保实时是本人操作领取爱心物资额度。</p>
      <p>
        3：申请成功后，每个月都可以免费点击领取500元的爱心物资额度，爱心物资额度只能用于兑换捐赠的爱心物资，只能在捐物商城里使用，爱心物资额度只能当月使用
        ，当月有效，本月如不使用爱心物资额度，爱心物资额度会自动清零。爱心物资额度不能累计使用。
      </p>
      <p>4：所领取的爱心物资额度不等于现金，不能提现，不能转让，不能兑换其他正常商品，不支持其他相关的要求。</p>
      <p>
        5：四扶人员所领取的爱心物资额度只能兑换捐赠的爱心物品，物品根据捐物平台上的物品为准，根据自己的需求选择，如没有需要的物品或者物品已被兑换完，所领取的爱心物资额度不能继续使用的情况，平台不承担任何爱心物资额度的损失。
      </p>
      <p>6：四扶人员所领取的爱心物资额度只能兑换捐赠的爱心物品，爱心物资是通过快递物流或者上门自提方式收取，如所选择兑换的爱心物资，物流无法支持，或者捐赠者不愿意捐赠给您，此爱心物资就不能兑换。</p>
      <p>7：凡是以四扶人员持相关证件在平台上冒名领取爱心物资者，或者以制造假的证件证明等领取爱心物资者，必须承担所有领取爱心物资价值的十倍现金进行赔偿，并承担相关的所有法律责任。</p>
      <p><br /></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  activated() {
    // 每次进来后置顶
    window.scrollTo(0, 0);
    console.log("2222222222222222222222");
  }
};
</script>

<style lang="scss" scoped>
.kkkkk {
  overflow: auto;
  .content {
    text-align: left;
    padding: 16px 17px;
    font-size: 14px;
    /deep/.van-dialog__content {
      padding: 8px 17px;
    }
    /deep/.van-overlay {
      background-color: rgba(0, 0, 0, 0.4);
    }
    .tit {
      font-size: 15px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: #333333;
      line-height: 23px;
      text-align: center;
    }

    h6 {
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #000000;
      margin-top: 7px;
      margin-bottom: 16px;
    }
    p {
      text-indent: 2em;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #666666;
      line-height: 20px;
    }
  }
}
</style>>
