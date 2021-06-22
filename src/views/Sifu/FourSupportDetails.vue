<!--
 * @Author: 飞
 * @Date: 2021-05-11 17:35:30
 * @LastEditTime: 2021-05-25 16:12:48
 * @FilePath: \you-shop1\src\views\Sifu\FourSupportDetails.vue
 * @Describe: 
-->
<template>
  <div class="content">
    <div class="show">
      <div class="Leaveblank"></div>
      <van-panel title="姓名" :desc="s_name"> </van-panel>

      <van-panel title="类型" desc="残疾人" v-show="s_type == 1"> </van-panel>
      <van-panel title="类型" desc="军烈属" v-show="s_type == 2"> </van-panel>
      <van-panel title="类型" desc="低保户" v-show="s_type == 3"> </van-panel>
      <van-panel title="类型" desc="五保户" v-show="s_type == 4"> </van-panel>
      <van-panel title="类型" desc="其他" v-show="s_type == 5"> </van-panel>

      <van-panel title="身份证号码" :desc="s_idcard"> </van-panel>
      <van-panel title="证件照片" desc="查看" @click="open"></van-panel>
      <div class="img">
        <img src="./img/残疾人ed.png" alt="" v-show="s_type == 1" />
        <img src="./img/军烈属ed.png" alt="" v-show="s_type == 2" />
        <img src="./img/低保户ed.png" alt="" v-show="s_type == 3" />
        <img src="./img/五保户ed.png" alt="" v-show="s_type == 4" />
        <img src="./img/其他ed.png" alt="" v-show="s_type == 5" />
      </div>
      <div class="Certification">
        <img src="./img/已认证.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      uid: "", //uid
      s_name: "", //姓名
      s_idcard: "", //身份证号码
      s_type: "", //类型
      s_photo: ""
    };
  },
  activated() {
    // 每次进来后置顶
    window.scrollTo(0, 0);
    console.log("", this.$route.query.uid);
    this.uid = this.$route.query.uid;
    this.getMessage();
  },
  methods: {
    // 预览图片
    open() {
      ImagePreview({
        images:this.s_photo
      });
    },
    getMessage() {
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v2/supportdetail",
        data: {
          uid: this.uid
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.result == 1) {
            this.s_name = response.data.data.s_name;
            this.s_idcard = response.data.data.s_idcard;
            this.s_type = response.data.data.s_type;
            this.s_photo = response.data.data.s_photo.split(',');
            console.log('this.s_photo',this.s_photo);
          }
          if (response.data.result == 0) {
            Toast(response.data.msg);
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
  .Certification {
    position: absolute;
    bottom: 0;
    right: 0;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .Leaveblank {
    height: 26px;
  }
  .img {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -100%);
    top: 16%;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .show {
    margin-top: 50px;
    border-radius: 10px;
    background-color: #fff;
    margin: 50px 13px;
    position: relative;
    .van-panel {
      background-color: #fff0;
      .van-cell {
        background-color: #fff0;
      }
    }
  }
  .IDPhoto {
    text-align: left;
  }
  .van-cell-group {
    .van-panel__content {
      img {
        width: 320px;
        height: 204px;
      }
    }
    .van-cell {
      text-align: left;
      .van-cell__title {
        span {
          font-size: 14px;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 500;
          color: #333333;
          line-height: 21px;
        }
      }
      .van-cell__label {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #666666;
        line-height: 21px;
      }
    }
  }
}
</style>