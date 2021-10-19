<!--
 * @Author: 飞
 * @Date: 2021-09-24 17:31:06
 * @LastEditTime: 2021-10-17 17:18:13
 * @FilePath: \you-shop1\src\views\A_version_1.1\industry\Industrydetails.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-sticky>
      <van-nav-bar title="行业代表" name="arrow-left" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 头部 -->
    <!-- 表格 -->
    <div class="Grid">
      <van-cell-group class="BasicInformation">
        <van-cell title="姓名" :value="datas.name" />
        <van-cell title="联系电话" :value="datas.phone" />
      </van-cell-group>
      <van-cell-group class="BasicInformation">
        <!-- <van-cell title="预付金额" :value="datas.money" /> -->
        <van-cell title="推广余额" :value="datas.give_money" />
      </van-cell-group>
      <van-cell-group class="BasicInformation">
        <van-cell title="地区" :value="datas.mername" />
        <van-cell title="行业" :value="datas.industry_name" />
        <!-- <van-cell title="推荐人" :value="datas.tuid_phone" /> -->
        <van-cell title="推荐人手机号" :value="datas.tuid_phone" />
        <van-cell title="总店铺数量" :value="datas.count_num + '家'" />
        <van-cell title="已授权店铺数量" :value="datas.authorize_num + '家'" />
      </van-cell-group>

      <van-cell-group class="BasicInformation" v-show="true">
        <!-- 工作证 -->
        <van-cell v-if="datas.photo_card_work == ''" title="申请工作证" is-link @click="ToApplyForWorkPermit"></van-cell>
        <!-- <van-cell v-if="datas.photo_card_work != ''" title="申请工作证" is-link @click="ToApplyForWorkPermit"></van-cell> -->
        <van-cell v-else title="查看工作证" is-link @click="CheckTheEmployeesCard"></van-cell>
        <!-- 爱心大使 -->
        <van-cell v-if="datas.photo_card_honor == ''" title="申请爱心大使" is-link @click="ApplyForLoveMaster"></van-cell>
        <!-- <van-cell v-if="datas.photo_card_honor != ''" title="申请爱心大使" is-link @click="ApplyForLoveMaster"></van-cell> -->
        <van-cell v-else title="查看爱心大使" is-link @click="SeeTheGoodwillAmbassador"></van-cell>
        <!-- 授权 -->
        <van-cell v-if="datas.photo_card_empower == ''" title="申请授权" is-link @click="ApplyForAuthorization"></van-cell>
        <van-cell v-else title="查看授权" is-link @click="CheckTheAuthorization"></van-cell>
      </van-cell-group>
      <van-cell-group class="BasicInformation">
        <van-cell title="授权牌管理" is-link @click="AuthorizedBrandManagement" />
      </van-cell-group>
    </div>
    <!-- 申请工作证 -->
    <van-dialog v-model="show" title="填写工作证基本信息" :show-confirm-button="false">
      <van-field required v-model="workPermit.TheName" label="受托人姓名" placeholder="请输入受托人姓名" />
      <van-field required v-model="workPermit.TheTrusteeId" label="受托人身份证" placeholder="请输入受托人身份证" />
      <van-field required label="请上传艺术照" value="" disabled class="Arts" />
      <van-uploader v-model="fileList" :max-size="5000 * 1024" :max-count="1" :after-read="afterRead" />
      <div></div>
      <el-button class="cancel" @click="show = false">取消</el-button>
      <el-button class="Ack" @click="onConfirm">预览</el-button>
    </van-dialog>
    <!-- 工作证剪切 -->
    <el-dialog :visible.sync="RoundBroadcastCut" width="96%" class="Shear" :close-on-click-modal="false" @close="closeDialog">
      <div class="home" style="webkit-overflow-scrolling: touch; overflow-y: scroll">
        <vueCropper
          style="height: 300px"
          ref="cropper"
          :img="option.img"
          :autoCrop="option.autoCrop"
          :centerBox="option.centerBox"
          :fixedNumber="option.fixedNumber"
          :infoTrue="option.infoTrue"
          :fixed="option.fixed"
        ></vueCropper>
        <van-icon name="replay" size="24" @click="rotateLeft" class="Rotate" style="font-size: 24px; display: inline-block; line-height: 45px" />
        <van-button type="default" class="ConfirmShear" @click="save" style="vertical-align: bottom; margin-left: 34px; margin-top: 11px">确认剪切</van-button>
      </div>
    </el-dialog>
    <!-- 工作证预览 -->
    <van-dialog v-model="WorkPermitPreview_show" :show-confirm-button="false" class="Preview">
      <div class="imgDIV">
        <img :src="WorkPermitBase64" />
      </div>
      <el-button
        class="cancel"
        @click="
          () => {
            (WorkPermitPreview_show = false), (show = true);
          }
        "
        >重新上传</el-button
      >
      <el-button class="Ack" @click="SingnMeUp">申请</el-button>
    </van-dialog>

    <!-- 查看工作证 -->
    <van-popup v-model="reportlabel_show" class="Display_img">
      <img :src="datas.photo_card_work" alt="" /><br />
      <img src="./img/LCE_WORKPASS_bj_F.png" alt="" />
    </van-popup>
    <!-- 申请爱心大使 -->
    <van-dialog v-model="GoodwillAmbassador_show" title="填写爱心大使基本信息" :show-confirm-button="false">
      <van-field required v-model="loveName" label="爱心大使姓名" placeholder="请输入爱心大使姓名" />
      <el-button class="cancel" @click="GoodwillAmbassador_show = false">取消</el-button>
      <el-button class="Ack" @click="loveOnConfirm">确认</el-button>
    </van-dialog>

    <!-- 查看爱心大使 -->
    <van-popup v-model="missLookAmbassador_show" class="Ambassador_show">
      <img :src="datas.photo_card_honor" alt="" />
    </van-popup>
    <!-- 申请授权 -->
    <van-dialog v-model="PowerOfAttorney_ToView" title="填写授权书基本信息" :show-confirm-button="false">
      <van-field required v-model="authorizationName" label="授权书人姓名" placeholder="请输入授权书人姓名" />
      <el-button class="cancel" @click="PowerOfAttorney_ToView = false">取消</el-button>
      <el-button class="Ack" @click="ConfirmAuthorization">确认</el-button>
    </van-dialog>
    <!-- 查看授权 -->
    <van-popup v-model="PowerOfAttorney_show" class="Ambassador_show">
      <img :src="datas.photo_card_empower" alt="" />
    </van-popup>
    <canvas id="canvas" style="display: none"> </canvas>
  </div>
