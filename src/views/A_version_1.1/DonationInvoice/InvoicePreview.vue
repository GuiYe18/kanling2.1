<!--
 * @Author: 飞
 * @Date: 2021-08-11 16:10:08
 * @LastEditTime: 2021-08-11 16:43:18
 * @FilePath: \you-shop1\src\views\A_version_1.1\DonationInvoice\InvoicePreview.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-nav-bar title="发票预览" left-arrow @click-left="onClickLeft" />
    <div class="PreviewFramework">
      <img class="refImg" ref="shareImages" src="./img/fp.png" alt="" />
      <img class="img" src="./img/download.png" alt="" @click="baocun"/>
    </div>

    <div></div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  activated() {
    console.log("msg", this.$route.query.time);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    baocun() {
      var that = this;
      const ele = this.$refs.shareImages;
      var dataurl;
      const opts = {
        taintTest: false,
        useCORS: true,
        allowTaint: false,
        logging: false,
        scale: 3
      };
      html2canvas(this.$refs.shareImages, opts).then(function (canvas) {
        dataurl = canvas.toDataURL("image/jpg");
        that.getObjectURL(that.dataURLtoBlob(dataurl));
      });
    },
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    getObjectURL(file) {
      //创建下载的链接
      var link = document.createElement("a");
      // 创建url
      var href = window.URL.createObjectURL(file);
      link.href = href;
      //下载后文件名
      link.download = this.$route.query.time+'.png';
      document.body.appendChild(link);
      //点击下载
      link.click();
      //下载完成移除元素
      document.body.removeChild(link);
      //释放掉blob对象
      window.URL.revokeObjectURL(href);
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  /deep/.van-nav-bar {
    .van-icon {
      color: #979797;
    }
    .van-nav-bar__title {
      font-size: 0.88rem;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: #666666;
      line-height: 1.31rem;
    }
  }
  
  .PreviewFramework {
    position: relative;
    width: 100%;
    padding: 1rem;
    .refImg {
      width: 100%;
    }
    .img {
      width: 1.6rem;
      height: 1.6rem;
      top: 1.4rem;
      position: absolute;
      right: 1.6rem;
      border-radius: 50%;
    }
  }
}
</style>