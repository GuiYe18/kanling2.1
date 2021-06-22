import cTitle from 'components/title';
import { Toast } from 'vant';

export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      title: '退款申请',
      reasontype: ['不想要了', '卖家缺货', '拍错了,订单信息错误', '其他'],
      refundtype: ['退款（仅退款不退货）', '退款退货', '换货'],
      form:
      {
        //order_type-1 表示订单退款 order_type-2 表示修改退款
        //退款原因
        reason: '',
        //申请类型
        refund_type: '',
        //退款原因
        content: '',
        order_id: '',
        refund_id: '',
      },

      //处理方式
      refundTypes: [],
      //退款原因
      reasons: [],
      money: 0.00,
      show1: false,
      show2: false,
    };
  },
  methods:
  {
    changetext(val) {
      this.form.reason = val;
      this.show1 = false;
    },
    changetype(key) {
      this.form.refund_type = key;
      this.show2 = false;
    },
    //提交退款申请
    confirmRefund() {
      console.log(this.$route.params.order_type, this.form);
      const that = this;
      let action;
      if (this.fun.isTextEmpty(this.form.reason)) {
        Toast("请选择退款原因！");
        return;
      }
      if (this.form.refund_type === '') {
        Toast("请选择退款方式！");
        return;
      }

      if (this.$route.params.order_type == 1) {
        action = 'refund.apply.store';
      } else if (this.$route.params.order_type == 3) {
        action = 'plugin.snatch-regiment.api.order.refund';
      } else {
        action = 'refund.edit.store';
      }
      $http.post(action, this.form, '正在提交申请').then(function (response) {
        if (response.result == 1) {
          that.$dialog.alert({message:response.msg}).then(()=>{
            that.$router.go(-1);
          });

        } else {
          that.$dialog.alert({message:response.msg});

        }
      }, function (response) {
        // error callback
      });


    },
    //获取退款信息
    getRefundInfo() {
      var that = this;
      $http.get('refund.apply', { order_id: this.$route.params.order_id }, "").then(function (response) {
        if (response.result == 1) {
          var mydata = response.data;
          that.money = mydata.order.price;
          that.refundTypes = mydata.refundTypes;
          that.reasons = mydata.reasons;
        } else {
          that.$dialog.alert({message:response.msg});

        }
      }, function (response) {
        that.$dialog.alert({message:response.msg});

      });
    },
    getAlterInfo() {
      var that = this;
      $http.get('refund.edit', { refund_id: this.$route.params.order_id }, "").then(function (response) {
        if (response.result == 1) {
          var mydata = response.data;
          that.money = mydata.refundApply.price;
          that.refundTypes = mydata.refundTypes;
          that.reasons = mydata.reasons;
          that.form.content = mydata.refundApply.content;
          that.form.reason = mydata.refundApply.reason;
          that.form.refund_type = mydata.refundApply.refund_type_name;
          that.form.refund_type = mydata.refundApply.refund_type;
        } else {
          that.$dialog.alert({message:response.msg});

        }
      }, function (response) {
        that.$dialog.alert({message:response.msg});

      });

    }


  },
  created() {
    //this.money = this.$route.params.order_id;


  },
  activated() {
    this.money = 0.00;
    //console.log(this.$route.params.order_id);
    this.toi = this.fun.getKeyByI();
    this.form.order_id = this.$route.params.order_id;
    this.form.refund_id = this.$route.params.order_id;
    if (this.$route.params.order_type == 2) {
      //修改申请
      this.title = '修改申请';
      this.getAlterInfo();

    } else {
      this.title = '退款申请';
      this.getRefundInfo();
    }
  },
  components: { cTitle }
};
