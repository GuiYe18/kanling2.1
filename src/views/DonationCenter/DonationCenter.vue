<!--
 * @Author: 飞
 * @Date: 2021-07-20 11:02:02
 * @LastEditTime: 2021-10-19 15:45:15
 * @FilePath: \you-shop1\src\views\DonationCenter\DonationCenter.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-nav-bar left-text="返回" right-text="明细" title="捐赠证书" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <!-- <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight" /> -->
    <div class="Top_bg">
      <span>{{ sum }}</span>
      <p>累计捐款（元）</p>
    </div>
    <!-- 功能项 -->
    <div class="shell">
      <div class="Donation">
        <div class="List">
          <!-- 每个元素的两侧间隔相等 -->
          <van-row type="flex" justify="space-around">
            <van-col span="6">
              <router-link :to="fun.getUrl('ListOfMyDonations', {}, { uid: uid })">
                <img src="./img/MyDonation.png" alt="" />
                <p>我的捐赠</p>
              </router-link>
            </van-col>
            <van-col span="6">
              <router-link :to="fun.getUrl('MyDonation', {}, { age: 4 })">
                <img src="./img/completed.png" alt="" />
                <p>已完成</p>
              </router-link>
            </van-col>
            <van-col span="6">
              <router-link :to="fun.getUrl('MyDonation', {}, { age: 2 })">
                <img src="./img/Delivery.png" alt="" />
                <p>待发货</p>
              </router-link>
            </van-col>
            <van-col span="6">
              <router-link :to="fun.getUrl('MyDonation', {}, { age: 5 })">
                <img src="./img/Refunds.png" alt="" />
                <p>退货退款</p>
              </router-link>
            </van-col>
          </van-row>
        </div>
        <div class="other">
          <span>更多</span>
          <!-- <van-row type="flex" justify="space-between"> -->
          <van-row>
            <van-col span="6">
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
            </van-col>
            <!-- <van-col span="6"> -->
            <!-- <router-link :to="fun.getUrl('DonationInvoice')">
                <img src="./img/FourHelpApplication.png" alt="" />
                <p>四扶申请</p>
              </router-link> -->
            <!-- 四扶申请 -->
            <!-- <li> -->
            <van-col span="6">
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
            </van-col>
            <!-- </li> -->
            <!-- </van-col> -->
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
      sum: "",
      s_state: ""
    };
  },

  activated() {
    var that = this;
    $http
      .post("member.member.member-data", { v: 3 }, " ")
      .then(response => {
        console.log(response, "0000000");
        if (response.result === 1) {
          that.s_state = response.data.member.s_state;
        }
      })
      .catch(err => {
        console.error(err);
        require("@/assets/css/member/02.scss");
      });
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
  methods: {
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
  .Top_bg {
    height: 9.75rem;
    background: linear-gradient(90deg, #ff6362 0%, #ff9465 100%);
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
      .List {
        margin-bottom: 0.63rem;
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
    }
    .other {
      width: 100%;
      border-radius: 20px;
      padding: 1.25rem 0.88rem 1.75rem;
      background: #ffffff;
      // 更多
      span {
        font-size: 1rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #333333;
        line-height: 1.5rem;
        display: block;
        text-align: left;
        margin-bottom: 1.25rem;
      }
      /deep/.van-row {
        .van-col {
          width: 5.38rem;
          background: #fbaba214;
          border-radius: 0.25rem;
          padding-bottom: 0.44rem;
          margin-right: 1rem;
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
  }
}
</style>