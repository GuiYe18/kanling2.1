<template>
  <div class="release">
    <van-nav-bar title="一键捐物" left-arrow @click-left="onClickLeft" />

    <van-field v-model="valueTitle" label="物品名称:" placeholder="请输入物品名称" class="TIT" />

    <van-field label="物品图片(主图)" class="productPicture" />
    <van-uploader v-model="fileList" :after-read="multipleMethod_1" @delete="beforeDelete_1" multiple accept="image/png, image/jpeg" :max-count="1"></van-uploader>

    <van-field label="物品详情" class="productPicture" />
    <van-uploader v-model="fileList1" :after-read="multipleMethod_2" @delete="beforeDelete_2" multiple accept="image/png, image/jpeg"></van-uploader>
    <van-field v-model="message" rows="1" :autosize="{ maxHeight: 200, minHeight: 102 }" type="textarea" placeholder="请输入商品描述"> /></van-field>
    <ul>
      <!-- 类型 -->
      <li class="releaseItem">
        <div class="releaseName">类型</div>
        <div class="release_AAA">
          <van-radio-group v-model="type1" direction="horizontal">
            <van-radio name="1" checked-color="#ff2c29" icon-size="16px">企业</van-radio>
            <van-radio name="2" checked-color="#ff2c29" icon-size="16px">个人</van-radio>
          </van-radio-group>
        </div>
      </li>
      <li class="releaseItem" style="height: 44px" v-show="type1 != ''">
        <div class="releaseName"></div>
        <div class="release_AAA" style="border-bottom: 0.03rem solid #e6e4e4; margin-bottom: 0.2rem; padding-bottom: 0.2rem">
          <van-radio-group v-model="type2" direction="horizontal">
            <van-radio name="1" checked-color="#ff2c29" icon-size="16px">全新</van-radio>
            <van-radio name="2" checked-color="#ff2c29" v-if="HideSecondHand" icon-size="16px" disabled>二手</van-radio>
          </van-radio-group>
        </div>

        <div
          v-show="type1 == 2"
          style="text-align: right; padding-right: 1rem; font-size: 12px; font-family: SourceHanSansCN-Regular, SourceHanSansCN; font-weight: 400; color: #999999; line-height: 0.94rem"
        >
          <van-icon name="warning-o" style="vertical-align: bottom; font-size: 15px; line-height: 0.94rem" />
          <span>疫情期间暂时不收取二手物资</span>
        </div>
      </li>
      <!-- 分类 -->
      <!-- <li class="releaseItem">
        <van-cell is-link @click="classification">
          <span>分类</span>
          <div class="selectedClass">
            <span v-if="FirstClassName == ''"></span>
            <span v-if="FirstClassName != ''">{{ FirstClassName + "/" + SecondaryName }}</span>
          </div>
        </van-cell>
      </li> -->
      <!-- 物品单位 -->
      <!-- <li class="releaseItem">
        <van-field v-model="ItemUnit" label="物品单位" placeholder="请填写物品单位" />
      </li> -->

      <!-- 物品重量 -->
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
      <!-- 物品数量 -->
      <li class="releaseItem">
        <van-field v-model="ItemStock" type="digit" label="物品数量" placeholder="请输入物品数量" />
      </li>
      <!-- 物品价格 -->
      <li class="releaseItem">
        <van-field v-model="sellingPrice" type="digit" label="物品价格" placeholder="请输入物品价格" class="sell" />
        <!-- <span class="sell" v-show="PointsHidden">&#32;&#32;积分</span> -->
      </li>
      <!-- 捐物方式 -->
      <li class="releaseItem">
        <div class="releaseName">捐物方式</div>
        <div class="release_AAA">
          <van-radio-group v-model="DonationMethod" direction="horizontal">
            <van-radio name="1" checked-color="#ff2c29" icon-size="16px" v-show="sellingPrice >= 1000">上门取件</van-radio>
            <van-radio name="2" checked-color="#ff2c29" icon-size="16px">送至门店</van-radio>
            <van-radio name="3" checked-color="#ff2c29" icon-size="16px">邮寄库房</van-radio>
          </van-radio-group>
        </div>
      </li>
      <!-- 地址信息 -->
      <li class="releaseItem addressElection" style="margin-bottom: 1rem">
        <div class="releaseName CPM">
          <van-cell is-link @click="showPopup">
            <span>发货地址:</span>
            <span class="siteName">{{ siteName }} </span>
            <span class="siteIphone">{{ siteIphone }} </span><br />
            <span class="site">{{ site }}</span>
          </van-cell>
        </div>
      </li>
      <li class="releaseItem addressElection" v-show="DonationMethod == 2">
        <div class="releaseName CPM">
          <van-cell is-link @click="showPopupStore">
            <span>门店地址:</span>
            <span class="siteName">{{ StoreName }} </span>
            <span class="siteIphone">{{ StorePhoneNumber }} </span><br />
            <span class="site">{{ StoreAddress }}</span>
          </van-cell>
        </div>
      </li>
      <li class="releaseItem addressElection" v-show="DonationMethod == 3">
        <div class="releaseName CPM">
          <van-cell is-link @click="showPopupStore">
            <span>库房地址:</span>
            <span class="siteName">{{ StoreName }} </span>
            <span class="siteIphone">{{ StorePhoneNumber }} </span><br />
            <span class="site">{{ StoreAddress }}</span>
          </van-cell>
        </div>
      </li>
    </ul>

    <!-- 分类弹窗 -->
    <van-popup v-model="classification_show" round position="bottom" :style="{ height: '45%' }">
      <van-picker show-toolbar :columns="columns" @confirm="confirmClassification" @cancel="oncancel" />
    </van-popup>
    <!-- 地址列表弹窗 -->
    <van-popup v-model="show" round position="bottom" :style="{ height: '60%' }" @click="pitchOn">
      <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd('/address')" @edit="onEdit" />
    </van-popup>
    <!-- 门店列表弹框 -->
    <van-popup v-model="StoreShow" round position="bottom" :style="{ height: '60%' }" @click="StorePitchOn" class="Store">
      <div style="height: 100px; margin-bottom: 100px">当前定位</div>
      <van-address-list v-model="StoreAddressID" :list="stores" default-tag-text="默认" @select="onSelect" />
    </van-popup>
    <!-- 库房列表弹框 -->
    <van-popup v-model="StoreShow" round position="bottom" :style="{ height: '60%' }" @click="StorePitchOn" class="Store">
      <van-address-list v-model="StoreAddressID" :list="stores" default-tag-text="默认" @select="onSelect" />
    </van-popup>

    <!-- 分割 -->
    <div class="Split"></div>
    <ul class="bill">
      <!-- 我已阅读并同意 -->
      <li @click="NoAgree">
        <van-checkbox v-show="!checked" v-model="checked" disabled icon-size="17px">我已阅读并同意<span>捐物协议</span></van-checkbox>
        <van-checkbox v-show="checked" v-model="checked" checked-color="#E60416" icon-size="17px">我已阅读并同意<span>捐物协议</span></van-checkbox>
      </li>
      <!-- 捐 赠 -->
      <li class="MatterSubmit" v-show="this.$route.query.echo == undefined">
        <div @click="DonateSubmit">捐 赠</div>
      </li>
      <!-- 编辑 -->
      <li class="MatterSubmit" v-show="this.$route.query.echo">
        <div @click="ConfirmTheEditor">确认编辑</div>
      </li>
    </ul>

    <!-- 技术支持 -->
    <EyebrowEnd />

    <!-- 提交成功 -->
    <van-popup v-model="successSubmit">
      <div>
        <img src="../../../assets/images/kick/Successful.png" alt="" /><br />
        <!-- <img src="../../../assets" alt="" /><br /> -->
        <span>提交成功 等待审核</span><br />
        <span>审核通过后请到我的订单去发货</span><br />
        <div @click="returnHome">返回首页</div>
        <br />
      </div>
    </van-popup>
    <!--协议 -->
    <van-overlay v-show="protocolshow" :lock-scroll="false">
      <div class="wrapper">
        <div class="block">
          <MatterAgreement />
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
import { Toast } from "vant";
import MatterAgreement from "./MatterAgreement";
import EyebrowEnd from "./EyebrowEnd";
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
export default {
  props: ["uid"],
  data() {
    return {
      value: "公斤",
      ItemStock: "", //物品库存(物品数量)
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
      // 协议
      // 协议同意文本
      AgreementText: "同意",

      // 协议同意倒计时 初始时间
      InitialTime: 3,
      // 协议同意倒计时 计算时间
      AgreementTime: 0,
      // 协议同意倒计时时间单位
      AgreementTimeUnit: "s",
      // 协议允许点击
      AgreementAllowClick: false,

      disabled: false,
      protocolshow: false,
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
      checked: false, //我已阅读并同意 捐物协议
      // bill: "2", //是否需要发票
      // 捐物人：
      siteName: "请点击选择地址", //  名字(地址)
      siteIphone: "", //  手机(地址)
      site: "", // 地址

      show: false, //地址列表弹窗
      sellingPrice: "", //售价
      original: "1", //原价
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
      type1: "",
      type2: "",
      icon: "", //1企业全新2个人全新3个人二手
      chosenAddressId: "", //选中第几个
      // 当用户选中的是企业的时候   隐藏二手
      HideSecondHand: true,
      list: [], //存放地址
      result: ["a", "b"],
      uploadUrl: "", //上传图片地址
      productPicture: "", //商品图片
      ProductDetails: [], //商品详情图片
      photosize: 5242000,
      DonationMethod: "", //捐物方式123 上门取件/送至门店/邮寄库房
      // 门店
      stores: [
        { tel: "13681565734", name: "关剑泉", address: "东城区东四十三条32号", id: "101" },
        { tel: "18801292056", name: "张亚宁", address: "北京市朝阳区八里庄街道东恒三期15号楼101室八里庄慈善驿站", id: "102" },
        { tel: "13683360620", name: "李磊", address: "海淀区科学院南路31号社区服务中心（限新品）", id: "103" },
        { tel: "68741480", name: "李根森", address: "丰台区云岗北区西里4号街道办事处", id: "104" },
        { tel: "83385485", name: "田跃华", address: "北京市丰台区长辛店镇太子峪村委会10号", id: "105" },
        { tel: "18610941801", name: "王三保", address: "丰台区晓月苑小区三里晓月家政", id: "106" },
        { tel: "18610941801", name: "王三保", address: "大红门西里15号慈善超市", id: "107" },
        { tel: "68199656", name: "杨红", address: "万源南里33栋南侧", id: "108" },
        { tel: "13311239198", name: "蔡福群", address: "北京市丰台区小屯西路96号院19号楼", id: "109" },
        { tel: "69858630", name: "杨佳伟", address: "北京市门头沟区捐赠中心站点圈外大街73号", id: "110" },
        { tel: "13261261625", name: "周茂荣", address: "北京市房山区阎村镇紫园路108号-2（房山区社会捐赠中心库房）", id: "111" },
        { tel: "18611705916", name: "李巧荣", address: "北京市通州区通惠北路14号慈善超市", id: "112" },
        { tel: "89445765", name: "赵斌", address: "北京市顺义区南法信镇物流园二街59号院内西侧5号库房", id: "113" },
        { tel: "69799206", name: "薛凤民", address: "昌平区东小口镇都市芳园社区东小口镇锦湖园别墅4号", id: "114" },
        { tel: "64824893", name: "刘淑芹", address: "昌平区天通苑南街道办事处", id: "115" },
        { tel: "16619999193", name: "王楠", address: "昌平区昌盛园2区11号楼1层底商", id: "116" },
        { tel: "18500709590", name: "王秀华", address: "大兴区天宫院街道物资局小区慈善超市", id: "117" },
        { tel: "13436672058", name: "冯占东", address: "北京市怀柔区怀柔镇张各长村民政局储备库", id: "118" },
        { tel: "89990092", name: "王建", address: "王辛庄镇政府红绿灯路口向北500米右转50米路北", id: "119" },
        { tel: "69062554", name: "季续", address: "密云区鼓楼街道沿湖社区居委会活动中心", id: "120" },
        { tel: "69186578 ", name: "武春霞", address: "妫水南街社区服务中心一层一楼（延庆区光荣院西门南侧）", id: "121" },
        { tel: "69142371 ", name: "周旭", address: "延庆区东外大街59号民政局后院库房", id: "122" },
        { tel: "67837709", name: "田晓辉", address: "北京经济技术开发区地盛北街北工大软件园8号楼", id: "123" },
        { tel: "87227603", name: "苏海丽", address: "北京经济技术开发区紫君庭中央公馆5-111南门进", id: "124" },
        { tel: "67891313", name: "赵瑞林", address: "北京经济技术开发区天华东路5号院博客雅居底商", id: "125" },
        { tel: "67829837", name: "权思敏", address: "北京经济技术开发区天宝西路1号狮城商务酒店南侧50米", id: "126" },
        { tel: "89028502", name: "刘强", address: "北京经济技术开发区博兴八路22号", id: "127" },
        { tel: "87227961", name: "常菊", address: "北京经济技术开发区凉水河一街22号亦园小区1号楼6单元102", id: "128" },
        { tel: "87927096", name: "倪梦雅", address: "北京经济技术开发区鹿海园四里9号楼201", id: "129" },
        { tel: "80826815", name: "王宇", address: "北京经济技术开发区经海七路100号院10号楼三层", id: "130" },
        { tel: "01065395245", name: "孙老师", address: "北京市丰台区窑窝村41号久敬庄接济服务中心院内", id: "131" }
      ], //门店列表
      page: 0, //页

      citydata: {},
      city: "", //城市名称
      position: {}, //经纬度

      total_page: "", //总共多少页
      total: "", //总个数
      StoreShow: false, //门店显示隐藏
      StoreAddressID: "", //门店地址ID
      StorePhoneNumber: "", //门店手机号
      StoreAddress: "", //门店地址
      StoreName: "", //门店姓名

      // 库房
      //
      donation_type: "", //捐物类型
      type_id: "", //选中门店的地址id
      OpenTheTip: "", //协议是否开启
      Area: "" //地区
    };
  },

  components: {
    MatterAgreement,
    EyebrowEnd
  },

  watch: {
    // 监控物流列表
    columns(N, O) {
      console.log("SecondaryID", N, this.SecondaryID);
      for (let index = 0; index < N.length; index++) {
        if (N[index].id == this.FirstClassID) {
          this.FirstClassName = N[index].text;
          for (let k = 0; index < N[index].children.length; k++) {
            if (N[index].children[k].id == this.SecondaryID) {
              console.log("1111111111111111", N[index].children[k].id, this.SecondaryID);
              this.SecondaryName = N[index].children[k].text;
            }
          }
        }
      }
    },
    // 监控父组件是否开启协议
    OpenTheTip: function (N, O) {
      if (N) {
        this.OpenTheTip = false;
        this.NoAgree();
      }
    },
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
    //捐物完之后 点击空白处也返回首页
    successSubmit: function (N, O) {
      if (N == false && O == true) {
        this.returnHome();
      }
    },
    //第一类型
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
      for (let index = 0; index < this.list.length; index++) {
        if (this.list[index].id == this.chosenAddressId) {
          this.siteName = this.list[index].name;
          this.siteIphone = this.list[index].tel;
          this.site = this.list[index].address;
        }
      }
    },
    // 监控重量最低 1 斤
    jin: function (value, o) {
      if (this.jin <= 1) {
        this.jin = 1;
      }
    },
    // 门店页监控
    total: function (value, o) {
      console.log("cccccccccccccccccccccccccccccscscs");
      setTimeout(() => {
        if (this.total >= this.stores.length) {
          this.getStoreMore();
        }
      }, 2000);
    }
  },
  mounted() {
    // 每次进来后置顶
    // window.scrollTo(0, 0);
    console.log("------------------------------------mounted-------------------------------------------");
  },
  activated() {
    // 每次进来后置顶
    // window.scrollTo(0, 0);
    this.citydata = JSON.parse(localStorage.getItem("citydata"));
    this.Area = JSON.parse(localStorage.getItem("Area"));

    //获取商品图片上传地址
    this.urlUp();
    // 获取地址列表
    this.GetShippingAddress();
    // 获取门店列表
    this.GetAListOfStores();
    //选择分类对接数据
    this.getJson();
    // 接收父组件的参数  来显示协议
    this.OpenTheTip = this.$route.params.OpenTheTip;
    if (this.$route.query.echo) {
      // console.log("this.$route.query.echo", this.$route.query.echo);
      // 回显
      this.TheEcho();
    }
  },
  methods: {
    // 删除
    beforeDelete_1(name, index) {
      this.productPicture = "";
    },
    // 删除
    beforeDelete_2(name, index) {
      // this.ProductDetails.split.splice(index.index + 1, 1);
      this.ProductDetails.splice(index.index, 1);
      // delete this.ProductDetails[index.index + 1];
    },
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
    // 回想
    TheEcho() {
      this.successSubmit = false;
      var that = this;
      axios
        .post("https://tpkl.minpinyouxuan.com/index.php/api/v2/goods_detail", { goods_id: this.$route.query.id }, {})
        .then(response => {
          if (response.data.result == 1) {
            var datalist = response.data.data.lists;
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
            // 类型
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
            // 分类
            that.FirstClassID = datalist.category_ids[0]; //分类1
            that.SecondaryID = datalist.category_ids[1]; //分类2
            that.ItemUnit = datalist.sku; //物品单位
            that.jin = datalist.weight; //物品重量
            that.ItemStock = datalist.stock; //库存(数量)
            // that.original = datalist.market_price; //商品原价
            that.sellingPrice = datalist.price; //商品售价
            that.chosenAddressId = datalist.address_id; //地址id
            // DonationMethod

            // 捐物协议
            that.checked = true;
          }
          if (response.data.result == 0) {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 门店选中
    StorePitchOn() {
      this.StoreShow = false;
      console.log("StoreAddress", this.StoreAddressID);
      this.type_id = this.StoreAddressID; //选中门店的地址id
      this.stores.forEach(item => {
        if (item.id == this.StoreAddressID) {
          console.log("iytem", item);
          this.StorePhoneNumber = item.tel; //门店手机号
          this.StoreAddress = item.address; //门店地址
          this.StoreName = item.name; //门店姓名
        }
      });
    },
    // 点击门店显示门店弹窗
    showPopupStore() {
      this.StoreShow = true;
    },
    // 获取门店列表
    GetAListOfStores() {
      this.getStoreMore();
      return;
    },
    getStoreMore() {
      this.page++;
      var that = this;
      let p = this.fun.bd_encrypt(this.citydata.position.lng, this.citydata.position.lat);
      let json = {
        page: this.page,
        lng: p.lng,
        lat: p.lat,
        city_name: this.citydata.city
      };
      $http.get("plugin.store-cashier.frontend.store.goods.get-store-goods-by-title", json).then(response => {
        if (response.result === 1) {
          that.total_page = response.data.last_page; //第几页
          that.total = response.data.total; //总个数
          console.log("sccscscscscscsc", that.total_page, that.total);

          // 2021年10月11日19:32:54
          // 测试门店
          // that.stores.push();
          return;
          response.data.data.forEach(item => {
            // item.mobile; //手机
            // item.store_name; //名称
            // item.address; //地址
            // item.id; //门店id

            that.stores.push({
              id: item.id,
              name: item.store_name,
              tel: item.mobile,
              address: item.address.city + item.address.detailed_address
            });
          });

          // this.stores = response.data.data; //门店列表
        } else {
          this.stores = [];
        }
      });
    },
    // 回退
    onClickLeft() {
      this.$router.go(-1);
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

    // 返回首页
    returnHome() {
      this.$router.push(this.fun.getUrl("NewDonation", {}));
      this.successSubmit = false;
      this.destroyElement();
    },
    destroyElement() {
      this.$destroy(true);
    },
    // 捐物    valueTitle
    DonateSubmit() {
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
      // if (!this.FirstClassName) {
      //   Toast("请为物品分类");
      //   return;
      // }
      // if (!this.ItemStock) {
      //   Toast("请填写物品数量");
      //   return;
      // }
      if (!this.sellingPrice) {
        Toast("请填写物品价格");
        return;
      }

      if (this.DonationMethod == "") {
        Toast("请选择捐助方式");
        return;
      } else {
        if (this.DonationMethod == 1) {
          this.donation_type = "";
          if (this.chosenAddressId == "") {
            Toast("请选择地址信息");
            return;
          }
        }
        if (this.DonationMethod == 2) {
          this.donation_type = 2;
          if (this.StoreAddressID == "") {
            Toast("请选择门店地址");
            return;
          }
        }
        if (this.DonationMethod == 3) {
          this.donation_type = 3;
          if (this.StoreAddressID == "") {
            Toast("请选择库房地址");
            return;
          }
        }
      }
      if (!this.chosenAddressId) {
        Toast("请选择地址");
        return;
      }

      if (!this.checked) {
        Toast("请点击我已阅读并同意捐物协议并同意");
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
      // this.successSubmit = true;
      var json = {
        // uid:'',
        // category_cid: this.SecondaryID, //二级分类
        // category_pid: this.FirstClassID, //一级分类
        category_cid: 1, //二级分类
        category_pid: 2, //一级分类
        // category:[this.FirstClassID,this.SecondaryID],
        title: this.valueTitle, //商品名称
        icon: this.icon, //1企业全新2个人全新3个人二手
        // sku: this.ItemUnit, //商品单位
        sku: "无", //商品单位
        market_price: this.original, //商品原价
        price: this.sellingPrice, //商品售价
        stock: this.ItemStock, //商品库存
        virtual_sales: "0", //商品虚拟销量
        weight: this.jin, //重量
        content_text: this.message, //商品详细
        address_id: this.chosenAddressId, //捐物人地址id
        thumb: this.productPicture, //商品图
        thumb_url: this.ProductDetails, //商品详情图
        good_content: this.ProductDetails, //商品详情图
        donation_type: this.donation_type, //捐物类型2021-9-9 16:47:38
        type_id: this.type_id, //选中门店的地址id
        /**
         * @Author: 飞
         * @Date: 2021-06-15 15:08:11
         * @Describe:
         */
        brand_id: 5 //新增类型
      };
      var that = this;
      $http.post("plugin.supplier.frontend.goods.add-goods", json, "正在上传中").then(
        function (response) {
          if (response.result === 1) {
            that.successSubmit = true;
          }
        },
        function (response) {
          console.log(response);
        }
      );
    },
    // 确认编辑    valueTitle
    ConfirmTheEditor() {
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
      // if (!this.FirstClassName) {
      //   Toast("请为物品分类");
      //   return;
      // }
      // if (!this.ItemUnit) {
      //   Toast("请填写物品单位");
      //   return;
      // }
      if (!this.ItemStock) {
        Toast("请填写物品库存");
        return;
      }
      if (!this.sellingPrice) {
        Toast("请填写物品价格");
        return;
      }
      // if (!this.original) {
      //   Toast("请填写物品原价");
      //   return;
      // }
      if (this.DonationMethod == "") {
        Toast("请选择捐助方式");
        return;
      } else {
        if (this.DonationMethod == 1) {
          this.donation_type = "";
          if (this.chosenAddressId == "") {
            Toast("请选择地址信息");
            return;
          }
        }
        if (this.DonationMethod == 2) {
          this.donation_type = 2;
          if (this.StoreAddressID == "") {
            Toast("请选择门店地址");
            return;
          }
        }
        if (this.DonationMethod == 3) {
          this.donation_type = 3;
          if (this.StoreAddressID == "") {
            Toast("请选择库房地址");
            return;
          }
        }
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
        goods_id: this.$route.query.id, //商品id
        title: this.valueTitle, //商品名称
        thumb: this.productPicture, //商品图
        thumb_url: this.ProductDetails, //商品详情图
        content_text: this.message, //商品详细
        icon: this.icon, //1企业全新2个人全新3个人二手
        weight: this.jin, //物品重量
        // sku: this.ItemUnit, //商品单位
        sku: "无", //商品单位
        stock: this.ItemStock, //商品库存(数量)
        price: this.sellingPrice, //商品售价
        address_id: this.chosenAddressId, //捐赠人地址id
        virtual_sales: "0", //商品虚拟销量
        category: [this.FirstClassID, this.SecondaryID],

        market_price: this.original, //商品原价
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
    },
    // 编辑地址
    onEdit(item, index) {
      // 获取原有的地址列表去编辑地址
      this.$router.push(this.fun.getUrl("alterAddress", { model: this.dataListed[index] }));
    },

    // 选择地址
    showPopup() {
      this.show = true;
      console.log("sssssss", this.show);
    },

    // 获取地址列表
    GetShippingAddress() {
      var that = this;
      $http.get("member.member-address.index", "获取中").then(
        function (response) {
          if (response.result === 1) {
            that.dataListed = response.data;
            var dataList = that.dataListed;
            var address = [];
            for (let index = 0; index < dataList.length; index++) {
              var addressItem = {};

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
    //商品图片上传
    urlUp() {
      this.uploadUrl = this.fun.getRealUrl("upload.uploadPic", {});
    },
    multipleMethod_1(e, flag) {
      // console.log("少时诵诗书所所所所所所所所", e, flag);
      if (e && e.length) {
        // 多张
        for (let i = 0; i < e.length; i++) {
          this.onRead_1(e[i], flag);
        }
      } else {
        // 单张
        this.onRead_1(e, flag);
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
      if (flag !== true) {
        if (e && e.length) {
          // // 判断是否是多图上传 多图则循环添加进去
          e.forEach(item => {
            if (item.file.size > this.photosize) {
              this.imgPreview(item.file, 2);
              return false;
            }
          });
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
        .catch(error => {});
    },
    onRead_2(e, flag) {
      if (flag !== true) {
        if (e && e.length) {
          // // 判断是否是多图上传 多图则循环添加进去
          e.forEach(item => {
            if (item.file.size > this.photosize) {
              this.imgPreview(item.file, 2);
              return false;
            }
          });
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
.release {
  background-color: #fff;
  text-align: left;

  /deep/.van-cell__title {
    span {
      font-size: 0.88rem;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #333333;
      line-height: 1.31rem;
    }
  }
  /deep/.TIT .van-field__label {
    width: 80px;
  }
  /deep/.productPicture .van-cell__title {
    width: 100%;
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
    height: 292px;
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
    // 捐物人：
    /deep/.van-cell--clickable {
      width: 96%;
    }
    // 捐物人： 又箭头
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
      padding-bottom: 2rem;
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
  // 门店弹窗
  .Store {
    .van-address-item__value {
      padding-right: 0;
    }
    .van-address-item__edit {
      display: none;
    }
  }
}
</style>