<!--
 * @Author: 飞
 * @Date: 2021-04-20 11:08:44
 * @LastEditTime: 2021-06-16 15:37:13
 * @FilePath: \you-shop1\src\views\member\extensionHome.vue
 * @Describe: 
-->
<!--
 * @Author: 飞
 * @Date: 2021-04-20 11:08:44
 * @LastEditTime: 2021-06-04 15:35:20
 * @FilePath: \you-shop1\src\views\member\extensionHome.vue
 * @Describe: 
-->
<template>
  <div id="income">
    <div class="supplier">
      <!-- tolink 直接对接路由  -->

      <c-title v-show="type == 1" :hide="false" tolink="extensionitem" totext="分享列表"></c-title>
      <c-title v-show="type == 2" :hide="false" tolink="extensionitem"></c-title>

      <!-- <div style="height: 40px"></div> -->

      <div :class="type == 1 ? 'main' : 'main2'">
        <img v-show="type == 1" class="qrcode" :src="qrcode" alt="推广二维码" />
        <!-- 导航 -->
        <div class="invite">
          <div>
            <span :class="type == 1 ? '' : 'Donation_J'" @click="Donation(1)">红包</span>
            <span :class="type == 1 ? 'Donation_J' : ''" @click="Donation(2)">捐赠码</span>
          </div>
        </div>

        <!-- 捐赠 -->
        <div class="Donation">
          <!-- <img v-show="type == 2" src="../../assets/images/member/左右.png" alt="" /> -->
        </div>
        <van-tabs v-model="active" swipeable v-show="type == 2">
          <van-tab>
            <div class="LongPress">
              <img src="../../assets/images/member/捐赠.png" alt="" />
              <span>长按保存</span>
            </div>
          </van-tab>
          <van-tab>
            <div class="LongPress">
              <img src="../../assets/images/member/捐赠.png" alt="" />
              <span>长按保存</span>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import cTitle from "components/title";
export default {
  components: { cTitle },
  data() {
    return {
      qrcode: "",
      type: 1
    };
  },
  activated() {
    this.getExtensionInfo();
  },
  methods: {
    // 点击捐赠
    Donation(k) {
      this.type = k;
    },
    getExtensionInfo() {
      // 获取二维码
      this.getQrCode();
    },
    getQrCode() {
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/geterweima";
      const uid = JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid;
      axios({
        url,
        method: "POST",
        data: { uid }
      }).then(res => {
        this.qrcode = res.data.data.qrcode;
      });
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#income,
.supplier,
.main {
  height: 100%;

  // height: calc(100% + 50px);
  min-height: 100%;
  box-sizing: border-box;
}
.supplier {
  position: relative;
  div:nth-child(1) {
    height: 40px;
  }
}

.main {
  width: 100%;
  position: absolute;
  top: 40px;
  left: 0;
  background: url("../../assets/images/member/qrcode_bg1.png") no-repeat;
  background-size: 100% 100%;
  height: 102%;
}
.main2 {
  width: 100%;
  position: absolute;
  top: 40px;
  left: 0;
  background: url("../../assets/images/member/qrcode_bg2.png") no-repeat;
  background-size: 100% 100%;
  height: 102%;
  /deep/.van-tabs__wrap {
    display: none;
  }
  /deep/.LongPress {
    img {
      width: 88%;
    }
    span {
      font-size: 16px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
      line-height: 22px;
      display: block;
    }
  }
}

.qrcode {
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 13.5rem;
  height: 13.5rem;
}
// 邀请
.invite {
  padding-top: 10px;
  div {
    width: 54%;
    display: inline-block;
    background-color: #ffffff94;
    border-radius: 20px;
    padding-top: 3px;
  }
  span {
    color: #fff;
    font-size: 18px;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    display: inline-block;
    height: 88%;
    background-color: #fff;
    color: #FF444C;
    width: 48%;
    border-radius: 20px;
    line-height: 32px;

  }
  .Donation_J {
    font-size: 18px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 800;
    color: #fff;
    display: inline-block;
    background-color: #0000;
    line-height: 32px;

  }
}
// 捐赠
.Donation {
  margin-bottom: 27px;
  img {
    margin-top: 27px;
    width: 112px;
    height: 25px;
  }
}

/deep/.mint-header {
  background: transparent !important;
  border-bottom: none !important;
  color: #333;
  font-size: 18px;
}
</style>
