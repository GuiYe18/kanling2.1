<!--
 * @Author: 飞
 * @Date: 2021-04-25 11:29:50
 * @LastEditTime: 2021-08-02 14:26:33
 * @FilePath: \you-shop1\src\views\kick\MatterAgreement.vue
 * @Describe: 
-->
<template>
  <div class="kkkkk">
    <div class="content">
      <h2 class="tit">义卖平台使用规则及协议</h2>

      <h3>平台义卖物资规则协议</h3>
      <p>
        本物品属于我个人/我企业自愿发布到看领平台进行义卖销售的物品，符合条件的群众（残疾人/烈属/低保户/五保户）上传相应证明即可免费下单领取我个人/我企业自愿发布到看领平台进行义卖销售的物品，不符合条件的群众可以直接付费购买，消费者所购买义卖物资的现金，在确认收货之后，所有义卖物资销售的货款我本人/我企业承诺全部捐入指定的公益基金会账户内，不允许提现到自己账户，此义卖物品在没有被领取或者购买前，物品所属权归我个人/我企业。<br />
      </p>
      <p>1：我本人/我单位自愿把属于自己合法产权的物品放置在看领商城中无条件的赞助给被义卖者，被赞助者包括（残疾/烈属/低保户/五保户）等符合国家救助条件的人群。<br /></p>
      <p>2; 我本人/我单位自愿把属于自己合法产权的物品放置在看领商城中销售,所有销售出去的义卖物资货款全部自愿捐入到指定的公益基金账户内。<br /></p>
      <p>
        3：我本人/我单位所义卖的物品一旦被购买或者领取后，必须把物品的产权转移给对方，并安排物流把物品发出，如对方愿意上门自提等，根据自身的时间安排配合对方上门取物，如条件不允许的情况下，在上架义卖物品的详情页描述清楚，此商品不支持上门自提。一旦选择可以上门自提时，用户在下单成功后会显示我本人/我单位的姓名、电话、地址等个人信息，由用户联系上门自提的事宜。我本人/我单位同意以上信息数据显示在下单用户后台。<br />
      </p>
      <p>4：我本人/我单位所义卖的物品一旦被购买或者领取后，所产生的物流费用由双方协商承担。<br /></p>
      <p>
        5：我本人/我单位所义卖的物品必须承诺是符合国家规定要求的物品，必须具备产品流通条件的相关资料及认证，严禁把不能二次使用和别人不能使用的物品上线义卖（国家禁止物品），衣服等贴身物品必须是全新的才可以义卖，食品必须有卫生许可证的产品，二手物品必须可以正常使用的物品，在上架义卖物品时必须和实际物品描述一致，不能违规宣传，不能虚假宣传，不能与义卖物品不符的宣传，由此所导致的售后，全部由我本人/我单位承担所有损失，并承担相应的法律责任。<br />
      </p>
      <p>
        6：我本人/我单位所义卖的物品在上架义卖销售或者领取的过程中，还没有销售出去前，如果所上架的物品出现其他情况后，不能继续义卖了，请及时下架所上架的义卖物品，如果没有及时下架，导致用户购买或者领取后没有此物品时，由此导致的售后产生的相关运费及其他费用由我本人/我单位全部承担。<br />
      </p>
      <p>
        7：我本人/我单位所义卖的物品一旦被成功购买或者领取后，可以根据实际状态申请定向捐赠的基金会给予捐赠证书或者是捐赠发票（义卖物资被四扶人员用爱心物资额度兑换领取后申请的是捐赠证书，义卖物资被消费者直接付费购买后可以申请的是捐赠发票）。<br />
      </p>
      <br />
      以上条款最终解释权归平台所有。<br />
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
