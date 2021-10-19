<!--
 * @Author: 飞
 * @Date: 2021-08-23 17:25:56
 * @LastEditTime: 2021-08-25 16:32:48
 * @FilePath: \you-shop1\src\views\A_version_1.1\DonateBook\ReservationInformation.vue
 * @Describe: 
-->

<template>
  <div class="content">
    <van-nav-bar title="预约信息" left-arrow @click-left="onClickLeft" />
    <div class="Intermediate">
      <!-- 顶部 -->
      <div class="RequiredBook">
        <div class="BookTop"><span>书籍类型</span></div>
        <!-- 选框 -->
        <div class="Box">
          <li v-for="(item, i) in MultipleChoice" :key="i">
            <el-checkbox v-model="item.checked" border>
              <span @click="addDomain(item)">{{ item.name }}</span>
            </el-checkbox>
          </li>
        </div>
      </div>
      <!-- 文本输入 -->
      <div class="TextInput">
        <div class="BookTop">
          <span>书籍信息</span> <span v-show="Book_S">共计{{ Book_S }}本</span>
        </div>

        <li v-for="(item, i) in domains" :key="i">
          <div>
            <span class="booksName">{{ item.name }}</span>
            <van-icon name="add-o" class="addicon" size="20px" @click="TypeSingleTtem(item)" />
          </div>

          <div v-for="(items, k) in item.data.BookName" :key="k">
            <!-- <van-field v-if="item.data.BookName.length == 1" v-model="items.name"  placeholder="请输入书籍名称"  />
            <van-field v-else v-model="items.name" right-icon="minus" placeholder="请输入书籍名称" @click-right-icon="OnClickRightIcon(items, i, k,item)" /> -->
            <van-field v-model="items.name" clearable right-icon="minus" placeholder="请输入书籍名称" @click-right-icon="OnClickRightIcon(item.data, items, i, k, item)" />
          </div>
        </li>
      </div>
      <!-- 取件信息 -->
      <div class="PickupInformation" @click="SelectAddress">
        <div class="BookTop">
          <span>取件信息</span> <span><van-icon name="arrow" /></span>
        </div>
        <div class="PickupAddress">
          <!-- 选择地址前 -->
          <div class="BeforeTheAddress" v-if="chosenAddressId == ''">请选择取件地址</div>
          <!-- 选择地址后 -->
          <div class="AfterTheAddress" v-else>
            <span class="siteName">{{ siteName }} {{ siteIphone }} </span>
            <span class="site">{{ site }}</span>
          </div>
        </div>
      </div>

      <!-- 取件时间 -->
      <div class="PickupTime">
        <div class="BookTop">
          <span>取件时间</span>
        </div>
        <div class="选择时间">
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
                  <van-radio name="3" :disabled="!hideC">
                    <template #icon="props">
                      <span :class="props.checked ? 'Selected Outer' : 'Outer'">
                        <div :class="hideC == false ? 'hide' : 'display'">
                          <span>13:00-15:00 </span>
                          <span>（时段已过）</span>
                        </div>
                      </span>
                    </template>
                  </van-radio>
                  <van-radio name="4" :disabled="!hideD">
                    <template #icon="props">
                      <span :class="props.checked ? 'Selected Outer' : 'Outer'">
                        <div :class="hideD == false ? 'hide' : 'display'">
                          <span>15:00-17:00 </span>
                          <span>（时段已过）</span>
                        </div>
                      </span>
                    </template>
                  </van-radio>
                  <van-radio name="5" :disabled="!hideE">
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
      </div>

      <!-- 运费 -->
      <div class="cost">
        <li>
          <div>运费</div>
          <div><span class="freight">¥8.00</span></div>
        </li>
        <div class="van-hairline--top"></div>
        <li>
          <div>实付</div>
          <div><span class="discount">申通捐赠5元</span><span class="ActuallyPaid">¥3.00</span></div>
        </li>
      </div>
      <!-- <div class="commit" @click="NoAgree">
        <van-checkbox v-show="!checked" v-model="checked" disabled icon-size="17px">我已阅读并同意<span>赞助协议</span></van-checkbox>
        <van-checkbox v-show="checked" v-model="checked" checked-color="#E60416" icon-size="17px">我已阅读并同意<span>赞助协议</span></van-checkbox>
      </div> -->
      <!-- 提交 -->
      <div>
        <button class="btn" @click="sub">提交并赞助运费</button>
      </div>
    </div>
    <!-- 地址列表弹窗 -->
    <van-popup class="Address" v-model="show" round position="bottom" :style="{ height: '60%' }" @click="pitchOn">
      <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      Book_S: 0,
      domains: [],
      // 书籍信息 用于输入
      BookInformation: [
        {
          name: ""
        }
      ],
      MultipleChoice: [
        {
          name: "备选项1",
          checked: true,
          Quantity: "6000本",
          BookName: [
            {
              name: "",
              key: Date.now()
            }
          ]
        },
        {
          name: "备选项2",
          checked: false,
          Quantity: "6000本"
        },
        {
          name: "备选项3",
          checked: false,
          Quantity: "6000本"
        },
        {
          name: "备选项4",
          checked: false,
          Quantity: "6000本"
        },
        {
          name: "备选项5",
          checked: false,
          Quantity: "6000本"
        },
        {
          name: "备选项6",
          checked: false,
          Quantity: "6000本"
        }
      ],
      dataListed: [], //存放地址用于计算
      list: [], //存放地址
      show: false, //地址列表弹窗
      chosenAddressId: "", //选中第几个
      siteName: "请点击选择地址", //  名字(地址)
      siteIphone: "", //  手机(地址)
      site: "", // 地址

      // 选择取件时间
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
      Year: new Date().getFullYear(),
      nowDate: "", // 当前日期
      tomorrowDate: "", // 明天
      acquiredDate: "", //后天
      acquiredDateweek: "", //后天 周几
      attime: [],
      radio: "", //选中的时间段
      DataOfPickup: [], //取件时间
      twentyFourHourTimetableState: ["09:00:00", "11:00:00", "13:00:00", "15:00:00", "17:00:00"], //24小时时间表开始
      twentyFourHourTimetableEnd: ["11:00:00", "13:00:00", "15:00:00", "17:00:00", "19:00:00"], //24小时时间表
      moonParameter: "", //月参数
      dayParameter: "", //日参数
      TimeParameters: "", //时间参数
      active: 4
      // domains: [
      //   {
      //     name: ""
      //   }
      // ]
    };
  },
  watch: {
    //   监控书籍
    domains: {
      handler(newName, oldName) {
        var num_S = "";
        this.domains.forEach(item => {
          num_S = num_S * 1 + item.data.BookName.length * 1;
        });
        this.Book_S = num_S;
      },
      immediate: true,
      deep: true
    },
    // 地址列表  选中赋值
    chosenAddressId: function (value, o) {
      for (let index = 0; index < this.list.length; index++) {
        if (this.list[index].id == this.chosenAddressId) {
          this.siteName = this.list[index].name;
          this.siteIphone = this.list[index].tel;
          this.site = this.list[index].address;
        }
      }
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
    }
  },
  activated() {
    this.MultipleChoice.forEach(item => {
      if (item.checked) {
        // 是否选中   选中直接调用新增的分类
        this.addDomainsss(item);
      }
    });
    // 获取地址
    this.GetShippingAddress();
    // 初始化
    this.formatDate();
    this.TimeRange();
    this.active = "";
    this.radio = "";
  },
  methods: {
    //   提交
    sub() {
      Toast("提交");
      return;
      var that = this;
      if (this.radio) {
        var timeStart = this.Year + `-` + this.moonParameter + `-` + (this.dayParameter + this.active) + ` ` + this.twentyFourHourTimetableState[this.radio * 1 - 1];
        var timeEnd = this.Year + `-` + this.moonParameter + `-` + (this.dayParameter + this.active) + ` ` + this.twentyFourHourTimetableEnd[this.radio * 1 - 1];
        console.log("radio", timeStart, timeEnd);
        axios({
          method: "post",
          url: "https://tpkl.minpinyouxuan.com/index.php/api/v2/up_sto_order",
          data: {
            order_id: this.order_id,
            start_time: timeStart,
            end_time: timeEnd
          }
        })
          .then(res => {
            if (res.data.result == 1) {
              Toast(res.data.msg);
              setTimeout(() => {
                that.$router.push(this.fun.getUrl("BookingInfo", {}, { order_id: that.order_id }));
              }, 500);
            }
            if (res.data.result == 0) {
              // 预约失败返回捐赠中心
              Toast(res.data.msg);
              setTimeout(() => {
                that.$router.push(this.fun.getUrl("DonationCenter", {}));
              }, 500);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Toast("请选择时间段");
      }
    },
    // 选择地址
    SelectAddress() {
      this.show = true;
    },
    // 类型添加删除
    removeDomain(item) {
      console.log("ssssssssss", item, this.domains);
      this.domains.forEach((items, index, arry) => {
        if (items.name == item.name) {
          this.domains.splice(index, 1);
        }
      });
    },
    // 类型添加新增
    addDomainsss(item) {
      item.BookName = [];
      item.BookName.push({
        name: "",
        key: Date.now()
      });

      this.domains.push({
        name: item.name,
        data: item,
        key: Date.now()
      });
      console.log("this.domains", this.domains);
    },
    //类型添加
    addDomain(item) {
      if (item.checked) {
        console.log("不选中");
        this.removeDomain(item);
      }
      if (!item.checked) {
        if (this.Book_S >= 5) {
          Toast("单笔做多捐5本书籍");
          setTimeout(() => {
            item.checked = !item.checked;
          }, 50);
          return;
        }
        console.log("选中");
        this.$nextTick(() => {
          this.addDomainsss(item);
        });
      }
    },

    // 类型单项添加
    TypeSingleTtem(msg) {
      if (this.Book_S >= 5) {
        Toast("单笔做多捐5本书籍");
        return;
      }

      msg.data.BookName.push({
        name: "",
        key: Date.now()
      });
    },

    // 点击删除单个
    OnClickRightIcon(data, msg, index_S, k_S, name_s) {
      var index = this.domains[index_S].data.BookName.indexOf(msg);
      if (index !== -1) {
        this.domains[index_S].data.BookName.splice(index, 1);
      }

      if (this.domains[index_S].data.BookName.length == 0) {
        this.domains[index_S].data.BookName.push({
          name: "",
          key: Date.now()
        });
        this.MultipleChoice.forEach(ite => {
          if (ite.name == data.name) {
            ite.checked = false;
          }
        });

        this.domains.splice(index_S, 1);
      }
      console.log("删除", k_S, this.domains);
    },

    //   增加书籍
    IncreasingBooks() {
      var BookInformation_S = [];
      this.MultipleChoice.forEach((item, i, arry) => {
        if (item.checked) {
          BookInformation_S.push(item);
        }
      });
      this.BookInformation = BookInformation_S;
      console.log(BookInformation_S);
    },

    //   返回上一层
    onClickLeft() {
      this.$router.go(-1);
    },
    // 编辑地址
    onEdit(item, index) {
      this.$router.push(this.fun.getUrl("alterAddress", { model: this.dataListed[index] }));
    },
    // 添加地址
    onAdd() {
      this.$router.push(this.fun.getUrl("appendAddress"));
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
          if (response.result === 1) {
            // console.log('response',response.data);isdefault
            that.dataListed = response.data;
            var dataList = that.dataListed;
            var address = [];
            for (let index = 0; index < dataList.length; index++) {
              var addressItem = {};
              // console.log('dizhi',dataList[index].province);   //省
              // console.log('dizhi',dataList[index].city);      //市
              // console.log('dizhi',dataList[index].district);    //区
              // console.log('dizhi',dataList[index].street);   //街道
              // console.log('dizhi',dataList[index].address);   //具体地址
              // console.log('dizhi',dataList[index].mobile);    //手机号
              // console.log('dizhi',dataList[index].id);        //id
              // console.log('dizhi',dataList[index].username);   //名称
              // console.log('dizhi',dataList[index].isdefault);   //默认地址
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
        },
        function (response) {
          console.log(response);
        }
      );
    },

    formatDate() {
      let date = new Date();
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let week = date.getDay(); // 星期
      let weekArr = ["周二", "周三", "周四", "周五", "周六", "周日", "周一"];

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

      if (month < 10) {
        this.moonParameter = `0` + month;
      } else {
        this.moonParameter = month;
      }
      if (day < 10) {
        this.dayParameter = `0` + day;
      } else {
        this.dayParameter = day;
      }

      this.TimeParameters = this.moonParameter + `-` + this.dayParameter;
    },
    TimeRange() {
      let date = new Date();
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      console.log("hour", hour);
      if (9 <= hour && hour < 11) {
        this.hideA = false;
      }
      if (11 <= hour && hour < 13) {
        this.hideA = false;
        this.hideB = false;
      } else if (13 <= hour && hour < 15) {
        this.hideA = false;
        this.hideB = false;
        this.hideC = false;
      } else if (15 <= hour && hour < 17) {
        this.hideA = false;
        this.hideB = false;
        this.hideC = false;
        this.hideD = false;
      } else if (17 <= hour) {
        this.hideA = false;
        this.hideB = false;
        this.hideC = false;
        this.hideD = false;
        this.hideE = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Address {
  /deep/.van-radio {
    display: inline-flex;
  }
}
.content {
  background-color: #fbfbfb;
  height: 100%;
  //   position: relative;
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
  // 总的小标题
  .BookTop {
    text-align: left;
    margin-bottom: 0.63rem;
    width: 100%;
    span:nth-child(1) {
      font-size: 1rem;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      color: #333333;
      line-height: 1.5rem;
      font-weight: bold;
      width: 49%;
      display: inline-block;
    }
    span:nth-child(2) {
      font-size: 0.69rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 1rem;
      display: inline-block;
      width: 49%;
      text-align: right;
    }
  }
  //   内容
  .Intermediate {
    height: calc(100% - 46px);
    overflow: overlay;
    padding: 0 0.63rem;

    // 顶部 所需书籍
    .RequiredBook {
      background: #ffffff;
      box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
      border-radius: 0.38rem;
      padding: 0.75rem 1.25rem;
      margin-bottom: 0.63rem;
      margin-top: 0.63rem;
      // 选框
      .Box {
        text-align: left;
        margin-bottom: 0.63rem;

        li {
          margin-bottom: 0.5rem;
          width: 33%;
          display: inline-block;
          text-align: left;

          /deep/.el-checkbox {
            width: 5.63rem;
            background-color: #f4f8f9;
            padding: 0;
            text-align: left;
            line-height: 2.5rem;
            .el-checkbox__input {
              display: none;
            }
            .el-checkbox__label {
              line-height: 2.5rem;
              text-align: center;
              padding: 0;
              color: #999999;
              width: 100%;
              span:nth-child(1) {
                width: 100%;
                display: inline-block;
              }
            }
          }

          /deep/.is-checked {
            border-color: #f15353;
            .el-checkbox__label {
              color: #f15353;
            }
          }
        }
      }
    }
    // 输入文本
    .TextInput {
      background: #ffffff;
      box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
      border-radius: 0.38rem;
      padding: 0.75rem 1.25rem;
      margin-bottom: 0.63rem;
      li {
        .booksName {
          width: 50%;
          display: inline-block;
          text-align: left;
        }
        .addicon {
          text-align: right;
          width: 50%;
        }
        /deep/.van-cell {
          padding: 1rem 0;
        }
      }
    }

    // 取件信息
    .PickupInformation {
      background: #ffffff;
      box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
      border-radius: 0.38rem;
      padding: 0.75rem 1.25rem;
      margin-bottom: 0.63rem;
      // 取件地址
      .PickupAddress {
        // 地址前
        .BeforeTheAddress {
          text-align: left;
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #333333;
          line-height: 1.31rem;
        }
        // 地址后
        .AfterTheAddress {
          text-align: left;
          span {
            display: block;
            text-align: left;
            font-size: 15px;
            line-height: 1.8rem;
          }
          .siteName {
            font-weight: 700;
          }
        }
      }
    }
    // 取件时间
    .PickupTime {
      background: #ffffff;
      box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
      border-radius: 0.38rem;
      padding: 0.75rem 1.25rem;
      margin-bottom: 0.63rem;
      // 选择日期
      /deep/.van-tab {
        -webkit-justify-content: unset;
      }
      /deep/.van-tab--active {
        color: red;
      }
      /deep/.van-tabs {
        .van-tabs__line {
          background-color: #ffffff00;
        }
        .van-tab__pane {
          .van-radio-group {
            text-align: left;
            .van-radio {
              display: inline-block;
              width: 27%;
              text-align: center;
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
    }
    // 费用
    .cost {
      background: #ffffff;
      box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
      border-radius: 0.38rem;
      padding: 0.75rem 1.25rem;
      margin-bottom: 0.63rem;
      li:nth-child(1) {
        margin-bottom: 00.75rem;
      }
      li:nth-child(3) {
        margin-top: 1.5rem;
      }
      li {
        div {
          width: 50%;
          display: inline-block;
        }
        div:nth-child(1) {
          text-align: left;
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #333333;
          line-height: 1.31rem;
        }
        div:nth-child(2) {
          text-align: right;
        }
        .freight {
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #666666;
          line-height: 1.31rem;
        }
        .discount {
          font-size: 0.75rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #afafaf;
          line-height: 1.13rem;
          margin-right: 0.94rem;
        }
        .ActuallyPaid {
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #f15353;
          line-height: 1.31rem;
        }
      }
    }
    // 提交
    .btn {
      width: 80%;
      height: 44px;
      background: #f15353;
      border-radius: 0.38rem;
      color: #fff;
      border: none;
      margin: 1rem 0;
    }
  }
}
</style>