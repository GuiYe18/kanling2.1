<!--
 * @Author: 飞
 * @Date: 2021-05-11 13:11:16
 * @LastEditTime: 2021-08-09 10:15:18
 * @FilePath: \you-shop1\src\views\Sifu\Sifu.vue
 * @Describe: 
-->
<template>
  <div id="content">
    <!-- 四扶选项 -->
    <van-radio-group v-model="figureSelection">
      <van-radio name="3">
        <template #icon="props">
          <div :class="props.checked ? 'Selected' : ''">
            <img v-show="!props.checked" src="./img/Low_cost.png" alt="" />
            <img v-show="props.checked" src="./img/Low_cost_ed.png" alt="" />
            <br /><span>低保户</span>
          </div>
        </template>
      </van-radio>
      <van-radio name="1">
        <template #icon="props">
          <div :class="props.checked ? 'Selected' : ''">
            <img v-show="!props.checked" src="./img/Disabled.png" alt="" />
            <img v-show="props.checked" src="./img/Disabled_ed.png" alt="" />
            <br /><span>残疾人</span>
          </div>
        </template>
      </van-radio>
      <van-radio name="2">
        <template #icon="props">
          <div :class="props.checked ? 'Selected' : ''">
            <img v-show="!props.checked" src="./img/MilitaryCommander.png" alt="" />
            <img v-show="props.checked" src="./img/MilitaryCommander_ed.png" alt="" />
            <br /><span>军烈属</span>
          </div>
        </template>
      </van-radio>
      <van-radio name="4">
        <template #icon="props">
          <div :class="props.checked ? 'Selected' : ''">
            <img v-show="!props.checked" src="./img/FiveGuaranteedHousehold.png" alt="" />
            <img v-show="props.checked" src="./img/FiveGuaranteedHousehold_ed.png" alt="" />
            <br /><span>五保户</span>
          </div>
        </template>
      </van-radio>
      <van-radio name="5">
        <template #icon="props">
          <div :class="props.checked ? 'Selected' : ''">
            <img v-show="!props.checked" src="./img/other.png" alt="" />
            <img v-show="props.checked" src="./img/other_ed.png" alt="" />
            <br /><span>其他</span>
          </div>
        </template>
      </van-radio>
    </van-radio-group>
    <!-- 四扶表格 -->
    <!-- 输入任意文本 -->
    <van-field v-model="useName" label="姓名" placeholder="请填写您的姓名" input-align="right" />
    <van-field v-model="useId" label="身份证号" placeholder="请填写您的身份证号码" input-align="right" />
    <van-field v-model="s_mobile" label="手机号" placeholder="请填写您的手机号" maxlength="11" type="tel" input-align="right" @blur="blur" />
    <van-field input-align="right" v-model="VerificationCode" type="number" label="验证码" maxlength="6" placeholder="请输入短信验证码">
      <template #button>
        <van-count-down v-show="!getVerificationCode" ref="countDown" millisecond :time="Calculatetime" :auto-start="false" format="ss" @finish="finish" @change="change" />
        <van-grid clickable v-show="getVerificationCode">
          <van-grid-item text="获取验证码" @click="start" />
        </van-grid>
      </template>
    </van-field>

    <span class="titPhotos">请上传证件照片(不少于2张,不大于6张)</span>

    <!-- <van-uploader :max-count="2" v-model="fileList" multiple :after-read="afterRead" :result-type='file'>
        <img src="./img/Photos.png" alt="" />
      </van-uploader> -->
    <!-- 法人身份证反面照片 -->
    <el-upload
      :limit="6"
      :on-exceed="handleExceed"
      action="https://tpkl.minpinyouxuan.com/index.php/api/image"
      list-type="picture-card"
      :auto-upload="true"
      :data="{ type: 1 }"
      :name="'image[]'"
      :on-success="IDPhoto"
      class="IDPhoto"
      :before-remove="beforeRemove"
    >
      <img src="./img/Photos.png" alt="" />
    </el-upload>

    <span class="StampFile">*请上传相关盖章文件</span>
    <!-- <van-uploader :max-count="2" v-model="fileList" multiple :after-read="afterRead" :result-type='file'>
        <img src="./img/Photos.png" alt="" />
      </van-uploader> -->
    <!-- 法人身份证反面照片 -->
    <el-upload
      :limit="1"
      :on-exceed="handleExceedProve"
      action="https://tpkl.minpinyouxuan.com/index.php/api/image"
      list-type="picture-card"
      :auto-upload="true"
      :data="{ type: 1 }"
      :name="'image[]'"
      :on-success="IDPhotoProve_S"
      class="IDPhoto"
      :before-remove="beforeRemoveProve"
    >
      <img src="./img/Photos.png" alt="" />
    </el-upload>

    <div class="commit" @click="NoAgree">
      <!-- <van-checkbox  v-model="checked" checked-color="#ee0a24" disabled>我已阅读并同意<span>申请及使用规则协议</span></van-checkbox> -->

      <van-checkbox v-show="!checked" v-model="checked" disabled icon-size="17px">我已阅读并同意<span>申请及使用规则协议</span></van-checkbox>
      <van-checkbox v-show="checked" v-model="checked" checked-color="#E60416" icon-size="17px">我已阅读并同意<span>申请及使用规则协议</span></van-checkbox>
    </div>
    <!-- 提交 -->
    <div class="btn" @click="submit">提交</div>
    <!--协议 -->
    <van-overlay v-show="protocolshow" :lock-scroll="false">
      <div class="wrapper">
        <div class="block">
          <Protocol />
          <div class="agree">
            <template>
              <div class="agreeLeft" @click="cancel" :class="AgreementAllowClick == false ? 'hide' : ''">不同意</div>
            </template>
            <div class="agreeRight" @click="confirm" :class="AgreementAllowClick == false ? 'hide' : ''">{{ AgreementText + AgreementTime + AgreementTimeUnit }}</div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Protocol from "./protocol";
