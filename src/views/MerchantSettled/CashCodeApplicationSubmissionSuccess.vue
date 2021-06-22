<!--
 * @Author: 飞
 * @Date: 2021-05-11 16:03:35
 * @LastEditTime: 2021-06-04 15:31:27
 * @FilePath: \you-shop1\src\views\MerchantSettled\CashCodeApplicationSubmissionSuccess.vue
 * @Describe: CashCodeApplicationSubmissionSuccess
-->
<template>
  <div class="content">
    <div><img src="./img/提交成功.png" alt="" /></div>
    <p class="UnderReview">支付码申请提交成功</p>
    <p class="UnderReviewText">信息提交后48小时内审核</p>
    <!-- 重新认证 -->
    <div class="btn" @click="submit">返回</div>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      // this.$router.go(-2);  i=2&type=5&mid=0
      this.$router.push({ name: "member",params:{},query: { i: this.$route.query.i,type: this.$route.query.type,mid: this.$route.query.mid } });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  height: calc(100% + 50px);
  //   重新认证
  .btn {
    width: 300px;
    height: 36px;
    background: #e60416;
    border-radius: 18px;
    display: inline-block;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 36px;
    margin-top: 40px;
  }

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
    width: 300px;
    display: inline-block;
  }
}
</style>
