<!--
 * @Author: 飞
 * @Date: 2021-04-20 11:09:01
 * @LastEditTime: 2021-08-02 20:40:25
 * @FilePath: \you-shop1\src\views\member\strongMan\strongManManage.vue
 * @Describe: 
-->
<template>
  <div id="income">
    <div class="supplier">
      <c-title :hide="false" text="数据分析"></c-title>

      <div class="tit">
        <li><span style="border-bottom: 2px solid #0579fc; padding-bottom: 8px">实时</span></li>
        <li @click="toBaseInfo">基本信息</li>
        <li @click="toProductInformation">产品信息</li>
        <!-- <li @click="toDynamicList">编辑动态</li> -->
        <li @click="UploadVideo">上传视频</li>
        <li @click="toRedPackets">红包推广</li>
      </div>
      <div class="ExistingContext">
        <div class="realTime">
          <div class="realTimeLeft"><span>今日实时</span>&#32;&#32;&#32;&#32;</div>
          <div class="realTimeRight">
            <span>截止</span>
            <span>{{ statisticalTime }}</span>
            <span @click="refurbish">刷新</span>
          </div>
        </div>
        <van-radio-group v-model="figureSelection">
          <van-radio name="1">
            <template #icon="props">
              <div :class="props.checked ? 'figureSelected span' : 'span'">
                <span>本日访客</span>&#32;&#32;&#32;<img src="../../../assets/images/dataAnalysis/sigh.png" alt="" /><br /><span>{{ visit_count }}</span>
              </div>
            </template>
          </van-radio>
          <van-radio name="2">
            <template #icon="props">
              <div :class="props.checked ? 'figureSelected span' : 'span'">
                <span>本日新增</span>&#32;&#32;&#32;<img src="../../../assets/images/dataAnalysis/sigh.png" alt="" /><br /><span>{{ follow_count }}</span>
              </div>
            </template>
          </van-radio>
          <van-radio name="3">
            <template #icon="props">
              <div :class="props.checked ? 'figureSelected span' : ' span'">
                <span>累计粉丝</span>&#32;&#32;&#32;<img src="../../../assets/images/dataAnalysis/sigh.png" alt="" /><br /><span>{{ fans_count }}</span>
              </div>
            </template>
          </van-radio>
          <van-radio name="4">
            <template #icon="props">
              <div :class="props.checked ? 'figureSelected span' : 'span'">
                <span>粉丝互动</span>&#32;&#32;&#32;<img src="../../../assets/images/dataAnalysis/sigh.png" alt="" /><br /><span>{{ interaction_count }}</span>
              </div>
            </template>
          </van-radio>
        </van-radio-group>
        <div>
          <div style="height: 300px" id="AAAAAA"></div>
        </div>
        <div class="PromoteNow">
          <div class="PromoteNowLeft">
            <span>客户不够多？来这里看看</span>
          </div>
          <div class="PromoteNowright">
            <span @click="toRedPackets">立即推广</span>
          </div>
        </div>
      </div>
      <div class="FanAnalysis">
        <ul>
          <li class="FanAnalysis_top">
            <div>
              <span>粉丝分析</span>
            </div>
            <div>
              <span>统计时间：2021.02.02</span>
            </div>
          </li>
          <li class="FanAnalysis_middle">
            <div>
              <span>昨日支付人数</span>
              <span>{{ y_pay }}</span>
              <span>昨日访客量{{ y_visit }}</span>
              <span>昨日浏览量{{ y_browse }}</span>
            </div>
            <div>
              <span>关注粉丝占0%</span><br />
              <span>0人</span><br />
              <span>关注粉丝占0%</span><br />
              <span>0人</span><br />
            </div>
          </li>
        </ul>
        <div class="PromoteNow">
          <div class="PromoteNowLeft">
            <span>推广员-分享赚钱</span>
          </div>
          <div class="PromoteNowright">
            <span>立即分享</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cTitle from "components/title";
import * as echarts from "echarts";
import { Toast } from "vant";

