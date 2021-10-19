<!--
 * @Author: 飞
 * @Date: 2021-05-24 14:26:07
 * @LastEditTime: 2021-08-12 21:03:58
 * @FilePath: \you-shop1\src\views\IncomeAndExpenditureDetails\IncomeAndExpenditureDetails.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <!-- 账户余额 -->
    <div class="AccountBalance">
      <p>账户余额(元)</p>
      <p>{{ count_money }}</p>
    </div>
    <!--  支出明细-->
    <van-tabs v-model="active">
      <!-- <van-tab title="全部">

      </van-tab> -->
      <van-tab title="收入">
        <van-cell v-for="item in incomeList" :key="item">
          <div class="itencnt" @click="openDetail(item)">
            <div class="itenImg">
              <img :src="item.avatar" alt="" />
            </div>
            <div class="itemtext">
              <!-- <p>来自-{{ item.nickname }}</p> -->
              <!-- <p>来自-{{ item.broadcast_type }}</p> -->
              <template v-if="item.broadcast_type == 2">
                <p>来自-{{ item.nickname }}</p>
              </template>
              <p>收入</p>
              <p>{{ item.create_time }}</p>
            </div>
            <div class="itemexpenditure">
              <span>+{{ item.trans_amount }}</span>
            </div>
          </div>
        </van-cell>
        <van-cell
          ><div style="text-align: center; color: #9a9a9a">{{ msg }}</div>
        </van-cell>
      </van-tab>
      <!-- <van-tab title="支出">支出</van-tab> -->
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      incomeList: [], //收入列表
      loading: false,
      finished: false,
      count_money: "", //总余额
      msg: "" //是否为空状态
    };
  },
  methods: {
    // 打开详情
    openDetail(item) {
      console.log("少时诵诗书所所所所所所所所所所", item);
      this.$router.push(this.fun.getUrl("OrderDetails", {}, { item: item }));
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-21 17:41:16
     * @Describe: 获取收入列表
     */
    GetIncomeList() {
      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/api/v1/fu_pay_details",
        data: {
          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid
          // uid: "1"
        }
      })
        .then(response => {
          console.log("response", response);
          if (response.data.result == 1) {
            // this.$router.push({ name: "ComMit", params: {}, query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid } });
            that.incomeList = response.data.data.list;
            that.count_money = response.data.data.count_money;
          }
          if (response.data.result == 0) {
            that.count_money = 0;
            that.msg = response.data.msg;

            // Toast(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  activated() {
    /**
     * @Author: 飞
     * @Date: 2021-06-21 17:44:13
     * @Describe:调用获取收入列表方法
     */
    this.GetIncomeList();
  }
};
</script>

<style lang="scss" scoped>
.content {
  // 账户余额
  .AccountBalance {
    background-image: url("./img/background.png");
    width: 100%;
    height: 160px;
    p:nth-child(1) {
      font-size: 18px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #ffffff;
      line-height: 27px;
      padding-top: 35px;
      margin-bottom: 9px;
    }
    p:nth-child(2) {
      font-size: 40px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      font-weight: 500;
      color: #ffffff;
      line-height: 59px;
    }
  }
  // 支出明细
  /deep/.van-tabs {
    // title
    .van-tabs__wrap {
      .van-tab {
        font-size: 16px;
      }
      .van-tab--active {
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #0579fc;
        line-height: 24px;
      }
      .van-tabs__line {
        background-color: #0579fc;
        width: 27px;
        height: 2px;
        background: #0579fc;
      }
    }
    // 内容
    .van-tabs__content {
      // item
      .van-cell::after {
        border-bottom: 0;
      }
      .van-cell {
        padding: 10px 0;
        .itencnt {
          // 图片
          .itenImg {
            display: inline-block;
            padding-bottom: 18px;
            vertical-align: bottom;
            margin-right: 21px;
            margin-left: 20px;
            img {
              width: 32px;
              height: 32px;
              background: linear-gradient(225deg, #ff5b62 0%, #ff2e33 100%);
              border-radius: 50%;
            }
          }
          // 文本
          .itemtext {
            display: inline-block;
            vertical-align: sub;
            p:nth-child(1) {
              font-size: 16px;
              font-family: SourceHanSansCN-Medium, SourceHanSansCN;
              font-weight: 500;
              color: #333333;
              line-height: 24px;
            }
            p:nth-child(2) {
              font-size: 14px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #666666;
              line-height: 21px;
            }
            p:nth-child(3) {
              font-size: 14px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #c0c1c2;
              line-height: 21px;
            }
          }
          // 支出
          .itemexpenditure {
            vertical-align: top;
            padding-top: 18px;
            float: right;
            padding-right: 20px;
            span {
              font-size: 16px;
              font-family: SourceHanSansCN-Medium, SourceHanSansCN;
              font-weight: 500;
              color: #f04e36;
              line-height: 24px;
            }
          }
        }
      }
    }
  }
}
</style>