<!--
 * @Author: 飞
 * @Date: 2021-10-15 17:28:18
 * @LastEditTime: 2021-10-18 17:51:08
 * @FilePath: \you-shop1\src\views\A_version_1.1\industry\AddBrand.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-sticky>
      <van-nav-bar title="授牌申请" name="arrow-left" left-arrow @click-left="onClickLeft"> </van-nav-bar>
    </van-sticky>
    <!-- 申请内容 -->
    <section class="ApplyForContent"></section>
    <!-- 表格 -->
    <div class="Grid">
      <van-cell-group class="BasicInformation">
        <van-field v-model="formDta.username" required label="公司/商铺" placeholder="请填写您的公司或商铺名称" />
        <van-field v-model="formDta.BankAddress" is-link readonly label="地区(省/市)" required placeholder="请填写需要授牌的地址" @click="regionShow = true" />
        <van-popup v-model="regionShow" round position="bottom">
          <van-cascader v-model="cascaderValue" title="请选择地区" :options="options" :field-names="fieldNames" @close="regionShow = false" @finish="ONBankAddress" />
        </van-popup>
      </van-cell-group>
      <!-- 选择类别 -->
      <van-cell-group class="SelectTheNumberOf">
        <div class="tit">
          <!--  -->
          <p>*</p>
          <span>选择类别</span>
        </div>
        <!-- 单选 -->
        <div class="Radio">
          <span v-for="(item, i) in listdata" :key="i" :class="formDta.morenwei == item.id ? 'active' : ''" @click="open(item)">{{ item.name }}</span>
        </div>
      </van-cell-group>
      <van-cell-group class="BasicInformation">
        <van-field v-model="formDta.TheRecipientName" required label="牌匾收件人" placeholder="请填写牌匾收件人姓名" />
        <van-field v-model="formDta.TheRecipientPhone" required label="牌匾收件人电话" placeholder="请填写牌匾收件人联系电话" />
        <van-field v-model="formDta.DeliveryAddress" autosize type="textarea" required label="牌匾收件地址" placeholder="请填写您的牌匾邮寄地址" />
      </van-cell-group>
      <el-button class="submit" v-show="!ButtonIdentification">授牌预览</el-button>
      <el-button class="submit ok" @click="preview" v-show="ButtonIdentification">授牌预览</el-button>
    </div>
    <canvas id="canvas" style="display: none"> </canvas>
    <!-- 工作证预览 -->
    <van-dialog v-model="WorkPermitPreview_show" :show-confirm-button="false" class="Preview">
      <div class="imgDIV">
        <img :src="base64" />
      </div>
      <el-button
        class="cancel"
        @click="
          () => {
            (WorkPermitPreview_show = false), (show = true);
          }
        "
        >重填资料</el-button
      >
      <el-button class="Ack" @click="SingnMeUp">申请</el-button>
    </van-dialog>
  </div>
</template>

