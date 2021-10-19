<!--
 * @Author: 飞
 * @Date: 2021-10-09 13:50:22
 * @LastEditTime: 2021-10-09 14:30:07
 * @FilePath: \you-shop1\src\views\A_version_1.1\industry\LCE.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <van-nav-bar title="工作证证书" name="arrow-left" left-arrow @click-left="onClickLeft" />
    <van-swipe @change="onChange" class="Display_img" :loop="false">
      <van-swipe-item><img src="./img/LCE_WORKPASS_bj_Z.png" alt="" /></van-swipe-item>
      <van-swipe-item><img src="./img/LCE_WORKPASS_bj_F.png" alt="" /></van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/2</div>
      </template>
    </van-swipe>


  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    // 返回
    onClickLeft() {
      this.$router.push(this.fun.getUrl("Industrydetails", {}));
    },
    
  },
  activated() {
      
  },
};
</script>


<style lang="scss" scoped>
.content {
  // 导航
  /deep/.van-nav-bar {
    .van-icon {
      color: #979797;
    }
    .van-nav-bar__title {
      font-size: 0.88rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 1.25rem;
    }
    .van-nav-bar__right .van-nav-bar__text {
      color: #121212;
    }
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
  /deep/.Display_img {
    width: 100%;
    .van-swipe__track {
      width: 100%;
    }
    .van-swipe-item {
      img {
        width: 100%;
      }
    }
  }
}
</style>