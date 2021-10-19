<!--
 * @Author: 飞
 * @Date: 2021-10-14 16:44:52
 * @LastEditTime: 2021-10-18 17:49:25
 * @FilePath: \you-shop1\src\views\A_version_1.1\industry\ArrangeTableList.vue
 * @Describe: addBrand
-->
<template>
  <div class="content">
    <van-sticky>
      <van-nav-bar title="授牌明细" name="arrow-left" left-arrow @click-left="onClickLeft">
        <template #right>
          <img src="./img/add.png" alt="" class="img" @click="addition" />
        </template>
      </van-nav-bar>
    </van-sticky>

    <!-- list -->
    <section>
      <div class="listContent">
        <div class="item" v-for="(item, i) in dataList" @click="ToView(item.industry_url)" :key="i">
          <span class="tit">授牌编号：{{ item.number_name + "." + item.number }}</span>
          <!-- 下半体 -->
          <div class="TheSecondHalfOfTheBody">
            <van-cell center is-link>
              <template #title>
                <span class="custom-title">{{ item.industry_shopname }}</span>
              </template>
              <template #label>
                <span class="custom-cot01">{{ item.province_name + item.addcode_name }}</span>
                <span class="custom-cot02">{{ item.update_time }}</span>
                <img src="../../A_version_1.1/event-bus.js" alt="">
              </template>
            </van-cell>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      dataList: []
    };
  },
  activated() {
    this.ToObtainAListBrand();
  },
  mounted() {
  },
  methods: {
    // 获取牌子列表
    ToObtainAListBrand() {
      var that = this;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v3/grantbrand_list";
      axios({
        method: "POST",
        url,
        data: {
          id: this.$route.query.industry_id
        }
      }).then(async res => {
        if (res.data.result === 1) {
          that.dataList = res.data.data;
        } else {
          Toast("获取牌子编号失败");
        }
      });
    },
    //   查看
    ToView(url) {
      ImagePreview({
        images: [url]
      });
    },
    //   添加牌子
    addition() {
      this.$router.push(this.fun.getUrl("AddBrand", {}, { industry_id: this.$route.query.industry_id }));
    },
    // 返回上一层
    onClickLeft() {
      this.$router.push(this.fun.getUrl("Industrydetails", {}, {}));
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
    .img {
      width: 1rem;
    }
  }
  //   主题内容
  .listContent {
    .item {
      height: 11.25rem;
      width: 21.87rem;
      background-image: url("./img/itemBj.png");
      background-size: 100%;
      display: inline-block;
      margin-top: 1rem;
      .tit {
        font-size: 1.13rem;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #368dfe;
        width: 100%;
        text-align: left;
        display: block;
        padding-left: 1rem;
        margin-top: 0.8rem;
      }
      //   下半体
      .TheSecondHalfOfTheBody {
        margin-top: 1.5rem;
        text-align: left;
        .custom-title {
          font-size: 1.13rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #494b4c;
          line-height: 1.69rem;
        }
        .custom-cot01 {
          font-size: 1rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #676868;
          line-height: 1.5rem;
          display: block;
          margin: 0.4rem 0;
        }
        .custom-cot02 {
          font-size: 1rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #939292;
          display: block;
          line-height: 1.5rem;
        }
      }
    }
  }
}
</style>