<script>
import { Toast } from "vant";
import VPinYin from "./vue-py.js";
import { regionData } from "element-china-area-data";
// import EventBus from "../../A_version_1.1/event-bus";
export default {
  data() {
    return {
      options: regionData, //地址库
      datalist: [],
      fieldNames: {
        //属性名 重置
        text: "label",
        value: "value",
        children: "children"
      },
      cascaderValue: "", //显示地址
      regionShow: false, //选择地区
      formDta: {
        username: "", //公司名称
        BankAddress: "", //地区 显示
        morenwei: 1, //自选默认
        TheRecipientName: "", //收件人
        TheRecipientPhone: "", //收件人电话
        DeliveryAddress: "" //收件地址
      },
      province_bank: "", //地区省编码
      province_text: "", //地区省名称
      zhixiashi: ["110000", "310000"], //直辖市
      listdata: [
        {
          name: "爱心企业",
          id: 1
        },
        {
          name: "爱心市场",
          id: 2
        },
        {
          name: "爱心驿站",
          id: 3
        },
        {
          name: "慈善商店",
          id: 4
        },
        {
          name: "慈善医养",
          id: 5
        },
        {
          name: "爱心单位",
          id: 6
        }
      ],
      ButtonIdentification: false, //提交按钮
      base64: "",
      TheCityCode: "", //市编码
      TheMunicipal: "", //市名
      SerialNumber_QName: "", //牌子编号测试,名
      IsBrandCode: "", //完整牌子编码
      textArr: [
        { name: 0, value: "〇" },
        { name: 1, value: "一" },
        { name: 2, value: "二" },
        { name: 3, value: "三" },
        { name: 4, value: "四" },
        { name: 5, value: "五" },
        { name: 6, value: "六" },
        { name: 7, value: "七" },
        { name: 8, value: "八" },
        { name: 9, value: "九" }
      ],
      WorkPermitPreview_show: false, //牌子预览
      employeeSZhao: "", //牌子  正片
      WorkPermitPicture: "", //牌子图片地址
      dart_name: "", //省首字母
      city_name: "", //市首字母
      number: "", //编号值  接收
      number_name: "" //编号名  接收
    };
  },
  watch: {
    formDta: {
      //监听的对象
      deep: true, //深度监听设置为 true
      handler: function (newV, oldV) {
        this.ButtonIdentification = this.dataOver();
      }
    }
  },
  activated() {
    // console.log('activated',this.options);
    // // 地址初始化  2级联动
    // var datalist = this.options;
    // datalist.forEach(item => {
    //   if (this.zhixiashi.indexOf(item.value) != -1) {
    //     item.children = item.children[0].children;
    //   } else {
    //     item.children.forEach(is => {
    //       delete is.children;
    //     });
    //   }
    // });
    // this.datalist = datalist
  },
  mounted() {
    // // 地址初始化  2级联动
    this.options.forEach(item => {
      if (this.zhixiashi.indexOf(item.value) != -1) {
        item.children = item.children[0].children;
      } else {
        item.children.forEach(is => {
          delete is.children;
        });
      }
    });
  },
  computed: {
    // // 地址初始化  2级联动
    // dizhi() {
    //   var datalist = this.options;
    //   datalist.forEach(item => {
    //     if (this.zhixiashi.indexOf(item.value) != -1) {
    //       item.children = item.children[0].children;
    //     } else {
    //       item.children.forEach(is => {
    //         delete is.children;
    //       });
    //     }
    //   });
    //   return datalist
    // }
  },
  methods: {
    //将base64转换为file
    dataURLtoFile: function (dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    // 授牌 换url
    SingnMeUp() {
      var that = this;
      let fd = new FormData();
      fd.append("image[]", this.dataURLtoFile(this.employeeSZhao, "docpic.jpg")); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      fd.append("type", 3);
      axios
        .post("https://tpkl.minpinyouxuan.com/index.php/api/image", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData.result == 1) {
            that.WorkPermitPicture = "https://" + responseData.data.img_path;
            that.uploadInformation(); //上传工作证
          } else {
            Toast(responseData.msg);
            console.log(responseData.msg);
          }
        })
        .catch(error => {});
    },
    // 授牌提交
    uploadInformation() {
      var that = this;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v3/add_grantbrand";
      axios({
        method: "POST",
        url,
        data: {
          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid, //uid
          industry_id: this.$route.query.industry_id, //行业代表主键id
          province: this.province_bank, //省代码
          addcode: this.TheCityCode, //省代码
          province_name: this.province_text, //北京市（河南省）
          addcode_name: this.TheMunicipal, //城区（周口市）
          industry_shopname: this.formDta.username, //公司名称
          industry_typename: this.listdata[this.formDta.morenwei - 1].name, //类别（爱心企业等）
          addressee: this.formDta.TheRecipientName, //收货人
          addressee_phone: this.formDta.TheRecipientPhone, //收货手机号
          address: this.formDta.DeliveryAddress, //详细地址
          industry_url: this.WorkPermitPicture, //图片链接
          number_name: this.number_name, //编号前缀
          number: this.number //编号后缀
        }
      }).then(res => {
        if (res.data.result === 1) {
          that.WorkPermitPreview_show = false; //关闭预览
          // this.$router.push(this.fun.getUrl("ArrangeTableList", {}, { industry_id: this.$route.query.industry_id }));
          that.$router.go(-1);
          Toast("授牌申请成功");
          
          EventBus.$emit("decreased");

          that.formDta.username = "";
          that.cascaderValue = ""; //地址清空
          that.formDta.morenwei = 1;
          that.formDta.TheRecipientName = "";
          that.formDta.TheRecipientPhone = "";
          that.formDta.DeliveryAddress = "";

          // that.getDetails();
        } else {
          that.$dialog({ message: res.data.msg });
        }
      });
    },
    //数字转中文
    numText(num) {
      var numArr = num.toString().split("");
      var that = this;
      var result = [];
      numArr.forEach(res => {
        that.textArr.forEach(item => {
          if (item.name == res) {
            result.push(item.value);
          }
        });
      });
      return result.join("");
    },
    //   预测 不能为空
    dataOver() {
      for (var item in this.formDta) {
        if (this.formDta[item] == "") {
          return false;
        }
      }
      return true;
    },

    //预览
    async preview() {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      var that = this;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v3/add_number";
      await axios({
        method: "POST",
        url,
        data: {
          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
          province: this.province_bank,
          addcode: this.TheCityCode,
          province_name: this.province_text,
          addcode_name: this.TheMunicipal
        }
      }).then(async res => {
        if (res.data.result === 1) {
          that.SerialNumber_QName = res.data.data.name;
          that.number = res.data.data.number;
          that.number_name = res.data.data.number_name;
        } else {
          Toast("获取牌子编号失败");
        }
      });
      console.log("this.province_text", this.province_text);
      console.log("this.province_text", this.TheMunicipal);
      // this.dart_name = VPinYin.chineseToPinYin(this.province_text);
      // this.city_name = VPinYin.chineseToPinYin(this.TheMunicipal);
      this.IsBrandCode = this.SerialNumber_QName; //完整牌子编码

      var canvas = document.getElementById("canvas");
      var cxt = canvas.getContext("2d");
      canvas.width = 1400;
      canvas.height = 900;
      var img = new Image();
      var img1 = new Image();
      img.src = require("./img/BJPT.jpg");
      img.onload = () => {
        cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
        cxt.font = "34px Microsoft YaHei";
        cxt.fillStyle = "#000000";
        cxt.fillText(this.IsBrandCode, 96, 780);
        this.TypeAssignment(canvas.toDataURL("image/jpg")); //类型赋值
      };
    },
    // 类型赋值
    TypeAssignment(base64s) {
      var name = this.listdata[this.formDta.morenwei - 1].name;
      var canvas = document.getElementById("canvas");
      var cxt = canvas.getContext("2d");
      canvas.width = 1400;
      canvas.height = 900;
      var img = new Image();
      img.src = base64s;
      img.onload = () => {
        cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
        cxt.font = "normal bold 90px Microsoft YaHei";
        cxt.fillStyle = "#c51a21";
        cxt.textAlign = "center";
        cxt.fillText(name, 700, 540);
        this.base64 = canvas.toDataURL("image/jpg");
        this.CompanyNameAssignment(this.base64);
      };
    },
    // 公司名称赋值
    CompanyNameAssignment(base64s) {
      var canvas = document.getElementById("canvas");
      var cxt = canvas.getContext("2d");
      canvas.width = 1400;
      canvas.height = 900;
      var img = new Image();
      img.src = base64s;
      img.onload = () => {
        cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
        cxt.font = "normal bold 60px Microsoft YaHei";
        cxt.fillStyle = "#000000";
        cxt.textAlign = "center";
        cxt.fillText(this.formDta.username, 700, 620);
        this.base64 = canvas.toDataURL("image/jpg");
        this.TimeFormat(this.base64);
      };
    },
    // 时间
    TimeFormat(base64s) {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      var canvas = document.getElementById("canvas");
      var cxt = canvas.getContext("2d");
      canvas.width = 1400;
      canvas.height = 900;
      var img = new Image();
      img.src = base64s;
      img.onload = () => {
        cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
        cxt.font = " 32px Microsoft YaHei";
        cxt.fillStyle = "#000000";
        cxt.fillText(this.numText(year) + "年" + this.numText(month) + "月", 900, 810);
        this.base64 = canvas.toDataURL("image/jpg");
        // 牌子正片照
        this.employeeSZhao = canvas.toDataURL("image/jpg");
        // 添加水印
        this.addTheWatermark(this.base64);
      };
    },
    // 添加水印
    addTheWatermark(base64s) {
      var canvas = document.getElementById("canvas");
      var cxt = canvas.getContext("2d");
      canvas.width = 1400;
      canvas.height = 900;
      var img = new Image();
      img.src = base64s;
      img.onload = () => {
        cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 16; i++) {
          cxt.rotate((-45 * Math.PI) / 180); // 水印初始偏转角度
          cxt.font = "50px microsoft yahei";
          cxt.fillStyle = "rgba(0,0,0,0.1)";
          for (let k = 0; k < 12; k++) {
            cxt.fillText(`预览`, 900 - k * 200, i * 150);
          }
          cxt.rotate((45 * Math.PI) / 180); // 把水印偏转角度调整为原来的，不然他会一直转
        }
        this.base64 = canvas.toDataURL("image/jpg");
        // 打开预览
        this.WorkPermitPreview_show = true;
        this.loading.close();
      };
    },

    // 选择类别
    open(item) {
      this.formDta.morenwei = item.id;
      this.original = item.original;
    },

    // 全部选项选择完毕后，会触发 finish 事件
    ONBankAddress({ selectedOptions }) {
      this.regionShow = false; //关闭地区
      this.formDta.BankAddress = selectedOptions.map(option => option.label).join("/"); //显示赋值
      this.province_bank = selectedOptions[0].value; //省编码
      this.province_text = selectedOptions[0].label; //省名

      this.TheCityCode = selectedOptions[1].value; //市编码
      this.TheMunicipal = selectedOptions[1].label; //市名

      // /**
      //  * @Author: 飞
      //  * @Date: 2021-10-17 00:47:12
      //  * @Describe:行业 市编码
      //  */
      // if (selectedOptions[0].value == "110000" || selectedOptions[0].value == "310000") {
      //   this.form.adress_city = selectedOptions[1].value;
      //   return;
      // } else {
      //   this.form.adress_city = selectedOptions[1].value;
      // }

      // if (this.zhixiashi.indexOf(selectedOptions[0].value) != -1) {
      //   if (selectedOptions[0].value == "110000") {
      //     this.city_bank = "110100";
      //   }
      //   if (selectedOptions[0].value == "310000") {
      //     this.city_bank = "310100";
      //   }
      // } else {
      //   this.city_bank = selectedOptions[1].value; //市
      // }

      console.log("cascaderValue", this.cascaderValue);
    },

    // 返回上一层
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  // 导航
  /deep/.van-nav-bar {
    .van-icon {
      color: #979797;
    }
    .van-nav-bar__title {
      font-size: 0.88rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 1.25rem;
    }
    .van-nav-bar__right .van-nav-bar__text {
      color: #121212;
    }
    .img {
      width: 1rem;
    }
  }
  // // 申请内容
  // .ApplyForContent {
  // }
  // 表格
  .Grid {
    margin: 0.56rem 0;
    // 姓名  电话
    .BasicInformation {
      margin: 0 0.56rem;
      border-radius: 0.75rem;
      margin-bottom: 0.56rem;
      /deep/.van-cell {
        border-radius: 0.75rem;
      }
    }
    // 选择类别
    .SelectTheNumberOf {
      margin: 0 0.56rem;
      border-radius: 0.75rem;
      margin-bottom: 0.56rem;
      .tit {
        font-size: 0.88rem;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #666666;
        line-height: 1.31rem;
        text-align: left;
        padding: 1.25rem 0 0.56rem 0.44rem;
        p {
          color: red;
          display: inline-block;
        }
      }
      .Radio {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0.25rem 0 0.56rem 1rem;
        span {
          width: 5.63rem;
          height: 1.88rem;
          border-radius: 0.19rem;
          border: 0.06rem solid #9e9e9e;
          display: inline-block;
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #666666;
          line-height: 1.88rem;
          margin-bottom: 0.63rem;
        }
        span:nth-child(3n + 2) {
          margin: 0 1.5rem;
        }
        .active {
          background: #0579fc;
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
    // 提交
    .submit {
      width: 18.75rem;
      height: 2.25rem;
      background: #d6d6d6;
      border-radius: 1.13rem;
      font-size: 1rem;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 2.25rem;
      display: inline-block;
      margin-bottom: 30px;
      margin-top: 3.06rem;
    }
    .ok {
      background: #0579fc;
    }
  }
  // 牌子证预览
  .Preview {
    width: 98%;
    .van-dialog__content {
      .imgDIV {
        padding: 0.2rem;
        padding-bottom: 0;
        img {
          width: 100%;
        }
      }
    }
    .cancel {
      width: 6rem;
      height: 36px;
      background: #908f8fa1;
      border-radius: 18px;
      font-size: 16px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 36px;
      display: inline-block;
      margin-bottom: 1rem;
      margin-top: 0.8rem;
      margin-right: 3rem;
    }
    .Ack {
      width: 6rem;
      height: 36px;
      background: #e60416;
      border-radius: 18px;
      font-size: 16px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 36px;
      display: inline-block;
      margin-bottom: 1rem;
      margin-top: 0.8rem;
    }
  }
}
</style>