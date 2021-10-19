<template>
  <div class="content">
    <van-tabs @change="changeTab(active)" v-model="active" color="#0579fc" swipeable title-active-color="#0579fc">
      <van-tab v-for="item in labelList" :key="item.id" :title="item.title">
        <div class="findList">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="offset" @load="onLoad">
            <van-cell v-for="findItem in findList" :key="findItem.id" @click="toDetailHandle(findItem.id)">
              <div class="findItem">
                <div class="userInfo">
                  <div class="userPhoto 1"><img :src="findItem.logourl" alt="" /></div>
                  <div class="userName">
                    <div>{{ findItem.qsn_name }}</div>
                    <span>{{ findItem.createtime }}</span>
                  </div>
                </div>
                <!-- <p class="introduction"></p> -->

                <!-- 最多显示两行 -->
                <div class="van-multi-ellipsis--l2 introduction">
                  <span class="typeName">{{ findItem.typename }}</span>

                  {{ findItem.content }}
                </div>

                <!-- <div class="address"><van-icon color="#999" class="addressIcon" name="location" />{{ findItem.sqnadress }}</div> -->
                <!-- <div class="itemType">{{ findItem.typename }}</div> -->
                <ul class="photo">
                  <li v-for="(photoItem, photoIndex) in findItem.texturl" :key="photoIndex">
                    <img :src="photoItem" alt="" />
                  </li>
                </ul>
                <div class="area">{{ findItem.sqnadress }}</div>

                <div class="progress">
                  <div class="progressBox">
                    <div class="progressContent" :style="'width:' + ((findItem.redmoneynum - findItem.receive) / findItem.redmoneynum) * 100 + '%;'"></div>
                  </div>
                  <div class="Remainder">
                    <template v-if="findItem.surplus == 0"> 红包已领完～ </template>
                    <template v-if="findItem.surplus > 0">
                      红包剩余 <span>{{ findItem.surplus }}</span> 个
                    </template>
                  </div>
                  <!--<div class="progressBox">
                    <div class="progressContent" :style="'width:' + ((findItem.redmoneynum - findItem.receive) / findItem.redmoneynum) * 100 + '%;'"></div>
                  </div>
                  <div class="surplus">
                    <span>已领{{ findItem.receive }}个</span>
                    <span>剩余{{ findItem.surplus }}个</span>
                  </div> -->
                </div>
                <div class="toType">
                  <div class="typeName">{{ findItem.typename }}</div>
                  <div class="typeNum" @click.stop="toTypeHandle(findItem.type)">
                    <span>{{ findItem.typenum }}条最新发布</span>
                    <van-icon name="arrow" />
                  </div>
                </div>

                <div class="iconInfo">
                  <div>
                    <img src="../../assets/newImg/index/lookIn.png" alt="" />
                    <span>{{ findItem.browse }}</span>
                  </div>
                  <div>
                    <img v-if="findItem.fabulousstatus === 0" src="../../assets/newImg/index/like.png" alt="" />
                    <img v-else src="../../assets/newImg/index/like1.png" alt="" />
                    <span>{{ findItem.fabulous }}</span>
                  </div>
                  <div>
                    <img src="../../assets/newImg/index/Comment.png" alt="" />
                    <span>{{ findItem.comment }}</span>
                  </div>
                  <div>
                    <img v-if="findItem.followstatus === 0" src="../../assets/newImg/index/collect.png" alt="" />
                    <img v-else src="../../assets/newImg/index/collect1.png" alt="" />
                    <span>{{ findItem.follow }}</span>
                  </div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 发布按钮 -->
    <div class="addBtn" v-if="showAdd">
      <van-popover @open="onOpen" class="6666666666" v-model="showPopover" trigger="click" :actions="actions" placement="top-end" @select="onSelect" :overlay="true">
        <template #reference>
          <img src="./img/release.png" alt="" />
        </template>
      </van-popover>
    </div>
  </div>
</template>

