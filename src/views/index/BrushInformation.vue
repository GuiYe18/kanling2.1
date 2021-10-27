<!--
 * @Author: 飞
 * @Date: 2021-07-23 11:52:36
 * @LastEditTime: 2021-10-25 18:53:11
 * @FilePath: \you-shop1\src\views\index\BrushInformation.vue
 * @Describe: 
-->
<template>
  <div class="information">
    <!-- 项 -->

    <!-- <van-index-anchor index="1">
    </van-index-anchor>
    <van-index-anchor index="2"> </van-index-anchor>
    <van-index-anchor index="3"> </van-index-anchor> -->

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-index-bar :index-list="indexList" @change="change">
        <van-cell v-for="(item, i) in listContent" :key="item">
          <van-index-anchor class="sss" style="visibility: hidden; height: 2px" :index="i" />
          <!-- <van-index-anchor class="sss" :index="i" /> -->
          <div class="PerInformation">
            <!-- 左上 -->
            <div class="item">
              <p class="title">北京拣到互联技术有限公司</p>
              <ul class="noSetLabelInfo">
                <li v-for="(labelItem, labelIndex) in item.catename" :key="labelIndex">{{ labelItem }}</li>

                <!-- <van-tag plain color="#0579fc" v-for="(labelItem, labelIndex) in item.sqnadress" :key="labelIndex">{{ labelItem }}</van-tag> -->
              </ul>
            </div>
            <!-- 右上 -->
            <div class="RedEnvelope">
              <van-circle :class="item.surplusnum > 0 ? '' : 'hide'" v-if="item.surplusnum > 0" v-model="item.surplus" :rate="100" :speed="100" :color="gradientColor">
                <img src="./img/RedEnvelope.png" alt="" />
              </van-circle>
            </div>
            <!-- <div class="van-multi-ellipsis--l2 IntroductionInformation">
              北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司
            </div> -->

            <div class="van-multi-ellipsis--l2 IntroductionInformation" v-if="item.Introduction">
              北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司
            </div>
            <div class="IntroductionInformation" v-if="!item.Introduction">
              北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司北京拣到互联技术有限公司
            </div>
            <img @click="Expand(item)" src="./img/Expand.gif" alt="" :class="item.Introduction == true ? 'img' : 'img_S'" />
            <!-- 地址 -->
            <div class="position">
              <!-- 最多显示两行 -->
              <div class="van-multi-ellipsis--l2 address">{{ item.sqnadress }}<van-icon name="arrow" /></div>

              <div class="van-multi-ellipsis--l2 icon">
                <div><img src="./img/Position.png" alt="" /><span>导航</span></div>
                <div><img src="./img/phone.png" alt="" /><span>致电</span></div>
              </div>
            </div>
          </div>
        </van-cell>
      </van-index-bar>
    </van-list>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      indexList: [],
      currentRate: "0",
      rate: 50,
      gradientColor: {
        "0%": "#f00",
        "100%": "#f00"
      },
      list: [],
      listContent: [],
      loading: false,
      finished: false,
      page: 0,
      ppp: "444",
      IntroductionInformation_show: "ppp",
      itemindex: 1
    };
  },
  methods: {
    setItemText(row) {
      return () => {
        // return "计划： " + row.id + "，完成： " + row.id;
        // return `<img src="./img/RedEnvelope.png" alt="" />`
      };
    },
    Expand(msg) {
      console.log("msg");
      msg.Introduction = !msg.Introduction;
    },
    // 滑到第几个了
    change(index) {
      console.log("ssssssssssssss", index + 1);
      this.itemindex = index + 1;
    },
    //

    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      Toast('刷信息')
      this.page++;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/orderlists";
      axios({
        method: "post",
        url: url,
        data: {
          // uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
          uid: localStorage.getItem("uid"),
          page: this.page
        }
      }).then(res => {
        console.log("档期那", res);
        console.log("finished", this.finished);
        if (res.data.result === 1) {
          if (res.data.data.length !== 0) {
            var varnum = this.indexList.length;
            res.data.data.forEach((item, index, key) => {
              // 介绍展开

              if (item.surplus >= 0) {
                item.surplus = ((item.surplusnum / item.redmoneynum) * 100).toFixed(0).toString();
              }
              console.log("item", item);
              item.Introduction = true;
              this.listContent.push(item);
              this.indexList.push(varnum + index + 1);
            });
            //为空时 关闭加载
            this.loading = false;
            this.finished = false;
          } else {
            this.finished = true;
          }
        }
      });

      // 加载状态结束
      this.loading = true;

      // // 数据全部加载完成
      // if (this.list.length >= 40) {
      //   this.finished = true;
      // }
      // }, 2000);
    },
    getList() {}
  }
};
</script>

