<template>
  <div :class="className">
    <!-- style -->
    <div v-html="css"></div>
    <!-- 商家管理  -->
    <div class="html-box" v-if="(datas.show_list && datas.show_list.length > 0) || datas.list.length > 0">
      <div id="membermerchant">
        <div class="title" @click="changeShow">
          <div style="display: flex">
            <div class="spare"></div>
            <h3>{{ datas.title }}</h3>
          </div>
          <i v-show="datas.list_style == '2' && !show" style="flex: 1; text-align: right; font-size: 20px" class="iconfont icon-member-top"></i>
        </div>

        <ul class="tool-boxlis 2" v-if="datas.list_style == '1'">
          <li v-for="icon in datas.show_list" :key="icon.url" @click="pluginGoto(icon, member_item)">
            <template v-if="notShow.indexOf(icon.url) < 0">
              <i class="iconfont" :class="icon.class"></i>
              <div>{{ icon.title }}</div>
            </template>
          </li>
          <li v-for="(item, index) in datas.list" :key="index" @click="gotoUrl(item)">
            <img class="diy-img" :src="item.image || emptyImage" alt="" />
            <div style="margin-top: 9px">{{ item.text }}</div>
          </li>
        </ul>

        <ul class="tool-boxlis 1" v-if="datas.list_style == '2'" v-show="show">
          <section v-for="icon in datas.show_list" :key="icon.id" v-show="icon.title != `门店申请`">
            <section v-show="icon.title != `门店管理`">
              <li v-if="notShow.indexOf(icon.url) < 0" @click="pluginGoto(icon, member_item)">
                <div class="lis">
                  <i class="iconfont icon-stay_pay" style="font-size: 28px"></i>
                  <div>{{ icon.title }}</div>
                </div>
                <i class="iconfont icon-member_right"></i>
              </li>
            </section>
          </section>

          <li v-for="(item, index) in datas.list" :key="index" @click="gotoUrl(item)">
            <div class="lis">
              <img class="diy-img" :src="item.image || emptyImage" alt="" />
              <div style="margin-left: 5px">{{ item.text }}</div>
            </div>
            <i class="iconfont icon-member_right"></i>
          </li>
        </ul>
        <!-- 无身份 -->
        <ul class="tool-boxlis 0" v-if="member_item.typea === 0">

          <template v-if="$route.query.i ==2">
            <li v-for="icon in applyList" :key="icon.url" @click="pluginGoto(icon, member_item)">
              <div class="lis">
                <i class="iconfont" :class="icon.icon" style="font-size: 25px"></i>
                <div>{{ icon.title }}</div>
              </div>
              <i class="iconfont icon-member_right"></i>
            </li>
          </template>

        </ul>
        <!-- 无身份 -->
        <!-- <template v-if="member_item.typea === 0" class="tool-boxlis">
          <div class="list1" v-for="item in applyList" :key="item.url" @click="pluginGoto(item, member_item)">
            <i class="more-icon" :class="item.icon"></i>
            <span slot="text">{{ item.title }}</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </template> -->

        <!-- 1企业,2商铺.3牛人 -->
        <!-- 牛人、企业、商铺身份 -->
        <template v-else>
          <!-- 1企业管理 -->
          <ul class="tool-boxlis" v-if="member_item.typea === 1">
            <li v-for="item in enterpriseList" :key="item.url" @click="pluginGoto(item, member_item)">
              <div class="lis">
                <i class="iconfont" :class="item.icon" style="font-size: 25px"></i>
                <div>{{ item.title }}</div>
              </div>
              <i class="iconfont icon-member_right"></i>
            </li>
          </ul>

          <!-- <div class="list1" v-if="member_item.typea === 1" v-for="item in enterpriseList" :key="item.url" @click="pluginGoto(item, member_item)">
            <i class="more-icon" :class="item.icon"></i>
            <span slot="text">{{ item.title }}</span>
            <i class="fa fa-angle-right"></i>
          </div> -->
          <!-- 2商铺管理 -->
          <ul class="tool-boxlis" v-if="member_item.typea === 2">
            <li v-for="item in shopsList" :key="item.url" @click="pluginGoto(item, member_item)">
              <div class="lis">
                <i class="iconfont" :class="item.icon" style="font-size: 19px"></i>
                <div>{{ item.title }}</div>
              </div>
              <i class="iconfont icon-member_right"></i>
            </li>
          </ul>

          <!-- 2商铺管理
          <div class="list1" v-if="member_item.typea === 2" v-for="item in shopsList" :key="item.url" @click="pluginGoto(item, member_item)">
            <i class="more-icon" :class="item.icon"></i>
            <span slot="text">{{ item.title }}</span>
            <i class="fa fa-angle-right"></i>
          </div> -->
          <!-- 牛人管理 -->
          <ul class="tool-boxlis" v-if="member_item.typea === 3">
            <li v-for="item in strongManList" :key="item.url" @click="pluginGoto(item, member_item)">
              <div class="lis">
                <i class="iconfont" :class="item.icon" style="font-size: 25px"></i>
                <div>{{ item.title }}</div>
              </div>
              <i class="iconfont icon-member_right"></i>
            </li>
          </ul>
        </template>
      </div>
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
  props: ["id", "datas", "member_item", "notShow"],
  data() {
    return {
      emptyImage,
      show: true,
      activeNames: ["1"],
      applyList: [
        { name: "supplier", title: "牛人申请", url: "member", icon: "icon-kc_line_order" },
        { name: "supplier", title: "企业申请", url: "newEnterprise", icon: "icon-shangpin1" },
        { name: "supplier", title: "商铺申请", url: "shops", icon: "icon-fenlei6" }
      ],

      // enterpriseList: [{ name: "supplier", title: "企业管理", url: "enterpriseManage", icon: "icon-fenlei6", typestatus: 1 }],
      // shopsList: [{ name: "supplier", title: "商铺管理", url: "shopsManage", icon: "icon-ht_basis_shops", typestatus: 2 }],
      // strongManList: [{ name: "supplier", title: "牛人管理", url: "strongManManage", icon: "icon-fx_canyu", typestatus: 3 }]
      enterpriseList: [{ name: "supplier", title: "企业管理", url: "strongManManage", icon: "icon-fenlei6", typestatus: 1 }],
      shopsList: [{ name: "supplier", title: "商铺管理", url: "strongManManage", icon: "icon-ht_basis_shops", typestatus: 2 }],
      strongManList: [{ name: "supplier", title: "牛人管理", url: "strongManManage", icon: "icon-fx_canyu", typestatus: 3 }]
    };
  },
  computed: {
    css() {
      console.log("member_item", this.member_item);
      return "<style>" + css.call(this) + "</style>";
    },
    className() {
      const name = ["component-wrapper", `component-${this.id}`];
      return name;
    }
  },
  methods: {
    changeShow() {
      this.show = !this.show;
    },
    gotoUrl(item) {
      console.log(item);
      if (item.h5_link) {
        window.location.href = item.h5_link;
      }
    },

    // 是否填写基本信息
    DoYouFillInBasicInformation() {
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/nrstatus";
      axios({
        url,
        method: "POST"
      }).then(res => {
        // 0显示企业申请 未认证   .1显示企业管理    已认证
        res.data.data.attestation;
        // 参数去跳转数据还是基本信息
        // 去牛人认证
        if (res.data.data.attestation == 1) {
          this.$router.push(this.fun.getUrl("strongMan", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id }));
        }
        // 直接填写牛人基本信息
        if (res.data.data.attestation == 0) {
          this.ShowHidden(res.data.data.attestation);
        }
      });
    },
    // 参数去跳转数据还是基本信息
    ShowHidden(attestation) {
      const data = {
        sid: Number(window.localStorage.getItem("sid"))
      };
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/api/v1/examine",
        data
      }).then(res => {
        // 填写基本信息基本信息判断
        // examine:1显示所有顶部导航,0只显示基本信息页面
        if (res.data.data.examine === 0) {
          if (window.localStorage.getItem("typea") == 3) {
                
            this.$router.push(this.fun.getUrl("strongManInfoNew", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id,attestation: attestation }));
          }
          if (window.localStorage.getItem("typea") == 2) {
            this.$router.push(this.fun.getUrl("shopsInfo", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id ,attestation: attestation}));
          }
          if (window.localStorage.getItem("typea") == 1) {
            this.$router.push(this.fun.getUrl("enterpriseInfo", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id ,attestation: attestation}));
          }
        }

        // 已经填写过基本信息
        if (res.data.data.examine === 1) {
          this.$router.push(
            this.fun.getUrl(
              "strongManManage",
              {},
              {
                i: this.$route.query.i,
                type: this.$route.query.type,
                mid: this.$route.query.mid,
                shop_id: this.$route.query.shop_id,
                attestation: attestation
              }
            )
          );
          // if (window.localStorage.getItem("typea") == 3) {
          //   this.$router.push(this.fun.getUrl("strongManManage", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id }));
          // }
          // if (window.localStorage.getItem("typea") == 2) {
          //   this.$router.push(this.fun.getUrl("strongManManage", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id }));
          // }
          // if (window.localStorage.getItem("typea") == 1) {
          //   this.$router.push(this.fun.getUrl("strongManManage", {}, { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, shop_id: this.$route.query.shop_id }));
          // }
        }
      });
    },

    pluginGoto(item, typea) {
      console.log("typeatypeatypeatypeatypeatypeatypeatypea", item);

      window.localStorage.setItem("typea", typea.typea);
      // 判断有无申请   如果有记下来
      if (item.title == "牛人申请") {
        window.localStorage.setItem("typea", 3);
      }
      if (item.title == "企业申请") {
        window.localStorage.setItem("typea", 1);
      }
      if (item.title == "商铺申请") {
        window.localStorage.setItem("typea", 2);
      }

      window.localStorage.setItem("sid", typea.sid);

      if (item.name == "article") {
        this.$router.push(
          this.fun.getUrl(item.url, {
            id: "0"
          })
        );
      } else if (item.url == "member") {
        // 基本信息
        // this.$router.push("member/strongMan?i=2&type=5&mid=0&shop_id=1");
        // 跳转牛人申请
        console.log("少时诵诗书所所所所所所所所");
        // 判断牛人是否要认证
        this.DoYouFillInBasicInformation();
      } else if (item.name == "courier") {
        window.localStorage.setItem("couriername", item.title);
        this.$router.push(this.fun.getUrl(item.url));
      } else if (item.name == "supplier") {
        console.log("item", item);
        // 认证  未填基本新
        if (item.url == "strongManManage") {
          // 跳转数据分析之前判断是否  填写基本信息
          this.ShowHidden(item.url);
          return;
        }
        // 正常流程走
        this.$router.push(
          this.fun.getUrl(item.url, {
            id: "0"
          })
        );
      } else {
        this.$router.push(this.fun.getUrl(item.url));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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

#membermerchant {
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
    // padding: 10px 0 10px 0;
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
      position: relative;
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      // margin-bottom: 10px;
      // padding: 0 10px;

      .span {
        line-height: 30px;
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
    }

    .diy-img {
      width: 28px;
      height: 28px;
      margin: 6px auto;
      display: block;
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

    .icon-member-apply1 {
      background: url("../../assets/images/member/member_a(9).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-apply1::before {
      content: "";
    }

    .icon-member-supplier {
      background: url("../../assets/images/member/member_a(53).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-supplier::before {
      content: "";
    }

    .icon-fontclass-cefu {
      background: url("../../assets/images/member/member_a(129).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-fontclass-cefu::before {
      content: "";
    }

    .icon-fontclass-shipindati {
      background: url("../../assets/images/member/member_a(135).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-fontclass-shipindati::before {
      content: "";
    }

    .icon-fontclass-zitidian {
      background: url("../../assets/images/member/member_a(130).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-fontclass-zitidian::before {
      content: "";
    }

    .icon-fontclass-xiaoshoubaobiao {
      background: url("../../assets/images/member/member_a(128).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-fontclass-xiaoshoubaobiao::before {
      content: "";
    }

    .icon-member-replenishment {
      background: url("../../assets/images/member/member_a(67).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-replenishment::before {
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

    .icon-member_hotel {
      background: url("../../assets/images/member/member_a(56).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_hotel::before {
      content: "";
    }

    .icon-member-store-apply1 {
      background: url("../../assets/images/member/member_a(27).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-store-apply1::before {
      content: "";
    }

    .icon-member_store {
      background: url("../../assets/images/member/member_a(26).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_store::before {
      content: "";
    }

    .icon-member-cashier {
      background: url("../../assets/images/member/member_a(34).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-cashier::before {
      content: "";
    }

    .icon-member-mendian1 {
      background: url("../../assets/images/member/member_a(40).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member-mendian1::before {
      content: "";
    }

    .icon-delivery_order {
      width: 1.75rem;
      height: 1.75rem;
      margin-bottom: 0.11em;
    }

    .icon-service_station {
      width: 1.75rem;
      height: 1.75rem;
      margin-bottom: 0.11em;
    }

    .icon-member_voice_center {
      background: url("../../assets/images/member/member_a(75).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_voice_center::before {
      content: "";
    }

    .icon-member_installment_buycar {
      background: url("../../assets/images/member/member_a(80).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_installment_buycar::before {
      content: "";
    }

    .icon-member_place_apply {
      background: url("../../assets/images/member/member_a(77).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_place_apply::before {
      content: "";
    }

    .icon-member_auctionofficer_apply {
      background: url("../../assets/images/member/member_a(96).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_auctionofficer_apply::before {
      content: "";
    }

    .icon-member_auctionofficer_admin {
      background: url("../../assets/images/member/member_a(97).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_auctionofficer_admin::before {
      content: "";
    }

    .icon-member_auctionofficer_index {
      background: url("../../assets/images/member/member_a(98).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_auctionofficer_index::before {
      content: "";
    }

    .icon-member_branch {
      background: url("../../assets/images/member/member_a(101).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_branch::before {
      content: "";
    }

    .icon-member_host_application {
      background: url("../../assets/images/member/member_a(91).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_host_application::before {
      content: "";
    }

    .icon-member_meeting_active {
      background: url("../../assets/images/member/member_a(88).png") no-repeat center;
      background-size: 28px;
      width: 100%;
      margin-bottom: 4px;
    }

    .icon-member_meeting_active::before {
      content: "";
    }
  }
}
</style>
