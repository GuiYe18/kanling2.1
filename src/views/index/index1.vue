<template>
  <div class="content s" @scroll="slideHandle">
    <!-- <div class="classList">
      <ul>
        <li @click="classListHandle(item)" v-for="item in classList" :key="item.id">
          <img :src="item.icon" alt="" />
          <div>{{ item.name }}</div>
        </li>
      </ul>
    </div> -->

    <!-- /** * @Author: 飞 * @Date: 2021-06-28 10:52:34 * @Describe:改 Sticky 粘性布局 吸顶 */ -->
    <van-sticky class="labList" :class="header_show == 22 ? 'header_show' : ''" :style="Level_2 == 3 ? styleData : ''" :offset-top="-150">
      <!-- 头部也写进粘性布局里面 -->
      <div class="header" :class="header_show == 2 ? 'header_show' : ''">
        <div class="serchInfo">
          <div class="titleAddress" @click="tolocation">
            <div class="titleAddressInfo">
              <span>{{ city }}</span
              ><span>{{ address }}</span>
            </div>
            <div class="titleAddressIcon"></div>
          </div>
          <div class="serchInput" @click="toSerchHandle">
            <!-- <img src="../../assets/newImg/index/serchIcon.png" alt="" /> -->
            <van-icon name="search" size="1rem" />
            <span>北京拣到互联技术有限公司</span>
            <van-icon name="scan" size="1.25rem" class="scanning" />
            <!-- <div @click="scanningHandle" class="scanning"></div> -->
          </div>
        </div>
        <div class="title">
          <div>看企业 看商铺 看牛人</div>
          <p>慈善超市线上平台</p>
        </div>
      </div>

      <!--图片展示-->
      <!-- <video ref="video" width="640" height="480" autoplay></video> -->
      <div :class="Level_2 == 3 ? 'fixed' : ''">
        <ul class="NavigateOne">
          <li v-for="(item, index) in labList" :key="item.id" :class="{ cur: index === curIndex }" @click="labCheckHandle(index, item)">
            <span>{{ item.val }}</span>
            <i></i>
          </li>
        </ul>
        <!-- /** * @Author: 飞 * @Date: 2021-06-25 13:40:08 * @Describe:二级导航 */ -->
        <section class="SecondaryNavigation">
          <van-tabs @click="onClick" v-model="Level_2" @disabled="onClickDisabled">
            <van-tab title="推荐"></van-tab>
            <van-tab disabled title="关注"></van-tab>
            <van-tab disabled title="刷信息"></van-tab>
            <!-- <van-tab disabled title="刷视频"></van-tab> -->
            <van-tab disabled title="刷视频"></van-tab>
            <van-tab disabled title="刷商品"></van-tab>
          </van-tabs>
        </section>
        <!-- /** * @Author: 飞 * @Date: 2021-06-22 17:51:20 * @Describe: 行业分类 */ -->
        <section class="Category">
          <div class="Cate_div">
            <!-- 最多显示一行 -->
            <div @click="Category" class="van-ellipsis">
              <div class="div">
                <img src="./img/Classification.png" alt="" class="Classification" />
              </div>
              <div class="van-ellipsis div">分类：{{ DefaultIndustry }}</div>
              <div class="ieon div">
                <img src="./img/triangle.png" alt="" />
              </div>
            </div>
          </div>
          <div class="Cate_div" @click="RegionalChoiceShow = true">
            <div class="van-ellipsis">
              <div class="div">
                <img src="./img/Position.png" alt="" class="Classification" />
              </div>
              <div class="van-ellipsis div">区域：{{ adcodeName }}</div>
              <div class="ieon">
                <img src="./img/triangle.png" alt="" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </van-sticky>
    <!-- <div class="labList" ref="labList" :class="{ fixed: contentListTop <= 0 }"> -->
    <!-- /** * @Author: 飞 * @Date: 2021-06-25 13:44:23 * @Describe: 一级标题 */ -->

    <!-- </div> -->
    <!-- 挂载到 body 节点下 -->
    <van-popup v-model="show" get-container="#appMain" position="bottom" :style="{ height: '60%' }">
      <van-list finished-text="没有更多了">
        <van-cell v-for="item in list" :key="item" :title="item.text" @click="Choose(item)" />
      </van-list>
    </van-popup>

    <!-- /**
     * @Author: 飞
     * @Date: 2021-06-22 17:50:50
     * @Describe: 首页新闻展示 
     */     -->
    <!-- <keep-alive> -->
    <!-- <div v-show="Level_2 == 0" class="contentList" ref="contentList" :class="{ contentListPaddingTop: contentListTop <= 0 }"> -->
    <div v-show="Level_2 == 0" class="contentList" ref="contentList">
      <van-list v-model="loading" :finished="finished" loading-text="加载中..." finished-text="没有更多了" :offset="offset" @load="onLoad">
        <van-cell class="contentItem" v-for="(item, index) in recommendList" :key="index" @click="toDetail(item, index)">
          <div v-if="parseFloat(item.redmoney) > 0" :class="{ receive: item.receive_status !== 0 }">
            <!-- <div
              v-show="item.receive_status !== 0"
              class="isReceive"
            ></div> -->
            <!-- <p class="introduction">{{ item.qsntitle }}</p> -->
            <div class="topContent">
              <van-image :src="item.logourl">
                <template v-slot:error>加载失败</template>
              </van-image>
              <div class="topMiddle">
                <p class="introduction">{{ item.qsn_name }}</p>
                <div class="van-ellipsis topMiddleInformation">
                  <span class="van-ellipsis">{{ item.sqnadress }}</span>
                  <span class="">{{ item.catename }}</span>
                </div>
              </div>
              <div class="RedEnvelope">
                <img src="./img/RedEnvelopeOn.png" alt="" v-if="item.surplus > 0" />
                <img src="./img/RedEnvelopeIng.png" alt="" v-else />
              </div>
            </div>

            <!-- <div class="nameAddress">
              <img src="../../assets/newImg/index/企业.png" alt="" class="img" />
              <span class="van-ellipsis">{{ item.qsn_name }}</span>

              <img src="../../assets/newImg/index/定位.png" alt="" class="img" /> -->
            <!-- <van-icon color="#999" class="addressIcon" name="location" /> -->
            <!-- <span class="van-ellipsis">{{ item.sqnadress }}</span>
            </div> -->
            <!-- <div class='nameAddress'>
              <span class='itemName'>{{item.qsn_name}}</span>
              <span class="addressInfo"> {{ item.sqnadress }} </span>
            </div> -->
            <!-- <ul class="labelInfo"> -->
            <!-- <li v-for="(labelItem, labelIndex) in item.catename" :key="labelIndex">{{ labelItem }}</li> -->
            <!-- <van-tag plain color="#0579fc" v-for="(labelItem, labelIndex) in item.catename" :key="labelIndex">{{ labelItem }}</van-tag> -->
            <!-- </ul> -->
            <div class="van-multi-ellipsis--l2">{{ item.qsntitle }}</div>
            <ul class="photo">
              <li v-for="(photoItem, photoIndex) in item.texturl" :key="photoIndex">
                <!-- <img :src="photoItem" alt="" /> -->
                <van-image fit="cover" :src="photoItem" />
              </li>
            </ul>
            <div class="progress">
              <div class="progressBox">
                <div class="progressContent" :style="'width:' + ((item.redmoneynum - item.receive) / item.redmoneynum) * 100 + '%;'"></div>
              </div>
              <div class="Remainder">
                <template v-if="item.surplus == 0"> 红包已领完～ </template>
                <template v-if="item.surplus > 0">
                  红包剩余 <span>{{ item.surplus }}</span> 个
                </template>
              </div>

              <!-- <div class="surplus">
                <template v-if="item.surplus == 0">
                  <span></span>
                  <span>红包已领完～</span>
                </template>
                <template v-if="item.surplus > 0">
                  <span>已领{{ item.receive }}个</span>
                </template>
              </div> -->
            </div>
            <div class="iconInfo">
              <div>
                <img src="../../assets/newImg/index/lookIn.png" alt="" />
                <span>{{ item.browse }}</span>
              </div>
              <div>
                <img v-if="item.fabulousstatus == 0" src="../../assets/newImg/index/like.png" alt="" />
                <img v-else src="../../assets/newImg/index/like1.png" alt="" />
                <span>{{ item.fabulous }}</span>
              </div>
              <div>
                <img src="../../assets/newImg/index/Comment.png" alt="" />
                <span>{{ item.comment }}</span>
              </div>
              <div>
                <img v-if="item.followstatus == 0" src="../../assets/newImg/index/collect.png" alt="" />
                <img v-else src="../../assets/newImg/index/collect1.png" alt="" />
                <span>{{ item.follow }}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="topContent">
              <van-image :src="item.logourl" class="Unprotected">
                <template v-slot:error>加载失败</template>
              </van-image>
              <div class="van-ellipsis UnprotectedText">
                {{ item.qsn_name }}
              </div>

              <div class="van-ellipsis UnprotectedTextImg">
                <img src="../../assets/newImg/index/定位.png" alt="" class="img" /> <span>{{ item.sqnadress }}</span>
              </div>
            </div>

            <div class="notSet">
              <div class="notSetPhoto">
                <img :src="item.texturl[0]" alt="" />
              </div>
              <div class="noSetInfo">
                <div class="van-multi-ellipsis--l2 noSetintroduction">
                  {{ item.qsntitle }}
                </div>
                <div class="van-ellipsis UnprotectedTit">
                  <span class="">{{ item.catename }}</span>
                </div>
                <span>暂未投放资金，无可领红包</span>
              </div>
            </div>
            <div class="iconInfo">
              <div>
                <!-- <van-icon size="1.25rem" name="eye" color="#dbdbdb" /> -->
                <img src="../../assets/newImg/index/lookIn.png" alt="" />
                <span>{{ item.browse }}</span>
              </div>
              <div>
                <!-- <van-icon v-if="item.fabulousstatus === 0" size="1.25rem" name="like" color="#dbdbdb" />
                <van-icon v-else size="1.25rem" name="like" color="#f7173a" /> -->
                <img v-if="item.fabulousstatus === 0" src="../../assets/newImg/index/like.png" alt="" />
                <img v-else src="../../assets/newImg/index/like1.png" alt="" />
                <span>{{ item.fabulous }}</span>
              </div>
              <div>
                <!-- <van-icon size="1.25rem" name="chat" color="#dbdbdb" /> -->
                <img src="../../assets/newImg/index/Comment.png" alt="" />
                <span>{{ item.comment }}</span>
              </div>
              <div>
                <!-- <van-icon v-if="item.followstatus === 0" size="1.25rem" name="star" color="#dbdbdb" />
                <van-icon v-else size="1.25rem" name="star" color="#f2bb13" /> -->
                <img v-if="item.followstatus === 0" src="../../assets/newImg/index/collect.png" alt="" />
                <img v-else src="../../assets/newImg/index/collect1.png" alt="" />
                <span>{{ item.follow }}</span>
              </div>
            </div>
          </div>
          <div class="bj"></div>
        </van-cell>
      </van-list>
    </div>
    <!-- </keep-alive> -->

    <!-- /** * @Author: 飞 * @Date: 2021-06-28 11:11:18 * @Describe:刷视频 */ -->
    <!-- <div v-show="Level_2 == 3" class="BrushVideo">
      <SwipeTheVideo :Level_2="Level_2" />
    </div> -->
    <div v-show="Level_2 == 2" class="BrushVideo">
      <BrushInformation />
    </div>
    <!-- /**
           * @Author: 飞
           * @Date: 2021-08-15 12:09:39
           * @Describe: 地区选择
           */     -->
    <van-popup v-model="RegionalChoiceShow" round position="bottom">
      <van-cascader v-model="cascaderValue" title="请选择所在区域" :options="options" @close="RegionalChoiceShow = false" @finish="onFinish" :field-names="fieldNames" />
    </van-popup>
  </div>
