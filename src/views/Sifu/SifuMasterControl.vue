<!--
 * @Author: 飞
 * @Date: 2021-05-11 15:44:15
 * @LastEditTime: 2021-07-30 22:30:27
 * @FilePath: \you-shop1\src\views\Sifu\SifuMasterControl.vue
 * @Describe: 
-->
<template>
  <div>
      总控
  </div>
</template>

<script>
export default {
    activated(){
        console.log('ssss',this.$route.query.s_state);
        if (this.$route.query.s_state==0) {
            this.$router.push({name:'Sifu',params:{},query:{uid:this.$route.query.uid}});   
        }
    }
}
</script>

<style>

</style>