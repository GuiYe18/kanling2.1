<template>
  <div id="income">
    <div class="supplier">
      <c-title :hide="false" text="基本信息"></c-title>
      <div style="height: 40px"></div>

      <div class="main">
        <!--已申请商铺   -->
        <div class="welcome">
          <h2 class="strong-title">认证信息</h2>
          <van-cell-group>
            <van-cell required title="商铺名称" :value="form.name" />
            <van-cell required title="营业执照" value="已认证" is-link @click="imagePreview" />
            <van-cell required title="经营场所" :value="form.sqnadress" is-link @click="tolocation" />

            <van-cell required title="地址" :value="Address" placeholder="请选择地址" is-link @click="show = true" />
            <van-popup v-model="show" round position="bottom">
              <van-cascader v-model="cascaderValue" title="请选择所在区域" :options="options" @close="show = false" @finish="onFinish" :field-names="fieldNames" />
            </van-popup>

            <van-cell required title="主体类型" :value="form.shopcate" />
            <!--   /**
               * @Author: 飞
               * @Date: 2021-10-17 01:14:34
               * @Describe: 选择行业
               */
              -->
            <van-field v-model="BankName" label="选择行业" is-link readonly required placeholder="请选择自己的行业" @click="ONBankName" />
          </van-cell-group>

          <h2 class="strong-title">基本信息</h2>
          <van-cell-group>
            <van-field required v-model="form.qsnphone" label="商铺电话" placeholder="请输入商铺电话" />
            <!-- <van-cell title="商铺地址" :value="form.sqnadress" is-link @click="tolocation" /> -->
            <van-cell required title="商铺分类" :value="form.catename" is-link @click="toCategory" />
          </van-cell-group>

          <van-cell required value="商铺介绍标题" :border="false" />
          <van-field v-model="form.qsntitle" type="textarea" rows="2" maxlength="28" show-word-limit placeholder="请输入商铺介绍标题…" />

          <van-cell required value="头部轮播图（最多3张）" :border="false" />
          <div class="upload-container">
            <div class="upload-item">
              <van-uploader v-model="rotationFileList" multiple :max-count="3" :after-read="afterReadRotation" @delete="handleDeleteRotation" />
            </div>
          </div>
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

          <van-cell required value="商铺LOGO" :border="false" />
          <div class="upload-container">
            <div class="upload-item">
              <van-uploader v-model="avatarFileList" multiple :max-count="1" :after-read="afterReadAvatar" @delete="handleDeleteAvatar" />
            </div>
            <div class="upload-item"></div>
            <div class="upload-item"></div>
          </div>

          <van-cell required value="商铺信息" :border="false" />
          <van-field v-model="form.qsntext" type="textarea" maxlength="1000" show-word-limit placeholder="请输入商铺介绍…" />

          <van-cell value="视频" :border="false" />
          <div class="upload-container">
            <div class="upload-item">
              <van-icon v-if="form.qsnvideo" name="delete" @click="handleDeleteVideo" />
              <video v-if="form.qsnvideo" :src="form.qsnvideo" controls disablePictureInPicture preload="none" controlslist="nodownload"></video>
              <van-uploader v-else v-model="videoFileList" multiple accept="video/*" :max-count="1" :after-read="afterReadVideo" @delete="handleDeleteVideo" />
            </div>
            <div class="upload-item"></div>
            <div class="upload-item"></div>
          </div>

          <van-cell required value="详情图片（最少3张,最多10张）" :border="false" />
          <div class="upload-container">
            <div class="upload-item">
              <van-uploader v-model="detailFileList" multiple :max-count="10" :after-read="afterReadDetail" @delete="handleDeleteDetail" />
            </div>
            <div class="upload-item"></div>
            <div class="upload-item"></div>
          </div>

          <van-button :disabled="isupLoad" type="info" block class="btn" @click="handleSubmit">提交</van-button>
        </div>
      </div>
    </div>
    <!-- 选择行业显示 -->
    <van-popup v-model="BankNameShow" position="bottom" :style="{ height: '60%' }">
      <!-- 选择行业       -->
      <van-field v-model="entering" label="选择行业" required placeholder="请简要输入行业的名称" />
      <van-list finished-text="没有更多了" error-text="本区域未获取到支行 请联系客服 客服电话:01053382256" :error.sync="error">
        <van-cell v-for="(item, i) in OpeningList" :key="i" :title="item.industry_name" @click="OpenBankDisplay(item)"  />
      </van-list>
    </van-popup>
  </div>
