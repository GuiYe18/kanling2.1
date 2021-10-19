<!--
 * @Author: 飞
 * @Date: 2021-08-30 10:49:53
 * @LastEditTime: 2021-10-11 15:46:59
 * @FilePath: \you-shop1\src\views\A_version_1.1\NewDonation\NewDonation.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <div class="MainContent">
      <NewDonationCenter v-show="active == 0" :uid="uid" />
      <NewPersonalCenter v-show="active == 2" :uid="uid" />
    </div>
    <div class="foot">
      <van-tabbar v-model="active" active-color="#F26363">
        <van-tabbar-item>
          <div class="item">
            <div><img src="./img/Donationw.png" alt="" v-if="active == 0" /> <img src="./img/Donationwing.png" alt="" v-else /></div>
            <span>捐物</span>
          </div>
        </van-tabbar-item>
        <van-tabbar-item>
          <div class="item">
            <div>
              <img src="./img/Donation.png" alt="" v-if="active == 1" />
              <img src="./img/Donationing.png" alt="" v-else />
            </div>
            <span>捐款</span>
          </div>
        </van-tabbar-item>
        <van-tabbar-item>
          <div class="item">
            <div>
              <img src="./img/mine.png" alt="" v-if="active == 2" />
              <img src="./img/mineing.png" alt="" v-else />
            </div>
            <span>我的</span>
            <!-- <span>{{ uid }}</span> -->
          </div>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import NewDonationCenter from "./NewDonationCenter";
import NewPersonalCenter from "./NewPersonalCenter";
export default {
  data() {
    return {
      active: 0,
      uid: null
    };
  },
  watch: {
    active: function (N, O) {
      console.log("N", N, this.uid);
      if (N == 1) {
        this.active = O
        window.location.href = "https://cf.lingxi360.com/p/ca94ygk2w7p3n6z57p8pg685m1rxoveq?_setting_form_popup=1&utm_bccid=can9v23wqo8z7m6n9xgeydkl5eg4py1r";
      }
    }
  },

  activated() {
    this.uid = localStorage.getItem("uid");
    var timer = setInterval(() => {
      if (this.uid == null) {
        this.uid = localStorage.getItem("uid");
      } else {
        clearInterval(timer);
      }
    }, 500);
  },
  components: {
    NewDonationCenter,
    NewPersonalCenter
  }
};
</script>
个人中心

<style lang="scss" scoped>
.content {
  height: 100%;
  background-color: #fff;
  //   主题内容
  .MainContent {
    height: calc(100% - 50px);
  }
  //   底部导航
  .foot {
    .van-hairline--top-bottom {
      .van-tabbar-item {
        .item {
          width: 100%;
          text-align: center;
          img {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
        .van-tabbar-item__text {
          width: 100%;
        }
      }
    }
  }
}
</style>