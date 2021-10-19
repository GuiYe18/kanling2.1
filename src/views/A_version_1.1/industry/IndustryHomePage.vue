<!--
 * @Author: 飞
 * @Date: 2021-09-24 17:31:06
 * @LastEditTime: 2021-10-09 14:29:34
 * @FilePath: \you-shop1\src\views\A_version_1.1\industry\IndustryHomePage.vue
 * @Describe: 
-->
<template>
  <div>
    <canvas id="canvas" style="display: none"> </canvas>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.newImage("123#");
  },
  methods: {
    newImage(text) {
      // 生成图片
      var cxt = canvas.getContext("2d");
      var img = new Image();
      img.src = require("./img/HelmetBj.png");
      // 图片加载完成，才可处理
      img.onload = () => {
        // 画图(这里画布与图片等宽高)
        cxt.drawImage(img, 0, 0);
        // 设置字体大小
        cxt.font = "36px Microsoft YaHei";
        // 更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
        cxt.textBaseline = "middle";
        cxt.textAlign = "center";
        // 距离左边的位置
        var left = canvas.width / 2;
        // 距离上边的位置 (图片高-文字距离图片底部的距离)
        var top = canvas.height * 0.5;
        // 文字颜色
        cxt.fillStyle = "#000000";
        // 文字在画布的位置
        cxt.fillText(text, left, top);
        console.log('canvas.toDataURL("image/jpg");', canvas.toDataURL("image/jpg"));
        
      };
    }
  }
};
</script>

