<!--
 * @Author: 飞
 * @Date: 2021-05-11 16:03:35
 * @LastEditTime: 2021-05-25 16:34:33
 * @FilePath: \you-shop1\src\views\Sifu\SifuAuthenticationFailed.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <div><img src="./img/未通过.png" alt="" /></div>
    <p class="UnderReview">审核未通过</p>
    <p class="UnderReviewText">未通过原因：{{s_remarks}}</p>
    <!-- 重新认证 -->
    <div class="btn" @click="submit">重新认证</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid: "" ,//uid
      s_remarks:''//拒绝理由
    };
  },
  methods: {
    submit() {
      this.$router.push({ name: "Sifu" ,params:{},query:{i: this.$route.query.i,type: this.$route.query.type,mid: this.$route.query.mid,uid:this.uid}});
    }
  },
  activated() {
    console.log("his.$router.query.uid", this.$route.query.uid);
    this.uid = this.$route.query.uid;
    axios({
      method: "post",
      url: "https://tpkl.minpinyouxuan.com/index.php/api/v2/supportdetail",
      data: {
        uid: Number(this.uid)
      }
    })
      .then(response => {
        console.log(response);
        if (response.data.result == 1) {
          // this.$router.push({ name: "ComMit" });
          this.s_remarks = response.data.data.s_remarks
        }
        if (response.data.result == 0) {
          Toast(response.data.msg);
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
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
    width: 300px;
    text-align: left;
    display: inline-block;
  }
}
</style>
