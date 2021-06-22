<template>
  <div class="content">
    <van-nav-bar title="预约发货" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />

    <!--预约发货地址栏-->
    <div class="addressBook">
      <div class="addressTop">
        <div>
          <img src="../../assets//images/kick/寄件@2x.png" alt="" />
        </div>
        <div>
          <span>{{ postName }}</span
          >&#32;&#32;<span>{{ postIphone }}</span>
          <div>{{ postIp }}</div>
        </div>
        <div @click="addressBook">地址簿</div>
      </div>

      <div class="addressTop">
        <div>
          <img src="../../assets//images/kick/收件@2x.png" alt="" />
        </div>
        <div>
          <span>{{ getName }}</span
          >&#32;&#32;<span>{{ getIphone }}</span>

          <div>{{ getIp }}</div>
        </div>
        <div style="width: 46px"></div>
      </div>
    </div>

    <!-- 寄件方式 -->
    <div class="ShippingMethod">
      <div class="ShippingWay"><span> 寄件方式 </span><span> 上门取件 </span></div>
      <van-divider /><!-- //Divider 分割线 -->
      <div class="HomeTime">上门时间</div>
      <van-tabs v-model="active" animated>
        <van-tab :title="item" v-for="(item, i) in attime" :key="i">
          <!-- {{ item }} -->
          <van-row gutter="20">
            <van-radio-group v-model="radio">
              <van-radio name="1" :disabled="!hideA">
                <template #icon="props">
                  <span :class="props.checked ? 'Selected Outer' : 'Outer'">
                    <div :class="hideA == false ? 'hide' : 'display'">
                      <span>09:00-11:00 </span>
                      <span>（时段已过）</span>
                    </div>
                  </span>
                </template>
              </van-radio>
              <van-radio name="2" :disabled="!hideB">
                <template #icon="props">
                  <span :class="props.checked ? 'Selected Outer' : 'Outer'">
                    <div :class="hideB == false ? 'hide' : 'display'">
                      <span>11:00-13:00 </span>
                      <span>（时段已过）</span>
                    </div>
                  </span>
                </template>
              </van-radio>
              <van-radio name="3">
                <template #icon="props">
                  <span :class="props.checked ? 'Selected Outer' : 'Outer'">
                    <div :class="hideC == false ? 'hide' : 'display'">
                      <span>13:00-15:00 </span>
                      <span>（时段已过）</span>
                    </div>
                  </span>
                </template>
              </van-radio>
              <van-radio name="4">
                <template #icon="props">
                  <span :class="props.checked ? 'Selected Outer' : 'Outer'">
                    <div :class="hideD == false ? 'hide' : 'display'">
                      <span>15:00-17:00 </span>
                      <span>（时段已过）</span>
                    </div>
                  </span>
                </template>
              </van-radio>
              <van-radio name="5">
                <template #icon="props">
                  <span :class="props.checked ? 'Selected Outer' : 'Outer'">
                    <div :class="hideE == false ? 'hide' : 'display'">
                      <span>17:00-19:00 </span>
                      <span>（时段已过）</span>
                    </div>
                  </span>
                </template>
              </van-radio>
            </van-radio-group>
          </van-row>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 提交 -->
    <div>
      <button class="btn" @click="sub">提交</button>
    </div>
    <!-- 地址列表弹窗 -->
    <van-popup v-model="show" round position="bottom" :style="{ height: '60%' }" @click="pitchOn()">
      <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd('')" @edit="onEdit" />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      // 五个时间段显示
      hideA: true,
      hideB: true,
      hideC: true,
      hideD: true,
      hideE: true,
      // 五个时间段隐藏
      displayA: true,
      displayB: true,
      displayC: true,
      displayD: true,
      displayE: true,

      nowDate: "", // 当前日期
      tomorrowDate: "", // 明天
      acquiredDate: "", //后天
      acquiredDateweek: "", //后天 周几
      attime: [],
      radio: "", //选中的时间段
      DataOfPickup: ["3月5日(今天)", "3月5日(明天)", "3月5日(周日)"], //取件时间

      active: 0,
      show: false,

      postName: "",
      postIphone: "",
      postIp: "",

      getName: "王先生",
      getIphone: "13700000000",
      getIp: "北京市海淀区知春里65号卫星通信大厦A座10层10层",
      list: [],
      chosenAddressId: "2" //选中第几个
    };
  },
  watch: {
    attime: function () {
      console.log("ssssssssssssssssss", this.attime);
    },
    // 选中的时间段
    radio: function (N, O) {
      console.log("radioradioradioradioradio", N, O);
    },
    //切换收货日期
    active: function () {
      // 清空选中弄的时间段
      this.radio = "";
      // 选中日期的时候把时间段重置为都可选状态
      if (this.active == 0) {
        this.TimeRange();
      } else {
        this.hideA = true;
        this.hideB = true;
        this.hideC = true;
        this.hideD = true;
        this.hideE = true;
      }
    },
    // 地址列表  选中赋值
    chosenAddressId: function (value, o) {
      for (let index = 0; index < this.list.length; index++) {
        if (this.list[index].id == this.chosenAddressId) {
          this.postName = this.list[index].name;
          this.postIphone = this.list[index].tel;
          this.postIp = this.list[index].address;
        }
      }
    }
  },
  created() {
    this.GetShippingAddress();
  },
  mounted() {},
  methods() {
    console.log("listName", listName);
  },
  activated() {
    this.formatDate();
    this.TimeRange();
  },
  methods: {
    //   提交
    sub() {
      if (this.radio) {
        Toast("提交");
      } else {
        Toast("请选择时间段");
      }
    },
    formatDate() {
      let date = new Date();
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let week = date.getDay(); // 星期
      let weekArr = ["周二", "周三", "周四", "周五", "周六","周日", "周一" ];

      //   this.nowDate = `${year}/${month}/${day} ${hour}:${minute}:${second} ${weekArr[week]}`;
      this.nowDate = `${month}月${day}日`;
      this.tomorrowDate = `${month}月${day + 1}日`;
      this.acquiredDate = `${month}月${day + 2}日`;
      this.acquiredDateweek = `${weekArr[week]}`;
      //   console.log("日期", this.nowDate,this.tomorrowDate,this.acquiredDate,this.acquiredDateweek);
      this.attime = [];
      this.attime.push(this.nowDate + "(今天)");
      this.attime.push(this.tomorrowDate + "(明天)");
      this.attime.push(this.acquiredDate + "(" + this.acquiredDateweek + ")");
    },
    TimeRange() {
      let date = new Date();
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      console.log('hour',hour);
      if (11 <= hour && hour < 13) {
        this.hideA = false;
      } else if (13 <= hour && hour < 15) {
        this.hideA = false;
        this.hideB = false;
      } else if (15 <= hour && hour < 17) {
        this.hideA = false;
        this.hideB = false;
        this.hideC = false;
      } else if (17 <= hour && hour < 19) {
        this.hideA = false;
        this.hideB = false;
        this.hideC = false;
        this.hideD = false;
      } else if (19 <= hour) {
        this.hideA = false;
        this.hideB = false;
        this.hideC = false;
        this.hideD = false;
        this.hideE = false;
      }
    },
    //   选中默认地址
    give() {
      console.log("listlistlist", this.dataListed);
      for (let index = 0; index < this.dataListed.length; index++) {
        if (this.dataListed[index].isdefault == "1") {
          this.postName = this.dataListed[index].username;
          this.postIphone = this.dataListed[index].mobile;
          this.postIp = this.dataListed[index].province + this.dataListed[index].city + this.dataListed[index].district + this.dataListed[index].street + this.dataListed[index].address;
        }
      }
    },
    //   新增地址
    onAdd() {
      this.$router.push(this.fun.getUrl("appendAddress"));
      // this.$router.push({name:'member',params:{},query:{}});
    },
    //   打开地址簿
    addressBook() {
      this.show = true;
    },
    // 地址列表 选中
    pitchOn() {
      console.log("E", this.chosenAddressId);
      this.show = false;
    },
    // 获取地址列表
    GetShippingAddress() {
      var that = this;
      $http.get("member.member-address.index", "获取中").then(
        function (response) {
          console.log("response", response);
          if (response.result === 1) {
            // console.log('response',response.data);isdefault
            that.dataListed = response.data;
            var dataList = that.dataListed;
            var address = [];
            for (let index = 0; index < dataList.length; index++) {
              var addressItem = {};
              addressItem.address = dataList[index].province + dataList[index].city + dataList[index].district + dataList[index].street + dataList[index].address;
              addressItem.tel = dataList[index].mobile;
              addressItem.id = dataList[index].id;
              addressItem.name = dataList[index].username;
              if (dataList[index].isdefault) {
                addressItem.isDefault = dataList[index].username;
              }
              address.push(addressItem);
            }
            that.list = address;
            // that.popupSpecs = true;
            // that.addressData = response.data;
            // that.defaultAddress = response.data.filter(function(item) {
            //   return item.isdefault === 1;
            // });
          } else {
            that.$dialog.alert({ message: response.msg });
          }
          that.give();
        },
        function (response) {
          console.log(response);
        }
      );
    },
    onClickLeft() {
      // this.$router.push({ name: "MyDonation" });
      this.$router.push(this.fun.getUrl("MyDonation", {}));
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  // 提交
  .btn {
    width: 80%;
    height: 44px;
    border-radius: 22px;
    background-color: red;
    color: #fff;
    border: none;
    margin-top: 36px;
  }
  // 寄件方式
  .ShippingMethod {
    margin-top: 10px;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    text-align: left;
    // 选择日期
    /deep/.van-tab--active {
      color: red;
    }
    /deep/.van-tabs {
      .van-tabs__line {
        background-color: #ffffff00;
      }
      .van-tab__pane {
        .van-radio-group {
          padding: 10px 13px;
          .van-radio {
            display: inline-block;
            width: 30%;
            text-align: center;
            width: 96px;
            height: 58px;
            background: #f4f8f9;
            .van-radio__icon {
              width: 100%;
              height: 100%;
              .Outer {
                display: block;
                border: 1px solid #fff0;
                font-size: 11px;
                font-family: PingFang-SC-Medium, PingFang-SC;
                font-weight: 500;
                color: #999999;
                padding-top: 4px;
                height: 58px;
              }
              .Selected {
                border: 1px solid red;
                color: red;
              }
              .display {
                height: 100%;
                line-height: 48px;
                span:nth-child(2) {
                  display: none;
                }
              }
            }
          }
          .van-radio:nth-child(3n + 2) {
            margin: 0 8%;
          }
        }
      }
    }

    .HomeTime {
      padding: 0px 20px;
      color: #999999;
    }
    .ShippingWay {
      padding: 10px 20px 0px;
      span:nth-child(2) {
        float: right;
      }
      span {
        color: #999999;
      }
    }
  }
  //   地址簿列表
  .van-popup--bottom .van-radio {
    display: flex;
  }
  // 地址簿
  .addressBook {
    padding-bottom: 5px;
    margin-top: 10px;
    // height: 165px;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    .addressTop {
      padding: 12px 0;
      text-align: left;
      padding: 4px 13px;
      div:nth-child(1) {
        display: inline-flex;
        img {
          width: 20px;
          height: 20px;
        }
      }
      div:nth-child(2) {
        display: inline-block;
        text-align: left;
        width: 240px;
        margin: 0 4%;
        div {
          font-size: 14px;
          font-family: SourceHanSansCN-Normal, SourceHanSansCN;
          font-weight: 400;
          color: #666666;
          line-height: 19px;
        }
        span:nth-child(1) {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #333333;
          line-height: 21px;
        }
        span:nth-child(2) {
          font-size: 13px;
          font-family: SourceHanSansCN-Normal, SourceHanSansCN;
          font-weight: 400;
          color: #666666;
          line-height: 20px;
        }
      }
      div:nth-child(3) {
        display: inline-flex;
      }
    }
  }
  // 顶部导航
  /deep/.van-nav-bar {
    .van-icon {
      color: #666666;
    }
    .van-nav-bar__title {
      width: 52px;
      font-size: 13px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #666666;
      line-height: 20px;
    }
    .van-nav-bar__right {
      font-size: 13px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      .van-nav-bar__text {
        color: #666666;
      }
      line-height: 20px;
    }
  }
}
</style>