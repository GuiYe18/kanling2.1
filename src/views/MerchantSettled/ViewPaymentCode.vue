<!--
 * @Author: 飞
 * @Date: 2021-06-21 19:25:07
 * @LastEditTime: 2021-06-21 19:55:11
 * @FilePath: \you-shop1\src\views\MerchantSettled\ViewPaymentCode.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <div class="qrcode">
      <img :src="qrcode" alt="" />
    </div>
    <div class="save">
      <span>长按保存</span>
    </div>
    <div class="CustomerService">
      <span>如有问题请咨询 <br />客服电话：400-8978-288</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qrcode: ""
    };
  },
  activated() {
    var that = this;
    axios({
      method: "post",
      url: "https://tpkl.minpinyouxuan.com/index.php/api/v1/geterweima_pay",
      data: {
        uid: window.localStorage.getItem("uid")
        // uid: "1034"
      }
    })
      .then(response => {
        console.log("response", response);
        if (response.data.result == 1) {
          // this.$router.push({ name: "ComMit", params: {}, query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid } });
          that.qrcode = response.data.data.qrcode_url;
        }
        if (response.data.result == 0) {
          // Toast(response.data.msg);
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
  background-image: url("./img/查看支付码.png");
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  .CustomerService {
    position: absolute;
    left: 31%;

    bottom: 5%;
    span {
      font-size: 12px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #666666;
      line-height: 14px;
    }
  }
  // 长按保存
  .save {
    position: absolute;
    top: 82%;
    left: 41%;
    span {
      width: 64px;
      height: 24px;
      font-size: 16px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      font-weight: 500;
      color: #666666;
      line-height: 24px;
    }
  }
  // 二维码
  .qrcode {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 25%;
    left: 23%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>