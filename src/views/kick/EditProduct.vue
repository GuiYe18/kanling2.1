<template>
  <div class="release">
    <van-field v-model="valueTitle" label="标题:" placeholder="请输入标题" class="TIT" />
    <van-field label="商品图片(主图单张)" class="productPicture" />
    <van-uploader v-model="fileList" :after-read="multipleMethod_1" multiple accept="image/png, image/jpeg" :max-count="1"></van-uploader>

    <van-field label="商品详情图片(多张)" class="productPicture" />
    <van-uploader v-model="fileList1" :after-read="multipleMethod_2" multiple accept="image/png, image/jpeg"></van-uploader>

    <van-field v-model="message" rows="1" :autosize="{ maxHeight: 200, minHeight: 102 }" type="textarea" placeholder="请输入商品描述"> </van-field>

    <ul>
      <li class="releaseItem">
        <div class="releaseName">类型</div>
        <div class="release_AAA">
          <van-radio-group v-model="type1" direction="horizontal">
            <van-radio name="1" checked-color="#ff2c29" icon-size="16px">企业</van-radio>
            <van-radio name="2" checked-color="#ff2c29" icon-size="16px">个人</van-radio>
          </van-radio-group>
        </div>
      </li>
      <li class="releaseItem">
        <div class="releaseName"></div>
        <div class="release_AAA">
          <van-radio-group v-model="type2" direction="horizontal">
            <van-radio name="1" checked-color="#ff2c29" icon-size="16px">全新</van-radio>
            <van-radio name="2" checked-color="#ff2c29" v-if="HideSecondHand" icon-size="16px">二手</van-radio>
          </van-radio-group>
        </div>
      </li>
      <li class="releaseItem">
        <van-cell is-link @click="classification"
          >分类
          <div class="selectedClass">
            <span v-if="FirstClassName == ''"></span>
            <span v-if="FirstClassName != ''">{{ FirstClassName + "/" + SecondaryName }}</span>
          </div>
        </van-cell>
      </li>
      <li class="releaseItem">
        <van-field v-model="ItemUnit" label="物品单位" placeholder="请输入物品单位，如：个、件" />
      </li>
      <li class="releaseItem">
        <div class="releaseName">物品重量</div>
        <div class="release_AAA">
          <div class="weight">
            <span class="surname" @click="weight_surname"><van-icon name="minus" /></span>
            <span class="show_Value">{{ jin }}<span class="show_name">&#32;&#32;公斤</span></span>
            <span class="add" @click="weight_add"><van-icon name="plus" /></span>
          </div>
        </div>
      </li>
      <li class="releaseItem">
        <van-field v-model="ItemStock" type="digit" label="物品库存" placeholder="请输入物品库存" />
      </li>

      <li class="releaseItem">
        <van-field v-model="sellingPrice" type="digit" label="售价(金额):" placeholder="请输入出售金额" class="sell" />
      </li>
      <li class="releaseItem">
        <van-field v-model="original" type="digit" label="原价(金额):" placeholder="0.00" />
      </li>

      <li class="releaseItem addressElection">
        <div class="releaseName CPM">
          <van-cell is-link @click="showPopup"
            >捐赠人：
            <span class="siteName">{{ siteName }} </span>
            <span class="siteIphone">{{ siteIphone }} </span><br />
            <span class="site">{{ site }}</span>
          </van-cell>
        </div>
      </li>
    </ul>
    <!-- 分类弹窗 -->
    <van-popup v-model="classification_show" round position="bottom" :style="{ height: '63%' }">
      <van-picker show-toolbar :columns="columns" @confirm="confirmClassification" @cancel="oncancel" />
    </van-popup>
    <!-- 分类联动 -->

    <!-- 地址列表弹窗 -->
    <van-popup v-model="show" round position="bottom" :style="{ height: '60%' }" @click="pitchOn()">
      <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd('/address')" @edit="onEdit" />
    </van-popup>
    <!-- 分割 -->
    <div class="Split"></div>

    <ul class="bill">
      <li class="MatterSubmit">
        <div @click="DonateSubmit">确认编辑</div>
      </li>
    </ul>
    <!-- 提交成功 -->
    <van-popup v-model="successSubmit">
      <div>
        <img src="../../assets/images/kick/Successful.png" alt="" /><br />
        <span>编辑成功</span><br />
        <div @click="returnHome">返回首页</div>
        <br />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
