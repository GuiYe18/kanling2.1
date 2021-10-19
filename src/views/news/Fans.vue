<!--
 * @Author: 飞
 * @Date: 2021-06-08 15:48:06
 * @LastEditTime: 2021-08-26 14:03:33
 * @FilePath: \you-shop1\src\views\news\Fans.vue
 * @Describe: 
-->

<template>
  <div>
    <van-search v-model="value" placeholder="搜索用户" class="search" @focus="OnFocus" @blur="ingBlur" />
    <van-list v-if="!searchShow" :finished="finished" :finished-text="HowManyPeople">
      <van-index-bar :index-list="Lettercombination">
        <!--  -->
        <div v-for="(items, index) in list" :key="index">
          <van-index-anchor :index="items[0].letter" />
          <!-- <p style="text-align: left; padding-left: 1rem">{{ items[0].letter }}</p> -->
          <router-link v-for="(item, index) in items" :key="index" :to="fun.getUrl('SolitudeChat', {}, { username: item.username, nickname: item.nickname })">
            <van-cell>
              <van-image class="Avatar" :src="item.photo_wx">
                <template v-slot:error>加载失败</template>
              </van-image>
              <!-- <div class="Avatar">
            <img  alt="" /> -->
              <van-badge v-if="item.unread_msg_count != 0" :content="item.unread_msg_count" />
              <!-- </div> -->
              <div class="text">
                <!-- <van-badge :content="5">
              <div class="child">{{ item.nickName }}</div>
            </van-badge> -->

                <!-- <h2>{{ item }}</h2> -->
                <h2>{{ item.nickname }}</h2>
                <!-- <h2>用户名: {{ item }}</h2> -->
                <!-- <div class="van-ellipsis">{{ item.uuid }}</div> -->
              </div>
            </van-cell>
          </router-link>
        </div>
        <!--  -->
      </van-index-bar>
    </van-list>
    <!-- <div style="color: #969799; font-size: 14px; line-height: 50px; text-align: center">粉丝接口正在维护</div> -->
    <!-- 搜索结构 -->
    <van-list>
      <template v-if="searchShow">
        <!-- 搜索后的项 -->
        <!-- <template v-if="!DoYouStartSearch"> -->
        <template>
          <div v-for="(item, index) in FansList_Search" :key="index">
            <router-link :key="index" :to="fun.getUrl('SolitudeChat', {}, { username: item.username, nickname: item.nickname })">
              <van-cell>
                <van-image class="Avatar" :src="item.photo_wx">
                  <template v-slot:error>加载失败</template>
                </van-image>
                <van-badge v-if="item.unread_msg_count != 0" :content="item.unread_msg_count" />
                <div class="text">
                  <h2>{{ item.nickname }}</h2>
                </div>
              </van-cell>
            </router-link>
          </div>
        </template>
        <!-- 搜索前的项
         -->

        <!-- <div v-if="DoYouStartSearch">
          <p>朋友圈</p>
        </div> -->
      </template>
    </van-list>
    <!-- 搜索结构 end-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [], //二位列表数据
      HowManyPeople: "", //多少个朋友
      Lettercombination: [], //索引字符
      FansList: [], //一维列表数据
      searchShow: false, //搜索结构显示隐藏
      value: "", //搜索值
      DoYouStartSearch: "", //是否开始搜索
      finished: true,
      FansList_Search: []
    };
  },
  watch: {
    // 监控索引字符好友列表变化
    newarryfanc_watch(val, cal) {
      this.list = val;
    },
    // 监控索引字符-大写字母
    Lettercombination_watch(val, cal) {
      this.Lettercombination = val;
    },
    // 监控一维列表-
    FansList_watch(val, cal) {
      this.FansList = val;
      // 多少个朋友
      if (val.length != undefined) {
        this.HowManyPeople = val.length + `个朋友`;
      }
      console.log(" this.HowManyPeople", this.HowManyPeople);
    },
    // 监控搜索的值
    value(val, cal) {
      // console.log("val", val.length, cal.length);
      if (val.length > 0) {
        this.DoYouStartSearch = false;
        this.search();
      } else {
        this.search();
        //   console.log("搜索前准备工作");
        this.DoYouStartSearch = true;
      }
    }
  },
  activated() {
    window.FansList()
    this.value = "";
  },
  created() {},
  //利用计算属性
  computed: {
    // 监控索引字符好友列表变化
    newarryfanc_watch() {
      return this.$store.state.newarryfanc;
    },
    // 监控索引字符
    Lettercombination_watch() {
      return this.$store.state.Lettercombination;
    },
    // 监控一维列表
    FansList_watch() {
      return this.$store.state.FansList;
    }
  },
  methods: {
    // 获取焦点
    OnFocus() {
      console.log("获取焦点");
      this.searchShow = true;
      this.FansList_Search = this.FansList;

      if (this.value.length > 0) {
        this.DoYouStartSearch = false;
        this.search();
      } else {
        console.log("搜索前准备工作");
        this.DoYouStartSearch = true;
      }
    },
    // 失去焦点
    ingBlur() {
      console.log("失去焦点");
      this.searchShow = false;
      this.value = "";
    },
    // 搜索
    search() {
      var applist = [];
      this.FansList.forEach((item, index, arr) => {
        if (item.nickname.indexOf(this.value) != -1) {
          applist.push(item);
        }
      });

      // FansList
      console.log("FansList", applist);
      this.FansList_Search = applist;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.van-index-anchor {
  text-align: left;
}
/deep/.van-index-bar {
  .van-index-bar__index {
    line-height: 1.5rem;
  }
}
/deep/.search {
  height: 2.25rem;
}
.content {
  height: 100%;
  .van-list {
    //   联系人每行
    .van-cell {
      padding: 10px 0 10px 1rem;
      overflow: visible;
      /deep/.van-cell__value {
        overflow: visible;
      }
      // 头像
      /deep/.Avatar {
        width: 2.75rem;
        height: 2.75rem;
        vertical-align: inherit;
        .van-image__error {
          text-align: center;
          font-size: 11px;
        }
        img {
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 0.25rem;
        }
        display: inline-block;
        .van-badge {
          position: absolute;
          left: 31px;
        }
      }
      // 名称
      .text {
        height: 85%;
        margin-left: 10px;
        display: inline-block;
        border-bottom: 1px solid #f0f0f0;
        width: calc(100% - 2.75rem - 10px);
        h2 {
          font-size: 0.88rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 1.25rem;
          letter-spacing: 1px;
        }
        /deep/.child {
          width: 40px;
          height: 40px;
          background: #f2f3f5;
          border-radius: 4px;
        }
      }
    }
    // .van-cell::after {
    //   // border: 0;
    // }
  }
}
</style>