<script>
//发现列表
import { Tab, Tabs, List } from "vant";
export default {
  name: "find",
  data() {
    return {
      // 从新获取的uid 倪更改 time: 2021/4/8
      uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
      // uid: window.localStorage.getItem('uid'),
      page: 1,
      offset: 500,
      finished: true,
      loading: false,
      active: 0,
      labelList: [
        {
          title: "全部",
          id: 0
        },
        {
          title: "企业采购",
          id: 1
        },
        {
          title: "企业招商",
          id: 2
        },
        {
          title: "提问求助",
          id: 3
        },
        {
          title: "介绍推荐",
          id: 4
        },
        {
          title: "本地生活",
          id: 5
        },
        {
          title: "个人需求",
          id: 6
        }
      ],
      findList: [],
      showAdd: false,
      showPopover: false,
      actions: [{ text: "企业采购",id:1 }, { text: "企业招商",id:2 }, { text: "提问求助",id:3 }, { text: "介绍推荐",id:4 }, { text: "本地生活",id:5 }, { text: "个人需求",id:6 }],
    };
  },
  activated() {
    this.page = 0;
    this.findList = [];
    // 判断是否可发布商机
    this.isShowAdd();
    this.onLoad();
  },
  deactivated() {
    this.findList = [];
  },
  watch: {

  },
  methods: {
    // 发布菜单打开
    onSelect(action){
      this.$router.push(this.fun.getUrl("findAdd", "", { typesss: action.id }));
    },
    // 打开文字跳转
    toDetailHandle(id) {
      this.$router.push(this.fun.getUrl("findDetail", "", { findId: id }));
    },
    // 判断是否可发布商机
    isShowAdd() {
      const data = {
        uid: this.uid
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/shoufind";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        if (res.data.result === 1) {
          this.showAdd = true;
        } else {
          this.showAdd = false;
        }
      });
    },
    toTypeHandle(type) {
      console.log("点击");
      this.active = type;
      this.findList = [];
      this.page = 1;
      this.getList();
    },
    getList() {
      const data = {
        type: this.active,
        uid: this.uid,
        page: this.page
      };
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v1/findlists";
      axios({
        method: "post",
        url: url,
        data
      }).then(res => {
        if (res.data.result === 1) {
          if (res.data.data.length !== 0) {
            res.data.data.forEach(item => {
              // console.log('item.sqnadress.indexOf("市")',item.sqnadress.indexOf("省"));
              if (item.sqnadress.indexOf("省") == -1) {
                if (item.sqnadress.indexOf("市") != -1) {
                  item.sqnadress = item.sqnadress.split("市")[0];
                }
              } else {
                item.sqnadress = item.sqnadress.split("省")[0];
              }
              this.findList.push(item);
            });
            this.loading = false;
            this.finished = false;
          } else {
            this.finished = true;
          }
        }
      });
    },
    onLoad() {
      //懒加载
      this.page++;
      this.getList();
    },
    changeTab(index) {
      this.findList = [];
      this.page = 1;
      this.getList();
    },
  },

};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.content {
  width: 100%;
  // /deep/.van-tab--active{
  //   color: #0579FC;
  // }
  /deep/.van-tab {
    .van-tab__text {
      font-size: 1.13rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }
  }
}
/deep/.van-overlay {
  z-index: 1000;
}
/deep/.van-popup {
  // 倒三角
  .van-popover__arrow {
    color: #fff;
  }
  .van-popover__content {
    background-color: #fff;
  }
}
/deep/.van-tabs__wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
/deep/.van-tabs__content {
  padding-top: 44px;
}
/deep/.van-cell::after {
  border-bottom: none;
}

.area {
  font-size: 0.63rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;

  margin-top: 0.5rem;
}
.findItem {
  .userInfo {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    .userPhoto {
      width: 2.375rem;
      height: 2.375rem;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .userName {
      margin-left: 0.5625rem;
      div {
        height: 1.0625rem;
        font-size: 0.75rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #333333;
        line-height: 1.0625rem;
      }
      span {
        display: block;
        height: 0.875rem;
        font-size: 0.625rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #999999;
        line-height: 0.875rem;
        margin-top: 5px;
      }
    }
  }
  .introduction {
    font-size: 1rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3a3a3e;
    margin: 0.4rem 0 0 0;
    .typeName {
      display: inline-block;
      height: 1.25rem;
      background: linear-gradient(135deg, #7faafe 0%, #1783fd 100%);
      border-radius: 0.19rem;
      font-size: 0.75rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 1.25rem;
      padding: 0 0.4rem;
      vertical-align: text-bottom;
    }
  }
  .address {
    // height: 1.25rem;
    font-size: 0.875rem;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: #0579fc;
    line-height: 1.25rem;
  }
  .addressIcon {
    margin-right: 5px;
  }
  .itemType {
    width: 3.7875rem;
    height: 1.125rem;
    background: #cde4fe;
    border-radius: 0.1875rem;
    // opacity: 0.2;
    font-size: 0.625rem;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: #0579fc;
    line-height: 1.125rem;
    padding: 0 0.3125rem;
    margin-top: 0.4688rem;
    text-align: center;
  }
  .photo {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 16px;
    li {
      margin-right: 0.5rem;
      width: 6.5625rem;
      height: 6.5625rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.4rem;
      }
    }
    li:nth-of-type(3) {
      margin-right: 0;
    }
  }
  .progress {
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
  }
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
  .toType {
    width: 20.9375rem;
    height: 1.875rem;
    background: #f8f8f8;
    border-radius: 6px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.75rem;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #999999;
    line-height: 1.875rem;
    padding: 0 0.625rem;
    span {
      vertical-align: 2px;
    }
    .typeName {
      color: #0579fc;
    }
  }
}
// 发布按钮
.addBtn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  position: fixed;
  right: 0.9375rem;
  top: 31.25rem;
  z-index: 2020;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
