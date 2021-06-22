<!--
 * @Author: 飞
 * @Date: 2021-05-11 16:03:35
 * @LastEditTime: 2021-06-04 14:59:40
 * @FilePath: \you-shop1\src\views\MerchantSettled\PaymentCodeUnderReview.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <div><img src="./img/审核中.png" alt="" /></div>
    <p class="UnderReview">支付码审核中</p>
    <p class="UnderReviewText">信息提交后48小时内审核</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  height: calc(100% + 50px);
  img {
    width: 100px;
    height: 120px;
    margin-top: 56px;
  }
  .UnderReview {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #494949;
    line-height: 25px;
    margin-top: 16px;
    margin-bottom: 9px;
  }
  .UnderReviewText {
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
  }
}
</style>
