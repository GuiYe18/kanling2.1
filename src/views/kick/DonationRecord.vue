<template>
  <div class="content">
    <van-tabs v-model="activeName">
      <van-tab title="儿慈会" name="a">
        <div class="sumTotal">
          <span>888</span>
          <p>累计爱心（次）</p>
        </div>
        <div class="sumTotal">
          <span>6666</span>
          <p>已筹金额</p>
        </div>
      </van-tab>
      <!-- <van-tab title="儿慈会" name="b">
        <div class="sumTotal">
          <span>123</span>
          <p>累计爱心（次）</p>
        </div>
        <div class="sumTotal">
          <span>667889</span>
          <p>已筹金额</p>
        </div>
      </van-tab> -->
      <!-- <van-tab title="初保会" name="c">
        <div class="sumTotal">
          <span>3567</span>
          <p>累计爱心（次）</p>
        </div>
        <div class="sumTotal">
          <span>94578</span>
          <p>已筹金额</p>
        </div>
      </van-tab> -->
    </van-tabs>

    <!-- <div class="sumTotal">
      <span>3567</span>
      <p>累计爱心（次）</p>
    </div>
    <div class="sumTotal">
      <span>94578</span>
      <p>已筹金额</p>
    </div> -->

    <div class="record">
      <span class="title">捐款记录</span>
      <ul>
        <li class="item">
          <div class="imgItem">
            <img src="./编组@2x.png" alt="" />
          </div>
          <div style="display: inline-block; width: 83%; margin-left: 10px">
            <p class="ItemName_time"><span class="name"> 姓名 </span> <span class="timed"> 时间 </span></p>
            <br />
            <span class="DonationAmount"> 捐赠100.00 </span>
          </div>
        </li>
        <li class="item">
          <div class="imgItem">
            <img src="./编组@2x.png" alt="" />
          </div>
          <div style="display: inline-block; width: 83%; margin-left: 10px">
            <p class="ItemName_time"><span class="name"> 姓名 </span> <span class="timed"> 时间 </span></p>
            <br />
            <span class="DonationAmount"> 捐赠100.00 </span>
          </div>
        </li>
        <li class="item">
          <div class="imgItem">
            <img src="./编组@2x.png" alt="" />
          </div>
          <div style="display: inline-block; width: 83%; margin-left: 10px">
            <p class="ItemName_time"><span class="name"> 姓名 </span> <span class="timed"> 时间 </span></p>
            <br />
            <span class="DonationAmount"> 捐赠100.00 </span>
          </div>
        </li>
        <li class="item">
          <div class="imgItem">
            <img src="./编组@2x.png" alt="" />
          </div>
          <div style="display: inline-block; width: 83%; margin-left: 10px">
            <p class="ItemName_time"><span class="name"> 姓名 </span> <span class="timed"> 时间 </span></p>
            <br />
            <span class="DonationAmount"> 捐赠100.00 </span>
          </div>
        </li>
        <li class="item">
          <div class="imgItem">
            <img src="./编组@2x.png" alt="" />
          </div>
          <div style="display: inline-block; width: 83%; margin-left: 10px">
            <p class="ItemName_time"><span class="name"> 姓名 </span> <span class="timed"> 时间 </span></p>
            <br />
            <span class="DonationAmount"> 捐赠100.00 </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "a"
    };
  }
};
</script>

<style lang="scss" scoped>
/deep/.van-tab__text--ellipsis {
  width: 42px;
  font-size: 14px;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  line-height: 21px;
  color: #000;
}
/deep/.van-tabs__nav .van-tab--active .van-tab__text {
  color: #f89e42;
}

/deep/.van-tabs__line {
  width: 78px;
  background-color: #f89e42;
}
.content {
  height: 100%;
  background-color: #fff;
}
.sumTotal {
  display: inline-block;
  width: 50%;
  margin: 20px 0;
  span {
    font-size: 15px;
    font-weight: 500;
    color: #333333;
    line-height: 23px;
    margin-bottom: 4px;
    display: block;
  }
  p {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }
}

// 捐款记录
.record {
  text-align: left;
  padding: 0 13px;
  .title {
    width: 60px;
    height: 15px;
    font-size: 15px;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: bold;
    color: #333333;
    line-height: 23px;
  }
  ul {
    border-top: 1px solid #f4f5f6;
  }
  .item {
    padding: 12px 0;
    border-bottom: 1px solid #f4f5f6;
  }
  .imgItem {
    display: inline-block;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
  }
  div {
    .ItemName_time {
      width: 96%;
      display: inline-block;
      .name {
        text-align: left;
        font-size: 13px;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
      }
      .timed {
        float: right;
        font-size: 11px;
        font-weight: 400;
        color: #999999;
        line-height: 17px;
      }
    }
    .DonationAmount {
      font-size: 13px;
      font-weight: 400;
      color: #db2727;
      line-height: 20px;
    }
  }
}
</style>