</template>

<script>
import { Toast } from "vant";
import data from "../NewDonation/data";
export default {
  data() {
    return {
      fileList: [], //
      datas: {},
      show: false, //申请工作证
      reportlabel_show: false, //查看工作证
      // 工作证资料
      workPermit: {
        TheName: "", //受托人姓名
        TheTrusteeId: "", //受托人身份证
        buddha: "" //工作证头像base64
      },
      employeeSZhao: "", //工作证  正片
      WorkPermitPicture: "", //工作证图片地址
      // 爱心大使信息
      GoodwillAmbassador_show: false, //申请爱心大使
      loveName: "", //爱心大师姓名
      photo_card_honor: "", //爱心大师图片地址
      missLookAmbassador_show: false, //查看爱心大使
      // 授权书
      PowerOfAttorney_ToView: false, //申请授权
      PowerOfAttorney_show: false, //申请授权
      authorizationName: "", //授权姓名
      // 剪切
      RoundBroadcastCut: false, //剪切
      ShearAction: false, //是否有剪切的动作
      option: {
        img: "", //裁剪图片的地址
        outputSize: 0.5, //裁剪生成图片的质量(可选0.1 - 1)
        outputType: "jpeg", //裁剪生成图片的格式（jpeg || png || webp）
        info: true, //图片大小信息
        canScale: true, //图片是否允许滚轮缩放
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 230, //默认生成截图框宽度
        autoCropHeight: 150, //默认生成截图框高度
        fixed: true, //是否开启截图框宽高固定比例
        fixedNumber: [1.5, 2.5], //截图框的宽高比例
        full: false, //false按原比例裁切图片，不失真
        fixedBox: true, //固定截图框大小，不允许改变
        canMove: false, //上传图片是否可以移动
        canMoveBox: true, //截图框能否拖动
        original: false, //上传图片按照原始比例渲染
        centerBox: true, //截图框是否被限制在图片里面
        height: true, //是否按照设备的dpr 输出等比例图片
        infoTrue: false, //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, //限制图片最大宽度和高度
        enlarge: 1, //图片根据截图框输出比例倍数
        mode: "230px 150px" //图片默认渲染方式
      },
      // 工作证预览
      WorkPermitPreview_show: false,
      WorkPermitBase64: ""
    };
  },

  methods: {
    /**
     * @Author: 飞
     * @Date: 2021-10-14 16:43:49
     * @Describe: 授权牌管理
     */
    AuthorizedBrandManagement(){
      // 跳转授权牌明细
        this.$router.push(this.fun.getUrl("ArrangeTableList", {},{industry_id:this.datas.id}));
    },
    // 确认剪切
    save() {
      this.ShearAction = true;
      this.$refs.cropper.getCropData(base64Data => {
        this.fileList[0].content = base64Data;
        this.workPermit.buddha = base64Data;
        this.RoundBroadcastCut = false;
      });
    },
  
    //  图片左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 关闭剪切板
    closeDialog() {
      // 判断是否有剪切的动作  进行下一步
      if (!this.ShearAction) {
        console.log("关闭剪切");
        this.fileList.pop();
      }
      this.ShearAction = false;
    },
    // 申请授权
    ApplyForAuthorization() {
      this.PowerOfAttorney_ToView = true;
    },
    // 查看授权
    CheckTheAuthorization() {
      this.PowerOfAttorney_show = true;
    },
    // 申请爱心大使
    ApplyForLoveMaster() {
      this.GoodwillAmbassador_show = true;
    },
    // 查看爱心大使
    SeeTheGoodwillAmbassador() {
      this.missLookAmbassador_show = true;
    },
    // 授权书确认
    ConfirmAuthorization() {
      // 判断姓名不能为空
      if (this.authorizationName == "") {
        Toast("必填项不能为空");
        return;
      }
      // 生成图片
      var canvas = document.getElementById("canvas");
      var cxt = canvas.getContext("2d");
      // var ratio = this.GenerateHd(cxt);
      // canvas.width = 319 * ratio;
      // canvas.height = 505 * ratio;
      canvas.width = 2480;
      canvas.height = 3508;
      var img = new Image();
      img.src = require("./img/authorization.jpg");
      // 图片加载完成，才可处理
      img.onload = () => {
        // 画图(这里画布与图片等宽高)
        // cxt.drawImage(img, 0, 0, 319 * ratio, 505 * ratio);
        cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 设置字体大小
        cxt.font = "70px Microsoft YaHei";
        // 更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
        // cxt.textBaseline = "middle";
        // cxt.textAlign = "center";
        // 文字颜色
        cxt.fillStyle = "#000000";
        // 文字在画布的位置
        cxt.fillText(this.authorizationName, 640, 1474);
        console.log("this.datas.mername.spli)", this.datas.mername.split(","));
        cxt.fillText(this.datas.mername.split(",")[1] + "  " + this.datas.mername.split(",")[2], 1110, 1474);

        this.AuthorizedSecondary(canvas.toDataURL("image/jpg"));
      };
      this.PowerOfAttorney_ToView = false;
    },
    // 授权二次
    AuthorizedSecondary(base64) {
      var that = this;
      // 生成图片
      var canvas = document.getElementById("canvas");
      var cxt = canvas.getContext("2d");

      canvas.width = 2480;
      canvas.height = 3508;

      var img = new Image();
      var img2 = new Image();
      img.src = base64;
      // 图片加载完成，才可处理
      img.onload = () => {
        cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 设置字体大小
        cxt.font = "56px Microsoft YaHei";
        // 文字颜色
        cxt.fillStyle = "#000000";
        // 文字在画布的位置
        let date = new Date();
        let year = date.getFullYear(); // 年
        let month = date.getMonth() + 1; // 月
        let day = date.getDate(); // 日
        cxt.fillText(year + "年" + month + "月" + day + "日", 1570, 2750);
        img2.src = require("./img/any.png");
        img2.onload = () => {
          // 设置二维码的大小
          cxt.drawImage(img2, 1590, 2410, 500, 500);
          // canvas.toDataURL("image/jpg");
          // 此时可以自行将文件上传至服务器
          let fd = new FormData();
          fd.append("image[]", this.dataURLtoFile(canvas.toDataURL("image/jpg"), "docpic.jpg")); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
          fd.append("type", 3);
          require;
          axios
            .post("https://tpkl.minpinyouxuan.com/index.php/api/image", fd, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
              var responseData = response.data;
              if (responseData.result == 1) {
                that.photo_card_empower = "https://" + responseData.data.img_path;
                that.AuthorizationToUpload();
              } else {
                Toast(responseData.msg);
                console.log(responseData.msg);
              }
            })
            .catch(error => {});
        };
      };
      this.GoodwillAmbassador_show = false;
    },
    // 爱心大师证书
    loveOnConfirm() {
      // 判断姓名不能为空
      if (this.loveName == "") {
        Toast("必填项不能为空");
        return;
      }

      // 生成图片
      var canvas = document.getElementById("canvas");
      var cxt = canvas.getContext("2d");
      // var ratio = this.GenerateHd(cxt);
      // canvas.width = 319 * ratio;
      // canvas.height = 505 * ratio;
      canvas.width = 2657;
      canvas.height = 1890;

      var img = new Image();
      img.src = require("./img/LoveAmbassador.jpg");
      // 图片加载完成，才可处理
      img.onload = () => {
        // 画图(这里画布与图片等宽高)
        // cxt.drawImage(img, 0, 0, 319 * ratio, 505 * ratio);
        cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 设置字体大小
        cxt.font = "96px Microsoft YaHei";
        // 更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
        // cxt.textBaseline = "middle";
        // cxt.textAlign = "center";
        // 文字颜色
        cxt.fillStyle = "#000000";
        // 文字在画布的位置
        cxt.fillText(this.loveName, 370, 870);
        this.SecondGeneration(canvas.toDataURL("image/jpg"));
      };
    },
    // 二次生成照片
    SecondGeneration(base64) {
      var that = this;
      // 生成图片
      var canvas = document.getElementById("canvas");
      var cxt = canvas.getContext("2d");

      canvas.width = 2657;
      canvas.height = 1890;

      var img = new Image();
      var img2 = new Image();
      img.src = base64;
      // 图片加载完成，才可处理
      img.onload = () => {
        cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 设置字体大小
        cxt.font = "40px Microsoft YaHei";
        // 文字颜色
        cxt.fillStyle = "#000000";
        // 文字在画布的位置
        let date = new Date();
        let year = date.getFullYear(); // 年
        let month = date.getMonth() + 1; // 月
        cxt.fillText(year + "年" + month + "月", 1950, 1560);
        img2.src = require("./img/any.png");
        img2.onload = () => {
          // 设置二维码的大小
          cxt.drawImage(img2, 1950, 1360, 290, 290);
          // canvas.toDataURL("image/jpg");
          // 此时可以自行将文件上传至服务器
          let fd = new FormData();
          fd.append("image[]", this.dataURLtoFile(canvas.toDataURL("image/jpg"), "docpic.jpg")); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
          fd.append("type", 3);
          require;
          axios
            .post("https://tpkl.minpinyouxuan.com/index.php/api/image", fd, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
              var responseData = response.data;
              if (responseData.result == 1) {
                that.photo_card_honor = "https://" + responseData.data.img_path;
                that.Ambassador(); //上传爱心大使
              } else {
                Toast(responseData.msg);
                console.log(responseData.msg);
              }
            })
            .catch(error => {});
        };
      };
      this.GoodwillAmbassador_show = false;
    },
    // 查看工作证
    CheckTheEmployeesCard() {
      this.reportlabel_show = true;
    },
    // 申请工作证
    ToApplyForWorkPermit() {
      this.show = true;
    },
    // 工作证提交
    SingnMeUp() {
      var that = this;
      this.$dialog
        .confirm({ message: "工作证仅有一次申请机会,请确保填写无误。" })
        .then(() => {
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
        })
        .catch(() => {});
    },
    // 工作证跳转基本信息
    onConfirm() {
      // 遍历对象   工作证基本信息是否填写完毕
      for (const key in this.workPermit) {
        if (this.workPermit[key] == "") {
          Toast("必填项不能为空");
          return;
        }
      }

      // 生成图片
      var canvas = document.getElementById("canvas");
      var cxt = canvas.getContext("2d");
      // var ratio = this.GenerateHd(cxt);
      // canvas.width = 319 * ratio;
      // canvas.height = 505 * ratio;
      canvas.width = 638;
      canvas.height = 1010;

      var img = new Image();
      let img2 = new Image();
      let img3 = new Image();
      let img4 = new Image();
      img.src = require("./img/LCE_WORKPASS_bj_Z.png");
      // 图片加载完成，才可处理
      img.onload = () => {
        // 画图(这里画布与图片等宽高)
        // cxt.drawImage(img, 0, 0, 319 * ratio, 505 * ratio);
        cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 设置字体大小
        cxt.font = "26px Microsoft YaHei";
        // 更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
        // cxt.textBaseline = "middle";
        // cxt.textAlign = "center";

        // 文字颜色
        cxt.fillStyle = "#000000";
        // 文字在画布的位置
        cxt.fillText(this.workPermit.TheName, 290, 668);
        cxt.fillText(this.workPermit.TheTrusteeId, 290, 732);
        canvas.toDataURL("image/jpg");
        // 将 img2 加入画布
        img2.src = this.workPermit.buddha;
        img2.onload = () => {
          // 设置二维码的大小
          cxt.drawImage(img2, canvas.width / 2 - 180, 100, 360, 500);
          canvas.toDataURL("image/jpg");
          img3.src = require("./img/any.png");
          img3.onload = () => {
            // 设置二维码的大小
            cxt.drawImage(img3, 340, 560, 290, 290);
            // canvas.toDataURL("image/jpg");
            // 此时可以自行将文件上传至服务器
            // 水印前的工作证照片
            this.employeeSZhao = canvas.toDataURL("image/jpg");
            img4.src = canvas.toDataURL("image/jpg");
            img4.onload = () => {
              // // 先把图片绘制到canvas上
              // cxt.drawImage(img4, 0, 0, canvas.width, canvas.height);
              // // 绘制水印到canvas上
              for (let i = 0; i < 8; i++) {
                cxt.rotate((-45 * Math.PI) / 180); // 水印初始偏转角度
                cxt.font = "50px microsoft yahei";
                cxt.fillStyle = "rgba(0,0,0,0.1)";
                for (let k = 0; k < 6; k++) {
                  // cxt.fillText(`预览`, 300 - k * 300, i * (200 + (k % 2) * 100));
                  cxt.fillText(`预览`, 300 - k * 200, i * 150);
                }
                cxt.rotate((45 * Math.PI) / 180); // 把水印偏转角度调整为原来的，不然他会一直转
              }
              // 打开预览
              this.WorkPermitPreview_show = true;
              // 水印照片
              this.WorkPermitBase64 = canvas.toDataURL("image/jpg");
            };
            return;
          };
        };
      };

      this.show = false;
      return;
      // 提交成功重新获取行业代表资料
      console.log("确认提交   提交成功");
      this.getDetails();
      setTimeout(() => {
        this.$router.push(this.fun.getUrl("LCE", {}));
      }, 500);
    },
    //工作证  上传信息
    uploadInformation() {
      var that = this;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v3/addphotos";
      axios({
        method: "POST",
        url,
        data: {
          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid, //uid
          id: this.datas.id,
          photo_card_work: this.WorkPermitPicture
        }
      }).then(res => {
        // console.log("resresresresresresresresres", res.data.data);
        if (res.data.result === 1) {
          that.datas = res.data.data;
          that.WorkPermitPreview_show = false; //关闭预览
          that.getDetails();
        } else {
          that.$dialog({ message: res.data.msg });
        }
      });
    },
    // 爱心大使上传
    Ambassador() {
      var that = this;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v3/addphotos";
      axios({
        method: "POST",
        url,
        data: {
          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid, //uid
          id: this.datas.id,
          photo_card_honor: this.photo_card_honor
        }
      }).then(res => {
        // console.log("resresresresresresresresres", res.data.data);
        if (res.data.result === 1) {
          that.getDetails();
        } else {
          that.$dialog({ message: res.data.msg });
        }
      });
    },
    // 授权上传
    AuthorizationToUpload() {
      var that = this;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v3/addphotos";
      axios({
        method: "POST",
        url,
        data: {
          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid, //uid
          id: this.datas.id,
          photo_card_empower: this.photo_card_empower
        }
      }).then(res => {
        // console.log("resresresresresresresresres", res.data.data);
        if (res.data.result === 1) {
          that.getDetails();
        } else {
          that.$dialog({ message: res.data.msg });
        }
      });
    },
    GenerateHd(context) {
      var backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
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
    // 点击上传照片后的回调
    afterRead(file) {
      console.log("file", file.content);
      // this.workPermit.buddha = file.content;
      /**
       * @Author: 飞
       * @Date: 2021-10-10 01:19:33
       * @Describe: 打开轮播截切
       */
      this.RoundBroadcastCut = true;
      this.option.img = file.content;

      return;
      var that = this;
      // 此时可以自行将文件上传至服务器
      let fd = new FormData();
      fd.append("image[]", file.file); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      fd.append("type", 1);
      axios
        .post("https://tpkl.minpinyouxuan.com/index.php/api/image", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData.result == 1) {
            that.workPermit.buddha = responseData.data.img_path;
          } else {
            Toast(responseData.msg);
            console.log(responseData.msg);
          }
        })
        .catch(error => {});
    },
    // 获取行业代表资料
    getDetails() {
      var that = this;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v3/industrys";
      axios({
        method: "POST",
        url,
        data: {
          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid //uid
        }
      }).then(res => {
        console.log("resresresresresresresresres", res.data.data);
        if (res.data.result === 1) {
          that.datas = res.data.data;
        } else {
          that.$dialog({ message: res.data.msg });
        }
      });
    },
    onClickLeft() {
      this.$router.push(this.fun.getUrl("member", {}));
    }
  },
  activated() {
    // 获取行业代表资料
    this.getDetails();
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
  }
  // 表格
  .Grid {
    margin: 0.56rem 0;
    // 姓名  电话
    .BasicInformation {
      margin: 0 0.56rem;
      margin-bottom: 0.63rem;
      border-radius: 0.75rem;
      /deep/.van-cell {
        border-radius: 0.75rem;
        .van-cell__title {
          text-align: left;
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #666666;
        }
        .van-cell__value {
          text-align: right;
          font-size: 0.88rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #444444;
        }
      }
    }
  }
  //填写资料
  /deep/.FillInTheInformation {
    width: 86%;
  }
  /deep/.van-field__label {
    color: #646566;
  }

  // 工作证基本信息
  /deep/.van-dialog {
    .van-dialog__header {
      padding: 18px;
    }
  }

  // 展示工作证
  .Display_img {
    width: 90%;
    height: 80%;
    border-radius: 8px;
    padding: 0.56rem 0.56rem 0 0.56rem;
    img {
      width: 100%;
      display: flex;
    }
  }
  /deep/.el-dialog__wrapper {
    z-index: 2999 !important;
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
  // 爱心大使查看
  .Ambassador_show {
    width: 100%;
    img {
      width: 100%;
      display: flex;
    }
  }
  // 工作证预览
  .Preview {
    .van-dialog__content {
      .imgDIV {
        padding: 0.56rem;
        padding-bottom: 0;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>