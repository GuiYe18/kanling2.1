<!--
 * @Author: 飞
 * @Date: 2021-05-24 14:29:51
 * @LastEditTime: 2021-05-24 20:27:18
 * @FilePath: \you-shop1\src\views\IncomeAndExpenditureDetails\RequestARefund.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <div class="img">
      <img src="./img/退款.png" alt="" />
    </div>
    <p>退款金额将原路退回至付款账户</p>
    <span>请确保余额充足</span>
    <div class="confirm" @click="confirm">确认退款</div>
  </div>
</template>

<script>
export default {
  activated() {
    console.log("route.query.", this.$route.query.wwwwww);
  },
  methods: {
    confirm(){
      this.$router.push(this.fun.getUrl("IncomeAndExpenditureDetails", {}, {  }));
      console.log('退款');
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: calc(100% + 50px);
  background: #fff;
  .img {
    padding-top: 60px;
    img {
      width: 88px;
      height: 56px;
    }
  }
  p {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #494949;
    line-height: 25px;
    margin-top: 30px;
    margin-bottom: 9px;
  }
  span {
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
    display: block;
  }
  .confirm {
    margin-top: 30px;

    display: inline-block;
    width: 300px;
    height: 36px;
    background: #e60416;
    border-radius: 18px;
    line-height: 36px;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>