<!--
 * @Author: 飞
 * @Date: 2021-04-25 11:29:50
 * @LastEditTime: 2021-06-07 19:13:58
 * @FilePath: \you-shop1\src\views\MerchantSettled\MatterAgreement copy.vue
 * @Describe: 
-->
<template>
  <div class="kkkkk">
    <div class="content">
      <img src="./img/e7dc68a7dcc2066028fa791307007c2.png" alt="">
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
