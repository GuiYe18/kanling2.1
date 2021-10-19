<!--
 * @Author: 飞
 * @Date: 2021-04-20 11:08:44
 * @LastEditTime: 2021-08-26 11:59:06
 * @FilePath: \you-shop1\src\views\member\extensionHome.vue
 * @Describe: 
-->
<!--
 * @Author: 飞
 * @Date: 2021-04-20 11:08:44
 * @LastEditTime: 2021-06-04 15:35:20
 * @FilePath: \you-shop1\src\views\member\extensionHome.vue
 * @Describe: 
-->
<template>
  <div id="income">
    <div class="supplier">
      <!-- tolink 直接对接路由  -->

      <c-title v-show="type == 1" :hide="false" tolink="extensionitem" totext="分享列表"></c-title>
      <c-title v-show="type == 2" :hide="false"></c-title>

      <!-- <div style="height: 40px"></div> -->
      <div></div>
      <div :class="type == 1 ? 'main' : 'main2'">
        <img v-show="type == 1" class="qrcode" :src="qrcode" alt="推广二维码" />
        <!-- 导航 -->
        <div class="invite">
          <div>
            <span :class="type == 1 ? '' : 'Donation_J'" @click="Donation(1)">红包</span>
            <span :class="type == 1 ? 'Donation_J' : ''" @click="Donation(2)">捐赠码</span>
          </div>
        </div>

        <!-- 捐赠 -->
        <div class="Donation">
          <!-- <img v-show="type == 2" src="../../assets/images/member/左右.png" alt="" /> -->
        </div>
        
        <!-- 滑动 -->
        <!-- <van-tabs v-model="active" swipeable v-show="type == 2">
          <van-tab>
            <div class="LongPress">
              <img :src="makePic" alt="" />
              <span>长按保存</span>
            </div>
          </van-tab>
          <van-tab>
            <div class="LongPress">
              <img src="../../assets/images/member/Donation.png" alt="" />
              <span>长按保存</span>
            </div>
          </van-tab>
        </van-tabs> -->
        <!-- 不滑动 -->
        <div class="img"  v-show="type == 2">
          <!-- <img :src="makePic" alt=""> -->
<!-- DonateQRCode -->
          <img src="../../assets/images/member/Donation.png" alt="" />
          <div class="qrcode">
            <img src="../../assets/images/member/DonateQRCode.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cTitle from "components/title";
export default {
  components: { cTitle },
  data() {
    return {
      qrcode: "",
      type: 1,
      makePic: ""
    };
  },
  activated() {
    this.getExtensionInfo();
    this.abcd();
  },
  methods: {
    abcd() {
      let img1 = new Image();
      img1.src = require("../../assets/images/member/Donation.png");
      // 设置底色大小
      // img1.width = 299;
      // img1.height = 417;
      img1.setAttribute("crossOrigin", "anonymous");
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      canvas.width = 299;
      canvas.height = 417;
      // canvas.width = 600;
      // canvas.height = 820;
      let img2 = new Image();
      let flag = true;
      // 将 img1 加入画布
      img1.onload = () => {
        console.log("aaaaaaaaaaaaaaaa", canvas);
        context.drawImage(img1, 0, 0, 299, 417);
        // context.drawImage(img1, 0, 0, 600, 820);
        img2.setAttribute("crossOrigin", "anonymous");

        // console.log("imgimgimgimgimg", this.$refs.img.src);
        // img2.src = 'https://tpkl.minpinyouxuan.com/uploads/images/1620978498.png';
        // img2.src = 'https://thirdwx.qlogo.cn/mmopen/BP0pXbmpGCJFmiciaLiayib5u0lFlILzAUrDHPp6erJBFxZRHtQ7goBzQFFsLQXUcgF43USKhPYOKYYCibfWxL69FICHtLdMlnib7s/132'

        // img2.src = this.materialUrl

        img2.src = "https://qncdn.minpinyouxuan.com/9624935b333480b64277d9fbe816ba94.jpg";
        // img2.src = this.base64

        // img2.width = 299;
        // img2.height = 800;
        if (flag) {
          flag = false;
        } else {
          let src = canvas.toDataURL();
          // this.makePic = src;
          console.log("aaaaaaaaaaaaaaaa", src);
        }
      };
      // 将 img2 加入画布
      img2.onload = () => {
        // 设置二维码的大小
        context.drawImage(img2, 74, 148, 154, 154);
        // context.drawImage(img2, 90, 148, 154, 154);
        if (flag) {
          flag = false;
        } else {
          let src = canvas.toDataURL("image/png");
          // console.log("aaaaaaaaaaaaaaaa", src);
          this.makePic = src;
          console.log("aaaaaaaaaaaaaaaa", this.makePic);
        }
      };
    },
    // 点击捐赠
    Donation(k) {
      this.type = k;
    },
    getExtensionInfo() {
      // 获取二维码
      this.getQrCode();
    },
    getQrCode() {
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/geterweima";
      const uid = JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid;
      axios({
        url,
        method: "POST",
        data: { uid }
      }).then(res => {
        this.qrcode = res.data.data.qrcode;
      });
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#income,
.main {
  height: calc(100% - 40px);
  box-sizing: border-box;
}
.supplier {
  height: 100%;
  position: relative;
  div:nth-child(1) {
    height: 40px;
  }
}

.main {
  width: 100%;
  position: absolute;
  top: 40px;
  left: 0;
  background: url("../../assets/images/member/qrcode_bg1.png") no-repeat;
  background-size: 100% 100%;
  height: 100%;
}
.main2 {
  width: 100%;
  position: absolute;
  top: 40px;
  left: 0;
  background: url("../../assets/images/member/qrcode_bg2.png") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  /deep/.van-tabs__wrap {
    display: none;
  }
  /deep/.LongPress {
    img {
      width: 88%;
    }
    span {
      font-size: 16px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
      line-height: 22px;
      display: block;
    }
  }
}

.qrcode {
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);

      width: 66%;
    height: 36%;
}
// 邀请
.invite {
  padding-top: 10px;
  div {
    width: 54%;
    display: inline-block;
    background-color: #ffffff94;
    border-radius: 20px;
    padding-top: 3px;
  }
  span {
    color: #fff;
    font-size: 18px;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    display: inline-block;
    height: 88%;
    background-color: #fff;
    color: #ff444c;
    width: 48%;
    border-radius: 20px;
    line-height: 32px;
  }
  .Donation_J {
    font-size: 18px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 800;
    color: #fff;
    display: inline-block;
    background-color: #0000;
    line-height: 32px;
  }
}
// 捐赠
.Donation {
  margin-bottom: 27px;
  img {
    margin-top: 27px;
    width: 112px;
    height: 25px;
  }
}

.img {
  margin-top: 40px;
  height: 417px;
  width: 299px;
  display: inline-block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  img {
    height: 100%;
    width: 100%;
  }
  .qrcode {
    height: 100%;
    width: 100%;
    img {
      height: 154px;
      width: 154px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -44%);
    }
  }
}

/deep/.mint-header {
  background: transparent !important;
  border-bottom: none !important;
  color: #333;
  font-size: 18px;
}
</style>
