<!--
 * @Author: 飞
 * @Date: 2021-08-11 15:16:42
 * @LastEditTime: 2021-08-18 16:08:40
 * @FilePath: \you-shop1\src\views\A_version_1.1\DonationInvoice\LuckyManagement.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-nav-bar title="发票抬头" left-arrow @click-left="onClickLeft" />
    <p class="surface" onselectstart="return   false;">长按操作选项</p>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
      <van-cell v-for="(item, i) in list" :key="i">
        <div @touchstart="handlerTouchstart(item)" @touchmove="handlerTouchmove" @touchend="handlerTouchend" style="padding: 0 1rem">
          <span>
            {{ item.name }}
          </span>
          <span v-if="item.default">默认</span>
          <img src="./img/edit.png" alt="" />
          <!-- 上边框 -->
          <div class="Partition"></div>
          <div class="VAT">{{ item.value }}</div>
        </div>
        <div class="Mask" v-show="item.Choose">
          <li class="setAsDefault" @click="Default(item)">设为默认</li>
          <li class="DeleteButton" @click="Delete(item)">删除抬头</li>
        </div>
      </van-cell>
    </van-list>
    <div class="addLookUp" @click="addAddress">添加新的抬头</div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      list: [
        {
          name: "谢广坤",
          value: "个人抬头",
          default: false,
          Choose: false
        },

        {
          name: "李四",
          value: "企业抬头",
          default: true,
          Choose: false
        }
      ],
      loading: false,
      finished: true,
      // 定时器
      loop: 0
    };
  },
  methods: {
    handlerTouchstart(item) {
      this.loop = setTimeout(() => {
        this.loop = 0;
        // 执行长按要执行的内容
        item.Choose = true;
      }, 500); // 定时的时间
      return false;
    },
    handlerTouchmove() {
      // 清除定时器
      clearTimeout(this.loop);
      this.loop = 0;
      // Toast("滑动了");
    },
    handlerTouchend() {
      // 清除定时器
      clearTimeout(this.loop);
      if (this.loop !== 0) {
        // 单击操作
        // Toast("单机操作");
        Toast("编辑");
      }
    },
    // 后退
    onClickLeft() {
      this.$router.go(-1);
    },
    // 点击删除
    Delete(item) {
      // console.log("删除");
      item.Choose = false;
      Toast("删除抬头");
    },
    Default(item) {
      item.Choose = false;
      Toast("设为默认");
    },

    // // 编辑
    // edit(msg) {
    //   console.log("编辑", msg);
    // },
    // ViewInvoice(msg) {
    //   console.log("点击", msg);
    //   Toast("查看");
    // },
    // 添加新的 抬头
    addAddress() {
      // Toast('添加新的抬头')
      // return
      this.$router.push(this.fun.getUrl("Added", {}));
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  user-select: none;
}
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
  background: #f9f9f9;
  .surface {
    width: 100%;
    text-align: right;
    font-size: 0.75rem;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #66666680;
    line-height: 1.13rem;
    padding-right: 0.63rem;
    margin-top: 0.8rem;
  }
  // 抬头列表
  /deep/.van-list {
    height: calc(100% - 3.6rem - 67px);
    overflow: auto;
    .van-cell {
      padding: 0.63rem 0;
      background-color: rgba(255, 255, 255, 0);

      .van-cell__value {
        background-color: #fff;
        border-radius: 0.2rem;
        padding: 0.75rem 0;

        .right,
        .left {
          display: inline-block;
        }
        .left {
          height: 100%;
          display: inline-block;
          width: 10%;
          vertical-align: bottom;
        }
        .right {
          height: 100%;
          display: inline-block;
          width: 90%;
        }

        span:nth-child(1) {
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Normal, SourceHanSansCN;
          font-weight: 400;
          color: #333333;
          line-height: 1.31rem;
        }
        img {
          width: 1rem;
          height: 1rem;
          float: right;
          pointer-events: none;
        }
        span:nth-child(2) {
          width: 2.06rem;
          height: 0.88rem;
          background: #ffdad9;
          border-radius: 0.45rem;
          font-size: 0.75rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ff444b;
          line-height: 0.88rem;
          display: inline-block;
          text-align: center;
        }

        .Partition {
          margin: 0.94rem 0;
          display: flex;
          border: 0.06rem dashed #f0f1f2;
        }

        .VAT {
          font-size: 0.75rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #c0c1c2;
          line-height: 1.13rem;
        }
      }
      // 遮罩
      .Mask {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        background: #030303a1;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding-top: 1.3rem;
        li {
          height: 3.8rem;
          width: 3.8rem;
          border-radius: 50%;
          text-align: center;
          padding: 0.9rem;
          color: #fff;
          font-size: 12px;
          line-height: 1rem;
        }
        .DeleteButton {
          background-image: linear-gradient(to right, #f2210c, #f2410d);
        }
        // .DeleteButton:before {
        //   // content: "";
        //   // display: inline-block;
        //   // position: absolute;
        //   // top: 50%;
        //   // width: 100%;
        //   // height: 100%;
        //   // left: 50%;
        //   // transform: translate(-50%, -50%);
        // }
        .setAsDefault {
          background-image: linear-gradient(to right, #ffb515, #ffc621);
        }
      }
    }
  }
  .addLookUp {
    width: 20.75rem;
    display: inline-block;
    color: #fff;
    height: 2.25rem;
    background: #e60416;
    border-radius: 1.13rem;
    line-height: 2.25rem;
    font-size: 1rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
  }
}
</style>