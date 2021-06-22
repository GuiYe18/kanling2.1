<!--
 * @Author: 飞
 * @Date: 2021-04-25 11:29:50
 * @LastEditTime: 2021-05-28 17:43:18
 * @FilePath: \you-shop1\src\views\kick\DonationAgreement.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <h2 class="tit">平台使用规则及协议</h2>
    <h3>捐赠物资协议</h3>
    <br />
    <p>&nbsp;</p>
    <p>
      声明：本系统平台只是业务对接平台，不做具体收捐收款业务，本系统平台只是信息发布展示、技术服务和业务对接等工作。所有捐赠物资款都对应相应的合作基金会或者公益组织，所有收捐的物资均为定向基金会指定使用。所产生的纠纷均由捐助方和定向基金会双方协商解决，如双方不能自行解决，可以申请法律诉讼等解决方法。
    </p>
    <p>要求：捐赠人对所捐赠的善款（物）持有所有权，属自愿行为。</p>
    <p>定向基金承诺：您所捐赠的每一份善款（物），将用于开展的公益慈善项目。</p>
    <p>1、捐赠来源：</p>
    <p>捐赠人捐赠的财产，是其有权处分的合法财产，且权属关系无争议。</p>
    <p>2、捐赠用途：</p>
    <p>定向捐赠的基金会所收到的所有捐赠物资将按自己基金会要求（明确使用方向、实施项目和受益人、捐助地区）用于本机构指定项目。&nbsp;</p>
    <p>3、权利义务：</p>
    <p>
      1）、捐赠人有权向所捐赠的基金会查询捐赠财产的使用及管理情况，并提出意见和建议。对于捐赠人的查询，捐赠的基金会会如实答复。如出现违反捐赠要求使用捐赠财产的情况，捐赠人有权要求履行捐赠要求或者撤销捐赠行为。&nbsp;
    </p>
    <p>2）、捐赠人对捐赠行为、捐赠财产和其他有关事项要求保密的，捐赠的基金会将予以保密。</p>
    <p>3）、凡是捐赠人捐赠现金后，获得相应的爱心物资额度，并用积分兑换爱心物资的捐赠现金款，不予开具捐赠发票。捐赠发票开给物资捐赠方。捐赠现金者获得爱心物资，物资捐赠方获得捐赠发票。</p>
    <p>&nbsp;</p>
    <p>4、其他约定</p>
    <p>对捐赠人已捐出的捐赠财产，都视为捐赠给基金会的捐赠收入，任何情况下捐赠的基金会不作任何退还或返还补偿。</p>
    <p>5、法律的适用和管辖：&nbsp;</p>
    <p>基本声明的生效、履行、解释及争议的解决均适用中华人民共和国法律。如果本声明的任何条款因与中华人民共和国现行法律相抵触而无效</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  activated() {
    // 每次进来后置顶
    window.scrollTo(0, 0);
    console.log("2222222222222222222222");
  }
};
</script>

<style lang="scss" scoped>
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
  .protocol {
    height: 500px;
    overflow: auto;
  }
}
</style>>
