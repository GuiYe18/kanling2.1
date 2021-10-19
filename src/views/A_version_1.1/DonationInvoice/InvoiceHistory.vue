<!--
 * @Author: 飞
 * @Date: 2021-08-11 15:09:34
 * @LastEditTime: 2021-08-11 16:11:08
 * @FilePath: \you-shop1\src\views\A_version_1.1\DonationInvoice\InvoiceHistory.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-nav-bar title="发票历史" left-arrow @click-left="onClickLeft" />

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, i) in list" :key="i" @click="ViewInvoice(item)">
        <span>
          {{ item.name }}
        </span>
        <span>
          {{ item.time }}
        </span>

        <!-- 上边框 -->
        <div class="van-hairline--top"></div>
        <div class="InvoiceValue">
          <span> ￥{{ item.value }} </span>
        </div>
        <span class="VAT"> 增值税电子普通发票 </span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "北京拣到互联技术有限公司",
          value: "5000",
          time: "2020.10.27"
        },
        {
          name: "北京拣到互联技术有限公司",
          value: "5000",
          time: "2020.9.27"
        },
        {
          name: "北京拣到互联技术有限公司",
          value: "5000",
          time: "2020.8.27"
        },
        {
          name: "北京拣到互联技术有限公司",
          value: "5000",
          time: "2020.7.27"
        }
      ],
      loading: false,
      finished: true
    };
  },
  methods: {
    /**
     * @Author: 飞
     * @Date: 2021-08-11 16:01:54
     * @Describe: 查看发票
     */
    ViewInvoice(msg) {
      console.log("msg", msg);
      this.$router.push(this.fun.getUrl("InvoicePreview", {}, { time: msg.time }));
    },
    // 懒加载
    // // onLoad() {
    // //   // 异步更新数据
    // //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    // //   setTimeout(() => {
    // //     for (let i = 0; i < 10; i++) {
    // //       this.list.push(this.list.length + 1);
    // //     }

    // //     // 加载状态结束
    // //     this.loading = false;

    // //     // 数据全部加载完成
    // //     if (this.list.length >= 40) {
    // //       this.finished = true;
    // //     }
    // //   }, 1000);
    // // },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.van-nav-bar {
  .van-icon {
    color: #979797;
  }
  .van-nav-bar__title {
    font-size: 0.88rem;
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: #666666;
    line-height: 1.31rem;
  }
}
.content {
  // 发票列表
  /deep/.van-list {
    .van-cell {
      padding: 0.63rem;
      background-color: rgba(255, 255, 255, 0);
      .van-cell__value {
        background-color: #fff;
        border-radius: 0.2rem;
        padding: 0.75rem;
        span:nth-child(1) {
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Normal, SourceHanSansCN;
          font-weight: 400;
          color: #333333;
          line-height: 1.31rem;
        }
        span:nth-child(2) {
          float: right;

          font-size: 0.75rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #333333;
          line-height: 1.13rem;
        }
        .van-hairline--top {
          margin: 0.81rem 0 1.9rem 0;
        }
        .InvoiceValue {
          width: 30%;
          display: inline-block;
          span {
            font-size: 1.5rem;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 500;
            color: #333333;
            line-height: 2.25rem;
          }
        }

        .VAT {
          font-size: 0.63rem;
          font-family: SourceHanSansCN-Normal, SourceHanSansCN;
          font-weight: 400;
          color: #666666;
          line-height: 0.94rem;
        }
      }
    }
  }
}
</style>