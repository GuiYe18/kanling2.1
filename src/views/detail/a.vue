<!--
 * @Author: 飞
 * @Date: 2021-04-20 11:08:35
 * @LastEditTime: 2021-08-12 18:42:42
 * @FilePath: \you-shop1\src\views\detail\a.vue
 * @Describe: 
-->
<template>
  <div>
    <van-circle
      class='progress'
      v-model="val"
      :rate="rate"
      size="120px"
      layer-color="#ebedf0"
      text="123"
    />
  </div>
</template>

<script>
import { Swipe, SwipeItem, Toast ,Circle} from 'vant'
  export default {
    data(){
      return {
         rate:100,
         val: 0,
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
