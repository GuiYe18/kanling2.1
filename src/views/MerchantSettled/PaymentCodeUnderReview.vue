<!--
 * @Author: 飞
 * @Date: 2021-05-11 16:03:35
 * @LastEditTime: 2021-09-29 17:25:06
 * @FilePath: \you-shop1\src\views\MerchantSettled\PaymentCodeUnderReview.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <div><img src="./img/underReview.png" alt="" /></div>
    <p class="UnderReview">支付码审核中</p>
    <p class="UnderReviewText">
      信息提交后两个工作日审核<br />
      审核时间周一到周五
    </p>
  </div>
</template>

<script>
export default {
  activated() {
    
  },
};
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
