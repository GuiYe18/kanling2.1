<template>
  <div class="content">
    <!-- 证书个数 -->
    <div class="NumberOfCertificates">
      <!-- 每个元素的两侧间隔相等 -->
      <van-row type="flex" justify="space-around">
        <van-col span="6">
          <div class="img">
            <img src="./发布成功@2x.png" alt="" /><br />
            <span>一级证书</span> <br />
            <span>5个</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="img">
            <img src="./发布成功@2x.png" alt="" /><br />
            <span>二级证书</span> <br />
            <span>5个</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="img">
            <img src="./发布成功@2x.png" alt="" /><br />
            <span>三级证书</span> <br />
            <span>5个</span>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 证书历史 -->
    <div class="CertificateHistory">
      <div>
        <span>10月</span>
        <li @click="open">
          <img src="./证书.png" alt="" />
        </li>
        <li>
          <img src="./证书.png" alt="" />
        </li>
        <li>
          <img src="./证书.png" alt="" />
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  activated() {
    // 每次进来后置顶
    window.scrollTo(0, 0);
    // this.ImagePreview;
  },
  // methods() {
  //   ImagePreview({
  //     images: ["https://img01.yzcdn.cn/vant/apple-1.jpg", "https://img01.yzcdn.cn/vant/apple-2.jpg"],
  //     closeable: true
  //   });
  // },
  methods: {
    open() {
      ImagePreview({
            images: ["https://img01.yzcdn.cn/vant/apple-1.jpg", "https://img01.yzcdn.cn/vant/apple-2.jpg"],
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  .CertificateHistory {
    text-align: left;
    padding: 13px;
    span {
      display: block;
      text-align: left;
      font-size: 12px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #121212;
      line-height: 18px;
      padding-bottom: 10px;
    }
    li {
      display: inline-block;
      margin-bottom: 10px;
      img {
        width: 160px;
        height: 113px;
      }
    }
    li:nth-child(2n) img {
      margin-right: 20px;
    }
  }
  // 证书个数
  .NumberOfCertificates {
    height: 123px;
    background: #ffffff;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 18px;
    margin: 10px;
    .van-row {
      .img {
        text-align: center;
        img {
          width: 45px;
          height: 45px;
          margin-top: 15px;
        }
        span {
          margin: 2px;
          display: inline-block;
        }
      }
    }
  }
}
</style>
