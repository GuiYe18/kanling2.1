<!--
 * @Author: 飞
 * @Date: 2021-06-21 19:25:07
 * @LastEditTime: 2021-10-09 14:53:13
 * @FilePath: \you-shop1\src\views\MerchantSettled\ViewPaymentCode.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <c-title :hide="false" tolink="IncomeAndExpenditureDetails" totext="收支明细"></c-title>

    <div class="img">
      <!-- <img :src="makePic" alt=""> -->

      <img :src="bgPic" alt="" />
      <div class="qrcode">
        <img :src="materialUrl" alt="" />
      </div>
    </div>
    <div class="save">
      <span>长按图片保存</span>
    </div>
    <div id="qrCode" ref="qrCodeDiv"></div>

    <div class="prompt">
      <p>申请后如交易失败：请先成为支付商家</p>
      <span>银联号：{{ Union }}</span>
      <span>网联号：{{ NetworkNumber }}</span>
    </div>
    <div class="example">
      <!-- 演示 -->
      <div>
        <img src="./img/Demonstration.png" alt="" />
        <p style="visibility: hidden">例子</p>
      </div>
      <!--Certification -->
      <div>
        <img src="./img/Certification.png" alt="" />
        <p>长按识别小程序</p>
      </div>
    </div>

    <div class="CustomerService">
      <span>如有问题请咨询 <br />客服电话：400-8978-288</span>
    </div>
  </div>
</template>

<script>
import cTitle from "components/title";
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";
import { Toast } from "vant";
export default {
  components: { cTitle },
  data() {
    return {
      Union: "", //银联号
      NetworkNumber: "", //网联号
      bgPic: require("./img/ViewPaymentCode.png"),
      materialUrl: "",
      base64: "",
      makePic: "",
      codeuid: ""
    };
  },
  activated() {
    // this.qrcode()
    this.abcd()

    if (JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid == null) {
      return;
    }
    // 每次进来后置顶
    window.scrollTo(0, 0);
    var that = this;

    if (this.$route.query.codeuid == undefined) {
      this.codeuid = JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid;
    }
    if (this.$route.query.codeuid != undefined) {
      this.codeuid = this.$route.query.codeuid;
    }
    console.log("this.codeuid", this.codeuid);
    axios({
      method: "post",
      url: "https://tpkl.minpinyouxuan.com/index.php/api/v1/geterweima_pay",
      data: {
        uid: this.codeuid,
        type: this.$route.query.payStype,
        adcode: JSON.parse(localStorage.getItem("myLocation")).adcode
      }
    })
      .then(response => {
        if (response.data.result == 1) {
          that.materialUrl = response.data.data.qrcode_url;
          that.Union = response.data.data.yl_mchid;
          that.NetworkNumber = response.data.data.wl_mchid;
        }
        if (response.data.result == 0) {
          this.$dialog({
            message: response.data.msg
          })
            .then(() => {
              // this.$router.go(-1);
            })
            .catch(() => {});
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    // qrcode() {
    //   let qrcode = new QRCode(this.$refs.qrCodeDiv, {
    //     width: 100,
    //     height: 100, // 高度
    //     // text: "https://www.baidu.com", // 二维码内容
    //     text: `https://kl.minpinyouxuan.com/addons/yun_shop/?menu#/pay?i=2&type=5&mid=0&shop_id=`+1+`&shop_name=`+2, // 二维码内容
    //     // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
    //     background: '#f0f',
    //     foreground: '#ff0'
    //   });
    //   setTimeout(() => {
    //   console.log('this.$refs.qrCodeDiv',this.$refs.qrCodeDiv.children[1].currentSrc);
    //     this.base64 =  this.$refs.qrCodeDiv.children[1].currentSrc
    //     this.abcd()
    //   }, 1000);
    // },
    abcd() {
      let img1 = new Image();
      img1.src = require("./img/ViewPaymentCode.png");
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
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  // 隐藏二维码
  #qrCode {
    display: none;
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
      position: relative;
      left: 0px;
      top: -100%;
      height: 100%;
      img {
        height: 154px;
        width: 154px;
        margin-top: 144px;
      }
    }
  }
  // 长按保存
  .save {
    padding-top: 461px;
    span {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 25px;
    }
  }
  // 提示
  .prompt {
    p {
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #666666;
      line-height: 16px;
      margin-top: 2.5rem;
    }
    span {
      font-size: 0.75rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #666666;
      line-height: 1.13rem;
      margin-top: 1.38rem;
      display: inline-block;
    }
    span:nth-child(2) {
      margin-right: 4px;
    }
    span:nth-child(3) {
      margin-left: 4px;
    }
  }
  // 例子
  .example {
    margin-top: 1.06rem;
    margin-top: 1.06rem;
    div {
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
    }
    div:nth-child(1) {
      width: 8.38rem;
      height: 15.75rem;
      margin-right: 1.13rem;
    }
    div:nth-child(2) {
      width: 11.63rem;
      height: 15.75rem;
    }
  }
  // 电话咨询
  .CustomerService {
    margin-top: 2.13rem;
    margin-bottom: 1.44rem;
    span {
      font-size: 12px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #666666;
      line-height: 14px;
    }
  }

  // // 二维码
  // .qrcode {
  //   width: 9.38rem;
  //   height: 9.38rem;
  //   position: absolute;
  //   top: 26%;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   img {
  //     width: 100%;
  //     height: 100%;
  //   }
  // }
}
</style>