import { Toast } from "vant";
import fun from "../../fun";
export default {
  data() {
    return {
      /**
       * @Author: 飞
       * @Date: 2021-07-05 15:42:46
       * @Describe: 相关文件证明
       */
      IDPhotoProve: "",
      // 协议
      // 协议同意文本
      AgreementText: "同意",

      // 协议同意倒计时 初始时间
      InitialTime: 6,
      // 协议同意倒计时 计算时间
      AgreementTime: 0,
      // 协议同意倒计时时间单位
      AgreementTimeUnit: "s",
      // 协议允许点击
      AgreementAllowClick: false,
      checked: false, //我已阅读并同意

      disabled: false,
      protocolshow: false,

      // 设置验证码时间
      Calculatetime: 60 * 1000,
      VerificationCode: "", //验证码
      // 验证码展示
      getVerificationCode: true,

      s_mobile: "", //手机号
      figureSelection: "", //选的哪个类型
      useName: "", //姓名
      useId: "", //身份证号,
      fileList: "", //照片
      uid: ""
    };
  },
  components: {
    Protocol
  },
  watch: {
    // 监控用户是否点击协议 (倒计时)
    protocolshow: function (N, O) {
      console.log("params", N, O);
      if (N == true) {
        this.AgreementTime = this.AgreementTime - 1;
      }
    },
    // 监控倒计时时间
    AgreementTime: function (N, O) {
      if (N >= 1) {
        setTimeout(() => {
          this.AgreementTime = this.AgreementTime - 1;
        }, 1000);
      }
      // 倒计时结束 时间.单位 清空  允许点击
      if (N < 1) {
        this.AgreementTime = "";
        this.AgreementTimeUnit = "";
        this.AgreementAllowClick = true;
      }
    },
    // 判断手机号输入的是否正确
    s_mobile: function (N, O) {
      console.log("s_mobile", N);
    }
  },
  activated() {
    // 格式化 数据
    (this.figureSelection = ""), //选的哪个类型
      (this.useName = ""), //姓名
      (this.useId = ""), //身份证号,
      (this.fileList = ""),
      (this.uid = JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid);

    this.NoAgree();
  },
  methods: {
    // // 上传照片提示
    // beforeAvatarUpload(file) {
    //   console.log("file.type", file.type);
    //   // 检查图片类型
    //   // 只能上传三种图片格式
    //   const isJPG = file.type === "image/jpeg";
    //   const isPNG = file.type === "image/png";
    //   const isBMP = file.type === "image/bmp";
    //   const isGIF = file.type === "image/gif";
    //   const isWEBP = file.type === "image/webp";
    //   const isPic = isJPG || isPNG || isBMP || isGIF || isWEBP;
    //   if (!isPic) {
    //     Toast("只能上传图片");
    //   }
    // },
    /**
     * @Author: 飞
     * @Date: 2021-07-05 15:48:36
     * @Describe: 删除相关文件
     */

    beforeRemoveProve(file, fileList) {
      this.IDPhotoProve = "";
    },
    //删除
    beforeRemove(file, fileList) {
      console.log("file.response.data.img_path", file.response.data.img_path);
      console.log('this.fileList.split(",")', this.fileList.split(","));
      var phopt = this.fileList.split(",");
      var split = "";

      for (let index = 0; index < phopt.length; index++) {
        if (phopt[index] != file.response.data.img_path) {
          if (index + 1 < fileList.length) {
            split = split + phopt[index] + ",";
          } else {
            split = split + phopt[index];
          }
          // console.log('phopt[index].toString()',phopt[index],file.response.data.img_path);
        }
      }

      this.fileList = split;
      console.log("删除剩", this.fileList);
    },

    // 用户点击不同意修改状态
    cancel() {
      if (this.AgreementAllowClick) {
        this.checked = false;
        this.protocolshow = false;
      }
    },
    // 用户点击同意修改状态
    confirm() {
      if (this.AgreementAllowClick) {
        this.checked = true;
        this.protocolshow = false;
      }
    },
    // 点击协议时   改变已同意的状态  (初始化)
    NoAgree() {
      // 初始化倒计时时间
      this.AgreementTime = this.InitialTime;
      this.protocolshow = !this.protocolshow;
      this.AgreementAllowClick = false;
    },

    // 正则验证手机号
    blur() {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!regMobile.test(this.s_mobile)) {
        Toast("请输入合法的手机号");
        return;
      }
    },
    // 倒计时变化时发生变化
    change() {
      this.getVerificationCode = false;
    },
    // 倒计时开始  获取验证码
    start() {
      if (this.s_mobile == "") {
        Toast("手机号不能为空");
        return;
      }

      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/identify",
        data: {
          phone: this.s_mobile
        }
      })
        .then(response => {
          if (response.data.result == 1) {
            Toast("发送成功");
            // 重置  开始 秒表
            this.$refs.countDown.reset();
            this.$refs.countDown.start();
          }
          if (response.data.result == 0) {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取验证码
    finish() {
      this.getVerificationCode = !this.getVerificationCode;
    },
    handleExceedProve(files, IDPhotoProve) {
      Toast(`已选中${IDPhotoProve.length}张,不得超过${IDPhotoProve.length}张`);
    },
    //证件照超过限制提示
    handleExceed(files, fileList) {
      Toast(`已选中${fileList.length}张,不得超过${fileList.length}张`);
    },

    /**
     * @Author: 飞
     * @Date: 2021-07-05 15:41:01
     * @Describe: 相关文件证明
     */
    IDPhotoProve_S(res) {
      console.log("res", res);
      if (res.result == "1") {
        this.IDPhotoProve = res.data.img_path;
      } else {
        Toast("只能上传图片");
      }
    },
    // //图片视频上传接口
    IDPhoto(res) {
      this.fileList = this.fileList.replace(",,", ",");
      if (res.result == "1") {
        if (this.fileList == "") {
          this.fileList = res.data.img_path;
          return;
        }

        if (this.fileList != "") {
          this.fileList = this.fileList + "," + res.data.img_path;
          // this.fileList = res.data.img_path;
          return;
        }
      } else {
        Toast("只能上传图片");
      }
      // this.fileList.push(res.data.img_path);
    },

    submit() {
      if (this.figureSelection == "") {
        Toast("请选择哪种类型");
        return;
      }
      if (this.useName == "") {
        Toast("请填写您的姓名");
        return;
      }
      if (this.useId == "") {
        Toast("请填写您的身份证号码");
        return;
      }
      if (this.s_mobile == "") {
        Toast("请填写您的手机号");
        return;
      }
      if (this.VerificationCode == "") {
        Toast("请填写接收到的验证码");
        return;
      }
      if (this.fileList.length == "") {
        Toast("请上传证件照片");
        return;
      }
      if (this.fileList.split(",").length < 2) {
        Toast("传证件照片不能少于2张");
        return;
      }
      if (this.IDPhotoProve.length == "") {
        Toast("请上传相关证件照片");
        return;
      }

      if (this.checked == false) {
        Toast("请点击我已阅读并同意捐赠协议并同意");
        return;
      }

      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v2/supportadd",
        data: {
          uid: Number(this.uid),
          s_name: this.useName,
          s_idcard: this.useId,
          s_type: Number(this.figureSelection),
          s_photo: this.fileList,
          s_mobile: this.s_mobile,
          code: this.VerificationCode,
          s_photo1: this.IDPhotoProve //相关文件
        }
      })
        .then(response => {
          if (response.data.data == 310) {
            Toast(response.data.msg);
            return;
          }
          if (response.data.result == 1) {
            this.$router.push({ name: "ComMit", params: {}, query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid } });
          }
          if (response.data.result == 0) {
            Toast(response.data.msg);
          }
        })
        .catch(error => {
          //
          Toast("信息填写有误,请认真填写");
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.figureSelected {
  color: red;
  background-repeat: no-repeat;
}

#content {
  background-color: #fff;
  .IDPhoto {
    /deep/.el-upload-list--picture-card {
      .el-upload-list__item {
        width: 300px;
        height: 184px;
      }
    }
    /deep/.el-upload {
      width: 300px;
      height: 184px;
      border: 0;
      margin-bottom: 10px;
      img {
        width: 100%;
      }
    }
  }
  //协议
  .van-overlay {
    .wrapper {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      // 垂直居中
      justify-content: center;
      .block {
        background: #fff;
        height: 500px;
        overflow: auto;
        border-radius: 18px;
        margin: 0 36px;
        .agree {
          height: 50px;
          width: 100%;
          border-top: 1px solid #f0f1f2;
          .hide {
            color: #999999;
          }
          .agreeLeft,
          .agreeRight {
            width: 50%;
            display: inline-block;
            line-height: 50px;
            text-align: center;
          }
          .agreeLeft {
            border-right: 1px solid #f0f1f2;
          }
        }
      }
    }
  }
  //我已阅读协议
  .commit {
    padding: 0 13px;
    margin: 23px 0;
    /deep/.van-checkbox__label {
      color: #666666;
      span {
        color: #e60416;
      }
    }
  }
  //   提交
  .btn {
    width: 300px;
    height: 36px;
    background: #e60416;
    border-radius: 18px;
    display: inline-block;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 36px;
    margin-bottom: 40px;
  }
  // //   预览照片
  // /deep/.van-uploader {
  //   .van-uploader__wrapper {
  //     flex-direction: column;
  //   }
  //   .van-image {
  //     width: 300px;
  //     height: 184px;
  //   }
  // }
  // titPhotos

  //
  .VerificationCode {
    border: 0;
    .van-button__content {
      width: 70px;
    }
  }
  /deep/.van-button--normal {
    padding-left: 8px;
    padding-right: 0;
  }
  .van-button:active::before {
    opacity: 0;
  }
  // 验证码
  /deep/.van-cell {
    .van-cell__value {
      height: 24px;
      .van-field__button {
        width: 80px;
        // 倒计时颜色
        .van-count-down {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #999999;
          line-height: 21px;
        }
        text-align: center;
        .van-hairline--top::after {
          border-top-width: 0;
        }
        .van-grid {
          display: inline-block;
          .van-grid-item__content::after {
            border-width: 0;
          }
          .van-grid-item__content--clickable:active {
            background-color: #fff;
          }
          .van-grid-item__content {
            padding: 0;
            span {
              font-size: 14px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #e60416;
              line-height: 21px;
            }
          }
        }
      }
    }
  }

  // 请上传证件照片(不少于2张,不大于6张)
  .titPhotos {
    display: block;
    text-align: justify;
    padding: 15px 15px 0 15px;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #333333;
    line-height: 21px;
  }
  //
  .StampFile {
    display: block;
    text-align: justify;
    padding: 0 15px 15px 15px;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: red;
    line-height: 21px;
  }
  //   四扶
  .van-radio-group {
    padding-top: 20px;
    .van-radio {
      display: inline-block;
      width: 19%;
      /deep/.van-radio__icon {
        width: 100%;
        display: inline-table;
        img {
          width: 64px;
          height: 64px;
        }
        span {
          font-size: 12px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #b2b2b2;
          line-height: 18px;
        }
        .Selected span {
          color: red;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