export default {
  components: { cTitle },
  data() {
    return {
      isRouterAlive: true,

      uid: "",
      date: ["0", "2", "4", "6", "8", "10", "12"],
      figureSelection: "1",

      statisticalTime: "", //当前时间
      data_visit: [], //本日访客
      datas_follow: [], //本日新增
      datas_fans: [], //累计粉丝
      datas_nteraction: [], //粉丝互动

      y_pay: "", //昨天支付人数
      y_visit: "", //昨天访客
      y_browse: "", //昨天浏览

      visit_count: "", //本日访客
      follow_count: "", //本日新增
      fans_count: "", //累计粉丝
      interaction_count: "" //粉丝互动
    };
  },
  activated() {
    var that = this;
    const url = "https://tpkl.minpinyouxuan.com/api/v1/pay_money_status";
    axios({
      method: "POST",
      url,
      data: { uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid }
    }).then(async res => {
      console.log(res.data.data);

      if (res.data.result === 1) {
        that.show = true;
      }
      if (res.data.result === 0) {
        that.$router.push(that.fun.getUrl("member"));
        that.$router.push(that.fun.getUrl("redPackets"));
      }
    });

    this.uid = JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid;

    // if (window.localStorage.getItem("typea") == 3) {
    // this.attestationValue();
    // }

    // 每次进来后置顶
    window.scrollTo(0, 0);
    // this.reload();
    setTimeout(() => {
      this.getPerformance();
    }, 200);
    console.log("sssssssssssssssssss");
    this.timeFormate(new Date());
  },
  watch: {
    // 实时数据切换
    figureSelection: function (N, O) {
      this.mapping(N);
    }
  },
  mounted() {},

  methods() {
    console.log("kai");
  },

  methods: {
    // 上传视频
    UploadVideo() {
      Toast("功能正在建设中...");
    },
    attestationValue() {
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/nrstatus";
      axios({
        url,
        method: "POST"
      }).then(res => {
        // 0显示企业申请.1显示企业管理
        res.data.data.attestation;
        this.ShowHidden(res.data.data.attestation);
      });
    },
    ShowHidden(attestation) {
      const data = {
        sid: Number(window.localStorage.getItem("sid")),
        attestation: attestation
      };
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/api/v1/examine",
        data
      }).then(res => {
        if (res.data.data.examine === 0) {
          if (window.localStorage.getItem("typea") == 3) {
            this.$router.push(this.fun.getUrl("strongManInfoNew", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id }));
          }
          if (window.localStorage.getItem("typea") == 2) {
            this.$router.push(this.fun.getUrl("shopsInfo", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id }));
          }
          if (window.localStorage.getItem("typea") == 1) {
            this.$router.push(this.fun.getUrl("enterpriseInfo", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id }));
          }
        }
      });
    },
    // reload() {
    //   this.isRouterAlive = false;
    //   console.log('chongxin');
    //   this.$nextTick(() => {
    //     this.isRouterAlive = true;
    //   });
    // },
    // 刷新
    refurbish() {
      // this.mapping(this.figureSelection)
      this.getPerformance(this.figureSelection);
      this.timeFormate(new Date());
    },
    // 绘图
    mapping(N) {
      var mappingdata = [];
      var createsTime = [];
      var count = [];
      var count1 = [];
      var option;
      var chartDom = document.getElementById("AAAAAA");
      var myChart = echarts.init(chartDom);

      if (N == "1") {
        mappingdata = this.data_visit;
      } else if (N == "2") {
        mappingdata = this.datas_follow;
      } else if (N == "3") {
        mappingdata = this.datas_fans;
      } else if (N == "4") {
        mappingdata = this.datas_nteraction;
      }
      for (let index = 0; index < mappingdata.length; index++) {
        createsTime.push(mappingdata[index].createsTime);
        count1.push(mappingdata[index].count);
        count.push(mappingdata[index].count1);
      }
      option = {
        title: {
          subtext: "单位: 小时"
        },

        legend: {
          data: ["今天", "昨天"]
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "今天",
            type: "line",
            stack: "总量",
            data: []
          },
          {
            name: "昨天",
            type: "line",
            stack: "总量",
            data: []
          }
        ]
      };
      option.xAxis.data = createsTime;
      option.series[0].data = count;
      option.series[1].data = count1;

      myChart.setOption(option);
    },
    //获取当前时间
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
      let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
      let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
      let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
      let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
      this.statisticalTime = year + "." + month + "." + date + " " + hh + ":" + mm + ":" + ss;
    },
    // 获取图标数据
    getPerformance(idNum) {
      const data = {
        id: Number(window.localStorage.getItem("sid")),
        uid: this.uid
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/statistics";
      return axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        if (res.data.result === 1) {
          this.data_visit = res.data.data.datas_visit.data_visit; //本日访客
          this.datas_follow = res.data.data.datas_follow.data_follow; //本日新增
          this.datas_fans = res.data.data.datas_fans.data_fans; //累计粉丝
          this.datas_nteraction = res.data.data.datas_nteraction.data_nteraction; //粉丝互动

          this.visit_count = res.data.data.datas_visit.visit_count; //本日访客量
          this.follow_count = res.data.data.datas_follow.follow_count; //本日新增量
          this.fans_count = res.data.data.datas_fans.fans_count; //累计粉丝量
          this.interaction_count = res.data.data.datas_nteraction.interaction_count; //粉丝互动量

          this.y_pay = res.data.data.y_pay; //昨天支付人数
          this.y_visit = res.data.data.y_visit; //昨天访客
          this.y_browse = res.data.data.y_browse; //昨天浏览
          // 调用绘图
          if (idNum == undefined) {
            this.mapping("1");
          } else {
            this.mapping(idNum);
          }
        }
      });
    },

    // 跳转到门店中心页面
    toProductInformation() {
      // console.log(this.uid);
      const data = {
        uid: this.uid
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/storestatus";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        console.log(res);
        if (res.data.result === 0) {
          //门店不存在
          this.$router.push(this.fun.getUrl("storeApply"));
        } else {
          //存在门店
          this.$router.push(this.fun.getUrl("storeManage"));
        }
      });
    },

    // 跳转到基本信息页面
    toBaseInfo() {
      console.log('window.localStorage.getItem("typea")', window.localStorage.getItem("typea"));
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/nrstatus";
      return axios({
        url,
        method: "POST"
      }).then(res => {
        // 0显示企业申请.1显示企业管理
        if (window.localStorage.getItem("typea") == 3) {
          if (res.data.data.attestation == 1) {
            this.$router.push(this.fun.getUrl("strongManInfo", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id }));
            return;
          }
          if (res.data.data.attestation == 0) {
            this.$router.push(this.fun.getUrl("strongManInfoNew", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id }));
            return;
          }
        }
        if (window.localStorage.getItem("typea") == 1) {
          this.$router.push(this.fun.getUrl("enterpriseInfo", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id }));
        }
        if (window.localStorage.getItem("typea") == 2) {
          this.$router.push(this.fun.getUrl("shopsInfo", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id }));
        }
      });
    },

    // 跳转到红包
    toRedPackets() {
      this.$router.push(this.fun.getUrl("promotionRecord"));
      // this.$router.push(this.fun.getUrl('redPackets'))
    },
    // 跳转到动态列表
    toDynamicList() {
      this.$router.push(this.fun.getUrl("dynamicList"));
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
// 粉丝分析
.FanAnalysis {
  width: 94%;
  height: 248px;
  background: #ffffff;
  border-radius: 8px;
  display: inline-block;
  margin-top: 12px;
  .FanAnalysis_top {
    text-align: left;
    padding: 13px 13px;
    div {
      display: inline-block;
    }
    div:nth-child(1) {
      width: 61%;
      span {
        font-size: 16px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #222222;
        line-height: 22px;
      }
    }
    div:nth-child(2) {
      font-size: 11px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #9a9a9a;
    }
  }
  .FanAnalysis_middle {
    text-align: left;
    padding: 13px 13px;
    div {
      display: inline-block;
    }
    div:nth-child(1) {
      width: 61%;
      float: left;
      span {
        display: block;
        padding: 2px 0;
      }
      span:nth-child(2) {
        font-size: 16px;
      }
      span:nth-child(3),
      span:nth-child(4) {
        font-size: 11px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #9a9a9a;
      }
    }
    div:nth-child(2) {
      width: 120px;
      height: 120px;
      background: #ffffff;
      border-radius: 8px;
      background-image: url("../../../assets/images/dataAnalysis/dataAnalysis.png");
      background-size: 120px;
      background-repeat: no-repeat;
      padding-left: 22px;
      padding-top: 22px;
      span {
        font-size: 9px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #222222;
      }
    }
  }
}
// 立即推广
.PromoteNow {
  width: 322px;
  background: linear-gradient(90deg, #fffbf7 0%, #faeddb 100%);
  border-radius: 2px;
  display: inline-block;
  text-align: left;
  padding: 9px 13px;
  .PromoteNowLeft,
  .PromoteNowright {
    display: inline-block;
  }
  .PromoteNowLeft {
    width: 75%;
    span {
      font-size: 11px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #333333;
    }
  }
  .PromoteNowright {
    span {
      width: 69px;
      height: 24px;
      background: linear-gradient(90deg, #e0c5a9 0%, #c7a686 100%);
      border-radius: 12px;
      display: inline-block;
      font-size: 11px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      line-height: 24px;
    }
  }
}
// 现状图
.ExistingContext {
  width: 94%;

  background: #ffffff;
  border-radius: 8px;
  display: inline-block;
  margin-top: 12px;

  .realTime {
    padding: 19px 13px;
    .realTimeLeft,
    .realTimeRight {
      display: inline-block;
    }
    .realTimeLeft {
      width: 43%;
      text-align: left;
      span {
        vertical-align: text-bottom;
        font-size: 20px;
        color: #222222;
        font-weight: 600;
      }
      img {
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }
    }
    .realTimeRight {
      span {
        font-size: 11px;
        font-family: PingFang-SC-Medium, PingFang-SC;

        font-weight: 500;
        color: #9a9a9a;
      }
      span:last-child {
        font-size: 11px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #4384d8;
        margin-left: 16px;
      }
    }
  }
  .van-radio-group {
    height: 66px;

    .van-radio {
      height: 100%;
      display: inline-block;
      width: 25%;

      .span {
        text-align: left;
        padding: 9px;
        background: #f4f5fa;
        border-bottom: 1px solid #ffeeeef0;
        border-top: 1px solid #ffeeeef0;
        border-right: 1px solid #ffeeeef0;
        span:nth-child(1) {
          vertical-align: middle;
          font-size: 10px;
        }
        span:last-child {
          font-size: 20px;
          color: #222222;
        }
        img {
          width: 14px;
          height: 14px;
          vertical-align: middle;
        }
      }
      .figureSelected {
        background: #fff !important;
        border-bottom: 2px solid #0579fc;
      }
    }
    .van-radio:last-child .span {
      border-right: 1px solid transparent;
    }
  }

  // li {
  //   padding: 9px;
  //   text-align: left;
  //   width: 25%;
  //   display: inline-block;
  //   border: 1px solid #dddddd;
  //   img {
  //     width: 14px;
  //     height: 14px;
  //     vertical-align: text-bottom;
  //   }
  //   span:nth-child(1) {
  //     vertical-align: middle;
  //     font-size: 10px;
  //   }
  // }
}
// 实时数据区
// .realTime {
//   width: 348px;
//   height: 433px;
//   background: #ffffff;
//   border-radius: 8px;
//   display: inline-block;
//   margin-top: 12px;
// }
// 表头
.tit {
  background: #fff;
  li {
    width: 20%;
    display: inline-block;
    color: #0579fc;
    padding: 9px 0;
    font-weight: bold;
    // font-size: 17px;
    font-size: 1.06rem;
  }
}
#income,
.supplier,
.main,
.welcome {
  height: 100%;
  box-sizing: border-box;
}
.supplier {
  padding-top: 40px;
}

.btn-list {
  padding: 4.75rem 0;
  .btn-list-item {
    display: flex;
    justify-content: center;
    button {
      margin-bottom: 30px;
      width: 11.875rem;
      height: 2.875rem;
      outline: none;
      border: none;
      border: 1px solid #979797;
      border-radius: 6px;
      background: transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        flex: 0 0 3.5rem;
        height: 1.75rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #d1d1d1;
      }
      span {
        flex: 1;
        height: 1.75rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      // &:nth-of-type(1) {
      //   i {
      //     background: url('../../../assets/images/member/member_a(70).png') no-repeat center;
      //     background-size: 1.25rem;
      //   }
      // }
      // &:nth-of-type(2) {
      //   i {
      //     background: url('../../../assets/images/member/') no-repeat center;
      //     background-size: 1.25rem;
      //   }
      // }
      // &:nth-of-type(3) {
      //   i {
      //     background: url('../../../assets/images/member/member_a(70).png') no-repeat center;
      //     background-size: 1.25rem;
      //   }
      // }
      // &:nth-of-type(4) {
      //   i {
      //     background: url('../../../assets/images/member/member_a(70).png') no-repeat center;
      //     background-size: 1.25rem;
      //   }
      // }
    }
  }
}

// .btn-list {
//   padding: 4.75rem 0;
//   .btn-list-item {
//       display: flex;
//       justify-content: center;
//     button {
//       width: 11.875rem;
//       height: 2.875rem;
//       outline: none;
//       border: none;
//       border: 1px solid #979797;
//       border-radius: 6px;
//       background: transparent;
//       padding: 0 2.625rem 0 1.125rem;
//       box-sizing: border-box;
//       display: flex;
//       line-height: 2.875rem;
//       margin-bottom: 1.875rem;
//       i {
//         flex: 0 0 3.5rem;
//         border-right: 0.02875rem solid #D1D1D1;
//       }
//       span {
//         flex: 1;
//       }
//     }
//   }
// }
</style>