</template>

<script>
import showlocation from "components/temp/location";
import SwipeTheVideo from "./SwipeTheVideo";
import BrushInformation from "./BrushInformation";
import { MessageBox, Indicator } from "mint-ui";
import { EventBus } from "../A_version_1.1/event-bus.js";
import { Toast } from "vant";
import { regionData } from "element-china-area-data";
export default {
  name: "index",
  components: {
    showlocation,
    SwipeTheVideo,
    BrushInformation
  },
  data() {
    return {
      fieldNames: {
        //属性名 重置
        text: "label",
        value: "value",
        children: "children"
      },
      options: regionData, //地址库
      cascaderValue: "", //展示
      RegionalChoiceShow: false, //选择地区是否显示隐藏
      /**
       * @Author: 飞
       * @Date: 2021-08-14 21:53:51
       * @Describe: 定位
       */
      adcodeName: "北京",
      adcode: "",

      styleData: {
        height: "0"
      },

      header_show: "21", //控制头顶是否隐藏
      Level_2: 0, //二级选中

      DefaultIndustry: "全部",
      list: [
        { text: "全部" },
        { text: "慈善超市" },
        { text: "超市连锁便利店" },
        { text: "住宿酒店" },
        { text: "美容美发" },
        { text: "餐饮/连锁" },
        { text: "母婴专卖" },
        { text: "婚纱摄影" },
        { text: "教育培训" },
        { text: "建材装修" },
        { text: "按摩足疗" },
        { text: "体育运动" },
        { text: "休闲运动" },
        { text: "洗车修车" },
        { text: "烟酒专卖店" },
        { text: "蔬菜水果" },
        { text: "花鸟鱼虫" },
        { text: "服装服饰" },
        { text: "图文设计" },
        { text: "房产销售租赁" },
        { text: "典当银行" },
        { text: "茶店咖啡店" },
        { text: "古玩字画" },
        { text: "居民修理服务" },
        { text: "食品糕点" },
        { text: "法律律师" },
        { text: "软件技术" },
        { text: "通用设备制造业" },
        { text: "电气机械和器材制造业" },
        { text: "金属制造业" },
        { text: "文教、工美、体育和娱乐用品制造业" },
        { text: "铁路、船舶、航空航天和其他运输设备制造业" },
        { text: "纺织业" },
        { text: "木材加工和木、竹、藤、棕、草制品业" },
        { text: "橡胶和塑料制品业" },
        { text: "造纸和纸质品业" },
        { text: "皮革、毛皮、羽毛及其制品和制鞋业" },
        { text: "油加工、炼焦和核燃料加工业" },
        { text: "计算机、通信和其他电子设备制造" },
        { text: "造纸和纸制品业" },
        { text: "酒、饮料和精制茶制造业" },
        { text: "金属制品、机械和设备修理业" },
        { text: "食品制造业" },
        { text: "黑色金属冶炼和压延加工业" },
        { text: "其他制造业" },
        { text: "专业设备制造业" },
        { text: "仪器仪表制造业" },
        { text: "化学纤维制造业" },
        { text: "农副食品加工业" },
        { text: "化学原料和化学制品制造业" },
        { text: "家具制造业" },
        { text: "医药制造业" },
        { text: "印刷和记录媒介复制业" },
        { text: "汽车制造业" },
        { text: "有色金属冶炼和压延加工业" },
        { text: "烟草制品业" },
        { text: "废弃资源综合利用业" },
        { text: "煤炭开采和洗选业" },
        { text: "石油和天然气开采业" },
        { text: "有色金属矿采选业" },
        { text: "非金属矿采选业" },
        { text: "黑色金属矿采选业" },
        { text: "开采辅助活动" },
        { text: "其他采矿业" },
        { text: "煤炭开采和洗选业" },
        { text: "石油和天然气开采业" },
        { text: "有色金属矿采选业" },
        { text: "非金属矿采选业" },
        { text: "黑色金属矿采选业" },
        { text: "开采辅助活动" },
        { text: "其他采矿业" },
        { text: "仓储业" },
        { text: "道路运输业" },
        { text: "铁路运输业" },
        { text: "水上运输业" },
        { text: "航空运输业" },
        { text: "邮政业" },
        { text: "装卸搬运和运输代理业" },
        { text: "货币金融服务" },
        { text: "资本市场服务" },
        { text: "保险业" },
        { text: "金融信托与管理服务" },
        { text: "控股公司服务" },
        { text: "证券业金融" },
        { text: "其他金融业" },
        { text: "文化艺术业" },
        { text: "新闻和出版社" },
        { text: "体育" },
        { text: "娱乐业" },
        { text: "广播、电视、电影和影视录音制作业" },
        { text: "农业" },
        { text: "渔业" },
        { text: "林业" },
        { text: "畜牧业" },
        { text: "农、林、牧、渔服务业" },
        { text: "中国共产党机关" },
        { text: "人民政协、民主党派" },
        { text: "国家机构" },
        { text: "基层群众自治组织" },
        { text: "群众团体、社会团体和其他成员组织" },
        { text: "专业技术服务业" },
        { text: "研究和试验发展" },
        { text: "科技推广和应用服务业" },
        { text: "软件和信息技术服务业" },
        { text: "土木工程建筑业" },
        { text: "房屋建筑业" },
        { text: "建筑安装业" },
        { text: "建筑装饰及建材" },
        { text: "水利管理业" },
        { text: "公共设备管理业" },
        { text: "生态保护和环境治理业" },
        { text: "互联网和相关服务" },
        { text: "电信、广播电视和卫星传输服务" },
        { text: "软件和信息技术服务业" },
        { text: "居民服务业" },
        { text: "机动车、电子产品和日用产品修理业" },
        { text: "其他服务业" },
        { text: "水的生产和供应业" },
        { text: "燃气生产和供应业" },
        { text: "商务服务业" },
        { text: "租赁业" },
        { text: "批发业" },
        { text: "零售业" },
        { text: "餐饮业" },
        { text: "住宿业" },
        { text: "卫生" },
        { text: "社会工作" },
        { text: "教育" },
        { text: "房地产业" },
        { text: "其他" }
      ],
      show: false,
      offset: 500,
      labListHeight: "",
      contentListTop: "",
      lease_order: [], // 租凭订单数量数组
      lease_order_one: {},
      lease_order_two: {},
      lease_order_three: {},
      lease_order_four: {},
      curIndex: 0,
      classList: [
        {
          name: "慈善超市",
          icon: require("../../assets/newImg/index/cscs.png"),
          href: "",
          id: 0
        },
        {
          name: "慈善医养",
          icon: require("../../assets/newImg/index/csyy.png"),
          href: "",
          id: 1
        },
        {
          name: "本地企业",
          icon: require("../../assets/newImg/index/bdqy.png"),
          href: "/list/enterprise",
          pathName: "enterprise",
          tag: "listEnterprise",
          id: 2
        },
        {
          name: "本地商铺",
          icon: require("../../assets/newImg/index/bdsp.png"),
          href: "",
          pathName: "classificationShop",
          tag: "listShop",
          id: 3
        },
        {
          name: "本地牛人",
          icon: require("../../assets/newImg/index/bdnr.png"),
          href: "",
          pathName: "classificationPeople",
          tag: "listPeople",
          id: 4
        },
        {
          name: "本地文化",
          icon: require("../../assets/newImg/index/bdwh.png"),
          href: "",
          id: 5
        },
        {
          name: "餐饮",
          icon: require("../../assets/newImg/index/cy.png"),
          href: "",
          id: 6
        },
        {
          name: "娱乐",
          icon: require("../../assets/newImg/index/yl.png"),
          href: "",
          id: 7
        },
        {
          name: "附近服务",
          icon: require("../../assets/newImg/index/fjfw.png"),
          href: "",
          id: 8
        },
        {
          name: "更多",
          icon: require("../../assets/newImg/index/gd.png"),
          href: "",
          id: 9
        }
      ],
      labList: [
        {
          id: 0,
          val: "全部",
          href: ""
        },
        {
          id: 1,
          val: "看企业",
          pathName: "listEnterprise",
          tag: "listEnterprise"
        },
        {
          id: 2,
          val: "看商铺",
          pathName: "listShop",
          tag: "listShop"
        },
        {
          id: 3,
          val: "看牛人",
          pathName: "listPeople",
          tag: "listPeople"
        }
      ],
      recommendList: [],
      recommendListStandby: [],
      address: "海淀区",
      city: "北京市",
      point: {},
      page: 0,
      loading: false,
      finished: false,
      contentList: [
        {
          id: 1,
          qsntitle: "中国慈善超市创新建设项目的实施主体，是慈善超市品牌推广、体系建设及社会化发展的,中国慈善超市创新建设项目的实施主体，是慈善超市品牌推广、体系建设及社会化发展的",
          sqnadress: "海淀区 拣到互联技术有限公司",
          catename: ["科技", "技术", "互联网"],
          texturl: [require("../../assets/newImg/index/pic1.png"), require("../../assets/newImg/index/pic1.png"), require("../../assets/newImg/index/pic1.png")],
          receive: 90,
          surplus: 10,
          state: 1,
          isLaunch: true,
          redmoney: 100,
          receive_status: 0,
          redmoneynum: 100,
          qsntype: 1
        },
        {
          id: 2,
          qsntitle: "中国慈善超市创新建设项目的实施主体，是慈善超市品牌推广、体系建设及社会化发展的,中国慈善超市创新建设项目的实施主体，是慈善超市品牌推广、体系建设及社会化发展的",
          sqnadress: "海淀区 拣到互联技术有限公司",
          catename: ["科技", "技术", "互联网"],
          texturl: [require("../../assets/newImg/index/pic1.png"), require("../../assets/newImg/index/pic1.png"), require("../../assets/newImg/index/pic1.png")],
          receive: 60,
          surplus: 40,
          state: 0,
          isLaunch: true,
          redmoney: 200,
          receive_status: 1,
          redmoneynum: 100,
          qsntype: 2
        },
        {
          id: 0,
          qsntitle: "中国慈善超市创新建设项目的实施主体，是慈善超市品牌推广、体系建设及社会化发展的,中国慈善超市创新建设项目的实施主体，是慈善超市品牌推广、体系建设及社会化发展的",
          sqnadress: "海淀区 拣到互联技术有限公司",
          catename: ["科技", "技术", "互联网"],
          texturl: [require("../../assets/newImg/index/pic1.png"), require("../../assets/newImg/index/pic1.png"), require("../../assets/newImg/index/pic1.png")],
          receive: 30,
          surplus: 70,
          state: 0,
          isLaunch: false,
          redmoney: 0,
          receive_status: 1,
          redmoneynum: 100,
          qsntype: 3
        }
      ],
      /**
       * @Author: 飞
       * @Date: 2021-08-12 19:58:49
       * @Describe: 进入了第几个
       */
      uidtypeindex: ""
    };
  },
  created() {},
  updated() {
    // !首次加载数据
    if (this.recommendList.length == 0) {
      this.getList();
    }
    console.log("少时诵诗书所所所所所所所所", this.recommendList.length);
  },
  activated() {
    // 推广 记录uid
    if (this.$route.query.uid != undefined) {
      console.log("少时诵诗书所所所所所所所所");
      window.localStorage.setItem("tuid", this.$route.query.uid);
    }
    /**
     * @Author: 飞
     * @Date: 2021-07-16 20:06:47
     * @Describe: 获取定位
     */
    this.getLocation();
    this.loading = false;
    // window.scrollTo(0, 0)
    // this.page = 1;

    this.getMemberData();
    this.ready();

    /**
     * @Author: 飞
     * @Date: 2021-08-27 10:33:57
     * @Describe: 判断是否登录
     */
    /**
     * @Author: 飞
     * @Date: 2021-07-07 10:56:18
     * @Describe: 全部
     */
    // this.getTypeList(this.curIndex + 1);
    // this.getTypeList(this.curIndex);

    // this.recommendList = [];
    window.addEventListener("scroll", this.slideHandle);

    this.contentListTop = this.$refs.contentList.getBoundingClientRect().top;
    // this.labListHeight = this.$refs.labList.getBoundingClientRect().height;

    // document.documentElement.scrollTop = 289.5
  },
  mounted() {
    // 全局事件总线(被动)  点赞
    EventBus.$on("likeEB", ({ num }) => {
      this.$nextTick(() => {
        console.log("------------全局事件总线(被动)出发啦-----------------------------", num, this.recommendList[this.uidtypeindex]);
        this.recommendList[this.uidtypeindex].fabulousstatus = num.state;
        this.recommendList[this.uidtypeindex].fabulous = this.recommendList[this.uidtypeindex].fabulous + num.type_N;
      });
    });
    // 全局事件总线(被动) 关注
    EventBus.$on("payAttentionToEB", ({ num }) => {
      this.$nextTick(() => {
        console.log("------------全局事件总线(被动)出发啦-----------------------------", num, this.recommendList[this.uidtypeindex]);
        this.recommendList[this.uidtypeindex].followstatus = num.state;
        this.recommendList[this.uidtypeindex].follow = this.recommendList[this.uidtypeindex].follow + num.type_N;
      });
    });
    // 全局事件总线(被动) 浏览
    EventBus.$on("Browse", () => {
      this.$nextTick(() => {
        console.log("全局事件总线(被动) 浏览");
        this.recommendList[this.uidtypeindex].browse = this.recommendList[this.uidtypeindex].browse + 1 * 1;
      });
    });
  },
  deactivated() {
    window.removeEventListener("scroll", this.slideHandle);
  },
  watch: {
    Level_2: function name(N, O) {
      console.log("N", N);

      if (N == 3) {
        this.header_show = 2;
      } else {
        this.header_show = "";
      }
    },
    $route: function (NEW, old) {
      console.log("NEW,old", NEW, old);
      if (NEW.name == "index") {
        // this.labCheckHandle(this.curIndex);
      }
      // if (NEW.name == "index" || old.name == "detailEnterprise") {
      //   console.log("`````````````````````````````",   .$store.state.Homogeneous);
      //   //
      //   // setTimeout(() => {
      //   //   // 存放进详情页的高度
      //   //   window.scrollTo(0, -this.$store.state.Homogeneous+123);
      //   // }, 2000);
      // }
    }
  },
  methods: {
    // RegionalChoice(){

    // },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.adcodeName = selectedOptions.map(option => option.label).join("/");
      this.adcode = selectedOptions[2].value; //区
      this.RegionalChoiceShow = false;

      this.labCheckHandle(this.curIndex);
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-25 14:19:22
     * @Describe:
     */
    onClickDisabled(name, title) {
      // Toast(title + "功能开发中");
      // Toast(name + "已被禁用");
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-25 13:41:22
     * @Describe:点击二级导航
     */
    onClick(name, title) {
      console.log("name,title", name, title);
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-23 18:58:54
     * @Describe:
     */
    Choose(item) {
      this.DefaultIndustry = item.text;
      this.show = false;
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-23 18:16:03
     * @Describe: 行业分类
     */
    Category() {
      this.show = true;
    },

    toSerchHandle() {
      // // H5调用电脑摄像头API
      // navigator.mediaDevices
      //   .getUserMedia({
      //     video: true
      //   })
      //   .then(success => {
      //     // 摄像头开启成功
      //     this.$refs["video"].srcObject = success;
      //     // 实时拍照效果
      //     this.$refs["video"].play();
      //   })
      //   .catch(error => {
      //     console.error("摄像头开启失败，请检查摄像头是否可用！");
      //   });
      // return;
      // console.log("toSerchHandle");
      // var cmr = plus.camera.getCamera();
      // var res = cmr.supportedImageResolutions[0];
      // var fmt = cmr.supportedImageFormats[0];
      // console.log("Resolution: " + res + ", Format: " + fmt);
      // // 摄像
      // // cmr.startVideoCapture( function( path ){
      // // 		alert( "Capture video success: " + path );
      // // 	},
      // // 	function( error ) {
      // // 		alert( "Capture video failed: " + error.message );
      // // 	},
      // // 	{resolution:res,format:fmt}
      // // );
      // // 拍照
      // cmr.captureImage(
      //   function (path) {
      //     alert("Capture image success: " + path);
      //   },
      //   function (error) {
      //     alert("Capture image failed: " + error.message);
      //   },
      //   { resolution: res, format: fmt }
      // );
      // return;
      this.$router.push(this.fun.getUrl("listSerch", "", { tag: "listSerch" }));
    },
    slideHandle() {
      this.contentListTop = this.$refs.contentList.getBoundingClientRect().top - this.labListHeight;
    },
    tolocation() {
      this.$router.push(this.fun.getUrl("o2oLocation", "", { tag: "index" }));
    },
    toDetail(obj, index) {
      // 高度存起来
      // this.$store.commit("Homogeneous", this.contentListTop);
      console.log("objobjobjobjobjobjobj", obj);
      this.$router.push(this.fun.getUrl("SharedComponentDetails", "", { objId: obj.id, qsntype: obj.qsntype }));
      this.uidtypeindex = index;
    },
    // 当组件滚动到底部时，会触发 load 事件并将 loading
    onLoad() {
      console.log("daodil", this.recommendList);
      this.page++;
      /**
       * @Author: 飞
       * @Date: 2021-07-07 10:56:18
       * @Describe: 全部
       */
      // if (this.curIndex + 1 === 0) {
      if (this.curIndex === 0) {
        if (this.recommendList.length > 4) {
          this.getList();
        }
      } else {
        /**
         * @Author: 飞
         * @Date: 2021-07-07 10:56:18
         * @Describe: 全部
         */
        // this.getTypeList(this.curIndex + 1);
        this.getTypeList(this.curIndex);
      }
    },
    getList(cd) {
      const data = {
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
        // uid: localStorage.getItem("uid"),
        page: this.page,
        adcode: this.adcode
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/orderlists";
      axios({
        method: "post",
        url: url,
        data
      })
        .then(res => {
          if (res.data.result === 1) {
            if (res.data.data.length !== 0) {
              res.data.data.forEach(item => {
                this.recommendListStandby.push(item);
              });
              this.recommendList = this.recommendListStandby;

              this.loading = false;
              this.finished = false;
            } else {
              this.finished = true;
            }
            console.log(this.contentListTop);
          } else {
            Toast("请先登录");
          }
        })
        .catch(error => {
          Toast("首次加载数据失败 即将自动更新数据");
        });
    },
    // 获取企业商铺牛人列表数据
    getTypeList(type) {
      const data = {
        uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
        // uid: localStorage.getItem("uid"),
        page: this.page,
        qsntype: type,
        adcode: this.adcode
        // qsncategory: this.qsncategory,
        // shop_name: this.searchVal
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/listsenterprise";
      return axios({
        method: "post",
        url: url,
        data
      })
        .then(res => {
          // console.log('res', res)
          if (res.data.result === 1) {
            if (res.data.data.length === 0) {
              this.finished = true;
              return false;
            } else {
              res.data.data.forEach(item => {
                this.recommendListStandby.push(item);
              });
              this.recommendList = this.recommendListStandby;

              this.loading = false;
              this.finished = false;
            }
            console.log(this.contentListTop);
          }
        })
        .catch(error => {
          console.error("摄像头开启失败，请检查摄像头是否可用！");
        });
    },
    classListHandle(obj) {
      //分类跳转

      this.$router.push(this.fun.getUrl(obj.pathName, "", { tag: obj.tag }));
    },
    // 切换分类
    labCheckHandle(index) {
      this.loading = true;
      this.curIndex = index;
      this.page = 1;
      console.log(index);
      this.recommendList = [];
      this.recommendListStandby = [];
      console.log(this.contentListTop);
      /**
       * @Author: 飞
       * @Date: 2021-07-07 10:56:18
       * @Describe: 全部
       */

      // this.getTypeList(index + 1);
      // this.getTypeList(index);

      /**
       * @Author: 飞
       * @Date: 2021-07-07 10:56:18
       * @Describe: 全部
       */
      if (index === 0) {
        this.getList();
      } else {
        this.getTypeList(index);
      }

      // this.$router.push(this.fun.getUrl(obj.pathName, '', { tag: obj.tag }))
    },
    scanningHandle() {
      Toast("请下载app");
    },
    getMemberData() {
      var that = this;
      $http
        .post("member.member.member-data", { v: 2 }, " ")
        .then(
          response => {
            if (response.result === 1) {
              that.newTemplate(response.data.designer);
              console.log("newTemplate", response.data.designer);

              // that.getMemberInfo(response.data.member, response.data.order, response.data.plugins);
              // that.lease_order = response.data.order.lease_order;
              // if (!that.fun.isTextEmpty(that.lease_order)) {
              //   that.lease_order.map(item => {
              //     if (item.status == "0") {
              //       that.lease_order_one = item;
              //     } else if (item.status == "1") {
              //       that.lease_order_two = item;
              //     } else if (item.status == "2") {
              //       that.lease_order_three = item;
              //     } else if (item.status == "3") {
              //       that.lease_order_four = item;
              //     }
              //   });
              // }

              // if (!that.fun.isTextEmpty(response.data.member.yz_member)) {
              //   that.custom_value = response.data.member.yz_member.custom_value;
              //   that.getMemberCustom(that.custom_value, response.data.member.yz_member.validity, response.data.setting.custom); // 获取自定义数据
              // }
              // that.wechat_login_mode = response.data.setting.wechat_login_mode;
              // that.getEnablePlugin(response.data.plugins);
              // that.getStroeWithdraw(response.data.plugins.is_open);
              // that.getExtension(response.data.relation);
              // that.getMemberGrade(response.data.setting.level);
            } else {
              Toast(response.msg);
              that.template = "01";
              require("@/assets/css/member/02.scss");
            }
          },
          response => {
            console.log(response.msg);
            require("@/assets/css/member/02.scss");
          }
        )
        .catch(err => {
          console.error(err);
          require("@/assets/css/member/02.scss");
        });
    },
    newTemplate(data) {
      // $http.get("member.member-designer.index").then(
      //   response => {
      //     if (response.result === 1) {
      console.log("designer.map", data);
      this.designer = data.datas;
      // this.showDiy = [];
      // this.designer.map((item, index, key) => {
      //   if (item.temp === "showdiyform") {
      //     this.showDiy.push(item);
      //   }
      // });

      for (let i in this.designer) {
        this.designer[i].temp = "show" + this.designer[i].temp;
        if (this.designer[i].temp === "showlocation" || this.designer[i].temp === "showstore") {
          this.isLocation = true;
        }
      }
      window.localStorage.setItem("yzdesigner", JSON.stringify(this.designer));
      this.$store.commit("membertempIndex", data);
      this.designerStatus = data.status;
      window.yzdesignerStatus = this.designerStatus;
      // this.getMemberData();
      //     } else {
      //     }
      //   },
      //   response => {
      //     console.log(response.msg);
      //   }
      // );
    },
    ready: function () {
      //this.getLocation();

      //var myLocation = window.localStorage.getItem('myLocation');
      var myLocation = this.$store.state.o2oLocation;
      console.log("myLocation", myLocation);
      /**
       * @Author: 飞
       * @Date: 2021-06-11 14:54:01
       * @Describe:
       */
      // 看领首页地址切换 切换完之后还是跳转到首页
      this.$store.commit("setReferer", window.location.href);
      //console.log('path::::::', this.$route.path);
      if (myLocation.point) {
        this.address = myLocation.title;
        this.city = myLocation.city;
        this.point = myLocation.point;
        console.log("temp myLocation:", myLocation);

        //初始化数据
        //this.getStores();
        //this.getStoresCategory();
      } else {
        console.log("location不存在");
        this.getLocation();
      }
    },

    getLocation() {
      var that = this;
      var mapObj = new AMap.Map("iCenter");
      mapObj.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        console.log("geoloca定位定位定位定位定位定位定位tion", geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); // 返回定位信息
        AMap.event.addListener(geolocation, "error", onError); // 返回定位出错信息
      });

      function onComplete(obj) {
        console.log("定位定位定位定位定位定位定位", obj);
        var currentAddress = {
          adcode: obj.addressComponent.adcode,
          citycode: obj.addressComponent.citycode,
          lat: obj.position.lat,
          lng: obj.position.lng
        };
        window.localStorage.setItem("currentAddress", JSON.stringify(currentAddress));

        let testData = window.localStorage.getItem("currentAddress");
        console.log("currentAddresscurrentAddresscurrentAddresscurrentAddresscurrentAddresscurrentAddresscurrentAddresscurrentAddresscurrentAddresscurrentAddress", testData);
        var res =
          "经纬度：" +
          obj.position +
          "\n精度范围：" +
          obj.accuracy +
          "米\n定位结果的来源：" +
          obj.location_type +
          "\n状态信息：" +
          obj.info +
          "\n地址：" +
          obj.formattedAddress +
          "\n地址信息：" +
          JSON.stringify(obj.addressComponent, null, 4);
        //alert(res);
        //alert(JSON.stringify(obj.addressComponent, null, 4));
        var position = obj.position.toString().split(",");
        that.point = {
          lat: position[1],
          lng: position[0]
        };
        that.address = obj.formattedAddress;
        that.title = obj.formattedAddress;
        that.city = !that.fun.isTextEmpty(obj.addressComponent.city) ? obj.addressComponent.city : obj.addressComponent.province;

        var pos = {
          address: obj.formattedAddress,
          city: that.city,
          title: obj.formattedAddress,
          point: that.point,
          adcode: obj.addressComponent.adcode,
          citycode: obj.addressComponent.citycode,
          lat: obj.position.lat,
          lng: obj.position.lng
        };
        console.log("test pos", pos);
        that.$store.commit("updateLocation", pos);
        that.$store.commit("setLocation", pos);
        window.localStorage.setItem("myLocation", JSON.stringify(pos));
      }

      function onError(obj) {
        //alert(obj.info + '--' + obj.message);
        console.log(obj);
      }

      /*var that = this;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                console.log('您的位置ok：', r);
                that.address = r.address.city;
                that.city = r.address.city;

                that.point = r.point;
                var pos = {
                    address:that.address,
                    city:that.city,
                    title:that.address,
                    point:that.point,
                }
                //this.balance = this.$store.state.balance;
                that.$store.commit('updateLocation', pos);
                that.$store.commit('setLocation', pos);
                window.localStorage.setItem("myLocation",JSON.stringify(pos));
                //that.getStores();
            }
            else {
                todo, 获取收货地址
                that.getMyAddress();
            }
        },{enableHighAccuracy: true})
   */
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
/**
 * @Author: 飞
 * @Date: 2021-06-23 18:06:46
 * @Describe: 行业分类
 */
.Category {
  background: #fff;
  height: 3.25rem;
  margin: 0 0.63rem;
  border-radius: 0.38rem;
  margin-top: 0.56rem;
  .Cate_div {
    display: inline-block;
    margin: 0.69rem 0.15rem 0;
    width: 10.31rem;
    height: 1.88rem;
    background: #f0f7ff;
    border-radius: 0.5rem;

    .van-ellipsis {
      height: 100%;
      width: 100%;
      display: inline-block;
      // padding-top: 0.4rem;
      .div:nth-child(2) {
        width: 56%;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        font-size: 0.88rem;
        margin: 0 0.2rem;
        color: #0579fc;
        vertical-align: bottom;
        display: inline-block;
        line-height: 1.9rem;
      }
      div {
        display: inline-block;
      }

      .Classification {
        width: 1rem;
        height: 1rem;
      }
      .div {
        height: 100%;
        display: inline-flex;
        align-items: center;
      }

      .ieon {
        width: 1rem;
        height: 0.5rem;
        vertical-align: super;
        display: inline-flex;
        align-items: center;
        img {
          width: 0.5rem;
          height: 0.31rem;
          vertical-align: top;
          margin-top: 0.1rem;
        }
      }
    }
  }
}
.addressIcon {
  margin-right: 5px;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.content {
  padding-bottom: 3.125rem;
  height: 100%;
}
.header {
  // background: linear-gradient(180deg, #0283ff 0%, #0579fc 100%);
  height: 9.83rem;
  overflow: hidden;
  // background: url("../../assets/newImg/index/indetbg.png") no-repeat;
  // background-size: 100% 100%;
  // background-color: burlywood;
}
//
.header_show {
  display: none;
}
// 头部区域
.title {
  div {
    font-size: 1.63rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 2.25rem;
    text-shadow: 0px 0px 0px rgba(28, 83, 204, 0.61);
  }
  p {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 1.5rem;
  }
  // display: flex;
  // flex-wrap: nowrap;
  // flex-direction: row;
  // justify-content: center;
  // height: 4.125rem;
  // margin-top: 1.6875rem;

  // h3 {
  //   font-size: 1.9375rem;
  //   line-height: 2.125rem;
  //   color: #fff;
  //   opacity: 0;
  // }
  // .titleExplain {
  //   width: 5.9375rem;
  //   height: 2.125rem;
  //   background-color: #cb3030;
  //   color: #fff;
  //   font-size: 0.5rem;
  //   line-height: 1.0625rem;
  //   margin: 0 0.625rem;
  //   text-align: center;
  //   opacity: 0;
  // }
}
.serchInfo {
  margin-top: 1rem;
  padding: 0 0.63rem;
  height: 60px;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.titleAddress {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.titleAddressInfo {
  display: flex;
  flex-direction: column;
  width: 2.3438rem;
  overflow: hidden;
  span {
    width: 100%;
    display: block;
    color: #fff;
    font-size: 0.625rem;
    font-family: Helvetica;
    color: #ffffff;
    line-height: 0.9375rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.titleAddressIcon {
  width: 0.625rem;
  height: 0.375rem;
  background-image: url(../../assets/newImg/index/address.png);
  background-size: 100% 100%;
  margin-top: 0.625rem;
}
.serchInput {
  position: relative;
  width: 19.5rem;
  height: 1.875rem;
  background: rgba(188, 218, 255, 0.3);
  border-radius: 0.3125rem;
  margin-left: 0.3125rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;

  i {
    color: #ffffff99;
    width: 1rem;
    height: 1rem;
    margin: 0.44rem 0 0.44rem 0.75rem;
  }
  span {
    font-size: 0.75rem;
    font-family: Helvetica;
    color: #ffffff99;
    line-height: 1.875rem;
    margin-left: 0.4688rem;
  }
  .scanning {
    position: absolute;
    right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    background-size: 100% 100%;
    // background-image: url("../../assets/newImg/index/scanning.png");
  }
}
.classList {
  width: 22.4375rem;
  height: 11rem;
  margin: -2.0313rem auto 0;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 1.25rem;
}
.classList ul {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  overflow: hidden;
  // padding-top: 0.3125rem;
  li {
    width: 20%;
    margin-top: 1.25rem;
    img {
      width: 2.25rem;
      height: 2.25rem;
      // width: 2.875rem;
      // height: 2.875rem;
    }
    div {
      text-align: center;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 17px;
    }
  }
}
.labList {
  /**
   * @Author: 飞
   * @Date: 2021-07-06 11:26:10
   * @Describe: 点击视频  顶部透明
   */
  /deep/.van-sticky {
    background: url("../../assets/newImg/index/VectorBackgroundB.png") no-repeat;
    background-size: 100% 90%;
    .NavigateOne {
      padding: 0 2.88rem;
      padding-bottom: 0.63rem;
    }
  }

  .fixed {
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 100%;
    z-index: 9999;
    // 一级导航
    .cur {
      span {
        color: #fff;
      }
      i {
        background-color: #fff;
      }
    }
    li {
      color: hsla(0, 0%, 100%, 0.4);
    }
    // 二级导航
    /deep/.SecondaryNavigation {
      .van-tabs__nav {
        // background-color: #fff0;

        .van-tab {
          color: hsla(0, 0%, 100%, 0.4);
        }
        .van-tab--active {
          color: #fff;
        }
      }
    }
    // 三级导航
    .Category {
      background-color: #3a84ff00;
    }
  }

  /**
   * @Author: 飞
   * @Date: 2021-06-28 10:52:34
   * @Describe:改 Sticky 粘性布局 吸顶
   */

  // padding: 0 10px;
  /**
   * @Author: 飞
   * @Date: 2021-06-25 13:46:20
   * @Describe: 二级导航.
   */
  .SecondaryNavigation {
    /deep/.van-tabs__nav {
      background: #ffffff;
      margin: 0 0.63rem;
      border-radius: 0.38rem;
    }
    /deep/.van-tabs__nav--line {
      padding-bottom: 0;
    }
    /deep/.van-tabs__wrap {
      color: burlywood;
      //  下边框线条
      .van-tabs__line {
        height: 0px;
      }

      // 默认二级的颜色
      .van-tab {
        color: #999999;
        .van-tab__text {
          font-size: 16px;
          font-family: Helvetica;
          line-height: 18px;
        }
      }
      // 选中二级的颜色
      .van-tab--active {
        font-size: 1rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #0579fc;
        line-height: 1.38rem;
      }
    }
  }
  ul {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    padding: 18px 0 0 0;
    justify-content: space-between;
  }
  li {
    text-align: center;
    font-size: 1rem;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #e5effe;
    line-height: 1.38rem;
    display: flex;
    flex-direction: column;
    i {
      display: inline-block;
      height: 0.25rem;
      width: 3rem;
      background-color: #e5effe;
      border-radius: 5px;
      margin: 0 auto;
      display: none;
      margin-top: 0.31rem;
    }
    span {
      font-size: 1rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 37px;
    }
  }
  li:nth-of-type(1) i {
    width: 2.5rem;
  }
  .cur {
    color: #fff;
    span {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
    i {
      display: inline-block;
    }
  }
}
/deep/.van-cell::after {
  border-bottom: none !important;
}
/**
 * @Author: 飞
 * @Date: 2021-06-29 14:58:30
 * @Describe: 刷视频
 */
.BrushVideo {
  // height: calc(100% - 123px);
  // height: calc(100% - 140px);
  // height: 100%;
  // height: calc(100vh + 50px);
  height: 100vh;
}
.contentList {
  background-color: #f6f6f6;
  min-height: 1500px;
  /deep/.van-list {
    padding-bottom: 54px;
  }
  /deep/.van-cell {
    width: 95%;
  }
  /deep/ .contentItem {
    // border-bottom: 1px solid #e4e4e4;
    overflow: hidden;
    position: relative;
    padding: 10px;
    background-color: #fff;
    margin: 0.625rem;
    border-radius: 0.38rem;
    .topContent {
      display: inline-block;
      border-radius: 50%;
      width: 100%;
      .van-image {
        width: 2.5rem;
        height: 2.5rem;
        img {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
        }
      }
      // 未投放
      .Unprotected {
        vertical-align: middle;
      }
    }
    .van-multi-ellipsis--l2 {
      font-size: 1rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #3a3a3e;
      line-height: 1.5rem;
      margin-bottom: 0.56rem;
    }
  }
  .receive {
    // opacity: 0.8;
    .progress {
      opacity: 0.8;
    }
    .photo {
      opacity: 1;
    }
  }
  .isReceive {
    width: 5rem;
    height: 5rem;
    background-image: url(../../assets/newImg/index/receive.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 3.75rem;
  }
  // 红包
  .RedEnvelope {
    display: inline-block;
    vertical-align: top;
    width: 13%;
    text-align: center;
    img {
      width: 1.45rem;
      height: 1.5rem;
    }
  }
  // 未投放内容   img
  .UnprotectedText {
    display: inline-block;
    margin-left: 0.38rem;
    width: 52%;
    vertical-align: middle;
  }
  .UnprotectedTextImg {
    vertical-align: middle;
    display: inline-block;
    width: 33%;
    img {
      width: 1.25rem;
      height: 1.25rem;
      vertical-align: text-top;
    }
    span {
      font-size: 0.88rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #6c6c73;
      line-height: 1.38rem;
    }
  }
  .topMiddle {
    display: inline-block;
    margin-left: 0.38rem;
    width: 72%;
    .topMiddleInformation {
      width: 100%;

      span:nth-child(1) {
        font-size: 0.75rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #6c6c73;
        line-height: 1.06rem;
        margin-right: 0.63rem;
      }
      span:nth-child(2) {
        font-size: 0.75rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #0579fc;
        line-height: 1.06rem;
      }
    }
    .introduction {
      display: inline-block;
      vertical-align: bottom;
      // box-sizing: content-box;
      // // height: 2.75rem;
      // // height: 1.375rem;
      // margin-top: 0.5rem;
      // margin-bottom: 8px;
      // text-overflow: -o-ellipsis-lastline;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // -webkit-line-clamp: 2;
      // -webkit-box-orient: vertical;

      // font-size: 18px;
      // font-family: PingFangSC-Regular, PingFang SC;
      // font-weight: 400;
      // color: #3a3a3e;
      // line-height: 27px;

      font-size: 0.88rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 1.25rem;
    }
  }
  .receive .introduction {
    color: #666666;
  }
  .nameAddress {
    // display: flex;
    // flex-wrap: wrap;
    // flex-direction: row;
    // justify-content: flex-start;
    //  height: 1.25rem;
    font-size: 0.875rem;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: #0579fc !important;
    line-height: 1.25rem;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    span {
      display: inline-block;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #6c6c73;
      line-height: 22px;
    }
    span:nth-child(2) {
      width: 48%;
    }
    span:nth-child(4) {
      width: 34%;
    }
    .img {
      width: 22px;
      height: 22px;
      margin-right: 8px;
    }
  }
  .receive .nameAddress {
    color: #666666;
    span {
      color: #666666;
    }
  }
  .itemName {
    height: 1.25rem;
    font-size: 0.875rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #666666;
    line-height: 1.25rem;
  }
  .addressInfo {
    height: 1.25rem;
    font-size: 0.875rem;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: #333333;
    line-height: 1.25rem;
  }
  .labelInfo {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    padding-top: 8px;
    padding-bottom: 4px;
    padding-left: 0;
    span {
      margin-right: 0.625rem;
      margin-bottom: 0.3125rem;
      line-height: 18px;
      border-radius: 0.1875rem;
    }

    li {
      height: 18px;
      font-size: 10px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      line-height: 18px;
      border-radius: 0.1875rem;
      box-sizing: content-box;
      padding: 0 0.3125rem;
      margin-right: 0.625rem;
      margin-bottom: 0.3125rem;
      border-radius: 0px 3px 0px 3px;
      // display: flex;
      // /*实现垂直居中*/
      // align-items: center;
      // /*实现水平居中*/
      // justify-content: center;

      // text-align: justify;
    }
    li:nth-child(3n + 1) {
      background-color: #e0eefe;
      color: #0579fc;
    }
    li:nth-child(3n + 2) {
      background-color: #e9f9e6;
      color: #50c81b;
    }
    li:nth-child(3n + 3) {
      background-color: #ffe9da;
      color: #fa6400;
    }
  }
  .photo {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    li {
      margin-right: 0.5rem;
      width: 33%;
      height: 6.5625rem;
      // margin-right:0.625rem;
      /**
       * @Author: 飞
       * @Date: 2021-06-22 14:25:28
       * @Describe: 首页列表图片填充
       */
      /deep/.van-image {
        width: 100%;
        height: 100%;
        img {
          border-radius: 0.5rem;
        }
      }
      // img {
      //   width: 100%;
      //   height: 100%;
      // }
    }
    li:nth-of-type(3) {
      margin-right: 0;
    }
  }
  .progress {
    margin-top: 0.5rem;

    .Remainder {
      display: inline-block;
      font-size: 0.63rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #9c9ca6;
      line-height: 0.88rem;
      width: 34%;
      text-align: center;
      span {
        color: #fc575a;
      }
    }
  }

  // <div class="progressBox">
  //   <div class="progressContent" :style="'width:' + ((findItem.redmoneynum - findItem.surplusnum) / findItem.redmoneynum) * 100 + '%;'"></div>
  // </div>
  // <div class="surplus">
  //   <span>已领{{ findItem.redmoneynum }}个</span>
  //   <span>剩余{{ findItem.surplusnum }}个</span>
  // </div>
  .progressBox {
    display: inline-flex;
    width: 66%;
    height: 0.4rem;
    background-color: #fbeded;
    border-radius: 0.25rem;
    overflow: hidden;
    justify-content: flex-end;
    .progressContent {
      height: 0.4rem;
      background: linear-gradient(270deg, #ff8068 0%, #ff5665 100%);
      //  width:30%;
      border-radius: 0.25rem;
    }
  }
  .surplus {
    box-sizing: content-box;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    height: 0.875rem;
    font-size: 0.625rem;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #666666;
    line-height: 0.875rem;
    border-bottom: 1px solid #f6f6f6;
  }
}
// .contentListPaddingTop {
//   padding-top: 4rem;
// }
.iconInfo {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  vertical-align: middle;
  overflow: hidden;
  margin-top: 6px;
  padding: 0 1rem;
  div {
    vertical-align: middle;
    line-height: 1.25rem;
    overflow: hidden;
    text-align: center;
    img {
      width: 18px;
      height: 18px;
    }
  }
  span {
    display: inline-block;
    margin: 0 0 0 0.3125rem;
    vertical-align: 4px;

    font-size: 14px;
    font-family: Helvetica;
    color: #6c6c73;
    line-height: 22px;
  }
}
.notSet {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  .notSetPhoto {
    margin-top: 16px;
    width: 5.625rem;
    height: 5.625rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.5rem;
    }
  }
  .UnprotectedTit {
    font-size: 0.75rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0579fc;
    line-height: 1.06rem;
  }
  .noSetInfo {
    width: 15.1rem;
    margin-top: 4px;
    margin-left: 0.625rem;
    span {
      margin-top: 0.56rem;
      font-size: 0.63rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #9c9ca6;
      line-height: 0.88rem;
    }
  }
  .noSetintroduction {
    font-size: 1rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3a3a3e;
    line-height: 1.5rem;
    margin-top: 0.5rem;
  }
  .noSetNameAddress {
    font-size: 0.875rem;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: #0579fc !important;
    line-height: 1.25rem;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    div {
      span {
        display: inline-block;
        margin-right: 8px;

        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #6c6c73;
        line-height: 22px;
      }
      .img {
        width: 22px;
        height: 22px;
        vertical-align: sub;
        margin-right: 8px;
      }
    }
  }
  .noSetItemName {
    height: 1.25rem;
    font-size: 0.875rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #666666;
    line-height: 1.25rem;
  }
  .noSetAddressInfo {
    display: -webkit-box;
    // height: 1.25rem;
    overflow: hidden;
    vertical-align: middle;
    // padding: 0.375rem 0;
    img {
      // margin-top:0.375rem;
      width: 0.75rem;
      height: 0.875rem;
    }
    span {
      height: 1.25rem;
      font-size: 0.875rem;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: #333333;
      line-height: 1.25rem;
      // margin-left: 0.375rem;
    }
  }
  .noSetLabelInfo {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0.2rem 0;
    padding-left: 0;
    span {
      margin-right: 0.625rem;
      margin-bottom: 0.3125rem;
      line-height: 18px;
      border-radius: 0.1875rem;
    }
    li {
      height: 18px;
      font-size: 10px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      line-height: 10px;
      border-radius: 0px 3px 0px 3px;
      box-sizing: content-box;
      padding: 0 0.3125rem;
      margin-right: 0.625rem;
      margin-bottom: 0.3125rem;
      display: flex;
      /*实现垂直居中*/
      align-items: center;
      /*实现水平居中*/
      justify-content: center;

      text-align: justify;
    }

    li:nth-child(3n + 1) {
      background-color: #e0eefe;
      color: #0579fc;
    }
    li:nth-child(3n + 2) {
      background-color: #e9f9e6;
      color: #50c81b;
    }
    li:nth-child(3n + 3) {
      background-color: #ffe9da;
      color: #fa6400;
    }
  }
}

.noSetProgress .progressBox .progressContent {
  background-color: #f8f8f8;
}
.notSetSurplus {
  box-sizing: content-box;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-end;
  height: 0.875rem;
  font-size: 0.625rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #666666;
  line-height: 0.875rem;
}
</style>
