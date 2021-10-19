<!--
 * @Author: 飞
 * @Date: 2021-08-25 16:32:54
 * @LastEditTime: 2021-08-25 17:39:09
 * @FilePath: \you-shop1\src\views\A_version_1.1\DonateBook\SponsoredList.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-nav-bar title="赞助列表" left-arrow @click-left="onClickLeft" />
    <div class="List">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="order">
            <ul>
              <li class="orderItem">
                <div class="orderTit">
                  <span class="orderNumberValue">2021-07-12</span>
                  <span class="shippingStatus">已发货</span>
                </div>
              </li>
              <li>
                <router-link :to="fun.getUrl('DonationOrderDetails', {}, {})">
                  <div class="orderCenter">
                    <div class="orderCenter_l">
                      <div class="orderImg">
                        <img src="./img/20210823143317.png" alt="" />
                      </div>
                      <div class="orderName">
                        <span class="orderNameItem van-multi-ellipsis--l2">大萨达撒</span>
                        <p>赞助数量：5 本</p>
                      </div>
                    </div>
                  </div>
                </router-link>
              </li>
              <li class="ExternalFreight">
                <div class="outOfPocket"><span>运费: </span><span>¥222</span></div>
              </li>

              <li>
                <div class="expect">
                  <div>
                    <router-link :to="fun.getUrl('DonationOrderDetails', {}, {})">查看详情</router-link>
                  </div>

                  <!-- <div v-if="active == 2 && item.sto_status == 0">
                    <router-link :to="fun.getUrl('ShipByAppointment', {}, { order_id: item.order_id, status: item.status })">预约发货</router-link>
                  </div>  -->
                </div>
              </li>
            </ul>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      listName: ["全部", "待付款", "待发货", "已发货", "已完成", "退货退款"],
      isLoading: false,
      listdata: [],
      count: "", // 全部个数
      page: 0
    };
  },
  activated() {
    // 获取捐赠列表
    this.GetDonatedOrders();
  },
  methods: {
    //   返回上一层
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      // if (this.page==1) {
      //   return
      // }
      if (this.refreshing) {
        this.listdata = [];
        this.refreshing = false;
      }

      // for (let i = 0; i < 20; i++) {
      //   this.list.push(this.list.length + 1);
      // }

      //   this.LazyLoading("all"); //全部

      // 加载状态结束
      this.loading = false;

      if (this.listdata.length >= this.count) {
        this.finished = true;
      }
    },
    /**
     * @Author: 飞
     * @Date: 2021-07-01 14:20:07
     * @Describe:获取捐赠订单
     * @param n*o name
     * @param n*o title
     */
    GetDonatedOrders(parameter) {
      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v2/donation_order",
        data: {
          uid: JSON.stringify(JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid),
          status: parameter,
          page: this.page
        }
      })
        .then(res => {
          if (res.data.result == 1) {
            console.log("res.data.data", res.data.data);
            that.listdata = res.data.data.lists;
            that.count = res.data.data.count;
          }
          if (res.data.result == 0) {
            console.log(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 1000);
      console.log("this.$route.params.userId", this.$route);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  background-color: #fdfdfd;
  // 导航
  /deep/.van-nav-bar {
    .van-icon {
      color: #979797;
    }
    .van-nav-bar__title {
      font-size: 1rem;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #121212;
      line-height: 1.5rem;
    }
    .van-nav-bar__right .van-nav-bar__text {
      color: #121212;
    }
  }
  .List {
    height: 100%;
    .van-pull-refresh {
      height: 100%;
      .van-list {
        height: 100%;
      }
    }
    // 订单
    .order {
      margin: 10px 10px 0;

      background: #ffffff;
      box-shadow: 0rem 0rem 0.63rem 0rem rgba(0, 0, 0, 0.05);
      border-radius: 0.38rem;
      // 预约发货
      .expect {
        text-align: end;
        padding: 0 13px 13px;

        div {
          height: 26px;
          width: 79px;
          border-radius: 6px;
          line-height: 26px;
          display: inline-block;
          text-align: center;
          border: 1px solid #ababab;
          margin-left: 8px;
        }
      }
      // 实付
      .ExternalFreight {
        line-height: 2rem;
        padding: 10px;
      }
      .outOfPocket {
        display: inline-table;
        height: 20px;
        text-align: end;
        width: 100%;
        border-bottom: 1px dashed #b7b9ba;
        span:nth-child(1) {
          font-size: 0.69rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #999999;
          line-height: 1.06rem;
          margin-right: 1rem;
        }
        span:nth-child(2) {
          font-size: 0.8rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #e44e41;
          line-height: 1.13rem;
        }
      }
      // 商品top
      .orderItem {
        padding: 0 13px;
        .orderTit {
          width: 100%;
          height: 40px;
          text-align: left;
          .orderNumber {
            vertical-align: sub;
            margin-right: 10px;
          }
          .orderNumberValue {
            vertical-align: super;
          }
          span {
            line-height: 36px;
            display: inline-flex;
          }
          .shippingStatus {
            float: right;
            color: #f15353;
          }
        }
      }
      // 商品Center
      .orderCenter {
        padding: 0 13px;
        text-align: start;
        .orderCenter_l {
          width: 100%;
          height: 60px;
          display: inline-block;
          .orderImg {
            width: 5.63rem;
            float: left;
            border-radius: 0.38rem;
            img {
              width: 5.63rem;
              height: 5.63rem;
              border-radius: 0.38rem;
            }
          }
          .orderName {
            float: left;
            margin-left: 10px;
            height: 60px;
            color: #333333;
            span {
              font-size: 1.13rem;
              font-family: SourceHanSansSC-Medium, SourceHanSansSC;
              font-weight: 500;
              color: #333333;
              line-height: 1.69rem;
              margin-bottom: 0.75rem;
            }
            p {
              font-size: 0.75rem;
              font-family: SourceHanSansSC-Medium, SourceHanSansSC;
              font-weight: 500;
              color: #ff9365;
              line-height: 1.13rem;
            }
          }
        }
      }
      .orderCenterRight {
        float: right;
        // display: inline-block;
        // display: flex;
        span {
          display: inline-block;
        }
      }
    }
  }
}
</style>