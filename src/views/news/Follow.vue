<!--
 * @Author: 飞
 * @Date: 2021-06-05 20:04:12
 * @LastEditTime: 2021-08-27 14:11:32
 * @FilePath: \you-shop1\src\views\news\Follow.vue
 * @Describe: 
-->
<template>
  <div>
    <van-list v-model="loading" :finished="finished" :finished-text="HowManyPeople" @load="onLoad">
      <router-link v-for="(item, index) in list" :key="index" :to="fun.getUrl('SolitudeChat', {}, { username: item.username, nickname: item.qsn_name })">
        
        <van-cell>
          <!-- <div class="Avatar">
            <img :src="item.topurl" alt="" /> -->
          <!-- <van-badge v-if="item.unread_msg_count != 0" :content="item.unread_msg_count" /> -->
          <!-- </div> -->
          <van-image class="Avatar" :src="item.topurl">
            <template v-slot:error>加载失败</template>
          </van-image>
          <div class="text">
            <!-- <van-badge :content="5">
              <div class="child">{{ item.nickName }}</div>
            </van-badge> -->

            <!-- <h2>{{ item.nickName }}</h2> -->
            <h2>{{ item.qsn_name }}</h2>
            <!-- <h2>用户名: {{ item }}</h2> -->
            <!-- <div class="van-ellipsis">{{ item.id }}</div> -->
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
      finished: true,
      HowManyPeople: ""
    };
  },
  watch: {
    FriendsList(val, cal) {
      // console.log("好友列表有变化", val, cal);
      this.list = val;
    }
  },
  activated() {
    console.log("----------------------------首次加载-好友列表-------------------------------", this.$store.state.FriendsList);
    this.list = this.$store.state.FriendsList;
    if (this.list.length != undefined) {
      this.HowManyPeople = `已关注` + this.list.length + `个`;
    }
  },
  created() {},
  //利用计算属性
  computed: {
    FriendsList() {
      return this.$store.state.FriendsList;
    }

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
    padding-bottom: 50px;
    //   联系人每行
    .van-cell {
      padding: 10px 0 10px 1rem;
      overflow: visible;
      /deep/.van-cell__value {
        overflow: visible;
      }
      // 头像
      /deep/.Avatar {
        vertical-align: inherit;
        width: 2.75rem;
        height: 2.75rem;
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
        border-bottom: 1px solid #f0f0f0;
        display: inline-block;
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