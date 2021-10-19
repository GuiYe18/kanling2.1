<!--
 * @Author: 飞
 * @Date: 2021-10-15 13:50:05
 * @LastEditTime: 2021-10-18 17:00:10
 * @FilePath: \you-shop1\src\views\A_version_1.1\DonateLedPlatform\DonateLedPlatform.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-sticky>
      <van-nav-bar title="中民慈善终端网络平台" name="arrow-left" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="TheHead">
      <img src="./img/DonateLedPlatform.png" alt="" />
    </div>
    <div class="tit"><span></span>中民慈善终端网络平台支持项目</div>
    <div class="TheTheme">
      <div class="top">
        <img src="./img/0.1.png" alt="" @click="ONNewDonation" />
        <img src="./img/0.2.png" alt="" @click="ONDonateBook" />
        <img src="./img/0.3.png" alt="" @click="jump" />
      </div>
    </div>
    <div class="middle">
      <div class="theBest" @click="ONNewDonation">
        <div class="left">
          <img src="./img/A01.png" alt="" />
        </div>
        <div class="right">
          <div>北京市民政局捐赠中心</div>
          <div>北京市“首善有我”捐物捐款项目，为北京特殊困难群众和社会公益发展筹措善款善资。</div>
          <div>
            <span>立即进入</span>
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="theBest" @click="ONDonateBook">
        <div class="left">
          <img src="./img/A02.png" alt="" />
        </div>
        <div class="right">
          <div>中国光华科技基金会</div>
          <div>“书海工程”捐物项目，为解决“教育保障”这个核心，为10000所学校搭建读书室活动。</div>
          <div>
            <span>立即进入</span>
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="theBest" @click="jump">
        <div class="left">
          <img src="./img/A03.png" alt="" />
        </div>
        <div class="right">
          <div>中华少年儿童慈善救助基金会</div>
          <div>“银河捐领”捐物项目，让全国少年儿童在同一片蓝天下健康成长。</div>
          <div>
            <span>立即进入</span>
          </div>
        </div>
      </div>
    </div>
    荣誉证书
    <!-- brandgoods/5?i=2 捐领平台 -->
  </div>
</template>

<script>
export default {
  methods: {
    ONNewDonation() {
      this.$router.push(this.fun.getUrl("NewDonation", {}));
    },
    ONDonateBook() {
      this.$router.push(this.fun.getUrl("DonateBook", {}));
    },
    jump() {
      window.location.href = "https://kl.minpinyouxuan.com/addons/yun_shop/?menu#/brandgoods/5?i=2";
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  // 导航
  /deep/.van-nav-bar {
    .van-icon {
      color: #979797;
    }
    .van-nav-bar__title {
      font-size: 0.88rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 1.25rem;
    }
    .van-nav-bar__right .van-nav-bar__text {
      color: #121212;
    }
  }

  //   头部
  .TheHead {
    display: inline-block;
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
  .tit {
    width: 100%;
    margin-top: 0.63rem;
    padding: 1.5rem 0 1rem 1.25rem;
    text-align: left;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2a2c2d;
    line-height: 22px;
    background-color: #fff;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 0.2rem;
      height: 1rem;
      background-color: #ef2600;
      vertical-align: bottom;
      margin-right: 0.38rem;
    }
  }

  .TheTheme {
    background-color: #fff;
    padding: 0 0.69rem;
    padding-bottom: 0.63rem;
    margin-bottom: 0.63rem;
    .top {
      display: flex;
      justify-content: space-between;
      img {
        width: 6.94rem;
        vertical-align: middle;
      }
    }
  }
  .middle {
    padding: 0.69rem;
    background-color: #fff;
    margin-bottom: 0.1rem;

    // a {
    //   display: block;
    // }
    // img {
    //   width: 100%;
    //   margin-top: 0.94rem;
    //   vertical-align: middle;
    // }
    // .imgs {
    //   margin-bottom: 2rem;
    // }
    .theBest {
      background-color: #fff;
      .left {
        width: 8.25rem;
        height: 6.63rem;
        display: inline-block;
        vertical-align: bottom;
        img {
          width: 100%;
        }
      }
      .right {
        width: calc(100% - 8.25rem);
        vertical-align: top;
        height: 6.63rem;
        display: inline-flex;
        flex-wrap: wrap;

        div:nth-child(1) {
          width: 100%;
          font-size: 1rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 1rem;
          text-align: left;
          padding-left: 0.69rem;
          margin-bottom: 0.31rem;
        }
        div:nth-child(2) {
          padding-left: 0.69rem;
          width: 100%;
          font-size: 0.75rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 1.06rem;
          text-align: left;
        }
        div:nth-child(3) {
          width: 100%;
          text-align: right;
          line-height: 1.88rem;
          span {
            width: 4.81rem;
            height: 1.88rem;
            background: #eb2700;
            border-radius: 0.19rem;
            font-size: 0.88rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 1.88rem;
            display: inline-block;
            text-align: center;
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
}
</style>