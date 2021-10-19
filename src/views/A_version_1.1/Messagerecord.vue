<!--
 * @Author: 飞
 * @Date: 2021-08-26 15:28:38
 * @LastEditTime: 2021-08-27 14:32:34
 * @FilePath: \you-shop1\src\views\A_version_1.1\Messagerecord.vue
 * @Describe: 
-->
<template>
  <div>
    <van-button type="warning" @click="xiaoxi" style="margin-top: 4rem">上传消息</van-button>
    <br />
    <van-button type="warning" @click="ViewUpload" style="margin-top: 4rem">查看上传的消息</van-button>
    <br />
    <van-button type="warning" @click="returnToHomePage" style="margin-top: 4rem">返回主页</van-button>
    <br />
    {{ datas }}
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      datas: {}
    };
  },
  activated() {
    //   localStorage.setItem("initialization", "initialization-04");
  },
  methods: {
    returnToHomePage() {
      this.$router.push(this.fun.getUrl("news", {}));
    },
    xiaoxi() {
      axios({
        method: "post",
        data: { uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid, jmjosn: localStorage.getItem("VuexDate_NewArray") },
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v1/set_json"
      })
        .then(response => {
          // that.appkData = response.data.data;
          Toast("存取成功");
        })
        .catch(error => {
          Toast("存取失败");
        });
    },
    ViewUpload() {
      var that = this;
      axios({
        method: "post",
        data: { uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid },
        url: "http://tpkl.minpinyouxuan.com/index.php/api/v1/get_json"
      })
        .then(response => {
          that.datas = response.data.data.jmjosn;
          localStorage.setItem("VuexDate_NewArray", JSON.stringify(response.data.data.jmjosn));
          this.$store.commit("SaveData", { SaveDataitem: "NewArray", SaveDataValue: JSON.parse(localStorage.getItem("VuexDate_NewArray")) });
        })
        .catch(error => {
          Toast("读取失败");
        });
    }
  }
};
</script>

<style>
</style>