/*
 * @Author: 飞
 * @Date: 2021-04-20 11:08:45
 * @LastEditTime: 2021-08-24 15:52:53
 * @FilePath: \you-shop1\src\views\member\balance\member_balance_detailscontroller.js
 * @Describe: 
 */
import cTitle from "components/title";
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      item: "",
      //余额字样
      balanceLang: this.fun.getBalanceLang(),
      uid: ''
    };
  },
  methods: {},
  activated() {
    this.toi = this.fun.getKeyByI();
    this.item = this.$route.params.item;
    this.fun.setWXTitle(this.balanceLang + '详情');
    console.log('uid', JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid);
    (this.uid = JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid);
  },
  components: { cTitle }
};
