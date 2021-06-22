<!--
 * @Author: 飞
 * @Date: 2021-06-08 15:48:06
 * @LastEditTime: 2021-06-22 10:56:12
 * @FilePath: \you-shop1\src\views\news\Fans.vue
 * @Describe: 
-->

<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <router-link v-for="(item, index) in list" :key="index" :to="fun.getUrl('SolitudeChat', {}, { username: item.username, nickname: item.nickname })">
        <van-cell>
          <div class="Avatar">
            <img :src="item.photo_wx" alt="" />
            <!-- <van-badge v-if="item.unread_msg_count != 0" :content="item.unread_msg_count" /> -->
          </div>
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
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: true,
      finished: true
    };
  },
  watch: {
    FansList(val, cal) {
      console.log("好友列表有变化", val, cal);
      this.list = val;
    }
  },
  activated() {
    console.log("----------------------------首次加载-粉丝列表-------------------------------", this.$store.state.FansList);
    this.list = this.$store.state.FansList;
  },
  created() {},
  //利用计算属性
  computed: {
    FansList() {
      return this.$store.state.FansList;
    }
    // ...mapState({
    //   //等价于上面的写法
    //   NewArray: state => state.NewArray
    // })
  },
  methods: {
    onLoad() {}
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  .van-list {
    //   联系人每行
    .van-cell {
      // 头像
      .Avatar {
        vertical-align: middle;
        height: 42px;
        img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
        display: inline-block;
        .van-badge {
          position: absolute;
          left: 31px;
        }
      }
      // 名称
      .text {
        padding-left: 10px;
        display: inline-block;
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