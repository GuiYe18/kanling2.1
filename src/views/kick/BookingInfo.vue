<template>
  <div class="content">
    <van-nav-bar title="预约详情" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="marshalling">
      <ul>
        <li>
          <div class="marshalling_left">
            <img src="../../assets/images/kick/编组 2@2x.png" alt="" />
            <span>取件员：王先生</span>
            <img src="../../assets/images/kick/通话按钮@2x.png" alt="" />
          </div>
          <div class="marshalling_right">
            <span>取消寄件</span>
          </div>
          <!-- 额外标签法清除浮动 -->
          <div style="clear: both"></div>
        </li>
        <li>
          <div class="PickUp_left"><span>取件时间：</span><span>3月5日(星期六) 09:00-11:00</span></div>
          <div class="PickUp_right">
            <span @click="modificationTime">修改时间</span>
          </div>
        </li>
        <li>
          <div class="PickUp_bottom"><span>取件码：</span><span>5533</span><span>快递员上门前请勿提供</span></div>
        </li>
      </ul>
    </div>
    <!--预约发货地址栏-->
    <div class="addressBook">
      <div class="addressTop">
        <div>
          <img src="../../assets//images/kick/寄件@2x.png" alt="" />
        </div>
        <div>
          <span>寄件人：{{ postName }}</span
          >&#32;&#32;<span>{{ postIphone }}</span>
          <div>{{ postIp }}</div>
        </div>
        <div @click="addressBook">修改地址</div>
      </div>

      <div class="addressTop">
        <div>
          <img src="../../assets//images/kick/收件@2x.png" alt="" />
        </div>
        <div>
          <span>收件人：{{ getName }}</span
          >&#32;&#32;<span>{{ getIphone }}</span>

          <div>{{ getIp }}</div>
        </div>
        <div style="width: 58px"></div>
      </div>
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
      // 地址是否显示隐藏
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
  created() {
    this.GetShippingAddress();
  },
  watch: {
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
  methods: {
    //   修改时间
    modificationTime() {
      this.$router.push(this.fun.getUrl("ShipByAppointment", {}));
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
    // 地址列表 选中
    pitchOn() {
      console.log("E", this.chosenAddressId, this.list);
      this.show = false;
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
    },
    //   打开地址簿
    addressBook() {
      this.show = true;
    },
    // 返回
    onClickLeft() {
      Toast("返回");
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  //   地址簿列表
  .van-popup--bottom {
    .van-radio-group {
      padding-bottom: 50px;
      .van-radio {
        display: flex;
      }
    }
  }
  // 地址簿
  .addressBook {
    padding-bottom: 5px;
    margin-top: 10px;
    height: 165px;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    .addressTop {
      padding: 12px 0;
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
  // 编组
  .marshalling {
    width: 350px;
    height: 128px;
    background: #ffffff;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 15px;
    .marshalling_left {
      display: inline-flex;
      float: left;
      img:nth-child(1) {
        width: 31px;
        height: 31px;
        // margin: auto 0;
        margin: 15px;
      }
      img:nth-child(3) {
        width: 18px;
        height: 18px;
        margin-top: 24px;
        margin: auto 4px;
      }
      span {
        margin: 23px 0;
      }
    }
    .marshalling_right {
      display: inline-flex;
      height: 65px;
      float: right;
      span {
        width: 64px;

        border: 1px solid #656667;
        height: 23px;
        margin: auto 0;
        border-radius: 4px;
        margin-right: 17px;
        font-size: 11px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #666666;
        line-height: 22px;
      }
    }
    //取件时间
    .PickUp_left {
      text-align: left;
      display: inline-block;
      //   width: 77%;
      margin-left: 13px;
      margin-right: 4%;
      span:nth-child(2) {
        font-size: 14px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #ee6111;
        line-height: 21px;
      }
    }
    .PickUp_right {
      display: inline-block;
      text-align: right;
      //   width: 23%;
      margin-right: 13px;
    }
    .PickUp_bottom {
      text-align: left;
      margin-left: 16px;
      margin-right: 4%;
      margin-top: 8px;
      span:nth-child(2) {
        font-size: 14px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #ee6111;
        line-height: 21px;
      }
      span:nth-child(3) {
        font-size: 12px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #666666;
        line-height: 18px;
        margin-left: 7px;
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