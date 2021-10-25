<!--
 * @Author: 飞
 * @Date: 2021-10-14 16:44:52
 * @LastEditTime: 2021-10-22 14:32:11
 * @FilePath: \you-shop1\src\views\A_version_1.1\industry\ArrangeTableList.vue
 * @Describe: addBrand
-->
<template>
  <div class="content">
    <van-sticky>
      <van-nav-bar title="授牌明细" name="arrow-left" left-arrow @click-left="onClickLeft">
        <template #right>
          <span class="span" @click="addition">添加授牌</span>
        </template>
      </van-nav-bar>
      <van-notice-bar style="text-align: left" left-icon="volume-o" mode="link" :text="text + text1" @click="Onclick" />
    </van-sticky>
    <!-- list -->
    <section>
      <div class="listContent">
        <div class="item" v-for="(item, i) in dataList" @click="ToView(item.industry_url)" :key="i">
          <div class="newHead">
            <img src="./img/Min.png" alt="" />
            <span class="tit">{{ item.update_time }}</span>
          </div>
          <!-- 下半体 -->
          <div class="TheSecondHalfOfTheBody">
            <!-- <van-cell center is-link>
              <template #title>
                <span class="custom-title">{{ item.industry_shopname }}</span>
              </template>
              <template #label>
                <span class="custom-cot01"><img src="./img/city.png" alt="" /> {{ item.province_name + item.addcode_name }}</span>
                <span class="custom-cot02">{{ item.update_time }}</span>
              </template>
            </van-cell> -->
            <div class="left">
              <div class="open1">
                <img src="./img/city.png" alt="" />
                <span>{{ item.industry_shopname }}</span>
              </div>
              <div class="open1">
                <img src="./img/address.png" alt="" />
                <span>{{ item.number_name }}</span>
              </div>
              <div class="open1">
                <img src="./img/toCode.png" alt="" />
                <span>{{ item.number_name + item.number }}</span>
              </div>
            </div>
            <div class="right">
              <span>查看授牌</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <van-dialog v-model="show" :close-on-click-overlay="Onoverlay">
      <div class="Announcement">
        <p>{{ text }}</p>
        <p>{{ text1 }}</p>
      </div></van-dialog
    >
  </div>
</template>

<script>
import { Toast } from "vant";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      dataList: [],
      text: `所有授牌终端,必须放置慈善终端收捐二维码,参与市场收捐工作。可以申请支付二维码,实现消费者进店消费送积分,积分兑换商品。`,
      text1: `如没有按照要求授牌,所出现的问题由行业代表全部承担,并承担连带所有的法律责任。`,
      show: false
    };
  },
  activated() {
    this.ToObtainAListBrand();
  },
  mounted() {},
  methods: {
    Onoverlay() {
      this.show = false;
    },
    Onclick() {
      this.show = !this.show;
    },
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
    .span {
      font-size: 0.75rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #368dfe;
      line-height: 1.06rem;
    }
  }
  //   主题内容
  .listContent {
    .item {
      width: 21.87rem;
      display: inline-block;
      margin-top: 1rem;
      background-color: #fff;
      text-align: left;
      border-radius: 0.38rem;
      .newHead {
        height: 3rem;
        border-bottom: 1px solid #e6e6e6;
        display: inline-flex;
        align-items: center;
        width: 100%;
        img {
          width: 1.38rem;
          height: 1.38rem;
          margin: 0 0.63rem;
        }
        .tit {
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #999999;
          line-height: 1.31rem;
        }
      }
      // 下半体
      .TheSecondHalfOfTheBody {
        padding-bottom: 0.69rem;
        .left {
          width: 75%;
          display: inline-block;
          text-align: left;
          margin-top: 0.2rem;
          .open1 {
            display: inline-flex;
            align-items: center;
            width: 100%;
            margin-top: 0.33rem;
            img {
              width: 1rem;
              height: 1rem;
              margin: 0 0.63rem 0 2.06rem;
            }
            span {
              font-size: 1rem;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #666666;
              line-height: 1.5rem;
            }
          }
        }
        .right {
          float: right;
          margin: 2rem 0.38rem 0 0;
          span {
            width: 4.81rem;
            height: 1.75rem;
            border-radius: 0.38rem;
            border: 0.06rem solid #378dfe;
            font-size: 0.88rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #378dfe;
            line-height: 1.75rem;
            display: inline-block;
            text-align: center;
          }
        }
      }

      // .tit {
      //   font-size: 1.13rem;
      //   font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      //   font-weight: 400;
      //   color: #368dfe;
      //   width: 100%;
      //   text-align: left;
      //   display: block;
      //   padding-left: 1rem;
      //   margin-top: 0.8rem;
      // }
      // //   下半体
      // .TheSecondHalfOfTheBody {
      //   margin-top: 1.5rem;
      //   text-align: left;
      //   .custom-title {
      //     font-size: 1.13rem;
      //     font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      //     font-weight: 400;
      //     color: #494b4c;
      //     line-height: 1.69rem;
      //   }
      //   .custom-cot01 {
      //     font-size: 1rem;
      //     font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      //     font-weight: 400;
      //     color: #676868;
      //     line-height: 1.5rem;
      //     display: block;
      //     margin: 0.4rem 0;
      //   }
      //   .custom-cot02 {
      //     font-size: 1rem;
      //     font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      //     font-weight: 400;
      //     color: #939292;
      //     display: block;
      //     line-height: 1.5rem;
      //   }
      // }
    }
  }
}
/deep/.Announcement {
  margin: 1rem;
  text-align: left;
  font-size: 15px;
  p {
    text-indent: 2em;
  }
}
</style>