<!--
 * @Author: 飞
 * @Date: 2021-09-24 17:31:06
 * @LastEditTime: 2021-09-24 19:14:55
 * @FilePath: \you-shop1\src\views\A_version_1.1\industry\IndustryHomePage.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-sticky>
      <van-nav-bar title="行业代表" name="arrow-left" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 头部 -->
    <div class="Helmet">
      <img src="./img/price.png" alt="" />
      <p>张三</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.push(this.fun.getUrl("member", {}));
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

  // 头部
  .Helmet {
    height: 10.31rem;
    width: 100%;
    background-image: url("./img/HelmetBj.png");
    background-size: 100%;
    position: relative;
    img {
      width: 5.88rem;
      height: 5.88rem;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 37%;
      transform: translate(-50%, -50%);
    }
    p {
      position: absolute;
      left: 50%;
      top: 75%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 1.38rem;
    }
  }
}
</style>