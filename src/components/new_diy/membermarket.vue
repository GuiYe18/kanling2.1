<template>
  <div :class="className">
    <!-- style -->
    <div v-html="css"></div>
    <!-- 营销互动 -->
    <!-- <div class="html-box" v-if="(datas.show_list && datas.show_list.length > 0) || datas.list.length > 0"> -->
    <div class="html-box">
      <div id="membermarket">
        <div class="title" @click="changeShow">
          <div style="display: flex">
            <div class="spare"></div>
            <h3>{{ datas.title }}</h3>
          </div>
          <i v-show="datas.list_style == '2' && !show" style="flex: 1; text-align: right; font-size: 20px" class="iconfont icon-member-top"></i>
        </div>

        <ul class="tool-box 1" v-if="datas.list_style == '1'">
          <!-- 支付码申请 -->
          <li  v-if="$route.query.i==2">
            <router-link :to="fun.getUrl('PaymentArea')" v-show="CashCodeStatus == 0">
              <img src="../../assets/images/kick/certificate.png" alt="" class="diy-img sifu" />
              <div style="">支付码申请</div>
            </router-link>
            <router-link :to="fun.getUrl('PaymentCodeUnderReview', {}, { payStype: payStype })" v-show="CashCodeStatus == 1">
              <img src="../../assets/images/kick/certificate.png" alt="" class="diy-img sifu" />
              <div style="">支付码审核中</div>
            </router-link>

            <router-link :to="fun.getUrl('ViewPaymentCode', {}, { payStype: payStype })" v-show="CashCodeStatus == 2">
              <img src="../../assets/images/kick/certificate.png" alt="" class="diy-img sifu" />
              <div style="">查看支付码</div>
            </router-link>
            <router-link :to="fun.getUrl('PaymentCodeAuthenticationFailed', {}, { payStype: payStype })" v-show="CashCodeStatus == 3">
              <img src="../../assets/images/kick/certificate.png" alt="" class="diy-img sifu" />
              <div style="">支付码申请未通过</div>
            </router-link>
          </li>
          <!-- 推广二维码 -->
          <li v-if="$route.query.i==2">
            <router-link :to="fun.getUrl('extensionHome')">
              <img src="./img/codeHome.png" alt="" class="diy-img" />
              <div style="">推广二维码</div>
            </router-link>
          </li>
          <li v-for="icon in datas.show_list" :key="icon.url" @click="pluginGoto(icon)">
            <template v-if="notShow.indexOf(icon.url) < 0">
              <i class="iconfont" :class="icon.class"></i>
              <div>{{ icon.title }}</div>
              <div class="Badge 1" v-show="icon.total > 0">{{ icon.total > 99 ? "99+" : icon.total }}</div>
            </template>
          </li>

          <li v-for="(item, index) in datas.list" :key="index" @click="gotoUrl(item)">
            <img class="diy-img" :src="item.image || emptyImage" alt="" />
            <div style="margin-top: 9px">{{ item.text }}1</div>
          </li>

          <li v-if="member_item.uid == '685' || member_item.uid == '443' || member_item.uid == '1'">
            <router-link :to="fun.getUrl('RecommendedMerchantList')">
              <img src="../../assets/images/kick/certificate.png" alt="" class="diy-img sifu" />
              <div style="">推荐的商户列表</div>
            </router-link>
          </li>
          <li v-if="$route.query.i==2">
            <router-link :to="fun.getUrl('Industrydetails')" v-if="hangye">
              <img src="../../assets/images/kick/invoice.png" alt="" class="diy-img sifu" />
              <div style="">行业代表</div>
            </router-link>
            <router-link :to="fun.getUrl('Industry')" v-else>
              <img src="../../assets/images/kick/invoice.png" alt="" class="diy-img sifu" />
              <div style="">行业代表</div>
            </router-link>
          </li>

          <!-- <li>
            <router-link :to="fun.getUrl('Sifu')" v-show="s_state == 0">
              <img src="../../assets/images/kick/certificate.png" alt="" class="diy-img sifu" />
              <div style="">四扶申请</div>
            </router-link>
            <router-link :to="fun.getUrl('SifuUnderReview')" v-show="s_state == 3">
              <img src="../../assets/images/kick/certificate.png" alt="" class="diy-img sifu" />
              <div style="">四扶审核中</div>
            </router-link>
            <router-link :to="fun.getUrl('SifuAuthenticationFailed')" v-show="s_state == 2">
              <img src="../../assets/images/kick/certificate.png" alt="" class="diy-img sifu" />
              <div style="">四扶未通过</div>
            </router-link>
            <router-link :to="fun.getUrl('FourSupportDetails')" v-show="s_state == 1">
              <img src="../../assets/images/kick/certificate.png" alt="" class="diy-img sifu" />
              <div style="">四扶详情</div>
            </router-link>
          </li> -->

        </ul>

        <ul class="tool-boxlis" v-if="datas.list_style == '2'" v-show="show">
          {{ datas.show_list}}
          <li v-for="icon in datas.show_list" :key="icon.url" @click="pluginGoto(icon)">
            <div class="lis" v-if="notShow.indexOf(icon.url) < 0">
              <i class="iconfont" :class="icon.class" style="font-size: 28px"></i>
              <div>{{ icon.title }}</div>
              <div class="Badge" v-show="icon.total > 0">{{ icon.total > 99 ? "99+" : icon.total }}</div>
            </div>
            <i class="iconfont icon-member_right"></i>
          </li>


          <li v-for="(item, index) in datas.list" :key="index" @click="gotoUrl(item)">
            <div class="lis">
              <img class="diy-img" :src="item.image || emptyImage" alt="" />
              <div style="margin-left: 5px">{{ item.text }}</div>
            </div>
            <i class="iconfont icon-member_right"></i>
          </li>

          <!-- <router-link :to="fun.getUrl('extensionHome')">
            <li>
              <div class="lis">
                <img class="diy-img" alt="" />
                <div style="margin-left: 5px">推广</div>
              </div>
              <i class="iconfont icon-member_right"></i>
            </li>
          </router-link> -->
        </ul>
      </div>

      <div>
        <div class="title">
          <div style="display: flex">
            <div class="spare"></div>
            <!-- <h3>更多</h3> -->
          </div>
          <i class="iconfont icon-member-top" style="flex: 1 1 0%; text-align: right; font-size: 20px; display: none"></i>
        </div>
        <ul class="tool-box">
          <!-- <li>
              <img src="../../assets/images/kick/certificate.png" alt="" class="diy-img sifu" />
              <div style="">支付码维护</div>
          </li> -->
          <!-- <li>
              <img src="../../assets/images/kick/certificate.png" alt="" class="diy-img sifu" />
              <div style="">支付码申请 <br/> 正在升级中</div>
          </li> -->
        </ul>
        <!---->
      </div>
      <!-- <router-link :to="fun.getUrl('Pay')">测试</router-link>  -->
      <!-- 更多 -->
      <!-- <div id="new_orderlist">
        <div class="ordertltie">
          <div class="spare"></div>
          <div class="ordername">更多</div>
          <div></div>
        </div>
        <div class="order_all">
          <div class="order_pub">
            <router-link :to="fun.getUrl('DonationCertificate')">
              <div class="badge"></div>
              <img src="../../assets/images/kick/捐赠证书.png" alt="" class="order_img" /><span>捐赠证书</span>
            </router-link>
          </div>
          <div class="order_pub">
            <router-link :to="fun.getUrl('DonationInvoice')">
              <div class="badge"></div>
              <img src="../../assets/images/kick/捐赠证书.png" alt="" class="order_img" /><span>捐赠发票</span>
            </router-link>
          </div>
          <div class="order_pub"></div>
          <div class="order_pub"></div>
          <div class="order_pub"></div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import emptyImage from "@/assets/images/new_diy/image.png";
