<!--
 * @Author: 飞
 * @Date: 2021-07-29 11:31:51
 * @LastEditTime: 2021-09-29 15:23:24
 * @FilePath: \you-shop1\src\views\A_version_1.1\PaymentArea\PaymentArea.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-nav-bar title="支付码申请区域选择" name="arrow-left" left-arrow @click-left="onClickLeft" />
    <!-- 地区 -->
    <div class="area">
      <span class="tit">商户所在区域 </span>
      <van-field v-model="fieldValue" is-link readonly label="所在区域" placeholder="请选择所在区域" @click="show = true" />

      <van-popup v-model="show" round position="bottom">
        <van-cascader v-model="cascaderValue" title="请选择所在区域" :options="options" @close="show = false" @finish="onFinish" :field-names="fieldNames" />
      </van-popup>

      <el-button class="submit" @click="next">下一步</el-button>

      <el-button v-if="uid == '685'" class="submit" @click="cs">测试</el-button>
    </div>
  </div>
</template>


<script>
import { regionData } from "element-china-area-data";
import { Toast } from "vant";
export default {
  data() {
    return {
      fieldValue: "", //[地址]
      show: false, //展示隐藏
      cascaderValue: "", //展示
      options: regionData, //地址库
      fieldNames: {
        //属性名 重置
        text: "label",
        value: "value",
        children: "children"
      },
      datalist_: "",
      province: "",
      uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
      payType: "" //2福临门   1汇元    0没有
    };
  },
  methods: {
    // 测试
    cs() {
      this.$router.push({
        name: "HuiYuan",
        params: {},
        query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, ReRe: true, MasterkeyID: this.$route.query.MasterkeyID }
      });
    },
    // 返回会员中心
    onClickLeft() {
      this.$router.push(this.fun.getUrl("member", {}));
    },

    next() {
      if (this.payType == 0) {
        var Province = ["安徽省", "四川省", "青海省", "北京", "西藏自治区"];
        // var Province = ["安徽省", "四川省", "青海省",  "西藏自治区"];
        // var Province = [];
        if (this.province == "") {
          Toast("请选择所在地区");
          return;
        }
        console.log("province", this.province);
        if (Province.indexOf(this.province) == "-1") {
          //   付临门
          this.$router.push({
            name: "MerchantSettled",
            params: {},
            query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, ReRe: true, MasterkeyID: this.$route.query.MasterkeyID }
          });
        } else {
          // Toast(this.province+`地区申请等待开放`)
          // return
          //    联动
          this.$router.push({
            name: "HuiYuan",
            params: {},
            query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, ReRe: true, MasterkeyID: this.$route.query.MasterkeyID }
          });
        }
      }
      if (this.payType == 1) {
        this.$router.push({
          name: "MerchantSettled",
          params: {},
          query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, ReRe: true, MasterkeyID: this.$route.query.MasterkeyID }
        });
      }
      if (this.payType == 2) {
        this.$router.push({
          name: "HuiYuan",
          params: {},
          query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid, ReRe: true, MasterkeyID: this.$route.query.MasterkeyID }
        });
      }
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      console.log("selectedOptions", selectedOptions);

      this.show = false;
      this.fieldValue = selectedOptions.map(option => option.label).join("/");
      this.datalist_ = selectedOptions;

      window.localStorage.setItem("datalist_", JSON.stringify(selectedOptions));

      this.province = selectedOptions[0].label; //省
      this.city = selectedOptions[1].label; //市
      this.Area = selectedOptions[2].label; //区

      // 福临门那边省市名
      var provinceNotData = ["北京市", "天津市", "上海市", "重庆市"];
      for (var value of provinceNotData) {
        if (selectedOptions[0].label == value) {
          this.province = value.split("市")[0]; //省
        }
      }

      // 北京市
      // provinceNotData

      var Secondary_ity = ["市辖区", "县"];
      for (var value of Secondary_ity) {
        if (selectedOptions[1].label == value) {
          console.log("value", value, selectedOptions[0].label);
          this.city = selectedOptions[0].label; //市
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background: #fff;
  height: 100%;

  // 地区
  .area {
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    margin: 2.5rem 1.13rem;
    .tit {
      font-size: 1.38rem;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #333333;
      line-height: 2.06rem;
      display: inline-block;
      margin-top: 2.06rem;
      margin-bottom: 4rem;
    }
  }
  /deep/.van-cell {
    padding: 0 1.69rem;
    .van-cell__title span {
      font-size: 0.88rem;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #333333;
      line-height: 1.31rem;
    }
  }
  .van-cell::after {
    border-bottom: 0;
  }
  // 下一步
  .submit {
    width: 8.75rem;
    height: 36px;
    background: #0579fc;
    border-radius: 18px;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 36px;
    display: inline-block;
    margin-bottom: 30px;
    margin-top: 2.69rem;
  }
}
</style>