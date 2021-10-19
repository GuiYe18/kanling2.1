<!--
 * @Author: 飞
 * @Date: 2021-10-11 15:52:50
 * @LastEditTime: 2021-10-11 18:50:35
 * @FilePath: \you-shop1\src\views\A_version_1.1\NewDonation\EyebrowEnd.vue
 * @Describe: 
-->

<template>
  <div class="content">
    <span v-if="active != 1">技术电话:400-8978-288</span>
    <br />技术支持:中民社会捐助发展中心
  </div>
</template>

<script>
export default {
  props: ["active"],
  activated() {
    console.log("this.active", this.active);
  }
};
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  padding-bottom: 0.6rem;
  font-size: 13px;
  font-family: 宋体;
  color: #969799;
}
</style>