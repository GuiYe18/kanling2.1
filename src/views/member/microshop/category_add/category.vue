<!--
 * @Author: 飞
 * @Date: 2021-04-20 11:08:54
 * @LastEditTime: 2021-10-20 20:22:38
 * @FilePath: \you-shop1\src\views\member\microshop\category_add\category.vue
 * @Describe: 
-->
<template>
  <div id="category">
    <c-title :hide="false" text="商品分类"></c-title>
    <div style="height: 40px;"></div>

    <div id="category-content" ref="menucontent">
      <div id="err" v-if="err">未检测到子分类数据!</div>

      <c-carcontent
        :list="contentlist"
        :formCard="formCard"
        v-if="!err"
      ></c-carcontent>
    </div>
    <div id="rootlists" ref="menu">
      <ul id="rootList" v-if="list">
        <!--<li @click="bpfun" >推荐品牌</li>-->
        <li
          @click="allList"
          :class="{ active: active2 }"
          v-if="categoryShow == '0'"
        >
          <span>推荐分类</span>
        </li>
        <li
          v-for="(item, index) in list"
          :class="{ active: active == index }"
          @click="tabsa(index, item)"
          :key="index"
        >
          <span>{{ item.name }}</span>
        </li>
        <div style="height: 3.125rem;"></div>
      </ul>
    </div>
    <div style="height: 2.8125rem;"></div>

    <div class="bottom" v-if="false">
      <div
        v-if="$route.params.isSelect"
        style="text-align: center; color: deepskyblue;"
      >
        去选择更多商品
      </div>
      <span v-if="!$route.params.isSelect">
        <router-link :to="fun.getUrl('micro_shop_category')">
          继续去选择商品
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import category from "./category_controller";
export default category;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../assets/css/category.scss";
</style>
