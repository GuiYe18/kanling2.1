<!--
 * @Author: 飞
 * @Date: 2021-08-02 10:34:54
 * @LastEditTime: 2021-08-02 20:39:25
 * @FilePath: \you-shop1\src\views\DonationCenter\Detail.vue
 * @Describe: 
-->
<template>
  <div>
    <van-nav-bar title="捐赠明细" name="arrow-left" left-arrow @click-left="onClickLeft" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, i) in list" :key="i">
        <div class="DetailLeft">
          <div class="van-ellipsis">{{ item.goods_name }}</div>
          <span>商城捐物</span>
          <span>{{ item.addtime }}</span>
        </div>
        <div class="DetailRight">
          <div class="van-ellipsis">{{ item.money }}</div>
          <span>捐赠成功</span>
          <span></span>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
      // lists: [],
      page: 1,
      count: ""
    };
  },
  methods: {
    //   返回上一层
    onClickLeft() {
      this.$router.push(this.fun.getUrl("DonationCenter", {}));
    },
    //   获取明细
    getDetail() {
      var that = this;
      let fd = new FormData();
      fd.append("uid", this.uid);
      fd.append("page", this.page);
      axios
        .post("https://tpkl.minpinyouxuan.com/index.php/api/v2/donation_list", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          console.log("respons111111111111111", response.data.data.lists);
          if (response.data.result == 1) {
            // that.list.concat(response.data.data.lists);

            response.data.data.lists.map(item => {
              that.list.push({
                goods_name: item.goods_name,
                addtime: item.addtime,
                money: item.money
              });
            });

            // Array.prototype.push.apply(that.list, response.data.data.lists);
            that.count = response.data.data.count;
            console.log("that.lists", that.list, that.count);
          } else {
            Toast(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onLoad() {
      var that = this;
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //   setTimeout(() => {
      this.page++;
      let fd = new FormData();
      fd.append("uid", this.uid);
      fd.append("page", this.page);
      axios
        .post("https://tpkl.minpinyouxuan.com/index.php/api/v2/donation_list", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          if (response.data.result == 1) {
            //   that.lists = response.data.data.lists;
            response.data.data.lists.map(item => {
              that.list.push({
                goods_name: item.goods_name,
                addtime: item.addtime,
                money: item.money
              });
            });

          console.log("that.listthat.listthat.listthat.listthat.listthat.listthat.listthat.listthat.listthat.list", that.list);
            console.log("that.lists", that.list, that.count);
          } else {
            Toast(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.list.length >= this.count) {
        this.finished = true;
      }
    }
  },
  activated() {
    this.getDetail();
  }
};
</script>

<style lang="scss" scoped>
.DetailLeft {
  width: 70%;
  display: inline-block;
  .van-ellipsis {
    font-size: 1rem;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #333333;
    line-height: 1.5rem;
  }
  span {
    display: block;
    font-size: 0.88rem;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #666666;
    line-height: 1.31rem;
    margin-top: 0.63rem;
  }
  span:nth-child(3) {
    color: #c0c1c2;
  }
}
.DetailRight {
  width: 30%;
  display: inline-block;
  text-align: right;
  .van-ellipsis {
    font-size: 1rem;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #333333;
    line-height: 1.5rem;
  }
  span {
    display: block;
    font-size: 0.88rem;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #666666;
    line-height: 1.31rem;
    margin-top: 0.63rem;
  }
  span:nth-child(3) {
    display: inherit;
  }
}
.van-cell {
  padding: 1.87rem 1.25rem 0rem;
}
</style>