// 自定义样式
const css = function () {
  if (this.datas.preview_color) {
    const { preview_color, text_color } = this.datas;

    return `
      .component-${this.id} .html-box {
          background-color: ${preview_color.color};
          background-image: url(${preview_color.isColor == 2 ? preview_color.image : ""});
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
      }

      .component-${this.id} .html-box .tool-box, .component-${this.id} .html-box .tool-boxlis{
          color: ${text_color};
      }
  `;
  }
};

export default {
  props: ["id", "datas", "member_item", "notShow", "CashCodeStatus", "hangye", "payStype"],
  data() {
    return {
      emptyImage,
      show: true,
      // s_state: ""
    };
  },



  mounted() {
    // var that = this
    // $http
    //   .post("member.member.member-data", { v: 3 }, " ")
    //   .then(response => {
    //     if (response.result === 1) {
    //       that.s_state = response.data.member.s_state;
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     require("@/assets/css/member/02.scss");
    //   });
  },
  computed: {
    css() {
      return "<style>" + css.call(this) + "</style>";
    },
    className() {
      const name = ["component-wrapper", `component-${this.id}`];
      console.log("this.idthis.datas", this.member_item);
      return name;
    }
  },

  methods: {
    changeShow() {
      this.show = !this.show;
    },
    gotoUrl(item) {
      if (item.h5_link) {
        window.location.href = item.h5_link;
      }
    },
    pluginGoto(item) {
      // alert("itempluginGoto", item.name);

      /**
       * @Author: 飞
       * @Date: 2021-07-22 14:22:43
       * @Describe: 营销互动 后台功能
       * @param {*} item
       */
      if (item.name == "article") {
        this.$router.push(
          this.fun.getUrl(item.url, {
            id: "0"
          })
        );
      } else if (item.name == "courier") {
        window.localStorage.setItem("couriername", item.title);
        this.$router.push(this.fun.getUrl(item.url));
      } else if (item.name == "supplier") {
        this.$router.push(
          this.fun.getUrl(item.url, {
            uid: this.member_item.uid
          })
        );
      } else if (item.name == "m-erweima") {
        this.openQrCode("block");
      } else {
        this.$router.push(this.fun.getUrl(item.url, { selected: "1" }));
      }
    },
    openQrCode(e) {
      this.$emit("openQrCode", e);
    }
  }
};
</script>