export default {
  data() {
    return {
      photosize: 1024 * 1024 * 4,

      value: "公斤",
      ItemStock: "", //物品库存
      ItemUnit: "", //物品单位
      // 一级选中的id
      FirstClassID: "",

      // 一级选中的name
      FirstClassName: "",

      // 二级选中的id
      SecondaryID: "",

      // 二级选中的name
      SecondaryName: "",

      // getjson处理数据
      sectionOptions: [],
      // 物品联动
      columns: [],

      valueTitle: "", //商品标题
      videoFileList: [], // 存放视频
      dataListed: [], //存放地址用于计算
      successSubmit: false, //显示提交成功
      moreName: "", //更多存放的值
      showKilogram: false,
      // kilogramName: "", //物品
      kilogramValue: "", //多少斤
      radio: "", //分类选择
      radiodata: ["日用品", "食品", "文件", "衣物", "数码产品", "更多"],
      jin: 1,

      classification_show: false, // 分类弹窗
      // 捐赠人：
      siteName: "请点击选择地址", //  名字(地址)
      siteIphone: "", //  手机(地址)
      site: "", // 地址

      show: false, //地址列表弹窗
      sellingPrice: "", //售价
      original: "", //原价
      message: "", //商品详细信息
      //   存放图片
      fileList: [
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: "https://cloud-image", isImage: true }
      ],
      fileList1: [
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: "https://cloud-image", isImage: true }
      ],
      type1: "", //企业个人
      type2: "", //全新二手
      icon: "", //1企业全新2个人全新3个人二手
      chosenAddressId: "", //选中第几个
      // 当用户选中的是企业的时候   隐藏二手
      HideSecondHand: true,
      list: [], //存放地址
      result: ["a", "b"],
      uploadUrl: "", //上传图片地址
      productPicture: "", //商品图片
      ProductDetails: [] //商品详情图片
    };
  },

  components: {},

  watch: {
    //捐物完之后 点击空白处也返回首页
    successSubmit: function (N, O) {
      if (N == false && O == true) {
        this.returnHome();
      }
    },
    // 监控物流列表
    columns(N, O) {
      console.log("SecondaryID", N, this.SecondaryID);

      for (let index = 0; index < N.length; index++) {
        if (N[index].id == this.FirstClassID) {
          this.FirstClassName = N[index].text;
          for (let k = 0; index < N[index].children.length; k++) {
            if (N[index].children[k].id == this.SecondaryID) {
              this.SecondaryName = N[index].children[k].text;
            }
          }
        }
      }
    },

    //企业个人
    type1: function () {
      if (this.type1 == "1") {
        this.HideSecondHand = false;
        this.type2 = "";
      } else {
        this.HideSecondHand = true;
      }

      console.log("type1", this.type1, this.type2);
    },
    // 监控地址列表
    list: function (params) {
      for (let index = 0; index < this.list.length; index++) {
        if (this.list[index].id == this.chosenAddressId) {
          this.siteName = this.list[index].name;
          this.siteIphone = this.list[index].tel;
          this.site = this.list[index].address;
        }
      }
    },
    // 地址列表  选中赋值
    chosenAddressId: function (value, o) {
      console.log("id发生变化", this.list);
      for (let index = 0; index < this.list.length; index++) {
        if (this.list[index].id == this.chosenAddressId) {
          this.siteName = this.list[index].name;
          this.siteIphone = this.list[index].tel;
          this.site = this.list[index].address;
        }
      }
    },
    // 每次点击分类重置更多输入框
    radio: function (value, o) {
      if (value == "6") {
        this.moreName = "";
      } else {
        this.classification_show = false;
        this.class_confirm();
      }
    },
    // 重量
    jin: function (value, o) {
      if (this.jin <= 1) {
        this.jin = 1;
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0); // 每次进来后置顶
    this.GetShippingAddress(); //获取地址列表
  },
  activated() {
    window.scrollTo(0, 0); // 每次进来后置顶
    this.init(); //初始化
    this.urlUp(); //上传url
    this.getJson(); //选择分类对接数据
  },
  methods: {
    // 图片回显
    imgReview(data) {
      if (data && data.length) {
        return data.map(item => {
          return {
            url: "http://kl.minpinyouxuan.com/static/upload/" + item,
            isImage: true
          };
        });
      }
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-23 16:16:07
     * @Describe: 初始化
     */
    init() {
      this.successSubmit = false;
      var that = this;
      axios
        .post("https://tpkl.minpinyouxuan.com/index.php/api/v2/goods_detail", { goods_id: this.$route.query.id }, {})
        .then(response => {
          if (response.data.result == 1) {
            var datalist = response.data.data.lists;
            console.log("responseresponseresponseresponse", datalist);
            //商品标题
            that.valueTitle = datalist.title;
            // 商品图
            that.productPicture = datalist.thumb;
            var thumbData = [];
            thumbData.push(datalist.thumb);
            that.fileList = thumbData.length ? that.imgReview(thumbData) : [];

            // 详情图
            that.ProductDetails = datalist.thumb_url.map(item => {
              return item;
            });

            that.fileList1 = datalist.thumb_url.length ? that.imgReview(datalist.thumb_url) : [];

            //商品描述
            that.message = datalist.content.split("<p>")[0];

            if (datalist.icon == 1) {
              that.type1 = "1";
              setTimeout(() => {
                that.type2 = "1";
              }, 100);
            }
            if (datalist.icon == 2) {
              that.type1 = "2";
              setTimeout(() => {
                that.type2 = "1";
              }, 100);
            }
            if (datalist.icon == 3) {
              that.type1 = "2";
              setTimeout(() => {
                that.type2 = "2";
              }, 100);
            }
            that.ItemUnit = datalist.sku; //物品单价
            that.jin = datalist.weight; //物品重量
            that.ItemStock = datalist.stock; //库存
            that.original = datalist.market_price; //商品原价
            that.sellingPrice = datalist.price; //商品售价
            that.chosenAddressId = datalist.address_id; //地址id

            that.FirstClassID = datalist.category_ids[0]; //分类1
            that.SecondaryID = datalist.category_ids[1]; //分类2
          }
          if (response.data.result == 0) {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //上传url
    urlUp() {
      this.uploadUrl = this.fun.getRealUrl("upload.uploadPic", {});
    },

    /**
     * @Author: 飞
     * @Date: 2021-06-24 14:00:08
     * @Describe:多张图片
     */
    multipleMethod_1(e, flag) {
      if (e && e.length) {
        for (let i = 0; i < e.length; i++) {
          this.onRead_1(e[i], flag);
        }
      } else {
        this.onRead_1(e, flag);
      }
    },

    // 取消分类按钮
    oncancel() {
      this.classification_show = false;
    },
    //选择分类对接数据
    getJson() {
      let that = this;
      let json = {};
      $http.post("plugin.supplier.frontend.goods.get-category", json, "加载中").then(
        function (response) {
          console.log("显示分类edit", response);
          if (response.result === 1) {
            that.sectionOptions = [];
            for (var i = 0; i < response.data.length; i++) {
              that.sectionOptions.push({
                id: response.data[i].id,
                value: response.data[i].id,
                text: response.data[i].name,
                children: []
              });

              if (!response.data[i].childrens || response.data[i].childrens.length < 1) {
                //       // 判断是否有二级分类
              } else {
                for (let k = 0; k < response.data[i].childrens.length; k++) {
                  that.sectionOptions[i].children.push({
                    id: response.data[i].childrens[k].id,
                    value: response.data[i].childrens[k].id,
                    text: response.data[i].childrens[k].name
                  });
                }
              }
            }
          }
          that.columns = that.sectionOptions;
        },
        function (response) {
          console.log(response);
        }
      );
    },
    // 确认分类按钮
    confirmClassification(value, index) {
      this.FirstClassID = this.columns[index[0]].id;
      this.SecondaryID = this.columns[index[0]].children[index[1]].id;
      this.FirstClassName = this.columns[index[0]].text;
      this.SecondaryName = this.columns[index[0]].children[index[1]].text;
      // 关闭分类
      this.classification_show = false;
    },

    // 返回上一页
    returnHome() {
      this.$router.push(this.fun.getUrl("member", {}));
      // window.history.go(-1)
    },

    // 确认编辑    valueTitle
    DonateSubmit() {
      console.log("siteIphone", this.siteIphone, this.site);
      if (!this.valueTitle) {
        Toast("商品标题不能为空");
        return;
      }
      if (!this.message) {
        Toast("物品详细信息不能为空");
        return;
      }
      if (!this.type1) {
        Toast("请选择物品属于什么类型");
        return;
      }
      if (!this.type2) {
        Toast("请选择物品是否全新");
        return;
      }
      if (!this.FirstClassName) {
        Toast("请为物品分类");
        return;
      }
      if (!this.ItemUnit) {
        Toast("请填写物品单位");
        return;
      }
      if (!this.ItemStock) {
        Toast("请填写物品库存");
        return;
      }
      if (!this.sellingPrice) {
        Toast("请填写物品售价");
        return;
      }
      if (!this.original) {
        Toast("请填写物品原价");
        return;
      }
      if (!this.chosenAddressId) {
        Toast("请选择地址");
        return;
      }

      // 确定企业个人
      if ((this.type1 == 1) & (this.type2 == 1)) {
        this.icon = 1;
      }
      if ((this.type1 == 2) & (this.type2 == 1)) {
        this.icon = 2;
      }
      if ((this.type1 == 2) & (this.type2 == 2)) {
        this.icon = 3;
      }

      var json = {
        goods_id: this.$route.query.id, //商品详情图
        title: this.valueTitle, //商品名称
        thumb: this.productPicture, //商品图
        thumb_url: this.ProductDetails, //商品详情图
        content_text: this.message, //商品详细
        icon: this.icon, //1企业全新2个人全新3个人二手
        weight: this.jin,
        sku: this.ItemUnit, //商品单位
        stock: this.ItemStock, //商品库存
        price: this.sellingPrice, //商品售价
        market_price: this.original, //商品原价
        address_id: this.chosenAddressId, //捐赠人地址id
        virtual_sales: "0", //商品虚拟销量
        category: [this.FirstClassID, this.SecondaryID],

        // uid:'',
        // category_cid: this.SecondaryID, //二级分类
        // category_pid: this.FirstClassID, //一级分类
        // good_content: this.imageUrl_1, //商品详情图

        /**
         * @Author: 飞
         * @Date: 2021-06-15 15:08:11
         * @Describe:
         */
        brand_id: 5 //新增类型
      };
      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v2/goods_edit",
        data: json
      })
        .then(response => {
          if (response.data.result == 1) {
            that.successSubmit = true;
          }
          if (response.data.result == 0) {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //重量加一
    weight_surname() {
      this.jin = Number(this.jin) - 1;
      console.log("加", this.jin);
    },
    //重量减一
    weight_add() {
      this.jin = Number(this.jin) + 1;
      console.log("减", this.jin);
    },
    // 点击分类   显示弹窗
    classification() {
      this.moreName = ""; //点击分类
      this.classification_show = true;
    },
    // 地址列表 选中
    pitchOn() {
      console.log("E", this.chosenAddressId);
      this.show = false;
    },
    // 添加地址
    onAdd(ppp) {
      console.log("ssssssss", ppp);
      this.$router.push(this.fun.getUrl("appendAddress"));
      // this.$router.push({name:'member',params:{},query:{}});
    },
    // 编辑地址
    onEdit(item, index) {
      // 获取原有的地址列表去编辑地址
      this.$router.push(this.fun.getUrl("alterAddress", { model: this.dataListed[index] }));
    },

    // 选择地址
    showPopup() {
      this.show = true;
    },

    // 获取地址列表
    GetShippingAddress() {
      var that = this;
      $http.get("member.member-address.index", "获取中").then(
        function (response) {
          if (response.result === 1) {
            // console.log('response',response.data);isdefault
            that.dataListed = response.data;
            var dataList = that.dataListed;
            var address = [];
            for (let index = 0; index < dataList.length; index++) {
              var addressItem = {};
              // console.log('dizhi',dataList[index].province);   //省
              // console.log('dizhi',dataList[index].city);      //市
              // console.log('dizhi',dataList[index].district);    //区
              // console.log('dizhi',dataList[index].street);   //街道
              // console.log('dizhi',dataList[index].address);   //具体地址
              // console.log('dizhi',dataList[index].mobile);    //手机号
              // console.log('dizhi',dataList[index].id);        //id
              // console.log('dizhi',dataList[index].username);   //名称
              // console.log('dizhi',dataList[index].isdefault);   //默认地址
              addressItem.address = dataList[index].province + dataList[index].city + dataList[index].district + dataList[index].street + dataList[index].address;
              addressItem.tel = dataList[index].mobile;
              addressItem.id = dataList[index].id;
              addressItem.name = dataList[index].username;
              if (dataList[index].isdefault) {
                addressItem.isDefault = dataList[index].username;
              }
              address.push(addressItem);
            }
            that.list = address;
            // that.popupSpecs = true;
            // that.addressData = response.data;
            // that.defaultAddress = response.data.filter(function(item) {
            //   return item.isdefault === 1;
            // });
          } else {
            that.$dialog.alert({ message: response.msg });
          }
        },
        function (response) {
          console.log(response);
        }
      );
    },

    imgPreview(file, callback) {
      console.log("jianji");
      let self = this;
      //判断支不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        //创建一个reader
        let reader = new FileReader();

        //将图片转成base64格式
        reader.readAsDataURL(file);
        //读取成功后的回调
        reader.onloadend = function () {
          let result = this.result;
          let img = new Image();
          img.src = result;

          img.onload = function () {
            // 图片原始尺寸
            var originWidth = this.width;
            var originHeight = this.height;
            // 最大尺寸限制
            var maxWidth = 400,
              maxHeight = 400;
            // 目标尺寸
            var targetWidth = originWidth,
              targetHeight = originHeight;
            // 图片尺寸超过400x400的限制
            if (originWidth > maxWidth || originHeight > maxHeight) {
              if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
                targetWidth = maxWidth;
                targetHeight = Math.round(maxWidth * (originHeight / originWidth));
              } else {
                targetHeight = maxHeight;
                targetWidth = Math.round(maxHeight * (originWidth / originHeight));
              }
            }

            // canvas对图片进行缩放
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            // 清除画布
            context.clearRect(0, 0, targetWidth, targetHeight);
            // 图片压缩
            context.drawImage(img, 0, 0, targetWidth, targetHeight);
            // canvas转为blob并上传
            canvas.toBlob(function (blob) {
              // 图片ajax上传
              console.log(blob);
              if (callback === 1) {
                self.onRead(blob, true);
              } else if (callback === 2) {
                self.multipleMethod_1(blob, true);
              } else {
                self.multipleMethod_2(blob, true);
              }
            }, file.type || "image/png");
          };
        };
      }
    },
    multipleMethod_2(e, flag) {
      if (e && e.length) {
        for (let i = 0; i < e.length; i++) {
          this.onRead_2(e[i], flag);
        }
      } else {
        this.onRead_2(e, flag);
      }
    },
    //vant 多图片上传
    onRead_1(e, flag) {
      console.log("多图片上传", e, flag);
      if (flag !== true) {
        if (e && e.length) {
          // 判断是否是多图上传 多图则循环添加进去
          e.forEach(item => {
            if (item.file.size > this.photosize) {
              this.imgPreview(item.file, 2);
              return false;
            }
            console.log("是否是多张", e, e.length);
          });
        } else {
          console.log("是否是单张", e.file, e.length);
          if (e.file.size > this.photosize) {
            this.imgPreview(e.file, 2);
            console.log("单张", e.file);
            return false;
          }
        }
      }

      Toast.loading({
        message: "上传中",
        forbidClick: true
      });

      var that = this;
      let fd = new FormData();
      // if (this.upNumMax == 4 || this.upNumMax >= 4) {
      //   this.$notify("图片数量已达到上限");
      //   return false;
      // }
      if (flag === true) {
        fd.append("file", e);
      } else {
        fd.append("file", e.file); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      }
      fd.append("attach", "upload");

      axios
        .post(this.uploadUrl, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData.result == 1) {
            if (that.productPicture == "") {
              that.productPicture = responseData.data.img;
            }
          } else {
            Toast(responseData.msg);
            console.log(responseData.msg);
          }
        })
        .catch(error => {
          Toast.clear();
          console.log(error);
        });
    },
    onRead_2(e, flag) {
      if (flag !== true) {
        if (e && e.length) {
          // // 判断是否是多图上传 多图则循环添加进去
          // e.forEach(item => {
          //   if (item.file.size > this.photosize) {
          //     this.imgPreview(item.file, 2);
          //     return false;
          //   }
          // });
        } else {
          if (e.file.size > this.photosize) {
            this.imgPreview(e.file, 2);
            return false;
          }
        }
      }

      Toast.loading({
        message: "上传中",
        forbidClick: true
      });

      var that = this;
      let fd = new FormData();
      // if (this.upNumMax == 4 || this.upNumMax >= 4) {
      //   this.$notify("图片数量已达到上限");
      //   return false;
      // }
      if (flag === true) {
        fd.append("file", e);
      } else {
        fd.append("file", e.file); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      }
      fd.append("attach", "upload");

      axios
        .post(this.uploadUrl, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData.result == 1) {
            that.ProductDetails.push(responseData.data.img);
          } else {
            console.log(responseData.msg);
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang="scss" scoped>
/**
 * @Author: 飞
 * @Date: 2021-06-24 13:31:01
 * @Describe: 上传的图片100%  盛满
 */
.avatar {
  height: 100%;
  width: 100%;
}
.release {
  background-color: #fff;
  text-align: left;
  padding-top: 16px;
  /deep/.TIT .van-cell__title {
    width: 34px;
  }
  /deep/.productPicture .van-cell__title {
    width: 100%;
  }

  // 多张图片
  .Multiple {
    // height: 100px;
    padding-left: 15px;
    // .photobox:nth-child(1){
    //   padding
    // }
    .photobox {
      width: 100px;
      height: 100px;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  //去除下边框
  .van-cell::after {
    border: 0;
  }
  //协议
  .protocol {
    height: 500px;
  }
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
  // 分类弹框后的界面
  /deep/.van-popup .van-address-list .van-radio-group {
    padding-bottom: 50px;
  }

  /deep/.van-popup--center {
    width: 270px;
    height: 270px;
    background: #ffffff;
    border-radius: 18px;
    div {
      text-align: center;
      img {
        width: 103px;
        margin-top: 29px;
        margin-bottom: 27px;
      }
      span {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #494949;
        line-height: 25px;
      }
      div {
        width: 80%;
        width: 189px;
        height: 36px;
        background: #e60416;
        border-radius: 18px;
        display: inline-block;
        margin-top: 25px;
        font-size: 18px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 36px;
      }
    }
  }
  // 上传文件
  /deep/.van-uploader {
    padding-left: 15px;
    /deep/.van-uploader__preview .van-image {
      border-radius: 6px;
    }
  }
  // 左右布局选项
  .releaseItem {
    padding: 0 13px;
    height: 40px;
    //售价(积分):
    .sell /deep/.van-field__control {
      color: #e60416;
      text-align: right;
    }
    // 分类  显示选中原件
    .selectedClass {
      display: inline-block;
      width: 89%;
      text-align: right;
    }
    // 原价(金额):
    /deep/.van-cell {
      padding: 0;
      width: 96%;
      display: inline-flex;
      // 原价(金额):标题
      /deep/.van-cell__title {
        color: #333333;
      }
      // 原价(金额):值
      .van-cell__value {
        .van-field__body {
          .van-field__control {
            text-align: right;
          }
        }
      }
    }
    // 捐赠人：
    /deep/.van-cell--clickable {
      width: 96%;
    }
    // 捐赠人： 又箭头
    .CPM {
      width: 100%;
      .van-cell {
        height: 48px;
        .van-icon {
          top: 12px;
        }
      }
    }

    .releaseName {
      float: left;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #333333;
      line-height: 21px;
    }
    .release_AAA {
      text-align: right;
      .weight {
        display: inline-flex;
        float: right;
        .surname,
        .add {
          border: 1px solid #999;
          display: inline-flex;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          justify-content: center;
          align-items: center;
          color: #999;
        }
        .show_Value {
          // margin: auto 20px;
          width: 70px;
          display: block;
          text-align: center;
          .show_name {
            color: #999;
            // width: 24px;
            height: 20px;
            font-size: 12px;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #999999;
          }
        }
      }
      /deep/.van-radio-group {
        display: inline-flex;
      }
    }
    .classification {
      padding-right: 14px;
      color: #979797;
    }
    .price {
      color: #e60416;
      padding-right: 14px;
    }
  }
  .addressElection {
    height: 48px;
  }
  .van-popup {
    .van-radio {
      display: flex;
    }
  }
  //分割线
  .Split {
    height: 10px;
    background: #f5f5f5;
  }
  .bill {
    padding: 0 13px;
    li {
      padding-top: 13px;

      .van-radio-group {
        display: inline-flex;
        float: right;
        padding-bottom: 50px;
        /deep/.van-field {
          background-color: #e60416;
        }
      }
      /deep/.van-checkbox__label {
        color: #666666;
        span {
          color: #e60416;
        }
      }
      p {
        width: 334px;
        height: 34px;
        font-size: 10px;
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: #666666;
        line-height: 17px;
      }
    }
    .MatterSubmit {
      padding-bottom: 40px;
      div {
        width: 300px;
        height: 36px;
        background: #e60416;
        border-radius: 18px;
        color: #ffffff;
        text-align: center;
        line-height: 36px;
        margin: 7px auto;
      }
    }
  }
  // 分类弹框
  .classCPM {
    padding: 0 13px;
    .confirm {
      text-align: center;
      margin: 10px 0;
      div {
        width: 300px;
        background: #e60416;
        text-align: center;
        line-height: 36px;
        border-radius: 22px;
        display: inline-block;
        color: #ffffff;
        font-size: 16px;
        font-weight: 500;
      }
    }
    .Tips {
      margin: 4px 10px;
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: #666666;
      line-height: 17px;
    }
    .TipsContent {
      margin-left: 10px;
      font-size: 12px;
      font-weight: 500;
      color: #666666;
      line-height: 17px;
    }
    li {
      /deep/.van-radio-group .van-cell {
        background: #f4f8f9;
        border-radius: 23px;
        margin: 0 6px;
        width: 95%;
      }
      .ban {
        float: right;
        margin-top: 23px;
        color: #e60416;
      }
      .class_name {
        height: 22px;
        font-size: 16px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #333333;
        line-height: 22px;
      }
      .type {
        margin-top: 20px;
        display: inline-block;
      }

      .ItemType {
        text-align: center;
        padding: 15px 0;
        span {
          font-size: 16px;
          font-weight: bold;
        }
      }

      /deep/.van-radio {
        display: inline-flex;
        width: 29%;
        border-radius: 23px;
        background: #f4f8f9;
        margin: 13px 6px;
        .van-radio__icon {
          width: 100%;
          text-align: center;
          height: 44px;
          line-height: 44px;
          span {
            border: 1px solid #f4f8f9;
            display: block;
            border-radius: 23px;
            height: 44px;
            font-size: 16px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: #333333;
          }
          .Selected {
            border: 1px solid #e60416;
            color: #e60416;
          }
        }
        .van-col {
          text-align: center;
        }
      }
    }
  }
}
</style>