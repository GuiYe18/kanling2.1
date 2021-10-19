<!--
 * @Author: 飞
 * @Date: 2021-08-31 13:12:33
 * @LastEditTime: 2021-09-10 15:05:03
 * @FilePath: \you-shop1\src\views\A_version_1.1\NewDonation\Leaderboard.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <div class="header">
      <van-nav-bar title="个人捐赠价值排行榜" left-arrow @click-left="onClickLeft" />
      <!-- 排行 -->
      <div class="Rank">
        <van-tabs v-model="active">
          <van-tab title="日榜"></van-tab>
          <van-tab title="月榜"></van-tab>
          <van-tab title="周榜"></van-tab>
        </van-tabs>
        <div class="topThree">
          <div class="top">

            <div class="NotOne">
              <div class="Crown">
                <img src="./img/tong.png" alt="" />
              </div>
              <div class="Avatar">
                <img :src="List_S[0].url" alt="" />
              </div>
            </div>
            <div class="jin">
              <div class="Crown">
                <img src="./img/jin.png" alt="" />
              </div>
              <div class="Avatar">
                <img :src="List_S[1].url" alt="" />
              </div>
            </div>
            <div class="NotOne">
              <div class="Crown">
                <img src="./img/yin.png" alt="" />
              </div>
              <div class="Avatar">
                <img :src="List_S[2].url" alt="" />
              </div>
            </div>

          </div>
          <div class="Ranking">
            <div class="item" v-for="(item, i) in List_S" :key="i">
              <p>{{ item.name }}</p>
              <p>{{ item.Amount }}</p>
              <p>总价值</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 剩余排名 -->
    <div class="RemainingRank">
      <van-cell title="排名" value="个人捐赠价值" class="tit" />
      <div class="order">
        <van-cell v-for="(item, i) in list" :key="i">
          <div class="Serial">
            <span>{{ i + 3 }}</span>
          </div>
          <div class="profilePhoto">
            <img :src="item.url" alt="" />
          </div>
          <div class="designation">
            <span>{{ item.name }}</span>
          </div>
          <div class="money">
            <span>¥{{ item.Amount }}</span>
          </div>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import data from "./data.js";
let { moons,week,day } = data();
export default {
  data() {
    return {
      List_S: {},
      moons: moons,
      week: week,
      day: day,
      list: {},
      active: 1
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  activated() {
    // 月
    this.list = this.moons.slice(3);
    this.List_S = this.moons.slice(0, 3);
    this.List_S[0] = this.List_S.splice(1, 1, this.List_S[0])[0];
  },
  watch: {
    active: function (N, O) {
      console.log("active", N);
      if (N == 0) {
        this.list = this.day.slice(3);
        this.List_S = this.day.slice(0, 3);
        this.List_S[0] = this.List_S.splice(1, 1, this.List_S[0])[0];
      }
      if (N == 1) {
        this.list = this.moons.slice(3);
        this.List_S = this.moons.slice(0, 3);
        this.List_S[0] = this.List_S.splice(1, 1, this.List_S[0])[0];
      }
      if (N == 2) {
        this.list = this.week.slice(3);
        this.List_S = this.week.slice(0, 3);
        this.List_S[0] = this.List_S.splice(1, 1, this.List_S[0])[0];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// 头部
.header {
  background-color: #f26363;
  /deep/.van-nav-bar {
    background-color: #fff0;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
  /deep/.van-hairline--bottom::after {
    border-bottom-width: 0;
  }
  .Rank {
    margin-top: 1rem;
    padding-bottom: 0.63rem;

    /deep/.van-tabs__wrap {
      height: 1.88rem;
      .van-tabs__nav {
        padding: 0 3.56rem;
        background-color: #fff0;
        .van-tabs__line {
          display: none;
        }
        .van-tab {
          border: 1px solid #fff;
          color: #fff;
          span {
            font-size: 1rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
          }
        }
        .van-tab:nth-child(1) {
          border-top-left-radius: 21px;
          border-bottom-left-radius: 21px;
          border-right: 0;
        }
        .van-tab:nth-child(3) {
          border-top-right-radius: 21px;
          border-bottom-right-radius: 21px;
          border-left: 0;
        }
        .van-tab--active {
          background-color: #fff;
          color: #f26363;
        }
      }
    }
    .topThree {
      background-image: url("./img/topshreebj.png");
      background-size: 100%;
      height: 12.44rem;
      margin: 1rem 0.63rem 0;
      border-bottom-left-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;
      .top > div {
        display: block;
        height: 100px;
        width: 100px;
        border-radius: 50%;
        text-align: center;
        // 皇冠
        .Crown {
          height: 1.6rem;
          img {
            height: 2.13rem;
            width: 2.44rem;
            display: block;
          }
        }
        // 头像
        .Avatar {
          height: 4rem;
          width: 4rem;
          display: inline-block;
          border-radius: 50%;

          img {
            height: 4rem;
            width: 4rem;
            border-radius: 50%;
            display: block;
          }
        }
      }
      .top {
        display: inline-flex;
        width: 100%;
        justify-content: space-around;
        padding-top: 0.4rem;
        .NotOne {
          padding-top: 2rem;
        }
        .jin {
          .Avatar {
            height: 4.4rem;
            width: 4.4rem;
            display: inline-block;
            border-radius: 50%;
            background-color: #f9cd46;
            display: inline-flex;
          }
        }
      }
      .Ranking {
        display: inline-flex;
        width: 100%;
        justify-content: space-around;
        .item {
          P:nth-child(1) {
            font-size: 0.88rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #666666;
            line-height: 1rem;
          }
          P:nth-child(2) {
            font-size: 1.13rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #333333;
          }
          P:nth-child(3) {
            height: 0.63rem;
            font-size: 0.63rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #666666;
            line-height: 1rem;
          }
        }
        .item:nth-child(2) > P:nth-child(2) {
          font-size: 1.13rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #f26363;
        }
      }
    }
  }
}

.RemainingRank {
  .tit {
    .van-cell__title {
      text-align: left;
      font-size: 1rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #999999;
    }

    .van-cell__value {
      font-size: 1rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #999999;
    }
  }
  .tit::after {
    border-bottom: 1px solid #ebedf000;
  }

  .order {
    .van-cell {
      div {
        display: inline-block;
      }
      .Serial {
        width: 6%;
        text-align: center;
      }
      .profilePhoto {
        width: 20%;
        vertical-align: middle;
        img {
          height: 2.38rem;
          width: 2.38rem;
          display: block;
          border-radius: 50%;
        }
      }
      .designation {
        width: 40%;
        font-size: 1rem;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #666666;
      }
      .money {
        width: 34%;
        text-align: right;
        font-size: 1rem;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #666666;
      }
    }
  }
}
</style>