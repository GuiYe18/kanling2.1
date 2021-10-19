<!--
 * @Author: 飞
 * @Date: 2021-09-06 16:11:56
 * @LastEditTime: 2021-10-11 18:27:00
 * @FilePath: \you-shop1\src\views\A_version_1.1\NewDonation\NewPersonalCenter.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <!-- <van-nav-bar left-text="返回" right-text="明细" t
    itle="捐赠证书" left-arrow @click-left="onClickLeft" @click-right="onClickRight" /> -->
    <!-- <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight" /> -->
    <!-- 改版
    2021-9-9 10:35:06
     -->
    <div class="Top_bg">
      <div class="bj">
        <div class="Amount">
          <span v-if="sum == 0">0.00</span>
          <span v-else>{{ sum }}</span>
          <p>累计捐款（元）</p>
        </div>
        <div class="Detail">
          <div class="shape" @click="OnNewDetail">
            <van-icon name="balance-list-o" size="16" />
            <span>查看明细</span>
          </div>
        </div>
        <div class="Avatar">
          <div>
            <img src="./img/sp.png" alt="" />
          </div>
        </div>
        <div class="name">我有蟹黄堡秘方哦！</div>
      </div>
    </div>
    <!-- 功能项 -->
    <div class="List">
      <!-- 每个元素的两侧间隔相等 -->
      <van-row type="flex" justify="space-around">
        <van-col span="6">
          <!-- <router-link :to="fun.getUrl('ListOfMyDonations', {}, { uid: uid })">
                <img src="./img/MyDonation.png" alt="" />
                <p>我的捐赠</p>
              </router-link> -->
          <router-link :to="fun.getUrl('IHaveGiven', {}, { uid: uid })">
            <img src="./img/completed.png" alt="" />
            <p>我的捐赠</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link :to="fun.getUrl('NewDonationOrder', {}, { age: 1 })">
            <img src="./img/completed.png" alt="" />
            <p>待发货</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link :to="fun.getUrl('NewDonationOrder', {}, { age: 2 })">
            <img src="./img/Delivery.png" alt="" />
            <p>已发货</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link :to="fun.getUrl('NewDonationOrder', {}, { age: 3 })">
            <img src="./img/Refunds.png" alt="" />
            <p>已完成</p>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <div style="height: 0.63rem; background: #f5f5f5"></div>
    <div class="other">
      <!-- <span>更多</span> -->
      <!-- <van-row type="flex" justify="space-between"> -->
      <van-row>
        <!-- <van-col span="6">
          <router-link :to="fun.getUrl('DonationCertificate')">
            <img src="./img/DonationCertificate.png" alt="" />
            <p>捐赠证书</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link :to="fun.getUrl('DonationInvoice')">
            <img src="./img/DonationInvoice.png" alt="" />
            <p>捐赠发票</p>
          </router-link>
        </van-col> -->
        <!-- <van-col span="6"> -->
        <!-- <router-link :to="fun.getUrl('DonationInvoice')">
                <img src="./img/FourHelpApplication.png" alt="" />
                <p>四扶申请</p>
              </router-link> -->
        <!-- 四扶申请 -->
        <!-- <li>
                <router-link :to="fun.getUrl('Sifu')" v-show="s_state == 0">
                  <img src="./img/FourHelpApplication.png" alt="" class="diy-img sifu" />
                  <div style="">四扶申请</div>
                </router-link>
                <router-link :to="fun.getUrl('SifuUnderReview')" v-show="s_state == 3">
                  <img src="./img/FourHelpApplication.png" alt="" class="diy-img sifu" />
                  <div style="">四扶审核中</div>
                </router-link>
                <router-link :to="fun.getUrl('SifuAuthenticationFailed')" v-show="s_state == 2">
                  <img src="./img/FourHelpApplication.png" alt="" class="diy-img sifu" />
                  <div style="">四扶未通过</div>
                </router-link>
                <router-link :to="fun.getUrl('FourSupportDetails')" v-show="s_state == 1">
                  <img src="./img/FourHelpApplication.png" alt="" class="diy-img sifu" />
                  <div style="">四扶详情</div>
                </router-link>
              </li> -->
        <!-- </van-col> -->
      </van-row>
    </div>

    <!-- 技术支持 -->
    <div class="footer">
      <EyebrowEnd />
    </div>
  </div>
</template>

