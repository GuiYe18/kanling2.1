<!--
 * @Author: 飞
 * @Date: 2021-06-09 10:40:35
 * @LastEditTime: 2021-07-14 16:18:16
 * @FilePath: \you-shop1\src\views\kick\DonationQRCode.vue
 * @Describe: 
-->
<template>
  <div class="Donation">
    <!-- <img src="./DonateQRCode.png" alt="" /> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.Donation {
  background-image: url("./DonateQRCode.png");
  background-color: #fff;
  height: calc(100% + 50px);
  /**
   * @Author: 飞
   * @Date: 2021-06-28 11:05:24
   * @Describe: 背景图片不重复
   */
  background-repeat: no-repeat;
  /**
   * @Author: 飞
   * @Date: 2021-06-28 11:05:24
   * @Describe: 背景图片拉伸铺满
   */
  background-size: 100% 100%;

  // img {
  //   width: 80%;
  //   margin-top: 122px;
  // }
}
</style>