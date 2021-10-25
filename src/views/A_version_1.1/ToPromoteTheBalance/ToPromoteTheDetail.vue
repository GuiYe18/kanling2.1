<template>
  <div id="detailed">
    <c-title :hide="false" :text="'推广余额明细'"></c-title>
    <div style="height: 40px"></div>
    <van-tabs v-model="selected" @click="swichTabTItem">
      <van-tab name=0 title="全部"></van-tab>
      <van-tab name=1 title="收入"></van-tab>
      <van-tab name=2 title="支出"></van-tab>
    </van-tabs>
    <div>
      <div v-show="selected == 0">
        <div class="tbs 0" v-for="(item, i) in recordsList" :key="i">
          <div class="wrap">
            <ul class="item2">
              <li v-if="item.type == 1">来自{{ item.nickname }}</li>
              <li v-if="item.type == 2">转赠{{ item.nickname }}</li>
              <li>推广余额：{{ item.after_money }}</li>
              <li class="item1 A">{{ item.create_time }}</li>
            </ul>
            <div class="item3" v-if="item.type == 2">
              <span class="add">-{{ item.money }}</span>
            </div>
            <div class="item3" v-if="item.type == 1">
              <span class="reduce 3">+{{ item.money }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-show="selected == 1">
        <div class="tbs 1" v-for="(item, i) in recordsList" :key="i">
          <div class="wrap">
            <ul class="item2">
              <li>来自{{ item.nickname }}</li>
              <li>推广余额：{{ item.after_money }}</li>

              <li class="item1 A">{{ item.create_time }}</li>
            </ul>
            <div class="item3" v-if="item.type == 2">
              <span class="add">-{{ item.money }}</span>
            </div>
            <div class="item3" v-if="item.type == 1">
              <span class="reduce">+{{ item.money }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-show="selected == 2">
        <div class="tbs 2" v-for="(item, i) in recordsList" :key="i">
          <div class="wrap">
            <ul class="item2">
              <li>转赠{{ item.nickname }}</li>
              <li>推广余额：{{ item.before_money }}</li>

              <li class="item1 A">{{ item.create_time }}</li>
            </ul>
            <div class="item3" v-if="item.type == 2">
              <span class="add">-{{ item.money }}</span>
            </div>
            <div class="item3" v-if="item.type == 1">
              <span class="reduce">+{{ item.money }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cTitle from "components/title";
import { scrollMixin } from "utils/mixin";
export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      selected: "", //哪个分类
      recordsList: [], //明细列表
      isLoadMore: true, //防止多次请求分页数据
      page: 1, //第一页数据
      total_page: 0 //总共几页
    };
  },
  methods: {
    // 初始化数据
    initData() {
      this.selected = "";
      this.isLoadMore = true;
      this.page = 1;
      this.total_page = 0;
      this.recordsList = [];
    },
    // 切换分类
    swichTabTItem() {
      this.getIntegralInfo(this.selected);
    },

    // 获取明细
    getIntegralInfo(typea) {
      var that = this;
      this.isLoadMore = true; //防止多次请求分页数据
      this.page = 1;
      this.total_page = 0;
      this.recordsList = [];
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v3/tgmoneylist",
        data: {
          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
          type: typea,
          page: this.page
        }
      }).then(res => {
        if (res.data.result == 1) {
          that.recordsList = res.data.data;
        }
      });



      return;
      $http.get("finance.point-info ", { status: type }, "正在获取...").then(
        function (response) {
          if (response.result == 1) {
            that.page = 1;
            that.total_page = response.data.list.last_page;
            that.recordsList = response.data.list.data;
            that.recordsList.forEach((item, index, key) => {
              item.checked = false;
            });
          }
        },
        function (response) {}
      );
    },

    //获取更多数据
    getMoreData() {
      this.isLoadMore = false; // 防止多次请求分页数据
      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        $http
          .get(
            "finance.point-info",
            {
              page: this.page,
              status: this.selected
            },
            "加载中"
          )
          .then(
            response => {
              this.isLoadMore = true;
              if (response.result === 1) {
                var myData = response.data.list.data;
                myData.forEach((item, index, key) => {
                  item.checked = false;
                });

                this.recordsList = this.recordsList.concat(myData); //数组拼接
              } else {
                this.page = this.page - 1;
                this.isLoadMore = false;
              }
            },
            function (response) {}
          );
      }
    }
  },
  activated() {
    // 初始化数据
    this.initData();
    // 获取明细
    this.getIntegralInfo(0);
  },
  components: { cTitle }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#detailed {
  a {
    color: #000;
  }

  .mint-navbar {
    margin-bottom: 0.125rem;
  }

  .mint-navbar .mint-tab-item {
    padding: 0.875rem 0;
  }

  .times {
    text-align: left;
    text-indent: 0.625rem;
    line-height: 2rem;
    background: #ddd;
  }

  .tbs {
    background: #fff;
    overflow: hidden;
    font-size: 14px;

    .wrap {
      padding: 0.625rem 0.875rem;
      border-bottom: 1px solid #ebebeb;
    }

    .wrap::after {
      clear: both;
      display: block;
      content: "";
    }

    .item1 {
      color: #8c8c8c;
      font-size: 12px;
    }

    .item2 {
      float: left;
      width: 70%;
      text-align: left;

      li {
        line-height: 1.5rem;
      }
    }

    .item3 {
      font-size: 18px;
      float: left;
      width: 30%;
      text-align: right;

      .add {
        color: #259b24;
      }

      .reduce {
        color: #f15353;
      }
    }
  }
}
</style>