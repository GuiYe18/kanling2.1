<!--
 * @Author: 飞
 * @Date: 2021-05-11 16:03:35
 * @LastEditTime: 2021-09-29 18:06:35
 * @FilePath: \you-shop1\src\views\MerchantSettled\PaymentCodeAuthenticationFailed.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <div><img src="./img/DidNotPass.png" alt="" /></div>
    <p class="UnderReview">审核未通过</p>
    <p class="UnderReviewText">未通过原因：{{ s_remarks }}</p>
    <!-- 重新认证 -->
    <div class="btn" @click="submit" v-if="payStype != 1">重新认证</div>
    <div v-show="payStype == 1" class="UnderReviewText_T">
      <p v-show="payStype == 1">请联系看领客服人员进行修改资料</p>
      <p v-show="payStype == 1">联系电话：4008978288</p>
    </div>
    <!-- <div class="btn" @click="submit" v-if="uid == '685'">重新认证</div> -->
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      uid: "", //uid
      s_remarks: "", //拒绝理由
      id: "" //id
    };
  },
  methods: {
    submit() {
      if (this.payStype == 2) {
        //   付临门
        this.$router.push({
          name: "MerchantSettled",
          params: {},
          query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, ReRe: true, MasterkeyID: this.id, payStype: this.payStype }
        });
      }
      if (this.payStype == 1) {
                //   汇元
        this.$router.push({
          name: "HuiYuan",
          params: {},
          query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, ReRe: true, MasterkeyID: this.id, payStype: this.payStype }
        });
      }
      // this.$router.push({ name: "PaymentArea", params: {}, query: { uid: this.uid, ReRe: true, MasterkeyID: this.id } });
    }
  },
  activated() {
    this.uid = JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid;
    this.payStype = this.$route.query.payStype;
    this.payStype = this.$route.query.payStype;
    // 获取未通过的理由
    var that = this;
    axios
      .post(" https://tpkl.minpinyouxuan.com/api/v1/pay_shopstatus", {
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid
      })
      .then(response => {
        if (response.data.result == 1) {
          console.log("response", response);
          that.s_remarks = response.data.data.reject_reson; //拒绝理由
          that.id = response.data.data.id; //id
        }
      })
      .catch(error => {
        console.log(error);
      });
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
    font-size: 15px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
    width: 300px;
    text-align: left;
    display: inline-block;
  }
  .UnderReviewText_T {
    margin-top: 1rem;
    p {
      font-size: 15px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 600;
      color: #333333;
      line-height: 20px;
      width: 300px;
      text-align: left;
      display: inline-block;
    }
  }
}
</style>
