<!--
 * @Author: 飞
 * @Date: 2021-08-06 14:17:33
 * @LastEditTime: 2021-08-06 14:20:16
 * @FilePath: \you-shop1\Blog.md
 * @Describe: 
-->

2021年8月6日14:20:14
E:\codeDome\you_shop\you-shop1\src\views\member\enterprise1\redPackets.vue
<!--门店申请是否显示 -->
<div @click="Store" v-show="StoreApplication">
    <img src="../../../assets/images/add.png" alt="" />
</div>

StoreApplication:false,
// 跳转到门店申请
Store() {
  this.$router.push(this.fun.getUrl("storeApply"));
},