<style lang="scss" scoped>
// 更多
.ordertltie .spare {
  width: 4px;
  height: 16px;
  border-radius: 1px;
  background-color: #f15353;
  margin-right: 6px;
}
#new_orderlist .order_img {
  width: 26px;
  height: 26px;
  display: block;
  margin: 0 auto;
  margin-bottom: 4px;
}

* {
  list-style: none;
  padding: 0;
  margin: 0;
}

// 默认
.component-wrapper {
  width: 100%;
}

.html-box {
  min-height: 30px;
}

#membermarket {
  overflow: hidden;
  color: #333;

  .title {
    display: flex;
    height: 40px;
    line-height: 40px;
    padding: 0 14px;

    /* border: solid 1px #f3f3f3; */
  }

  .spare {
    width: 4px;
    height: 16px;
    border-radius: 1px;
    background-color: #f15353;
    margin-top: 11px;
    margin-right: 6px;
  }

  h3 {
    color: #333;
    text-align: left;
    font-size: 16px;
    box-sizing: border-box;
  }

  .tool-boxlis {
    display: -webkit-box;
    display: -webkit-flex;
    padding: 10px 0 10px 0;
    flex-direction: column;

    .lis {
      display: flex;
      align-items: center;
      font-size: 16px;
    }

    .diy-img {
      width: 23px;
      height: 23px;
      margin: 6px;
      display: block;
    }

    li {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      margin-bottom: 10px;
      padding: 0 10px;
      position: relative;

      .span {
        line-height: 30px;
      }

      .Badge {
        height: 0.875rem;
        line-height: 0.875rem;
        font-size: 0.75rem;
        color: #fff;
        padding: 0 0.25rem;
        border-radius: 1rem;
        background-color: #f15353;
        position: absolute;
        top: 0.75rem;
        right: 12%;
      }
    }

    li i {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      color: #c9c9c9;
      line-height: 36px;

      /* margin-bottom: 4px; */
    }

    li .lis i {
      color: #f15353;
      margin-right: 5px;
      font-size: 25px;
    }
  }

  .tool-box {
    padding: 20px 0 10px 0;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 25%;
      position: relative;
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      margin-bottom: 10px;

      .span {
        line-height: 30px;
      }

      .Badge {
        height: 0.875rem;
        line-height: 0.875rem;
        font-size: 0.75rem;
        color: #fff;
        padding: 0 0.25rem;
        border-radius: 1rem;
        background-color: #f15353;
        position: absolute;
        top: -5px;
        left: 55%;
      }
    }

    .diy-img {
      width: 28px;
      height: 28px;
      margin: 6px auto;
      display: block;
    }
    .sifu {
      width: 42px;
      height: 42px;
      margin: 1px auto;
      margin-bottom: 0;
    }

    li i {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      line-height: 36px;
      font-size: 20px;
      margin-bottom: 7px;
    }
    // 工具图标
    .iconfont {
      display: inline-block;
      font-size: 30px;
      color: rgb(241, 83, 83);
    }

    .icon-member-bank-list1 {
      background: url("../../assets/images/member/member_a(29).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-bank-list1::before {
      content: "";
    }

    .icon-member-collect1 {
      background: url("../../assets/images/member/member_a(41).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-collect1::before {
      content: "";
    }

    .icon-member-get-up {
      background: url("../../assets/images/member/member_a(47).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-get-up::before {
      content: "";
    }

    .icon-member-act-signup1 {
      background: url("../../assets/images/member/member_a(15).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-act-signup1::before {
      content: "";
    }

    .icon-member-course3 {
      background: url("../../assets/images/member/member_a(22).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-course3::before {
      content: "";
    }

    .icon-member_goods {
      background: url("../../assets/images/member/member_a(52).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_goods::before {
      content: "";
    }

    .icon-card {
      background: url("../../assets/images/member/member_a(57).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-card::before {
      content: "";
    }

    .icon-member-recharge1 {
      background: url("../../assets/images/member/member_a(3).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-recharge1::before {
      content: "";
    }

    .icon-member_my-friend {
      background: url("../../assets/images/member/member_a(63).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_my-friend::before {
      content: "";
    }

    .icon-member_card1 {
      background: url("../../assets/images/member/member_a(58).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_card1::before {
      content: "";
    }

    .icon-extension_goods_order {
      background: url("../../assets/images/member/member_a(59).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-extension_goods_order::before {
      content: "";
    }

    .icon-member_my-card {
      background: url("../../assets/images/member/member_a(64).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_my-card::before {
      content: "";
    }

    .icon-member_material {
      background: url("../../assets/images/member/member_a(65).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_material::before {
      content: "";
    }

    .icon-member-help {
      background: url("../../assets/images/member/member_a(2).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-help::before {
      content: "";
    }

    .icon-member-clock1 {
      background: url("../../assets/images/member/member_a(30).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-clock1::before {
      content: "";
    }

    .icon-member-express-list {
      background: url("../../assets/images/member/member_a(68).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-express-list::before {
      content: "";
    }

    .icon-declaration_system {
      background: url("../../assets/images/member/member_a(66).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-declaration_system::before {
      content: "";
    }

    .icon-order_system {
      background: url("../../assets/images/member/member_a(70).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-order_system::before {
      content: "";
    }

    .icon-fontclass-erweima {
      background: url("../../assets/images/member/tool_a(2).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-fontclass-erweima::before {
      content: "";
    }

    .icon-fontclass-pinglun {
      background: url("../../assets/images/member/tool_a(4).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-fontclass-pinglun::before {
      content: "";
    }

    .icon-fontclass-youhuiquan {
      background: url("../../assets/images/member/tool_a(7).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-fontclass-youhuiquan::before {
      content: "";
    }

    .icon-member_mygroup {
      background: url("../../assets/images/member/member_a(72).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_mygroup::before {
      content: "";
    }

    .icon-extension_video {
      background: url("../../assets/images/member/member_a(73).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-extension_video::before {
      content: "";
    }

    .icon-member_changer_centre {
      background: url("../../assets/images/member/member_a(74).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_changer_centre::before {
      content: "";
    }

    .icon-member_live_normal {
      background: url("../../assets/images/member/member_a(92).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_live_normal::before {
      content: "";
    }

    .icon-member_community {
      background: url("../../assets/images/member/member_a(74).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_community::before {
      content: "";
    }

    .icon-member_advertise_market {
      background: url("../../assets/images/member/member_a(84).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_advertise_market::before {
      content: "";
    }

    .icon-member_bonus_pools {
      background: url("../../assets/images/member/member_a(81).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_bonus_pools::before {
      content: "";
    }

    .icon-member_ejiayou {
      background: url("../../assets/images/member/member_a(103).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_bonus_pools::before {
      content: "";
    }

    .icon-member_area_search {
      background: url("../../assets/images/member/member_a(121).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_area_search::before {
      content: "";
    }

    .icon-member_mygroupbuy {
      background: url("../../assets/images/member/member_a(122).png") no-repeat center;
      background-size: 1.75rem;
      width: 1.75rem;
      height: 1.75rem;
    }

    .icon-member_mygroupbuy::before {
      content: "";
    }

    .icon-member_groupbuy {
      background: url("../../assets/images/member/member_a(123).png") no-repeat center;
      background-size: 1.75rem;
      width: 1.75rem;
      height: 1.75rem;
    }

    .icon-member_groupbuy::before {
      content: "";
    }

    .icon-fontclass-kehu {
      background: url("../../assets/images/member/tool_a(3).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-fontclass-kehu::before {
      content: "";
    }

    .icon-fontclass-tihuoka {
      background: url("../../assets/images/member/member_a(127).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-fontclass-tihuoka::before {
      content: "";
    }

    .icon-fontclass-anliku {
      background: url("../../assets/images/member/member_a(132).png") no-repeat center;
      background-size: 1.75rem;
      width: 1.75rem;
      height: 1.75rem;
    }

    .icon-fontclass-anliku::before {
      content: "";
    }

    .icon-member_installserver {
      background: url("../../assets/images/member/member_a(114).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_installserver::before {
      content: "";
    }
  }
}
</style>
