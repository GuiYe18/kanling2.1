<template>
  <div id="income">
    <div class="supplier">
      <c-title :hide="false" text="基本信息"></c-title>
      <div style="height: 40px"></div>

      <div class="main">
        <!--申请   -->
        <div class="welcome">
          <h2 class="strong-title">牛人信息</h2>
          <van-cell-group>
            <!-- <van-cell title="牛人姓名" :value="form.name" /> -->
            <van-field required label="牛人姓名" v-model="form.name" placeholder="请输入牛人姓名" />
            <van-cell required title="牛人地址" :value="form.sqnadress" placeholder="请选择牛人地址" is-link @click="show = true" />
            <van-popup v-model="show" round position="bottom">
              <van-cascader v-model="cascaderValue" title="请选择所在区域" :options="options" @close="show = false" @finish="onFinish" :field-names="fieldNames" />
            </van-popup>
            <!-- <van-cell title="身份证" value="已认证" is-link @click="imagePreview" /> -->
            <!-- <van-cell title="民族" :value="form.shopcate" /> -->
            <!-- </van-cell-group> -->

            <!-- <h2 class="strong-title">基本信息</h2> -->
            <!-- <van-cell-group> -->
            <van-field required v-model="form.qsnphone" label="牛人电话" placeholder="请输入牛人电话" />

            <!-- <van-cell required title="商铺地址" :value="form.sqnadress" is-link @click="show = true" /> -->

            <van-cell required title="牛人分类" :value="form.catename" is-link @click="toCategory" />
            <!-- 选择行业       -->
            <van-field v-model="BankName" label="选择行业" is-link readonly required placeholder="请选择自己的行业" @click="ONBankName" />
          </van-cell-group>

          <van-cell required value="牛人介绍标题" :border="false" />
          <van-field v-model="form.qsntitle" type="textarea" rows="2" maxlength="28" show-word-limit placeholder="请输入牛人介绍标题…" />

          <van-cell required value="三张主图" :border="false" />
          <div class="upload-container">
            <div class="upload-item">
              <van-uploader v-model="rotationFileList" :max-count="3" :after-read="afterReadRotation" @delete="handleDeleteRotation" />
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

          <!-- <van-cell required value="头部轮播图（ssss最多3张）" :border="false" />
          <div class="upload-container">
            <img-cropper
              :file-list="rotationFileList"
              :limit="3"
              :fixed-number="fixedNumber"
              @after-read="afterReadRotation"
              @after-del="handleDeleteRotation"
             />
          </div> -->

          <van-cell required value="牛人头像" :border="false" />
          <div class="upload-container">
            <div class="upload-item">
              <van-uploader v-model="avatarFileList" multiple :max-count="1" :after-read="afterReadAvatar" @delete="handleDeleteAvatar" />
            </div>
            <div class="upload-item"></div>
            <div class="upload-item"></div>
          </div>

          <van-cell required value="牛人信息" :border="false" />
          <van-field v-model="form.qsntext" type="textarea" maxlength="1000" show-word-limit placeholder="请输入牛人介绍" />

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

          <van-cell required value="详情图片（最少3张）" :border="false" />
          <div class="upload-container">
            <div class="upload-item">
              <van-uploader v-model="detailFileList" multiple  :after-read="afterReadDetail" @delete="handleDeleteDetail" />
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
        <!-- <van-cell v-for="(item, i) in OpeningList" :key="i" :title="item.industry_name" @click="OpenBankDisplay(item)" :class="item.type == true ? 'CanTChoose' : ''" /> -->
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
import { regionData } from "element-china-area-data";
import { EventBus } from "../../A_version_1.1/event-bus.js";
export default {
  components: { cTitle, ImgCropper, VueCropper },
  data() {
    return {
      /**
       * @Author: 飞
       * @Date: 2021-10-17 01:04:23
       * @Describe: 9参数
       */
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
        attestation: 0,
        uid: "", // 牛人ID
        name: "", // 牛人姓名
        sqnadress: "",
        shopcate: "",
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
        qsnurl: "", // 身份证
        typea: 3, //类型
        adcode: "", //地址区编码
        /**
         * @Author: 飞
         * @Date: 2021-10-17 01:04:14
         * @Describe: 2参数
         */
        adress_city: "", //行业市编码
        industry_cate: "" //行业id
      },
      loading: ""
    };
  },
  watch: {
    $route: {
      handler(val) {
        console.log("val", val);
        const { params } = val;
        if (params.address) {
          this.form.sqnadress = `${params.city}${params.address}${params.title}`;
          this.form.point = params.point;
        }
        /**
         * @Author: 飞
         * @Date: 2021-09-27 17:17:55
         * @Describe: 干掉路由传参  新增全局事件总线__niuClassify
         * 解决选择分类之后数据消失
         * @param {*} params
         */
        // if (params.category) {
        //   this.form.qsncategory = params.category.id;
        //   this.form.catename = params.category.name;
        // }
      }
    },
    "form.texturl": {
      handler: function () {
        console.log("form.texturl", this.form.texturl);
      },
      // 开启深度监听：只要obj中的任何一个属性发生改变，都会触发相应的代码
      deep: true
    },
    // 深度监听form
    form: {
      handler(Nol, Val) {
        // 牛人申请草稿箱存
        localStorage.setItem("ApplicantsForTheDraftBox", JSON.stringify(Nol));
      },
      deep: true
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
  // created() {
  //   this.getValidInfo()
  // },
  activated() {
    this.form.attestation = this.$route.query.attestation;
    // this.form.typea = Number(window.localStorage.getItem("typea"));
    // 判断是不是保存的草稿
    if (JSON.parse(localStorage.getItem("ApplicantsForTheDraftBox")) != null) {
      // 牛人申请草稿箱取
      this.form = JSON.parse(localStorage.getItem("ApplicantsForTheDraftBox"));
      // 详情图片
      var texturl = this.form.texturl.split(",");
      var topurl = this.form.topurl.split(",");
      var logourl = this.form.logourl.split(",");
      this.detailFileList = texturl.length ? this.imgReview(texturl) : [];
      this.rotationFileList = topurl.length ? this.imgReview(topurl) : [];
      this.avatarFileList = logourl.length ? this.imgReview(logourl) : [];
    }
  },
  mounted() {
    // 全局事件总线(被动) 浏览
    EventBus.$on("niuClassify", item => {
      this.$nextTick(() => {
        this.form.qsncategory = item.category.id;
        this.form.catename = item.category.name;
      });
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!(from.name === "classificationPeople" || from.name === "o2oLocation_loc")) {
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
      if (this.form.sqnadress == "") {
        Toast("请先选择牛人地址");
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
      console.log('selectedOptions',selectedOptions);
      this.show = false;
      this.form.sqnadress = selectedOptions.map(option => option.label).join("/");
      this.form.adcode = selectedOptions[2].value; //地区区编码
      /**
       * @Author: 飞
       * @Date: 2021-10-17 00:47:12
       * @Describe:行业 市编码
       */
      if (selectedOptions[0].value == "110000" || selectedOptions[0].value == "310000") {
        this.form.adress_city = selectedOptions[2].value;
        return;
      } else {
        this.form.adress_city = selectedOptions[1].value;
      }
      console.log();
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
        }, 1000);
      });
    },

    // 生成FormData
    generatorFormData(array, type) {
      const len = array.length;
      if (!len) return;
      const formData = new FormData();
      formData.append("type", type);
      for (let i = 0; i < len; i++) {
        formData.append("image[]", array[i].file);
      }
      return formData;
    },
    // 图片预览
    imagePreview() {
      ImagePreview(this.form.qsnurl);
    },
    // 跳转分类
    toCategory() {
      this.$router.push(this.fun.getUrl("classificationPeople", "", { tag: "strongManInfoNew", attestation: this.form.attestation }));
    },
    // 从localStorage获取参数
    getParams() {
      // const params = JSON.parse(localStorage.getItem('strongMan'))
      // this.form.name = params.name
    },

    // 轮播上传
    async afterReadRotation(file, fileList) {
      /**
       * @Author: 飞
       * @Date: 2021-07-02 15:56:30
       * @Describe: 打开轮播截切
       */
      this.RoundBroadcastCut = true;
      this.option.img = file.content;

      return;
    },
    // 轮播删除
    async handleDeleteRotation(fileList) {
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
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const type = 2; // 视频类型
      const formData = this.generatorFormData(this.videoFileList, type);
      this.form.qsnvideo = await this.upload(formData);
      console.log("this.form.qsnvideo", this.form.qsnvideo);
      // 如果返回的是undefined 清空
      if (this.form.qsnvideo == undefined) {
        this.videoFileList = [];
        this.form.qsnvideo = "";
      }
      loading.close();
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

      this.detailFileList.forEach(item => {
        if (item.url) {
          urlArr.push(item.url);
        } else {
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
      const formData = this.generatorFormData(fileArr, type);
      this.form.texturl = urlArr.concat(await this.upload(formData)).join(",");
      this.form.texturl = this.form.texturl.substr(0, this.form.texturl.length - 1);
      console.log(" this.form.texturl", this.form.texturl);
    },

    // 提交
    handleSubmit() {
      /**
       * @Author: 飞
       * @Date: 2021-10-17 01:06:29
       * @Describe: 获取uid
       */
      this.form.uid = JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid;
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
      if (this.BankName == "") {
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
      console.log("this.form.texturl");
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
       * @Date: 2021-05-25 18:20:07
       * @Describe:
       */
      // const data = { uid: JSON.parse(localStorage.getItem('tempIndex')).memberinfo.uid, id: '' }
      const data = { uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid, id: Number(window.localStorage.getItem("sid")) };
      console.log("datadatadatadata", data);
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/basicname";
      return axios({
        method: "post",
        url: url,
        data
      })
        .then(res => {
          if (!res.data.result) return;
          console.log("res", res);
          this.form.id = res.data.data.id;
          this.form.name = res.data.data.qsn_name;
          this.form.sqnadress = res.data.data.sqnadress;

          this.form.qsnphone = res.data.data.qsnphone;
          this.form.catename = res.data.data.catename;
          this.form.qsntitle = res.data.data.qsntitle;

          this.form.qsntext = res.data.data.qsntext;
          this.form.shopcate = res.data.data.shopcate;
          this.form.qsnurl = res.data.data.qsnurl;
          this.form.adcode = res.data.data.addcode;
          /**
           * @Author: 飞
           * @Date: 2021-10-17 00:51:30
           * @Describe:
           */
          this.form.adress_city = res.data.data.adress_city; //行业市编码
          this.form.industry_cate = res.data.data.industry_cate; //行业id
          this.BankName = res.data.data.industry_name; //行业名称
          // 轮播图
          this.form.topurl = res.data.data.topurl.length
            ? this.imgReview(res.data.data.topurl)
                .map(item => item.url)
                .join(",")
            : "";
          this.rotationFileList = res.data.data.topurl.length ? this.imgReview(res.data.data.topurl) : [];

          // console.log("++++++++++++++++++++++++++++++ ", this.rotationFileList, this.form.topurl);
          // 头像
          this.form.logourl = res.data.data.logourl;
          this.avatarFileList = res.data.data.logourl.length ? [{ url: res.data.data.logourl, isImage: true }] : [];
          // 详情图片

          this.form.texturl = res.data.data.texturl.length
            ? this.imgReview(res.data.data.texturl)
                .map(item => item.url)
                .join(",")
            : "";
          console.log(456, this.form.texturl);
          this.detailFileList = res.data.data.texturl.length ? this.imgReview(res.data.data.texturl) : [];

          // 视频
          if (res.data.data.qsnvideo != "") {
            this.form.qsnvideo = res.data.data.qsnvideo;
            this.videoFileList = [{ url: res.data.data.qsnvideo, isImage: true }];
          }
        })
        .catch(reason => {
          console.log(reason);
        });
    },

    // 图片回显
    imgReview(data) {
      console.log("回显", data);
      if (data && data.length) {
        return data.map(item => {
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
            return res.data.data ? res.data.data.img_path : [];
          } else {
            this.isupLoad = false;
            Toast(res.data.msg );
          }
        })
        .catch(reason => {
          console.log(reason);
        });
    },

    // 提交接口
    requestToSave(formData) {
      console.log("formData", formData);
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/save";
      return axios({
        method: "POST",
        url: url,
        data: formData
      })
        .then(res => {
          console.log("res", res);
          if (res.data.result === 1) {
            this.$router.push(this.fun.getUrl("enterpriseInfoSubmitSuccess"));
            // 提交成功删除草稿箱
            window.localStorage.removeItem("ApplicantsForTheDraftBox");
            return res.data;
          }
          if (res.data.result === 0) {
            if (res.data.msg == "地址code不能为空") {
              Toast("请选择地址再提交");
            }
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
  .CanTChoose {
    color: #979797;
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

// /deep/ .van-uploader__wrapper {
//   justify-content: space-between;
// }

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
.formItem {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  overflow: hidden;
  i {
    display: inline-block;
    color: red;
    margin-top: 0.7813rem;
    margin-left: 0.5rem;
  }
  /deep/.van-cell {
    padding-left: 0;
  }
  /deep/.van-icon {
    margin: 0;
    color: #969799;
  }
}
</style>