</template>
<script>
import cTitle from "components/title";
import ImgCropper from "components/ImgCropper";
import { Toast, ImagePreview } from "vant";
import { VueCropper } from "vue-cropper";
import Exif from "exif-js";
import { regionData } from "element-china-area-data";
export default {
  components: { cTitle, ImgCropper, VueCropper },
  data() {
    return {
      show: false, //展示隐藏
      cascaderValue: "", //展示
      options: regionData, //地址库
      fieldNames: {
        //属性名 重置
        text: "label",
        value: "value",
        children: "children"
      },
      BankNameShow: false, //行业弹窗开关
      entering: "", //行业搜索用
      OpeningList: [],
      OpeningListCS: [], //搜索用
      BankName: "", //行业名称

      ShearAction: false, //是否有剪切的动作
      Blob: [],
      RoundBroadcastCut: false, //轮播剪切
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
        fixedNumber: [2, 1], //截图框的宽高比例
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

      fixedNumber: [375, 146],
      isupLoad: false,
      rotationFileList: [],
      avatarFileList: [],
      videoFileList: [],
      detailFileList: [],
      form: {
        id: "", // 牛人ID
        name: "", // 牛人姓名
        sqnadress: "请选择地址",
        point: {}, // 经纬度
        qsncategory: "", // 类型id
        catename: "请选择分类",
        qsnphone: "", // 手机号
        qsntitle: "", // 简介标题
        topurl: "", //轮播图
        logourl: "", // 头像
        qsntext: "", // 介绍内容
        qsnvideo: "", // 视频
        texturl: "", // 详情图片
        qsnurl: "", // 营业执照
        uid: "", //uid
        typea: "", //类型
        adcode: "", //地址编码
        /**
         * @Author: 飞
         * @Date: 2021-10-17 01:04:14
         * @Describe: 2参数
         */
        adress_city: "", //行业市编码
        industry_cate: "" //行业id
      },
      Address: "" //地址
    };
  },
  mothods: {},
  watch: {
    $route: {
      handler(val) {
        const { params } = val;
        if (params.address) {
          this.form.sqnadress = `${params.city}${params.address}${params.title}`;
          this.form.point = params.point;
        }
        if (params.category) {
          this.form.qsncategory = params.category.id;
          this.form.catename = params.category.name;
        }
      }
    },
    /**
     * @Author: 飞
     * @Date: 2021-10-17 01:03:36
     * @Describe: 搜索
     */
    entering: function (newV, oldV) {
      if (this.entering.length > 0) {
        this.component();
      } else {
        this.OpeningList = this.OpeningListCS;
      }
    }
  },
  activated() {
    // console.log('attestationattestation',this.$route.query.attestation);
    this.form.typea = Number(window.localStorage.getItem("typea"));
  },
  beforeRouteEnter(to, from, next) {
    console.log("from", from);
    next(vm => {
      if (!(from.name === "classificationShop" || from.name === "o2oLocation_loc")) {
        vm.getValidInfo();
      }
    });
  },
  methods: {
    /**
     * @Author: 飞
     * @Date: 2021-10-17 01:03:27
     * @Describe: 搜索计算
     */
    component() {
      var applist = [];
      this.OpeningListCS.forEach(item => {
        if (item.industry_name.indexOf(this.entering) != -1) {
          applist.push(item);
        }
      });
      this.OpeningList = applist;
    },
    /**
     * @Author: 飞
     * @Date: 2021-10-17 01:04:48
     * @Describe: 行业选中
     */
    OpenBankDisplay(item) {

      this.BankName = item.industry_name; //行业名称
      this.form.industry_cate = item.id; //行业ID
      // 支行列表隐藏起来
      this.BankNameShow = false;
      this.entering = ""; //行业搜索成功之后关闭行业选择清空搜索值
    },
    /**
     * @Author: 飞
     * @Date: 2021-10-17 01:04:57
     * @Describe: 点击选择行业
     */
    ONBankName() {
      if (this.Address == "") {
        Toast("请先选择商铺地址");
        return;
      }
      // 获取行业列表
      this.getHylbCom();
      // 弹出框
      this.BankNameShow = true;
    },
    /**
     * @Author: 飞
     * @Date: 2021-10-17 01:05:15
     * @Describe: 获取行业列表
     */
    getHylbCom() {
      var that = this;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v3/industrycates";
      axios({
        method: "POST",
        url,
        data: {
          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
          adress_city: this.form.adress_city
        }
      }).then(async res => {
        if (res.data.result === 1) {
          that.OpeningList = res.data.data;
          that.OpeningListCS = res.data.data;
        } else {
          Toast("获取行业失败 请刷新页面");
        }
      });
    },

    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.show = false;
      this.Address = selectedOptions.map(option => option.label).join("/");
      this.form.adcode = selectedOptions[2].value; //编码
      /**
       * @Author: 飞
       * @Date: 2021-10-17 00:47:12
       * @Describe:行业 市编码  同牛人 添加
       */
      if (selectedOptions[0].value == "110000" || selectedOptions[0].value == "310000") {
        this.form.adress_city = selectedOptions[2].value;
        return;
      } else {
        this.form.adress_city = selectedOptions[1].value;
      }
    },

    // 关闭剪切板
    closeDialog() {
      // 判断是否有剪切的动作  进行下一步
      if (!this.ShearAction) {
        console.log("关闭剪切");
        this.rotationFileList.pop();
      }
      this.ShearAction = false;
    },

    //  图片左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },

    save() {
      console.log("确认剪辑", this.rotationFileList);
      // return
      // 用于上传后展示
      this.$refs.cropper.getCropData(base64Data => {
        this.rotationFileList[this.rotationFileList.lastIndex].content = base64Data;
      });
      //用于 新上传的 等待上传
      this.$refs.cropper.getCropBlob(getCropBlob => {
        // 存起来Blob
        getCropBlob["name"] = this.rotationFileList[this.rotationFileList.lastIndex].file.name;
        this.Blob.push(getCropBlob);

        const formData = new FormData();
        formData.append("type", 1);

        setTimeout(() => {
          formData.append("image[]", getCropBlob, Date.now() + ".jpg");
          this.isupLoad = true;
          var that = this;
          axios({
            method: "POST",
            url: "https://tpkl.minpinyouxuan.com/index.php/api/image",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
          })
            .then(res => {
              if (res.data.result === 1) {
                this.isupLoad = false;
                this.RoundBroadcastCut = false; //轮播剪切板关闭
                this.ShearAction = true; //是否有剪切的动作

                if (this.form.topurl == "") {
                  this.form.topurl = res.data.data.img_path;
                } else {
                  this.form.topurl = this.form.topurl.concat("," + res.data.data.img_path);
                }
              } else {
                Toast(res.data.msg);
              }
            })
            .catch(reason => {
              console.log(reason);
            });
          console.log("确认剪辑后", this.rotationFileList);
        }, 1000);
      });
    },

    // 图片预览
    imagePreview() {
      ImagePreview(this.form.qsnurl);
    },
    // 跳转到地图页面,路由o2oLocation_loc
    tolocation() {
      this.$router.push(this.fun.getUrl("o2oLocation", "", { tag: "shopsInfo" }));
    },
    // 跳转分类
    toCategory() {
      this.$router.push(this.fun.getUrl("classificationShop", "", { tag: "shopsInfo" }));
    },

    // 轮播上传
    async afterReadRotation(file, fileList) {
      this.RoundBroadcastCut = true; //打开剪贴板

      this.option.img = file.content;
      return;

      // console.log(this.rotationFileList)
      // this.rotationFileList = fileList
      const type = 1; // 图片类型
      const urlArr = [];
      const fileArr = [];
      this.rotationFileList.forEach(item => {
        if (item.url) {
          urlArr.push(item.url);
        } else {
          fileArr.push(item);
        }
      });
      const formData = this.generatorFormData(fileArr, type);
      this.form.topurl = urlArr.concat(await this.upload(formData)).join(",");
    },
    // 轮播删除
    async handleDeleteRotation(fileList) {
      // this.rotationFileList = fileList
      const type = 1; // 图片类型
      const urlArr = [];
      const fileArr = [];
      this.rotationFileList.forEach(item => {
        if (item.url) {
          urlArr.push(item.url);
        } else {
          // 新增Blob删除
          for (let index = 0; index < this.Blob.length; index++) {
            if (this.Blob[index].name == fileList.file.name) {
              this.Blob.splice(index, 1);
            }
          }

          fileArr.push(item);
        }
      });
      if (fileArr.length) {
        const formData = new FormData();
        formData.append("type", 1);
        for (let index = 0; index < this.Blob.length; index++) {
          formData.append("image[]", this.Blob[index], Date.now() + ".jpg");
        }

        this.form.topurl = urlArr.concat(await this.upload(formData)).join(",");
      } else {
        this.form.topurl = urlArr.join(",");
      }
    },

    // 头像上传
    async afterReadAvatar(file) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const type = 1; // 图片类型
      const urlArr = [];
      const fileArr = [];
      this.avatarFileList.forEach(item => {
        if (item.url) {
          urlArr.push(item.url);
        } else {
          fileArr.push(item);
        }
      });
      const formData = this.generatorFormData(fileArr, type);
      this.form.logourl = urlArr.concat(await this.upload(formData)).join(",");
      loading.close();
    },
    // 压缩
    compression(item) {
      var that = this;

      var fileData = {};
      var file = item.file;
      fileData["fileName"] = file.name;
      fileData["fileType"] = file.type;

      let self = that;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        console.log("Exif");

        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function () {
          // console.log(this.result);
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于500K,是就直接上传，反之压缩图片
          if (this.result.length <= 500 * 1024) {
            self.headerImage = this.result;
            // self.postImg();
          } else {
            img.onload = function () {
              // -----
              let canvas = document.createElement("canvas");
              let ctx = canvas.getContext("2d");
              //瓦片canvas
              let tCanvas = document.createElement("canvas");
              let tctx = tCanvas.getContext("2d");
              // let initSize = img.src.length;
              let width = img.width;
              let height = img.height;
              //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
              let ratio;
              if ((ratio = (width * height) / 4000000) > 1) {
                // console.log("大于400万像素");
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
              } else {
                ratio = 1;
              }
              canvas.width = width;
              canvas.height = height;
              //    铺底色
              ctx.fillStyle = "#fff";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              //如果图片像素大于100万则使用瓦片绘制
              let count;
              if ((count = (width * height) / 1000000) > 1) {
                // console.log("超过100W像素");
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                //      计算每块瓦片的宽和高
                let nw = ~~(width / count);
                let nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (let i = 0; i < count; i++) {
                  for (let j = 0; j < count; j++) {
                    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                  }
                }
              } else {
                ctx.drawImage(img, 0, 0, width, height);
              }
              //修复ios上传图片的时候 被旋转的问题
              if (Orientation != "" && Orientation != 1) {
                switch (Orientation) {
                  case 6: //需要顺时针（向左）90度旋转
                    this.rotateImg(img, "left", canvas);
                    break;
                  case 8: //需要逆时针（向右）90度旋转
                    this.rotateImg(img, "right", canvas);
                    break;
                  case 3: //需要180度旋转
                    this.rotateImg(img, "right", canvas); //转两次
                    this.rotateImg(img, "right", canvas);
                    break;
                }
              }
              //进行最小压缩
              let ndata = canvas.toDataURL("image/jpeg", 0.1);
              tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

              var arr = ndata.split(","),
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              var fileppp = {};
              fileppp["file"] = new File([u8arr], fileData.fileName, {
                type: fileData.fileType
              });
              console.log("fileppp", fileppp);
              return fileppp;
              // fileArr.push(fileppp);
              // -----
            };
          }
        };
      }
    },
    // 头像删除
    async handleDeleteAvatar(file) {
      console.log(this.rotationFileList, this.avatarFileList);
      const type = 1; // 图片类型
      const urlArr = [];
      const fileArr = [];
      this.avatarFileList.forEach(item => {
        if (item.url) {
          urlArr.push(item.url);
        } else {
          fileArr.push(item);
        }
      });
      const formData = this.generatorFormData(fileArr, type);
      this.form.logourl = urlArr.concat(await this.upload(formData)).join(",");
    },

    // 视频上传
    async afterReadVideo(file) {
      const type = 2; // 视频类型
      const formData = this.generatorFormData(this.videoFileList, type);
      this.form.qsnvideo = await this.upload(formData);
    },
    // 视频删除
    async handleDeleteVideo(file) {
      this.videoFileList = [];
      this.form.qsnvideo = "";
    },
    // 详情图片上传
    async afterReadDetail(file) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const type = 1; // 图片类型
      const urlArr = [];
      const fileArr = [];
      this.detailFileList.forEach(async item => {
        if (item.url) {
          urlArr.push(item.url);
        } else {
          // var item_S = await this.compression(item);
          fileArr.push(item);
        }
      });

      const formData = this.generatorFormData(fileArr, type);
      this.form.texturl = urlArr.concat(await this.upload(formData)).join(",");

      var p_url = [];
      if (this.form.texturl.indexOf(",") == -1) {
        p_url.push(this.form.texturl);
      } else {
        p_url = this.form.texturl.split(",");
      }
      this.detailFileList = this.imgReview(p_url);
      loading.close();
    },
    // 详情图片上传
    // async afterReadDetail(file) {
    //   const type = 1; // 图片类型
    //   const urlArr = [];
    //   const fileArr = [];

    //   for (let index = 0; index < this.detailFileList.length; index++) {
    //     var item = this.detailFileList[index];

    //     if (item.url) {
    //       urlArr.push(item.url);
    //     } else {
    //       // console.log("await this.compression(item)");
    //       // await console.log("this.compression(item)", this.compression(item));
    //       // await this.compression(item);
    //       console.log("ssssssss");
    //       // await fileArr.push(await this.compression(item)); //压缩
    //       // console.log("sssss");
    //       fileArr.push(item);
    //     }
    //   }

    //   // this.detailFileList.forEach(item => {
    //   //   if (item.url) {
    //   //     urlArr.push(item.url);
    //   //   } else {
    //   //     await this.compression(item); //压缩
    //   //     // fileArr.push(item);
    //   //   }
    //   // });

    //   // setTimeout(() => {
    //   //   console.log('fileArr',fileArr);
    //     const formData = this.generatorFormData(fileArr, type);
    //     this.form.texturl = urlArr.concat(await this.upload(formData)).join(",");
    //   // }, 2000);
    // },
    // 详情图片删除
    async handleDeleteDetail(file) {
      const type = 1; // 图片类型
      const urlArr = [];
      const fileArr = [];
      this.detailFileList.forEach(item => {
        if (item.url) {
          urlArr.push(item.url);
        } else {
          fileArr.push(item);
        }
      });
      const formData = await this.generatorFormData(fileArr, type);
      this.form.texturl = urlArr.concat(await this.upload(formData)).join(",");
    },

    // 生成FormData
    generatorFormData(array, type) {
      console.log("array", array);
      const len = array.length;
      if (!len) return;
      const formData = new FormData();
      formData.append("type", type);
      for (let i = 0; i < len; i++) {
        formData.append("image[]", array[i].file);
      }
      return formData;
    },

    // 提交
    handleSubmit() {
      if (this.form.name == "") {
        this.$dialog({
          message: "请填写牛人姓名"
        });
        return;
      }
      if (this.form.sqnadress == "") {
        this.$dialog({
          message: "请填写牛人地址"
        });
        return;
      }
      if (this.form.qsnphone == "") {
        this.$dialog({
          message: "请填写牛人电话"
        });
        return;
      }
      if (this.form.catename == "请选择分类" || this.form.catename == "") {
        this.$dialog({
          message: "请选择分类"
        });
        return;
      }
      if (this.form.adress_city == "") {
        this.$dialog({
          message: "请选择行业"
        });
        return;
      }
      if (this.form.topurl == "") {
        this.$dialog({
          message: "请上传头部轮播图"
        });
        return;
      }
      if (this.form.qsntext == "") {
        this.$dialog({
          message: "请填写牛人信息"
        });
        return;
      }
      if (this.form.catename == "请选择分类") {
        this.$dialog({
          message: "请选择分类"
        });
        return;
      }
      const length = this.form.texturl.split(",").length;
      if (length < 3) {
        this.$dialog({
          message: "请至少上传3张详情图片!"
        });
        return;
      }
      this.requestToSave(this.form);
    },

    // 获取认证信息
    getValidInfo() {
      /**
       * @Author: 飞
       * @Date: 2021-05-25 18:19:27
       * @Describe:
       */
      // const data = { uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid, id: "" };
      const data = { uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid, id: Number(window.localStorage.getItem("sid")) };
      this.form.uid = JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/basicname";
      return axios({
        method: "post",
        url: url,
        data
      })
        .then(res => {
          if (!res.data.result) return;
          this.form.id = res.data.data.id;
          this.form.name = res.data.data.qsn_name;
          this.form.sqnadress = res.data.data.sqnadress;
          this.form.qsnphone = res.data.data.qsnphone;
          this.form.catename = res.data.data.catename;
          this.form.qsntitle = res.data.data.qsntitle;

          this.form.qsntext = res.data.data.qsntext;
          this.form.shopcate = res.data.data.shopcate;
          this.form.qsnurl = res.data.data.qsnurl;

          // 轮播图
          this.form.topurl = res.data.data.topurl.length
            ? this.imgReview(res.data.data.topurl)
                .map(item => item.url)
                .join(",")
            : "";

          this.rotationFileList = res.data.data.topurl.length ? this.imgReview(res.data.data.topurl) : [];
          // 头像
          this.form.logourl = res.data.data.logourl;
          this.avatarFileList = res.data.data.logourl.length ? [{ url: res.data.data.logourl, isImage: true }] : [];
          // 详情图片
          this.form.texturl = res.data.data.texturl.length
            ? this.imgReview(res.data.data.texturl)
                .map(item => item.url)
                .join(",")
            : "";
          this.detailFileList = res.data.data.texturl.length ? this.imgReview(res.data.data.texturl) : [];
          // 视频
          this.form.qsnvideo = res.data.data.qsnvideo;
          this.videoFileList = [{ url: res.data.data.qsnvideo, isImage: true }];
        })
        .catch(reason => {
          console.log(reason);
        });
    },
    // 图片回显
    imgReview(data) {
      if (data && data.length) {
        return data.map(item => {
          if (item.indexOf("https") == -1) {
            item = "https://" + item;
          }
          return {
            url: item,
            isImage: true
          };
        });
      }
    },
    // 上传方法
    upload(formData) {
      this.isupLoad = true;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/image";
      let headers = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      return axios({
        method: "POST",
        url: url,
        data: formData
      })
        .then(res => {
          if (res.data.result === 1) {
            this.isupLoad = false;
            return res.data.data ? res.data.data.img_path.split(",") : [];
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(reason => {
          console.log(reason);
        });
    },
    // 提交接口
    requestToSave(formData) {
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/save";
      return axios({
        method: "POST",
        url: url,
        data: formData
      })
        .then(res => {
          if (res.data.result === 1) {
            this.$router.push(this.fun.getUrl("enterpriseInfoSubmitSuccess"));
            return res.data;
          }
          if (res.data.result === 0) {
            Toast(res.data.msg);
            // if ((res.data.msg = "地址code不能为空")) {
            //   Toast("请选择地址再提交");
            // }
          }
        })
        .catch(reason => {
          console.log(resson);
        });
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#tips {
  text-align: left;
  color: #ff5d5c;
  font-size: 12px;
  display: inline-block;
  padding-left: 12px;
}

.el-input__icon.el-icon-caret-top {
  color: #b8b8b8;
}

.el-input__inner {
  border: 0.0625rem solid #b8b8b8;
  font-size: 12px;
}

.el-select {
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 2rem;
  border-radius: 0.3125rem;
  box-sizing: border-box;
  outline: none;
}

.delimg {
  position: absolute;
  top: 0rem;
  right: 0rem;
  height: 1.25rem;
  width: 1.875rem;
  color: #fff;
  background-color: red;
}

#income {
  /**
   * @Author: 飞
   * @Date: 2021-10-17 01:20:38
   * @Describe: 
   */
  /deep/.van-popup {
    .van-cell--required {
      .van-cell__value {
        .van-field__control {
          text-align: left;
        }
      }
    }
    .van-list {
      .van-cell {
        display: block;
        .van-cell__title {
          text-align: center;
        }
      }
    }
  }
  h3 {
    background: #f5f5f5;
    margin: 0;
    padding: 0 0.625rem;
    text-align: left;
    font-weight: normal;
    font-size: 12px;
    height: 2rem;
    box-sizing: border-box;
    line-height: 2rem;
    span {
      color: #999;
    }
  }
}

a {
  text-decoration: none;
  color: #222;
}

input {
  border-width: 0;
  position: absolute;
  right: 0px;
}

.list-ul img {
  width: 80%;
  height: 80%;
}

.list-ul {
  display: flex;
  flex-direction: column;
}

.image-list {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0.75rem 0;
  margin-top: -0.625rem;
  .otherphoto {
    .photobox {
      position: relative;
      width: 5rem;
      height: 5rem;
      border: 1px dashed #c0ccda;
      margin-right: 0.2rem;
      margin-left: 0.2rem;
      margin-bottom: 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
      i {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        background: url("../../../assets/images/close_iocn.png");
        background-size: 100%;
      }
    }
  }
}

.list-default-img {
  height: 3.125rem;
  text-align: left;
  padding-left: 0.75rem;
}

.supplier .banner img {
  width: 100%;
}

.supplier .main {
  position: relative;
  top: -0.25rem;
}

.welcome {
  .CanTChoose {
    color: #979797;
  }
  padding: 0.625rem;
  background: #ffffff;
  .text {
    p {
      font-size: 12px;
      color: #666;
      line-height: 1.2rem;
      margin-top: 0;
      span {
        color: #f55955;
      }
    }
  }
  .info {
    margin-top: 0.625rem;
    input {
      position: relative;
      display: block;
      margin-bottom: 0.5rem;
      width: 100%;
      height: 2rem;
      border-radius: 0.3125rem;
      padding: 0 0.3125rem;
      box-sizing: border-box;
      outline: none;
    }

    .inp1 {
      border: 0.0625rem solid #b8b8b8;
    }

    .inp {
      border: 0.0625rem solid #b8b8b8;
    }
    .inp:focus {
      border-color: #f55955;
      box-sizing: border-box;
    }
    span {
      color: #f55955;
    }
    .btn {
      background: #f55955;
      color: #ffffff;
      margin-bottom: 0.5rem;
      width: 100%;
      height: 2rem;
      border-radius: 0.3125rem;
      padding: 0 0.3125rem;
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      line-height: 2rem;
      i {
        display: inline-block;
      }
    }
    .btn:focus {
      background: #d8403c;
    }
  }
}

.supplier .main .vip_main {
  background: #ffffff;
  margin: 0.9375rem 0;
  .title {
    padding: 0.625rem;
    font-size: 12px;
    border-bottom: 0.0625rem solid #eeeeee;
    text-align: center;
  }
  .vip {
    padding: 0.9375rem 0.625rem;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    .ico1,
    .ico2 {
      width: 15%;
      float: left;
    }
    .ico1 {
      i {
        background: #32cd32;
      }
    }
    .ico2 {
      i {
        background: #fece00;
      }
    }
    .text {
      float: left;
      width: 100%;
      .t1 {
        font-size: 16px;
        color: #333;
        margin-bottom: 0.3125rem;
        text-align: left;
      }
      .t2 {
        text-align: justify;
      }
    }
    i {
      background: #32cd32;
      height: 2.25rem;
      width: 2.25rem;
      border-radius: 1.125rem;
      color: #fff;
      text-align: center;
      line-height: 2.375rem;
      font-size: 1.25rem;
    }
  }
  .vip1 {
    border-bottom: 0.0625rem solid #eeeeee;
  }
}

.supplier .success {
  height: 12.5rem;
  padding-top: 4.0625rem;
  background: #ffffff;
  .ico {
    height: 4.0625rem;
    width: 4.0625rem;
    margin: auto;
    border: 0.1875rem solid #32cd32;
    border-radius: 4rem;
    color: #32cd32;
    font-size: 2.3rem;
    text-align: center;
    line-height: 4rem;
  }
  .text {
    height: 2rem;
    margin-top: 1.875rem;
    color: #666;
    line-height: 1.6rem;
    text-align: center;
  }
  a .sub {
    height: 2rem;
    width: 80%;
    background: #f55955;
    margin: 1.25rem auto;
    border-radius: 2rem;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    font-size: 14px;
    margin-bottom: 1.25rem;
  }
  a .sub:focus {
    background: #d8403c;
  }
}
.imgflex {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.strong-title {
  padding: 0.875rem 0;
  font-size: 16px;
  color: #333333;
  line-height: 22px;
  text-align: left;
  font-weight: 500;
}

.upload-container {
  display: flex;
  padding-left: 0.875rem;
}

video {
  width: 16.875rem;
  height: 9.5rem;
  border: 1px dashed #ccc;
}
.btn {
  margin: 5rem 0 3.0625rem;
}

/deep/ .van-cell__title {
  flex: 0 0 6rem;
  text-align: left;
}
/deep/ .van-field__control {
  text-align: right;
}
/deep/ textarea.van-field__control {
  text-align: left;
}
// 剪切图片
</style>
