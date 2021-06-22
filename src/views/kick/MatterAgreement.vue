<!--
 * @Author: 飞
 * @Date: 2021-04-25 11:29:50
 * @LastEditTime: 2021-05-28 17:31:43
 * @FilePath: \you-shop1\src\views\kick\MatterAgreement.vue
 * @Describe: 
-->
<template>
  <div class="kkkkk">
    <div class="content">
      <h2 class="tit">平台使用规则及协议</h2>
      <h3>平台捐赠物资规则协议</h3>
      <br />
      <p>
        本物品属于我个人/我企业自愿捐赠物品，符合条件的被捐助者（残疾人/烈属/低保户/五保户）上传相应证明即可免费下单领取爱心捐赠物资，不符合条件的消费者可以直接付费购买，消费者所购买捐赠物资的现金，在确认收货之后，所有捐赠物资销售的货款全部捐入指定的公益基金会账户内，不允许提现到自己账户，此捐赠物品在没有被领取或者购买前，物品所属权归我个人/我企业。
      </p>
      <p>&nbsp;</p>
      <p>1：我本人/我单位自愿把属于自己合法产权的物品放置在捐领捐物商城中无条件的捐赠给被捐赠者，被捐赠者包括（残疾/烈属/低保户/五保户）等符合国家救助条件的人群。</p>
      <p>2; 我本人/我单位自愿把属于自己合法产权的物品放置在捐领捐物商城中销售,所有销售出去的爱心物资货款全部自愿捐入到指定的公益基金账户内。</p>
      <p>
        3：我本人/我单位所捐赠的物品一旦被购买或者领取后，必须把物品的产权转移给对方，并安排物流把物品发出，如对方愿意上门自提等，根据自身的时间安排配合对方上门取物，如条件不允许的情况下，在上架捐赠物品中描述清楚，此商品不支持上门自提。一旦选择可以上门自提时，用户在下单成功后会显示我本人/我单位的姓名、电话、地址等个人信息，由用户联系上门自提的事宜。我本人/我单位同意以上信息数据显示在下单用户后台。
      </p>
      <p>4：我本人/我单位所捐赠的物品一旦被购买或者领取后，所产生的物流费用由双方协商承担。</p>
      <p>
        5：我本人/我单位所捐赠的物品必须承诺是符合国家规定要求的物品，必须具备产品流通条件的相关资料及认证，严禁把不能二次使用和别人不能使用的物品捐赠上线（国家禁止物品），衣服等贴身物品必须是全新的才可以捐赠，食品必须有卫生许可证的产品，二手物品必须可以正常使用的物品，在上架捐赠物品时必须和捐赠物品描述一致，不能违规宣传，不能虚假宣传，不能与捐赠物品不符的宣传，由此所导致的售后，全部由我本人/我单位承担所有损失，并承担相应的法律责任。
      </p>
      <p>
        6：我本人/我单位所捐赠的物品在上架捐赠销售或者领取的过程中，还没有销售出去前，如果所上架的物品出现其他情况后，不能继续捐赠了，请及时下架所上架的捐赠物品，如果没有及时下架，导致用户购买或者领取后没有此物品时，由此导致的售后产生的相关运费及其他费用由我本人/我单位全部承担。
      </p>
      <p>
        7：我本人/我单位所捐赠的物品一旦被成功购买或者领取后，可以根据实际状态申请定向捐赠的基金会给予捐赠证书或者是捐赠发票（捐赠物资被四扶人员用爱心物资额度兑换领取后申请的是捐赠证书，捐赠物资被消费者直接付费购买后可以申请的是捐赠发票）。
      </p>
      <p>以上条款最终解释权归平台所有。</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
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
      font-size: 16px;
      text-align: center;
      padding-top: 4px;
      padding-bottom: 12px;
      font-weight: bold;
    }
    h3 {
      font-size: 16px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #000000;
    }
    h6 {
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #000000;
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
