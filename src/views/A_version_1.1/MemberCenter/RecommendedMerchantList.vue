<!--
 * @Author: 飞
 * @Date: 2021-08-24 14:27:35
 * @LastEditTime: 2021-08-24 16:14:48
 * @FilePath: \you-shop1\src\views\A_version_1.1\MemberCenter\RecommendedMerchantList.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-nav-bar title="推荐的商户列表" left-arrow @click-left="onClickLeft" />
    <div class="Content_S">
      <van-cell v-for="item in datalist" :key="item">
        <span>商&ensp;户&ensp;名&ensp;称:</span><p>{{ item.BusinessName }}</p>
        <span>地&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;址:</span><p>{{ item.Address }}</p>
        <span>商户审核状态:</span><p>{{ item.MerchantreviewStatus }}</p>
        <span>商户收款状态:</span><p>{{ item.D }}</p>
        <span>时&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;间:</span><p>{{ item.times }}</p>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datalist: [
        { BusinessName: "广西鼎青春进出口贸易有限公司", Address: "南宁市高华路2号正鑫科技园高层厂房10楼10A10号房", MerchantreviewStatus: "审核通过", D: "正常收款", times: "2021/8/24 11:16" },
        { BusinessName: "南宁市色香园餐饮管理有限公司", Address: "南宁市西乡塘区友爱南路22号南棉街105-107号", MerchantreviewStatus: "审核未通过", D: "未收款", times: "2021/8/20 13:07" },
        { BusinessName: "南宁市润熹商贸有限公司", Address: "南宁市葛村路2号7-8-9号铺面", MerchantreviewStatus: "审核通过", D: "正常收款", times: "2021/8/20 10:48" },
        { BusinessName: "南宁市慈素养生馆", Address: "广西南宁市西乡塘区石埠东68号昌泰清华园梅园7号楼04、05号商铺", MerchantreviewStatus: "审核通过", D: "正常收款", times: "2021/8/19 13:01" },
        { BusinessName: "广西韩瑞风健康产业发展有限公司", Address: "南宁市西乡塘区雅里上坡2号雅里新街综合楼1栋6层22号", MerchantreviewStatus: "审核通过", D: "正常收款", times: "2021/8/17 15:29" },
        {
          BusinessName: "广西南宁湘农子商贸有限公司",
          Address: "南宁市青秀区佛子岭路18号德利东盟国际文化广场E2地下室B2005号商铺",
          MerchantreviewStatus: "审核通过",
          D: "正常收款",
          times: "2021/8/13 16:11"
        }
      ]
    };
  },
  activated() {},
  methods: {
    //   返回上一层
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};

//
</script>

<style lang="scss" scoped>
.content {
  background: #fcfcfc;
  height: 100%;
  // 导航
  /deep/.van-nav-bar {
    .van-icon {
      color: #979797;
    }
    .van-nav-bar__title {
      font-size: 1rem;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #121212;
      line-height: 1.5rem;
    }
    .van-nav-bar__right .van-nav-bar__text {
      color: #121212;
    }
  }
  .Content_S {
    height: calc(100% - 46px);
    overflow: overlay;
    span{
        width: 6rem;
        display: inline-block;
        vertical-align: top;
    }
    p{
        width: calc(100% - 6rem);
        display: inline-block;
    }
  }
}
</style>