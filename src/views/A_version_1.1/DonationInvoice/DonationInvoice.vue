<!--
 * @Author: 飞
 * @Date: 2021-04-27 20:42:14
 * @LastEditTime: 2021-08-11 22:52:16
 * @FilePath: \you-shop1\src\views\A_version_1.1\DonationInvoice\DonationInvoice.vue
 * @Describe: 
-->
<!--
 * @Author: 飞
 * @Date: 2021-04-27 20:42:14
 * @LastEditTime: 2021-08-11 13:51:34
 * @FilePath: \you-shop1\src\views\kick\DonationInvoice.vue
 * @Describe: 
-->

<template>
  <div class="content">
    <van-nav-bar title="捐赠发票" left-arrow @click-left="onClickLeft" />
    <div class="top">
      <div>可开具发票</div>
      <div>
        <span @click="OnInvoiceHistory">发票历史</span>
        <span @click="OnLuckyManagement">抬头管理</span>
      </div>
    </div>
    <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
    <div class="OuterPackage">
      <van-cell v-for="item in list" :key="item" class="ListItem">
        <van-checkbox v-model="item.checked">
          <div class="left">
            <span>2020-05-05 15:12</span>
            <div class="van-ellipsis">测试物品标题仅限于测试使用</div>
          </div>
          <div class="right">
            <span>130.00</span>
            <div>捐赠成功</div>
          </div>
        </van-checkbox>
      </van-cell>
    </div>

    <div class="bottom">
      <div class="Selecttheouterlayer">
        <van-checkbox v-model="checked" @click="selectAll">全部全选 </van-checkbox>
      </div>
      <div class="NextStep">
        <div>下一步</div>
      </div>
    </div>
    <!-- </van-list> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      list: [
        {
          titleText: "ssss",
          checked: false
        },
        {
          titleText: "ssss",
          checked: false
        },
        {
          titleText: "ssss",
          checked: false
        }
      ],
      loading: false,
      finished: false
    };
  },
  watch: {
    checked: function (VAL, NAL) {
      // if (VAL == true) {
      //   this.list = this.list.map(item => {
      //     item.checked = true;
      //     return item;
      //   });
      // }
      // if (VAL == false) {
      //   this.list = this.list.map(item => {
      //     item.checked = false;
      //     return item;
      //   });
      // }
    },

    list: {
      deep: true, //深度监听设置为 true
      handler: function (newV, oldV) {
        var NothingNum = 0;
        newV.forEach(element => {
          console.log("newV", element.checked);
          if (element.checked == true) {
            NothingNum = NothingNum + 1;
          }
        });
        if (NothingNum >= 1) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      }
    }
  },
  methods: {
    /**
     * @Author: 飞
     * @Date: 2021-08-11 22:51:15
     * @Describe: 全选
     */
    selectAll() {
      if (this.checked == true) {
        this.list = this.list.map(item => {
          item.checked = true;
          return item;
        });
      }
      if (this.checked == false) {
        this.list = this.list.map(item => {
          item.checked = false;
          return item;
        });
      }
    },
    /**
     * @Author: 飞
     * @Date: 2021-08-11 15:05:12
     * @Describe: 发票历史
     */
    OnInvoiceHistory() {
      this.$router.push(this.fun.getUrl("InvoiceHistory", {}));
    },
    /**
     * @Author: 飞
     * @Date: 2021-08-11 15:13:52
     * @Describe: 抬头管理
     */
    OnLuckyManagement() {
      this.$router.push(this.fun.getUrl("LuckyManagement", {}));
    },
    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }

    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    // },
    onSubmit() {},
    // 会退一步
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
  height: 100%;
  .top {
    height: 2.5rem;
    width: 100%;
    div {
      height: 100%;
      display: inline-block;
      line-height: 2.5rem;
      margin-top: 0.63rem;
      background: #fff;
    }
    div:nth-child(1) {
      width: 50%;
      text-align: left;
      padding-left: 0.63rem;
      font-size: 0.75rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #121212;
    }

    div:nth-child(2) {
      width: 50%;
      text-align: right;
      span {
        display: inline-block;
        font-size: 0.75rem;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #666666;
      }
      span:nth-child(2) {
        padding-right: 1.25rem;
      }
      span:nth-child(1) {
        padding-right: 1.65rem;
      }
    }
  }
  .OuterPackage {
    height: calc(100% - 86px - 3.5rem);
    overflow: auto;
  }
  // 列表项
  /deep/.ListItem {
    padding-left: 0.6rem;
    padding-right: 1.25rem;
    .van-checkbox {
      height: 60px;
      width: 100%;
      .van-checkbox__label {
        height: 100%;
        width: 100%;
        .left {
          width: 82%;
          display: inline-block;
          height: 100%;
          span {
            font-size: 0.88rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #666666;
            line-height: 1.31rem;
            margin-bottom: 0.8rem;
            display: block;
          }
        }
        .right {
          width: 18%;
          display: inline-block;
          height: 100%;
          text-align: right;
          vertical-align: super;
          span {
            font-size: 0.88rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #666666;
            margin-bottom: 0.63rem;
            line-height: 1.31rem;
            display: block;
          }
        }
      }
    }
  }
  // 底部
  .bottom {
    background: #fff;
    height: 3.5rem;
    .Selecttheouterlayer {
      height: 100%;
      display: inline-block;
      vertical-align: bottom;
      width: 50%;
      text-align: left;
    }
    /deep/.van-checkbox {
      display: inline-block;
      height: 100%;
      .van-checkbox__icon {
        vertical-align: text-bottom;
        display: inline-block;
        margin-left: 0.63rem;
      }
      .van-checkbox__label {
        font-size: 0.88rem;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #666666;
        line-height: 3.5rem;
      }
    }
    .NextStep {
      display: inline-block;
      height: 100%;
      width: 50%;
      text-align: right;
      div {
        width: 5.81rem;
        height: 2.38rem;
        background: #e60416;
        border-radius: 0.25rem;
        line-height: 2.38rem;

        font-size: 0.94rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        margin: 0.6rem 1.25rem;

        display: inline-block;
      }
    }
  }
}
</style>