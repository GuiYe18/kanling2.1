<!--
 * @Author: 飞
 * @Date: 2021-06-18 11:30:16
 * @LastEditTime: 2021-06-18 14:55:44
 * @FilePath: \you-shop1\src\views\news\GroupDetails.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <!-- 导航-->
    <van-nav-bar :title="this.$route.query.nickname+'('+Object.keys(list).length+')'" left-arrow fixed>
      <template #left>
        <i class="el-icon-arrow-left" @click="onClickLeft"></i>
      </template>
      <template #right>
        <!-- <i class="el-icon-more" @click="onClickRight"></i> -->
      </template>
    </van-nav-bar>
    <!-- 群列表展示-->
    <div class="kkk">
      <van-grid :border="false" :column-num="5">
        <van-grid-item v-for="(item, i) in list" :key="i">
          <van-image :src="item.photo_wx"> </van-image>
          <div class="van-ellipsis">{{ item.nickname }}</div>
        </van-grid-item>

        <van-grid-item @click="addPersonnel">
          <van-image :src="require('./img/add.png')" />
        </van-grid-item>
      </van-grid>

      <!-- <span>查看更多</span> -->
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      list: {}
    };
  },
  activated() {
    this.GetGroupMemberAvatar();
  },
  methods: {
    //
    addPersonnel() {
      Toast("添加新成员暂未开发 功能正在完善");
    },
    // 导航返回
    onClickLeft() {
      console.log("返回");
      this.$router.go(-1);
    },
    GetGroupMemberAvatar() {
      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/api/v1/getgroupmem",
        data: {
          gid: this.$route.query.username
        }
      })
        .then(response => {
          console.log("response.data.data", response.data.data);
          if (response.data.result == 1) {
            this.list = response.data.data;

            // 重置  开始 秒表
          }
          if (response.data.result == 0) {
            Toast("获取群成员头像失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  // 列表
  .kkk {
    height: 500px;
    background-color: #fff;
    padding-top: 50px;
    // 群成员列表
    /deep/.van-grid {
      //   height: 251px;
      //   overflow: hidden;
      // 每位成员
      .van-grid-item__content {
        padding: 5px 8px;
        // 头像
        .van-image {
          height: 59px;
          width: 59px;
          img {
            border-radius: 50%;
            height: 59px;
            width: 59px;
          }
        }
        // 名称
        .van-ellipsis {
          width: 59px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>