<style lang="scss" scoped>
// 信息主题
.information {
  padding-bottom: 50px;
  margin: 1rem;
  // list
  /deep/.van-list {
    // 隐藏索引
    .van-index-bar .van-index-bar__sidebar {
      display: none;
    }
    .van-cell {
      background-color: #fff0;
      padding: 0.94rem 0 0;
    }
  }
  // 每个信息
  .PerInformation {
    background: #fff;
    box-shadow: 0px 1px 4px 0px #e4e4e4;
    border-radius: 6px;
    padding: 1.06rem 1rem 1rem;
    text-align: center;
    // 左上
    .item {
      width: 80%;
      text-align: left;
      display: inline-block;
      p {
        font-size: 1.13rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 1.56rem;
      }
      .noSetLabelInfo {
        display: inline-flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        padding: 0.2rem 0;
        padding-left: 0;
        span {
          margin-right: 0.625rem;
          margin-bottom: 0.3125rem;
          line-height: 18px;
          border-radius: 0.1875rem;
        }
        li {
          height: 18px;
          font-size: 10px;
          font-family: PingFang-SC-Regular, PingFang-SC;
          font-weight: 400;
          line-height: 10px;
          border-radius: 0px 3px 0px 3px;
          box-sizing: content-box;
          padding: 0 0.3125rem;
          margin-right: 0.625rem;
          margin-bottom: 0.3125rem;
          display: flex;
          /*实现垂直居中*/
          align-items: center;
          /*实现水平居中*/
          justify-content: center;

          text-align: justify;
        }

        li:nth-child(3n + 1) {
          background-color: #e0eefe;
          color: #0579fc;
        }
        li:nth-child(3n + 2) {
          background-color: #e9f9e6;
          color: #50c81b;
        }
        li:nth-child(3n + 3) {
          background-color: #ffe9da;
          color: #fa6400;
        }
      }
    }
    // 红包
    .RedEnvelope {
      width: 20%;
      display: inline-block;
      text-align: right;
      // /deep/.el-progress {
      //   height: 2.13rem;
      //   width: 2.13rem;
      //   /deep/.el-progress-circle {
      //     height: 2.13rem;
      //     width: 2.13rem;
      //   }
      // }
      .hide {
        visibility: hidden;
      }
      // 环形进度条
      .van-circle {
        height: 2.13rem;
        width: 2.13rem;
        img {
          height: 2.13rem;
          width: 2.13rem;
        }
      }
    }
    // 介绍 内容
    .IntroductionInformation {
      text-indent: 2em;
      text-align: justify;
      margin-bottom: 0.625rem;
      font-size: 0.88rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 1.25rem;
    }
    // 展开
    .img,
    .img_S {
      height: 1.5rem;
      width: 1.5rem;
    }
    //展开
    .img {
      animation: img_S 0.5s forwards;
    }
    .img_S {
      animation: loading 0.5s forwards;
    }
    @-webkit-keyframes img_S {
      0% {
        transform: rotate3d(0, 0, 1, 180deg);
      }

      100% {
        transform: rotate3d(0, 0, 1, 0deg);
      }
    }

    @keyframes img_S {
      0% {
        transform: rotate3d(0, 0, 1, 180deg);
      }

      100% {
        transform: rotate3d(0, 0, 1, 0deg);
      }
    }
    @-webkit-keyframes loading {
      0% {
        transform: rotate3d(0, 0, 1, 0deg);
      }

      100% {
        transform: rotate3d(0, 0, 1, 180deg);
      }
    }

    @keyframes loading {
      0% {
        transform: rotate3d(0, 0, 1, 0deg);
      }

      100% {
        transform: rotate3d(0, 0, 1, 180deg);
      }
    }
    // 地址
    .position {
      text-align: left;
      img {
        width: 1.38rem;
        height: 1.38rem;
        vertical-align: top;
      }
      // 图标
      .icon {
        display: inline-block;
        width: 30%;
        div {
          display: inline-block;
          width: 2.75rem;
          text-align: center;
          span {
            font-size: 0.63rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #6c6c73;
            line-height: 0.88rem;
          }
          img {
            display: block;
          }
        }
      }
      .address {
        display: inline-block;
        width: 70%;

        font-size: 0.88rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #6c6c73;
        line-height: 1.38rem;

        i {
          vertical-align: middle;
        }
        // 电话拨打
        a {
          font-size: 0.88rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 800;
          color: #0579fc;
          line-height: 1.38rem;
          margin-left: 0.6rem;
          vertical-align: top;
        }
      }
    }
  }
}
</style>