<script>
import EyebrowEnd from "./EyebrowEnd";
export default {
  props: ["uid"],
  data() {
    return {
      uid: this.uid,
      sum: ""
      // s_state: ""
    };
  },
  components: {
    EyebrowEnd
  },
  mounted() {},
  activated() {
    var that = this;
    // $http
    //   .post("member.member.member-data", { v: 3 }, " ")
    //   .then(response => {
    //     console.log(response, "0000000");
    //     if (response.result === 1) {
    //       that.s_state = response.data.member.s_state;
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     require("@/assets/css/member/02.scss");
    //   });

    this.GetBalance();
  },
  methods: {
    // 明细
    OnNewDetail() {
      this.$router.push(this.fun.getUrl("NewDetail", {}));
    },

    // 余额
    GetBalance() {
      var timer = setInterval(() => {
        if (this.uid == null) {
          this.uid = JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid;
        } else {
          clearInterval(timer);
          // 余额回调
          this.GetBalance_S();
        }
        console.log("获取uid");
      }, 500);
    },
    // 余额回调
    GetBalance_S() {
      var that = this;
      let fd = new FormData();
      fd.append("uid", this.uid);
      fd.append("page", 0);
      axios
        .post("https://tpkl.minpinyouxuan.com/index.php/api/v2/donation_list", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          console.log("response", response);
          if (response.data.result == 1) {
            console.log("response.data");
            that.sum = response.data.data.sum;
          } else {
            Toast(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onClickLeft() {
      this.$router.push(this.fun.getUrl("member", {}));
    },
    // 明细
    onClickRight() {
      this.$router.push(this.fun.getUrl("Detail", {}));
    }
  }
};
</script>

<style lang="scss" scoped>
// 主体
.content {
  background: #fff;
  padding-top: 2.88rem;
  .Top_bg {
    padding: 0 0.63rem;
    .bj {
      position: relative;
      height: 10.75rem;
      background-image: url("./img/PersonalCenterBackground.png");
      background-size: 100% 100%;
      width: 100%;

      .Amount {
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: left;
        margin-left: 1rem;
        margin-bottom: 1rem;
        span {
          font-size: 2.13rem;
          font-family: SourceHanSansSC-Medium, SourceHanSansSC;
          font-weight: 500;
          color: #ffffff;
          line-height: 3.13rem;
          margin-top: 1rem;
          display: inline-block;
        }
        p {
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #ffffff;
          line-height: 1.31rem;
        }
      }
      .Detail {
        position: absolute;
        bottom: 0;
        right: 0;
        text-align: left;
        margin-bottom: 2.8rem;
        .shape {
          height: 1.81rem;
          background: #f2b79f;
          border-radius: 6.25rem 0rem 0rem 6.25rem;
          display: flex;
          align-items: center;
          color: #fff;
          i {
            margin-left: 0.81rem;
          }
          span {
            margin-left: 0.3rem;
            margin-right: 0.56rem;
          }
        }
      }
      .Avatar {
        position: absolute;
        top: -2rem;
        left: 50%;
        transform: translateX(-50%);
        div {
          width: 4.5rem;
          height: 4.5rem;
          img {
            width: 4.5rem;
            height: 4.5rem;
            border-radius: 50%;
          }
        }
      }
      .name {
        font-size: 1rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        transform: translateX(-50%);
        position: absolute;
        left: 51%;
        top: 2.8rem;
      }
    }
  }
  // 外部
  .shell {
    height: 200px;
    margin: 0 1rem;
    position: relative;
    // 捐的东西功能
    .Donation {
      background: #fff;
      width: 100%;
      height: 100px;
      border-radius: 20px;
      position: absolute;
      top: -3rem;
      box-shadow: 0px 0px 10px 0px #271d1d26;
    }
  }
  .List {
    height: 100px;
    .van-col {
      img {
        width: 1.88rem;
        height: 1.88rem;
        margin-top: 1.56rem;
        margin-bottom: 0.5rem;
      }
      p {
        font-size: 0.75rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #666666;
        line-height: 1.13rem;
      }
    }
  }

  .other {
    width: 100%;
    border-radius: 20px;
    padding: 1.25rem 0.88rem 1.75rem;
    background: #ffffff;
    // 更多
    span {
      display: block;
      text-align: left;
      margin-bottom: 1.25rem;

      font-size: 1rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 1.38rem;
    }
    /deep/.van-row {
      .van-col {
        width: 5.38rem;
        background: #fbaba214;
        border-radius: 0.25rem;
        padding-bottom: 0.44rem;
        margin-right: 2rem;
        img {
          width: 2.5rem;
          height: 2.5rem;
        }
        p {
          font-size: 0.63rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 0.88rem;
          letter-spacing: 1px;
        }
      }
    }
  }
  // 技术支持
  .footer {
    padding-bottom: 3rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 100%;
  }
}
</style>